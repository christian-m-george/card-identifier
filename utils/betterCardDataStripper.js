import pokemonArray from "./allPokemon.js";
import checkCard from "./checkCards.js";

// might need to replace with " " instead of "" in order to not break the regex checks on strings -- for instance fdjskfdspsa won't trigger regex2
// next thing tho is to get the Set Name and the Card Title on there w/ Other Details

let myString = `Pokemon Base Set Gem Mint Unlimited Charizard shadowless 4/102 pSa 9 (Quad + 9.5 Centering)`;

const regex = /( \d+\/\d+ )/;
const regex1 = / [0-9]{1,2} /;
const regex2 = /[pcbPCB][sgSG][acsACS]/;
// const regex3 = /d/;
// const regex4 = /d/;
// const regex5 = /d/;

const cardSetNumber = regex.exec(myString);
const rating = regex1.exec(myString);
const agency = regex2.exec(myString);
let pokemonName;
let natDexNum;
// let cardSetName;
// let cardTitle;

let newString = myString.toLowerCase().replace(`${cardSetNumber[0]}`, "");
let newString2 = newString.toLowerCase().replace(rating[0], "");
let newString3 = newString2.toLowerCase().replace(agency[0].toLowerCase(), "");

// console.log(newString3);
newString3.toLowerCase();

let found = false;
for (let i = 0; i < pokemonArray.length && !found; i++) {
  if (newString3.toLowerCase().includes(pokemonArray[i].pokemon.toLowerCase())) {
    pokemonName = pokemonArray[i].pokemon;
    natDexNum = pokemonArray[i].number;
    found = true;
  }
}

const pokeCard = {
    setNumber: cardSetNumber[0],
    setName: "",
    cardTitle: "",
    pokemonName: pokemonName,
    dexNumber: natDexNum,
    rating: rating[0],
    agency: agency[0].toUpperCase(),
    shadowless: checkCard.checkShadow(newString3),
    gemMint: checkCard.checkMint(newString3),
    otherDetails: ""
}

console.log(pokeCard)
console.log(newString3);

let newString4;
if ( pokeCard.shadowless ) {
    newString4 = newString3.replace("shadowless", '')
}

let newString5;
if ( pokeCard.gemMint ) {
    newString5 = newString4.replace("gem mint", "")
}

console.log(newString5)