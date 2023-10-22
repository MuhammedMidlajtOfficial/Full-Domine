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



// module.exports.isAdmin = (req,res,next)=>{
//     if(req.body.email == credential.adminEmail && req.body.password == credential.adminPassword){
//         req.session.admin = req.body.email;
//         console.log('Admin logged in');
//         res.redirect('admin/adminLogin')
//     }else{
//         next()
//     }
// }