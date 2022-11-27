const express = require('express')
const app = express.Router();
const axios = require('axios');

app.get('/', async (req, res) => {
try {
    return res.render('releases.ejs');
    } catch(e) {
        console.log(e);
        return res.render('404.ejs')
    }
 })

module.exports = app
