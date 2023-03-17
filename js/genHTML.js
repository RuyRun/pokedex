function genallPokemons(pokemon) {
    document.getElementById('content').innerHTML += /*html */ `
        <div class="card ${pokemon['types'][0]['type']['name']}" style="width: 18rem;" onclick="showModal()" > 
            <img src="${pokemon['sprites']['other']['official-artwork']['front_default']}" class="card-img-top" alt="...">
            <div class="card-body">
              <div class="pokemon-name">
                <h5 class="card-title">${pokemon['name']}</h5>
              </div>
            </div>
          </div>
    
    
    `;
}

//data-bs-toggle="modal" data-bs-target="#pokeModal"