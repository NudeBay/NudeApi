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
const home=require('./routes/home');
router.use('/', home);

// *Search routes
const search=require('./routes/search');
router.use('/search', search);


// *Messages routes
const messages=require('./routes/messages');
router.use('/messages', messages);


// *Notifications routes
const notifications=require('./routes/notifications');
router.use('/notifications', notifications);


// *Create routes
const create=require('./routes/create');
router.use('/create', create);


// *Profile routes
const profile=require('./routes/profile');
router.use('/profile', profile);


// *Settings routes
const settings=require('./routes/settings');
router.use('/settings', settings);


// *Account routes
const account=require('./routes/account');
router.use('/account', account);


// ***Error handlers***
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).send('404 Not Found');
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send('500 Internal Server Error');
});