const express=require("express")
 const User = require("../model/userschema");
const bcrypt=require("bcrypt");
 const jwt =require("jsonwebtoken");

 const { userAuth } = require("./miidlewares/auth");
const authRouter= express.Router();

authRouter.post("/signUp" ,async (req, res)=>{
    
  
    try{

      // validation level api
     validationSignUp(req);
     const {firstName,lastName, emailId,password}=req.body;
   // encrypt the data
    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

 // create new instance of User model
    const user= new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });

  
      await user.save();
      res.send("data added succesfully");  
      

    }
    catch (err) {
    res.status(404).send("ERROR: "+err.message)
  }
});


module.exports=authRouter;

