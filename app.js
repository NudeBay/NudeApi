const express=require('express');
const web=express();
const api=express();
const dotenv=require('dotenv');
dotenv.config();
const path=require('path');
const helmet=require('helmet');



// ***Host Api Server***
const apiPort=process.env.PORT;
module.exports=api.listen(apiPort, (err)=>{
    if(err) return console.error('\x1b[31m','Can not start the api host:','\x1b[0m',err);
    else return console.log('\x1b[32m','API host listening','\x1b[0m',`(on port ${apiPort})...`,'\x1b[0m');
});

// Config Api
api.use(express.json());

// Import Api Routes
api.use('/', require('./routes'));

// Security
api.use(helmet());