const mongoose = require('mongoose')
const config = require('../configuration/index.js')

mongoose.Promise = global.Promise

const url = config.get('MONGO_URL')
const db = config.get('MONGO_DATABASE_NAME')

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      const connectionUrl = `${url}/${db}`
      mongoose.connect(`${url}/${db}`, {
        useMongoClient: true,
        promiseLibrary: global.Promise
      })
      const conn = mongoose.connection
      conn.on('error', reject)
      conn.once('open', () => {
        console.log(`Connected to ${url}/${db}`)
        resolve()
      })
    })
  },
  model: key => { return mongoose.model(key) }
}


