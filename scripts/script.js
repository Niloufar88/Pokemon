let showMoreBtn = document.getElementById('show_more');
let currentItem = 5;



async function onLoad() {
    await getUrlDataFromApi();
}

async function getUrlDataFromApi() {
    const response = await fetch(baseUrl);
    const responseToJson = await response.json();

    for (let index = 0; index < responseToJson.results.length; index++) {
        urlElement.push(responseToJson.results[index].url);
    }
    fetchAllUrls();
}


async function fetchAllUrls() {
    const response = await Promise.all(urlElement.map(url => fetch(url)));
    const responseToJson = await Promise.all(response.map(res => res.json()));
    console.log(responseToJson);

    for (let urlIndex = 0; urlIndex < responseToJson.length; urlIndex++) {
        urlIntoObject.push(responseToJson[urlIndex]);
        idEl.push(urlIntoObject[urlIndex].id);
        pokeNames.push(urlIntoObject[urlIndex].name);
        pokemonCardImg.push(urlIntoObject[urlIndex].sprites.other.home.front_default);
        pokeType.push(urlIntoObject[urlIndex].types[0].type.name);
        pokeAbilitiesEl.push(urlIntoObject[urlIndex].abilities);
    }
    console.log(pokeType);
    console.log(idEl);
    renderCardData();
}

async function renderCardData() {
    cardsContainerEl.innerHTML = "";
    for (let i = 0; i < urlIntoObject.length; i++) {
        cardsContainerEl.innerHTML += getDataFromUrlTemplate(i);
    }
}

showMoreBtn.addEventListener('click', () => {
    let cards = [...document.querySelectorAll('.main .cards_container .cards')];
    for (let i = currentItem; i < currentItem + 5; i++) {
        cards[i].style.display = "flex";
    }
    currentItem += 5;
    if (currentItem >= cards.length) {
        showMoreBtn.innerHTML = `Show Less!`;
    }
})

function toggleNoneDisplayNavbar(id1, id2, id3, id4, id5, id6) {
    document.getElementById(id1).style.display = "none";
    document.getElementById(id2).style.display = "none";
    document.getElementById(id3).style.display = "block";
    document.getElementById(id3).style.backgroundColor = "#6c9f9fff";
    document.getElementById(id4).style.backgroundColor = "#6c9f9fff";
    document.getElementById(id5).style.backgroundColor = "#ffebcd";
    document.getElementById(id6).style.backgroundColor = "#ffebcd";
}

// function overlayDisplayAdd(elementId) {
//     document.getElementById('card_overlay').classList.add('d-none');
//     stopPropagationFurthur(elementId);
// }

// function overlayDisplayRemove(elementId) {
//     document.getElementById('card_overlay').classList.remove('d-none');
//     stopPropagationFurthur(elementId);
// }

// function stopPropagationFurthur(elementId) {
//     document.getElementById(elementId).addEventListener("click", (event) => {
//         event.stopPropagation();
//     })
// }




// async function getOverlayData() {
//     const response = await Promise.all(urlElement.map(url => fetch(url)));
//     const responseToJson = await Promise.all(response.map(res => res.json()));
//     // console.log(responseToJson);
//     responseToJson.forEach((query) => {
//         overlayEl.innerHTML += getDataForOverlayTemplate(query);;
//     })
// }