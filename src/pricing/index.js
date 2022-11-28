require('dotenv').config()
const Client = require('coinbase').Client; 

const apiKey=process.env.COINBASE_API_KEY
const apiSecret=process.env.COINBASE_API_SECRET

const client = new Client({apiKey,apiSecret,strictSSL: false});

// Coinbase  Pricing Data for Bitcoin
var currency = 'USD'
 exports.setCurrency = curr => {
  currency = curr
 }
  exports.getSpotPrice = async () => new Promise((resolve, reject) => {
    const currencyCode = currency
   return client.getSpotPrice({'currency': currencyCode}, function(err, price) {
      console.log('Spot:  ' + currencyCode + ': ' +  price.data.amount);
      err ? reject(err) : resolve(price)
    });
  })

  exports.getBuyPrice = async () => new Promise((resolve, reject) => {
    const currencyCode = currency
   return client.getBuyPrice({'currency': currencyCode}, function(err, price) {
      console.log('Buy: ' + currencyCode + ': ' +  price.data.amount);
      err ? reject(err) : resolve(price)
    });
  })

  exports.getSellPrice = async () => new Promise((resolve, reject) => {
    const currencyCode = currency
    return client.getSellPrice({'currency': currencyCode}, function(err, price) {
      console.log('Sell: ' + currencyCode + ': ' +  price.data.amount + '\n');
      err ? reject(err) : resolve(price)
    });
  })
  