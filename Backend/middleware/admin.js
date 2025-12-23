const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");

function adminmiddleware(req,res,next){
   const token = req.headers.token;
   const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);
   if(decoded){
    req.userId = decoded.id;
    next();

   }else{
    res.status(403).res.json({
        message: "You are not sign in"
    })
   }

}

module.exports = {
    adminmiddleware : adminmiddleware
}