const rateLimit = require('express-rate-limit');

const accountLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 15, // start blocking after 15 requests
    message: 'Too many accounts created from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const createLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 30, // start blocking after 30 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const homeLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 100, // start blocking after 100 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const messagesLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 100, // start blocking after 100 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const notificationsLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 100, // start blocking after 100 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const profileLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 100, // start blocking after 100 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const searchLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 100, // start blocking after 100 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const settingsLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 15, // start blocking after 15 requests
    message: 'Too many requests from this IP, please try again after an half hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports={
    accountLimiter,
    homeLimiter,
    createLimiter,
    messagesLimiter,
    notificationsLimiter,
    profileLimiter,
    searchLimiter,
    settingsLimiter
};