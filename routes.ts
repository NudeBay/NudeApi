
import { Router, Request, Response, NextFunction, application } from 'express';
const router: Router = Router();
export default router;
import mongoose, { ConnectOptions, mongo } from 'mongoose';
// import io from 'socket.io';
// import nodemailer from 'nodemailer';

// ***Host***
// const io=new ServiceWorkerRegistration(require('./app'), {});
// io.listen(process.env.PORT, () => console.info('\x1b[32m','WebSocket started','\x1b[0m',`(on port ${process.env.API_PORT})...`));

// ***Mailer***
// export const transporter=nodemailer.createTransport({});


// ***Connect to Database***
const uri: any=process.env.DB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
} as ConnectOptions)
.then(() => console.info('\x1b[32m','Server connected','\x1b[0m',`(on uri ${uri})...`))
.catch((err: Error) => console.error('\x1b[31m','Database error:','\x1b[0m',err));

process.on('SIGINT', () => {
    console.info('\x1b[32m','API host stopped','\x1b[0m');
    
    mongoose.disconnect();
    mongoose.connection.close();
    console.info('\x1b[32m','Database disconnected','\x1b[0m');

    process.exit();
});

// *Home routes
import homeRoutes from './routes/home.routes';
router.use('/home', homeRoutes);

// *Search routes
import searchRoutes from './routes/search.routes';
router.use('/search', searchRoutes);

// *Messages routes
import messagesRoutes from './routes/messages.routes';
router.use('/messages', messagesRoutes);

// *Notifications routes
import notificationsRoutes from './routes/notifications.routes';
router.use('/notifications', notificationsRoutes);

// *Create routes
import createRoutes from './routes/create.routes';
router.use('/create', createRoutes);

// * Profile routes
import profileRoutes from './routes/profile.routes';
router.use('/profile', profileRoutes);

// *Settings routes
import settingsRoutes from './routes/settings.routes';
router.use('/settings', settingsRoutes);

// *Account routes
import accountRoutes from './routes/account.routes';
router.use('/account', accountRoutes);

// ***Error handlers***
// *404
const handleNotFound=(req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: "error",
        message: "404 Not Found",
    });
};
router.use(handleNotFound);

// *500
const handleServerError=(err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Błąd serwera:', err);
    return res.status(500).json({
        status: "error",
        message: "500 Internal Server Error",
    });
};
router.use(handleServerError);