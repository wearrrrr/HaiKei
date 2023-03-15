const ex = require("express");
const axios = require("axios");
const redis = require("redis");
const config = require('../../config');
const app = ex.Router();
const consumetURL = config.app.api_url3

const { ANIME } = require('@consumet/extensions')

const zoro = new ANIME.Zoro();

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: process.env.REDIS_URL,
    });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();
async function handleMalformedURL(req, res) {
    if (isNaN(req.params.id)) {
        return res.send("ID is not a number!")
    }
    try {
        return res.redirect(`/watch/${req.params.id}/1`)
    } catch {
        return res.send("Malformed URL!")
    }

}
async function getTrending() {
    try {
        let trending = await axios.get(`${consumetURL}meta/anilist/trending`)
        let trendingData = await trending.data
        return trendingData
    } catch(e) {
        console.log(e)
    }

}
async function getShowInfo(showID) {
    try {
        let showInfo = await axios.get(`https://api.consumet.org/meta/anilist/info/${showID}`)
        let showData = await showInfo.data
        return showData
    } catch(e) {
        console.log(e)
    }

}
async function getRecommended(genre) {
    try {
        let recommended = await axios.get(`${consumetURL}meta/anilist/advanced-search?genres=["${genre}"]`)
        let recData = await recommended.data
        return recData
    } catch(e) {
        console.log(e)
    }
}
async function getSources(ID) {
    try {
        let availableSources = [];
        let showIds = {
            sources: []
        };
        let id = ID

        let malSync = await axios.get(`https://api.malsync.moe/mal/anime/${id}`)
        let malSyncData = await malSync.data

        let zoroData = await malSyncData.Sites.Zoro
        let gogoData = await malSyncData.Sites.Gogoanime
        let marinData = await malSyncData.Sites.Marin
        let animepaheData = await malSyncData.Sites.animepahe
        let nineanimeData = await malSyncData.Sites["9anime"] // javascript moment
        if (zoroData !== undefined) {
            availableSources.push("Zoro")
            Object.getOwnPropertyNames(zoroData).forEach(function (val, idx, array) {
                showIds.sources.push({"data": zoroData[val].url.slice(16), "source": "Zoro"})
            });
        }
        if (gogoData !== undefined) { 
            availableSources.push("Gogoanime")
            Object.getOwnPropertyNames(gogoData).forEach(function (val, idx, array) {
                if (gogoData[val].identifier.slice(-4) == "-dub") {
                    showIds.sources.push({"data": gogoData[val].identifier, "source": "Gogoanime (Dub)"})
                    return
                }
                showIds.sources.push({"data": gogoData[val].identifier, "source": "Gogoanime"})
            });
        }
        if (marinData !== undefined) {
            // availableSources.push("Marin") 
            // Object.getOwnPropertyNames(tenshiData).forEach(function (val, idx, array) {
            //     showIds.sources.push({"data": tenshiData[val].identifier, "source": "Tenshi"})
            // });
        }
        if (animepaheData !== undefined) { 
            availableSources.push("Animepahe")
            Object.getOwnPropertyNames(animepaheData).forEach(function (val, idx, array) {
                showIds.sources.push({"data": animepaheData[val].identifier, "source": "Animepahe"})
            });
        }
        // if (nineanimeData !== undefined) {
        //     availableSources.push("9anime") // do nothing because 9anime cannot be used as a source quite yet. :(
        // }
        let sources = showIds

        return sources

    } catch(err) {
        console.log(err)
    }
}
async function getWatchData(req, res) {
    const watch_dblink = req.params.id
    const trending_dblink = "trending"
    const info_dblink = req.params.id + "/info"

    let sources;
    let trending;
    let showInfo;

    try {
        if (isNaN(req.params.id)) {
            return res.send("ID is not a number!")
        }
        const watchResults = await redisClient.get(watch_dblink);
        const trendingResults = await redisClient.get(trending_dblink);
        const showInfoResults = await redisClient.get(info_dblink);
        if (trendingResults) {
            trending = JSON.parse(trendingResults)
        } else {
            trending = await getTrending()
            await redisClient.set(trending_dblink, JSON.stringify(trending), {
                EX: 5400,
                NX: true,
            });
        }
        if (showInfoResults) {
            showInfo = JSON.parse(showInfoResults)
        } else {
            showInfo = await getShowInfo(req.params.id)
            await redisClient.set(info_dblink, JSON.stringify(showInfo), {
                EX: 32400,
                NX: true,
            });
        }
        if (watchResults) {
            sources = JSON.parse(watchResults)
        } else {
            sources = await getSources(showInfo.malId)
            await redisClient.set(watch_dblink, JSON.stringify(sources), {
                EX: 5400,
                NX: true,
            });
        }
        const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        let showID = req.params.id
        let episode = req.params.episode
        let recommendedGenre = await showInfo.genres[0]
        let recommended = await getRecommended(recommendedGenre)

        
        if (req.user == undefined) {
            loginState = false;
            username = undefined
        } else {
            loginState = true;
            username = req.user.username
        }

        res.render("watch.ejs", {id: showID, sources: sources, trending: trending, showInfo: showInfo, recommended: recommended, downloadUrl: undefined, episode: episode, loginState: loginState, username: username, url: fullUrl})
    } catch(err) {
        console.log(err)
        res.render('error.ejs', {loginState: loginState, username: username, errCode: "Failed to get episode data! Show likely doesn't exist."})
    }
}


app.get("/:id/:episode", getWatchData);
app.get("/:id", handleMalformedURL)

module.exports = app;
