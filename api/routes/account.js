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
        birthdate: req.body.birthdate,
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
    const isValid=await user.validate(user).then(() => {
        return true;
    }).catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return false;
    });
    if(!isValid) return;

    // Check if user exists
    const [ isFindError, foundUser ]=await User.findOne({$and: [{$or: [{"email":user.email}, {nickname: user.nickname}]}, {"delete.isDeleted":false}]}).then((user) => {
        if(user) return [ false, user ];
        else return [ false, null ];
    }).catch((err) => {
        return [ true, null ];
    });
    if(isFindError) return res.status(500).send('500 Internal Server Error');
    if(foundUser) {
        if(foundUser.email===user.email) return res.status(400).send('User with this email already exists');
        else if(foundUser.nickname===user.nickname) return res.status(400).send('User with this nickname already exists');
        else return res.status(500).send('500 Internal Server Error');
    }

    // Hash password
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password, salt);

    // Save user
    const [ isSaved, savedUser ]=await user.save().then((user) => {
        return [ true, user ];
    }).catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error')
        return [ false, null ];
    });
    if(!isSaved) return;
    
    // Create token
    const token=await jwt.sign({_id: user._id, _deviceId: user.devices[0]._id}, process.env.TOKEN_SECRET);
    return res.status(201).send(token);
});



// *Login routes
router.put('/login', async (req, res) => {
    // Create user
    const user=await new User({
        nickname: 'Nickname',
        email: req.body.email,
        password: req.body.password,
    });

    // Validate
    const isValid=await user.validate(user).then(() => {
        return true;
    }).catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return false;
    });
    if(!isValid) return;

    // Check if user exists
    const [ isFindError, foundUser ]=await User.findOne({"email":user.email, "delete.isDeleted":false}).then((user) => {
        if(user) return [ false, user ];
        else return [ false, null ];
    }).catch((err) => {
        return [ true, null ];
    });
    if(isFindError) return res.status(500).send('500 Internal Server Error');
    if(!foundUser) return res.status(400).send('Invalid email or password');

    // Check if user is banned
    const foundBan=foundUser.bans.find(ban => ban.banExpirationDate>new Date());
    if(foundBan) return res.status(403).send(`You are banned until ${foundBan.banExpirationDate} for "${foundBan.banReason}"`);

    // Compare passwords
    const [ isMatch, isCompareError ]=await bcrypt.compare(user.password, foundUser.password).then((isMatch) => {
        if(!isMatch) return [ false, false ];
        else return [ true, false ];
    }).catch((err) => {
        return [ false, true ];
    });
    if(isCompareError) return res.status(500).send('500 Internal Server Error');
    if(!isMatch) return res.status(400).send('Invalid email or password');

    // Check if device is already exists (or maybe update on finding first time (line 72))
    const foundDevice=foundUser.devices.find(device => device.ip===req.socket.remoteAddress);
    if(foundDevice) {
        const [ isUpdateValid, updatedUser ]=await User.findById(foundUser._id).then((foundUser) => {
            const deviceIndex=foundUser.devices.findIndex(device => device.ip===req.socket.remoteAddress);
            foundUser.devices[deviceIndex].lastLoginDate=new Date();
            foundUser.devices[deviceIndex].client=req.headers['user-agent'];
            foundUser.save().catch((err) => {
                res.status(500).send('500 Internal Server Error');
                return [ false, null ];
            });
            return [ true, foundUser ];
        }).catch((err) => {
            if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
            else res.status(500).send('500 Internal Server Error');
            return [ false, null ];
        });
        if(!isUpdateValid) return;
        const token=jwt.sign({_id: foundUser._id, _deviceId: updatedUser.devices.find(user => user.ip===req.socket.remoteAddress)._id}, process.env.TOKEN_SECRET);
        return res.status(201).send(token);
    } else {
        const [ isUpdateValid, updatedUser ]=await User.findByIdAndUpdate(foundUser._id, {
            $push: {
                devices: {
                    name: req.body.device,
                    ip: req.socket.remoteAddress,
                    client: req.headers['user-agent'],
                    createDate: new Date(),
                    lastLoginDate: new Date(),
                },
            },
        }).then((updatedUser) => {
            return [ true, updatedUser ];
        }).catch((err) => {
            if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
            else res.status(500).send('500 Internal Server Error');
            return [ false, null ];
        });
        if(!isUpdateValid) return;
        const token=jwt.sign({_id: foundUser._id, _deviceId: updatedUser.devices.find(user => user.ip===req.socket.remoteAddress)._id}, process.env.TOKEN_SECRET); // *Remember that this is only one response for not existing device (line 142)
        return res.status(201).send(token);
    }
});



// *Logout routes
router.post('/logout', verify, async (req, res) => {
    const [ isRemoved, isError ]=await User.findByIdAndUpdate(res.locals.user._id, {$pull: {devices: {_id: res.locals.device._id}}}).then((user) => {
        if(user) return [ true, false ];
        else return [ false, false ];
    }).catch((err) => {
        return [ false, true ];
    });
    if(isRemoved) return res.status(200).send('Logged out');
    else if(isError) return res.status(500).send('500 Internal Server Error');
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
    const isValid=await user.validate(user).then(() => {
        return true;
    }).catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return false;
    });
    if(!isValid) return;

    // Compare passwords
    const [ isMatch, isCompareError ]=await bcrypt.compare(user.password, res.locals.user.password).then((isMatch) => {
        if(!isMatch) return [ false, false ];
        else return [ true, false ];
    }).catch((err) => {
        return [ false, true ];
    });
    if(isCompareError) return res.status(500).send('500 Internal Server Error');
    if(!isMatch) return res.status(400).send('Invalid password');

    // Delete user and all devices
    const [ isDeleted, isError ]=await User.findByIdAndUpdate(res.locals.user._id, {
        $set: {
            'delete.isDeleted': true,
            'delete.deleteDate': new Date(),
            'devices': [],
        },
    }).then((user) => {
        if(user) return [ true, false ];
        else return [ false, false ];
    });
    if(isError) return res.status(500).send('500 Internal Server Error');
    if(isDeleted) return res.status(200).send('Deleted');
});