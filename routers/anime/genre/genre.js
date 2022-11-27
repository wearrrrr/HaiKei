const ex = require('express');
const app = ex.Router();
const axios = require('axios')
const fetch = require('node-fetch')
const config = require('../../../config.js')
const consumetURL = config.app.api_url3

app.get("/:id", async(req, res) => {
  let loginState;
  let username;
try {
    let genreData = req.params.id.split("/genre/")
    genreString = genreData.toString()
    genreData = genreString[0].toUpperCase() + genreString.substring(1);
    // boo! edge cases
    if (genreData.includes('Slice-of-life')) {
        genreData = [ 'Slice of Life' ]
    }
    if (genreData.includes('Magical-girl')) {
        genreData = [ 'Mahou Shoujo' ] // 魔法少女
    }
    if (genreData.includes('Sci-fi')) {
        genreData = [ 'Sci-Fi' ]
    }
    let genreInfo = await axios(`${consumetURL}meta/anilist/advanced-search?genres=["${genreData}"]&sort=["POPULARITY_DESC"]`)
    let genreListing = await genreInfo.data;

    return res.render('genre.ejs', {genre: genreData, listings: genreListing});
    } catch(e) {
        console.log(e);
        return res.status(404).render('error.ejs', {loginState: loginState, username: username})
    }
 })

module.exports = app;