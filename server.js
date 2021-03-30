const express = require("express");
const path = require("path");
// const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const config = require("config");
const coockieParser = require("cookie-parser");
const csrf = require("csurf");

const customHeaders = require("./src/modules/headers");
const setToken = require("./src/modules/tokenRefresh");
const cors = require("./src/modules/cors");
const moviesRouter = require("./src/routes/movies");
const authRouter = require("./src/routes/auth");

const app = express();

app.disable("x-powered-by");
app.use(customHeaders);

const csrfProtection = csrf({
  cookie: true,
  /*
  // prod
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
  */
});

const PORT = +process.env.PORT || config.get("serverPort");

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(coockieParser());
app.use(csrfProtection);

// ==========================
const options = {
  dotfiles: "ignore",
  extensions: ["htm", "html"],
  redirect: false,
};

app.use(
  "/",
  setToken,
  express.static(path.join(__dirname, "client", "build"), options)
);

// ==========================

/*
// prod

if (process.env.NODE_ENV === "production") {
  const options = {
    dotfiles: "ignore",
    extensions: ["htm", "html"],
    redirect: false,
  };

  app.use(
    "/",
    setToken,
    express.static(path.join(__dirname, "client", "build"), options)
  );
  app.use(favicon(path.resolve(__dirname, "client", "build", "favicon.ico")));
}
*/

app.all("*", csrfProtection, setToken);
app.use("/movies", csrfProtection, moviesRouter);
app.use("/auth", csrfProtection, authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server started");
});
