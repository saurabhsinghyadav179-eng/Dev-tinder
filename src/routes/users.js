const express=require("express");

const UserRequest = require("../model/connectionReq");
const { userAuth } = require("../miidlewares/auth");
const User= require("../model/userschema")
const safeData= "firstName lastName age about skills image"
const userRouter=express.Router();

// get all pending connection request for the loggedin user
userRouter.get("/user/request/recieve", userAuth,async (req, res)=>{
     try{
       const loggedIn=req.user;
       const connectionRequest=await UserRequest.find({
        toUserid:loggedIn._id,
         status:"interested"
      }).populate("fromUserid", "firstName  lastName image age gender about")

      res.json({
        message:"data fetched successfully",
        data:connectionRequest,
      })
     }
     catch(err){
       res.status(404).send(message,"something went wrong ")
     }
})

// get all connections which is connected

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{

        const loggedIn=req.user;
        const connectionRequests=await UserRequest.find({
            $or:[
               {toUserid:loggedIn._id, status:"accepted"},
               {fromUserid:loggedIn._id , status:"accepted"},
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
// creating feed API
userRouter.get("/feed", userAuth, async (req,res)=>{
  try{

    const loggedIn=req.user;

    const page= parseInt(req.query.page)
    let limit=parseInt(req.query.limit)
    limit=limit>50 ?50 :limit;
    const skip=(page-1)*limit;

    // finding the sender and reciever  userId
    const connectionRequests=await UserRequest.find({
     $or: [{toUserid:loggedIn._id},{fromUserid:loggedIn._id} ]
    }).select( "fromUserid" )
    .select("toUserid");
    console.log("userRequest: "+connectionRequests);
    const hideFromFeed= new Set();
      connectionRequests.forEach((req) => {
      hideFromFeed.add(req.fromUserid.toString())
      hideFromFeed.add(req.toUserid.toString())
    });
    console.log("hide "+[...hideFromFeed]);

   const users= await User.find({
     $and: [
      {_id:{$nin:[...hideFromFeed]}},
      {_id:{$ne : loggedIn._id}
     }]
   })
   .select(safeData)
   .skip(skip)
   .limit(limit);

    console.log(users);
    res.send(users);

  }catch(err){
    res.status(404).json({message  :err.message})
  }
});

module.exports=userRouter;
