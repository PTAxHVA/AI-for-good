/**
 * Controller người dùng:
 * - POST /api/users: đăng ký user mới
 * - GET /api/users: trả danh sách user + lịch sử chat (phục vụ debug/admin ở môi trường dev)
 */
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

    // Validate input tối thiểu ở controller để phản hồi lỗi rõ ràng cho frontend.
    if (!username || !password){
        return response.status(400).json({error: 'Username or password required'})
    }

    if (password.length <= 3){
        return response.status(400).json(
            {error: "password must be at least 3 characters"}
        )
    }

    try {
        const saltRounds = 10
        // Password chỉ lưu dưới dạng hash, không lưu plain text.
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        // Mongo duplicate key -> trả thông báo business dễ hiểu.
        if (error?.name === 'MongoServerError' && error?.code === 11000) {
            return response.status(400).json({ error: 'username already exists' })
        }
        next(error)
    }
})

usersRouter.get('/', async (request, response) => {
  return response.status(403).json({
    error: 'This endpoint is disabled in public demo.',
  })
})

module.exports = userRouter
