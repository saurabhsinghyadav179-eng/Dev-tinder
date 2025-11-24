const express=require("express")
 const User = require("../model/userschema");
const bcrypt=require("bcrypt");
 const  {validationSignUp} =require("../utils/validation");
const profileRouter= express.Router();
const {editProfile}=require("../utils/validation")
const {userAuth} =require("../miidlewares/auth")

profileRouter.get("/profile",userAuth,async(req, res)=>{

try{
  const user=req.user;
  res.send(user);

}
catch(err){
  res.status(404).send("ERROR"+err.message)
}

});

profileRouter.patch("/profile/edit", userAuth,async(req,res)=>{
    try{
       if(editProfile(req)){
        throw new Error("edit field is  not valid ")
       }
       const loggedIn= req.user;

      

       Object.keys(req.body).forEach((key)=>(loggedIn[key]=req.body[key]));

     await  loggedIn.save();
      
       res.json({message:`${loggedIn.firstName}, your profile updated successfully`, 
        data:loggedIn ,});
       
    }
  catch(err){
  res.status(404).send("ERROR "+err.message)

    }

});

module.exports=profileRouter;
