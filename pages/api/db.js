const { GoogleSpreadsheet } = require('google-spreadsheet')

const creds = require({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
})
const sheetId = '1nzXUdaIWC84QipdVGUKTiCSc5xntBbpMpzLm6Si33zk'

const doc = new GoogleSpreadsheet(sheetId)

module.exports = { doc, creds }
