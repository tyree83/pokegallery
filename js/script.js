// IPO Input -> Process -> Output

// Constants and State Variables (Data)

// Constant Data

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

// State Data

let pokemonData, pokemonDetail;

// Cached Element References

const $collection = $('#collection');

// Attached Event Listeners

$collection.on('click', 'article.card', handleClick);

// Functions

// called immediately

init();

function init() {
    getData();
}

function getData(detailURL) {
    console.log('detailURL', detailURL)
    // declare a local variable to take whichever url we need
    let url;
    if (detailURL === undefined) {
        // we want all the pokemon
        url = BASE_URL;
    } else {
        // we want a single pokemon
        url = detailURL;
    }

    // fetch data using AJAX

    $.ajax(url).then(function (data) {

        // take the returned data and assign it to a global state variable
        // call render to visualize it to the DOM
        // we are getting all the pokemon

        if (detailURL === undefined) {
            pokemonData = data;
            render();
        } else {

            // we are getting a single pokemon object

            pokemonDetail = data;

            // call render and tell the function that it needs to display a modal

            render(true);
        }
    }, function (error) {
        console.log('Error: ', error);
    });
}

function handleClick() {
    getData(this.dataset.url);
}

function render(showModal) {
    if (showModal === true) {

        // show the modal
        // generate the html for the inner content for the modal
        // call the modal on the modal element

        const $modalContent = $(`
            <img src="${pokemonDetail.sprites.front_default}"/>
            <h5>${pokemonDetail.name}</h5>
            <p>Height: ${pokemonDetail.height}</p>
            <p>Moves: ${pokemonDetail.moves.length}</p>
            <p>Abilities: ${pokemonDetail.abilities.length}</p>
        `);
        const $modal = $('#pokemodal');
        $modal.html($modalContent)
        $modal.modal();
    } else {

        // map over the objects inside of the pokemonData results array
        // dynamically generate html for each element in the array
        // add that html to our collection element
 
        const htmlArray = pokemonData.results.map(pokemon => {
            return `
            <article data-url="${pokemon.url}" class="card flex-ctr">
                <h3>${pokemon.name}</h3>
            </article>
            `;
        });
        $collection.html(htmlArray);
    }
}
