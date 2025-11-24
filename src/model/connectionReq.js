const mongoose=require("mongoose")

const connectionRequest= new mongoose.Schema({

    toUserid:{
        type:mongoose.Schema.Types.ObjectId,
          ref: "User",
        required:true

    },
    fromUserid:{
        type:mongoose.Schema.Types.ObjectId,
          ref: "User",
          required:true
    },
    status:{
        type:String,
        enum:{
            values:["accepted", "rejected", "ignored", "interested"],
            message: "{VALUE} incorrect status type"
        }
    } 
    },
    { timestamps: true },
);

const UserRequest = mongoose.model("UserRequest", connectionRequest);
module.exports=UserRequest;
