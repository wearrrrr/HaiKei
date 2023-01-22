const express = require('express')
var passport = require('passport');
var LocalStrategy = require('passport-local');
const app = express.Router();
var db = require('../db');
var crypto = require('crypto');
const { parse } = require('path');
const limit = require('express-limit').limit;


app.post('/watchlist/add', (req, res) => {
    try {
        let data = db.get('SELECT * FROM users WHERE username = ?', [ req.user.username ], function(err, row) {
            let itemToPush = req.body.data
            let currentData = row.watchlist
            let parsed = JSON.parse(currentData)
            if (parsed.results.includes(itemToPush)) {
                return
            } else {
                parsed.results.push(itemToPush)
                let parsedText = JSON.stringify(parsed)
                db.run(`UPDATE "main"."users" SET "watchlist"=? WHERE "_rowid_"=?`, [
                    parsedText,
                    row.id
                ])
            }
        });
        setTimeout(() => {
        let returnData = db.get(`SELECT * FROM users WHERE username = ?`, [req.user.username], function(err, row) {
            res.send("Success")
        })
        }, 1);

    } catch {
        res.send("not logged in!")
    }
})

app.post("/watchlist/remove", (req, res) => {
    try {
        let data = db.get('SELECT * FROM users WHERE username = ?', [req.user.username], function(err, row) {
            let parsedData = JSON.parse(row.watchlist)

            let idToRemove = req.body.id.toString();

            let newResults = parsedData.results.filter(result => {
                let jsonResult = JSON.parse(result);
                return jsonResult.id !== idToRemove;
              });
              
              if(newResults.length === parsedData.results.length){
                res.send("Watchlist is empty already!")
              }else{
                let newResponse = {
                  "results": newResults
                };
                let parsedText = JSON.stringify(newResponse)
                db.run(`UPDATE "main"."users" SET "watchlist"=? WHERE "_rowid_"=?`, [
                  parsedText,
                  row.id
                ])
                res.send("Success!")
              }
            })
    } catch(err) {
        res.send("Error!")
    }
})

module.exports = app