const Register = require('../Model/registers')

module.exports.isUserLogin = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/user')
    }
} 

module.exports.isUserExist = async (req,res,next)=>{
    const data = await Register.findOne({email :req.session.user})
    if(data){
        next();
    } else {
        res.redirect('/user/userNotExist')
    }
}

module.exports.isAdminLogin = (req,res,next)=>{
    if(req.session.admin){
        next();
    }else{
        res.redirect('/admin')
    }
}

module.exports.redirectToDashboard = (req,res,next)=>{
    if(req.session.user){
        res.redirect('/user/userDashboard')
    }else{
        next()
    }
}