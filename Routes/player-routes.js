const express = require('express');
const {signUp,signIn} =require('../Controllers/player-controller');

const playerRouter=express.Router();

//Crud


// C -> Create - POST
playerRouter.post('/signup',signUp);

//R - > Read - GET
playerRouter.get('/signin',signIn);





module.exports=playerRouter;
