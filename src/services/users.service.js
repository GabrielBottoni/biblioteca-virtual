const usersModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // Importando o UUID

const getAllUsers = async () => {
    const users = await usersModel.getUsers();
    if (!users || users.length === 0) {
        throw new Error('Usuários não encontrados');
    }
    return users.map(({ password, ...user }) => user); // Remove a senha de todos
};

const saveUsers = async ({ username, email, password }) => {
    const users = await usersModel.getUsers();

    const userExists = users.some(
        user =>
            user.username === username ||
            user.email === email
    );

    if (userExists) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: uuidv4(), // Gerando um ID único com UUID
        username,
        email,
        password: hashedPassword,
        role: 'user',
    };

    users.push(newUser);
    await usersModel.saveUsers(users);

    const { password: _, ...safeUser } = newUser;
    return safeUser;
};

module.exports = { 
    getAllUsers,
    saveUsers,
};
