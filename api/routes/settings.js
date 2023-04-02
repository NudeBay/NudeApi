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
        bages:res.locals.user.bages, // to show not to change
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
    const user=new User({
        nickname:req.body.nickname || undefined,
        email:req.body.email || undefined,
        phone:req.body.phone || undefined,
        password:req.body.password || undefined,
        birthDate:req.body.birthDate || undefined,
        aboutMe:req.body.aboutMe || undefined,
        status:req.body.status || undefined,
        profilePicture:req.body.profilePicture || undefined,
        backgroundPicture:req.body.backgroundPicture || undefined,
        devices:req.body.devices || undefined,
        settings:req.body.settings || undefined,
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
    
    // Check if nickname is taken
    const [ findError, foundUser ]=await User.findOne({$and: [{nickname: user.nickname}, {"delete.isDeleted":false}]})
    .then((user) => [ null, user ])
    .catch((err) => [ err, null ]);
    if(findError) return res.status(500).send('500 Internal Server Error');
    if(foundUser) return res.status(400).send('User with this nickname already exists');

    // Check if email is taken

    // Confirm by password
    
    // Update settings (ignore undefined values)
    const [ updateError, updatedUser ]=await User.findByIdAndUpdate(res.locals.user._id, user, {$not: undefined, new: true})
    .then((user) => [ null, user ])
    .catch((err) => {
        if(err.name==='ValidationError') res.status(400).send(Object.values(err.errors).map(val => val.message));
        else res.status(500).send('500 Internal Server Error');
        return [ err, null ];
    });
    if(updateError) return;
    return res.status(200).send('Settings updated');
});