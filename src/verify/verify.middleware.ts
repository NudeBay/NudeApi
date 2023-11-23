import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      // Get token
      const token = await req.header('auth-token');
      if (!token)
        return res.status(401).json({
          status: 'error',
          message: 'No token provided',
        });

      // Check if token exists and is valid
      const decoded = (await jwt.verify(
        token,
        process.env.TOKEN_SECRET as Secret,
      )) as JwtPayload;
      if (!decoded)
        return res.status(400).json({
          status: 'error',
          message: 'Invalid token',
        });

      // Check if user exists (and not deleted)
      const foundUser = await User.findOne({
        _id: decoded._id,
        'delete.isDeleted': false,
      });
      if (!foundUser)
        return res.status(401).json({
          status: 'error',
          message: 'User not found',
        });

      // Check if user is banned
      const foundBan = await foundUser.bans.find(
        (ban: IBan) => ban.banExpirationDate > new Date(),
      );
      if (foundBan)
        return res.status(403).json({
          status: 'error',
          message: 'You are banned',
          data: {
            reason: foundBan.banReason,
            expirationDate: foundBan.banExpirationDate,
          },
        });

      // Check if user's device is in device list
      const foundDevice = await foundUser.devices.find(
        (device: IDevice) => device.ip === req.socket.remoteAddress,
      );
      if (!foundDevice)
        return res.status(401).json({
          status: 'error',
          message: 'Device not found',
        });

      // Pass and return found user object
      res.locals.user = foundUser; // ? should I also return decoded token values
      res.locals.device = foundDevice;
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: '500 Internal Server Error',
      });
    }
  }
}
