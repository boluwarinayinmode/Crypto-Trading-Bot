require('dotenv').config()
const config = require('../configuration/index.js');
const pricing = require('../pricing/index.js');
const database = require('../database/index.js')


const mainLoop = async () => {
   const spotPrice = await pricing.getSpotPrice();
   const boyPrice = await pricing.getBuyPrice();
   const sellPrice = await pricing.getSellPrice();
 
   
   const time = 10 * 1000;
   await new Promise(resolve => setTimeout(resolve, time));
   mainLoop();
}
module.exports = {
  start: async () => {
    await database.connect()
    pricing.setCurrency('USD')
    mainLoop();

  }
}

