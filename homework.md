Install  express
Create a server
Listen to port 7000
Write request handelers for  /test /hello
Install nodemon and update script inside package.json
What are dependencies
What is the use of "-g" while npm install
Difference betwwen caret and tilde (^ vs ~)

initilize git 
gitignore 
Create a remote repositry on github 
Push all code to remote origin
Play with routes and route extension ex. /hello / , hello/2, / xyz
Order of the routes matter a lot
Install Postman  app and make a workspace/ collection > test API call
Write logic to handle GET , POST, PATCH , DELETE API calls and test them on postman
Explore routing and use of ?, *, () in the routes
Use of regix in routes /a/ , /*flu
Reading the query params in the routes
Reading the dynamic routes 
Reading the dynamic routes

multiple routes handlers - play with them 
next() function 
app.use("/route, rH, [rH2, rH3], rH4);
what is middleware and why it is use?
how express js basically handles the request in backend
write a dummy auth middleware for admin
error handling using app.use("/" ,(err, req, res, next) => {})
Create a cluster on mongodb official website
Install mongoose library
Connect your application to the database / devtinder
call the connectDB function and connect to database before starting application on 7777
create a userSchema and user model 
create POST /signUp api to add data to database 
Put some documents from Post api calls from postman

Js object vs JSON (difference)
Add the express.json() middleware to your app
make your signup api dynamic to recieve data from the end user
API - Get user by email
API - Feed API - GET / Feed - get all the users from the database 
API - Get user by ID
create a delete user API
API - update a user
Explore the mongoose documentation for model methods 

Explore schematype options from the documentation 
add required , unique , lowercase , min , minlenght , tries 
add default
create a custom validate function for gender 
Improve the DB schema - put all appropriate validations on each field in Schema 
Add timestamps to the userSchema 
Add API level validation on Patch request & signUp post Api
DATA Sanitising - Add API validation for each field 
Install validator
Explore use validator library function and validator functions for password , email , url
validate data in Sighnup api
Install bcryptIpackage
Create passwordHash using bcrypt.hash & save the user is excrupted password 
Create login API
Compare passwords and throw errors if email or password is invalid 

Install cookie-parse
just send a dummy cookie to user 
Create GET / profile API and check if you get the ccokie back 
Install Jsonwebtoken
IN login API , after email and password validation , create a JWT token and send it to user in  cookies 
read the cookies inside your profile API find the logged in user 

userAuth middlewares 
Add the userAuth middle ware in profile API and a new sendConnectionRequest API
Set the expiry of JWT token and cookies of 7days 
Create userSchema method to get JWT 
Create userSchema method to comparePassword (passswordInputByUser)



-git hub commit

Explore tinder APIs
Create a list of all API you can think of in Dev tinder
Group multiple routes under respective routers 
Read documentation for express.Router
Create routes folder for managing auth .profile , request , routers
Create authRouter , profileRouter, requestRouter
Import these routers in app.js
Create POST / logout API
Create PATCH / profile/ password API=> forget password API
Make you validate all date in every POST , PATCH apis

Create copnnection Request Schema
Send connection Request
Proper validation of data
Think about all corner cases 
$or query $and query in mongoose
Schema.pre("save") function
Read more about indexes in mongoDB
Why do we need index in MongoDB
What is the advantages and disadvantages of creating?


Notes:

Pagination 

/feed?page=1&limit=10 => 1-10 => .skip(0)  & .limit(10)
/feed?page=2&limit=10 => 10-20 => .skip(10) & .limit(10)
/feed?page=3&limit=10  => 20-30 => .skip(20) & .limit(10)

skip=(page-1)* limit