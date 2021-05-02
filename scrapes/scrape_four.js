const request = require("request");
const $ = require("cheerio");
const cheerio = require("cheerio");

let totalTitalArray = [];
let totalPriceArray = [];

const CCG_PAGES = [
  "base-set",
  "base-set-1st-edition",
  "base-set-shadowless",
  "pokemon-promos",
  "jungle",
  "jungle-1st-edition",
  "fossil-1st-edition",
  "fossil",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const getSingleCardsFromCCGCastle = (i) => {
  request(
    `https://www.ccgcastle.com/product/pokemon/${CCG_PAGES[0]}?page=${i}&limit=100&sort=name&direction=asc`,
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

        for (i = 0; i < pricingArray.length; i++) {
          if (pricingArray[i].includes("$")) {
            newPricingArray.push(pricingArray[i]);
          }
        }

        for (i = 0; i < titleArray.length && i < newPricingArray.length; i++) {
          console.log(titleArray[i], newPricingArray[i], " + ", i);
          totalTitalArray.push(titleArray[i]);
          totalPriceArray.push(newPricingArray[i]);
        }
      }
    }
  );
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function getAllCards() {
  for (i = 1; i < 6; i++) {
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
  console.log(totalTitalArray, totalPriceArray);
}

seeWhatWeGot();
