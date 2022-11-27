const express = require('express')
const app = express.Router();
const axios = require('axios');
const config = require('../config')
const consumetURL = config.app.api_url3

app.get('/', async (req, res) => {
try {
    let trending = await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    let trendingData = await trending.data

    let trending2 = await axios.get(`${consumetURL}anime/gogoanime/top-airing?page=2`)
    let trending2Data = await trending2.data

    return res.render('trending.ejs', {trending: trendingData, trending2: trending2Data});
    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app
