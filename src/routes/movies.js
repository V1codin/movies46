const { Router } = require("express");
const path = require("path");
const moviesRouter = Router();
const { mb } = require("../modules/Api");

moviesRouter.param("id", (req, res, next, id) => {
  req.movie = {
    id,
  };
  next();
});

moviesRouter.post("/single/:id", async (req, res) => {
  try {
    const {
      movie: { id },
    } = req;

    const result = await mb.getSingleMovie(id);

    res.status(200).send(result);
  } catch (e) {
    console.log("get single movie error", e);
    res
      .status(500)
      .send({ message: e.message, type: "get single movie error" });
  }
});

moviesRouter.post("/pop", async (req, res) => {
  try {
    const { page } = req.body;
    const movies = await mb.getListByPopularity(page);
    const result = await movies.json();
    res.status(200).send(result);
  } catch (e) {
    console.log("getListByPopularity error", e);
    res
      .status(500)
      .send({ message: e.message, type: "getListByPopularity error" });
  }
});

moviesRouter.post("/rate", async (req, res) => {
  try {
    const { page } = req.body;
    const movies = await mb.getListByRating(page);
    const result = await movies.json();
    res.status(200).send(result);
  } catch (e) {
    console.log("getListByRating error", e);
    res.status(500).send({ message: e.message, type: "getListByRating error" });
  }
});

moviesRouter.post("/search", async (req, res) => {
  try {
    const { page, searchValue } = await req.body;
    const movies = await mb.getListFromSearch(searchValue, page);
    const result = await movies.json();
    res.status(200).send(result);
  } catch (e) {
    console.log("getListFromSearch error", e);
    res
      .status(500)
      .send({ message: e.message, type: "getListFromSearch error" });
  }
});

module.exports = moviesRouter;
