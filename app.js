const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const path=require('path');
app.set('view engine','hbs'); //?(ejs)
app.set('views', path.join(__dirname, 'web/private/views'));

//Public folder
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '/web/public')));

// Host Web Server
const port=process.env.PORT;
app.listen(port, (err)=>{
    if(err) {
        return console.error('\x1b[31m','Can not start the host:','\x1b[0m',err);
    }
    else {
        return console.log('\x1b[32m','Host listening','\x1b[0m',`(on port ${port})...`,'\x1b[0m');
    }
});

// Import Web Routes
const webRoutes=require('./web/routes');
app.use('/', webRoutes);

// Import Api Routes
const apiRoutes=require('./api/routes');
app.use('api/', apiRoutes);

// Error handlers
// 404
app.use(function fourOhFourHandler (req, res) {
    return res.status(404).render('dashboard', {
        pageTitle: 'NudeBay | 404',
        pageDescription: 'Cannot find the specific site.',
        pageAuthor: 'NudeBay',
        pageKeywords: '404, page not found, nudebay, nudebay.com',
        pageType: 'website',
        pageUrl: 'https://nudebay.com/404',
        homePage: '/',
        body: `<div class="error-container"><h1>ERROR 404</h1><p>Cannot find the specific site.</p><a href="/">Go back to Home</a></div>`,
    });
});
// 500
app.use(function fiveHundredHandler (err, req, res, next) {
    return res.status(500).send(err)
});