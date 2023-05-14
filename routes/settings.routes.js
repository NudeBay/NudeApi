const router=require('express').Router();
module.exports=router;
const bcrypt=require('bcrypt');
// Schemas
const User=require('../models/users.model');
// Middlewares
const verify=require('../middlewares/verify.middleware');
const { settingsLimiter }=require('../middlewares/limit.middleware');
router.use(settingsLimiter);


// *Get settings
router.get('/', verify, async (req, res) => {
    // Get settings 
    const settings={
        nickname:res.locals.user.nickname,
        email:res.locals.user.email,
        phone:res.locals.user.phone,
        password:'secret',
        birthDate:res.locals.user.birthDate,
        badges:res.locals.user.badges, // to show not to change
        aboutMe:res.locals.user.aboutMe,
        status:res.locals.user.status,
        profilePicture:res.locals.user.profilePicture,
        backgroundPicture:res.locals.user.backgroundPicture,
        createDate:res.locals.user.createDate, // to show not to change
        bans:res.locals.user.bans, // to show not to change
        devices:res.locals.user.devices,
        settings:res.locals.user.settings,
    };

    // Send settings
    res.status(200).json({
        "status": "success",
        "message": "Settings sent",
        "data": settings,
    });
});



// *Update settings
router.put('/', verify, async (req, res) => { //TODO: update
    // Get updated settings
    const user=new User({ 
        nickname:req.body.nickname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        birthDate:req.body.birthDate,
        aboutMe:req.body.aboutMe,
        status:req.body.status,
        profilePicture:req.body.profilePicture,
        backgroundPicture:req.body.backgroundPicture,
        devices:req.body.devices,
        settings:req.body.settings,
    });
    
    // Validate
    const validateError=await User.validate(user)
    .then(() => null)
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).json({
            "status": "error",
            "message": err.message,
        });
        else res.status(500).json({
            "status": "error",
            "message": "500 Internal Server Error",
        });
        return err;
    });
    if(validateError) return;
    
    // Check if nickname or phone is taken
    const [ findError, foundUser ]=await User.findOne({$and: [{$or: [{nickname: user.nickname}, {email: user.email}, {phone: user.phone}]}, {"delete.isDeleted":false}, {_id: {$ne: res.locals.user._id}}]})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).json({
        "status": "error",
        "message": "500 Internal Server Error",
    });
    if(foundUser) {
        if(foundUser.nickname===user.nickname) return res.status(400).json({
            "status": "error",
            "message": "Nickname is taken",
        });
        else if(foundUser.phone===user.phone) return res.status(400).json({
            "status": "error",
            "message": "Phone is taken",
        });
        else if(foundUser.email===user.email) return res.status(400).json({
            "status": "error",
            "message": "Email is taken",
        });
    }

    // Confirm by password
    if(!req.body.oldPassword) return res.status(400).json({
        "status": "error",
        "message": "Old password is required",
    });
    const [ confirmError, isMatch ]=await bcrypt.compare(req.body.oldPassword, res.locals.user.password)
    .then((isMatch) => [ null, isMatch ])
    .catch((err) => [ err, null ]);
    if(confirmError) return res.status(500).json({
        "status": "error",
        "message": "500 Internal Server Error",
    });
    if(!isMatch) return res.status(400).json({
        "status": "error",
        "message": "Old password is incorrect",
    });
    
    // Update settings
    const [ updateError, updatedUser ]=await User.findByIdAndUpdate(res.locals.user._id, {$set:{user}} /* update this query */, {new: true}) // TODO: update to not update all date (only changed) 
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(updateError) return res.status(500).json({
        "status": "error",
        "message": "500 Internal Server Error",
    });
    return res.status(200).json({
        "status": "success",
        "message": "Settings updated",
    });
});