const express=require("express");

const UserRequest = require("../model/connectionReq");
const { userAuth } = require("../miidlewares/auth");
const safeData= "firstName lastName age about skills "
const userRouter=express.Router();

// get all pending connection request for the loggedin user
userRouter.get("/user/request/recieve", userAuth,async (req, res)=>{
     try{
       const loggedIn=req.user;
       const connectionRequest=await UserRequest.find({
        toUserid:loggedIn._id,
         status:"interested"
      }).populate("fromUserid", "firstName  lastName")

      res.json({
        message:"data fetched successfully",
        data:connectionRequest,
      })
     }
     catch(err){
       res.status(404).send(message,"something went wrong ")
     }
})

// get all connection which is connected

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{

        const loggedIn=req.user;
        const connectionRequests=await UserRequest.find({
            $or:[
               {toUserid:loggedIn._id, status:"accepted"},
               {fromUserid:loggedIn._id , status:" accepted"},
        ]
        }).populate("fromUserid",safeData)
        .populate("toUserid", safeData);

        const data= connectionRequests.map((row)=>{
         if(row.fromUserid._id.toString()=== loggedIn._id.toString()){
            return row.toUserid;
         }
         return row.fromUserid;
        })
      res.json({data});
    }
    catch(err){
        res.status(404).send("connection not found")
    }
})

module.exports=userRouter;
