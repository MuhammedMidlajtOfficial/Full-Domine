const express = require('express');
const userRouter = express.Router();
const auth = require('../Authentication/auth');
const session = require('express-session');

require('../DB/dataBase')
const Register = require('../Model/registers');

let loggedOut = false;
let invalidId = false;
let newUserAdded = false;

//Login page
userRouter.get('/',auth.redirectToDashboard,(req,res)=>{
    if(loggedOut){
        res.render('User-Login-page',{title:'Login page', LogOut :true})
        loggedOut = false;
        invalidId = false;
        newUserAdded = false;
    }else if(invalidId){
        res.render('User-Login-page',{title:'Login page', wrongCredential :true})
    }else if(newUserAdded){
        res.render('User-Login-page',{title:'Login page', addNewUser :true})
    }else{
        res.render('User-Login-page',{title:'Login page', wrongCredential :false})
    }
})

//Don't have an account
userRouter.get('/dontHaveAnAccount',(req,res)=>{
    res.render('Signup-page',{title:'Signup page'})
})

//Already have an account
userRouter.get('/haveAnAccount',(req,res)=>{
    res.redirect('/')
})

userRouter.post('/login', async (req,res)=>{
    try {
        const userEmail = await Register.findOne({email : req.body.email})
        if(userEmail){
            if (userEmail.password === req.body.password) {
                req.session.user = req.body.email;
                res.redirect('/userDashboard')
                console.log(req.session.user,'LoggedIn');
            }else{
                invalidId = true;
                res.redirect('/')
            }
        }else{
            invalidId = true;
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
})

userRouter.get('/userDashboard',(req,res)=>{
    if(req.session.user){
        res.render('userDashboard',{title:'Dashboard'})
    }else{
        res.redirect('/')
    }
})

userRouter.get('/userLogout',auth.isLogin,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error occured')
        }else{
            loggedOut = true;
            console.log('logged Out done');
            res.redirect('/user')
        }
    })
})

// userRouter.get('/userLogout',(req,res)=>{
//     req.session.user = null;
//     loggedOut = true;
//     console.log(req.session,'logged Out done');
//     res.redirect('/user')
// })

//signup form

userRouter.post('/signup', async (req,res)=>{
    try {
        if(req.body.sPassword === req.body.repeateSPassword){
            let userData = new Register({
                name : req.body.sName,
                email : req.body.sMail,
                password : req.body.sPassword,
            })

            await userData.save();
            newUserAdded = true;
            res.redirect('/')
        }else{
            res.render('Signup-page',{title:'Signup page',checkPassword : true})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

// userRouter.get('/adminLogout',(req,res)=>{
//     req.session.destroy((error)=>{
//         if (error) {
//             console.log(error);
//             res.send('Error occured')
//         } else {
//             loggedOut = true;
//             res.redirect('/')
//         }
//     })
// })

module.exports = userRouter