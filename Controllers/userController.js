const session = require('express-session');
require('../DB/dataBase')
const Register = require('../Model/registers');

let loggedOut = false;
let invalidId = false;
let newUserAdded = false;
let UserNotExist = false;

module.exports.isUser = (req,res)=>{
    if(loggedOut){
        res.render('User-Login-page',{title:'Login page', LogOut :true})
        loggedOut = false;
        
    }else if(invalidId){
        res.render('User-Login-page',{title:'Login page', wrongCredential :true})
        invalidId = false;
    }else if(newUserAdded){
        res.render('User-Login-page',{title:'Login page', addNewUser :true})
        newUserAdded = false;
    }else if(UserNotExist){
        res.render('User-Login-page',{title:'Login page', UserNotExist :true})
        UserNotExist = false;
    }else{
        res.render('User-Login-page',{title:'Login page', wrongCredential :false})
    }
}

module.exports.getSignup = (req,res)=>{
    res.render('Signup-page',{title:'Signup page'})
}

module.exports.postLogin =  async (req,res)=>{
    try {
        const userEmail = await Register.findOne({email : req.body.email})
        if(userEmail){
            req.session.user = req.body.email;
            res.redirect('/user/userDashboard')
            console.log(req.session.user,'LoggedIn');
        }else{
            invalidId = true;
            res.redirect('/user')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUserDashboard = (req,res)=>{
    if(req.session.user){
        res.render('userDashboard',{title:'Dashboard' , userMail : req.session.user })
    }else{
        res.redirect('/user')
    }
}

module.exports.getUserLogout = (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error occured')
        }else{
            loggedOut = true;
            console.log('User logged Out done');
            res.redirect('/user')
        }
    })
}

module.exports.postSignup =  async (req,res)=>{
    console.log('redirect to postSignup');
    try {
        let userData = new Register({
            name : req.body.sName,
            email : req.body.sMail,
            password : req.body.sPassword,
        })
        await userData.save();
        newUserAdded = true;
        res.redirect('/user')
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports.getUserNotExist = (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error occured')
        }else{
            console.log('User logged Out done');
        }
    })
    UserNotExist = true;
    res.redirect('/user')
}