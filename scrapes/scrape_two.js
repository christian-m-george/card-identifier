const request = require("request");
const $ = require("cheerio");
const cheerio = require("cheerio");

let totalTitleArray = [];
let totalPriceArray = [];

const getSingleCardsFromDACardWorld = (i) => {
  request(
    `https://www.dacardworld.com/gaming/pokemon-singles?Page=${i}`,
    (error, response, html) => {
      if (!error & (response.statusCode == 200)) {
        console.log("this is the index of the search", i);
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

        for (let i = 0; i < titleArray.length && i < newPricingArray.length; i++) {
          // console.log(titleArray[i], newPricingArray[i], " + ", i);
          totalTitleArray.push(titleArray[i]);
          totalPriceArray.push(newPricingArray[i])
          const cardObj = {
            title: titleArray[i],
            price: pricingArray[i],
          };
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
    await getAllCards()
    console.log(totalTitleArray, totalPriceArray)
}

seeWhatWeGot()
