const express = require('express')
const app = express.Router();
const axios = require('axios');
const config = require('../config')
const consumetURL = config.app.api_url3

app.get('/', async (req, res) => {
try {
    let trending = await axios.get(`${consumetURL}consumet/anime/gogoanime/top-airing`)
    let trendingData = await trending.data

    return res.render('trending.ejs', {trending: trendingData});
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app
