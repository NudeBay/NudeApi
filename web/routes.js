const router=require('express').Router();
module.exports=router;

// *Dashboard routes
router.get('*',(req,res)=>{
    return res.sendFile('./public/html/index.html',  { root: __dirname });
});

// !Error handlers
// *404
router.use(function fourOhFourHandler (req, res) {
    console.error('\x1b[31m','404 error','\x1b[0m');
    res.status(404).send('Cannot get the requested page. We work on it. Try again later.');
    // error 404 should not exist in production bc of get * route
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    console.error('\x1b[31m','500 error','\x1b[0m',err);
    res.status(500).send('The server has encountered a situation it does not know how to handle. We work on it. Try again later.');
});