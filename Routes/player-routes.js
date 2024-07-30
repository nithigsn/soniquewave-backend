const express = require('express');
const {signUp,signIn, playList, userDetails, updateDetails} =require('../Controllers/player-controller');

const playerRouter=express.Router();

//Crud


// C -> Create - POST
playerRouter.post('/signup',signUp);

//  POST
playerRouter.post('/signin',signIn);

// POST
playerRouter.post('/playlist',playList);

playerRouter.post('/update',updateDetails)

// R -> Read GET
playerRouter.get('/:id',userDetails);


playerRouterRouter.get('/All', (req, res) => {
    res.json({
        status: true,
        msg: 'Endpoint /All is working'
    });
});







module.exports=playerRouter;
