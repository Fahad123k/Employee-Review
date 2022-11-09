const express= require('express');
// secret code credential 
const dotenv=require('dotenv');
const morgan = require('morgan');
const bodyparser=require('body-parser')
// inbuiltd path module
const path= require('path')
// connect database
const connectDB=require('./server/database/connection')
const app=express();

dotenv.config({path:'config.env'});
const PORT=process.env.PORT || 8080;
// app.get("root route=/",(callback es6 functons))

// log request  like GET / 304 - - 15.459 ms
app.use(morgan("tiny"))

// after morgan connect db
// mongoDB connection
connectDB();
// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}));
// set view engine as ejs
app.set("view engine","ejs")
// if u want set view folder as default us ebelow command
// app.set("views",path.resolve(__dirname,"view/ejs"))

// load assets if you want to use css just write css/style.css
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/', require('./server/routes/router'))

// app.get('/',(req,res)=>{
//     res.render('index')
// })


// app.get('/add-user',(req,res)=>{
//     res.render('add_user')
// })

// app.get('/update-user',(req,res)=>{
//     res.render('update_user')
// })




app.listen(PORT,()=>{console.log(`Server is runinig on http://localhost:${PORT}`)});