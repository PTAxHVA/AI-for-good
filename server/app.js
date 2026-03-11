const cors = require('cors');
const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
const chatRouter = require('./controllers/chat.js')
const userRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const middleware = require('./utils/middleware.js')
const app = express();

logger.info("Connecting to MongoDB")

mongoose
  .connect(config.MONGODB_URI, {family: 4, serverSelectionTimeoutMS: 5000})
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(express.json());
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use(cors());

app.use((request, response, next) => {
  if (
    (request.path.startsWith('/api/login') || request.path.startsWith('/api/users')) &&
    mongoose.connection.readyState !== 1
  ) {
    return response.status(503).json({
      error: 'Database chưa sẵn sàng. Hãy kiểm tra MONGODB_URI và chạy MongoDB trước khi login/register.',
    })
  }
  next()
})

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/chat', chatRouter)

app.use(middleware.errorHandler)

module.exports = app
