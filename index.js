const express = require("express")
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const app = express();
var hbs = require('hbs');
const router = require('./router/route')
app.use(express.static('public'))

const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs');

mongoose.connect('mongodb+srv://ashutoshk043-1998:U8QSwvpHF19IjV7W@cluster0.yxszvwn.mongodb.net/holdInfo',()=>{
    console.log("DB Connected..");
})
app.use('/', router)

app.listen(5000, ()=>{
    console.log(`server is running on prrt 5000`);
})