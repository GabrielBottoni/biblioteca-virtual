const livroService = require('../services/livroService');

const getAllLivros = async (req, res) => {
    try {
        const livros = await livroService.getAllLivros();
        return res.status(200).json(livros);   
    } catch (error) {
        console.error(error);
        if(error.message === 'Livro não encontrado') {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(500).json({ message: 'Erro ao listar livros', error });
    }
}

const getLivro = async (req, res) => {
    try {
        const livro = await livroService.getLivro(req.params.id);
        return res.status(200).json(livro);
    } catch (error) {
        console.error(error);
        if(error.message === 'Livro não encontrado') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error: ' + error.message });
    }
} 

const updateLivro = async (req, res) => {
    try {
        const updated = await livroService.updateLivro(req.params.id, req.body);
        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error: ' + error.message });
    }
}

const deleteLivro = async (req, res) => {
    try {
        const deleted = await livroService.deleteLivro(req.params.id);
        return res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error: ' + error.message });
    }
}

const createLivro = async (req, res) => {
    try {
        const { titulo, autor, ano, genero} = req.body;
        const imagem = req.file?.filename;

        if (!imagem) {
            return res.status(400).json({ message: 'Imagem não enviada.' });
        }

        const livro = await livroService.createLivros({ titulo, autor, ano, genero, imagem });
        return res.status(201).json(livro); 
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar livro.', error: err.message });
    }
};

module.exports = {
    getAllLivros,
    getLivro,
    updateLivro,
    deleteLivro,
    createLivro
}