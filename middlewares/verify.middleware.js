const jwt=require('jsonwebtoken');
const User=require('../models/users.model');

module.exports=async (req, res, next) => {
    // Get token
    const token=await req.header('auth-token'); 
    if(!token) return res.status(401).json({
        "status": "error",
        "message": "No token provided",
    }); 

    // Check if token exists and is valid
    const [ validError, decoded ]=await jwt.verify(token, process.env.TOKEN, (err, decoded) => [err, decoded]);
    if(validError) return res.status(400).json({
        "status": "error",
        "message": "Invalid token",
    });

    // Check if user exists (and not deleted)
    const [ findError, foundUser ]=await User.findOne({"_id":decoded._id, "delete.isDeleted":false})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).json({
        "status": "error",
        "message": "500 Internal Server Error",
    });
    if(!foundUser) return res.status(401).json({
        "status": "error",
        "message": "User not found",
    });
    
    // Check if user is banned
    const foundBan=await foundUser.bans.find(ban => ban.banExpirationDate>new Date());
    if(foundBan) return res.status(403).json({
        "status": "error",
        "message": "You are banned",
        "data": {
            "reason": foundBan.banReason,
            "expirationDate": foundBan.banExpirationDate,
        },
    });

    // Check if user's device is in device list
    const foundDevice=await foundUser.devices.find(device => device.ip===req.socket.remoteAddress);
    if(!foundDevice) return res.status(401).json({
        "status": "error",
        "message": "Device not found",
    });

    // Pass and return found user object
    res.locals.user=foundUser; // ? should I also return decoded token values
    res.locals.device=foundDevice;
    return next();
};