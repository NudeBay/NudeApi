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
        styles: [],
        scripts: [],
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
        styles: [],
        scripts: [],
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
        styles: [],
        scripts: [],
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
        styles: [],
        scripts: [],
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
        styles: [],
        scripts: [],
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
        styles: [],
        scripts: [],
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
        styles: [],
        scripts: [],
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