document.addEventListener("DOMContentLoaded", () => {
    // Aguarda até que o DOM tenha sido carregado antes de executar o código abaixo.

    const procurar = document.getElementById("procurar");
    const planeta = document.getElementById("planeta");
    const informacoes = document.getElementById("informacoes");

    // Obtém referências para elementos HTML relevantes.

    procurar.addEventListener("click", () => {
        // Define um ouvinte de evento para o botão de busca.

        const nomePlaneta = planeta.value.trim();
        // Obtém o valor do campo de entrada e remove espaços em branco desnecessários.

        if (nomePlaneta !== "") {
            // Verifica se o nome do planeta não está vazio.

            fetch(`https://swapi.dev/api/planets/?search=${nomePlaneta}`)
                .then(response => response.json())
                // Faz uma solicitação à API SWAPI para buscar informações sobre planetas e a transforma em JSON.

                .then(data => {
                    // Manipula os dados obtidos da API.

                    if (data.count > 0) {
                        // Verifica se há planetas correspondentes.

                        const planet = data.results[0];
                        // Pega o primeiro planeta correspondente da lista.

                        const planetaHtml = `
                            <h2>${planet.name}</h2>
                            <p>Climate: ${planet.climate}</p>
                            <p>Terrain: ${planet.terrain}</p>
                            <p>Population: ${planet.population}</p>
                        `;
                        // Cria uma string formatada contendo as informações do planeta.

                        const filmesUrls = planet.films;
                        // Obtém os URLs dos filmes associados ao planeta.

                        if (filmesUrls.length > 0) {
                            // Verifica se há filmes associados.

                            Promise.all(filmesUrls.map(url => fetch(url)))
                                .then(responses => Promise.all(responses.map(response => response.json())))
                                // Faz múltiplas solicitações para os URLs dos filmes e as transforma em JSON.

                                .then(filmes => {
                                    // Manipula os objetos de filmes obtidos.

                                    const filmesHtml = filmes.map(filme => `<p>${filme.title}</p>`).join("");
                                    // Cria uma string contendo os títulos dos filmes.

                                    informacoes.innerHTML = planetaHtml + `<h3>Films:${filmesHtml}</h3>`;
                                    // Atualiza o conteúdo da seção de informações com os detalhes do planeta e a lista de filmes.
                                });
                        } else {
                            informacoes.innerHTML = planetaHtml + "<h3>No movies found for this planet.</h3>";
                            // Caso não haja filmes associados, exibe uma mensagem apropriada.
                        }
                    } else {
                        informacoes.innerHTML = "<h2>Planet not found.</h2>";
                        // Caso nenhum planeta correspondente seja encontrado, exibe uma mensagem.
                    }
                });
        }
    });
});
