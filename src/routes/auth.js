const express=require("express")
 const User = require("../model/userschema");
const bcrypt=require("bcrypt");
 const jwt =require("jsonwebtoken");
const {validationSignUp}=require("../utils/validation")
 const { userAuth } = require("../miidlewares/auth");
const authRouter= express.Router();
// signUp api
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
    res.status(404).send("ERROR1: "+err.message)
  }
});

// login api
authRouter.post("/login" ,async (req, res)=>{
 
 try{
  const {emailId, password}= req.body;
  const user=await User.findOne({emailId:emailId})
  if(!user){
    throw new Error("email Id  is not correct")
  }
  const isPasswordValid= await bcrypt.compare(password, user.password)
  if(isPasswordValid){
    // create jwt cookie 

  const token = jwt.sign({ _id: user._id }, "webTinder123", { expiresIn: "1h" });

   console.log (token);
   res.cookie( "token", token)
   res.send("login successfulll!!!")
      
    }else{
   throw new Error ("password is not valid ")
    }
 

 } 
 catch (err) {
  console.error(err);
  res.status(400).send("ERROR: " + err.message);
}

});

authRouter.post("/logout", async (req, res)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("logout successfull...")
   
})


module.exports=authRouter;

