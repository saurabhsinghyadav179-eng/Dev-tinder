const mongoose= require ("mongoose")
const validator=require("validator")
const jwt = require("jsonwebtoken");
const userSchema= new mongoose.Schema({
    firstName :{
        type:String,
        minLength:3
    },

    lastName:{
        type:String
    },

    age:{
        type:Number,
        min:18,
         runValidators: true 
    },

    gender:{
        type:String,
        validate(value){
        if(!["male", "female", "others"].includes(value)){
             throw new error ("gender data is not valid ")
        }
          
        }
    },
    emailId:{
        type:String,
        lowercase:true,
        required :true,
        unique:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("email is not valid :"+value)
        } 
        }
      
    },
    about:{
        type:String,
        default:"this is default value "
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/06/01/14/11/ai-generated-8033671_960_720.png"
    },
    skills:{
        type:[String]
    },
    password:{
        type:String,
        validate(value){
           if(!validator.isStrongPassword(value)){
            throw new Error("password is not strong  :"+value)
        } 
        }
    },

   
},
{
timestamps:true,
}
);

userSchema.methods.getJWT = function () {
    return jwt.sign(
        { _id: this._id },
        "webTinder123",     
        { expiresIn: "1d" }
    );
};
    

module.exports = mongoose.model("User", userSchema);

