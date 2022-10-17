const ex = require('express');
const axios = require('axios');
const fetch = require('node-fetch')
const app = ex.Router();
const config = require('../../config');
const apiUrl = config.app.api_url;

app.get("/:id", async(req, res) => {
try { 
    if(!req.params.id) {
        return res.redirect("/");
    }
    let epData = req.params.id.split("-episode-");

    let resx = await axios.get(apiUrl +"api/watching/" + epData[0] + "/" + epData[1]);
    let showDetails = await axios.get(apiUrl +"api/details/" + epData[0])
    let showInfo = await showDetails.data
//  console.log(showInfo.results[0].title) use showInfo.results[0] to extract data from the request!
    let info = await resx.data;
    return res.render('watch.ejs', {info:info, apiUrl:apiUrl, epData: epData, title: showInfo.results[0].title});
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app;