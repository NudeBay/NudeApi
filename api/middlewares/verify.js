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
            // Check if user is banned
            // Check if user's device is in device list
            // return user object (maybe with header('user', foundUser))
            // next();
        }
    });
};