const ex = require('express');
const axios = require('axios');
const fetch = require('node-fetch')
const app = ex.Router();
const config = require('../../config');
const apiUrl = config.app.api_url;
const consumetURL = config.app.api_url3

app.get("/:id", async(req, res) => {
try { 
    if(!req.params.id) {
        return res.redirect("/");
    }
    let epData = req.params.id.split("-episode-");
    switch (epData[0]) {
        case "Azumanga-Daiou-THE-ANIMATION":
            epData[0] = "azumanga-daioh"
            break;
        case "AIR":
            epData[0] = "air-tv"
            break;
        case "Boys-Be...":
            epData[0] = "boys-be"
            break;
        case "HUNTER×HUNTER-(2011)":
            epData[0] = "hunter-x-hunter-2011"
            break;
        case "Kita-e.-Diamond-Dust-Drops":
            epData[0] = "diamond-daydreams"
            break;
        case "Maria-sama-ga-Miteru":
            epData[0] = "-maria-sama-ga-miteru-1st"
            break;
        case "Love-Hina-Christmas-Special-Silent-Eve":
            epData[0] = "love-hina-christmas-special"
            break;
        case "GTO":
            epData[0] = "great-teacher-onizuka"
            break;
        case "Happy☆Lesson-(TV)":
            epData[0] = "happy-lesson"
            break;
        case "TEXHNOLYZE":
            epData[0] = "texhnolyze-"
            break;
        case "Appleseed-(Movie)":
            epData[0] = "appleseed"
            break;
        default:
            break;
    }

    let resx = await axios.get(`${consumetURL}consumet/anime/gogoanime/watch/${epData[0]}-episode-${epData[1]}?server=gogocdn`)
    let showDetails = await axios.get(`${consumetURL}consumet/anime/gogoanime/info/${epData[0]}`)
    let showInfo = await showDetails.data
    let info = await resx.data;
    return res.render('watch.ejs', {info:info, apiUrl:consumetURL, showInfo: showInfo});
    } catch(e) {
        // this is where we will check against the blacklist to modify the request and hopefully redirect them to the correct show, thanks consumet
        return res.send("<h1>404! Make an issue on github if this keeps appearing</h1>")
    }
 })

module.exports = app;