function getDataFromUrlTemplate(elem) {
    return `
        <div class="cards">
            <div class="header">
              <span class="pokemon_id"># ${elem.id}</span>
              <h3 class="pokemon_name">${elem.name}</h3>
            </div>
            <div class="pokemon_img">
              <img src="${elem.sprites.other.home.front_default}" alt="" />
            </div>

            <div class="pokemon_type">
              <button class="symbol_type">${elem.types[0].type.name}</button>
              
            </div>
          </div>  
    `;
}