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

const credential = {
    adminEmail : 'admin@gmail.com',
    adminPassword : 123
}

adminRouter.post('/adminLogin',async (req,res)=>{
    if(req.body.email == credential.adminEmail && req.body.password == credential.adminPassword){
        req.session.admin = req.body.email;
        const data = await Register.find({})
        res.render('AdminDashboard',{title : 'Admin Dashboard', data })
        console.log("Admin Logged in")
    }else{
        console.log("wrong email or password");
        invalidId = true;
        res.redirect('/admin')
    }
})

adminRouter.get('/adminDashboard',(req,res)=>{
    res.redirect('/adminLogin')
})

adminRouter.get('/adminLogout',(req,res)=>{
    req.session.destroy((error)=>{
        if (error) {
            console.log(error);
            res.send('Error occured')
        } else {
            loggedOut = true;
            res.redirect('/admin')
            console.log('Admin logged out');
        }
    })
})

adminRouter.get('/deleteUser', async (req,res)=>{
    const id = req.query.id;
    await Register.deleteOne({_id : id});
    const data = await Register.find({});
    res.render('AdminDashboard',{title : 'Admin Dashboard' , data})
})

adminRouter.get('/editUser',async (req,res)=>{
    const id = req.query.id;
    const user = await Register.find({ _id : id });
    const userData = user[0];
    res.render('userUpdate',{title : 'User Update Page' , userData})
})

adminRouter.post('/userUpdate', async (req,res)=>{
    const id = req.query.id;
    await Register.updateOne(
        { _id : id },
        {
            $set :{
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            }
        }
    )
    const data = await Register.find({});
    res.render('AdminDashboard',{ title : 'Admin Dashboard' , data})
})

module.exports = adminRouter;