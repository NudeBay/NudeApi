const router=require('express').Router();
module.exports=router;

// Dashboard page
router.get('/', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: 'Chaos Dashboard.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/404',
    });
});

// Chat page
// router.get('/chat', (req,res)=>{
//     return res.render('dashboard', {});
// });

// Sign up page
// router.get('/sign_up', (req, res)=>{
//     return res.render('sign_up', {});
// });

// Sign in page
// router.get('/sign_in', (req, res)=>{
//     return res.render('sign_up', {});
// });