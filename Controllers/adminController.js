const Register = require('../Model/registers')

let loggedOut = false;
let invalidId = false;

const credential = {
    adminEmail : 'admin@gmail.com',
    adminPassword : 123
}

module.exports.isAdmin = (req,res)=>{
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
}

module.exports.postAdminLogin = (req,res)=>{
    if(req.body.email == credential.adminEmail && req.body.password == credential.adminPassword){
        req.session.admin = req.body.email;
        res.redirect('/admin/adminDashboard')
    }else{
        console.log("wrong email or password");
        invalidId = true;
        res.redirect('/admin')
    }
}

module.exports.getAdminDashboard = async (req,res)=>{
    if(req.session.admin){
        const data = await Register.find({})
        res.render('AdminDashboard',{title : 'Admin Dashboard', data })
        console.log("Admin Logged in")
    } else {
        res.redirect('/admin')
    }
}

module.exports.getAdminLogout = (req,res)=>{
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
}

module.exports.getDeleteUser =  async (req,res)=>{
    try {
        const id = req.query.id;
        const data = await Register.find({});
        await Register.deleteOne({_id : id});
        res.redirect('/admin/adminDashboard');
        // res.render('AdminDashboard',{title : 'Admin Dashboard' , data})
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred')
    }
}

module.exports.getEditUser = async (req,res)=>{
    const id = req.query.id;
    const user = await Register.find({ _id : id });
    const userData = user[0];
    res.render('userUpdate',{title : 'User Update Page' , userData})
}

module.exports.postUserUpdate = async (req,res)=>{
    const id = req.query.id;
    const data = await Register.find({});
    const user = await Register.find({ _id : id });
    const userData = user[0];
    const trimmedUName = req.body.uName.trim();
    const trimmedUPassword = req.body.uPassword.trim();

    if( trimmedUName === "" && trimmedUPassword === ""){
        res.render('userUpdate',{title : 'User Update Page' , fillUNameField : true , fillUPasswordField : true, userData })
    } else if(trimmedUName === ""){
        res.render('userUpdate',{title : 'User Update Page' , fillUNameField : true , userData })
    }else if(trimmedUPassword === ""){
        res.render('userUpdate',{title : 'User Update Page' , fillUPasswordField : true , userData })
    } else {
        if(req.body.uPassword === req.body.repeateUPassword){
            await Register.updateOne(
                { _id : id },
                {
                    $set :{
                        name : req.body.uName,
                        email : req.body.uMail,
                        password : req.body.uPassword
                    }
                }
            )
            res.render('AdminDashboard',{ title : 'Admin Dashboard' , data})
        } else {
            res.render('userUpdate',{title : 'User Update Page' , checkPassword : true , userData })
        }
    }
}

module.exports.postSearch = async(req,res)=>{
    const searchKey = req.body.search;
    const data = await Register.find({ name: { $regex:`^${searchKey}`, $options: "xi" } });
    res.render('AdminDashboard',{ title : 'Admin Dashboard' , data})
}

module.exports.getClearSearch = async (req,res)=>{
    const data = await Register.find({});
    res.render('AdminDashboard',{title : 'Admin Dashboard' , data})
}