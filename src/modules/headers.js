module.exports = (req, res, next) => {
  res.setHeader("X-Powered-By", "Custom Server");

  next();
};
