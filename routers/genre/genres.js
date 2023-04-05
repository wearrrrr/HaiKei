const express = require('express')
const app = express.Router();
const axios = require('axios')

app.get('/', async (req, res) => {
try {
    const fullUrl = `${req.originalUrl}`;
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    let genreListData;
    try {
        let genreList = await axios.get(process.env.WEBSITE_URL + "/genres.json")
        genreListData = await genreList.data
    } catch(err) {
        try {
            let genreList = await axios.get("/genres.json")
            genreListData = await genreList.data
        } catch (err) {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        }
    }

    if (loginState == true) { 
        return res.render('genres.ejs', {loginState: loginState, url: fullUrl, username: username, genreData: genreListData});
    } else {
        return res.render('genres.ejs', {loginState: loginState, url: fullUrl, genreData: genreListData});
    }
    } catch(e) {
        console.log(e);
        return res.render('error.ejs', {errCode: "Server error!"})
    }
 })

module.exports = app
