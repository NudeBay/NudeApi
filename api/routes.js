const router=require('express').Router();
module.exports=router;
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// Schemas
const Friendship=require('./models/friendships');
const Message=require('./models/messages');
const Post=require('./models/posts');
const Report=require('./models/reports');
const Tag=require('./models/tags');
const User=require('./models/users');
// Middlewares
const verify=require('./middlewares/verify');

// ***Host***
// const io = new Server(require('../app'), {});

// ***Connect to Database***
const uri=process.env.DB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log('\x1b[32m','Server connected','\x1b[0m',`(on uri ${uri})...`);
}).catch((err) => {
    console.error('\x1b[31m','Database error:','\x1b[0m',err);
});


// *Home routes
router.get('/home', verify, async (req, res) => { // !Remember to not display posts from blocked users and with compartment
    // Get posts (from followed users)

    // Get posts (from friends)

    // Get posts (from favorite tags)
    
    // Get posts (from favorite users)
    
    // Mix posts

    // Send posts (as list of objects)
});


// *Search routes
// ...


// *Messages routes
// ...


// *Notifications routes
// ...


// *Create routes
// ...


// *Profile routes
router.get('/profile/:id', verify, async (req, res) => {
    // Get user (by id) from req.params.id or if not exists from res.locals.user._id
    
    // return only public data
});

router.get('/profile/:id/posts', verify, async (req, res) => {
    // Get posts (by id) from req.params.id or if not exists from res.locals.user._id

    // return posts (as list of objects and if it's public)
});

router.get('/profile/:id/friends', verify, async (req, res) => {
    // Get friends (by id) from req.params.id or if not exists from res.locals.user._id

    // return friends (as list of objects and if it's public)
});

router.get('/profile/:id/followers', verify, async (req, res) => {
    // Get followers (by id) from req.params.id or if not exists from res.locals.user._id

    // return followers (as list of objects and if it's public)
});

router.get('/profile/:id/following', verify, async (req, res) => {
    // Get following (by id) from req.params.id or if not exists from res.locals.user._id

    // return following (as list of objects and if it's public)
});

router.get('/profile/:id/blocked', verify, async (req, res) => {
    // Get blocked (by id) from req.params.id or if not exists from res.locals.user._id

    // return blocked (as list of objects and if it's public)
});

router.get('/profile/:id/favorites', verify, async (req, res) => {
    // Get favorites (by id) from req.params.id or if not exists from res.locals.user._id

    // return favorites (as list of objects and if it's public)
});


// *Settings routes
router.get('/settings', verify, async (req, res) => {
    // get settings (and devices, pfp, description itp.) from res.locals.user

    // send settings (as one object)
});

router.put('/settings', verify, async (req, res) => {
    // update settings

    // obj.validate()

    // send response
});


// *Login routes
router.post('/login',async (req, res) => {
    // Create user
    const user=new User({
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
            foundUser.devices[deviceIndex].userAgent=req.headers['user-agent'];
            foundUser.devices[deviceIndex].client=req.device.type;
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
                    client: req.device.type,
                    userAgent: req.headers['user-agent'],
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
        const token=jwt.sign({_id: foundUser._id, _deviceId: updatedUser.devices.find(user => user.ip===req.socket.remoteAddress)._id}, process.env.TOKEN_SECRET); // *Remember that this is only one response for not existing device (line 115)
        return res.status(201).send(token);
    }
});


// *Register routes
router.post('/register',async (req, res) => {
    // Create user
    const user=await new User({
        nick: req.body.nick,
        tag: req.body.tag,
        email: req.body.email,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        password: req.body.password,
        // badges: req.body.badges, []
        // aboutMe: req.body.aboutMe,
        // status: req.body.status,
        // profilePicture: req.body.profilePicture,
        // backgroundPicture: req.body.backgroundPicture,
        createDate: new Date(),
        // delete: req.body.delete, []
        // bans: req.body.bans, []
        // following: req.body.following, []
        // saved: req.body.saved, []
        // blocked: req.body.blocked, []
        // muted: req.body.muted, []
        devices: {
            name: req.body.device,
            ip: req.socket.remoteAddress,
            client: req.device.type,
            userAgent: req.headers['user-agent'],
            createDate: new Date(),
            lastLoginDate: new Date(),
        },
        // settings: req.body.settings, []
        // notifications: req.body.notifications, []
    });

    // Validate
    const isValid=await user.validate(user).then(() => {
        return true;
    }).catch((err) => {
        if(err.name==='ValidationError') {
            res.status(400).send(Object.values(err.errors).map(val => val.message));
            return false;
        }
        else {
            res.status(500).send('500 Internal Server Error');
            return false;
        };
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
    if(foundUser) return res.status(400).send('User with this email already exists');

    // Hash password
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password, salt);

    // Save user
    const [ isSaved, savedUser ]=await user.save().then((user) => {
        return [ true, user ];
    }).catch((err) => {
        // if(err.name==='ValidationError')
        return [ false, null ];
    });
    if(!isSaved) return res.status(500).send('500 Internal Server Error');
    
    // Create token
    const token=await jwt.sign({_id: user._id, _deviceId: user.devices[0]._id}, process.env.TOKEN_SECRET);
    return res.status(201).send(token);
});


// ***Error handlers***
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).send('404 Not Found');
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send('500 Internal Server Error');
});