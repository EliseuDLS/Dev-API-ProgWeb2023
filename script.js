document.addEventListener("DOMContentLoaded", () => {
    const procurar = document.getElementById("procurar");
    const planeta = document.getElementById("planeta");
    const informacoes = document.getElementById("informacoes");

    procurar.addEventListener("click", () => {
        const nomePlaneta = planeta.value.trim();
        if (nomePlaneta !== "") {
            fetch(`https://swapi.dev/api/planets/?search=${nomePlaneta}`)
                .then(response => response.json())
                .then(data => {
                    if (data.count > 0) {
                        const planet = data.results[0];
                        const planetaHtml = `
                            <h2>${planet.name}</h2>
                            <p>Climate: ${planet.climate}</p>
                            <p>Terrain: ${planet.terrain}</p>
                            <p>Population: ${planet.population}</p>
                        `;
                        informacoes.innerHTML = planetaHtml;
                    } else {
                        informacoes.innerHTML = "<p>Planet not found.</p>";
                    }
                })
        }
    });
});
