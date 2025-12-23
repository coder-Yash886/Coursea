const {Router} = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const {adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const {adminmiddleware} = require("../middleware/admin")


adminRouter.post("/signup",async function(req,res){

    const {email,password,firstname,lastname} = req.body;
           const hashedPassword = await bcrypt.hash(password, 10);
       await adminModel.create({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname
        })
        res.json({
            message: "Signup Succeeded "
        })


    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin",async function(req,res){
     
      const {email,password} = req.body;
      
          const admin = await adminModel.findOne({
              email: email,
          });
          const isPasswordCorrect = await bcrypt.compare(password, admin.password);
              if (!isPasswordCorrect) {
                  return res.status(403).json({
                      message: "Invalid credentials"
                  });
              }
      
          if(admin){
          const token =  jwt.sign({
              id: admin._id

           },JWT_ADMIN_PASSWORD);
           res.json({
              token: token
          
           })
          }else{
              res.status(403).json({
                  message: "Incorrect credentials"
              })
          }

    res.json({
        message: "signin endpoint"
    })
})

adminRouter.post("/course",adminmiddleware,async function(req,res){
    const adminId = req.userId;

    const {title,description,imageUrl,price} = req.body;

   const course =  await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creterid: adminId

    })
    res.json({
        message: "Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course",function(req,res){
    res.json({
        message: "Change the Course"
    })
})

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message: "All the course endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}