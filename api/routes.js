const router=require('express').Router();
module.exports=router;

// ...other routes

// !Error handlers
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).send('404 Not Found');
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send('500 Internal Server Error');
});