import pokeList from "./pokemonList.js";
import CARD_SETS from "../sets/CardSets.js";

const checkCard = {
  checkAgency: function checkGradingAgency(input) {
    if (input.toUpperCase().includes("PSA")) {
      return "PSA";
    } else if (input.toUpperCase().includes("BGS")) {
      return "BGS";
    } else if (input.toUpperCase().includes("CGC")) {
      return "CGC";
    } else {
      return "NO GRADE";
    }
  },

  checkSet: function checkCardSet(input) {
    // console.log('------------>', input)
    let myResult;
    for (let i = 0; i < CARD_SETS.length; i++) {
      let myInput = input.toLowerCase();
      if (myInput.includes(`${CARD_SETS[i].name.trim().toLowerCase()} `)) {
        //   console.log('returning and exiting')
        myResult = CARD_SETS[i].name;
      }
    }
    if (myResult) {
      return myResult
    }
    else {
      return "SET NOT FOUND"
    }
  },

  checkSetNumber: function checkCardSetNumber(input) {
    const regex = /( \d+\/\d+ )/;
    const match = regex.exec(input);
    return match;
  },

  checkMint: function checkCardMint(input) {
    if (
      input.toLowerCase().includes(" gm ") ||
      input.toLowerCase().includes("gemmint") || 
      input.toLowerCase().includes("gem mint") 
    ) return "GEM MINT";
    else if (
      input.toLowerCase().includes(" nm ") ||
      input.toLowerCase().includes("near mint") || 
      input.toLowerCase().includes("nearmint") 
    ) 
      return "NEAR MINT";
    else return "REGULAR"
    },

  checkShadow: function checkShadowless(input) {
    if (input.toLowerCase().includes("shadowless")) {
      return true;
    } else {
      return false;
    }
  },

  checkPrice: function checkCardPrice(input) {
    const regex = /\$\d+\,?\d+\.[0-9]{2,2}/g;
    const match = input.match(regex);
    return match;
  },

  checkName: function checkPokeName(input) {
    let pokemonObj = {};
    let found = false;
    for (let i = 0; i < pokeList.length && !found; i++) {
      if (input.toLowerCase().includes(pokeList[i].pokemon.toLowerCase())) {
        // console.log("WINNER WINNER CHICKEN DINNER");
        const pokeObj = {
          name: pokeList[i].pokemon,
          number: pokeList[i].number,
        };
        pokemonObj = pokeObj;
        found = true;
      }
    }
    // console.log(pokemonObj);
    return pokemonObj;
  },

  testImport: function testTheImport() {
    // console.log("hello");
  },
};

// checkCard.checkPrice(
//   "fjd1561.21skfdsafdasfdasa2.13fj4.18dsjfchmaj 4/10 estidfsdfw2.89nrizCCGard"
// );

export default checkCard;
