const PlayerModel = require('../Models/player-model');
const bcrypt=require('bcrypt');


//Controller Logics Below


async function signUp(req, res) {
    try {
        const payload = req.body;

        const saltRounds = 10; // The number of salt rounds for bcrypt
         // Hash the name, username, email, and password
         const hashedName = await bcrypt.hash(payload.name, saltRounds);
         const hashedUsername = await bcrypt.hash(payload.username, saltRounds);
         const hashedEmail = await bcrypt.hash(payload.email, saltRounds);
         const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

        const obj = {
            name: hashedName,
            email: hashedEmail,
            username: hashedUsername,
            password: hashedPassword
        };

        const newUser = await PlayerModel.create(obj);
        res.json({
            status: true,
            msg: "User Created Successfully"
        });
    }
    catch (error) {
        res.json({
            status: false,
            msg: 'Error',
            data: error
        });
    }
}


async function signIn(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await PlayerModel.findOne();
        const users = await PlayerModel.find({});
        
        let userFound = false;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const isUsernameMatch = await bcrypt.compare(username, user.username);
            if (isUsernameMatch) {
                userFound = user;
                break;
            }
        }

        if (!userFound) {
            return res.status(400).json({
                status: false,
                msg: 'Username or password is incorrect'
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
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
                id: userFound._id,
                username: userFound.username,
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




module.exports= {signUp,signIn};
