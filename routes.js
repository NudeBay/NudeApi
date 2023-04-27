const router=require('express').Router();
module.exports=router;
const mongoose=require('mongoose');

// ***Host***
// const io = new Server(require('../app'), {});

// ***Connect to Database***
const uri=process.env.URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('\x1b[32m','Server connected','\x1b[0m',`(on uri ${uri})...`))
.catch((err) => console.error('\x1b[31m','Database error:','\x1b[0m',err));


// *Home routes
router.use('/', require('./routes/home.routes'));

// *Search routes
router.use('/search', require('./routes/search.routes'));


// *Messages routes
router.use('/messages', require('./routes/messages.routes'));


// *Notifications routes
router.use('/notifications', require('./routes/notifications.routes'));


// *Create routes
router.use('/create', require('./routes/create.routes'));


// *Profile routes
router.use('/profile', require('./routes/profile.routes'));


// *Settings routes
router.use('/settings', require('./routes/settings.routes'));


// *Account routes
router.use('/account', require('./routes/account.routes'));


// ***Error handlers***
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).json({
        "status": "error",
        "message": "404 Not Found",
    });
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).json({
        "status": "error",
        "message": "500 Internal Server Error",
    });
});