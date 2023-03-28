const router=require('express').Router();
module.exports=router;
const mongoose=require('mongoose'); // ?Do I need this?
// Schemas
const User=require('../models/users');
// Middlewares
const verify=require('../middlewares/verify');



// *Get settings
router.get('/settings', verify, async (req, res) => {
    // Get settings 
    const settings={
        _id:res.locals.user._id,
        nickname:res.locals.user.nickname,
        email:res.locals.user.email,
        aboutMe:res.locals.user.aboutMe,
        status:res.locals.user.status,
        profilePicture:res.locals.user.profilePicture,
        backgroundPicture:res.locals.user.backgroundPicture,
        createDate:res.locals.user.createDate,
        bans:res.locals.user.bans,
        devices:res.locals.user.devices,
        settings:res.locals.user.settings,
    };

    // Send settings
    res.status(200).send(settings);
});



// *Update settings
router.put('/settings', verify, async (req, res) => {
    // Get updated settings

    // Update settings

    // Validate (test) user with new settings

    // Put new settings
});