const Sequelize = require('sequelize');
const db = require('./db');

const Livros = db.define('livros', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sinopse: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Livros.sync();//cria a tabela no banco de dados

module.exports = Livros;