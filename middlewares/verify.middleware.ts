import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import User, { IBan, IDevice } from '../models/users.model';

const authenticateToken=async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
        // Get token
        const token=await _req.header('auth-token');
        if(!token) return _res.status(401).json({
            status: 'error',
            message: 'No token provided',
        });

        // Check if token exists and is valid
        const decoded=await jwt.verify(token, process.env.TOKEN as Secret) as JwtPayload;
        if(!decoded) return _res.status(400).json({
            status: 'error',
            message: 'Invalid token',
        });

        // Check if user exists (and not deleted)
        const foundUser=await User.findOne({ _id: decoded._id, 'delete.isDeleted': false });
        if(!foundUser) return _res.status(401).json({
            status: 'error',
            message: 'User not found',
        });

        // Check if user is banned
        const foundBan=await foundUser.bans.find((ban: IBan) => ban.banExpirationDate > new Date());
        if(foundBan) return _res.status(403).json({
            status: 'error',
            message: 'You are banned',
            data: {
                reason: foundBan.banReason,
                expirationDate: foundBan.banExpirationDate,
            },
        });

        // Check if user's device is in device list
        const foundDevice=await foundUser.devices.find((device: IDevice) => device.ip === _req.socket.remoteAddress);
        if(!foundDevice) return _res.status(401).json({
            status: 'error',
            message: 'Device not found',
        });

        // Pass and return found user object
        _res.locals.user=foundUser; // ? should I also return decoded token values
        _res.locals.device=foundDevice;
        return _next();
    } catch(error) {
        return _res.status(500).json({
            status: 'error',
            message: '500 Internal Server Error',
        });
    }
};

export default authenticateToken;
