const router=require('express').Router();
module.exports=router;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// Schemas
const User=require('../models/users');
// Middlewares
const verify=require('../middlewares/verify');



// *Register routes
router.post('/register', async (req, res) => {
    // Create user
    const user=await new User({
        nickname: req.body.nickname,
        email: req.body.email,
        phone: req.body.phone,
        birthDate: req.body.birthDate,
        password: req.body.password,
        createDate: new Date(),
        devices: {
            name: req.body.device,
            ip: req.socket.remoteAddress,
            client: req.headers['user-agent'],
            createDate: new Date(),
            lastLoginDate: new Date(),
        },
    });

    // Validate
    const validateError=await User.validate(user)
    .then(() => null)
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return err;
    });
    if(validateError) return;

    // Check if user exists
    const [ findError, foundUser ]=await User.findOne({$and: [{$or: [{"email":user.email}, {nickname: user.nickname}]}, {"delete.isDeleted":false}]})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).send('500 Internal Server Error');
    if(foundUser) {
        if(foundUser.email===user.email) return res.status(400).send('User with this email already exists');
        else if(foundUser.nickname===user.nickname) return res.status(400).send('User with this nickname already exists');
        else return res.status(500).send('500 Internal Server Error');
    }

    // Hash password
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password, salt);

    // Save user
    const [ saveError, savedUser ]=await user.save()
    .then((user) => [ null, user ])
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error')
        return [ err, null ];
    });
    if(saveError) return;
    
    // Create token
    const token=await jwt.sign({_id: user._id, _deviceId: user.devices[0]._id}, process.env.TOKEN_SECRET);
    return res.status(201).send(token);
});



// *Login routes
router.post('/login', async (req, res) => {
    // Create user
    const user=await new User({
        nickname: 'Nickname',
        email: req.body.email,
        password: req.body.password,
        devices: {
            name: req.body.device,
            ip: req.socket.remoteAddress,
            client: req.headers['user-agent'],
        }
    });

    // Validate
    const validateError=await user.validate(user)
    .then(() => null)
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return err;
    });
    if(validateError) return;

    // Check if user exists
    const [ findError, foundUser ]=await User.findOne({"email":user.email, "delete.isDeleted":false})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).send('500 Internal Server Error');
    if(!foundUser) return res.status(400).send('Invalid email or password');

    // Check if user is banned
    const foundBan=foundUser.bans.find(ban => ban.banExpirationDate>new Date());
    if(foundBan) return res.status(403).send(`You are banned until ${foundBan.banExpirationDate} for "${foundBan.banReason}"`);

    // Compare passwords
    const [ isMatch, compareError ]=await bcrypt.compare(user.password, foundUser.password)
    .then((isMatch) => [ isMatch, null ])
    .catch((err) => [ false, err ]);
    if(compareError) return res.status(500).send('500 Internal Server Error');
    if(!isMatch) return res.status(400).send('Invalid email or password');

    // Check if device is already exists (or maybe update on finding first time (line 72))
    const foundDevice=foundUser.devices.find(device => device.ip===req.socket.remoteAddress);
    if(foundDevice) {
        const [ updateError, updatedUser ]=await User.findById(foundUser._id)
        .then(async (foundUser) => {
            const deviceIndex=foundUser.devices.findIndex(device => device.ip===req.socket.remoteAddress);
            foundUser.devices[deviceIndex].lastLoginDate=new Date();
            foundUser.devices[deviceIndex].client=req.headers['user-agent'];
            foundUser.devices[deviceIndex].name=req.body.device;
            const saveError=await foundUser.save()
            .then(() => null)
            .catch((err) => {
                res.status(500).send('500 Internal Server Error');
                return err;
            });
            return [ saveError, foundUser ];
        })
        .catch((err) => {
            if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
            else res.status(500).send('500 Internal Server Error');
            return [ err, null ];
        });
        if(updateError) return;
        const token=jwt.sign({_id: foundUser._id, _deviceId: await updatedUser.devices.find(user => user.ip===req.socket.remoteAddress)._id}, process.env.TOKEN_SECRET);
        return res.status(201).send(token);
    } else {
        const [ updateError, updatedUser ]=await User.findByIdAndUpdate(foundUser._id, {
            $push: {
                devices: {
                    name: req.body.device,
                    ip: req.socket.remoteAddress,
                    client: req.headers['user-agent'],
                    createDate: new Date(),
                    lastLoginDate: new Date(),
                },
            },
        }, { new: true })
        .then((updatedUser) => [ null, updatedUser ])
        .catch((err) => {
            if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
            else res.status(500).send('500 Internal Server Error');
            return [ err, null ];
        });
        if(updateError) return;
        const token=jwt.sign({_id: foundUser._id, _deviceId: await updatedUser.devices.find(user => user.ip===req.socket.remoteAddress)._id}, process.env.TOKEN_SECRET); // *Remember that this is only one response for not existing device (line 131)
        return res.status(201).send(token);
    }
});



// *Logout routes
router.put('/logout', verify, async (req, res) => {
    const [ updateError, updatedUser ]=await User.findByIdAndUpdate(res.locals.user._id, {$pull: {devices: {_id: res.locals.device._id}}}, { new: true })
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(updateError) return res.status(500).send('500 Internal Server Error');
    return res.status(200).send('Logged out');
});



// *Delete routes
router.delete('/delete', verify, async (req, res) => {
    // User object
    const user=await new User({
        nickname: res.locals.user.nickname,
        email: res.locals.user.email,
        password: req.body.password,
    });

    // Validate
    const validateError=await User.validate(user)
    .then(() => null)
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return err;
    });
    if(validateError) return;

    // Compare passwords
    const [ isMatch, compareError ]=await bcrypt.compare(user.password, res.locals.user.password)
    .then((isMatch) => [ isMatch, null ])
    .catch((err) => [ false, err ]);
    if(compareError) return res.status(500).send('500 Internal Server Error');
    if(!isMatch) return res.status(400).send('Invalid password');

    // Delete user and all devices
    const [ updateError, updatedUser ]=await User.findByIdAndUpdate(res.locals.user._id, {
        $set: {
            'delete.isDeleted': true,
            'delete.deleteDate': new Date(),
            'devices': [],
        },
    }, { new: true })
    .then((user) => [ null, user ])
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return [ user, null ];
    });
    if(updateError) return;
    return res.status(200).send('Deleted');
});