import { Router, Request, Response } from 'express';
const router: Router=Router();
export default router;
import bcrypt from 'bcrypt';
// Schemas
import User, { IUser, IDevice, IBan, ISettings } from '../models/users.model'; // ! if doesn't work try: import { User } from '../models/users.model';
// Middlewares
import verify from '../middlewares/verify.middleware';
import { settingsLimiter } from '../middlewares/limit.middleware';
router.use(settingsLimiter);

interface ICustomSettings {
    nickname: string;
    email: string;
    phone?: string | null;
    password: string;
    birthDate?: Date | null;
    badges?: string[] | null;
    aboutMe?: string | null;
    status?: string | null;
    profilePicture?: string | null;
    backgroundPicture?: string | null;
    createDate: Date;
    bans: IBan[];
    devices: IDevice[];
    settings: ISettings,
};


// *Get settings
router.get('/get', verify, async (_req: Request, _res: Response) => {
    try {
        // Get settings 
        const settings: ICustomSettings={
            nickname: _res.locals.user.nickname,
            email: _res.locals.user.email,
            phone: _res.locals.user.phone,
            password: 'secret',
            birthDate: _res.locals.user.birthDate,
            badges: _res.locals.user.badges, // to show not to change
            aboutMe: _res.locals.user.aboutMe,
            status: _res.locals.user.status,
            profilePicture: _res.locals.user.profilePicture,
            backgroundPicture: _res.locals.user.backgroundPicture,
            createDate: _res.locals.user.createDate, // to show not to change
            bans: _res.locals.user.bans, // to show not to change
            devices: _res.locals.user.devices,
            settings: _res.locals.user.settings,
        };
    
        // Send settings
        return _res.status(200).json({
            status: "success",
            message: "Settings sent",
            data: settings,
        });
    } catch(error) {
        console.error(error);
        return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
    }
});



// *Update settings
router.put('/put', verify, async (_req: Request, _res: Response) => { //TODO: update
    try {
        // Get updated settings
        const user: IUser=new User({ 
            nickname: _req.body.nickname,
            email: _req.body.email,
            phone: _req.body.phone,
            password: _req.body.password,
            birthDate: _req.body.birthDate,
            aboutMe: _req.body.aboutMe,
            status: _req.body.status,
            profilePicture: _req.body.profilePicture,
            backgroundPicture: _req.body.backgroundPicture,
            devices: _req.body.devices,
            settings: _req.body.settings,
        });
        
        // Validate
        const validateError=await User.validate(user)
        .then(() => null)
        .catch((err) => {
            if(err.name==='ValidationError') _res.status(400).json({
                status: "error",
                message: err.message,
            });
            else _res.status(500).json({
                status: "error",
                message: "500 Internal Server Error",
            });
            return err;
        });
        if(validateError) return;
        
        // Check if nickname or phone is taken
        const [ findError, foundUser ]=await User.findOne({$and: [{$or: [{nickname: user.nickname}, {email: user.email}, {phone: user.phone}]}, {"delete.isDeleted":false}, {_id: {$ne: _res.locals.user._id}}]})
        .then((user) => [ null, user ])
        .catch((err) => [ err, null ]);
        if(findError) return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        if(foundUser) {
            if(foundUser.nickname===user.nickname) return _res.status(400).json({
                status: "error",
                message: "Nickname is taken",
            });
            else if(foundUser.phone===user.phone) return _res.status(400).json({
                status: "error",
                message: "Phone is taken",
            });
            else if(foundUser.email===user.email) return _res.status(400).json({
                status: "error",
                message: "Email is taken",
            });
        }
    
        // Confirm by password
        if(!_req.body.oldPassword) return _res.status(400).json({
            status: "error",
            message: "Old password is required",
        });
        const [ confirmError, isMatch ]=await bcrypt.compare(_req.body.oldPassword, _res.locals.user.password)
        .then((isMatch) => [ null, isMatch ])
        .catch((err) => [ err, null ]);
        if(confirmError) return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        if(!isMatch) return _res.status(400).json({
            status: "error",
            message: "Old password is incorrect",
        });
        
        // Update settings
        const [ updateError, updatedUser ]=await User.findByIdAndUpdate(_res.locals.user._id, {$set:{user}} /* update this query */, {new: true}) // TODO: update to not update all date (only changed) 
        .then((user) => [ null, user ])
        .catch((err) => [ err, null ]);
        if(updateError) return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        return _res.status(200).json({
            status: "success",
            message: "Settings updated",
        });
    } catch(error) {
        console.error(error);
        return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
    }
});