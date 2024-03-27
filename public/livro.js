document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch('/api/livro?id=' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação. Status: ' + response.status);
            }
            return response.json();
        })
        .then(livro => {
            const livrodiv = document.querySelector('#livro');
            const card = document.createElement('div');
            card.innerHTML = `
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src=${livro.imagem} class="card-img col-4" alt=${livro.nome}>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h2 class="card-title">${livro.nome}</h2>
                                    <br>
                                    <h4 class="card-title">${livro.autor}</h4>
                                    <h5 class="card-title">${livro.genero}</h5>
                                    <br>
                                    <p class="card-text">${livro.sinopse}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                `;
            livrodiv.appendChild(card);
        })
        .catch(error => {
            const livrodiv = document.querySelector('#livro');
            const card = document.createElement('h2');
            card.innerHTML = `Livro Não encontrado.`;
            livrodiv.appendChild(card);
        });
});