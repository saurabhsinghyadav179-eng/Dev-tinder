const express=require("express")
 const User = require("./model/userschema");
const bcrypt=require("bcrypt");
 const  {validationSignUp} =require("./utils/validation");
const profileRouter= express.Router();


app.get("/profile",userAuth,async(req, res)=>{

try{
  const user=req.user;
  res.send(user);

}
catch(err){
  res.status(404).send("ERROR"+err.message)
}
// try{

//  const { token } = req.cookies;
//   if(!token){
//     throw new Error ("invalid token");

//   }
//   const decodedMessage= await jwt.verify(token, "webTinder123");
//   const {_id}=decodedMessage;

//   const user = await User.findById(_id);
//   if(!user){
//     throw new Error("user does not exist")
//   }
//   res.send(user);
// }
   

//   catch (err) {
//   console.error(err);
//   res.status(400).send("ERROR: " + err.message);
// }
   
});

module.exports=profileRouter;
