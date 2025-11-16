const express = require("express")
 const User = require("./model/userschema");
const profileRouter= express.Router();

profileRouter.post("/connection.request", userAuth,async(req, res)=>{
  const user = req.user;
  console.log("connection succesfull")
  res.send(user.firstName+ " send succccsefullll connection")
})

module.exports=profileRouter;