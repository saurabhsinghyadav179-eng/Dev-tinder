

const validator=require("validator");

const validationSignUp=(req)=>{
  const {firstName, lastName, password, emailId}=req.body;
  if(!firstName || !lastName){
    throw new Error("name is not valid");
  }
  else if (!validator.isEmail(emailId)){
    throw new Error("emmail is not valid ");
  }
 else if(!validator.isStrongPassword(password)){
    throw new Error("password is not valid ");
  }
   
};

const editProfile=(req)=>{
 const  AllowedEditFields =[
    "firstName",
     "lastName",
     "emailId",
     "about",
     "skills",
     "age",
     
];
 const isAllowed=Object.keys(req.body).every((field)=>{
    AllowedEditFields.includes(field);
 });

 return isAllowed;
}



module.exports={
     validationSignUp,
     editProfile

    
};
   