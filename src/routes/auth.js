const { Router } = require("express");
const path = require("path");
const authRouter = Router();

const { fb } = require("../modules/Api");

authRouter.param("id", (req, res, next, id) => {
  req.id = id;
  next();
});

authRouter.post("/logout", async (req, res) => {
  const { session } = req.cookies;

  try {
    const result = await fb.logout(session);

    res.clearCookie("session");
    res.status(200).send(result);
  } catch (e) {
    console.log("logout error", e);

    res.status(500).send({ message: "Server error", type: "logout error" });
  }
});

authRouter.post("/loginwith", async (req, res) => {
  if (!req.cookies.session) {
    res.status(401).send({ message: "unauthorized user" });
  }

  try {
    const {
      data,
      cookie: { sessionCookie, cookieOpts },
    } = await fb.loginViaCookie(req.cookies.session);

    res.cookie("session", sessionCookie, cookieOpts);
    res.status(200).send(data);
  } catch (e) {
    console.log("loginWith error", e);
    res.clearCookie("session");
    res.status(500).send({ message: "Server error", type: "loginwith error" });
  }
});

authRouter.post("/update/:id", async (req, res) => {
  try {
    const { id, body } = req;

    switch (id) {
      case "userInfo":
        const result = await fb.updateUser(body);
        res.status(200).send(result);
        break;

      default:
        res.status(404).send({ message: "invalid update case" });
        break;
    }
  } catch (e) {
    console.log("update error", e);

    res.status(500).send({ message: "Server error", type: "update error" });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await fb.createUser(email, password);
    res.status(200).send(result);
  } catch (e) {
    console.log("signin error", e);
    res.status(500).send({ message: "Server error", type: "signin error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const {
      data,
      cookie: { sessionCookie, cookieOpts },
    } = await fb.login(req.body);

    res.cookie("session", sessionCookie, cookieOpts);
    res.status(200).send(data);
  } catch (e) {
    console.log("login error", e);
    res.status(401).send({ message: "Server error", type: "login error" });
  }
});

module.exports = authRouter;
