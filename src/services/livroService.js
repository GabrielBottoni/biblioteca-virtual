const fs = require('fs');
const { getLivros, getLivrosById, saveLivros} = require('../models/livros.model.js');
const path = require('path');

const filePath = path.join(__dirname, '../data/livros.json');


const getAllLivros = async () => {
    const livros = await getLivros();
    if (!livros || livros.length === 0) {
        throw new Error('Nenhum livro encontrado.');
    }
    return livros;
}

const getLivro = async (id) => {
    const livro = await getLivrosById(id);
    if (!livro) {
        throw new Error('Livro não encontrado.');
    }
    return livro;
}

const updateLivro = async (id, data) => {
    
    const livros = await getLivros();

    const livroIndex = livros.findIndex(livr => String(livr.id) === String(id));
    if (livroIndex === -1) {
        throw new Error('Livro não encontrado.');
    }

    const updatedLivros = {...livros[livroIndex], ...data};

    livros[livroIndex] = updatedLivros;
    await saveLivros(livros);
    return updatedLivros;

}

const deleteLivro = async (id) => {
    const livros = await getLivros();
    const livroIndex = livros.findIndex(livr => String(livr.id) === String(id));
    if (livroIndex === -1) {
        throw new Error('Livro não encontrado.');
    }
    const livroRemovido = livros.splice(livroIndex, 1);
    await saveLivros(livros);
    return livroRemovido[0];
}

const createLivros = async (livroData) => {
    try {
        let livros = [];

        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath, 'utf-8');
            livros = JSON.parse(file || '[]');
        }

        const novoLivro = {
            id: Date.now(),
            ...livroData
        };

        livros.push(novoLivro);

        fs.writeFileSync(filePath, JSON.stringify(livros, null, 2));

        return novoLivro;
    } catch (err) {
        throw new Error('Erro ao salvar livro: ' + err.message);
    }
};

module.exports = {
    getAllLivros,
    getLivro,
    updateLivro,
    deleteLivro,
    createLivros
}; 