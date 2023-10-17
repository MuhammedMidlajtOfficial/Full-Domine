const express = require('express');
const router = express.Router();
const auth = require('./auth');
const session = require('express-session');

const credential = {
    email : 'admin@gmail.com',
    password : 123
}

let loggedOut = false;
let invalidId = false;
let newUserAdded = false;

//Login page
router.get('/',auth.redirectToDashboard,(req,res)=>{
    if(loggedOut){
        res.render('Login-page',{title:'Login page', LogOut :true})
        loggedOut = false;
        invalidId = false;
        newUserAdded = false;
    }else if(invalidId){
        res.render('Login-page',{title:'Login page', wrongCredential :true})
    }else if(newUserAdded){
        res.render('Login-page',{title:'Login page', addNewUser :true})
    }else{
        res.render('Login-page',{title:'Login page', wrongCredential :false})
    }
})

//Don't have an account
router.get('/DontHaveAnAccount',(req,res)=>{
    res.render('Signup-page',{title:'Signup-page page'})
})

//Already have an account
router.get('/haveAnAccount',(req,res)=>{
    res.redirect('/')
})

router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/Dashboard')
    }else{
        invalidId = true;
        res.redirect('/')
    }
})

router.get('/Dashboard',(req,res)=>{
    if(req.session.user){
        res.render('Dashboard',{title:'Dashboard'})
    }else{
        res.redirect('/')
    }
})

router.get('/logout',auth.isLogin,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error occured')
        }else{
            loggedOut = true;
            res.redirect('/')
        }
    })
})

//signup form
router.post('/signup',(req,res)=>{
    console.log(req.body.sName);
    newUserAdded = true;
    res.redirect('/')
})

module.exports = router