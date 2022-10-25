const express = require('express')
const app = express.Router();

app.get('/', async (req, res) => {
try {
    return res.render('genres.ejs');
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app
