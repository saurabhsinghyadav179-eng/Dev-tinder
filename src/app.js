
 const express = require("express");

 const connectDB=require("./config/database");
 const cookieParser=require("cookie-parser")
 const jwt =require("jsonwebtoken");


const app=express();


app.use(express.json());
app.use(cookieParser());
// connectDB();

const authRouter=require("./routes/auth");
const profileRouter= require("./routes/profile");
const requestRouter= require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



connectDB().then (()=>{

    console.log("database conection is succesfully stablished")

    app.listen(7000, ()=>{
     console.log("Server is running at port 7000...")
});
}).catch(err=>{
      console.log("database is not connected")
}
);


//  app.post("/signUp" ,async (req, res)=>{
    
  
//     try{

//       // validation level api
//      validationSignUp(req);
//      const {firstName,lastName, emailId,password}=req.body;
//    // encrypt the data
//     const passwordHash=await bcrypt.hash(password,10);
//     console.log(passwordHash);

//  // create new instance of User model
//     const user= new User({
//       firstName,
//       lastName,
//       emailId,
//       password:passwordHash,
//     });

  
//       await user.save();
//       res.send("data added succesfully");  
      

//     }
//     catch (err) {
//     res.status(404).send("ERROR: "+err.message)
//   }
// });

// login api
// app.post("/login" ,async (req, res)=>{
 
//  try{
//   const {emailId, password}= req.body;
//   const user=await User.findOne({emailId:emailId})
//   if(!user){
//     throw new Error("email Id  is not correct")
//   }
//   const isPasswordValid= await bcrypt.compare(password, user.password)
//   if(isPasswordValid){
//     // create jwt cookie 

//   const token = jwt.sign({ _id: user._id }, "webTinder123", { expiresIn: "1h" });

//    console.log (token);
//    res.cookie( "token", token)
//    res.send("login successfulll!!!")
      
//     }else{
//    throw new Error ("password is not valid ")
//     }
 

//  } 
//  catch (err) {
//   console.error(err);
//   res.status(400).send("ERROR: " + err.message);
// }

// });

// app.get("/profile",userAuth,async(req, res)=>{

// try{
//   const user=req.user;
//   res.send(user);

// }
// catch(err){
//   res.status(404).send("ERROR"+err.message)
// }
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
   
// });

// app.post("/connection.request", userAuth,async(req, res)=>{
//   const user = req.user;
//   console.log("connection succesfull")
//   res.send(user.firstName+ " send succccsefullll connection")
// })

// //GET data using emailId

// app.get("/user", async(req, res)=>{
//   const userEmail= req.body.emailId;
//   try{
  
//      const users=await User.findOne({ emailId:userEmail});
//      if(users.length===0){
//       res.status("users not found ")
//      }else{
//       res.send(users);
//      }
    
//   }catch (err){
//     res.status(404).send("something went wrong!")
//   }
// });
// to delete an API

// app.delete("/user", async(req, res)=>{
//    const userId= req.body.userId;
// try{
//   const user = await User.findByIdAndDelete(userId);
//   res.send("user deleted successfully");
// }catch (err){
//   console.log(err)
//    res.status(404).send("something went wrong ")
// }

// });

// to update a user

// app.patch("/user", async(req, res)=>{
//   const userId= req.body.userId;
//   const data= req.body;

//   try{
//      const Update_Allowed=["userId", "firstName","lastName", "age","gender","skills"];
//   const isUpdateAllowed=Object.keys(data).every((k)=>
//       Update_Allowed.includes(k)
// );
// if(!isUpdateAllowed){
//   throw new Error("update is not allowed")
// }
// if(data?.skills.length>10){
//   throw new Error("skills not allowed more thwn 10")
// }
//     const user = await User.findByIdAndUpdate(
//   userId,
//   data,
//   {
//     new: true,            // return updated document
//     runValidators: true,  // apply schema validations
//   }
// );
//     console.log(user)
//      res.send("data updated successfully")
   
//   }catch (err) {
//   console.error(err);
//   res.status(400).send(err.message || "Something went wrong");
// }
// })

//  app.post("/signUp" ,async (req, res)=>{
//     // create new instance of User model
//     const user= new User({
//       firstName: "saurabh",
//       lastName:"yadav",
//       age: 21,
      
//     });

//    await user.save();

//    res.send("data added succesfully");

    
//  }
// );



// feed API -> get all the users from database 
// app.get("/feed", async(req, res)=>{
//   try{
//     const users= await User.find({});
//   res.send(users);
//   }
//   catch{
//     res.status(404).send("something went wrong ")
//   }

// })





// const {adminAuth} = require("./miidlewares/auth");
// app.use("/admin", adminAuth);

// app.use("/", (req, res) => {
//   try {
//     // Simulating an error
//     throw new Error("Something went wrong!");
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).send("Bad Request: " + err.message);
//   }
// });

// app.get("/getuser", (req, res, next) => {
//   try {
//     // Simulate some code
//     throw new Error("Unable to fetch user");
//   } catch (err) {
//     next(err); // ✅ pass error to global handler
//   }
// });



// app.use ("/admin",(req, res, next)=>
// {
//     console.log("authorisation is checked")
// // checking of authorised data 
// const token= "xyz";
// const authorised= token ==="xyz";
// if(!authorised){
//     res.send("data sent")
// }
// else{
//     next();
// }
// });
// app.get("/getuser", (req, res)=>{
//     res.send("data sent again...")
// });

// app.delete("/admin/delete",(req, res)=>{
//     res.send("data is deleted")
// });






// app.use("/admin/deletedata", (req, res )=>
// {
   
//   const token= "xyzcw";
// const authorised= token =="xyz";
// if(authorised){
//     res.send("data delete")
// }
// else
// {
//     res.send("data not delete")
// }
// }
// );

// app.use("/test",
//     (req , res, next)=>{

//     console.log(" first route 1"),
//     next();
//     // res.send("response from 1")
    
// },  (req , res, next)=>{

//    console.log("second route 2"),
//     next();
// //    res.send("response 2")
 
// }, 

// (req , res)=>{

//    console.log("third route 3"),

//    res.send("response 3!!")
    
// }

// );


// app.get( "/abc",(req , res) => {
//     res.send("get  from server!");
// });

// app.post( "/a*b",(req , res) => {
//     res.send("save data to database");
// });


// app.delete( "/hello",(req , res) => {
//     res.send("deleted successfully");
// });




// app.listen(7000, ()=>{
//      console.log("Server is running at port 7000...")
// });