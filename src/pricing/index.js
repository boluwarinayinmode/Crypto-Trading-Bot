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

 getSpotPrice = async () => new Promise((resolve, reject) => {
  const currencyCode = currency
  client.getSpotPrice({'currency': currencyCode}, function(err, price) {
    // console.log('Spot:  ' + currencyCode + ': ' +  price.data.amount);
    err ? reject(err) : resolve(price)
  });
})

getBuyPrice = async () => new Promise((resolve, reject) => {
  const currencyCode = currency
  client.getBuyPrice({'currency': currencyCode}, function(err, price) {
    // console.log('Buy: ' + currencyCode + ': ' +  price.data.amount);
    err ? reject(err) : resolve(price)
  });
})

getSellPrice = async () => new Promise((resolve, reject) => {
  const currencyCode = currency
   client.getSellPrice({'currency': currencyCode}, function(err, price) {
    // console.log('Sell: ' + currencyCode + ': ' +  price.data.amount + '\n');
    err ? reject(err) : resolve(price)
  });
})

 exports.getPrices = async () => {
  const currencyPair = currency

  const actions = [getBuyPrice(), getSpotPrice(), 
    getSellPrice()]

  const results = await Promise.all(actions)
  const ordering = ['buy', 'spot', 'sell']

  const dict = []

  for (let i in ordering) {
    const order = ordering[i]
    const result = results[i]
    dict[order] = result['data']
  }
 
  const data = {
    base: dict['buy']['base'],
    currency: dict['buy']['currency'],
    buy: dict['buy']['amount'],
    spot: dict['spot']['amount'],
    sell: dict['sell']['amount'],
    time: new Date()
  }
  console.log(data)
  return data
}

  
  