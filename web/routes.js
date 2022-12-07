const router=require('express').Router();
module.exports=router;

router.get('/',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com',
    });
});

// Error handlers
// 404
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
// 500
router.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send(err)
});