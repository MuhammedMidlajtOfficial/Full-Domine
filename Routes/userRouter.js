const express = require('express');
const userRouter = express.Router();
const auth = require('../Authentication/auth');
const userController = require('../Controllers/userController')

//Login page
userRouter.get('/',auth.redirectToDashboard,userController.isUser)
userRouter.post('/login',userController.postLogin)
userRouter.get('/userDashboard',auth.isUserExist,auth.isUserLogin,userController.getUserDashboard)
userRouter.get('/userLogout',auth.isUserLogin,userController.getUserLogout)
userRouter.get('/userNotExist',userController.getUserNotExist)
//signup form
userRouter.get('/signup',userController.getSignup)
userRouter.post('/postSignup',userController.postSignup)

module.exports = userRouter