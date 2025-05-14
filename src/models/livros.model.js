const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/livros.json');

const getLivros = async () => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

const getLivrosById = async (id) => {
    const livros = await getLivros();
    const livro = livros.find(
        livr => String(livr.id) === String(id)
    );
    return livro;
}

const saveLivros = async (livros) => {
    await fs.writeFile(filePath, JSON.stringify(livros, null, 2));
}

const createLivro = async (livro) => {
    const livros = await getLivros();
    const newId = livros.length ? livros[livros.length - 1].id + 1 : 1;
    const novoLivro = { id: newId, ...livro };
    livros.push(novoLivro);
    await saveLivros(livros);
    return novoLivro;
}

module.exports = {
    getLivros,
    getLivrosById,
    saveLivros,
    createLivro
}