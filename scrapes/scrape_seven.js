import request from "request";
import * as cheerio from "cheerio";
import createPokeCard from "../utils/betterCardDataStripper.js";

let totalTitleArray = [];
let totalPokeArray = [];

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
        let newPricingArray = [];

        for (let i = 0; i < pricingArray.length; i++) {
          if (pricingArray[i].includes("$")) {
            // console.log(pricingArray[i])
            newPricingArray.push(pricingArray[i]);
          }
        }
        // console.log(newPricingArray)
        for (let i = 0; i < titleArray.length && i < newPricingArray.length; i++) {
          // console.log(titleArray[i], newPricingArray[i], " + ", i);


        //   console.log(newPricingArray[i])
          let pricingOutput = newPricingArray[i].replace(/\n/, ' ')
        //   console.log(newPricingArray[i], i)

          let perhapsFinallyAUsefulString = titleArray[i] + ` ${pricingOutput}`;


          // console.log(perhapsFinallyAUsefulString)
          totalPokeArray.push(perhapsFinallyAUsefulString);


          // console.log(totalTitleArray[i])
          const pokeCard = createPokeCard(perhapsFinallyAUsefulString)
          console.log(pokeCard);


        }
      }
    }
  );
};


const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function getAllCards() {
  for (let i = 1; i < 2; i++) {
    if (i > 1) {
      await timer(6000);
      getSingleCardsFromDACardWorld(i);
    } else {
      getSingleCardsFromDACardWorld(i);
    }
  }
}

async function seeWhatWeGot() {
    await getAllCards()
    // console.log(totalPokeArray)
}

seeWhatWeGot()
