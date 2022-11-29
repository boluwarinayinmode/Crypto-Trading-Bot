require('dotenv').config()
const config = require('../configuration/index.js');
const pricing = require('../pricing/index.js');
const database = require('../database/index.js')
const Price = require('../models/price.js')
const moment = require('moment');


const mainLoop = async () => {
  const time = 10 * 1000;
  try {
    const prices = await pricing.getPrices();
    const price = await Price.create(prices)
    
  } catch (error) {
    console.log(error)
  }
   
   await new Promise(resolve => setTimeout(resolve, time));
   mainLoop();
}
module.exports = {
  start: async () => {
    await database.connect()
    // pricing.setCurrency('USD')
    mainLoop();

  }
}

