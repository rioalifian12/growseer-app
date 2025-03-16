const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "superadmin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

const isInventoryAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "inventory") {
    return res.status(403).json({
      message: "Access denied only",
    });
  }
  next();
};

const isSalesAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "sales") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

module.exports = {
  isAdmin,
  isInventoryAdmin,
  isSalesAdmin,
};
