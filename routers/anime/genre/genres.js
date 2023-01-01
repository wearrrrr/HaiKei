const express = require('express')
const app = express.Router();

app.get('/', async (req, res) => {
try {
    const fullUrl = `${req.originalUrl}`;
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    if (loginState == true) { 
        return res.render('genres.ejs', {loginState: loginState, url: fullUrl, username: username});
    } else {
        return res.render('genres.ejs', {loginState: loginState, url: fullUrl});
    }

    } catch(e) {
        console.log(e);
        return res.render('error.ejs', {errCode: "Server error!"})
    }
 })

module.exports = app
