 const User= require("../model/userschema")
 const jwt =require("jsonwebtoken")


const userAuth=async (req, res, next)=>{
    try{
        const {token}=req.cookies;
     if(!token){
        throw new Error("token is invalid ")
     }
     const isDecoded=await  jwt.verify(token, "webTinder123" )
     const {_id}=isDecoded;
    
     const user =await User.findById(_id);


     if(!user){
         throw new Error ("user is not defined ")
     }
     req.user=user;
     next();
    }
    catch (err){
       res.status(404).send("ERROR"+err.message);
    }
   
}

   

module.exports={
    userAuth
};