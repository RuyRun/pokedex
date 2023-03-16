let load = 20;
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
        genallPokemons(pokemon);
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
    let pokemonData = await fetchPokemon(url);
    console.log(pokemonData);
}