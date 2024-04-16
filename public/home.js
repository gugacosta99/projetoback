console.log("home.js carregado com sucesso");


document.addEventListener("DOMContentLoaded", () => {

    // Faça uma requisição para a rota '/livros'
    // O retorno é um array de livros em formato JSON
    // Logo, podemos trabalhar com esses dados diretamente
    fetch('/livros')
        // Quando a resposta chegar, converta em JSON
        .then(response => response.json())
        // Agora temos um array de livros, vamos trabalhar com ele
        .then(data => {
            // Selecione o elemento HTML com id 'livros'
            const livros = document.querySelector('#livros');

            // Verificamos se há algum livro no array
            if (data.length > 0) {
                // Percorremos o array de livros e criamos um elemento HTML para cada um
                data.forEach(livro => {
                    // Criamos um elemento 'div' para cada livro
                    const card = document.createElement('div');
                    // Adicionamos uma classe para estilizar esse elemento
                    card.classList.add('col-4');
                    // Criamos o HTML para o card de cada livro
                    card.innerHTML = `
                    <div class="card">
                        <img src=${livro.imagem} class="card-img-top" alt=${livro.nome}>
                        <div class="card-body">
                            <h5 class="card-title">${livro.nome}</h5>
                            <p class="card-text">${livro.sinopse}</p>
                        </div>
                        <a href="/livro?id=${livro.id}" class="btn btn-primary">Detalhes</a>
                        <br>
                        <button class="btn btn-danger" onclick="deletarLivro(${livro.id})">Deletar</button>
                    </div>
                    <br>
                `;
                    // Adicionamos esse card ao elemento HTML com id 'livros'
                    livros.appendChild(card);
                });
            } else {
                // Se não há livros, mostramos uma mensagem de "Nenhum livro encontrado."
                livros.innerHTML = `<h2>Nenhum livro encontrado.</h2>`;
            }
        });
});

function deletarLivro(id) {
    fetch(`/livro/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        });
}