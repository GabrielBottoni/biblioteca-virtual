const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/livroController');
const upload = require('../middlewares/upload.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

//GET /livros
router.get('/', LivroController.getAllLivros);
//GET /livros/:id
router.get('/:id', LivroController.getLivro);
//PATCH /livros
router.patch('/:id', verifyToken, authorizeRoles ("admin"), LivroController.updateLivro);
//DELETE /livros/:id
router.delete('/:id', verifyToken, authorizeRoles ("admin"), LivroController.deleteLivro);
//POST /livros
router.post('/', verifyToken, authorizeRoles ("admin"), upload.single('image') , LivroController.createLivro);

module.exports = router;