const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
const cardsContainerEl = document.querySelector('.cards_container');
const urlElement = [];
const urlArrayData = [];
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
        console.log(urlElement[index]);
    }
    fetchAllUrls();
}


async function fetchAllUrls() {
    const response = await Promise.all(urlElement.map(url => fetch(url)));
    const responseToJson = await Promise.all(response.map(res => res.json()));
    console.log(responseToJson);

    responseToJson.forEach((elem) => {
        cardsContainerEl.innerHTML += getDataFromUrlTemplate(elem);
    })
}


showMoreBtn.addEventListener('click', () => {
    let cards = [...document.querySelectorAll('.main .cards_container .cards')];
    for (let i = currentItem; i < currentItem + 5; i++) {
        cards[i].style.display = "inline-block";
    }
    currentItem += 5;
    if (currentItem >= cards.length) {
        showMoreBtn.innerHTML = `Show Less!`;
        // for (let i = 30; i > currentItem - 5; i--) {
        //     cards[i].style.display = "none";
        // }
        // currentItem -= 5;
    }
})