const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

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
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        if (error?.name === 'MongoServerError' && error?.code === 11000) {
            return response.status(400).json({ error: 'username already exists' })
        }
        next(error)
    }
})

userRouter.get('/', async (request,response) => {
  const users = await User.find({}).populate('chatHistory')
  response.json(users)
})

module.exports = userRouter
