/**
 * Middleware dùng chung cho toàn bộ backend:
 * - requestLogger: log request để theo dõi luồng gọi API
 * - tokenExtractor: tách Bearer token cho controller dùng
 * - errorHandler: chuẩn hóa lỗi runtime thường gặp
 */
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith("Bearer ")){
        // Gắn token vào request để controller không phải parse lại header.
        request.token = authorization.replace("Bearer ", "")
    }
    else {
        request.token = null
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    // Giữ mapping lỗi theo chuẩn hiện tại để không làm đổi API contract.
    if (error.name === 'CaseError'){
        return response.status(400).send({error: 'malformatted id'})
    }
    else if (error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {requestLogger, errorHandler, tokenExtractor}
