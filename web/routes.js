const router=require('express').Router();
module.exports=router;

// *Dashboard routes
router.get('/',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com',
        isHome: true,
    });
});

// *Search routes
router.get('/search',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/search',
        isSearch: true,
    });
});

// *Messages routes
router.get('/messages',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/messages',
        isMessages: true,
    });
});

// *Notifications routes
router.get('/notifications',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/notifications',
        isNotifications: true,
    });
});

// *Create routes
router.get('/create',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/create',
        isCreate: true,
    });
});

// *Profile routes
router.get('/profile',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/profile',
        isProfile: true,
    });
});

// *Settings routes
router.get('/settings',(req,res)=>{
    return res.render('index',{
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: '',
        pageAuthor: 'NudeBay',
        pageKeywords: '',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/settings',
        isSettings: true,
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