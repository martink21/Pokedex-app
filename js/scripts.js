
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Charmander',
            height: 4,
            types: ['monster', 'dragon']
        },

        {
            name: 'Pikachu',
            height: 2,
            types: ['field', 'fairy']
        },

        {
            name: 'Squirtle',
            height: 3,
            types: ['monster', 'water1']
        }
    ];

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
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem)
        button.addEventListener ('click', showDetails(pokemon))
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
