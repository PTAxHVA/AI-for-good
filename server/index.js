/**
 * Điểm chạy backend.
 * Tách file listen khỏi app giúp dễ test app độc lập nếu cần.
 */
const app = require("./app.js");
const logger = require("./utils/logger.js");
const config = require("./utils/config.js");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
