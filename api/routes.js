const router=require('express').Router();
module.exports=router;
const { response, json } = require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// Schemas
const Message=require('./models/messages');
const Post=require('./models/posts');
const Report=require('./models/reports');
const Tag=require('./models/tags');
const User=require('./models/users');
// Middlewares
// const verifyToken=require('./middlewares/verifyToken');

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
// ...

// *Search routes
// ...

// *Messages routes
// ...

// *Notifications routes
// ...

// *Create routes
// ...

// *Profile routes
// ...

// *Settings routes
// ...

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
    const [ isExists, isFindError, foundUser ]=await User.findOne({"email":user.email, "delete.isDeleted":false}).then((user) => {
        if(user) return [ true, false, user ];
        else return [ false, false, null ];
    }).catch((err) => {
        return [ false, true, null ];
    });
    if(isFindError) return res.status(500).send('500 Internal Server Error');
    if(!isExists) return res.status(400).send('Invalid email or password');

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

    // Check if device is already logged in (return device ObjectID)
    // ... (ADD EXPRESS-DEVICE)

    // If not, add device to user (return device ObjectID)
    // ...

    // Create token (create token with device ObjectID)
    const token=jwt.sign({_id: foundUser._id}, process.env.TOKEN_SECRET);
    return res.status(200).send(json({"token":token}));
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
        // devices: [{}], ADD EXPRESS-DEVICE
        // settings: req.body.settings, []
        // notifications: req.body.notifications, []
    });

    // Validate
    const isValid=await user.validate(user).then(() => {
        return true;
    }).catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
    else res.status(500).send('500 Internal Server Error');
        return false;
    });
    if(!isValid) return res.status(500).send('500 Internal Server Error');

    // Check if user exists
    const [ isExists, isFindError, foundUser ]=await User.findOne({"email":user.email, "delete.isDeleted":false}).then((user) => {
        if(user) return [ true, false, user ];
        else return [ false, false, null ];
    }).catch((err) => {
        return [ false, true, null ];
    });
    if(isFindError) return res.status(500).send('500 Internal Server Error');
    if(isExists) return res.status(400).send('User with this email already exists');

    // Hash password
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password, salt);

    // Save user
    const [ isSaved, savedUser ]=await user.save().then((user) => {
        return [ true, user];
    }).catch((err) => {
        if(err.name==='ValidationError') res.status(500).send('500 Internal Server Error');
        else res.status(500).send('500 Internal Server Error');
        return [ false, null];
    });
    if(!isSaved) return;
    
    // Create token (create token with device ObjectID)
    const token=await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET); // Add device_id to payload
    return res.status(200).send(json({"token":token}));
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