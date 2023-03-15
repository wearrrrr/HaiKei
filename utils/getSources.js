const axios = require('axios')
const { META } = require('@consumet/extensions')
const anilist = new META.Anilist();
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
        if (zoroData !== undefined) {
            availableSources.push("Zoro")
            Object.getOwnPropertyNames(zoroData).forEach(function (val, idx, array) {
                showIds.sources.push({"data": zoroData[val].url.slice(16), "source": "Zoro"})
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

async function getShowInfo(ID) {
    try {
        let showInfo = await axios.get(`https://api.haikei.xyz/meta/anilist/info/${ID}`)
        let showData = await showInfo.data
        return showData
    } catch(e) {
        console.log(e)
    }
}

async function getVideoSourcesGogoanime(videoID, videoEpisode) {
    try {
        let videoSources = await axios.get(`https://api.haikei.xyz/anime/gogoanime/watch/${videoID}`)
        let videoData = await videoSources.data
        return videoData
    } catch(e) {
        console.log(e)
    }
}

async function getVideoSourcesZoro(episodeID, episodeNumber) {
    try {
        let url = `https://api.haikei.xyz/anime/zoro/info?id=${episodeID}`
        console.log(url)
        let videoSources = await axios.get(url)
        let videoData = await videoSources.data
        let requestedEpisode = videoData.episodes[Number(episodeNumber) - 1]
        let requestURL = await axios.get("https://api.haikei.xyz/anime/zoro/watch?episodeId=" + requestedEpisode.id)
        await requestURL.data
        return requestURL.data
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    getSources,
    getShowInfo,
    getVideoSourcesGogoanime,
    getVideoSourcesZoro,
}