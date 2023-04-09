const jwt=require('jsonwebtoken');
const User=require('../models/users');

module.exports=async (req, res, next) => {
    // Get token
    const token=await req.header('auth-token'); 
    if(!token) return res.status(401).send('Access Denied'); 

    // Check if token exists and is valid
    const [ validError, decoded ]=await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => [err, decoded]);
    if(validError) return res.status(400).send('Invalid Token');

    // Check if user exists (and not deleted)
    const [ findError, foundUser ]=await User.findOne({"_id":decoded._id, "delete.isDeleted":false})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).send('500 Internal Server Error');
    if(!foundUser) return res.status(401).send('This tokenID is unauthorized');
    
    // Check if user is banned
    const foundBan=await foundUser.bans.find(ban => ban.banExpirationDate>new Date());
    if(foundBan) return res.status(403).send(`You are banned until ${foundBan.banExpirationDate} for "${foundBan.banReason}"`);

    // Check if user's device is in device list
    const foundDevice=await foundUser.devices.find(device => device.ip===req.socket.remoteAddress);
    if(!foundDevice) return res.status(401).send('This IP is unauthorized');

    // Pass and return found user object
    res.locals.user=foundUser; // ? should I also return decoded token values
    res.locals.device=foundDevice;
    return next();
};