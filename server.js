const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');
const prompt = require('prompt-sync')({sigint: true});
const config = require("./config.js");

// WIP!
// const devMode = prompt("Enable Developer Mode? Expect WEIRD results!")
// if (devMode == 1) {
//     console.log("dev mode enabled!")
// }

const app = express();
const port = 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.set('views', 'public')
app.listen(port);

app.use('/', require('./routers/index.js'));
app.use('/search', require('./routers/search.js'));
app.use('/trending', require('./routers/trending.js'));
app.use('/releases', require('./routers/releases.js'));
app.use('/genres', require('./routers/genres.js'));

app.use('/watch', require("./routers/anime/watch.js"));

// let init = process.send("Web Server Init!")
