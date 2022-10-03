const ex = require('express');
const axios = require('axios');
const app = ex.Router();

const apiUrl = "http://localhost:3001"
app.get("/", async(req, res) => {
try {
    let searchQuery = req.query.query; // ?query=""
    let queryResults = await axios.get(`${apiUrl}/search?keyw=${searchQuery}`)
    let queryData = await queryResults.data
    return res.render('search.ejs', {query: searchQuery, searchData: queryData});
    } catch(e) {
        console.log(e);
        return res.send("<h1> 404 </h1>")
    }
 })

module.exports = app;