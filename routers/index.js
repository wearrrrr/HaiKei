const express = require('express')
const app = express.Router();
const axios = require('axios');
const config = require('../config')
const consumetURL = config.app.api_url3

app.get('', async (req, res) => {
try {
    let recentReleases = await axios.get(`${consumetURL}consumet/anime/gogoanime/recent-episodes`)
    let recentReleasesData = await recentReleases.data
    // console.log(recentReleasesData)


    return res.render('index.ejs', {recentReleases: recentReleasesData});
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app
