let currentPokemonData;


function genallPokemons(id,pokemon) {
    document.getElementById(`${id}`).innerHTML += /*html */ `
        <div class="card ${pokemon['types'][0]['type']['name']}" style="width: 18rem;" onclick="showCard(${pokemon['id']})" > 
            <img src="${pokemon['sprites']['other']['official-artwork']['front_default']}" class="card-img-top" alt="...">
            <div class="card-body">
              <div class="pokemon-name">
                <h5 class="card-title">${pokemon['name']}</h5>
              </div>
            </div>
          </div>
    `;
}

function genTypesOfPokemon() {
    let allTypes = '';
    let types = currentPokemonData['types'];

    for (let i = 0; i < types.length; i++) {
        const element = types[i];
        allTypes += `<p class="type col-5">${element['type']['name']}</p>`
    }
    return allTypes;
}

function genModal() {
    document.getElementById('pokeModal').innerHTML = '';
    document.getElementById('pokeModal').innerHTML = /*html */`
    <div class="modal-dialog">
    <div class="modal-content ${currentPokemonData['types'][0]['type']['name']}">
        <div class="modal-header">
            <h1 class="modal-title fs-5 text-center">${currentPokemonData['name']}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8 card-img"> 
                        <img src="${currentPokemonData['sprites']['other']['official-artwork']['front_default']}">
                    </div>
                    <div class="col-md-4 typeOfPokemon">
                        <div class="row" id="types">
                            ${genTypesOfPokemon()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="nav">
                <i class="bi bi-arrow-bar-left" onclick="previos(${currentPokemonData['id']})"></i>
                <p class="nav-item" onclick="genAbout()">About</p>
                <p class="nav-item active" onclick="genBase()">Base Stats</p>
                <p class="nav-item" onclick="genMoves()">Moves</p>
                <i class="bi bi-arrow-bar-right" onclick="next(${currentPokemonData['id']})"></i>
            </div>
            <div class="modal-nav-content" id="navContent">
            </div>
        </div>
    </div>
</div>`;
    genBase();
}

async function previos(id) {
    let number = 1;
    if (id == '1') {
        number = load;
    } else {
        number = id - 1;
    }
    loadNextPokemon(number);
}

async function next(id) {
    let number;
    if (id == load) {
        number = id - load + 1;
    } else {
        number = id + 1;
    }
    loadNextPokemon(number);
}

async function loadNextPokemon(number) {
    let url = `https://pokeapi.co/api/v2/pokemon/${number}`
    currentPokemonData = await fetchPokemon(url);
    genModal();
}

function genBase() {
    setActivToNav();
    document.getElementById('navContent').innerHTML = '';
    let stats = currentPokemonData['stats'];
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        document.getElementById('navContent').innerHTML += `<div class="base">
            <div class="bar">
                <p>${stat['stat']['name']}</p>
                <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ${stat['base_stat']}%">${stat['base_stat']}</div>
                </div>
            </div>
        </div>`;
    }
}

function genMoves() {
    let moves = currentPokemonData['moves'];
    setActivToNav();
    document.getElementById('navContent').innerHTML = '';
    document.getElementById('navContent').innerHTML = '<div class="moves row" id="moveContent"></div>';
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i]['move'];
        document.getElementById('moveContent').innerHTML += `<p class="col-auto move">${move['name']}</p>`;
    }
}

function genAbout() {
    setActivToNav();
    let abilities = currentPokemonData['abilities']
    document.getElementById('navContent').innerHTML = '';
    document.getElementById('navContent').innerHTML = /*html */`
        <div class="about">
            <table class="table">
                <tbody id="aboutContent">
                    <tr>
                        <th scope="row">Height</th>
                        <td>${currentPokemonData['height']}</td>
                    </tr>
                    <tr>
                        <th scope="row">Weight</th>
                        <td>${currentPokemonData['weight']}</td>
                    </tr>
                    </tbody>
                </table>
        </div>`
    setAbilities(abilities);
}

function setAbilities(abilities) {
    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i]['ability']['name'];
        document.getElementById('aboutContent').innerHTML += `<th scope="row">Ability ${i + 1}</th>
        <td>${ability}</td>`
    }
}

function setActivToNav() {
    document.querySelectorAll(".nav-item").forEach((ele) =>
        ele.addEventListener("click", function (event) {
            event.preventDefault();
            document
                .querySelectorAll(".nav-item")
                .forEach((ele) => ele.classList.remove("active"));
            this.classList.add("active")
        })
    );
}