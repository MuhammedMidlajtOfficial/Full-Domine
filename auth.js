module.exports.isLogin = (req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.redirect('/')
    }
} 

module.exports.redirectToDashboard = (req,res,next)=>{
    if(req.session.user){
        res.redirect('Dashboard')
    }else{
        next()
    }
}

