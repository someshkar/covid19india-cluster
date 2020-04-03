const { doc, creds } = require('./db')
const { useLog } = require('../../util/logger');

module.exports = async (req, res) => {
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  const rawRows = await sheet.getRows()
  useLog(rows)

  let rows = []

  for (let rawRow of rawRows) {
    if (!rawRow['Date Announced']) {
      break
    }

    // Turn M/F to word
    function processGender(letter) {
      if (rawRow['Gender'] === 'M') return 'male'
      else return 'female'
    }

    // Remove empty strings ("")
    function processSources(sources) {
      return sources.filter(source => source)
    }

    const row = {
      patientId: parseInt(rawRow['Patient number']), // Change in frontend, used to be 'P' + rawRow['Patient Number']
      reportedOn: rawRow['Date Announced'],
      onsetEstimate: '',
      ageEstimate: rawRow['Age Bracket'],
      gender: processGender(rawRow['Gender']), // Change in frontend, used to be 'M'/'F'
      city: rawRow['Detected City'],
      state: rawRow['Detected State'],
      district: rawRow['Detected District'],
      status: rawRow['Current Status'],
      notes: rawRow['Notes'],
      contractedFrom: rawRow['Contracted from which Patient (Suspected)'],
      sources: processSources([
        rawRow['Source_1'],
        rawRow['Source_2'],
        rawRow['Source_3'],
      ]),
    }

    rows.push(row)
  }

  let resp = {
    success: true,
    data: {
      source: 'covid19india.org',
      lastRefreshed: new Date(),
      summary: {
        total: rows.length,
      },
      rawPatientData: rows,
    },
    lastRefreshed: new Date(),
    lastOriginUpdate: new Date(),
  }

  res.json(resp)
}
