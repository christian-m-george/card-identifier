import pokemonArray from "./allPokemon.js";
import checkCard from "./checkCards.js";

const myString = `base unlimited charizard 4/102 bgs 9 (quad + 9.5 centering) $11.42`;

const createPokeCard = (myString) => {
  const regex = / \d+[\.\-\/]\d+[\\.\/]?\d+? /g;
  const regex1 = / [0-9][1,0]?($|\s)/;
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
    shortenedString = myString.replace(/^[pP][oO][kK][eE][mM][oO][nN] /, "");
  }
  shortenedString = myString
    .trim()
    .toLowerCase()
    .replace("base set", "base")
    .replace("base 2", "base set 2");

  let otherInfo;
  if (isOtherInfo) {
    otherInfo = shortenedString.match(regex4);
    shortenedString = shortenedString.replace(regex4, " ");
  }

  console.log(otherInfo, "<----- lookin for dis now homie");

  let prices = checkCard.checkPrice(shortenedString);
  for (let i = 0; i < prices.length; i++) {
    shortenedString = shortenedString.replace(prices[i], "");
  }

  let pokeSetName = checkCard.checkSet(shortenedString);

  shortenedString = shortenedString
    .replace(pokeSetName.toLowerCase(), "")
    .replace(/ \d+[\.\-\/]\d+[\\.\/]?\d+/g, "");

  const isRating = regex1.test(shortenedString);
  const rating = isRating ? regex1.exec(shortenedString) : "unrated or set";

  if (rating !== "unrated or set") {
    shortenedString = shortenedString.replace(/ [0-9][1,0]?($|\s)/, "");
  }

  // console.log(shortenedString);

  shortenedString = shortenedString.replace(agency[0].toLowerCase(), "");

  let found = false;
  for (let i = 0; i < pokemonArray.length && !found; i++) {
    if (shortenedString.includes(pokemonArray[i].pokemon.toLowerCase())) {
      pokemonName = pokemonArray[i].pokemon;
      natDexNum = pokemonArray[i].number;
      found = true;
    }
  }

  const pokeCard = {
    setNumber: cardSetNumber ? cardSetNumber[0].trim() : "IS COLLECTION",
    setName: pokeSetName.toUpperCase(),
    cardTitle: "",
    pokemonName: pokemonName ? pokemonName.toUpperCase() : "COLLECTION OR SET",
    dexNumber: pokemonName ? natDexNum : "COLLECTION OR SET",
    rating: rating.includes("unrated") ? rating : rating[0].trim(),
    agency: agency.length > 1 ? agency : agency[0].toUpperCase(),
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
      .replace("(gm) ", "")
      .replace("(nm)", "");
  }

  if (
    shortenedString.includes("first edition") ||
    shortenedString.includes("1st edition")
  ) {
    firstEdition = true;
    shortenedString = shortenedString
      .replace("1st edition", "")
      .replace("first edition", "");
  }

  // console.log(newString8, 'this is 8 sting')
  pokeCard.cardTitle = shortenedString
    .trim()
    .replace(/\s+/g, " ")
    // .replace(/ \d+[\.\-\/]\d+[\\.\/]?\d+/g, "")
    .toUpperCase();

  console.log(pokeCard);
  return pokeCard;
};

createPokeCard(myString);

export default createPokeCard;
