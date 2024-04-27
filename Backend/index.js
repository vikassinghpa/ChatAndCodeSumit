const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const UserRoute = require('./Routes/UserRoute');
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("DB connected")
})
.catch((e)=>{
  console.log("Failed DB Connection: ",e)
})

app.use(methodOverride('method'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.send("hello world")
})


app.use(UserRoute)



app.listen(process.env.PORT,()=>{
  console.log("server connected at port.")
})