require('dotenv').config()
const config = require('../configuration/index.js')
const coinbase = require('coinbase');

const apiKey=process.env.COINBASE_API_KEY
const apiSecret=process.env.COINBASE_API_SECRET
const client = new coinbase.Client({apiKey, apiSecret})
module.exports = {
  start: async () => {
  }
}

//UTALPGAZCFO4Z3RXAWNXXIKFET4GEW