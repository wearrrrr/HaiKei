"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ex = require("express");

var axios = require("axios");

var redis = require("redis");

var config = require('../../config');

var app = ex.Router();
var consumetURL = config.app.api_url3;
var redisClient;

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          redisClient = redis.createClient();
          redisClient.on("error", function (error) {
            return console.error("Error : ".concat(error));
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(redisClient.connect());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
})();

function fetchApiData(watch) {
  var apiResponse, info;
  return regeneratorRuntime.async(function fetchApiData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = epData[0];
          _context2.next = _context2.t0 === "Gintama.-Shirogane-no-Tamashii-hen---Kouhan-sen" ? 3 : _context2.t0 === "Shoujo-Kageki-Revue-Starlight-Movie" ? 5 : _context2.t0 === "Azumanga-Daiou-THE-ANIMATION" ? 7 : _context2.t0 === "AIR" ? 9 : _context2.t0 === "Boys-Be..." ? 11 : _context2.t0 === "HUNTER×HUNTER-(2011)" ? 13 : _context2.t0 === "Kita-e.-Diamond-Dust-Drops" ? 15 : _context2.t0 === "Maria-sama-ga-Miteru" ? 17 : _context2.t0 === "Love-Hina-Christmas-Special-Silent-Eve" ? 19 : _context2.t0 === "GTO" ? 21 : _context2.t0 === "Happy☆Lesson-(TV)" ? 23 : _context2.t0 === "TEXHNOLYZE" ? 25 : _context2.t0 === "Appleseed-(Movie)" ? 27 : _context2.t0 === "Koe-no-Katachi" ? 29 : _context2.t0 === "Kaguya-sama-wa-Kokurasetai-Tensaitachi-no-Renai-Zunousen" ? 31 : _context2.t0 === "Ano-Hi-Mita-Hana-no-Namae-wo-Bokutachi-wa-Mada-Shiranai" ? 33 : _context2.t0 === "SPY×FAMILY" ? 35 : _context2.t0 === "Kobayashi-san-Chi-no-Maidragon" ? 37 : _context2.t0 === "Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru" ? 39 : _context2.t0 === "Saiki-Kusuo-no-Ψ-nan" ? 41 : _context2.t0 === "Mahou-Shoujo-Madoka-Magica-Hangyaku-no-Monogatari" ? 43 : _context2.t0 === "Bishoujo-Senshi-Sailor-Moon" ? 45 : _context2.t0 === "Cardcaptor-Sakura" ? 47 : _context2.t0 === "Fatekaleid-liner-Prisma-Illya" ? 49 : _context2.t0 === "flip-flappers" ? 51 : _context2.t0 === "another" ? 53 : _context2.t0 === "Code-Geass-Hangyaku-no-Lelouch" ? 55 : _context2.t0 === "Code-Geass-Hangyaku-no-Lelouch-R2" ? 57 : _context2.t0 === "Tengen-Toppa-Gurren-Lagann" ? 59 : _context2.t0 === "Shin-Seiki-Evangelion-Movie-Air--Magokoro-wo,-Kimi-ni" ? 61 : _context2.t0 === "86-Eighty-Six" ? 62 : _context2.t0 === "86-Eighty-Six-Part-2" ? 64 : _context2.t0 === "FLCL" ? 65 : _context2.t0 === "Shin-Seiki-Evangelion" ? 67 : _context2.t0 === "Evangelion-Shin-Movie-Jo" ? 69 : _context2.t0 === "Evangelion-Shin-Movie-Ha" ? 71 : _context2.t0 === "Evangelion-Shin-Movie-Kyuu" ? 73 : _context2.t0 === "IS-Infinite-Stratos" ? 75 : _context2.t0 === "Boku-no-Hero-Academia-2" ? 76 : _context2.t0 === "Boku-no-Hero-Academia-3" ? 78 : _context2.t0 === "Boku-no-Hero-Academia-4" ? 80 : _context2.t0 === "Boku-no-Hero-Academia-5" ? 82 : _context2.t0 === "Boku-no-Hero-Academia-6" ? 84 : _context2.t0 === "Kono-Subarashii-Sekai-ni-Shukufuku-wo" ? 86 : _context2.t0 === "Ansatsu-Kyoushitsu" ? 88 : _context2.t0 === "Gakuen-Mokushiroku-HIGHSCHOOL-OF-THE-DEAD" ? 90 : _context2.t0 === "Kangoku-Gakuen" ? 92 : _context2.t0 === "Mushoku-Tensei-Isekai-Ittara-Honki-Dasu-Part-2" ? 94 : _context2.t0 === "Shingeki-no-Kyojin-2" ? 96 : _context2.t0 === "Shingeki-no-Kyojin-3" ? 98 : _context2.t0 === "Shingeki-no-Kyojin-3-Part-2" ? 100 : _context2.t0 === "Shingeki-no-Kyojin-The-Final-Season" ? 102 : _context2.t0 === "NARUTO-Shippuuden" ? 104 : _context2.t0 === "Hagane-no-Renkinjutsushi-FULLMETAL-ALCHEMIST" ? 106 : _context2.t0 === "SSSSGRIDMAN" ? 108 : _context2.t0 === "Zombie-Land-Saga" ? 110 : _context2.t0 === "takt-opDestiny" ? 112 : _context2.t0 === "Carole-&-Tuesday" ? 114 : _context2.t0 === "Kokoro-ga-Sakebitagatterun-da" ? 116 : _context2.t0 === "Sen-to-Chihiro-no-Kamikakushi" ? 118 : _context2.t0 === "Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatteiru-Darou-ka" ? 120 : _context2.t0 === "Haikyuu-2nd-Season" ? 122 : _context2.t0 === "Kuroko-no-Basket" ? 124 : _context2.t0 === "Kuroko-no-Basket-2nd-Season" ? 126 : _context2.t0 === "Haikyuu-TO-THE-TOP-2" ? 128 : _context2.t0 === "Yuuri-on-ICE" ? 130 : _context2.t0 === "Free" ? 132 : _context2.t0 === "Kuroko-no-Basket-3rd-Season" ? 134 : _context2.t0 === "Hajime-no-Ippo-THE-FIGHTING" ? 136 : _context2.t0 === "Ao-no-Exorcist" ? 138 : _context2.t0 === "JoJo-no-Kimyou-na-Bouken-(TV)" ? 140 : _context2.t0 === "Gintama°" ? 142 : _context2.t0 === "Gintama." ? 144 : _context2.t0 === "Modao-Zushi-3" ? 146 : 148;
          break;

        case 3:
          epData[0] = "gintama-shirogane-no-tamashii-hen-2";
          return _context2.abrupt("break", 149);

        case 5:
          epData[0] = "shoujokageki-revue-starlight-movie";
          return _context2.abrupt("break", 149);

        case 7:
          epData[0] = "azumanga-daioh";
          return _context2.abrupt("break", 149);

        case 9:
          epData[0] = "air-tv";
          return _context2.abrupt("break", 149);

        case 11:
          epData[0] = "boys-be";
          return _context2.abrupt("break", 149);

        case 13:
          epData[0] = "hunter-x-hunter-2011";
          return _context2.abrupt("break", 149);

        case 15:
          epData[0] = "diamond-daydreams";
          return _context2.abrupt("break", 149);

        case 17:
          epData[0] = "-maria-sama-ga-miteru-1st";
          return _context2.abrupt("break", 149);

        case 19:
          epData[0] = "love-hina-christmas-special";
          return _context2.abrupt("break", 149);

        case 21:
          epData[0] = "great-teacher-onizuka";
          return _context2.abrupt("break", 149);

        case 23:
          epData[0] = "happy-lesson";
          return _context2.abrupt("break", 149);

        case 25:
          epData[0] = "texhnolyze-";
          return _context2.abrupt("break", 149);

        case 27:
          epData[0] = "appleseed";
          return _context2.abrupt("break", 149);

        case 29:
          epData[0] = "koe-no-katachi-movie";
          return _context2.abrupt("break", 149);

        case 31:
          epData[0] = "kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen";
          return _context2.abrupt("break", 149);

        case 33:
          epData[0] = "anohana";
          return _context2.abrupt("break", 149);

        case 35:
          epData[0] = "spy-x-family";
          return _context2.abrupt("break", 149);

        case 37:
          epData[0] = "kobayashi-san-chi-no-maid-dragon";
          return _context2.abrupt("break", 149);

        case 39:
          epData[0] = "yahari-ore-no-seishun-love-comedy-wa-machigatteiru";
          return _context2.abrupt("break", 149);

        case 41:
          epData[0] = "saiki-kusuo-no-ps-nan";
          return _context2.abrupt("break", 149);

        case 43:
          epData[0] = "mahou-shoujo-madoka-magica-movie-3-rebellion";
          return _context2.abrupt("break", 149);

        case 45:
          epData[0] = "sailor-moon-r-the-movie";
          return _context2.abrupt("break", 149);

        case 47:
          epData[0] = "card-captor-sakura";
          return _context2.abrupt("break", 149);

        case 49:
          epData[0] = "fate-kaleid-liner-prisma-illya-";
          return _context2.abrupt("break", 149);

        case 51:
          epData[0] = "flip-flappers-dub"; // because the original isn't working ¯\_(ツ)_/¯

          return _context2.abrupt("break", 149);

        case 53:
          epData[0] = "another-anime";
          return _context2.abrupt("break", 149);

        case 55:
          epData[0] = "code-geass-lelouch-of-the-rebellion";
          return _context2.abrupt("break", 149);

        case 57:
          epData[0] = "-code-geass-lelouch-of-the-rebellion-r2";
          return _context2.abrupt("break", 149);

        case 59:
          epData[0] = "tengen-toppa-gurren-lagann-";
          return _context2.abrupt("break", 149);

        case 61:
          epData[0] = "evangelion-the-end-of-evangelion";

        case 62:
          epData[0] = "86";
          return _context2.abrupt("break", 149);

        case 64:
          epData[0] = "86-2nd-season";

        case 65:
          epData[0] = "fooly-cooly";
          return _context2.abrupt("break", 149);

        case 67:
          // Zankoku na tenshi no you ni, Shounen yo shinwa ni nare *evangelion blares in the background*
          epData[0] = "neon-genesis-evangelion-";
          return _context2.abrupt("break", 149);

        case 69:
          epData[0] = "evangelion-10-you-are-not-alone";
          return _context2.abrupt("break", 149);

        case 71:
          epData[0] = "evangelion-20-you-can-not-advance";
          return _context2.abrupt("break", 149);

        case 73:
          epData[0] = "evangelion-30-you-can-not-redo-movie";
          return _context2.abrupt("break", 149);

        case 75:
          epData[0] = "infinite-stratos";

        case 76:
          epData[0] = "boku-no-hero-academia-2nd-season";
          return _context2.abrupt("break", 149);

        case 78:
          epData[0] = "boku-no-hero-academia-3rd-season";
          return _context2.abrupt("break", 149);

        case 80:
          epData[0] = "boku-no-hero-academia-4th-season";
          return _context2.abrupt("break", 149);

        case 82:
          epData[0] = "boku-no-hero-academia-5th-season";
          return _context2.abrupt("break", 149);

        case 84:
          epData[0] = "boku-no-hero-academia-6th-season";
          return _context2.abrupt("break", 149);

        case 86:
          epData[0] = "kono-subarashii-sekai-ni-shukufuku-wo-";
          return _context2.abrupt("break", 149);

        case 88:
          epData[0] = "ansatsu-kyoushitsu-tv-dub";
          return _context2.abrupt("break", 149);

        case 90:
          epData[0] = "highschool-of-the-dead";
          return _context2.abrupt("break", 149);

        case 92:
          epData[0] = "prison-school";
          return _context2.abrupt("break", 149);

        case 94:
          epData[0] = "mushoku-tensei-isekai-ittara-honki-dasu-2nd-season";
          return _context2.abrupt("break", 149);

        case 96:
          epData[0] = "shingeki-no-kyojin-season-2";
          return _context2.abrupt("break", 149);

        case 98:
          epData[0] = "shingeki-no-kyojin-season-3";
          return _context2.abrupt("break", 149);

        case 100:
          epData[0] = "shingeki-no-kyojin-season-3";
          return _context2.abrupt("break", 149);

        case 102:
          epData[0] = "shingeki-no-kyojin-the-final-season";
          return _context2.abrupt("break", 149);

        case 104:
          epData[0] = "naruto-shippuden";
          return _context2.abrupt("break", 149);

        case 106:
          epData[0] = "fullmetal-alchemist-brotherhood";
          return _context2.abrupt("break", 149);

        case 108:
          epData[0] = "ssss-gridman";
          return _context2.abrupt("break", 149);

        case 110:
          epData[0] = "zombieland-saga";
          return _context2.abrupt("break", 149);

        case 112:
          epData[0] = "takt-op-destiny";
          return _context2.abrupt("break", 149);

        case 114:
          epData[0] = "carole-tuesday";
          return _context2.abrupt("break", 149);

        case 116:
          epData[0] = "kokoro-ga-sakebitagatterunda";
          return _context2.abrupt("break", 149);

        case 118:
          epData[0] = "spirited-away";
          return _context2.abrupt("break", 149);

        case 120:
          epData[0] = "dungeon-ni-deai-o-motomeru-no-wa-machigatte-iru-darouka";
          return _context2.abrupt("break", 149);

        case 122:
          epData[0] = "haikyuu-second-season";
          return _context2.abrupt("break", 149);

        case 124:
          epData[0] = "kuroko-no-baske";
          return _context2.abrupt("break", 149);

        case 126:
          epData[0] = "kuroko-basuke-2";
          return _context2.abrupt("break", 149);

        case 128:
          epData[0] = "haikyuu-to-the-top-2nd-season";
          return _context2.abrupt("break", 149);

        case 130:
          epData[0] = "yuri-on-ice";
          return _context2.abrupt("break", 149);

        case 132:
          epData[0] = "free-";
          return _context2.abrupt("break", 149);

        case 134:
          epData[0] = "kuroko-no-basket-3rd-season";
          return _context2.abrupt("break", 149);

        case 136:
          epData[0] = "hajime-no-ippo-";
          return _context2.abrupt("break", 149);

        case 138:
          epData[0] = "ao-no-exorcist-";
          return _context2.abrupt("break", 149);

        case 140:
          epData[0] = "jojos-bizarre-adventure";
          return _context2.abrupt("break", 149);

        case 142:
          epData[0] = "gintama-2015-";
          return _context2.abrupt("break", 149);

        case 144:
          epData[0] = "gintama-2017";
          return _context2.abrupt("break", 149);

        case 146:
          epData[0] = "mo-dao-zu-shi-3rd-season";
          return _context2.abrupt("break", 149);

        case 148:
          return _context2.abrupt("break", 149);

        case 149:
          _context2.next = 151;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/watch/").concat(epData[0], "-episode-").concat(epData[1])));

        case 151:
          apiResponse = _context2.sent;
          _context2.next = 154;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/info/").concat(epData[0])));

        case 154:
          info = _context2.sent;
          console.log("Request sent to the API");
          return _context2.abrupt("return", apiResponse.data);

        case 157:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var epData;
var searchRes;
var infoRes;
var episodeSelected;
var watchRes;
var loginState;
var username;
var recommendedData;
var trendingData;

function getWatchDataZoro(req, res) {
  var fullUrl, _ref, _ref2, searchReq, showInformation, trending, _ref3, _ref4, infoReq, recommendedInfo, watchReq, _watchRes;

  return regeneratorRuntime.async(function getWatchDataZoro$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          fullUrl = "".concat(req.protocol, "://").concat(req.get("host")).concat(req.originalUrl);
          epData = req.params.id.split('-episode-');
          _context3.prev = 2;
          _context3.t0 = regeneratorRuntime;
          _context3.t1 = Promise;
          _context3.next = 7;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/zoro/").concat(epData[0])));

        case 7:
          _context3.t2 = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/info/").concat(epData[0])));

        case 10:
          _context3.t3 = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/top-airing")));

        case 13:
          _context3.t4 = _context3.sent;
          _context3.t5 = [_context3.t2, _context3.t3, _context3.t4];
          _context3.t6 = _context3.t1.all.call(_context3.t1, _context3.t5);
          _context3.next = 18;
          return _context3.t0.awrap.call(_context3.t0, _context3.t6);

        case 18:
          _ref = _context3.sent;
          _ref2 = _slicedToArray(_ref, 3);
          searchReq = _ref2[0];
          showInformation = _ref2[1];
          trending = _ref2[2];
          searchRes = searchReq.data;
          showInfo = showInformation.data;
          _context3.t7 = regeneratorRuntime;
          _context3.t8 = Promise;
          _context3.next = 29;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/zoro/info?id=").concat(searchRes.results[epData[0] == "one-piece" ? 1 : 0].id)));

        case 29:
          _context3.t9 = _context3.sent;
          _context3.next = 32;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "meta/anilist/advanced-search?genres=[\"").concat(showInfo.genres[0], "\"]&sort=[\"SCORE_DESC\"]")));

        case 32:
          _context3.t10 = _context3.sent;
          _context3.t11 = [_context3.t9, _context3.t10];
          _context3.t12 = _context3.t8.all.call(_context3.t8, _context3.t11);
          _context3.next = 37;
          return _context3.t7.awrap.call(_context3.t7, _context3.t12);

        case 37:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 2);
          infoReq = _ref4[0];
          recommendedInfo = _ref4[1];
          recommendedData = recommendedInfo.data;
          infoRes = infoReq.data;
          infoRes.episodes.forEach(function (ep) {
            if (ep.number == epData[1]) {
              episodeSelected = ep;
            }
          });
          _context3.next = 46;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/zoro/watch?episodeId=").concat(episodeSelected.id)));

        case 46:
          watchReq = _context3.sent;
          _watchRes = watchReq.data;
          trendingData = trending.data;

          if (req.user == undefined) {
            loginState = false;
          } else {
            loginState = true;
            username = req.user.username;
          }

          if (loginState == true) {
            res.render('watch_zoro.ejs', {
              watchInfo: _watchRes,
              loginState: loginState,
              username: username,
              showInfo: showInfo,
              epData: epData,
              epIds: infoRes.episodes,
              recommended: recommendedData,
              trending: trendingData,
              url: fullUrl
            });
          } else {
            res.render('watch_zoro.ejs', {
              watchInfo: _watchRes,
              loginState: loginState,
              showInfo: showInfo,
              epData: epData,
              epIds: infoRes.episodes,
              recommended: recommendedData,
              trending: trendingData,
              url: fullUrl
            });
          }

          _context3.next = 57;
          break;

        case 53:
          _context3.prev = 53;
          _context3.t13 = _context3["catch"](2);
          res.render('error.ejs', {
            loginState: loginState,
            username: username,
            errCode: "Failed to get episode data!"
          });
          console.log(_context3.t13);

        case 57:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 53]]);
}

function getWatchDataGogo(req, res) {
  var watch, recommended, trending, info, watchResult, showInfo, recommendedData, trendingData, downloadUrl, loginState, username, fullUrl, watchResults, recommendedResults, trendingResults, showInfoResults, showInformation, recommendedInfo, trendingReq;
  return regeneratorRuntime.async(function getWatchDataGogo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          epData = req.params.id.split('-episode-');
          _context4.t0 = epData[0];
          _context4.next = _context4.t0 === "Gintama.-Shirogane-no-Tamashii-hen---Kouhan-sen" ? 4 : _context4.t0 === "Shoujo-Kageki-Revue-Starlight-Movie" ? 6 : _context4.t0 === "Azumanga-Daiou-THE-ANIMATION" ? 8 : _context4.t0 === "AIR" ? 10 : _context4.t0 === "Boys-Be..." ? 12 : _context4.t0 === "HUNTER×HUNTER-(2011)" ? 14 : _context4.t0 === "Kita-e.-Diamond-Dust-Drops" ? 16 : _context4.t0 === "Maria-sama-ga-Miteru" ? 18 : _context4.t0 === "Love-Hina-Christmas-Special-Silent-Eve" ? 20 : _context4.t0 === "GTO" ? 22 : _context4.t0 === "Happy☆Lesson-(TV)" ? 24 : _context4.t0 === "TEXHNOLYZE" ? 26 : _context4.t0 === "Appleseed-(Movie)" ? 28 : _context4.t0 === "Koe-no-Katachi" ? 30 : _context4.t0 === "Kaguya-sama-wa-Kokurasetai-Tensaitachi-no-Renai-Zunousen" ? 32 : _context4.t0 === "Ano-Hi-Mita-Hana-no-Namae-wo-Bokutachi-wa-Mada-Shiranai" ? 34 : _context4.t0 === "SPY×FAMILY" ? 36 : _context4.t0 === "Kobayashi-san-Chi-no-Maidragon" ? 38 : _context4.t0 === "Yahari-Ore-no-Seishun-Love-Come-wa-Machigatteiru" ? 40 : _context4.t0 === "Saiki-Kusuo-no-Ψ-nan" ? 42 : _context4.t0 === "Mahou-Shoujo-Madoka-Magica-Hangyaku-no-Monogatari" ? 44 : _context4.t0 === "Bishoujo-Senshi-Sailor-Moon" ? 46 : _context4.t0 === "Cardcaptor-Sakura" ? 48 : _context4.t0 === "Fatekaleid-liner-Prisma-Illya" ? 50 : _context4.t0 === "flip-flappers" ? 52 : _context4.t0 === "another" ? 54 : _context4.t0 === "Code-Geass-Hangyaku-no-Lelouch" ? 56 : _context4.t0 === "Code-Geass-Hangyaku-no-Lelouch-R2" ? 58 : _context4.t0 === "Tengen-Toppa-Gurren-Lagann" ? 60 : _context4.t0 === "Shin-Seiki-Evangelion-Movie-Air--Magokoro-wo,-Kimi-ni" ? 62 : _context4.t0 === "86-Eighty-Six" ? 63 : _context4.t0 === "86-Eighty-Six-Part-2" ? 65 : _context4.t0 === "FLCL" ? 66 : _context4.t0 === "Shin-Seiki-Evangelion" ? 68 : _context4.t0 === "Evangelion-Shin-Movie-Jo" ? 70 : _context4.t0 === "Evangelion-Shin-Movie-Ha" ? 72 : _context4.t0 === "Evangelion-Shin-Movie-Kyuu" ? 74 : _context4.t0 === "IS-Infinite-Stratos" ? 76 : _context4.t0 === "Boku-no-Hero-Academia-2" ? 77 : _context4.t0 === "Boku-no-Hero-Academia-3" ? 79 : _context4.t0 === "Boku-no-Hero-Academia-4" ? 81 : _context4.t0 === "Boku-no-Hero-Academia-5" ? 83 : _context4.t0 === "Boku-no-Hero-Academia-6" ? 85 : _context4.t0 === "Kono-Subarashii-Sekai-ni-Shukufuku-wo" ? 87 : _context4.t0 === "Ansatsu-Kyoushitsu" ? 89 : _context4.t0 === "Gakuen-Mokushiroku-HIGHSCHOOL-OF-THE-DEAD" ? 91 : _context4.t0 === "Kangoku-Gakuen" ? 93 : _context4.t0 === "Mushoku-Tensei-Isekai-Ittara-Honki-Dasu-Part-2" ? 95 : _context4.t0 === "Shingeki-no-Kyojin-2" ? 97 : _context4.t0 === "Shingeki-no-Kyojin-3" ? 99 : _context4.t0 === "Shingeki-no-Kyojin-3-Part-2" ? 101 : _context4.t0 === "Shingeki-no-Kyojin-The-Final-Season" ? 103 : _context4.t0 === "NARUTO-Shippuuden" ? 105 : _context4.t0 === "Hagane-no-Renkinjutsushi-FULLMETAL-ALCHEMIST" ? 107 : _context4.t0 === "SSSSGRIDMAN" ? 109 : _context4.t0 === "Zombie-Land-Saga" ? 111 : _context4.t0 === "takt-opDestiny" ? 113 : _context4.t0 === "Carole-&-Tuesday" ? 115 : _context4.t0 === "Kokoro-ga-Sakebitagatterun-da" ? 117 : _context4.t0 === "Sen-to-Chihiro-no-Kamikakushi" ? 119 : _context4.t0 === "Dungeon-ni-Deai-wo-Motomeru-no-wa-Machigatteiru-Darou-ka" ? 121 : _context4.t0 === "Haikyuu-2nd-Season" ? 123 : _context4.t0 === "Kuroko-no-Basket" ? 125 : _context4.t0 === "Kuroko-no-Basket-2nd-Season" ? 127 : _context4.t0 === "Haikyuu-TO-THE-TOP-2" ? 129 : _context4.t0 === "Yuuri-on-ICE" ? 131 : _context4.t0 === "Free" ? 133 : _context4.t0 === "Kuroko-no-Basket-3rd-Season" ? 135 : _context4.t0 === "Hajime-no-Ippo-THE-FIGHTING" ? 137 : _context4.t0 === "Ao-no-Exorcist" ? 139 : _context4.t0 === "JoJo-no-Kimyou-na-Bouken-(TV)" ? 141 : _context4.t0 === "Gintama°" ? 143 : _context4.t0 === "Gintama." ? 145 : _context4.t0 === "Gintama'" ? 147 : _context4.t0 === "Modao-Zushi-3" ? 149 : 151;
          break;

        case 4:
          epData[0] = "gintama-shirogane-no-tamashii-hen-2";
          return _context4.abrupt("break", 152);

        case 6:
          epData[0] = "shoujokageki-revue-starlight-movie";
          return _context4.abrupt("break", 152);

        case 8:
          epData[0] = "azumanga-daioh";
          return _context4.abrupt("break", 152);

        case 10:
          epData[0] = "air-tv";
          return _context4.abrupt("break", 152);

        case 12:
          epData[0] = "boys-be";
          return _context4.abrupt("break", 152);

        case 14:
          epData[0] = "hunter-x-hunter-2011";
          return _context4.abrupt("break", 152);

        case 16:
          epData[0] = "diamond-daydreams";
          return _context4.abrupt("break", 152);

        case 18:
          epData[0] = "-maria-sama-ga-miteru-1st";
          return _context4.abrupt("break", 152);

        case 20:
          epData[0] = "love-hina-christmas-special";
          return _context4.abrupt("break", 152);

        case 22:
          epData[0] = "great-teacher-onizuka";
          return _context4.abrupt("break", 152);

        case 24:
          epData[0] = "happy-lesson";
          return _context4.abrupt("break", 152);

        case 26:
          epData[0] = "texhnolyze-";
          return _context4.abrupt("break", 152);

        case 28:
          epData[0] = "appleseed";
          return _context4.abrupt("break", 152);

        case 30:
          epData[0] = "koe-no-katachi-movie";
          return _context4.abrupt("break", 152);

        case 32:
          epData[0] = "kaguya-sama-wa-kokurasetai-tensai-tachi-no-renai-zunousen";
          return _context4.abrupt("break", 152);

        case 34:
          epData[0] = "anohana";
          return _context4.abrupt("break", 152);

        case 36:
          epData[0] = "spy-x-family";
          return _context4.abrupt("break", 152);

        case 38:
          epData[0] = "kobayashi-san-chi-no-maid-dragon";
          return _context4.abrupt("break", 152);

        case 40:
          epData[0] = "yahari-ore-no-seishun-love-comedy-wa-machigatteiru";
          return _context4.abrupt("break", 152);

        case 42:
          epData[0] = "saiki-kusuo-no-ps-nan";
          return _context4.abrupt("break", 152);

        case 44:
          epData[0] = "mahou-shoujo-madoka-magica-movie-3-rebellion";
          return _context4.abrupt("break", 152);

        case 46:
          epData[0] = "sailor-moon-r-the-movie";
          return _context4.abrupt("break", 152);

        case 48:
          epData[0] = "card-captor-sakura";
          return _context4.abrupt("break", 152);

        case 50:
          epData[0] = "fate-kaleid-liner-prisma-illya-";
          return _context4.abrupt("break", 152);

        case 52:
          epData[0] = "flip-flappers-dub"; // because the original isn't working ¯\_(ツ)_/¯

          return _context4.abrupt("break", 152);

        case 54:
          epData[0] = "another-anime";
          return _context4.abrupt("break", 152);

        case 56:
          epData[0] = "code-geass-lelouch-of-the-rebellion";
          return _context4.abrupt("break", 152);

        case 58:
          epData[0] = "-code-geass-lelouch-of-the-rebellion-r2";
          return _context4.abrupt("break", 152);

        case 60:
          epData[0] = "tengen-toppa-gurren-lagann-";
          return _context4.abrupt("break", 152);

        case 62:
          epData[0] = "evangelion-the-end-of-evangelion";

        case 63:
          epData[0] = "86";
          return _context4.abrupt("break", 152);

        case 65:
          epData[0] = "86-2nd-season";

        case 66:
          epData[0] = "fooly-cooly";
          return _context4.abrupt("break", 152);

        case 68:
          // Zankoku na tenshi no you ni, Shounen yo shinwa ni nare *evangelion blares in the background*
          epData[0] = "neon-genesis-evangelion-";
          return _context4.abrupt("break", 152);

        case 70:
          epData[0] = "evangelion-10-you-are-not-alone";
          return _context4.abrupt("break", 152);

        case 72:
          epData[0] = "evangelion-20-you-can-not-advance";
          return _context4.abrupt("break", 152);

        case 74:
          epData[0] = "evangelion-30-you-can-not-redo-movie";
          return _context4.abrupt("break", 152);

        case 76:
          epData[0] = "infinite-stratos";

        case 77:
          epData[0] = "boku-no-hero-academia-2nd-season";
          return _context4.abrupt("break", 152);

        case 79:
          epData[0] = "boku-no-hero-academia-3rd-season";
          return _context4.abrupt("break", 152);

        case 81:
          epData[0] = "boku-no-hero-academia-4th-season";
          return _context4.abrupt("break", 152);

        case 83:
          epData[0] = "boku-no-hero-academia-5th-season";
          return _context4.abrupt("break", 152);

        case 85:
          epData[0] = "boku-no-hero-academia-6th-season";
          return _context4.abrupt("break", 152);

        case 87:
          epData[0] = "kono-subarashii-sekai-ni-shukufuku-wo-";
          return _context4.abrupt("break", 152);

        case 89:
          epData[0] = "ansatsu-kyoushitsu-tv-dub";
          return _context4.abrupt("break", 152);

        case 91:
          epData[0] = "highschool-of-the-dead";
          return _context4.abrupt("break", 152);

        case 93:
          epData[0] = "prison-school";
          return _context4.abrupt("break", 152);

        case 95:
          epData[0] = "mushoku-tensei-isekai-ittara-honki-dasu-2nd-season";
          return _context4.abrupt("break", 152);

        case 97:
          epData[0] = "shingeki-no-kyojin-season-2";
          return _context4.abrupt("break", 152);

        case 99:
          epData[0] = "shingeki-no-kyojin-season-3";
          return _context4.abrupt("break", 152);

        case 101:
          epData[0] = "shingeki-no-kyojin-season-3";
          return _context4.abrupt("break", 152);

        case 103:
          epData[0] = "shingeki-no-kyojin-the-final-season";
          return _context4.abrupt("break", 152);

        case 105:
          epData[0] = "naruto-shippuden";
          return _context4.abrupt("break", 152);

        case 107:
          epData[0] = "fullmetal-alchemist-brotherhood";
          return _context4.abrupt("break", 152);

        case 109:
          epData[0] = "ssss-gridman";
          return _context4.abrupt("break", 152);

        case 111:
          epData[0] = "zombieland-saga";
          return _context4.abrupt("break", 152);

        case 113:
          epData[0] = "takt-op-destiny";
          return _context4.abrupt("break", 152);

        case 115:
          epData[0] = "carole-tuesday";
          return _context4.abrupt("break", 152);

        case 117:
          epData[0] = "kokoro-ga-sakebitagatterunda";
          return _context4.abrupt("break", 152);

        case 119:
          epData[0] = "spirited-away";
          return _context4.abrupt("break", 152);

        case 121:
          epData[0] = "dungeon-ni-deai-o-motomeru-no-wa-machigatte-iru-darouka";
          return _context4.abrupt("break", 152);

        case 123:
          epData[0] = "haikyuu-second-season";
          return _context4.abrupt("break", 152);

        case 125:
          epData[0] = "kuroko-no-baske";
          return _context4.abrupt("break", 152);

        case 127:
          epData[0] = "kuroko-basuke-2";
          return _context4.abrupt("break", 152);

        case 129:
          epData[0] = "haikyuu-to-the-top-2nd-season";
          return _context4.abrupt("break", 152);

        case 131:
          epData[0] = "yuri-on-ice";
          return _context4.abrupt("break", 152);

        case 133:
          epData[0] = "free-";
          return _context4.abrupt("break", 152);

        case 135:
          epData[0] = "kuroko-no-basket-3rd-season";
          return _context4.abrupt("break", 152);

        case 137:
          epData[0] = "hajime-no-ippo-";
          return _context4.abrupt("break", 152);

        case 139:
          epData[0] = "ao-no-exorcist-";
          return _context4.abrupt("break", 152);

        case 141:
          epData[0] = "jojos-bizarre-adventure";
          return _context4.abrupt("break", 152);

        case 143:
          epData[0] = "gintama-2015-";
          return _context4.abrupt("break", 152);

        case 145:
          epData[0] = "gintama-2017";
          return _context4.abrupt("break", 152);

        case 147:
          epData[0] = "gintama-shirogane-no-tamashii-hen-2";
          return _context4.abrupt("break", 152);

        case 149:
          epData[0] = "mo-dao-zu-shi-3rd-season";
          return _context4.abrupt("break", 152);

        case 151:
          return _context4.abrupt("break", 152);

        case 152:
          watch = req.params.id;
          recommended = req.params.id + "/recommended";
          trending = "trending"; // const download = req.params.id + "/download"

          info = req.params.id + "/info";
          fullUrl = "".concat(req.protocol, "://").concat(req.get("host")).concat(req.originalUrl);
          _context4.prev = 157;
          _context4.next = 160;
          return regeneratorRuntime.awrap(redisClient.get(watch));

        case 160:
          watchResults = _context4.sent;
          _context4.next = 163;
          return regeneratorRuntime.awrap(redisClient.get(recommended));

        case 163:
          recommendedResults = _context4.sent;
          _context4.next = 166;
          return regeneratorRuntime.awrap(redisClient.get(trending));

        case 166:
          trendingResults = _context4.sent;
          _context4.next = 169;
          return regeneratorRuntime.awrap(redisClient.get(info));

        case 169:
          showInfoResults = _context4.sent;

          if (!watchResults) {
            _context4.next = 177;
            break;
          }

          watchResult = JSON.parse(watchResults);
          recommendedData = JSON.parse(recommendedResults);
          trendingData = JSON.parse(trendingResults); // downloadUrl = JSON.parse(downloadReqResults)

          showInfo = JSON.parse(showInfoResults);
          _context4.next = 209;
          break;

        case 177:
          _context4.next = 179;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/info/").concat(epData[0])));

        case 179:
          showInformation = _context4.sent;
          _context4.next = 182;
          return regeneratorRuntime.awrap(showInformation.data);

        case 182:
          showInfo = _context4.sent;
          _context4.next = 185;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/genre/").concat(showInfo.genres[0])));

        case 185:
          recommendedInfo = _context4.sent;
          _context4.next = 188;
          return regeneratorRuntime.awrap(recommendedInfo.data);

        case 188:
          recommendedData = _context4.sent;
          console.log(recommendedData);
          _context4.next = 192;
          return regeneratorRuntime.awrap(axios.get("".concat(consumetURL, "anime/gogoanime/top-airing")));

        case 192:
          trendingReq = _context4.sent;
          _context4.next = 195;
          return regeneratorRuntime.awrap(trendingReq.data);

        case 195:
          trendingData = _context4.sent;
          _context4.next = 198;
          return regeneratorRuntime.awrap(fetchApiData(watch));

        case 198:
          watchResult = _context4.sent;

          if (!(watchResult.length === 0)) {
            _context4.next = 201;
            break;
          }

          throw "API returned an empty array!";

        case 201:
          _context4.next = 203;
          return regeneratorRuntime.awrap(redisClient.set(watch, JSON.stringify(watchResult), {
            EX: 10800,
            NX: true
          }));

        case 203:
          _context4.next = 205;
          return regeneratorRuntime.awrap(redisClient.set(recommended, JSON.stringify(recommendedData), {
            EX: 10800,
            NX: true
          }));

        case 205:
          _context4.next = 207;
          return regeneratorRuntime.awrap(redisClient.set(trending, JSON.stringify(trendingData), {
            EX: 172800,
            NX: true
          }));

        case 207:
          _context4.next = 209;
          return regeneratorRuntime.awrap(redisClient.set(info, JSON.stringify(showInfo), {
            EX: 172800,
            NX: true
          }));

        case 209:
          if (req.user == undefined) {
            loginState = false;
          } else {
            loginState = true;
            username = req.user.username;
          }

          if (!(loginState == true)) {
            _context4.next = 212;
            break;
          }

          return _context4.abrupt("return", res.render('watch.ejs', {
            data: watchResult,
            epData: epData,
            downloadUrl: downloadUrl,
            showInfo: showInfo,
            trending: trendingData,
            recommended: recommendedData,
            username: username,
            loginState: loginState,
            url: fullUrl
          }));

        case 212:
          return _context4.abrupt("return", res.render('watch.ejs', {
            data: watchResult,
            epData: epData,
            downloadUrl: downloadUrl,
            showInfo: showInfo,
            trending: trendingData,
            recommended: recommendedData,
            loginState: loginState,
            url: fullUrl
          }));

        case 215:
          _context4.prev = 215;
          _context4.t1 = _context4["catch"](157);
          console.error(_context4.t1);
          return _context4.abrupt("return", res.status(404).render('error.ejs', {
            loginState: loginState,
            username: username,
            url: fullUrl,
            errCode: "Failed to get episode data!"
          }));

        case 219:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[157, 215]]);
}

app.get("/:id", getWatchDataGogo);
app.get("/:id/zoro", getWatchDataZoro);
module.exports = app;