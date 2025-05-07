const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { SECRET } = require('../services/authService');

const logFilePath = path.join(__dirname, '../data/auth.log');

const logUser = (user) => {
    const logEntry = `[${new Date().toISOString()}] User ID: ${user.id}, Username: ${user.username}, Email: ${user.email}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Erro ao gravar o log de autenticação: " + error.message);
        }
    });
}

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, SECRET);
        logUser(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

module.exports = {
    verifyToken,
};