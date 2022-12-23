const ex = require('express');
const axios = require('axios');
const app = ex.Router();
const config = require('../config')

const { ANIME } = require('@consumet/extensions')

const gogoanime = new ANIME.Gogoanime();

const consumetURL = config.app.api_url3
app.get("/", async(req, res) => {
try {
    let searchQuery = req.query.query; // ?query=""
    let query = await gogoanime.search(searchQuery)
    let queryData = query.results
    return res.render('search.ejs', {query: searchQuery, searchData: queryData});
    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app;