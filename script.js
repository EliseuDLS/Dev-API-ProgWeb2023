document.addEventListener("DOMContentLoaded", () => {

    const planetImages = {
        "Tatooine": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/DesertPlanet.jpg/200px-DesertPlanet.jpg",
        "Alderaan": "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Alderaan250ppx.PNG/220px-Alderaan250ppx.PNG",
        "Corellia": "https://jkhub.org/wiki/images/b/b8/Corellia.png",
        "Hoth":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ice_planet.png/280px-Ice_planet.png",
        "Kashyyyk":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Populated_Planet.png/200px-Populated_Planet.png",
        "Naboo":"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/SHplanet.jpg/280px-SHplanet.jpg",
        "Coruscant":"https://rpgstarwarschronicles.weebly.com/uploads/1/6/0/7/16070134/720223826.jpg",
        "Geonosis":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/300px-Saturn_during_Equinox.jpg",
        "Mustafar":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lava_planet.png/200px-Lava_planet.png",
        "Endor":"https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/PlanetEndor.jpg/220px-PlanetEndor.jpg",
        "Dagobah":"https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Dagobah.jpg/220px-Dagobah.jpg",
        "Ryloth":"https://media.moddb.com/cache/images/mods/1/25/24054/thumb_620x2000/AloViewer_2020-05-24_20-22-38-588.png",
        "Utapau":"https://scifi3d.com/wp-content/uploads/2021/09/2598_lge_utapau-planet.jpg",
        "Yavin IV":"https://www.giantbomb.com/a/uploads/scale_small/4/41342/1087577-starwars_article_sw20040812yavin4_pic1_en.jpg",
        "Rodia":"https://i.pinimg.com/originals/09/b6/f7/09b6f7f9ff159aa2f0405ef5667c18e7.jpg"
    };

    const procurar = document.getElementById("procurar");
    const planeta = document.getElementById("planeta");
    const informacoes = document.getElementById("informacoes");
    const imagemPlaneta = document.getElementById("imagemPlaneta");

    procurar.addEventListener("click", () => {
        const nomePlaneta = planeta.value;
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
                            <p>Diameter: ${planet.diameter} Km</p>
                            <p>Population: ${planet.population} habitants</p>
                            <p>Rotation Period: ${planet.rotation_period} hours</p>
                        `;
                        const filmesUrls = planet.films;
                        if (filmesUrls.length > 0) {
                            Promise.all(filmesUrls.map(url => fetch(url)))
                                .then(responses => Promise.all(responses.map(response => response.json())))
                                .then(filmes => {
                                    const filmesHtml = filmes.map(filme => `<p>${filme.title}</p>`).join("");
                                    informacoes.innerHTML = planetaHtml + `<h3>Films:${filmesHtml}</h3>`;
                                });
                        } else {
                            informacoes.innerHTML = planetaHtml + "<h3>No movies found for this planet.</h3>";
                        }

                        if (planetImages[planet.name]) {
                            const imageUrl = planetImages[planet.name];
                            imagemPlaneta.innerHTML = `<img src="${imageUrl}" alt="${planet.name}">`;
                        } else {
                            imagemPlaneta.innerHTML = ""; 
                        }
                    } else {
                        informacoes.innerHTML = "<h3>Planet not found.</h3>";
                        imagemPlaneta.innerHTML = ""; 
                    }
                });
        }
    });
});
