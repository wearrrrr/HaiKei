const express = require('express')
const app = express.Router();
const axios = require('axios');
const redis = require("redis");
const config = require('../config')
const consumetURL = config.app.api_url3

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.get('/', async (req, res) => {
    let loginState;
    let username;
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    let recentReleasesData;
    let recentReleases2Data;
try {
    const cacheResults = await redisClient.get("recent-episodes");
    const cacheResults2 = await redisClient.get("recent-episodes?page=2")
    if (cacheResults) {
        isCached = true;
        recentReleasesData = JSON.parse(cacheResults);
    } else {
        let recentReleases = await axios.get(`${consumetURL}anime/gogoanime/recent-episodes`)
        recentReleasesData = await recentReleases.data
        await redisClient.set('recent-episodes', JSON.stringify(recentReleasesData), {
            EX: 7200,
            NX: true,
        });
    } 
    if (cacheResults2) {
        isCached = true;
        recentReleases2Data = JSON.parse(cacheResults2);  
    } else {
        let recentReleases2 = await axios.get(`${consumetURL}anime/gogoanime/recent-episodes?page=2`)
        recentReleases2Data = await recentReleases2.data
        await redisClient.set('recent-episodes?page=2', JSON.stringify(recentReleases2Data), {
            EX: 7200,
            NX: true,
        });
    }

    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    if (loginState == true) {
        return res.render('index.ejs', {recentReleases: recentReleasesData, recentReleases2: recentReleases2Data, username: username, loginState: loginState, url: fullUrl});
    } else {
        return res.render('index.ejs', {recentReleases: recentReleasesData, recentReleases2: recentReleases2Data, loginState: loginState, url: fullUrl});
    }

    } catch(e) {
        console.log(e);
        return res.status(404).render('error.ejs', {loginState: loginState})
    }
 })

 app.get('/anime/:id', async (req, res) => {
    res.redirect('/watch/' + req.params.id + '-episode-1')
 })

module.exports = app
