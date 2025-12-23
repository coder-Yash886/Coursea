const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config")

function usermiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_USER_PASSWORD)
    
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            massage: "You are not sign in "
        })
    }
}

module.exports = {
    usermiddleware: usermiddleware
}