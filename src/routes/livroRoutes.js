const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/livroController');
const upload = require('../middlewares/upload.middleware');

//GET /livros
router.get('/', LivroController.getAllLivros);
//GET /livros/:id
router.get('/:id', LivroController.getLivro);
//PATCH /livros
router.patch('/:id', LivroController.updateLivro);
//DELETE /livros/:id
router.delete('/:id', LivroController.deleteLivro);
//POST /livros
router.post('/', upload.single('imagem') , LivroController.createLivro);

module.exports = router;