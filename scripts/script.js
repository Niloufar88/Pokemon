const inputEl = document.getElementById('search-input');
const cardsContainerEl = document.querySelector('.cards_container');
const cardsEl = document.querySelector('cards');
const overlayEl = document.querySelector('.card_overlay');
const searchBtn = document.querySelector('.searchBtn');
const bodyEl = document.getElementById('body');
const fetchMorePokemonsArray = [];
const fetchedUrls = [];
const showMoreBtn = document.getElementById('show_more');
const leftArrowConatiner = document.getElementById('leftArrowContainer');
const rightArrowContainer = document.getElementById('rightArrowContainer');
let currentItem = 20;
let inputData = "";
let currentPokemonId;
let cards = [...document.querySelectorAll('.main .cards_container .cards')];


// load more function:
async function loadMorePokemons() {
    if (currentItem + 20 > cards.length) {
        for (let i = cards.length + 1; i <= currentItem + 20; i++) {
            await fetchMorePokemons(i);
        }
        await renderNewFetchedPokemons();
        for (let i = currentItem; i < currentItem + 20 && i < cards.length; i++) {
            cards[i].style.display = "flex";
        }
    }
    showMoreBtn.disabled = true;
    currentItem += 20;
    if (currentItem >= 1025) {
        showMoreBtn.style.display = "none";
    }
    showMoreBtn.disabled = false;
}

// search function:
function searchPokemon() {
    inputData = inputEl.value.toLowerCase();
    let filteredPokemons = [];
    if (inputData.length >= 3) {
        filteredPokemons = fetchedUrls.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(inputData)
        );
        cardsContainerEl.innerHTML = "";
        if (filteredPokemons.length > 0) {
            filteredPokemons.forEach(pokemon => {
                cardsContainerEl.innerHTML += getDataFromUrlTemplate(pokemon);
            });
            imgLooping();
            showMoreBtn.style.display = "none";
            cardsContainerEl.classList.remove('fetchFailed');
        } else {
            cardsContainerEl.innerHTML = `<h2>Oops! Pokemon <strong style="color:red;">${inputData}</strong> not Found</h2>`;
            errorHandling();
        }
    } else if (inputData.length === 0) {
        cardsContainerEl.innerHTML = "";
        showMoreBtn.style.display = "none";
        renderCardData();
        showMoreBtn.style.display = "block";
        cardsContainerEl.classList.remove('fetchFailed');
    }
}

function imgLooping() {
    const cardImgEl = document.querySelectorAll('.pokemon_img');
    cardImgEl.forEach(img => {
        img.addEventListener("click", (e) => {
            popupOverlayDetails(e);
        });
    });
}

//fetch urls on page load:
async function fetchPokemons() {
    try {
        showMoreBtn.style.display = "none";
        for (let i = 1; i <= 20; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const responseToJson = await response.json();
            fetchedUrls.push(responseToJson);
        }
        cardsContainerEl.classList.remove('fetchFailed');
        renderCardData();
    } catch (error) {
        cardsContainerEl.innerHTML = `<h2> Oops! Error by fetching Urls ...</h2>`;
    }
}

// render pokemon data:
async function renderCardData() {
    fetchedUrls.map((poke) => {
        cardsContainerEl.classList.remove('fetchFailed');
        cardsContainerEl.innerHTML += getDataFromUrlTemplate(poke);
    })
    showMoreBtn.style.display = "block";
    imgLooping();
}

// fetch more pokemons by clicking show more button:
async function fetchMorePokemons(i) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const responseToJson = await response.json();
        fetchMorePokemonsArray.push(responseToJson);
    } catch (error) {
        cardsContainerEl.innerHTML = `<h2>Oops! Error fetching more Pokemons.</h2>`;
        errorHandling();
    }
}

// render cards by fetching the next batch of pokemons:
async function renderNewFetchedPokemons() {
    cardsContainerEl.classList.remove('fetchFailed');
    const start = fetchMorePokemonsArray.length - 20;
    const end = fetchMorePokemonsArray.length;
    for (let i = start; i < end; i++) {
        const poke = fetchMorePokemonsArray[i];
        if (poke) {
            cardsContainerEl.innerHTML += getDataFromUrlTemplate(poke);
        }
    }
    showMoreBtn.style.display = "block";
    imgLooping();
}

//overlay Function:
const popupOverlayDetails = async(e) => {
    e.preventDefault();
    try {
        let cardItem = e.target.closest('.cards');
        const cardId = cardItem ? cardItem.dataset.id : null;
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

// next and prev button:
async function navigationFunctions(direction) {
    if (direction === "left" && currentPokemonId > 1) {
        currentPokemonId--;
        await repeatedFetch(currentPokemonId);
    }
    if (direction === "right" && currentPokemonId < 1025) {
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

//buttons Event Listeners:
const leftArrowbBtn = document.getElementById('leftArrow');
if (leftArrowbBtn) {
    leftArrowbBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPokemonId > 1) {
            navigationFunctions("left");
        }
    });
}

const rightArrowBtn = document.getElementById('rightArrow');
if (rightArrowBtn) {
    rightArrowBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPokemonId < 1025) {
            navigationFunctions("right");
        }
    });
}

// render overlay cards:
function renderOverlayCards(data) {
    currentPokemonId = data.id;
    cardsContainerEl.classList.remove('fetchFailed');
    overlayEl.innerHTML = getDataForOverlayTemplate(data);
    document.getElementById('card_overlay').classList.remove('d-none');
    bodyEl.classList.add('no-scroll');
}

// toggling functions for overlay:
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