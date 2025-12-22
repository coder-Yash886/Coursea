const {Router} = require("express");
const courseRouter = Router();

    courseRouter.post("/course/purchases",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

courseRouter.get("/courses/preview",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})


module.exports = {
    courseRouter : courseRouter
}