import { Router, Request, Response } from 'express';
const router: Router=Router();
export default router;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Schemas
import User, { IDelete, IBan, IDevice, ISettings, INotification, IUser } from '../models/users.model';
// Middlewares
import verify from '../middlewares/verify.middleware';
import { accountLimiter } from '../middlewares/limit.middleware';
router.use(accountLimiter);


// *Register routes
router.post('/', async (_req: Request, _res: Response) => {
    try {
        // Create user
        const user: IUser=await new User({
            nickname: _req.body.nickname,
            email: _req.body.email,
            phone: _req.body.phone,
            birthDate: _req.body.birthDate,
            password: _req.body.password,
            createDate: new Date(),
            devices: {
                name: _req.body.device,
                ip: _req.socket.remoteAddress,
                client: _req.headers['user-agent'],
                createDate: new Date(),
                lastLoginDate: new Date(),
            },
        });
    
        // Validate
        const validateError=await User.validate(user)
        .then(() => null)
        .catch((err) => {
            if(err.name==='ValidationError') _res.status(400).json({
                status: "error",
                message: err.message
            });
            else _res.status(500).json({
                status: "error",
                message: "500 Internal Server Error",
            });
            return err;
        });
        if(validateError) return;
    
        // Check if user exists
        const [ findError, foundUser ]=await User.findOne({$and: [{$or: [{"email":user.email}, {nickname: user.nickname}]}, {"delete.isDeleted":false}]})
        .then((user) => [ null, user ])
        .catch((err) => [ err, null ]);
        if(findError) return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        if(foundUser) {
            if(foundUser.email===user.email || foundUser.nickname===user.nickname) return _res.status(400).json({
                status: "error",
                message: "User already exists",
            });
            else return _res.status(500).json({
                status: "error",
                message: "500 Internal Server Error",
            });
        }
    
        // Hash password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password, salt);
    
        // Save user
        const [ saveError, savedUser ]=await user.save()
        .then((user) => [ null, user ])
        .catch((err) => {
            if(err.name==='ValidationError') _res.status(400).json({
                status: "error",
                message: err.message,
            });
            else _res.status(500).json({
                status: "error",
                message: "500 Internal Server Error",
            });
            return [ err, null ];
        });
        if(saveError) return;
        
        // Create token
        const token=await jwt.sign({_id: user._id, _deviceId: user.devices[0]._id}, process.env.TOKEN);
        return _res.status(201).json({
            status: "success",
            message: "User created",
            data: {
                "token": token,
            },
        });
    } catch(error) {
        console.error(error);
        return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
    }
});



// *Login routes
router.get('/', async (_req, res) => { // TODO: refactor this
    try { 
        // Create user
        const user: IUser=await new User({
            nickname: 'Nickname',
            email: _req.body.email,
            password: _req.body.password,
            devices: {
                name: _req.body.device,
                ip: _req.socket.remoteAddress,
                client: _req.headers['user-agent'],
            }
        });
    
        // Validate
        const validateError=await user.validate(user)
        .then(() => null)
        .catch((err) => {
            if(err.name==='ValidationError') res.status(400).json({
                status: "error",
                message: err.message,
            });
            else res.status(500).json({
                status: "error",
                message: "500 Internal Server Error",
            });
            return err;
        });
        if(validateError) return;
    
        // Check if user exists
        const [ findError, foundUser ]=await User.findOne({"email":user.email, "delete.isDeleted":false})
        .then((user) => [ null, user ])
        .catch((err) => [ err, null ]);
        if(findError) return res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        if(!foundUser) return res.status(400).json({
            status: "error",
            message: "Invalid email or password",
        });
    
        // Check if user is banned
        const foundBan=foundUser.bans.find((ban: IBan) => ban.banExpirationDate>new Date());
        if(foundBan) return res.status(403).json({
            status: "error",
            message: "You are banned",
            data: {
                reason: foundBan.banReason,
                expirationDate: foundBan.banExpirationDate,
            },
        });
    
        // Compare passwords
        const [ isMatch, compareError ]=await bcrypt.compare(user.password, foundUser.password)
        .then((isMatch) => [ isMatch, null ])
        .catch((err) => [ false, err ]);
        if(compareError) return res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        if(!isMatch) return res.status(400).json({
            status: "error",
            message: "Invalid email or password",
        });
    
        // Check if device is already exists (or maybe update on finding first time (line 72))
        const foundDevice=foundUser.devices.find((device: IDevice) => device.ip===_req.socket.remoteAddress);
        if(foundDevice) {
            const [ updateError, updatedUser ]=await User.findById(foundUser._id)
            .then(async (foundUser) => {
                const deviceIndex=foundUser.devices.findIndex(device => device.ip===_req.socket.remoteAddress);
                foundUser.devices[deviceIndex].lastLoginDate=new Date();
                foundUser.devices[deviceIndex].client=_req.headers['user-agent'];
                foundUser.devices[deviceIndex].name=_req.body.device;
                const saveError=await foundUser.save()
                .then(() => null)
                .catch((err) => {
                    res.status(500).json({
                        status: "error",
                        message: "500 Internal Server Error",
                    });
                    return err;
                });
                return [ saveError, foundUser ];
            })
            .catch((err) => {
                if(err.name==='ValidationError') res.status(400).json({
                    status: "error",
                    message: err.message,
                });
                else res.status(500).json({
                    status: "error",
                    message: "500 Internal Server Error",
                });
                return [ err, null ];
            });
            if(updateError) return;
            const token=jwt.sign({_id: foundUser._id, _deviceId: await updatedUser.devices.find(user => user.ip===_req.socket.remoteAddress)._id}, process.env.TOKEN);
            return res.status(201).json({
                status: "success",
                message: "User logged in",
                data: {
                    token: token,
                },
            });
        } else {
            const [ updateError, updatedUser ]=await User.findByIdAndUpdate(foundUser._id, {
                $push: {
                    devices: {
                        name: _req.body.device,
                        ip: _req.socket.remoteAddress,
                        client: _req.headers['user-agent'],
                        createDate: new Date(),
                        lastLoginDate: new Date(),
                    },
                },
            }, { new: true })
            .then((updatedUser) => [ null, updatedUser ])
            .catch((err) => {
                if(err.name==='ValidationError') res.status(400).json({
                    status: "error",
                    message: err.message,
                });
                else res.status(500).json({
                    status: "error",
                    message: "500 Internal Server Error",
                });
                return [ err, null ];
            });
            if(updateError) return;
            const token=jwt.sign({_id: foundUser._id, _deviceId: await updatedUser.devices.find(user => user.ip===_req.socket.remoteAddress)._id}, process.env.TOKEN); // *Remember that this is only one response for not existing device (line 131)
            return res.status(201).json({
                status: "success",
                message: "User logged in",
                data: {
                    token: token,
                },
            });
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
    }
});



// *Logout routes
router.put('/', verify, async (_req: Request, _res: Response) => {
    try {
        const [ updateError, updatedUser ]=await User.findByIdAndUpdate(_res.locals.user._id, {$pull: {devices: {_id: _res.locals.device._id}}}, { new: true })
        .then((user) => [ null, user ])
        .catch((err) => [ err, null ]);
        if(updateError) return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        return _res.status(200).json({
            status: "success",
            message: "User logged out",
        });
    } catch(error) {
        console.error(error);
        return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
    }
});



// *Delete routes
router.delete('/', verify, async (_req: Request, _res: Response) => {
    try {
        // User object
        const user: IUser=await new User({
            nickname: _res.locals.user.nickname,
            email: _res.locals.user.email,
            password: _req.body.password,
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
    
        // Compare passwords
        const [ isMatch, compareError ]=await bcrypt.compare(user.password, _res.locals.user.password)
        .then((isMatch) => [ isMatch, null ])
        .catch((err) => [ false, err ]);
        if(compareError) return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
        if(!isMatch) return _res.status(400).json({
            status: "error",
            message: "Invalid password",
        });
    
        // Delete user and all devices
        const [ updateError, updatedUser ]=await User.findByIdAndUpdate(_res.locals.user._id, {
            $set: {
                'delete.isDeleted': true,
                'delete.deleteDate': new Date(),
                'devices': [],
            },
        }, { new: true })
        .then((user) => [ null, user ])
        .catch((err) => {
            if(err.name==='ValidationError') _res.status(400).json({
                status: "error",
                message: err.message,
            });
            else _res.status(500).json({
                status: "error",
                message: "500 Internal Server Error",
            });
            return [ user, null ];
        });
        if(updateError) return;
        return _res.status(200).json({
            status: "success",
            message: "User deleted",
        });
    } catch(error) {
        console.error(error);
        return _res.status(500).json({
            status: "error",
            message: "500 Internal Server Error",
        });
    }
});