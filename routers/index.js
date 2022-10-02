const express = require('express')
const app = express.Router();
const axios = require('axios');
const apiUrl = "http://localhost:6969/"

app.get('', async (req, res) => {
try {
    return res.render('index.html');
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app
