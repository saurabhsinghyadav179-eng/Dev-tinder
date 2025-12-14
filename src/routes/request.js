const express = require("express")
 const User = require("../model/userschema");
const requestRouter= express.Router();
const {userAuth} =require("../miidlewares/auth")
const UserRequest = require("../model/connectionReq");


requestRouter.post("/request/send/:status/:toUserid", userAuth,async(req, res)=>{
  try{
      
      const fromUserid=req.user._id
       const toUserid=req.params.toUserid
      const status=req.params.status
// validation that only interested and ignored sttatus is allowed in url api 

      const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        error: "Invalid status! Only 'interested' or 'ignored' allowed."
      });
    }

      if (fromUserid.toString() === toUserid.toString()) {
      return res.status(400).json({
        message: "You cannot send a request to yourself!"
      });
    }

    const toUser= await User.findById(toUserid)
    if(!toUser){
      res.status(404).json({message:"user not found "})
    }

  // IF there is an existing connection request

       const alreadyExist = await UserRequest.findOne({
      $or:[
          {fromUserid,toUserid},
          {fromUserid:toUserid, toUserid:fromUserid}
      ]
    });

    if (alreadyExist) {
      return res.status(400).send({
        message:"connection request is already send"
      });
    }

      const connectionrequest=new UserRequest({
        
        toUserid,
        fromUserid,
        status

      })

      const data= await connectionrequest.save();

      res.json({
       message:req.user.firstName +" is "+ status +" in "+ toUser.firstName,
       data,

       
    });

       

  }catch(err){
   res.status(404).send("ERROR: "+ err.message)
  }


  });

// requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
//  try{
//   const fromUserid = req.user._id.toString().trim();
//     const requestId = req.params.requestId.trim();
//     let status = req.params.status.toLowerCase().trim(); 
  
//     const allowedStatus = ["accepted", "rejected"];
//     if (!allowedStatus.includes(status)) {
//       return res.status(400).json({
//         error: "Invalid status! Only 'accepted' or 'rejected' allowed."
//       });
//     }

//     const connectionRequest=await  UserRequest.findOne({
//       _id:requestId,
//       toUserid:fromUserid,
//       status:"interested",

//     })
//     if(!connectionRequest){
//       return res
//        .status(404).json({message: "connection request is not found "})
//     }

//     connectionRequest.status=status;


//     const data= await connectionRequest.save();
//     res.json({message :"connection request"+ status, data})


//  }catch(err){
//    res.status(500).json({ error: "ERROR: " + err.message });

//   } 

// })

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;

      const { requestId, status } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status.toLowerCase())) {
        return res.status(400).json({
          error: "Invalid status! Only 'accepted' or 'rejected' allowed.",
        });
      }

      const connectionRequest = await UserRequest.findOne({
        _id: requestId,
        toUserid: loggedInUserId,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status.toLowerCase();
      const data = await connectionRequest.save();

      res.json({
        message: `Connection request ${status} successfully`,
        data,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);


module.exports=requestRouter;