// const validator = require("validator");

// const validationSignUp = (req) => {
//   const { firstName, lastName, password, emailId } = req.body;

//   // 1️⃣ Check name
//   if (!firstName || !lastName) {
//     throw new Error("Name is not valid");
//   }

//   // 2️⃣ Check email
//   if (!validator.isEmail(emailId)) {
//     throw new Error("Email is not valid");
//   }

//   // 3️⃣ Check password strength
//   if (
//     !validator.isStrongPassword(password, {
//       minLength: 6,
//       minLowercase: 1,
//       minUppercase: 0,
//       minNumbers: 1,
//       minSymbols: 0
//     })
//   ) {
//     throw new Error(
//       "Password must be at least 6 characters long and include at least one number"
//     );
//   }
// };

// module.exports = { validationSignUp };





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
   