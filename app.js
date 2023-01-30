const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const path=require('path');

// *Public folder
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '/web/public')));

// *Host Web Server
const port=process.env.PORT;
app.listen(port, (err)=>{
    if(err) {
        return console.error('\x1b[31m','Can not start the host:','\x1b[0m',err);
    } else {
        return console.log('\x1b[32m','Host listening','\x1b[0m',`(on port ${port})...`,'\x1b[0m');
    }
});

// *Import Api Routes
const apiRoutes=require('./api/routes');
app.use('/api', apiRoutes);

// *Import Web Routes
const webRoutes=require('./web/routes');
app.use('/', webRoutes);
