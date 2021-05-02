const request = require("request");
const $ = require("cheerio");
const cheerio = require("cheerio");


request(
    `https://www.dacardworld.com/gaming/pokemon-singles?Page=4`,
    (error, response, html) => {
      if (!error & (response.statusCode == 200)) {
        const $ = cheerio.load(html);
        const listItem = $(".list-item");

        const titleOutput = listItem.find(".item-title").text();
        const titleArray = titleOutput.trim().split("\n");
        const pricingOutput = listItem.find(".item-pricing-small").text();

        // console.log(titleOutput);
        // console.log(titleArray);

        const pricingArray = pricingOutput.split(/\n{2,}/);
        const newPricingArray = [];
        for (i = 0; i < pricingArray.length; i++) {
          if (pricingArray[i].includes("$")) {
            newPricingArray.push(pricingArray[i]);
          }
        }
        for (i = 0; i < titleArray.length && i < newPricingArray.length; i++) {
          console.log(titleArray[i], newPricingArray[i], " + ", i);
        }
      }
    }
  );
