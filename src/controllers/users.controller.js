const usersService = require('../services/users.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        if (error.message === 'Usuários não encontrados') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
}

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const user = await usersService.saveUsers({ username, email, password });

        if (!user) {
            return res.status(400).json({ message: 'Erro ao criar usuário' });
        }

        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
}

const toggleUserRole = async (req, res) => {
    try {
        const updatedUser = await usersService.toggleRole(req.params.id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar função do usuário', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    toggleUserRole
};
