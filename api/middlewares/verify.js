const express=require('express'); // ? do I need that declaration
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose'); // ? and that one
const User=require('../models/users');

module.exports=async (req, res, next) => {
    // Get token
    const token=await req.header('auth-token'); 
    if(!token) return res.status(401).send('Access Denied'); 

    // Check if token exists and is valid
    const [ isValidToken, decoded ]=await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return [ false, null ];
        else return [ true, decoded ];
    });
    if(!isValidToken) return res.status(400).send('Invalid Token');

    // Check if user exists (and not deleted)
    const [ isFindError, foundUser ]=await User.findOne({"_id":decoded._id, "delete.isDeleted":false}).then((user) => {
        if(user) return [ false, user ];
        else return [ false, null ];
    }).catch((err) => {
        return [ true, null ];
    });
    if(isFindError) return res.status(500).send('500 Internal Server Error');
    if(!foundUser) return res.status(401).send('This tokenID is unauthorized');
    
    // Check if user is banned
    const foundBan=await foundUser.bans.find(ban => ban.banExpirationDate>new Date());
    if(foundBan) return res.status(403).send(`You are banned until ${foundBan.banExpirationDate} for "${foundBan.banReason}"`);

    // Check if user's device is in device list
    const foundDevice=await foundUser.devices.find(device => device.ip===req.socket.remoteAddress);
    if(!foundDevice) return res.status(401).send('This IP is unauthorized');

    // Pass and return found user object
    res.locals.user=foundUser; // ? should I also return decoded token values
    return next();
};