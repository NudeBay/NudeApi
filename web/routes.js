const router=require('express').Router();
module.exports=router;

// *Dashboard routes
router.get('*',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: 'FREE!!! website for watching porn',
        pageAuthor: 'NudeBay',
        pageKeywords: 'nudebay, nudebay.com, porn, pussy, free, sex, nude, girls',
        pageType: 'website',
        pageUrl: 'https://nudebay.com',
    });
});

// !Error handlers
// *404
router.use(function fourOhFourHandler (req, res) {
    return res.status(404).render('index',{
        pageTitle: 'NudeBay | 404',
        pageDescription: 'Cannot find the specific site.',
        pageAuthor: 'NudeBay',
        pageKeywords: '404, page not found, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/404',
    });
});
// *500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send(err)
});