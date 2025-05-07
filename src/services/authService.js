require ('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/users.model');

const SECRET = process.env.JWT_SECRET;

const authenticateUser = async (email, password) => {    
    const users = await userModel.getUsers();

    const user = users.find(
        user => user.email === email
    );

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email        
    }, SECRET, {
        expiresIn: '1h'
    });

    return token;
}

module.exports = {
    authenticateUser,
    SECRET,
};