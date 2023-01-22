const express = require("express");
const app = express.Router();
const ANIME = require("@consumet/extensions").ANIME;
const gogoanime = new ANIME.Gogoanime();

app.get("/", async (req, res) => {
  try {
    let trending = await gogoanime.fetchTopAiring("1");
    let trendingData = await trending.results;
    let trending2 = await gogoanime.fetchTopAiring("2");
    let trending2Data = await trending2.results;
    let loginState = req.user ? true : false;
    let username = req.user ? req.user.username : null;
    let url = req.originalUrl;

    res.render("trending.ejs", {
        trending: trendingData,
        trending2: trending2Data,
        loginState: loginState,
        username: username,
        url: url,
    });
  } catch (e) {
    console.log(e);
    res.render("404.ejs");
  }
});

module.exports = app;
