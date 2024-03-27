console.log("home.js carregado ocm sucesso");


document.addEventListener("DOMContentLoaded", () => {
    fetch('/livros')
    .then(response => response.json())
    .then(data => {
        const livros = document.querySelector('#livros');
        if (data.length > 0) {
            data.forEach(livro => {
                const card = document.createElement('div');
                card.classList.add('col-4');
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
                `;
                livros.appendChild(card);
            });
        } else {
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