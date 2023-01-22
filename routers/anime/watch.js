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
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function fetchApiData(watch, serverToUse) {
    switch (epData[0]) {
        case "Gintama.-Shirogane-no-Tamashii-hen---Kouhan-sen":
            epData[0] = "gintama-shirogane-no-tamashii-hen-2"
        break;
        case "Shoujo-Kageki-Revue-Starlight-Movie":
            epData[0] = "shoujokageki-revue-starlight-movie"
        break;
        case "Azumanga-Daiou-THE-ANIMATION":
            epData[0] = "azumanga-daioh"
            break;
        case "AIR":
            epData[0] = "air-tv"
            break;
        case "Boys-Be...":
            epData[0] = "boys-be"
            break;
        case "HUNTER×HUNTER-(2011)":
            epData[0] = "hunter-x-hunter-2011"
            break;
        case "Kita-e.-Diamond-Dust-Drops":
            epData[0] = "diamond-daydreams"
            break;
        case "Maria-sama-ga-Miteru":
            epData[0] = "-maria-sama-ga-miteru-1st"
            break;
        case "Love-Hina-Christmas-Special-Silent-Eve":
            epData[0] = "love-hina-christmas-special"
            break;
        case "GTO":
            epData[0] = "great-teacher-onizuka"
            break;
        case "Happy☆Lesson-(TV)":
            epData[0] = "happy-lesson"
            break;
        case "TEXHNOLYZE":
            epData[0] = "texhnolyze-"
            break;
        case "Appleseed-(Movie)":
            epData[0] = "appleseed"
            break;
        case "Koe-no-Katachi":
            epData[0] = "koe-no-katachi-movie"
            break;
        case "Kaguya-sama-wa-Kokurasetai-Tensaitachi-no-Renai-Zunousen":
            epData[0] = "kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen"
            break;
        case "Ano-Hi-Mita-Hana-no-Namae-wo-Bokutachi-wa-Mada-Shiranai":
            epData[0] = "anohana"
            break;
        case "SPY×FAMILY":
            epData[0] = "spy-x-family"
            break;
        case "Kobayashi-san-Chi-no-Maidragon":
            epData[0] = "kobayashi-san-chi-no-maid-dragon"
            break;
        case "Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru":
            epData[0] = "yahari-ore-no-seishun-love-comedy-wa-machigatteiru"
            break;
        case "Saiki-Kusuo-no-Ψ-nan":
            epData[0] = "saiki-kusuo-no-ps-nan"
            break;
        case "Mahou-Shoujo-Madoka-Magica-Hangyaku-no-Monogatari":
            epData[0] = "mahou-shoujo-madoka-magica-movie-3-rebellion"
            break;
        case "Bishoujo-Senshi-Sailor-Moon":
            epData[0] = "sailor-moon-r-the-movie"
            break;
        case "Cardcaptor-Sakura":
            epData[0] = "card-captor-sakura"
            break;
        case "Fatekaleid-liner-Prisma-Illya":
            epData[0] = "fate-kaleid-liner-prisma-illya-"
            break;
        case "flip-flappers":
            epData[0] = "flip-flappers-dub" // because the original isn't working ¯\_(ツ)_/¯
            break;
        case "another":
            epData[0] = "another-anime"
            break;
        case "Code-Geass-Hangyaku-no-Lelouch":
            epData[0] = "code-geass-lelouch-of-the-rebellion"
            break;
        case "Code-Geass-Hangyaku-no-Lelouch-R2":
            epData[0] = "-code-geass-lelouch-of-the-rebellion-r2"
            break;
        case "Tengen-Toppa-Gurren-Lagann":
            epData[0] = "tengen-toppa-gurren-lagann-"
            break;
        case "Shin-Seiki-Evangelion-Movie-Air--Magokoro-wo,-Kimi-ni":
            epData[0] = "evangelion-the-end-of-evangelion"
        case "86-Eighty-Six":
            epData[0] = "86"
            break;
        case "86-Eighty-Six-Part-2":
            epData[0] = "86-2nd-season"
        case "FLCL": 
            epData[0] = "fooly-cooly"
            break;
        case "Shin-Seiki-Evangelion":  // Zankoku na tenshi no you ni, Shounen yo shinwa ni nare *evangelion blares in the background*
            epData[0] = "neon-genesis-evangelion-"
            break;
        case "Evangelion-Shin-Movie-Jo":
            epData[0] = "evangelion-10-you-are-not-alone"
            break;
        case "Evangelion-Shin-Movie-Ha":
            epData[0] = "evangelion-20-you-can-not-advance"
            break;
        case "Evangelion-Shin-Movie-Kyuu":
            epData[0] = "evangelion-30-you-can-not-redo-movie"
            break;
        case "IS-Infinite-Stratos":
            epData[0] = "infinite-stratos"
        case "Boku-no-Hero-Academia-2": 
            epData[0] = "boku-no-hero-academia-2nd-season"
            break;
        case "Boku-no-Hero-Academia-3":
            epData[0] = "boku-no-hero-academia-3rd-season"
            break;
        case "Boku-no-Hero-Academia-4":
            epData[0] = "boku-no-hero-academia-4th-season"
            break;
        case "Boku-no-Hero-Academia-5":
            epData[0] = "boku-no-hero-academia-5th-season"
            break;
        case "Boku-no-Hero-Academia-6":
            epData[0] = "boku-no-hero-academia-6th-season"
            break;
        case "Kono-Subarashii-Sekai-ni-Shukufuku-wo":
            epData[0] = "kono-subarashii-sekai-ni-shukufuku-wo-"
            break;
        case "Ansatsu-Kyoushitsu": 
            epData[0] = "ansatsu-kyoushitsu-tv-dub"
            break;
        case "Gakuen-Mokushiroku-HIGHSCHOOL-OF-THE-DEAD":
            epData[0] = "highschool-of-the-dead"
            break;
        case "Kangoku-Gakuen":
            epData[0] = "prison-school"
            break;
        case "Mushoku-Tensei-Isekai-Ittara-Honki-Dasu-Part-2":
            epData[0] = "mushoku-tensei-isekai-ittara-honki-dasu-2nd-season"
            break;
        case "Shingeki-no-Kyojin-2":
            epData[0] = "shingeki-no-kyojin-season-2"
            break;
        case "Shingeki-no-Kyojin-3":
            epData[0] = "shingeki-no-kyojin-season-3"
            break;
        case "Shingeki-no-Kyojin-3-Part-2":
            epData[0] = "shingeki-no-kyojin-season-3"
            break;
        case "Shingeki-no-Kyojin-The-Final-Season":
            epData[0] = "shingeki-no-kyojin-the-final-season"
            break;
        case "NARUTO-Shippuuden":
            epData[0] = "naruto-shippuden"
            break;
        case "Hagane-no-Renkinjutsushi-FULLMETAL-ALCHEMIST":
            epData[0] = "fullmetal-alchemist-brotherhood"
            break;
        case "SSSSGRIDMAN":
            epData[0] = "ssss-gridman"
            break;
        case "Zombie-Land-Saga":
            epData[0] = "zombieland-saga"
            break;
        case "takt-opDestiny":
            epData[0] = "takt-op-destiny"
            break;
        case "Carole-&-Tuesday":
            epData[0] = "carole-tuesday"
            break;
        case "Kokoro-ga-Sakebitagatterun-da":
            epData[0] = "kokoro-ga-sakebitagatterunda"
            break;
        case "Sen-to-Chihiro-no-Kamikakushi":
            epData[0] = "spirited-away"
            break;
        case "Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatteiru-Darou-ka":
            epData[0] = "dungeon-ni-deai-o-motomeru-no-wa-machigatte-iru-darouka"
            break;
        case "Haikyuu-2nd-Season":
            epData[0] = "haikyuu-second-season"
            break;
        case "Kuroko-no-Basket":
            epData[0] = "kuroko-no-baske"
            break;
        case "Kuroko-no-Basket-2nd-Season":
            epData[0] = "kuroko-basuke-2"
            break;
        case "Haikyuu-TO-THE-TOP-2":
            epData[0] = "haikyuu-to-the-top-2nd-season"
            break;
        case "Yuuri-on-ICE":
            epData[0] = "yuri-on-ice"
            break;
        case "Free": 
            epData[0] = "free-"
            break;
        case "Kuroko-no-Basket-3rd-Season":
            epData[0] = "kuroko-no-basket-3rd-season"
            break;
        case "Hajime-no-Ippo-THE-FIGHTING":
            epData[0] = "hajime-no-ippo-"
            break;
        case "Ao-no-Exorcist":
            epData[0] = "ao-no-exorcist-"
            break;
        case "JoJo-no-Kimyou-na-Bouken-(TV)":
            epData[0] = "jojos-bizarre-adventure"
            break;
        case "Gintama°":
            epData[0] = "gintama-2015-"
            break;
        case "Gintama.":
            epData[0] = "gintama-2017"
            break;
        case "Modao-Zushi-3":
            epData[0] = "mo-dao-zu-shi-3rd-season"
            break;
        default:
            break;
    }
    let apiResponse
    if (serverToUse == "vidstreaming") {
        apiResponse = await axios.get(`${consumetURL}anime/gogoanime/watch/${epData[0]}-episode-${epData[1]}?server=vidstreaming`);
    } else {
        apiResponse = await axios.get(`${consumetURL}anime/gogoanime/watch/${epData[0]}-episode-${epData[1]}`);
    }
  
  return apiResponse.data;
}
async function handleMalformedURL(req, res) {
    res.redirect(`/watch/${req.params.id}/1`)
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
        let showInfo = await axios.get(`https://api.consumet.org/meta/mal/info/${showID}`)
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
        let tenshiData = await malSyncData.Sites.Tenshi
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
        if (tenshiData !== undefined) {
            availableSources.push("Tenshi") // we also do nothing because tenshi isn't in a public API form yet.
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
        if (nineanimeData !== undefined) {
            availableSources.push("9anime") // do nothing because 9anime cannot be used as a source quite yet. :(
        }
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
        const watchResults = await redisClient.get(watch_dblink);
        const trendingResults = await redisClient.get(trending_dblink);
        const showInfoResults = await redisClient.get(info_dblink);
        if (watchResults) {
            sources = JSON.parse(watchResults)
        } else {
            sources = await getSources(req.params.id)
            await redisClient.set(watch_dblink, JSON.stringify(sources), {
                EX: 5400,
                NX: true,
            });
        }
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
            if (showInfo.genres[0] == undefined) {
                recommendedGenre = "Action" // fallback to action shows if genre is undefined (somehow)
            }
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

let epData;
let searchRes;
let infoRes
let episodeSelected;
let watchRes;
let loginState;
let username;
let recommendedData;
let trendingData;
async function getWatchDataZoroNew(req, res) {
// i am going to burn this code to the ground
// do not replicate this code please for the love of god
try {
let malsyncRequest = await axios.get(`https://api.malsync.moe/mal/anime/${req.params.id}`)
let malsyncData = await malsyncRequest.data
let zoroData = await malsyncData.Sites.Zoro
const keys = Object.keys(zoroData);
const array = keys.map(key => ({ key: key, value: zoroData[key] }));
let showData;
// console.log(array[0].value.identifier)
zoro.fetchAnimeInfo(array[0].value.url.slice(16)).then(data => {
    // episode 1
    showData = data 
    zoro.fetchEpisodeSources(data.episodes[0].id).then(async data => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    epData = req.params.id.split('-episode-'); 
    const trendingReq = await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    trendingData = await trendingReq.data
    recommendedInfo = await axios.get(`${consumetURL}anime/gogoanime/genre/action?page=3`)
    recommendedData = await recommendedInfo.data.results
        if (req.user == undefined) {
                loginState = false;
        } else {
                loginState = true;
                username = req.user.username
        }
        if (loginState == true) {
            res.render('watch_zoro.ejs', {data: data, epData: array[0].value.identifier, recommended: recommendedData, showInfo: showData, loginState: loginState, username: username, url: fullUrl, trending: trendingData});
        } else {
            res.render('watch_zoro.ejs', {data: data, epData: array[0].value.identifier, recommended: recommendedData, showInfo: showData, loginState: loginState, url: fullUrl, trending: trendingData});
        }
    })
})
} catch(err) {
    res.send(err)
}
}
async function getWatchDataZoro(req, res) {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    epData = req.params.id.split('-episode-');  
try {
    const [searchReq, showInformation, trending] = await Promise.all([
        await axios.get(`${consumetURL}anime/zoro/${epData[0]}`),
        await axios.get(`${consumetURL}anime/gogoanime/info/${epData[0]}`),
        await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    ]);


    searchRes = searchReq.data
    showInfo = showInformation.data
    const [infoReq , recommendedInfo] = await Promise.all([
        await axios.get(`${consumetURL}anime/zoro/info?id=${searchRes.results[(epData[0] == "one-piece" ? 1 : 0)].id}`), 
        await axios.get(`${consumetURL}meta/anilist/advanced-search?genres=["${showInfo.genres[0]}"]&sort=["SCORE_DESC"]`)
    ]);
    recommendedData =  recommendedInfo.data 
    infoRes = infoReq.data
    infoRes.episodes.forEach((ep) => {
        if (ep.number == epData[1]) {
            episodeSelected = ep
        }
    })
    let watchReq = await axios.get(`${consumetURL}anime/zoro/watch?episodeId=${episodeSelected.id}`)
    let watchRes = watchReq.data
    
    trendingData = trending.data
    if (req.user == undefined) {
        loginState = false;
    } else {
            loginState = true;
            username = req.user.username
    }
    if (loginState == true) {
        res.render('watch_zoro.ejs', {watchInfo: watchRes, loginState: loginState, username: username, showInfo: showInfo, epData: epData, epIds: infoRes.episodes, recommended: recommendedData, trending: trendingData, url: fullUrl})
    } else {
        res.render('watch_zoro.ejs', {watchInfo: watchRes, loginState: loginState, showInfo: showInfo, epData: epData, epIds: infoRes.episodes, recommended: recommendedData, trending: trendingData, url: fullUrl})
    }

} catch(e) {
    res.render('error.ejs', {loginState: loginState, username: username, errCode: "Failed to get episode data!"})
}

}

async function getWatchDataGogo(req, res) {
epData = req.params.id.split('-episode-');
switch (epData[0]) {
    case "Gintama.-Shirogane-no-Tamashii-hen---Kouhan-sen":
        epData[0] = "gintama-shirogane-no-tamashii-hen-2"
    break;
    case "Shoujo-Kageki-Revue-Starlight-Movie":
        epData[0] = "shoujokageki-revue-starlight-movie"
    break;
    case "Azumanga-Daiou-THE-ANIMATION":
        epData[0] = "azumanga-daioh"
        break;
    case "AIR":
        epData[0] = "air-tv"
        break;
    case "Boys-Be...":
        epData[0] = "boys-be"
        break;
    case "HUNTER×HUNTER-(2011)":
        epData[0] = "hunter-x-hunter-2011"
        break;
    case "Kita-e.-Diamond-Dust-Drops":
        epData[0] = "diamond-daydreams"
        break;
    case "Maria-sama-ga-Miteru":
        epData[0] = "-maria-sama-ga-miteru-1st"
        break;
    case "Love-Hina-Christmas-Special-Silent-Eve":
        epData[0] = "love-hina-christmas-special"
        break;
    case "GTO":
        epData[0] = "great-teacher-onizuka"
        break;
    case "Happy☆Lesson-(TV)":
        epData[0] = "happy-lesson"
        break;
    case "TEXHNOLYZE":
        epData[0] = "texhnolyze-"
        break;
    case "Appleseed-(Movie)":
        epData[0] = "appleseed"
        break;
    case "Koe-no-Katachi":
        epData[0] = "koe-no-katachi-movie"
        break;
    case "Kaguya-sama-wa-Kokurasetai-Tensaitachi-no-Renai-Zunousen":
        epData[0] = "kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen"
        break;
    case "Ano-Hi-Mita-Hana-no-Namae-wo-Bokutachi-wa-Mada-Shiranai":
        epData[0] = "anohana"
        break;
    case "SPY×FAMILY":
        epData[0] = "spy-x-family"
        break;
    case "Kobayashi-san-Chi-no-Maidragon":
        epData[0] = "kobayashi-san-chi-no-maid-dragon"
        break;
    case "Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru":
        epData[0] = "yahari-ore-no-seishun-love-comedy-wa-machigatteiru"
        break;
    case "Saiki-Kusuo-no-Ψ-nan":
        epData[0] = "saiki-kusuo-no-ps-nan"
        break;
    case "Mahou-Shoujo-Madoka-Magica-Hangyaku-no-Monogatari":
        epData[0] = "mahou-shoujo-madoka-magica-movie-3-rebellion"
        break;
    case "Bishoujo-Senshi-Sailor-Moon":
        epData[0] = "sailor-moon-r-the-movie"
        break;
    case "Cardcaptor-Sakura":
        epData[0] = "card-captor-sakura"
        break;
    case "Fatekaleid-liner-Prisma-Illya":
        epData[0] = "fate-kaleid-liner-prisma-illya-"
        break;
    case "flip-flappers":
        epData[0] = "flip-flappers-dub" // because the original isn't working ¯\_(ツ)_/¯
        break;
    case "another":
        epData[0] = "another-anime"
        break;
    case "Code-Geass-Hangyaku-no-Lelouch":
        epData[0] = "code-geass-lelouch-of-the-rebellion"
        break;
    case "Code-Geass-Hangyaku-no-Lelouch-R2":
        epData[0] = "-code-geass-lelouch-of-the-rebellion-r2"
        break;
    case "Tengen-Toppa-Gurren-Lagann":
        epData[0] = "tengen-toppa-gurren-lagann-"
        break;
    case "Shin-Seiki-Evangelion-Movie-Air--Magokoro-wo,-Kimi-ni":
        epData[0] = "evangelion-the-end-of-evangelion"
    case "86-Eighty-Six":
        epData[0] = "86"
        break;
    case "86-Eighty-Six-Part-2":
        epData[0] = "86-2nd-season"
    case "FLCL": 
        epData[0] = "fooly-cooly"
        break;
    case "Shin-Seiki-Evangelion":  // Zankoku na tenshi no you ni, Shounen yo shinwa ni nare *evangelion blares in the background*
        epData[0] = "neon-genesis-evangelion-"
        break;
    case "Evangelion-Shin-Movie-Jo":
        epData[0] = "evangelion-10-you-are-not-alone"
        break;
    case "Evangelion-Shin-Movie-Ha":
        epData[0] = "evangelion-20-you-can-not-advance"
        break;
    case "Evangelion-Shin-Movie-Kyuu":
        epData[0] = "evangelion-30-you-can-not-redo-movie"
        break;
    case "IS-Infinite-Stratos":
        epData[0] = "infinite-stratos"
    case "Boku-no-Hero-Academia-2": 
        epData[0] = "boku-no-hero-academia-2nd-season"
        break;
    case "Boku-no-Hero-Academia-3":
        epData[0] = "boku-no-hero-academia-3rd-season"
        break;
    case "Boku-no-Hero-Academia-4":
        epData[0] = "boku-no-hero-academia-4th-season"
        break;
    case "Boku-no-Hero-Academia-5":
        epData[0] = "boku-no-hero-academia-5th-season"
        break;
    case "Boku-no-Hero-Academia-6":
        epData[0] = "boku-no-hero-academia-6th-season"
        break;
    case "Kono-Subarashii-Sekai-ni-Shukufuku-wo":
        epData[0] = "kono-subarashii-sekai-ni-shukufuku-wo-"
        break;
    case "Ansatsu-Kyoushitsu": 
        epData[0] = "ansatsu-kyoushitsu-tv-dub"
        break;
    case "Gakuen-Mokushiroku-HIGHSCHOOL-OF-THE-DEAD":
        epData[0] = "highschool-of-the-dead"
        break;
    case "Kangoku-Gakuen":
        epData[0] = "prison-school"
        break;
    case "Mushoku-Tensei-Isekai-Ittara-Honki-Dasu-Part-2":
        epData[0] = "mushoku-tensei-isekai-ittara-honki-dasu-2nd-season"
        break;
    case "Shingeki-no-Kyojin-2":
        epData[0] = "shingeki-no-kyojin-season-2"
        break;
    case "Shingeki-no-Kyojin-3":
        epData[0] = "shingeki-no-kyojin-season-3"
        break;
    case "Shingeki-no-Kyojin-3-Part-2":
        epData[0] = "shingeki-no-kyojin-season-3"
        break;
    case "Shingeki-no-Kyojin-The-Final-Season":
        epData[0] = "shingeki-no-kyojin-the-final-season"
        break;
    case "NARUTO-Shippuuden":
        epData[0] = "naruto-shippuden"
        break;
    case "Hagane-no-Renkinjutsushi-FULLMETAL-ALCHEMIST":
        epData[0] = "fullmetal-alchemist-brotherhood"
        break;
    case "SSSSGRIDMAN":
        epData[0] = "ssss-gridman"
        break;
    case "Zombie-Land-Saga":
        epData[0] = "zombieland-saga"
        break;
    case "takt-opDestiny":
        epData[0] = "takt-op-destiny"
        break;
    case "Carole-&-Tuesday":
        epData[0] = "carole-tuesday"
        break;
    case "Kokoro-ga-Sakebitagatterun-da":
        epData[0] = "kokoro-ga-sakebitagatterunda"
        break;
    case "Sen-to-Chihiro-no-Kamikakushi":
        epData[0] = "spirited-away"
        break;
    case "Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatteiru-Darou-ka":
        epData[0] = "dungeon-ni-deai-o-motomeru-no-wa-machigatte-iru-darouka"
        break;
    case "Haikyuu-2nd-Season":
        epData[0] = "haikyuu-second-season"
        break;
    case "Kuroko-no-Basket":
        epData[0] = "kuroko-no-baske"
        break;
    case "Kuroko-no-Basket-2nd-Season":
        epData[0] = "kuroko-basuke-2"
        break;
    case "Haikyuu-TO-THE-TOP-2":
        epData[0] = "haikyuu-to-the-top-2nd-season"
        break;
    case "Yuuri-on-ICE":
        epData[0] = "yuri-on-ice"
        break;
    case "Free": 
        epData[0] = "free-"
        break;
    case "Kuroko-no-Basket-3rd-Season":
        epData[0] = "kuroko-no-basket-3rd-season"
        break;
    case "Hajime-no-Ippo-THE-FIGHTING":
        epData[0] = "hajime-no-ippo-"
        break;
    case "Ao-no-Exorcist":
        epData[0] = "ao-no-exorcist-"
        break;
    case "JoJo-no-Kimyou-na-Bouken-(TV)":
        epData[0] = "jojos-bizarre-adventure"
        break;
    case "Gintama°":
        epData[0] = "gintama-2015-"
        break;
    case "Gintama.":
        epData[0] = "gintama-2017"
        break;
    case "Gintama'":
        epData[0] = "gintama-shirogane-no-tamashii-hen-2"
        break;
    case "Modao-Zushi-3":
        epData[0] = "mo-dao-zu-shi-3rd-season"
        break;
    default:
        break;
}
const watch = req.params.id
const recommended = req.params.id + "/recommended"
const trending = "trending"
// const download = req.params.id + "/download"
const info = req.params.id + "/info"
let watchResult;
let showInfo;
let recommendedData;
let trendingData;
let downloadUrl
let loginState;
let username;
const fullUrl = `${req.originalUrl}`;
  try {
    const watchResults = await redisClient.get(watch);
    const recommendedResults = await redisClient.get(recommended);
    const trendingResults = await redisClient.get(trending);
    // const downloadReqResults = await redisClient.get(download);
    const showInfoResults = await redisClient.get(info);
    if (watchResults) {
        watchResult = JSON.parse(watchResults);
        recommendedData = JSON.parse(recommendedResults)
        trendingData = JSON.parse(trendingResults)
        // downloadUrl = JSON.parse(downloadReqResults)
        showInfo = JSON.parse(showInfoResults)
    } else {
    const showInformation = await axios.get(`${consumetURL}anime/gogoanime/info/${epData[0]}`)
    showInfo = await showInformation.data
    let recommendedInfo;
    if (showInfo.genres[0] === "Childcare") {
        recommendedInfo = await axios.get(`${consumetURL}anime/gogoanime/genre/${showInfo.genres[0]}`)
    } else {
        recommendedInfo = await axios.get(`${consumetURL}anime/gogoanime/genre/${showInfo.genres[0]}?page=3`)
    }
    recommendedData = await recommendedInfo.data.results
    const trendingReq = await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    trendingData = await trendingReq.data
    try {
        watchResult = await fetchApiData(watch, "vidstreaming");
    } catch(err) {
        watchResult = await fetchApiData(watch, "gogocdn");
    }
      
      await redisClient.set(watch, JSON.stringify(watchResult), {
        EX: 10800,
        NX: true,
      });
      await redisClient.set(recommended, JSON.stringify(recommendedData), {
        EX: 10800,
        NX: true,
      });
      await redisClient.set(trending, JSON.stringify(trendingData), {
        EX: 10800,
        NX: true,
      });
      await redisClient.set(info, JSON.stringify(showInfo), {
        EX: 32400,
        NX: true,
      });
    }
    if (req.user == undefined) {
        loginState = false;
    } else {
        loginState = true;
        username = req.user.username
    }
    if (loginState == true) {
        return res.render('watch.ejs', {data: watchResult, epData: epData, downloadUrl: downloadUrl, showInfo: showInfo, trending: trendingData, recommended: recommendedData, username: username, loginState: loginState, url: fullUrl}); 
    }
        return res.render('watch.ejs', {data: watchResult, epData: epData, downloadUrl: downloadUrl, showInfo: showInfo, trending: trendingData, recommended: recommendedData, loginState: loginState, url: fullUrl});
  } catch (error) {
    return res.status(404).render('error.ejs', {loginState: loginState, username: username, url: fullUrl, errCode: "Failed to get episode data!"})
  }
}
// I hate everything about this function, but it works so I'm not touching it
async function getWatchDataMal(req, res) {
    try {
        let malsyncRequest = await axios.get(`https://api.malsync.moe/mal/anime/${req.params.id}`)
        let malsyncData = await malsyncRequest.data
        let gogoanimeData = await malsyncData.Sites.Gogoanime
        if (gogoanimeData == undefined) {
            res.redirect(`/watch/${req.params.id}/zoro`)
        } else {
            let obj = Object.getOwnPropertyNames(gogoanimeData)
            let dataName = obj[0]
            res.redirect(`/watch/${dataName}-episode-1`)
        }
    } catch(err) {
        res.send(err)
    }
}


app.get("/:id/:episode", getWatchData);
app.get("/:id", handleMalformedURL)
// app.get('/:id/old_zoro', getWatchDataZoro)
// app.get("/:id/zoro", getWatchDataZoroNew)
// app.get("/mal/:id", getWatchDataMal)

module.exports = app;
