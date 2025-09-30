function getDataFromUrlTemplate(poke) {
    return `
        <div class="cards" data-id="${poke.id}" id="cards">
            <div class="header">
              <span class="pokemon_id"># ${poke.id}</span>
              <h3 class="pokemon_name">${poke.name}</h3>
            </div>
            <div class="pokemon_img bg_${poke.types[0].type.name}">
              <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}"/></div> 

            <div class="pokemon_type">
            <span class="symbol_type">${poke.types[0].type.name}</span> <span class="symbol_type">${poke.types[1] !==undefined? poke.types[1].type.name: ""}</span>
              
            </div>
            
          </div>
           
    `;
}

// const move1 = poke.moves && poke.moves[0] && poke.moves[0].move ? poke.moves[0].move.name : "N/A";
// const move2 = poke.moves && poke.moves[1] && poke.moves[1].move ? poke.moves[1].move.name : "N/A";

function getDataForOverlayTemplate(data) {
    return `
  <div
            class="overlay"
            id="overlay" onclick="stopPropagationFurthur('overlay')"
          >
            <div class="overlay_header" id="overlay_header" onclick="stopPropagationFurthur('overlay')">
              <span class="overlay_header_id"># ${data.id}</span>
              <h3 class="overlay_header_name">${data.name}</h3>
            </div>
            <div class="poke_img">
              <a href="#" class="arrow left-arrow"  onclick="stopPropagationFurthur('overlay')">
                  <img src="assets/icons/chevron_left.svg" alt="" id="leftArrow" onclick="navigationFunctions('left')"/>
              </a>
            <div class="overlay_img bg_${data.types[0].type.name}" id="overlay_img" onclick="stopPropagationFurthur('overlay')">
              <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}" />
              </div>
                <a href="#" class="arrow right-arrow"  onclick="stopPropagationFurthur('overlay')">
                    <img src="assets/icons/chevron_right.svg" alt="" id="rightArrow" onclick="navigationFunctions('right')"/>
                </a>
            </div>
            <div class="overlay_navbar" id="overlay_navbar" onclick="stopPropagationFurthur('overlay')">
              <a
                class="overlay_list"
                id="main_list"
                onclick="toggleNoneDisplayNavbar('gens_container', 'stats_container', 'main_container', 'main_list','stats_list','Evo_list')"
              >
                Main
              </a>
              <a
                class="overlay_list"
                id="stats_list"
                onclick="toggleNoneDisplayNavbar('main_container', 'gens_container', 'stats_container','stats_list','main_list','Evo_list')"
              >
                Stats
              </a>
              <a
                class="overlay_list"
                id="Evo_list"
                onclick="toggleNoneDisplayNavbar('main_container', 'stats_container', 'gens_container','Evo_list','main_list','stats_list')"
              >
                Evo
              </a>
            </div>
            <div class="overlay_navbar_container" id="main_container">
              <h4>HEIGHT = ${(data.height) / 10} m</h4>
              <h4>WEIGHT = ${(data.weight) / 10} kg</h4>
              <h4>BASE-EXPERIENCE = ${data.base_experience}</h4>
              <h4>ABILITIES = ${data.abilities.map((ability) => ability.ability.name).join(' , ')} </h4>
            </div>
            <div class="overlay_navbar_container stats_container d-none" id="stats_container"> 
            <div class="stats">
            <h4>HP</h4>
            <progress value="${data.stats[0].base_stat}" max="100" class="progress-bar"></progress>
            </div>
            <div class="stats">
            <h4>ATTACK</h4>
            <progress value="${data.stats[1].base_stat}" max="100" class="progress-bar"></progress>
            </div>
            <div class="stats">
            <h4>DEFENCE</h4>
            <progress value="${data.stats[2].base_stat}" max="100" class="progress-bar"></progress>
            </div>
            <div class="stats">
            <h4>SP-ATTACK</h4>
            <progress value="${data.stats[3].base_stat}" max="100" class="progress-bar"></progress>
            </div>
            <div class="stats">
            <h4>SP-DEFENCE</h4>
            <progress value="${data.stats[4].base_stat}" max="100" class="progress-bar"></progress>
            </div>
            <div class="stats">
            <h4>SPEED</h4>
            <progress value="${data.stats[5].base_stat}" max="100" class="progress-bar"></progress>
            </div>
              
            </div>
            <div class="overlay_navbar_container generation d-none" id="gens_container">
              <div class="gen_container"><img src="${data.sprites.versions["generation-i"]["red-blue"].front_default}" alt="generation-i" class="genImg" /> <h4>generation- i</h4> </div>
              <div class="gen_container"><img src="${data.sprites.versions["generation-ii"]["gold"].front_default}" alt="generation-ii" class="genImg" /> <h4>generation- ii</h4></div>
              
            </div>
  </div>`;
}