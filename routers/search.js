const ex = require('express');
const axios = require('axios');
const app = ex.Router();
const config = require('../config')

const consumetURL = config.app.api_url3
app.get("/", async(req, res) => {
try {
    let searchQuery = req.query.query; // ?query=""
    let queryResults = await axios.get(`${consumetURL}anime/gogoanime/${searchQuery}`)
    let queryData = await queryResults.data
    return res.render('search.ejs', {query: searchQuery, searchData: queryData});
    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app;