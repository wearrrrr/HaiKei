const express = require('express')
var passport = require('passport');
var LocalStrategy = require('passport-local');
const app = express.Router();
var db = require('../db');
var crypto = require('crypto');
const limit = require('express-limit').limit;


app.post('/watchlist/add', (req, res) => {
    try {
        let data = db.get('SELECT * FROM users WHERE username = ?', [ req.user.username ], function(err, row) {
            let itemToPush = req.body.data
            let currentData = row.watchlist
            // {"shows":["k-on"]} FORMAT WE WANT
            let parsed = JSON.parse(currentData)
            if (parsed.results.includes(itemToPush)) {
                parsed.results.push(itemToPush)
                let parsedText = JSON.stringify(parsed)
                db.run(`UPDATE "main"."users" SET "watchlist"=? WHERE "_rowid_"="${row.id}"`, [
                    parsedText
                ])
                // return
            } else {
                parsed.results.push(itemToPush)
                let parsedText = JSON.stringify(parsed)
                db.run(`UPDATE "main"."users" SET "watchlist"=? WHERE "_rowid_"="${row.id}"`, [
                    parsedText
                ])
            }
        });
        setTimeout(() => {
        let returnData = db.get(`SELECT * FROM users WHERE username = ?`, [req.user.username], function(err, row) {
            res.send(row.watchlist)
        })
        }, 1); // i have no clue why i need to do this but updated data doesn't show up without it ;-;

    } catch {
        res.send("not logged in!")
    }
})

module.exports = app