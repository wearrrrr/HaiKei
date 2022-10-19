const ex = require('express');
const app = ex.Router();
const axios = require('axios')
const fetch = require('node-fetch')

app.get("/:id", async(req, res) => {
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
    let genreInfo = await axios(`http://localhost:8080/consumet/meta/anilist/genre?genres=["${genreData}"]`)
    let genreListing = await genreInfo.data;

    return res.render('genre.ejs', {genre: genreData, listings: genreListing});
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app;