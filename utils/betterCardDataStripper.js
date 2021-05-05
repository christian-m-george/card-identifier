import pokemonArray from "./allPokemon.js";
import checkCard from "./checkCards.js";

const myString = `Pokemon Base Set 1st Edition Shadowless Double Colorless Energy 96/102 PSA 9 $249.95 $224.95`;

const createPokeCard = (myString) => {
  const regex = / \d+[\.\-\/]\d+[\\.\/]?\d+? /g;
  const regex1 = / [0-9][1,0]?\.?\d{0,1}?($|\s)/;
  const regex2 = /[pcbPCB][sgSG][acsACS]/;
  const regex3 = /^[pP][oO][kK][eE][mM][oO][nN]/;
  const regex4 = /\([\w\W]+\)/g;
  const cardSetNumber = regex.exec(myString);
  const isOtherInfo = regex4.test(myString);
  const agency = regex2.exec(myString)
    ? regex2.exec(myString)
    : "unrated or set";
  const leadingPoke = regex3.test(myString);
  let pokemonName;
  let natDexNum;
  let firstEdition = false;

  let shortenedString;
  if (leadingPoke) {
    shortenedString = myString
      .trim()
      .replace(/^[pP][oO][kK][eE][mM][oO][nN] /, "")
      .toLowerCase()
      .replace("base set", "base")
      .replace("base 2", "base set 2")
      .replace(/set of \d+/, "");
  } else {
    shortenedString = myString
      .trim()
      .toLowerCase()
      .replace("base set", "base")
      .replace("base 2", "base set 2")
      .replace(/set of \d+/, "");
  }

  // console.log(shortenedString, "how did we do on the replace");

  let otherInfo;
  if (isOtherInfo) {
    otherInfo = shortenedString.match(regex4);
    shortenedString = shortenedString.replace(regex4, " ");
  }

  // console.log(otherInfo, "<----- lookin for dis now homie");

  let prices = checkCard.checkPrice(shortenedString);
  for (let i = 0; i < prices.length; i++) {
    shortenedString = shortenedString.replace(prices[i], "");
  }

  let pokeSetName = checkCard.checkSet(shortenedString);

  shortenedString = shortenedString
    .replace(pokeSetName.toLowerCase(), "")
    .replace(/ \d+[\.\-\/]\d+[\\.\/]?\d+/g, "");

  const isRating = regex1.test(shortenedString);
  const rating = isRating ? regex1.exec(shortenedString) : "UNRATED OR SET";

  if (rating !== "UNRATED OR SET") {
    shortenedString = shortenedString.replace(regex1, " ");
  }

  // console.log(shortenedString, "before agency replace", agency, agency[0]);
  agency.includes("UNRATED")
    ? null
    : (shortenedString = shortenedString
        .toLowerCase()
        .replace(/[pcbPCB][sgSG][acsACS]/, " "));

  // console.log(shortenedString, "before agency replace");

  let found = false;
  for (let i = 0; i < pokemonArray.length && !found; i++) {
    if (shortenedString.includes(pokemonArray[i].pokemon.toLowerCase())) {
      pokemonName = pokemonArray[i].pokemon;
      natDexNum = pokemonArray[i].number;
      found = true;
    }
  }

  // console.log(
  //   shortenedString,
  //   "for reference kldjfklasjdlkfjasdlkfjhkasdjflk;asdjlkfas"
  // );

  const pokeCard = {
    setNumber: cardSetNumber ? cardSetNumber[0].trim() : "IS COLLECTION",
    setName: pokeSetName.toUpperCase(),
    cardTitle: "",
    pokemonName: pokemonName ? pokemonName.toUpperCase() : "COLLECTION OR SET",
    dexNumber: pokemonName ? natDexNum : "COLLECTION OR SET",
    rating: rating.includes("UNRATED") ? rating : rating[0].trim(),
    agency: agency.includes("UNRATED") ? agency[0].toUpperCase() : agency[0],
    firstEdition: firstEdition,
    shadowless: checkCard.checkShadow(shortenedString),
    condition: checkCard.checkMint(shortenedString),
    price: prices.length > 1 ? prices[1] : prices[0],
    suggestedPrice: prices.length > 1 ? prices[0] : "NONE",
    otherDetails: isOtherInfo ? otherInfo[0].replace(/[\(\)]/g, "") : "NONE",
  };

  if (pokeCard.shadowless) {
    shortenedString = shortenedString.replace("shadowless", "");
  }

  if (pokeCard.condition == "GEM MINT" || pokeCard.condition == "NEAR MINT") {
    shortenedString = shortenedString
      .replace("gem mint", "")
      .replace("near mint", "")
      .replace(" gm ", " ")
      .replace(" nm ", " ")
      .replace("(gm)", "")
      .replace("(nm)", "");
  }

  const regex5 = /[1f](ir)?st edition/g;
  const isFirstEdition = regex5.test(shortenedString);
  if (isFirstEdition) {
    shortenedString = shortenedString.replace(/[1f](ir)?st edition/g, " ");
  }
  pokeCard.firstEdition = isFirstEdition;

  pokeCard.cardTitle = shortenedString
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();

  // console.log(pokeCard);
  return pokeCard;
};

createPokeCard(myString);

export default createPokeCard;
