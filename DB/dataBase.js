const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FullDomain',{
    useNewUrlParser : true,
    useUnifiedTopology :true
}).then(()=>{
    console.log('MongoDB Conected');
}).catch((err)=>{
    console.log(err);
})