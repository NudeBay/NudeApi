const router=require('express').Router();
module.exports=router;
const mongoose=require('mongoose');
// Schemas
const User=require('./models/users');
const Message=require('./models/messages');
const Notification=require('./models/notifications');
const Tag=require('./models/tags');
// Middlewares
const verifyToken=require('./middlewares/verifyToken');

// ***Host***
// const io = new Server(require('../app'), {});

// ***Connect to Database***
const uri=process.env.DB_URI;
mongoose.connect(uri, {
    strictQuery: true,
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
// ...

// *Register routes
// ...


// ***Error handlers***
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).send('404 Not Found');
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send('500 Internal Server Error');
});