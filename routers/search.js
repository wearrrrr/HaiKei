const ex = require('express');
const axios = require('axios');
const app = ex.Router();
const config = require('../config')

const { ANIME } = require('@consumet/extensions')

const gogoanime = new ANIME.Gogoanime();

const consumetURL = config.app.api_url3
app.get("/", async(req, res) => {
const fullUrl = `${req.originalUrl}`;
try {
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    let searchQuery = req.query.query;
    let query = await gogoanime.search(searchQuery)
    let queryData = query.results
    if (loginState == true) {
        return res.render('search.ejs', {query: searchQuery, searchData: queryData, url: fullUrl, loginState: loginState, username: username}); 
    } else {
        return res.render('search.ejs', {query: searchQuery, searchData: queryData, url: fullUrl, loginState: loginState});
    }
    
    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app;