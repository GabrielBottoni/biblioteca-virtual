const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../data/request.log');

const logRequest = (request, response, next) => {
    
    const logEntry = `[${new Date().toISOString()}] ${request.method} - ${request.url}\n`;

    fs.appendFile(logFilePath, logEntry, (error) => {
        if(error) {
            console.error('Erro ao gravar o log:' + error);
        }
    })

    next();
}

module.exports = { logRequest }
