const authService = require('../services/authService');
const saveUsers = require('../models/users.model');
const bcrypt = require('bcrypt');

const login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const token = await authService.authenticateUser(email, password);
        if(!token){
            return response.status(401).json({ error: 'Credenciais inválidas'});
        }
        response.status(200).json({token});
    } catch (error) {
        response.status(500).json({ message: 'Erro interno do servidor: ' + error.message });

    }
}

module.exports = {
    login
}