const express = require('express')
const app = express.Router();
const axios = require('axios');
const redis = require("redis");
const config = require('../config')
const consumetURL = config.app.api_url3

const { META } = require('@consumet/extensions')
const anilist = new META.Anilist();

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.get('/', async (req, res) => {
    let loginState;
    let username;
    let user;
    const fullUrl = `${req.originalUrl}`;
    let trendingAnimeData;
    let recentReleasesData;
try {
    const cacheResults = await redisClient.get("trending-anime");
    const recentReleasesCache = await redisClient.get('recent-releases')
    if (cacheResults) {
        trendingAnimeData = JSON.parse(cacheResults);
    } else {
        let trendingAnime = await anilist.fetchTrendingAnime();
        trendingAnimeData = await trendingAnime.results
        await redisClient.set('trending-anime', JSON.stringify(trendingAnimeData), {
            EX: 3600,
            NX: true,
        });
    } 
    if (recentReleasesCache) {
        recentReleasesData = JSON.parse(recentReleasesCache);
    } else {
        let recentReleases = await anilist.fetchRecentEpisodes();
        recentReleasesData = await recentReleases.results
        await redisClient.set('recent-releases', JSON.stringify(recentReleasesData), {
            EX: 1800,
            NX: true,
        });
    }

    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
        user = req.user
    }
    if (loginState == true) {
        return res.render('index.ejs', {trendingAnime: trendingAnimeData, recentReleases: recentReleasesData, username: username, user: user, loginState: loginState, url: fullUrl});
    } else {
        return res.render('index.ejs', {trendingAnime: trendingAnimeData, recentReleases: recentReleasesData, loginState: loginState, url: fullUrl});
    }

    } catch(e) {
        console.log(e);
        return res.status(404).render('error.ejs', {loginState: loginState, errCode: "Failed to fetch trending anime!"})
    }
 })

 app.get('/anime/:id', async (req, res) => {
    res.redirect('/watch/' + req.params.id + '-episode-1')
 })

 app.get('/donate', async (req, res) => {
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    if (loginState == true) {
        return res.render('donate.ejs', {loginState: loginState, username: username})
    } else {
        return res.render('donate.ejs', {loginState: loginState})
    }
 })

 app.get('/contribute', async (req, res) => {
    if (req.user == undefined) {
        loginState = false
    } else {
        loginState = true
        username = req.username
    }
    if (loginState == true) {
        return res.render('contribute.ejs', {loginState: loginState, username: username})
    } else {
        return res.render('contribute.ejs', {loginState: loginState})
    }
 })

 app.get('/error', async (req, res) => {
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
        user = req.user
    }
    if (loginState == true) {
        return res.render('error.ejs', {loginState: loginState, username: username, errCode: "N/A"})
    } else {
        return res.render('error.ejs', {loginState: loginState, errCode: "N/A"})
    }
 })

module.exports = app
