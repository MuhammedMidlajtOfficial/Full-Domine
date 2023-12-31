const express = require('express');
const path = require('path');
const userRouter = require('./Routes/userRouter');
const adminRouter = require('./Routes/adminRouter')
const nocache = require('nocache');
const {v4 : uuidv4} = require('uuid');
const session = require('express-session');
const app = express();

require('./DB/dataBase');
// const Register = require('./Model/registers')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(nocache())

app.use(session({
    secret : uuidv4(),
    resave : false,
    saveUninitialized : true
}))

const port = process.env.PORT || 9000;

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

//Load Static Assets
app.use(express.static(path.join(__dirname,'Public')))

app.use('/user',userRouter);
app.use('/admin',adminRouter);

app.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect('/user/userDashboard')
    }else if(req.session.admin){
        res.redirect('/admin/adminDashboard')
    }else{
        res.render('main',{title : 'Main'})
    }
})

app.listen(port,()=>{
    console.log('Server started\nhttp://127.0.0.1:9000');
})