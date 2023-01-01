const express = require('express')
const app = express.Router();
const axios = require('axios');
const config = require('../config')
const consumetURL = config.app.api_url3

const { ANIME } = require('@consumet/extensions')

const gogoanime = new ANIME.Gogoanime();

app.get('/', async (req, res) => {
const fullUrl = `${req.originalUrl}`;
try {
    let trending = await gogoanime.fetchTopAiring('1')
    let trendingData = await trending.results

    let trending2 = await gogoanime.fetchTopAiring('2')
    let trending2Data = await trending2.results
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    if (loginState == true) { 
        return res.render('trending.ejs', {trending: trendingData, trending2: trending2Data, loginState: loginState, username: username, url: fullUrl});
    } else {
        return res.render('trending.ejs', {trending: trendingData, trending2: trending2Data, loginState: loginState, url: fullUrl});
    }

    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app
