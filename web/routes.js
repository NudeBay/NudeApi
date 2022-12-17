const router=require('express').Router();
const path = require('path');
module.exports=router;

// *Dashboard routes
router.get('*',(req,res)=>{
    return res.sendFile('./public/html/index.html',  { root: __dirname });
});

// !Error handlers
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).sendFile('./public/html/index.html',  { root: __dirname });
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send(err)
});