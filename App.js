const express= require('express');
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');

const playerRouter=require('./Routes/player-routes')

const app=express();

const URI='mongodb+srv://nithishgsn000:0SCO5YqWOZ8rUL61@soniquewave.wgzuexb.mongodb.net/?retryWrites=true&w=majority&appName=SoniqueWave';

mongoose.connect(URI);
mongoose.connection.on('connected',()=>{
    console.log('Mongo DB is Connected');
});


// middle ware
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());


//router
app.use('/player',playerRouter);




//exports
module.exports=app;