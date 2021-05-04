import pokeList from "./pokemonList.js";
import CARD_SETS from "../sets/CardSets.js";

const checkCard = {
  checkAgency: function checkGradingAgency(input) {
    //   console.log('fn')
    //   console.log(input.toLowerCase())
    if (input.toUpperCase().includes("PSA")) {
      // console.log("PSA")
      return "PSA";
    } else if (input.toUpperCase().includes("BGS")) {
      // console.log("BGS")
      return "BGS";
    } else if (input.toUpperCase().includes("CGC")) {
      // console.log("CGC")
      return "CGC";
    } else {
      // console.log("NO GRADE")
      return "NO GRADE";
    }
  },

  checkSet: function checkCardSet(input) {
    for (let i = 0; i < CARD_SETS.length; i++) {
      let myInput = input.toLowerCase();
      if (myInput.includes(CARD_SETS[i].name.trim().toLowerCase())) {
        //   console.log('returning and exiting')
        return CARD_SETS[i].name;
      }
    }
  },

  checkSetNumber: function checkCardSetNumber(input) {
    const regex = /( \d+\/\d+ )/;
    const match = regex.exec(input);
    return match;
  },

  checkMint: function checkGemMint(input) {
    if (
      input.toLowerCase().includes(" gm ") ||
      input.toLowerCase().includes("gemmint") || 
      input.toLowerCase().includes("gem mint") 
    ) {
      return true;
    } else {
      return false;
    }
  },

  checkShadow: function checkShadowless(input) {
    if (input.toLowerCase().includes("shadowless")) {
      return true;
    } else {
      return false;
    }
  },

  checkPrice: function checkCardPrice(input) {
    const regex = /(\d+\.[0-9]{2,2})/g;
    const match = input.match(regex);
    console.log(match[0], match[1], match[3]);
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
    console.log(pokemonObj);
    return pokemonObj;
  },

  testImport: function testTheImport() {
    console.log("hello");
  },
};

checkCard.checkPrice(
  "fjd1561.21skfdsafdasfdasa2.13fj4.18dsjfchmaj 4/10 estidfsdfw2.89nrizCCGard"
);

export default checkCard;
