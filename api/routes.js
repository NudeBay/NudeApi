const router=require('express').Router();
module.exports=router;
const mongoose=require('mongoose');

// ***Host***
// const io = new Server(require('../app'), {});

// ***Connect to Database***
const uri=process.env.DB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('\x1b[32m','Server connected','\x1b[0m',`(on uri ${uri})...`))
.catch((err) => console.error('\x1b[31m','Database error:','\x1b[0m',err));


// *Home routes
router.use('/', require('./routes/home'));

// *Search routes
router.use('/search', require('./routes/search'));


// *Messages routes
router.use('/messages', require('./routes/messages'));


// *Notifications routes
router.use('/notifications', require('./routes/notifications'));


// *Create routes
router.use('/create', require('./routes/create'));


// *Profile routes
router.use('/profile', require('./routes/profile'));


// *Settings routes
router.use('/settings', require('./routes/settings'));


// *Account routes
router.use('/account', require('./routes/account'));


// ***Error handlers***
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).send('404 Not Found');
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send('500 Internal Server Error');
});