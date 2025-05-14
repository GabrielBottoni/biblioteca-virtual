const livroService = require('../services/livroService');
const path = require('path');
const fs = require('fs');

const getAllLivros = async (req, res) => {
    try {
        const livros = await livroService.getAllLivros();
        return res.status(200).json(livros);
    } catch (error) {
        console.error(error);
        if (error.message === 'Livro não encontrado') {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(500).json({ message: 'Erro ao listar livros', error });
    }
};

const getLivro = async (req, res) => {
    try {
        const livro = await livroService.getLivro(req.params.id);
        return res.status(200).json(livro);
    } catch (error) {
        console.error(error);
        if (error.message === 'Livro não encontrado') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error: ' + error.message });
    }
};


const updateLivro = async (req, res) => {
    try {
        const { id } = req.params;

        const { titulo, autor, ano, genero } = req.body;
        const newImage = req.file ? req.file.filename : null;

        const livroAtual = await livroService.getLivro(id);

        if (!livroAtual) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        if (req.file && livroAtual.image && req.file.filename !== livroAtual.image) {
            const oldImagePath = path.join(__dirname, '../../uploads/', livroAtual.image);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                    console.log('Imagem antiga deletada com sucesso:', livroAtual.image);
                } catch (err) {
                    console.error('Erro ao deletar imagem antiga:', err.message);
                }
            } else {
                console.log('Imagem antiga não encontrada para exclusão:', oldImagePath);
            }
        }


        const livroAtualizado = await livroService.updateLivro(id, {
            titulo,
            autor,
            ano,
            genero,
            image: newImage || livroAtual.image
        });

        res.json(livroAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({
            message: 'Erro ao atualizar livro',
            error: error.message,
            stack: error.stack
        });

    }

};

const deleteLivro = async (req, res) => {
    try {
        const livro = await livroService.getLivro(req.params.id);

        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        if (livro.image) {
            const imagePath = path.join(__dirname, '../../uploads/', livro.image);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('Imagem deletada com sucesso:', livro.image);
            } else {
                console.log(`Imagem não encontrada para exclusão: ${livro.image}`);
            }
        }

        const deleted = await livroService.deleteLivro(req.params.id);

        return res.status(200).json(deleted);
    } catch (error) {
        console.error('Erro ao deletar o livro:', error);
        res.status(500).json({
            message: 'Erro ao deletar o livro.',
            error: error.message
        });
    }
};


const createLivro = async (req, res) => {
    try {
        const { titulo, autor, ano, genero } = req.body;
        const image = req.file?.filename;

        if (!titulo || !autor || !ano || !genero || !image) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const imagePath = `${req.file.filename}`;

        const livro = await livroService.createLivros({ titulo, autor, ano, genero, image: imagePath });
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
};
