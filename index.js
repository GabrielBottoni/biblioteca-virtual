require ('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');
const usersRoutes = require('./src/routes/usersRoutes');
const livroRoutes = require('./src/routes/livroRoutes');
const authRoutes = require('./src/routes/authRoutes');
const path = require('path');

const { logRequest } = require('./src/middlewares/log.middleware');
const { verifyToken } = require('./src/middlewares/auth.middleware');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());
app.use(logRequest);

// Rotas publicas
app.use('/auth', authRoutes);

// Rotas privadas
app.use('/livros', verifyToken, livroRoutes);
// Rota de usuários
app.use('/users', verifyToken, usersRoutes);

const port = process.env.PORT;
app.listen(port, () => 
    console.log("Servidor iniciado em: http://localhost:"+port));
