module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_LINK);
  res.header("Vary", "Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, CSRF-Token, X-CSRF-Token, set-cookie"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
};
