module.exports = (req, res, next) => {
  console.log("all");
  const token = req.csrfToken();

  res.cookie("XSRF-TOKEN", token, {
    secure: true,
    sameSite: "strict",
  });

  res.locals.csrf = token;
  next();
};
