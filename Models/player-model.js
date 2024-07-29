const mongoose = require('mongoose');


//Create Schema
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    about: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playlists: [{
        playlistname: { type: String, required: true },
        songs: [{ name: { type: String, required: true } }]

    }]


});

//Create Model
const PlayerModel = mongoose.model('Player', playerSchema);


module.exports = PlayerModel;

