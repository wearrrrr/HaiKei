const express = require('express')
const app = express.Router();
var db = require('../db');

app.get('/', async (req, res) => {
try {
    const fullUrl = `${req.originalUrl}`;
    let data = db.get(`SELECT watchlist FROM users WHERE username = ?`, [req.user.username], function(err, row) {
        let watchlistData = row.watchlist
        if (req.user == undefined) {
            loginState = false;
        } else {
            loginState = true;
            username = req.user.username
            user = req.user
        }
        if (loginState == true) { 
            return res.render("watchlist.ejs", {watchlist: watchlistData, loginState: loginState, username: username, url: fullUrl})
        } else {
            return res.render("watchlist.ejs", {watchlist: watchlistData, loginState: loginState, url: fullUrl})
        }

    })
    } catch(e) {
        let loginState;
        if (req.user == undefined) {
            loginState = false;
        } else {
            loginState = true;
            username = req.user.username
            user = req.user
        }
        return res.render('error.ejs', {loginState: loginState, errCode: "You must be logged in to access your watchlist!"})
    }
 })

module.exports = app
