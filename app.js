const express=require('express');
const web=express();
const api=express();
const dotenv=require('dotenv');
dotenv.config();
const path=require('path');
const helmet=require('helmet');



// ***Host Web Server***
const webPort=process.env.WEB_PORT;
web.listen(webPort, (err)=>{
    if(err) return console.error('\x1b[31m','Can not start the web host:','\x1b[0m',err);
    else return console.log('\x1b[32m','WEB host listening','\x1b[0m',`(on port ${webPort})...`,'\x1b[0m');
});

// Public folder
web.use(express.json());
web.use('/public', express.static(path.join(__dirname, '/web/public')));

// Import Web Routes
web.use('/', require('./web/routes'));

// Security
web.use(helmet());



// ***Host Api Server***
const apiPort=process.env.API_PORT;
module.exports=api.listen(apiPort, (err)=>{
    if(err) return console.error('\x1b[31m','Can not start the api host:','\x1b[0m',err);
    else return console.log('\x1b[32m','API host listening','\x1b[0m',`(on port ${apiPort})...`,'\x1b[0m');
});

// Config Api
api.use(express.json());

// Import Api Routes
api.use('/', require('./api/routes'));

// Security
api.use(helmet());