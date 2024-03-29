const express = require('express');//importando o express.
const path = require('path');

//instanciando uma função do express, gerencinado rotas.
const app = express();

const Livros = require('./src/models/Livros') //importando o arquivo das tabelas

app.use(express.json()); //indicando que minha aplicação recebe dados do tipo json

app.use(express.urlencoded({ extended: false }));
app.use(express.json());//configuração para receber resposta do cliente, dados inseridos.


app.use('/imagens', express.static(__dirname + '/src/imagens'));//configuração para a rota reconhecer as imagens que estão dentro do meu diretório.
//__dirname serve para ter caminho absoluto ao arquivo mencionado.


app.use(express.static(path.join(__dirname, 'public'))); //pasta public tem os arquivos JAVASCRIPT

app.get("/", function (req, res) { //definindo uma rota get para a raiz.
    res.status(200).redirect('/home.html');
});

app.get("/cadastro.html", function (req, res) { //definindo uma rota get para a raiz.
    res.sendFile(__dirname + "/public/cadastro.html")  //informação que a página raiz(home) está recebendo.
});

app.get("/sobre.html", function (req, res) {
    res.sendFile(__dirname + "/public/sobre.html")
});

app.get("/home.html", function (req, res) {
    res.sendFile(__dirname + "/public/home.html")
});

app.get("/livro", function (req, res) {
    res.sendFile(__dirname + "/public/livro.html")
})


app.post('/cadastro', async (req, res) => { //enviando dados para o banco de dados
    await Livros.create(req.body)
        .then(() => {
            res.status(200).redirect('/home.html');
        }).catch((e) => {
            console.log(e);
            res.status(400);
        })
});

app.get('/livros', async (req, res) => { //mostrar todos os livros na pagina home
    const livros = await Livros.findAll();
    return res.json(livros);
});

app.get('/api/livro', async (req, res) => { //pagina de detalhes
    const id = req.query.id;
    const livro = await Livros.findByPk(id); // SELECT * FROM livros WHERE id = ?
    if (livro) {
        return res.json(livro);
    } else {
        return res.status(404);
    }

});

app.delete('/livro/:id', async (req, res) => {
    const id = req.params.id;
    const livro = await Livros.destroy({ where: { id: id } });
    console.log(livro);
    return res.json(livro);
});

app.listen(8080);
console.log("http://localhost:8080");

