"use strict";

var express = require('express');

var app = express.Router();

var axios = require('axios');

var redis = require("redis");

var config = require('../config');

var consumetURL = config.app.api_url3;

var _require = require('@consumet/extensions'),
    ANIME = _require.ANIME;

var gogoanime = new ANIME.Gogoanime();
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

app.get('/', function _callee2(req, res) {
  var loginState, username, user, fullUrl, recentReleasesData, recentReleases2Data, cacheResults, cacheResults2, recentReleases, recentReleases2;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          fullUrl = "".concat(req.protocol, "://").concat(req.get("host")).concat(req.originalUrl);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(redisClient.get("recent-episodes"));

        case 4:
          cacheResults = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(redisClient.get("recent-episodes?page=2"));

        case 7:
          cacheResults2 = _context2.sent;

          if (!cacheResults) {
            _context2.next = 13;
            break;
          }

          isCached = true;
          recentReleasesData = JSON.parse(cacheResults);
          _context2.next = 21;
          break;

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(gogoanime.fetchRecentEpisodes('1'));

        case 15:
          recentReleases = _context2.sent;
          _context2.next = 18;
          return regeneratorRuntime.awrap(recentReleases.results);

        case 18:
          recentReleasesData = _context2.sent;
          _context2.next = 21;
          return regeneratorRuntime.awrap(redisClient.set('recent-episodes', JSON.stringify(recentReleasesData), {
            EX: 7200,
            NX: true
          }));

        case 21:
          if (!cacheResults2) {
            _context2.next = 26;
            break;
          }

          isCached = true;
          recentReleases2Data = JSON.parse(cacheResults2);
          _context2.next = 34;
          break;

        case 26:
          _context2.next = 28;
          return regeneratorRuntime.awrap(gogoanime.fetchRecentEpisodes('2'));

        case 28:
          recentReleases2 = _context2.sent;
          _context2.next = 31;
          return regeneratorRuntime.awrap(recentReleases2.results);

        case 31:
          recentReleases2Data = _context2.sent;
          _context2.next = 34;
          return regeneratorRuntime.awrap(redisClient.set('recent-episodes?page=2', JSON.stringify(recentReleases2Data), {
            EX: 7200,
            NX: true
          }));

        case 34:
          if (req.user == undefined) {
            loginState = false;
          } else {
            loginState = true;
            username = req.user.username;
            user = req.user;
          }

          if (!(loginState == true)) {
            _context2.next = 39;
            break;
          }

          return _context2.abrupt("return", res.render('index.ejs', {
            recentReleases: recentReleasesData,
            recentReleases2: recentReleases2Data,
            username: username,
            user: user,
            loginState: loginState,
            url: fullUrl
          }));

        case 39:
          return _context2.abrupt("return", res.render('index.ejs', {
            recentReleases: recentReleasesData,
            recentReleases2: recentReleases2Data,
            loginState: loginState,
            url: fullUrl
          }));

        case 40:
          _context2.next = 46;
          break;

        case 42:
          _context2.prev = 42;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(404).render('error.ejs', {
            loginState: loginState
          }));

        case 46:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 42]]);
});
app.get('/anime/:id', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.redirect('/watch/' + req.params.id + '-episode-1');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/error', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (req.user == undefined) {
            loginState = false;
          } else {
            loginState = true;
            username = req.user.username;
            user = req.user;
          }

          if (!(loginState == true)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.render('error.ejs', {
            loginState: loginState,
            username: username,
            errCode: "N/A"
          }));

        case 5:
          return _context4.abrupt("return", res.render('error.ejs', {
            loginState: loginState,
            errCode: "N/A"
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = app;