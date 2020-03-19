const { doc, creds } = require('./db')

module.exports = async (req, res) => {
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  const rawRows = await sheet.getRows()
  // console.log(rows)

  let rows = []

  for (let rawRow of rawRows) {
    if (!rawRow['Date Announced']) {
      break
    }

    const row = {
      patientId: 'P' + rawRow['Patient number'],
      dateAnnounced: rawRow['Date Announced'],
      ageEstimate: rawRow['Age Bracket'],
      gender: rawRow['Gender'],
      city: rawRow['Detected City'],
      district: rawRow['Detected District'],
      state: rawRow['Detected State'],
      status: rawRow['Current Status'],
      notes: rawRow['Notes'],
      contractedFrom: rawRow['Contracted from which Patient (Suspected)'],
      sources: [rawRow['Source_1'], rawRow['Source_2'], rawRow['Source_3']],
    }

    rows.push(row)
  }

  res.json(rows)
}
