const router=require('express').Router();
module.exports=router;

// *Dashboard routes*
router.get('/', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Dashboard',
        pageDescription: 'Chaos Dashboard.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/',
        isHome: true,
        // isSearch: false,
        // isMessages: false,
        // isNotifications: false,
        // isCreate: false,
        // isProfile: false,
        // isSettings: false,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<div class="home-container"> <div class="player"> <div class="top-bar">Użytkownik</div> <div class="content"> <img src="https://preview.redd.it/e3772x3d0k3a1.jpg?width=640&crop=smart&auto=webp&s=094c23015e16bce510fe81618eb5eed7ea07092c"> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item" id="like"><img src="../../public/images/line/star.svg" alt="like"></li> <li class="menu-item" id="save"><img src="../../public/images/line/bookmark.svg" alt="save"></li> </ul> <ul class="tag-list"> <li class="tag">dupa</li> <li class="tag">kupa</li> </ul> </div> </div> <div class="player"> <div class="top-bar">Użytkownik</div> <div class="content"> <video poster="https://thumbs4.redgifs.com/GiftedAquamarineOlm-mobile.jpg?expires=1669921200&signature=5fdcd58bc3d054dc08aa81d7bdb5f8e2f87500fe1458af89550b629dbf2c0e99&for=83.22.60.55" preload="metadata" playsinline autoplay muted loop controls> <source src="https://i.imgur.com/3YESpWP.mp4" type="video/mp4"> <source src="https://i.imgur.com/3YESpWP.mp4" type="video/ogg"> Your browser does not support the videos. </video> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item" id="like"><img src="../../public/images/solid/star.svg" alt="like"></li> <li class="menu-item" id="save"><img src="../../public/images/solid/bookmark.svg" alt="save"></li> </ul> <ul class="tag-list"> <li class="tag">fajfus</li> <li class="tag">dsdadas</li> </ul> </div> </div> <div class="player"> <div class="top-bar">Użytkownik</div> <div class="content"> <span>Hiiii guys,<br>what u thing about my last photo??</span> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item" id="like"><img src="../../public/images/line/star.svg" alt="like"></li> <li class="menu-item" id="save"><img src="../../public/images/line/bookmark.svg" alt="save"></li> </ul> <ul class="tag-list"> <li class="tag">dupa</li> <li class="tag">kupa</li> </ul> </div> </div> </div>',
    });
});


// *Search routes*
router.get('/search', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Search',
        pageDescription: 'Chaos search.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/search',
        // isHome: false,
        isSearch: true,
        // isMessages: false,
        // isNotifications: false,
        // isCreate: false,
        // isProfile: false,
        // isSettings: false,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<h1>Hello Search</h1>',
    });
});


// *Chat routes*
router.get('/messages', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Inbox',
        pageDescription: 'Chaos inbox.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/messages',
        // isHome: false,
        // isSearch: false,
        isMessages: true,
        // isNotifications: false,
        // isCreate: false,
        // isProfile: false,
        // isSettings: false,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<h1>Hello Messages</h1>',
    });
});


// *Notifications routes*
router.get('/notifications', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Notifications',
        pageDescription: 'Chaos notifications.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/notifications',
        // isHome: false,
        // isSearch: false,
        // isMessages: false,
        isNotifications: true,
        // isCreate: false,
        // isProfile: false,
        // isSettings: false,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<h1>Hello Notifications</h1>',
    });
});


// *Create routes*
router.get('/create', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Create',
        pageDescription: 'Chaos create post.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/create',
        // isHome: false,
        // isSearch: false,
        // isMessages: false,
        // isNotifications: false,
        isCreate: true,
        // isProfile: false,
        // isSettings: false,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<h1>Hello Create</h1>',
    });
});


// *Profile routes*
router.get('/profile', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | [nameofprofile]',
        pageDescription: 'Chaos [nameofprofile] profile.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/profile',
        // isHome: false,
        // isSearch: false,
        // isMessages: false,
        // isNotifications: false,
        // isCreate: false,
        isProfile: true,
        // isSettings: false,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<h1>Hello [nameofprofile] Profile</h1>',
    });
});

// *Settings routes*
router.get('/settings', (req,res)=>{
    return res.render('dashboard', {
        pageTitle: 'NudeBay | Settings',
        pageDescription: 'Chaos your settings.',
        pageAuthor: 'NudeBay',
        pageKeywords: 'porn, nudes, pussy, free, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/settings',
        // isHome: false,
        // isSearch: false,
        // isMessages: false,
        // isNotifications: false,
        // isCreate: false,
        // isProfile: false,
        isSettings: true,
        profilePicture: 'https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg',
        body: '<h1>Hello Settings</h1>',
    });
});


// *Sign up routes*
// router.get('/sign_up', (req, res)=>{
//     return res.render('sign_up', {});
// });


// *Sign in routes*
// router.get('/sign_in', (req, res)=>{
//     return res.render('sign_up', {});
// });