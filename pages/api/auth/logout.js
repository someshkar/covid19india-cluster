const cookie = require('cookie')

module.exports = async (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('auth', ''))
  return res.json({
    status: 'success',
    message: 'Logged out',
  })
}
