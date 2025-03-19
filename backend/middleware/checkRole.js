const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "superadmin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

const isInventory = (req, res, next) => {
  const { role } = req.user;
  if (role !== "inventory") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

const isSales = (req, res, next) => {
  const { role } = req.user;
  if (role !== "sales") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

const isCustomer = (req, res, next) => {
  const { role } = req.user;
  if (role !== "customer") {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};

module.exports = {
  isAdmin,
  isInventory,
  isSales,
  isCustomer,
};
