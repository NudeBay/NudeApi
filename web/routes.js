const router=require('express').Router();
module.exports=router;

// *Robots.txt from nudebay folder 
router.get('/robots.txt', (req,res) => res.sendFile('./public/robots.txt',  { root: __dirname }));

// *Dashboard routes
router.get('*', (req,res) => res.sendFile('./public/html/index.html',  { root: __dirname }));


// !Error handlers
// *404
router.use(function fourOhFourHandler (req, res) {
    res.status(404).send('Cannot get the requested page. We work on it. Try again later.');
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    res.status(500).send('The server has encountered a situation it does not know how to handle. We work on it. Try again later.');
});