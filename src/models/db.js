const Sequelize = require('sequelize') //importando sequelize que facilita conexão com o banco
const sequelize = new Sequelize(
    'livraria',
    'root',
    '123456789', {
    //'Root@123', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(function () {
        console.log('conexão realizada')

    }).catch(function () {

        console.log('conexão errada')
    });

module.exports = sequelize;



