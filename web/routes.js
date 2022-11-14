const router=require('express').Router();
module.exports=router;

// Landing page
router.get('/', (req,res)=>{
    res.render('index', {});
    res.send('Hello World');
});

// Sign up page
router.get('/sign_up', (req, res)=>{
    res.render('sign_up', {});
});

// Sign in page
router.get('/sign_in', (req, res)=>{
    res.render('sign_in', {});
});