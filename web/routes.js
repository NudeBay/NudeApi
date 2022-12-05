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
        body: `<div class="home-container"> <div class="player"> <div class="top-bar" onclick="window.location='/profile'"> <img src="https://scontent.fktw4-1.fna.fbcdn.net/v/t39.30808-6/318113999_851003419379369_5907902977516705988_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=C87TP0QsOH0AX8lLD0v&_nc_ht=scontent.fktw4-1.fna&oh=00_AfAdQn3ClmoeSiyumbDYHhIjE-9rXTMdLMt7jtn6lBPmQw&oe=6390F537" alt="[profil_name]" title="[profil_name]" class="icon"> <span class="text">Użytkownik</span> <div class="badges"> <img src="../../public/images/line/badge-check.svg" alt="[badge_name]" title="[badge_name]" class="badge"> <img src="../../public/images/solid/badge-check.svg" alt="[badge_name]" title="[badge_name]" class="badge"> </div> </div> <div class="content"> <img src="https://scontent.fktw4-1.fna.fbcdn.net/v/t39.30808-6/318315810_472302288378787_4749634914460129688_n.jpg?stp=dst-jpg_p526x296&_nc_cat=110&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=b1C5XW6XmUUAX8l1HoZ&_nc_ht=scontent.fktw4-1.fna&oh=00_AfDJtF-DaBCM9JVsmuVV4s6tMjZSpmrPHrJoX9nwEZ7yJA&oe=6391E8D5" alt="" title=""> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item"> <img src="../../public/images/line/heart.svg" alt="like" title="like"> </li> <li class="menu-item"> <img src="../../public/images/line/eye.svg" alt="see more" title="see more"> </li> <li class="menu-item"> <img src="../../public/images/line/bookmark.svg" alt="save" title="save"> </li> </ul> <ul class="tag-list"> <li class="tag" onclick="window.location='/'">dupa</li> <li class="tag" onclick="window.location='/'">kupa</li> </ul> </div> </div> <div class="player"> <div class="top-bar" onclick="window.location='/profile'"> <img src="https://scontent.fktw4-1.fna.fbcdn.net/v/t39.30808-6/314420649_3473793579571024_369544451128235695_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-Q1KKhZu114AX8GjF-J&tn=6IZ122Vvwql0uvXU&_nc_ht=scontent.fktw4-1.fna&oh=00_AfAUlwLhjGF58aSVHnEI2ScSRygJjxAjpz-j5pfomImelA&oe=63915ECF" alt="[profil_name]" title="[profil_name]" class="icon"> <span class="text">Użytkownik</span> <div class="badges"></div> </div> <div class="content"> <video poster="https://thumbs4.redgifs.com/EveryPlumpNakedmolerat-mobile.jpg?expires=1670259600&signature=119016e203755f9e5eff8aafc926f77a82eb998b5ea021319a9b08b8a0f6263f&for=83.22.52.122" preload="metadata" playsinline autoplay muted loop controls title=""> <source src="https://thumbs4.redgifs.com/EveryPlumpNakedmolerat-mobile.mp4?expires=1670257800&signature=ddbf4e8e17aadd660d1a9a31a2b4296e1cbc146eb3b904ea070c5516b31126ed&for=83.22.52.122&c=1823c31f7d3-745a-6589-0005-d8e8fe0a44c2#t=0" type="video/mp4"> <source src="https://thumbs4.redgifs.com/EveryPlumpNakedmolerat-mobile.mp4?expires=1670257800&signature=ddbf4e8e17aadd660d1a9a31a2b4296e1cbc146eb3b904ea070c5516b31126ed&for=83.22.52.122&c=1823c31f7d3-745a-6589-0005-d8e8fe0a44c2#t=0" type="video/ogg"> Your browser does not support the videos. </video> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item"> <img src="../../public/images/solid/heart.svg" alt="like" title="like"> </li> <li class="menu-item"> <img src="../../public/images/line/eye.svg" alt="see more" title="see more"> </li> <li class="menu-item"> <img src="../../public/images/solid/bookmark.svg" alt="save" title="save"> </li> </ul> <ul class="tag-list"> <li class="tag" onclick="window.location='/'">fajfus</li> <li class="tag" onclick="window.location='/'">dsdadas</li> </ul> </div> </div> <div class="player"> <div class="top-bar" onclick="window.location='/profile'"> <img src="https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg" alt="[profil_name]" title="[profil_name]" class="icon"> <span class="text">Użytkownik</span> <div class="badges"></div> </div> <div class="content"> <span>Slub za minute!</span> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item"> <img src="../../public/images/line/heart.svg" alt="like" title="like"> </li> <li class="menu-item"> <img src="../../public/images/line/eye.svg" alt="see more" title="see more"> </li> <li class="menu-item"> <img src="../../public/images/line/bookmark.svg" alt="save" title="save"> </li> </ul> </div> </div> <div class="player"> <div class="top-bar" onclick="window.location='/profile'"> <img src="https://i.pinimg.com/280x280_RS/e4/86/86/e4868681b6e2cc4ce83c3b9a5d010b6c.jpg" alt="[profil_name]" title="[profil_name]" class="icon"> <span class="text">Użytkownik</span> <div class="badges"></div> </div> <div class="content"> <img src="https://scontent.fktw1-1.fna.fbcdn.net/v/t39.30808-6/258309145_745799619710609_6745718143809189547_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=MWU5dJE6qRIAX-HsW8z&_nc_ht=scontent.fktw1-1.fna&oh=00_AfAxxZ-0radL-9slReLO8SCGO1pCIKOfMkVmZZQr8F0-sA&oe=639161B2" alt="" title=""> </div> <div class="bot-bar"> <ul class="menu"> <li class="menu-item"> <img src="../../public/images/line/heart.svg" alt="like" title="like"> </li> <li class="menu-item"> <img src="../../public/images/line/eye.svg" alt="see more" title="see more"> </li> <li class="menu-item"> <img src="../../public/images/line/bookmark.svg" alt="save" title="save"> </li> </ul> <ul class="tag-list"> <li class="tag" onclick="window.location='/'">dupa</li> <li class="tag" onclick="window.location='/'">kupa</li> </ul> </div> </div> </div>`,
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
        body: `<h1>Hello Search</h1>`,
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
        body: `<h1>Hello Messages</h1>`,
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
        body: `<h1>Hello Notifications</h1>`,
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
        body: `<h1>Hello Create</h1>`,
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
        body: `<h1>Hello [nameofprofile] Profile</h1>`,
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
        body: `<h1>Hello Settings</h1>`,
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