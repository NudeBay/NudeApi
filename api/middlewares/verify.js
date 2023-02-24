const express=require('express'); // ? do i need that declaration
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose'); // ? and that one
const User=require('../models/users');

module.exports=(req, res, next) => {
    const token=req.header('auth-token'); // Get token
    if(!token) return res.status(401).send('Access Denied'); // Check if token exists
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => { // Verify token
        if(err) return res.status(400).send('Invalid Token');
        else {
            // Check if user exists
            const [ isValid, foundUser ]=User.findOne({"_id": decoded._id, "delete.isDeleted":false}).then((foundUser) => {
                if(foundUser) return [ true, foundUser ];
                else return [ false, null ];
            }).catch((err) => {
                return [ false, null ];
            });
            if(!isValid) return res.status(500).send('500 Internal Server Error');
            
            // Check if user is banned
            const foundBan=foundUser.bans.find(ban => ban.banExpirationDate>new Date());
            if(foundBan) return res.status(403).send(`You are banned until ${foundBan.banExpirationDate} for "${foundBan.banReason}"`);

            // Check if user's device is in device list
            const foundDevice=foundUser.devices.find(device => device.ip===req.socket.remoteAddress ?? req.ip);
            if(!foundDevice) return res.status(401).send('This IP is unauthorized');

            // Pass and return found user object
            res.locals.user=foundUser;
            return next();
        }
    });
};