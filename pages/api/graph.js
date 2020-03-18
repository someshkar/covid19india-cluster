// const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// module.exports = async (req, res) => {
//   const { body } = req
//   let response

//   console.log(`Email: ${body.email}`)

//   await promisify(doc.useServiceAccountAuth)(creds)
//   const info = await promisify(doc.getInfo)()
//   const sheet = info.worksheets[0]

//   const existingRows = await promisify(sheet.getRows)()
//   const currentEmailRows = existingRows.filter(row => row.email === body.email)
//   const emailExists = currentEmailRows.length !== 0

//   console.log(`Exists: ${emailExists}`)

//   // Check if email already exists
//   if (emailExists) {
//     response = {
//       title: 'Email exists',
//       description: "You've already joined the beta!",
//       status: 'error',
//     }
//   }

//   const valid = emailRegex.test(String(body.email).toLowerCase())

//   console.log(`Validity: ${valid}`)

//   // Check email validity
//   if (valid && !emailExists) {
//     console.log(`Adding ${body.email}`)

//     // Make new row
//     const row = { email: body.email, accepted: 'FALSE' }

//     // Add new row
//     await promisify(sheet.addRow)(row)
//   } else if (!valid) {
//     response = {
//       title: 'Invalid Email Address',
//       description: 'Please enter a valid email address.',
//       status: 'error',
//     }
//   }

//   // Default success message
//   if (response === undefined) {
//     response = {
//       title: 'Thanks!',
//       description: "We'll email you when we're ready.",
//       status: 'success',
//     }
//   }

//   // Send response
//   res.status(200).json(response)
// }

const { doc, creds } = require('./db')
const parse = require('./parse')

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

  const graph = await parse.rowsToGraph(rows)

  res.json(graph)
}
