const jwt = require('jsonwebtoken');
const protect = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
     if(!token) {
        return res.status(401).json({
            message : "Not Authorized, token missing!"
        })
    }
    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }
    catch(err) {
        res.status(401).json({
            message : "Not Authorized, token missing!"
        })
    }
}

const validateLoginInput = (req,res,next) => {
    const { email,password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: 'Please provide email and password'
        })
    }
    next();
}

module.exports = {protect, validateLoginInput};