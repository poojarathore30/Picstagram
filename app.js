const express=require('express');
const app=express();
const mongoose=require('mongoose');
const {MongoURI}=require('./config/keys');
mongoose.connect(MongoURI,{ useNewUrlParser: true ,
    useUnifiedTopology: true ,useFindAndModify:false
});

let port_no=process.env.PORT ||2000;
//databse access pswd: Bosd2VpRyjoDxKmJ
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDB !!");
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting to database!!",err);
})
//models i.e schema for mongodb
require('./models/user');
require('./models/post');
//middlewares
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(port_no,(req,res)=>{
    console.log("Server up and running at port "+port_no);
})