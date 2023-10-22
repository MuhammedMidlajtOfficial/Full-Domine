const express = require('express')
const adminRouter = express();
// const auth = require('../Authentication/auth')
const Register = require('../Model/registers')

let loggedOut = false;
let invalidId = false;

adminRouter.get('/',(req,res)=>{
    if (req.session.admin) {
        res.redirect('/adminDashboard')
    } else {
        if(loggedOut){
            res.render('admin-Login-page',{title:'Login page', LogOut :true})
            loggedOut = false;
            invalidId = false;
        }else if(invalidId){
            res.render('admin-Login-page',{title:'Admin Login page', wrongCredential :true})
        }else{
            res.render('admin-Login-page',{title:'Admin Login page', wrongCredential :false})
        }
    }
})

// adminRouter.get('/',(req,res)=>{
//     if (req.session.admin) {
//         res.redirect('/adminDashboard')
//     } else {
//         res.render('admin-Login-page',{title:'Admin Login page'})
//     }
// })

const credential = {
    adminEmail : 'admin@gmail.com',
    adminPassword : 123
}

adminRouter.post('/adminLogin',async (req,res)=>{
    if(req.body.email == credential.adminEmail && req.body.password == credential.adminPassword){
        req.session.admin = req.body.email;
        console.log('Admin logged in');

        const userInfo = await Register.find({})
        res.render('AdminDashboard',{title : 'Admin Dashboard', data : userInfo })
        console.log("Admin Logged in")
    }else{
        console.log("wrong email or password");
        invalidId = true;
        res.redirect('/admin')
    }
})

adminRouter.get('/adminLogout',(req,res)=>{
    req.session.destroy((error)=>{
        if (error) {
            console.log(error);
            res.send('Error occured')
        } else {
            loggedOut = true;
            res.redirect('/admin')
        }
    })
})

module.exports = adminRouter;