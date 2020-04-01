const _ = require('lodash')

const users = require('./users.json')

module.exports = (req, res) => {
  if (!req.cookies.auth) {
    return res.json({
      status: 'error',
      message: "You haven't logged in",
    })
  }

  const username = req.cookies.auth.split(' ')[0]

  // const { username } = req.body
  const user = _.find(users, user => user.username === username)

  if (req.cookies.auth.split(' ')[1] === user.passwordHash) {
    return res.json({
      status: 'success',
      message: 'You are successfully logged in!',
    })
  } else {
    return res.json({
      status: 'error',
      message: "You don't seem to be logged in",
    })
  }
}
