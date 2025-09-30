const formEl = document.querySelector('.search');
const inputEl = document.getElementById('search-input');
const cardsContainerEl = document.querySelector('.cards_container');
const cardsEl = document.querySelector('cards');
const pokedexEl = document.getElementById('logo_container');
const overlayEl = document.querySelector('.card_overlay');
const searchBtn = document.querySelector('.searchBtn');
const bodyEl = document.getElementById('body');

const fetchedUrls = [];
const showMoreBtn = document.getElementById('show_more');
let currentItem = 20;
let inputData = "";
let currentPokemonId;


// load more function:
showMoreBtn.addEventListener('click', () => {
    let cards = [...document.querySelectorAll('.main .cards_container .cards')];
    for (let i = currentItem; i < currentItem + 20; i++) {
        cards[i].style.display = "flex";
    }
    currentItem += 20;
    if (currentItem >= cards.length) {
        showMoreBtn.style.display = "none";
    }
})

// Event Listeners:
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    cardsContainerEl.innerHTML = "";
    inputData = inputEl.value.toLowerCase();
    let filteredPokemons;
    if (inputData.length >= 3) {
        filteredPokemons = fetchedUrls.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(inputData);
        });
    }
    if (filteredPokemons.length > 0) {
        cardsContainerEl.innerHTML = "";
        filteredPokemons.forEach(pokemon => {
            cardsContainerEl.innerHTML += getDataFromUrlTemplate(pokemon);
            imgLooping();
        });
        showMoreBtn.style.display = "none";
    } else {
        cardsContainerEl.innerHTML = `<h2>Oops! Pokemon not Found</h2>`;
        errorHandling();
        return;
    }
    cardsContainerEl.classList.remove('fetchFailed');
    inputEl.value = "";
})


const imgLooping = () => {
    const cardImgEl = document.querySelectorAll('.pokemon_img');
    cardImgEl.forEach(img => {
        img.addEventListener("click", (e) => {
            popupOverlayDetails(e);
        });
    });
}

pokedexEl.addEventListener('click', () => {
    fetchPokemons();
})

//fetch urls on page load:
const fetchPokemons = async() => {
    try {
        cardsContainerEl.innerHTML = `<h2>rendering fetched Data ... please wait</h2>`;
        showMoreBtn.style.display = "none";
        for (let i = 1; i <= 160; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const responseToJson = await response.json();
            fetchedUrls.push(responseToJson);
        }
        cardsContainerEl.classList.remove('fetchFailed');
        console.log(fetchedUrls);
        renderCardData();
    } catch (error) {
        cardsContainerEl.innerHTML = `<h2> Oops! Error by fetching Urls ...</h2>`;
    }
}

// render pokemon data:
const renderCardData = async() => {
    cardsContainerEl.innerHTML = "";
    fetchedUrls.map((poke) => {
        cardsContainerEl.classList.remove('fetchFailed');
        cardsContainerEl.innerHTML += getDataFromUrlTemplate(poke);
    })
    showMoreBtn.style.display = "block";
    imgLooping();
}


//overlay Function:
const popupOverlayDetails = async(e) => {
    e.preventDefault();
    try {
        let cardItem = e.target.closest('.cards');
        const cardId = cardItem ? cardItem.dataset.id : null;
        // console.log("Card ID:", cardId);
        if (cardId) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${cardId}`);
            const data = await response.json();
            cardsContainerEl.classList.remove('fetchFailed');
            renderOverlayCards(data);
        } else {
            cardsContainerEl.innerHTML = `<h2>Oops! Pokemon not Found</h2>`;
            cardsContainerEl.classList.add('fetchFailed');
        }
    } catch (error) {
        cardsContainerEl.innerHTML = `oops, Error by fetching Pokemon :(`;
        errorHandling();
    }
}

async function navigationFunctions(direction) {
    if (direction === "left" && currentPokemonId > 1) {
        currentPokemonId--;
        await repeatedFetch(currentPokemonId);
    }
    if (direction === "right" && currentPokemonId < 160) {
        currentPokemonId++;
        await repeatedFetch(currentPokemonId);
    }
}

async function repeatedFetch(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    cardsContainerEl.classList.remove('fetchFailed');
    renderOverlayCards(data);
}

function renderOverlayCards(data) {
    currentPokemonId = data.id;
    cardsContainerEl.classList.remove('fetchFailed');
    overlayEl.innerHTML = getDataForOverlayTemplate(data);
    document.getElementById('card_overlay').classList.remove('d-none');
    bodyEl.classList.add('no-scroll');
}

//buttons Event Listeners:
const leftArrowbBtn = document.getElementById('leftArrow');
if (leftArrowbBtn) {
    leftArrowbBtn.addEventListener("click", () => {
        if (currentPokemonId > 1) {
            navigationFunctions("left");
        }
    });
}

const rightArrowBtn = document.getElementById('rightArrow');
if (rightArrowBtn) {
    rightArrowBtn.addEventListener("click", () => {
        if (currentPokemonId < 160) {
            navigationFunctions("right");
        }
    });
}

window.history.pushState({}, "", `./index.html?id=${currentPokemonId}`);

function toggleNoneDisplayNavbar(id1, id2, id3, id4, id5, id6) {
    document.getElementById(id1).style.display = "none";
    document.getElementById(id2).style.display = "none";
    document.getElementById(id3).style.display = "block";
    document.getElementById(id3).style.backgroundColor = "#ed9b1fff";
    document.getElementById(id4).style.backgroundColor = "#ed9b1fff";
    document.getElementById(id5).style.backgroundColor = "#ffebcd";
    document.getElementById(id6).style.backgroundColor = "#ffebcd";
}


function overlayDisplayAdd(elementId) {
    document.getElementById('card_overlay').classList.add('d-none');
    bodyEl.classList.remove('no-scroll');
    stopPropagationFurthur(elementId);
}

function stopPropagationFurthur(elementId) {
    document.getElementById(elementId).addEventListener("click", (event) => {
        event.stopPropagation();
    })
}

function errorHandling() {
    cardsContainerEl.classList.add('fetchFailed');
    showMoreBtn.style.display = "none";
}