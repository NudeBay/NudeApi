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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
        body: '<div class="home-container"><div class="player"><div class="title">Użytkownik</div><div class="video-holder"><img src="https://external-preview.redd.it/OKDIlX9bzHeDhsJwINv4Ap0_yRESWoS6SHS__8O7Jb8.jpg?width=640&crop=smart&auto=webp&s=ce45a796002295f90ac80b4166a820b23ccb2569"></div><div class="description"><p>Nazwa</p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, recusandae sunt? Voluptatem, dolorum perferendis autem neque, soluta similique, tempora consequuntur modi tempore praesentium nulla! Voluptas laborum fuga odio laboriosam numquam!</div></div><div class="player"><div class="title">Użytkownik</div><div class="video-holder"><video poster="https://thumbs4.redgifs.com/GiftedAquamarineOlm-mobile.jpg?expires=1669921200&signature=5fdcd58bc3d054dc08aa81d7bdb5f8e2f87500fe1458af89550b629dbf2c0e99&for=83.22.60.55" preload="metadata" playsinline autoplay muted loop controls><source src="https://thumbs4.redgifs.com/BronzeObeseDipper-mobile.mp4?expires=1669917600&signature=eb0d3160eec5064fb39386a1b1af447df829d5cf728ddf3c43d34f067a8ba557&for=83.22.60.55#t=0" type="video/mp4"><source src="https://thumbs4.redgifs.com/BronzeObeseDipper-mobile.mp4?expires=1669917600&signature=eb0d3160eec5064fb39386a1b1af447df829d5cf728ddf3c43d34f067a8ba557&for=83.22.60.55#t=0" type="video/ogg">Your browser does not support the videos. </video></div><div class="description"><p>Nazwa</p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, recusandae sunt? Voluptatem, dolorum perferendis autem neque, soluta similique, tempora consequuntur modi tempore praesentium nulla! Voluptas laborum fuga odio laboriosam numquam!</div></div></div>',
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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
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
        profilePicture: 'https://preview.redd.it/od82cfcrrg2a1.png?width=640&crop=smart&auto=webp&s=4314f330aac503ccf9d1e71a013c6de690a04471',
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