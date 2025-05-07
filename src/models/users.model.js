const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

const getUsers = async () => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

const saveUsers = async (users) => {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

module.exports = {
    getUsers,
    saveUsers
}