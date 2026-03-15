/**
 * Controller đăng nhập.
 * Xác thực username/password và phát JWT dùng cho các API cần Bearer token (ví dụ /api/chat).
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const {username, password} = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  // Không phân biệt sai username hay password để tránh lộ thông tin tài khoản.
  if (!(user && passwordCorrect)){
    return response.status(401).json({
        error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken, 
    config.SECRET,
    // Token ngắn hạn giúp giảm rủi ro nếu bị lộ phía client.
    {expiresIn: 60*60}
  )

  response.status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
