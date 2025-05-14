const usersModel = require('../models/users.model');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const getAllUsers = async () => {
    const users = await usersModel.getUsers();
    if (!users || users.length === 0) {
        throw new Error('Usuários não encontrados');
    }
    return users.map(({ password, ...user }) => user);
};

const saveUsers = async ({ username, email, password }) => {
    const users = await usersModel.getUsers();

    const userExists = users.some(
        user =>
            user.email === email
    );

    if (userExists) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: uuidv4(),
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

const toggleRole = async (id) => {
    const users = await usersModel.getUsers();
    const index = users.findIndex(u => String(u.id) === String(id));
    if (index === -1) throw new Error('Usuário não encontrado');

    users[index].role = users[index].role === 'admin' ? 'user' : 'admin';
    await usersModel.saveUsers(users);
    return users[index];
};


module.exports = {
    getAllUsers,
    saveUsers,
    toggleRole
};
