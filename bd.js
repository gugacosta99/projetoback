const { Sequelize } = require('sequelize')
const sequeliz = new sequeliz(
    'livraria',
    'root',
    '123456789', {
    host: 'localhost',
    dialect: 'mysql'
});

Sequelize.authenticate().then(function () {
    console.log('conexão realizada')

}).catch (function() {

    console.log('conexão errada')
})

module.exports = sequelize;

