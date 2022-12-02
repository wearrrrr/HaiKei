const ex = require("express");
const axios = require("axios");
const redis = require("redis");
const config = require('../../config');
const app = ex.Router();
const consumetURL = config.app.api_url3

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();
async function fetchApiData(watch) {
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
  const apiResponse = await axios.get(
    `${consumetURL}anime/gogoanime/watch/${epData[0]}-episode-${epData[1]}`
  );
  const info = await axios.get(`${consumetURL}anime/gogoanime/info/${epData[0]}`)
  console.log("Request sent to the API");
  return apiResponse.data;
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
async function getWatchDataZoro(req, res) {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    epData = req.params.id.split('-episode-');  
try {
    let searchReq = await axios.get(`${consumetURL}anime/zoro/${epData[0]}`)
    searchRes = await searchReq.data

    const showInformation = await axios.get(`${consumetURL}anime/gogoanime/info/${epData[0]}`)
    showInfo = await showInformation.data
    let infoReq
    if (epData[0] == "one-piece") {
        infoReq = await axios.get(`${consumetURL}anime/zoro/info?id=${searchRes.results[1].id}`)   
    } else {
        infoReq = await axios.get(`${consumetURL}anime/zoro/info?id=${searchRes.results[0].id}`)
    }
    infoRes = await infoReq.data
    infoRes.episodes.forEach((ep) => {
        if (ep.number == epData[1]) {
            episodeSelected = ep
        }
    })
    let watchReq = await axios.get(`${consumetURL}anime/zoro/watch?episodeId=${episodeSelected.id}`)
    let watchRes = await watchReq.data
    const recommendedInfo = await axios.get(`${consumetURL}meta/anilist/advanced-search?genres=["${showInfo.genres[0]}"]&sort=["SCORE_DESC"]`)
    recommendedData = await recommendedInfo.data
    const trending = await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    trendingData = await trending.data
    const downloadReq = await axios.get(`${consumetURL}anime/gogoanime/download/${epData[0]}-episode-${epData[1]}`)
    downloadUrl = await downloadReq.data
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
    res.render('error.ejs', {loginState: loginState, username: username})
    console.log(e)
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
let results;
let showInfo;
let recommendedData;
let trendingData;
let downloadUrl
let isCached = false;
let loginState;
let username;
const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  try {
    const cacheResults = await redisClient.get(watch);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    
    const showInformation = await axios.get(`${consumetURL}anime/gogoanime/info/${epData[0]}`)
    showInfo = await showInformation.data
    const recommendedInfo = await axios.get(`${consumetURL}meta/anilist/advanced-search?genres=["${showInfo.genres[0]}"]&sort=["SCORE_DESC"]`)
    recommendedData = await recommendedInfo.data
    const trending = await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    trendingData = await trending.data
    const downloadReq = await axios.get(`${consumetURL}anime/gogoanime/download/${epData[0]}-episode-${epData[1]}`)
    downloadUrl = await downloadReq.data

    } else {
    const showInformation = await axios.get(`${consumetURL}anime/gogoanime/info/${epData[0]}`)
    showInfo = await showInformation.data
    const recommendedInfo = await axios.get(`${consumetURL}meta/anilist/advanced-search?genres=["${showInfo.genres[0]}"]&sort=["SCORE_DESC"]`)
    recommendedData = await recommendedInfo.data
    const trending = await axios.get(`${consumetURL}anime/gogoanime/top-airing`)
    trendingData = await trending.data

    const downloadReq = await axios.get(`${consumetURL}anime/gogoanime/download/${epData[0]}-episode-${epData[1]}`)
    downloadUrl = await downloadReq.data
      results = await fetchApiData(watch);
      if (results.length === 0) {
        throw "API returned an empty array";
      }
      await redisClient.set(watch, JSON.stringify(results), {
        EX: 10800,
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
       return res.render('watch.ejs', {data: results, epData: epData, downloadUrl: downloadUrl, showInfo: showInfo, trending: trendingData, recommended: recommendedData, username: username, loginState: loginState, url: fullUrl}); 
    }
    return res.render('watch.ejs', {data: results, epData: epData, downloadUrl: downloadUrl, showInfo: showInfo, trending: trendingData, recommended: recommendedData, loginState: loginState, url: fullUrl});
  } catch (error) {
    console.error(error);
    return res.status(404).render('error.ejs', {loginState: loginState, username: username, url: fullUrl})
  }
}

app.get("/:id", getWatchDataGogo);
app.get("/:id/zoro", getWatchDataZoro)

module.exports = app;
