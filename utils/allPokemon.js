import { all } from "pokemon";

let pokeArray = [];

function allPokes() {
  for (let i = 0; i < all().length; i++) {
    if (all()[i]) {
      const pokeObj = {
        pokemon: all()[i],
        number: i + 1,
      };
      // console.log(pokeObj)
      pokeArray.push(pokeObj);
    }
  }
}

allPokes();

const pokemonArray = pokeArray;

export default pokemonArray;
