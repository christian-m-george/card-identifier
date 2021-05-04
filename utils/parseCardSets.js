import CARD_SETS from "../sets/CardSets.js";

let myArray = [];

// console.log(CARD_SETS[0].);

function getSetNames() {
  for (let i = 0; i < CARD_SETS.length; i++) {
    // console.log(CARD_SETS[i].name);
    myArray.push(CARD_SETS[i].name);
  }
}

getSetNames();

export default myArray;
