module.exports.isLogin = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/user')
    }
} 

module.exports.isAdminLogin = (req,res,next)=>{
    if(req.session.admin){
        // next();
        res.redirect('admin/adminLogin')
    }else{
        next()
    }
}

module.exports.redirectToDashboard = (req,res,next)=>{
    if(req.session.user){
        res.redirect('user/userDashboard')
    }else{
        next()
    }
}