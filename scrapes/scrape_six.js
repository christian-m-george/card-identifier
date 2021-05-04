import request from "request";
import * as cheerio from "cheerio";
import { all } from "pokemon";
import checkCard from "../utils/checkCards.js";

let totalTitleArray = [];
let totalPriceArray = [];
let pokeArray = [];

function allPokes() {
  for (let i = 0; i < all().length; i++) {
    if (all()[i]) {
      const pokeObj = {
        pokemon: all()[i],
        number: i + 1,
      };
      pokeArray.push(pokeObj);
    }
  }
}
allPokes();

const getSingleCardsFromDACardWorld = (i) => {
  request(
    `https://www.dacardworld.com/gaming/pokemon-singles?Page=${i}`,
    (error, response, html) => {
      if (!error & (response.statusCode == 200)) {
        // console.log("this is the index of the search", i);
        const $ = cheerio.load(html);
        const listItem = $(".list-item");

        const titleOutput = listItem.find(".item-title").text();
        const titleArray = titleOutput.trim().split("\n");
        const pricingOutput = listItem.find(".item-pricing-small").text();

        const pricingArray = pricingOutput.split(/\n{2,}/);
        const newPricingArray = [];

        for (let i = 0; i < pricingArray.length; i++) {
          if (pricingArray[i].includes("$")) {
            newPricingArray.push(pricingArray[i]);
          }
        }

        for (
          let i = 0;
          i < titleArray.length && i < newPricingArray.length;
          i++
        ) {
          //   console.log(titleArray[i], newPricingArray[i], " + ", i);
          totalTitleArray.push(titleArray[i]);
          totalPriceArray.push(newPricingArray[i]);
          const nameResult = checkCard.checkName(titleArray[i]);
          console.log(titleArray[i]);

          const cardObj = {
            set: checkCard.checkSet(titleArray[i]),
            pokemon: nameResult.name,
            natDexNum: nameResult.number,
            setNumber: checkCard.checkSetNumber(titleArray[i])
              ? checkCard.checkSetNumber(titleArray[i])[0]
              : "was null for some reason",
            gradingAgency: checkCard.checkAgency(titleArray[i]),
            shadowless: checkCard.checkShadow(titleArray[i]),
            gemMint: checkCard.checkMint(titleArray[i]),
            price: checkCard.checkPrice(newPricingArray[i])[1] ? checkCard.checkPrice(newPricingArray[i])[1] : checkCard.checkPrice(newPricingArray[i])[0]
          };
          console.log(cardObj);
        }
      }
    }
  );
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function getAllCards() {
  for (let i = 1; i < 6; i++) {
    if (i > 1) {
      await timer(6000);
      getSingleCardsFromDACardWorld(i);
    } else {
      getSingleCardsFromDACardWorld(i);
    }
  }
}

async function seeWhatWeGot() {
  await getAllCards();
  //   console.log(totalTitleArray, totalPriceArray);
}

seeWhatWeGot();
