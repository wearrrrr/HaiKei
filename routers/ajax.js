// yes i still use ajax :)
const express = require('express');
const app = express.Router();
const { META } = require('@consumet/extensions')
const { ANIME } = require('@consumet/extensions')
const anilist = new META.Anilist()
const gogoanime = new ANIME.Gogoanime()
const zoro = new ANIME.Zoro()
const animepahe = new ANIME.AnimePahe()

app.post("/search", (req, res) => {
    let search = req.body.search;
    try {
        anilist.search(search).then(data => {
            res.send(data)
        })
    } catch (e) {
        res.status(500).send("Internal server error!")
    }
})

const allowedPlatforms = ["gogoanime", "zoro", "animepahe"]

app.post("/source", async (req, res) => {
    let sourceID = req.body.sourceID;
    let sourceName = req.body.sourceName;
    try {
        if (!allowedPlatforms.includes(sourceName)) {
            res.status(403).send("Access denied!")
        }
        if (sourceName == "gogoanime") {
            await gogoanime.fetchEpisodeSources(sourceID).then(data => {
                res.send(data)
            })
        } else {

        }
        if (sourceName == "zoro") {
            await zoro.fetchAnimeInfo(sourceID).then(data => {
                res.send(data)
            })
        } else {

        }
        if (sourceName == "animepahe") {
            await animepahe.fetchEpisodeSources(sourceID).then(data => {
                res.send(data)
            })
        } else {

        }
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error!")
    }
})

module.exports = app;