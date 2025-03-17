const { AppLog } = require("../models");

const logger = async (req, res, next) => {
  try {
    const { user, method, originalUrl, body } = req;

    await AppLog.create({
      userId: user ? user.id : null,
      action: `${method} ${originalUrl}`,
      details: JSON.stringify(body),
    });

    next();
  } catch (error) {
    console.error("Logging error: ", error.message);
    next();
  }
};

module.exports = { logger };
