const { doc, creds } = require('./db')

module.exports = async (req, res) => {
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  const rawRows = await sheet.getRows()

  let rows = []

  for (let rawRow of rawRows) {
    // Remove empty strings ("")
    // const processSources = sources => sources.filter(source => source)

    const row = {
      patientId: parseInt(rawRow['Patient Number']), // Change in frontend, used to be 'P' + rawRow['Patient Number']
      reportedOn: rawRow['Date Announced'],
      onsetEstimate: '',
      name: rawRow['Name'],
      ageEstimate: rawRow['Age'],
      gender: rawRow['Gender'] === 'M' ? 'Male' : 'Female', // Change in frontend, used to be 'M'/'F'
      phone: rawRow['Phone Number'],
      hospital: rawRow['Hospital'],
      facility: rawRow['Facility'],
      health: rawRow['Health Status'],
      quarantine: rawRow['Quarantine Status'],
      address: rawRow['Address'],
      notes: rawRow['Notes'],
      contractedFrom: rawRow['ContractedFrom'],
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

  console.log('Response:', resp.data.rawPatientData[0])

  res.json(resp)
}
