const bcrypt = require('bcrypt')
const _ = require('lodash')
const cookie = require('cookie')

const users = require('./users.json')
// const users = [
//   {
//     username: 'admin',
//     passwordHash:
//       '$2b$10$3EQqsQCA1H5J//BeArQ6kufTUi3Dr7ZI48PzEr9gd8thhZdtwdH7C',
//   },
// ]

const messages = {
  success: {
    status: 'success',
    message: 'Login successful',
    passwordsMatch: true,
  },
  error: {
    status: 'error',
    message: 'Please check the credentials you submitted',
    passwordsMatch: false,
  },
}

async function hashPassword(password) {
  const saltRounds = 10

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })

  return hashedPassword
}

module.exports = async (req, res) => {
  const { username, password } = req.body
  const user = await _.find(users, user => user.username === username)

  console.log(user)

  if (!user) {
    res.json(messages.error)
  }

  const tryPasswordHash = await hashPassword(password)
  console.log('try', tryPasswordHash)

  bcrypt.compare(password, user.passwordHash, (err, response) => {
    if (err) {
      console.log(err)
      return res.json(messages.error)
    }

    if (response) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', `${user.username} ${user.passwordHash}`)
      )
      return res.json(messages.success)
    } else {
      return res.json(messages.error)
    }
  })
}
