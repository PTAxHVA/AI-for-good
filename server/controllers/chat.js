/**
 * Controller chatbot:
 * - Xác thực token
 * - Gọi Gemini với system prompt
 * - Lưu cả câu hỏi user và câu trả lời bot vào chatHistory
 */
const chatRouter = require("express").Router();
const Chat = require("../models/chat");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require('../utils/config')
const logger = require("../utils/logger")
const {GoogleGenerativeAI} = require('@google/generative-ai')
const { systemPrompt } = require('../models/prompt')

chatRouter.post("/", async (request, response) => {
  const body = request.body || {}
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  // API contract bắt buộc có message dạng string.
  if (!message) {
    return response.status(400).json({ error: 'Thiếu nội dung câu hỏi. Vui lòng gửi body.message dạng string.' })
  }

  if (!request.token) {
    return response.status(401).json({ error: 'Thiếu token Bearer trong Authorization header.' })
  }

  let decodedToken
  try {
    // Token được tách từ middleware.tokenExtractor.
    decodedToken = jwt.verify(request.token, config.SECRET)
  } catch (error) {
    logger.error('JWT verify error:', error.name, error.message)
    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ error: 'Token đã hết hạn. Vui lòng đăng nhập lại.' })
    }
    return response.status(401).json({ error: 'Token không hợp lệ.' })
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token không chứa user id hợp lệ.' })
  }

  if (!config.GEMINI_API_KEY) {
    logger.error('Missing GEMINI_API_KEY in backend environment')
    return response.status(500).json({ error: 'Thiếu GEMINI_API_KEY ở backend. Hãy cấu hình .env trước khi chat.' })
  }

  try {
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'Không tìm thấy user tương ứng với token.' })
    }

    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let textReply = ''
    try {
      // Prompt hệ thống + câu hỏi user là đầu vào duy nhất gửi lên model.
      const result = await model.generateContent(
        `${systemPrompt()}. Câu hỏi: ${message}`,
      );

      const chatBotResponse = await result.response;
      textReply = chatBotResponse.text();
    } catch (error) {
      logger.error('Gemini API error:', error.name, error.message)
      return response.status(502).json({ error: 'Lỗi gọi Gemini API. Vui lòng kiểm tra API key/quota rồi thử lại.' })
    }

    const chat = new Chat({
      user: user._id,
      role: 'user',
      text: message,
    })

    const savedChat = await chat.save()

    const botMessage = new Chat({
      user: user._id,
      role: "bot",
      text: textReply,
    });

    const savedBotMessage = await botMessage.save()
    
    // Mỗi lượt chat ghi 2 bản ghi (user + bot) để có thể truy vết hội thoại.
    user.chatHistory = user.chatHistory.concat([
      savedChat._id,
      savedBotMessage._id,
    ])

    await user.save()
    response.json({reply: textReply})
  } catch (error) {
    logger.error('Chat controller unexpected error:', error.name, error.message)
    response.status(500).json({ error: 'Lỗi xử lý chat ở backend.' });
  }
});

module.exports = chatRouter
