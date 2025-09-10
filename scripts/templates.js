function getDataFromUrlTemplate(i) {
    return `
        <div class="cards">
            <div class="header">
              <span class="pokemon_id"># ${urlIntoObject[i].id}</span>
              <h3 class="pokemon_name">${urlIntoObject[i].name}</h3>
            </div>
            <div class="pokemon_img">
              <img src="${urlIntoObject[i].sprites.other.home.front_default}" alt="${urlIntoObject[i].name}" />
            </div>

            <div class="pokemon_type">
              <button class="symbol_type">${urlIntoObject[i].types[0].type.name}</button>
            </div>
          </div>  
    `;
}

// function getDataForOverlayTemplate(query) {
//     return `
//   <div
//             class="overlay"
//             id="overlay"
//             onclick="stopPropagationFurthur('overlay')"
//           >
//             <div class="overlay_header">
//               <span class="overlay_header_id"># ${query.id}</span>
//               <h3 class="overlay_header_name">${query.name}</h3>
//             </div>
//             <div class="overlay_img">
//               <img src="${query.sprites.other.home.front_default}" alt="${query.name}" />
//             </div>
//             <div class="overlay_navbar">
//               <a
//                 class="overlay_list"
//                 id="main_list"
//                 onclick="toggleNoneDisplayNavbar('moves_container', 'stats_container', 'main_container', 'main_list','stats_list','moves_list')"
//               >
//                 Main
//               </a>
//               <a
//                 class="overlay_list"
//                 id="stats_list"
//                 onclick="toggleNoneDisplayNavbar('main_container', 'moves_container', 'stats_container','stats_list','main_list','moves_list')"
//               >
//                 Stats
//               </a>
//               <a
//                 class="overlay_list"
//                 id="moves_list"
//                 onclick="toggleNoneDisplayNavbar('main_container', 'stats_container', 'moves_container','moves_list','main_list','stats_list')"
//               >
//                 Moves
//               </a>
//             </div>
//             <div class="overlay_navbar_container" id="main_container">
//               <h4>HEIGHT = ${query.height}</h4>
//               <h4>WEIGHT = ${query.weight}</h4>
//               <h4>BASE-EXPERIENCE = ${query.base_experience}</h4>
//               <h4>ABILITIES = ${query.abilities[0].ability.name} // ${query.abilities[1].ability.name} </h4>
//             </div>
//             <div class="overlay_navbar_container d-none" id="stats_container">
//               <h4>HP = ${query.stats[0].base_stat}/100</h4>
//               <h4>ATTACK = ${query.stats[1].base_stat}/100</h4>
//               <h4>DEFENCE = ${query.stats[2].base_stat}/100</h4>
//               <h4>SP-ATTACK = ${query.stats[3].base_stat}/100</h4>
//               <h4>SP-ADEFENCE = ${query.stats[4].base_stat}/100</h4>
//               <h4>SPEED = ${query.stats[5].base_stat}/100</h4>
//             </div>
//             <div class="overlay_navbar_container d-none" id="moves_container">
//               <button>${query.moves[0].move.name}</button>
//               <button>${query.moves[1].move.name}</button>
//               <button>${query.moves[2].move.name}</button>
//               <button>${query.moves[3].move.name}</button>
//               <button>${query.moves[4].move.name}</button>
//               <button>${query.moves[5].move.name}</button>
//               <button>${query.moves[6].move.name}</button>
//               <button>${query.moves[7].move.name}</button>
//               <button>${query.moves[8].move.name}</button>
//             </div>
//           </div>
//   `
// }