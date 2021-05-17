let pokemonRepository = (function () {
   
    let pokemonList = [];
    let API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('.modal');


    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name.toUpperCase();
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('data-target','#pokemonModal')
        button.setAttribute('data-toggle','modal')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showLoadingMessage() {
        document.querySelector(
            '#loader').style.visibility = 'visible';

    }

    function hideLoadingMessage() {
        document.querySelector(
            '#loader').style.display = 'none';
    }

    function loadList() {
        showLoadingMessage();
        return fetch(API_URL).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });             
    }

    //function showModal
    function showModal(pokemon) {
        // eslint-disable-next-line no-undef
        let modalBody = $('.modal-body');

        console.log(modalBody);
        
        // eslint-disable-next-line no-undef
        let modalTitle = $('.modal-title');
        // eslint-disable-next-line no-undef
        let modalHeader = $('.modal-header');

        // Clear all existing modal content
        
        modalBody.empty();
        modalTitle.empty();
        modalHeader.empty();

        // eslint-disable-next-line no-undef
        let nameElement = $('<h1>' + pokemon.name.toUpperCase() + '</h1>');
        // eslint-disable-next-line no-undef
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr('src', pokemon.imageUrl);
        // eslint-disable-next-line no-undef
        let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

        modalHeader.append(nameElement);
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
       
        modalContainer.classList.add('is-visible');
    }

    //function hideModal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //function showDetails
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //closing the modal with escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //closing the modal by clicking only outside of it
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage,
        hideModal: hideModal
    };
})();

pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

let searchPokemonList = document.querySelector('.pokemon-list')
 //defines search bar
let searchBar = document.forms['filter'].querySelector('input');
//adds event listener so it interacs with the user
searchBar.addEventListener('keyup', function(e){
  let term = e.target.value.toLowerCase();
  let searchPokemons = searchPokemonList.getElementsByTagName('li');
  Array.from(searchPokemons).forEach(function(searchPokemons){
        let poke = searchPokemons.firstElementChild.textContent;
        if ( poke.toLowerCase().indexOf(term) != -1){
          searchPokemons.style.display = 'block';
        } else{
          searchPokemons.style.display = 'none';
        }
  })
})
