import rateLimit from 'express-rate-limit';

const windowMs=30 * 60 * 1000; // 30 minutes window
const message='Too many requests from this IP, please try again after an half hour';

const accountLimiter = rateLimit({
    windowMs,
    max: 15, // start blocking after 15 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const createLimiter = rateLimit({
    windowMs,
    max: 30, // start blocking after 30 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const homeLimiter = rateLimit({
    windowMs,
    max: 100, // start blocking after 100 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const messagesLimiter = rateLimit({
    windowMs,
    max: 100, // start blocking after 100 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const notificationsLimiter = rateLimit({
    windowMs,
    max: 100, // start blocking after 100 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const profileLimiter = rateLimit({
    windowMs,
    max: 100, // start blocking after 100 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const searchLimiter = rateLimit({
    windowMs,
    max: 100, // start blocking after 100 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const settingsLimiter = rateLimit({
    windowMs,
    max: 15, // start blocking after 15 requests
    message,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export {
    accountLimiter,
    homeLimiter,
    createLimiter,
    messagesLimiter,
    notificationsLimiter,
    profileLimiter,
    searchLimiter,
    settingsLimiter
};