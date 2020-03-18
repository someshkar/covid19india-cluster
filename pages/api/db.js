const { GoogleSpreadsheet } = require('google-spreadsheet')

const creds = require('./client_secret.json')
const sheetId = '1nzXUdaIWC84QipdVGUKTiCSc5xntBbpMpzLm6Si33zk'

const doc = new GoogleSpreadsheet(sheetId)

module.exports = { doc, creds }
