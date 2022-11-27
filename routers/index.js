const express = require('express')
const app = express.Router();
const axios = require('axios');
const config = require('../config')
const consumetURL = config.app.api_url3
app.get('/', async (req, res) => {
    let loginState;
    let username;
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
try {
    let recentReleases = await axios.get(`${consumetURL}anime/gogoanime/recent-episodes`)
    let recentReleasesData = await recentReleases.data

    let recentReleases2 = await axios.get(`${consumetURL}anime/gogoanime/recent-episodes?page=2`)
    let recentReleases2Data = await recentReleases2.data
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
