const express = require('express')
const adminRouter = express();
const adminController = require('../Controllers/adminController')
const auth = require('../Authentication/auth')

adminRouter.get('/',adminController.isAdmin)
adminRouter.post('/adminLogin',adminController.postAdminLogin)
adminRouter.get('/adminDashboard',auth.isAdminLogin,adminController.getAdminDashboard)
adminRouter.get('/adminLogout',auth.isAdminLogin,adminController.getAdminLogout)
adminRouter.get('/deleteUser',auth.isAdminLogin,adminController.getDeleteUser)
adminRouter.get('/editUser',auth.isAdminLogin,adminController.getEditUser)
adminRouter.post('/userUpdate',auth.isAdminLogin,adminController.postUserUpdate)
adminRouter.post('/search',auth.isAdminLogin,adminController.postSearch)
adminRouter.get('/clearSearch',auth.isAdminLogin,adminController.getClearSearch)

module.exports = adminRouter;