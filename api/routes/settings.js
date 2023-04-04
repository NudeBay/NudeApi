const router=require('express').Router();
module.exports=router;
// Schemas
const User=require('../models/users');
// Middlewares
const verify=require('../middlewares/verify');



// *Get settings
router.get('/get', verify, async (req, res) => {
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
    res.status(200).json(settings);
});



// *Update settings
router.put('/update', verify, async (req, res) => {
    // Get updated settings
    const user=new User({ // TODO: update to not update all date (only changed) 
        nickname:req.body.nickname || null,
        email:req.body.email || null,
        phone:req.body.phone || null,
        password:req.body.password || null,
        birthDate:req.body.birthDate || null,
        aboutMe:req.body.aboutMe || null,
        status:req.body.status || null,
        profilePicture:req.body.profilePicture || null,
        backgroundPicture:req.body.backgroundPicture || null,
        devices:req.body.devices || null,
        settings:req.body.settings || null,
    });
    
    // Validate
    const validateError=await User.validate(user)
    .then(() => null)
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return err;
    });
    if(validateError) return;
    
    // Check if nickname or phone is taken
    const [ findError, foundUser ]=await User.findOne({$and: [{$or: [{nickname: user.nickname}, {email: user.email}, {phone: user.phone}]}, {"delete.isDeleted":false}, {$ne: {_id: res.locals.user._id}}]})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).send('500 Internal Server Error');
    if(foundUser.nickname===user.nickname) return res.status(400).send('Nickname is taken');
    else if(foundUser.phone===user.phone) return res.status(400).send('Phone is taken');
    else if(foundUser.email===user.email) return res.status(400).send('Email is taken');

    // Confirm by password
    if(!req.body.oldPassword) return res.status(400).send('Old password is required');
    const [ confirmError, isMatch ]=await User.comparePassword(req.body.oldPassword, res.locals.user.password)
    .then((isMatch) => [ null, isMatch ])
    .catch((err) => [ err, null ]);
    if(confirmError) return res.status(500).send('500 Internal Server Error');
    if(!isMatch) return res.status(400).send('Old password is incorrect');
    
    // Update settings
    const [ updateError, updatedUser ]=await User.findByIdAndUpdate(res.locals.user._id, {$and: [{$exists: true}, {$set:{user}}]}, {new: true})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(updateError) return res.status(500).send('500 Internal Server Error');
    return res.status(200).send('Deleted');
});