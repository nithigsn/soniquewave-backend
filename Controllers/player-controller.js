const PlayerModel = require('../Models/player-model');
const bcrypt = require('bcrypt');


//Controller Logics Below


async function signUp(req, res) {
    try {
        const payload = req.body;

        const saltRounds = 10; // The number of salt rounds for bcrypt
        // Hash password
        const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

        const obj = {
            name: payload.name,
            email: payload.email,
            username: payload.username,
            password: hashedPassword
        };

        const newUser = await PlayerModel.create(obj);

        res.json({
            status: true,
            msg: "User Created Successfully",
            data: {
                id: newUser._id // Ensure 'newUser' is used here to access the created user's ID
            }
        });
    } catch (error) {
        res.json({
            status: false,
            msg: 'Error',
            data: error.message // Send only the error message
        });
    }
}




async function signIn(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await PlayerModel.findOne({ username });

        // If user is not found
        if (!user) {
            return res.status(400).json({
                status: false,
                msg: 'Username or password is incorrect'
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: false,
                msg: 'Username or password is incorrect'
            });
        }

        // If everything is correct
        res.json({
            status: true,
            msg: 'Sign in successful',
            data: {
                id: user._id,
                username: user.username,
                // You can add more user details if needed
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Error',
            data: error.message
        });
    }
}


//CRUD: u -> Update


async function playList(req, res) {
    try {
        const { _id, playlistname } = req.body;

        // Add a new playlist to the specified player's playlists array
        const result = await PlayerModel.updateOne(
            { _id: _id },
            { $push: { playlists: { playlistname: playlistname, songs: [] } } }
        );

        const status = result.modifiedCount === 1;

        res.json({
            status: status,
            msg: status ? "success" : "fail"
        });
    } catch (error) {
        res.json({
            status: false,
            msg: 'error',
            data: error
        });
    }
}


//CRUD : R -> Read

async function userDetails(req, res) {
    try {
        // Get the id from request parameters
        const condition = { _id: req.params.id };

        // Find the player with the given id
        const result = await PlayerModel.findOne(condition);

        // Check if the result is not null
        const status = result !== null;

        // Respond with the appropriate status and data
        res.json({
            status: status,
            msg: status ? "true" : "false",
            data: result
        });
    } catch (error) {
        // Handle any errors that occurred during the process
        res.json({
            status: false,
            msg: 'error',
            data: error
        });
    }
}




module.exports = { signUp, signIn, playList, userDetails };
