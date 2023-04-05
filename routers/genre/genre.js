const ex = require('express');
const app = ex.Router();
const axios = require('axios')
const config = require('../../config.js')
const consumetURL = config.app.api_url3

app.get("/", async(req, res) => {
const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
let loginState;
let username;
try {
    let genreData = req.query.sort
    genreString = genreData.toString()
    genreData = genreString[0].toUpperCase() + genreString.substring(1);
    if (genreData.includes('Slice of life')) {
        genreData = [ 'Slice of Life' ]
    }
    if (genreData.includes('Mahou shoujo')) {
        genreData = [ 'Mahou Shoujo' ] // 魔法少女
    }
    if (genreData.includes('Sci-fi')) {
        genreData = [ 'Sci-Fi' ]
    }
    let genreInfo = await axios(`${consumetURL}meta/anilist/advanced-search?genres=["${genreData}"]&sort=["POPULARITY_DESC"]`)
    let genreListing = await genreInfo.data;
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    if (loginState == true) {
        return res.render('genre.ejs', {genre: genreData, listings: genreListing, username: username, loginState: loginState, url: fullUrl});
    } else {
        return res.render('genre.ejs', {genre: genreData, listings: genreListing, loginState: loginState, url: fullUrl});
    }

    } catch(e) {
        console.log(e);
        return res.status(404).render('error.ejs', {loginState: loginState, username: username, errCode: "Unknown Error has occured!"})
    }
 })

module.exports = app;