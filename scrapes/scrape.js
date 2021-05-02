import request from "request";
import { load } from "cheerio";

request(
  `https://www.dacardworld.com/gaming/pokemon-singles?Page=1`,
  (error, response, html) => {
    if (!error & (response.statusCode == 200)) {
      const $ = load(html);
      const listItem = $(".list-item");

      const titleOutput = listItem.find(".item-title").text();
      const titleArray = titleOutput.trim().split("\n");
      const pricingOutput = listItem.find(".item-pricing-small").text();

      // console.log(titleOutput);
      // console.log(titleArray);

      let daCards = [];

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
        // console.log(titleArray[i], newPricingArray[i], " + ", i);
        const cardObj = {
          title: titleArray[i],
          price: pricingArray[i],
        };
        // console.log(cardObj)
        daCards.push(cardObj);
      }
      console.log(daCards);
    }
  }
);
