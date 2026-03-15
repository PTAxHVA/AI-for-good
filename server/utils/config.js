/**
 * Nạp cấu hình backend từ environment.
 * Có fallback cho môi trường local để chạy nhanh khi chưa tạo đủ biến .env.
 */
require('dotenv').config()

const PORT = process.env.PORT || '3001'
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vinschool-chatbot'
const SECRET = process.env.SECRET || 'dev-secret-change-me'

module.exports = {PORT, GEMINI_API_KEY, MONGODB_URI, SECRET}
