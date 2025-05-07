const usersModel = require('../models/users.model');
const bycrypt = require('bcryptjs');

const getAllUsers = async () => {
    const users = await usersModel.getUsers();
    if(!users || users.length === 0) {
        throw new Error('Usuários não enconttrados');
    }
    return users;
}

const saveUsers = async ({username, email, password}) => {
    const user = await usersModel.getUsers();

    const userExists = user.some(
        user =>
            user.username === username ||
            user.email === email
    )

    if (userExists) return null;

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = {
        id: user.length + 1,
        username,
        email,
        password: hashedPassword,
    }

    user.push(newUser);
    await usersModel.saveUsers(user);

    const { password: _, ...safeUser} = newUser;
    return safeUser;
}

    module.exports = { 
        getAllUsers,
        saveUsers,
    };
