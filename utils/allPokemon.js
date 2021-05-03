const pokemon = require('pokemon');
 
let pokeArray = [];

function allPokes() {
    for(let i = 0; i < pokemon.all().length; i++) {
        if(pokemon.all()[i]){
        const pokeObj = {
            pokemon: pokemon.all()[i],
            number: i+1
        }

        console.log(pokeObj)
        pokeArray.push(pokeObj)};
    }
}
allPokes();
