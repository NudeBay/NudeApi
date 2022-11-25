const router=require('express').Router();
module.exports=router;

// Dashboard page
router.get('/', (req,res)=>{
    return res.render('', {});
});

// Chat page
router.get('/chat', (req,res)=>{
    return res.render('', {});
});

// Sign up page
router.get('/sign_up', (req, res)=>{
    return res.render('', {});
});

// Sign in page
router.get('/sign_in', (req, res)=>{
    return res.render('', {});
});