const express = require('express');
const router = express.Router();

//Login page
router.get('/',(req,res)=>{
    res.render('Login-page',{title:'Login page'})
})

//signup page
router.get('/signup',(req,res)=>{
    res.status(200).render('Signup-page',{title:'Signup-page page'})
})

//Already have an account
router.get('/login',(req,res)=>{
    res.redirect('/')
})
module.exports = router