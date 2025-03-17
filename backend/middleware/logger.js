const { AppLog } = require("../models");

const logger = async (req, res, next) => {
  res.on("finish", async () => {
    try {
      const { user, method, originalUrl } = req;
      const status = res.statusCode;

      await AppLog.create({
        userId: user ? user.id : null,
        action: `${method}`,
        details: JSON.stringify({ method, originalUrl, status }),
      });
    } catch (error) {
      console.error("Logging error: ", error.message);
    }
  });

  next();
};

module.exports = { logger };
