## DevTinder APIs

## authRouter
- POST /signUp
- POST / login
- POST / logout

## profileRouter
- GET / profile/view
- PATCH / profile/ edit
- PATCH / profile/ password

## connectRequestRouter
-POST / request/ send/ interested/:userId
- POST / request/send/ ignored/ :userId
- POST / request / review/ accepted/ :userId
- POST / request/ review/ accepted/:userId

## userRouter
- GET / user/ connections
- GET / user/ requests
- GET / user / feed - Gets you the profiles of other ussers on platform

Status : ignore , interested, accepted, rejected

