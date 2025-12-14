 const User= require("../model/userschema")
 const jwt =require("jsonwebtoken")


const userAuth=async (req, res, next)=>{
    try{
         
        const {token}=req.cookies;
     if(!token){
       return res.status(401).send("please login again");
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
    catch (err) {
    return res.status(401).json({
    error: "Unauthorized",
    message: err.message,
  });
}

}

   

module.exports={
    userAuth
};