const express = require('express')
const app = express.Router();
const axios = require('axios');
const config = require('../config')
const consumetURL = config.app.api_url3

app.get('/', async (req, res) => {
try {
    let allDat = await axios.get('https://animeapi.up.railway.app/animix/all')
    let allData = allDat.data

    return res.render('anime.ejs', {animeData: allData});
    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app
