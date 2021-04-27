
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

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(pokemon.name + ' is ' + pokemon.height + ' feet tall.' + '<br>');
});
