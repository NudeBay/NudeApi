const jwt=require('jsonwebtoken');

const verifytoken=(req, res, next) => {
    const token=req.header('auth-token');
    if(!token) {return res.status(401).send('Acces Denied');}

    try {
        const verified=jwt.verify(token, process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }
    catch(err) {
        return res.status(400).send('Invalid token');
    }
};
module.exports={verifytoken};
