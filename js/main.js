let load = 10;
let currentPokemon = 0;
let allPomemons;

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
    let respJSON = await fetchPokemon(url)
    allPomemons = respJSON['results'];
    loadContent();
}

async function fetchPokemon(url) {
    let resp = await fetch(url);
    let respJSON = await resp.json();
    return respJSON;
}

async function loadContent() {
    for (let i = currentPokemon; i < load; i++) {
        currentPokemon++
        let url = allPomemons[i]['url'];
        let pokemon = await fetchPokemon(url);
        genallPokemons('content', pokemon);
    }
}

function loadMore() {
    load = load + 20;
    loadContent();
}

function pokeIndexNr(i) {
    let str = i.toString();
    while (str.length < 4) str = "0" + str;
    return str;
}

async function showCard(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    currentPokemonData = await fetchPokemon(url);
    genModal();
    showModal();
}

function showModal() {
    let myModal = new bootstrap.Modal(document.getElementById('pokeModal'), {});
    myModal.show();
}

function searchPokemon() {
    let searchInput = document.getElementById('search').value;
    searchInput = searchInput.toLowerCase();
    checkIfDesiccated(searchInput);
}

async function checkIfDesiccated(inputText) {
    if (inputText.length > 1) {
        showSearchContainer();
        document.getElementById('searchContainer').innerHTML = '';
        for (let i = 0; i < allPomemons.length; i++) {
            const pokemon = allPomemons[i];
            let pokemonName = pokemon['name'];
            if (pokemonName.includes(inputText)) {
                let data = await fetchPokemon(pokemon['url']);
                genallPokemons('searchContainer', data);
            }
        }
    } else if (inputText.length == 0) {
        removeSearchContainer();
    }
}

function showSearchContainer() {
    document.getElementById('content').classList.add('d-none');
    document.getElementById('searchContainer').classList.remove('d-none');
    document.getElementById('loadMoreBtn').classList.add('d-none');
}

function removeSearchContainer() {
    document.getElementById('content').classList.remove('d-none');
    document.getElementById('searchContainer').classList.add('d-none');
    document.getElementById('loadMoreBtn').classList.remove('d-none');
}