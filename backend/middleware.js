const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader)return res.status(403).json({msg:"MISSING JSON WEB TOKEN"});
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({msg:"Wrong JWT"});
    }
};

module.exports = authMiddleware;