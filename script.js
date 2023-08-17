//aguarda até que o DOM tenha sido carregado antes de executar o código abaixo
document.addEventListener("DOMContentLoaded", () => {

    //referencia os elementos HTML
    const procurar = document.getElementById("procurar");
    const planeta = document.getElementById("planeta");
    const informacoes = document.getElementById("informacoes");

    //define um ouvinte de evento para o botão de busca
    procurar.addEventListener("click", () => {

        //armazena o planeta inserido pelo usuário na variável nomePlaneta
        const nomePlaneta = planeta.value;

        //verifica se o nome do planeta não está vazio
        if (nomePlaneta !== "") {
    
            //faz uma solicitação à API SWAPI para as buscar informações sobre os planetas e as transforma em JSON
            fetch(`https://swapi.dev/api/planets/?search=${nomePlaneta}`)
                .then(response => response.json())

                //manipula os dados obtidos da API
                .then(data => {

                    //verifica se existem planetas correspondentes
                    if (data.count > 0) {

                        //pega o primeiro planeta correspondente da lista
                        const planet = data.results[0];

                        //cria uma string formatada contendo as informações do planeta
                        const planetaHtml = `
                            <h2>${planet.name}</h2>
                            <p>Climate: ${planet.climate}</p>
                            <p>Terrain: ${planet.terrain}</p>
                            <p>Population: ${planet.population}</p>
                        `;

                        //obtém os URLs dos filmes associados ao planeta
                        const filmesUrls = planet.films;

                        //verifica se existem filmes associados
                        if (filmesUrls.length > 0) {

                            //faz solicitações para os URLs dos filmes e as transforma em JSON
                            Promise.all(filmesUrls.map(url => fetch(url)))
                                .then(responses => Promise.all(responses.map(response => response.json())))

                                //manipula os objetos de filmes obtidos
                                .then(filmes => {

                                    //cria uma string contendo os títulos dos filmes
                                    const filmesHtml = filmes.map(filme => `<p>${filme.title}</p>`).join("");

                                    //atualiza o conteúdo da seção de informações com os detalhes do planeta e a lista de filmes
                                    informacoes.innerHTML = planetaHtml + `<h3>Films:${filmesHtml}</h3>`;
                                });

                        } else {

                            //caso não haja filmes associados, exibe uma mensagem
                            informacoes.innerHTML = planetaHtml + "<h3>No movies found for this planet.</h3>";
                        }
                    } else {

                        //caso nenhum planeta correspondente seja encontrado, exibe uma mensagem.
                        informacoes.innerHTML = "<h2>Planet not found.</h2>";
                    }
                });
        }
    });
});
