const app = require("express")();

const cheerio = require("cheerio");
const cors = require("cors");
const rs = require("request");
const axios = require("axios");
const port = 5000;
const path  = require("path");
  const fs = require("fs");
let config = require("../config.js");
const db = require("quick.db");
const CryptoJS = require("crypto-js")
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
const Referer = "https://gogoplay.io/"
const BASE_URL = config.gogoanime_url;
const ajax_url = "https://ajax.gogo-load.com/"
const ENCRYPTION_KEYS_URL = "https://raw.githubusercontent.com/justfoolingaround/animdl-provider-benchmarks/master/api/gogoanime.json"

app.set("views", path.join(__dirname, "views"));
const baseURL = config.gogoanime_url;

app.all('*', (req, res, next) => {

    //  CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    //  Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //  Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET','POST', 'OPTIONS');

    next();
});
app.get("/", (req, res) => {
  let info = {
    popular: "http://localhost:6969/api/popular/:page",
    details: "http://localhost:6969/api/details/:id",
    search: "http://localhost:6969/api/search/:word/:page",
    episode_details: "http://localhost:6969/api/watching/:id/:episode",
    genre: "http://localhost:6969/api/genre/:type/:page",
    recently_added: "http://localhost:6969/api/recently_added/:page",
    anime_list: "http://localhost:6969/api/list/:page",
    genrelist: "http://localhost:6969/api/genrelist",
    movies_list: "http://localhost:6969/api/movies",
    tv_shows_list: "http://localhost:6969/api/tv-shows",
    watch_iframe: "http://localhost:6969/watch/:id/:episode"
  };
  res.send(info);
});
app.get("/api/popular/:page", (req, res) => {
  let results = [];
  let page = req.params.page;
  if (isNaN(page)) {
    return res.status(404).json({ results });
  }
  url = `${baseURL}popular.html?page=${req.params.page}`;
  rs(url, (error, response, html) => {
    if (!error) {
      try {
        var $ = cheerio.load(html);
        $(".img").each(function (index, element) {
          let title = $(this).children("a").attr().title;
          let id = $(this).children("a").attr().href.slice(10);
          let image = $(this).children("a").children("img").attr().src;

          results[index] = { title, id, image };
        });
        res.status(200).json({ results });
      } catch (e) {
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});

app.get("/api/details/:id", async(req, res) => {
  let results = [];

  siteUrl = `${baseURL}category/${req.params.id}`;
  rs(siteUrl, async(err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        var type = " ";
        var summary = "";
        var relased = "";
        var status = "";
        var genres = "";
        var Othername = "";
        var title = $(".anime_info_body_bg").children("h1").text();
        var image = $(".anime_info_body_bg").children("img").attr().src;

        $("p.type").each(function (index, element) {
          if ("Type: " == $(this).children("span").text()) {
            type = $(this).text().slice(15, -5);
          } else if ("Plot Summary: " == $(this).children("span").text()) {
            summary = $(this).text().slice(14);
          } else if ("Released: " == $(this).children("span").text()) {
            relased = $(this).text().slice(10);
          } else if ("Status: " == $(this).children("span").text()) {
            status = $(this).text().slice(8);
          } else if ("Genre: " == $(this).children("span").text()) {
            genres = $(this).text().slice(20, -4);
            genres = genres.split(",");
            genres = genres.join(",");
          } else "Other name: " == $(this).children("span").text();
          {
            Othername = $(this).text().slice(12);
          }
        });
    
  
     el = $('#episode_page')

    ep_start = 0

    ep_end = el.children().last().find('a').attr('ep_end')
  const movie_id = $('#movie_id').attr('value')
        const alias = $('#alias_anime').attr('value')
  let epList = [];
     html = await axios.get(`https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${movie_id}&default_ep=${0}&alias=${alias}`)
        const $$ = cheerio.load(html.data);

  await $$(" #episode_related > li").each(async(i, elem) => {

           await epList.push({
               id: $(elem).find("a").attr("href").split('/')[1],
               number: $(elem).find(`div.name`).text(),
            })
        })
   
        genres.replace(" ");
        var totalepisode = $("#episode_page")
          .children("li")
          .last()
          .children("a")
          .attr().ep_end;
        results[0] = {
          title,
          image,
          type,
          summary,
          epList,
          relased,
          genres,
          status,
          totalepisode,
          Othername,
        };
        res.status(200).json({ results });
      } catch (e) {
        console.log(e)
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});

app.get("/api/search/:word/:page", (req, res) => {
  let results = [];
  var word = req.params.word;
  let page = req.params.page;
  if (isNaN(page)) {
    return res.status(404).json({ results });
  }

  url = `${baseURL}/search.html?keyword=${word}&page=${req.params.page}`;
  rs(url, (err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        $("div.last_episodes ul.items li").each(function (index, element) {
          let title = $(this).children("div.img").children("a").attr().title;
          let id = $(this).children("div.img").children("a").attr().href.slice(10);
          let image = $(this).children("div.img").children("a").children("img").attr().src;
          let released = $(this).children("p.released").text();
if(released === "") {
  released = "Date not updated";
}
          results[index] = { title, id, image, released };
        });
        res.status(200).json({ results });
      } catch (e) {
        console.log(e)
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});
app.get("/api/tv-shows", (req, res) => {
  let results = [];
  

  url = `${baseURL}/new-season.html`;
  rs(url, (err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        $("div.last_episodes ul.items li").each(function (index, element) {
          let title = $(this).children("div.img").children("a").attr().title;
          let id = $(this).children("div.img").children("a").attr().href.slice(10);
          let image = $(this).children("div.img").children("a").children("img").attr().src;
          let released = $(this).children("p.released").text();
if(released === "") {
  released = "Date not updated";
}
          results[index] = { title, id, image, released };
        });
        
        res.status(200).json({ results });
      } catch (e) {
        console.log(e)
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});

app.get("/api/movies", (req, res) => {
  let results = [];
  

  url = `${baseURL}/anime-movies.html`;
  rs(url, (err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        $("div.last_episodes ul.items li").each(function (index, element) {
          let title = $(this).children("div.img").children("a").attr().title;
          let id = $(this).children("div.img").children("a").attr().href.slice(10);
          let image = $(this).children("div.img").children("a").children("img").attr().src;
          let released = $(this).children("p.released").text();
          console.log(released)
if(released === "") {
  released = "Date not updated";
}
          results[index] = { title, id, image, released };
        });
        
        res.status(200).json({ results });
      } catch (e) {
        console.log(e)
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});

async function getLink(Link) {
  rs(Link, (err, resp, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      let links = [];
      $("a").each((i, e) => {
        if (e.attribs.download === "") {
          links.push(e.attribs.href);
        }
      });
      return links;
    }
  });
}

app.get("/api/watching/:id/:episode", async (req, res) => {

  let nl = [];
  var totalepisode = [];
  var id = req.params.id;
  var episode = req.params.episode;
  url = `${baseURL + id}-episode-${episode}`;
let link;

  rs(url, async (err, resp, html) => {

    if (!err) {
      try {
        var $ = cheerio.load(html);

        if ($(".entry-title").text() === "404") {
          return res
            .status(404)
            .json({ links: [], link, totalepisode: totalepisode });
        }

        totalepisode = $("#episode_page")
          .children("li")
          .last()
          .children("a")
          .text()
          .split("-");
        totalepisode = totalepisode[totalepisode.length - 1];
        link = $("li.anime").children("a").attr("data-video");
        const cl = "http:" + link.replace("streaming.php", "download");
        var linkx = "https://animexninja-ap.dhvitop1.repl.co/watch/"+ id + "/" + episode;
    
      var fid = $("div.anime_muti_link ul li.xstreamcdn a").attr("data-video");
        fid = fid.replace("https://fembed-hd.com/v/", "");
     
          
           el = $('#episode_page')

    ep_start = 0

    ep_end = el.children().last().find('a').attr('ep_end')
  const movie_id = $('#movie_id').attr('value')
        const alias = $('#alias_anime').attr('value')
  let epList = [];
     html = await axios.get(`https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=${ep_start}&ep_end=${ep_end}&id=${movie_id}&default_ep=${0}&alias=${alias}`)
        const $$ = cheerio.load(html.data);

  await $$(" #episode_related > li").each(async(i, elem) => {

           await epList.push({
               id: $(elem).find("a").attr("href").split('/')[1],
               number: $(elem).find(`div.name`).text(),
            })
        })
   
        
             
              return res
                .status(200)
                .json({ links: nl, link: linkx, totalepisode: totalepisode, epList: epList });
           
          
        
      } catch (e) {
    
            
                
               
              
        return res
          .status(404)
          .json({ links: [], totalepisode: totalepisode });
      }
    }
  });
});


let iv = null;
let key = null;
let second_key = null;
const fetch_keys = async() => {
    const response = await axios.get(ENCRYPTION_KEYS_URL);
    const res = response.data;
    return {
        iv: CryptoJS.enc.Utf8.parse(res.iv),
        key: CryptoJS.enc.Utf8.parse(res.key),
        second_key: CryptoJS.enc.Utf8.parse(res.second_key)
    };
}
async function generateEncryptAjaxParameters($, id) {
 const keys = await fetch_keys();
    iv = keys.iv;
    key = keys.key;
    second_key = keys.second_key;

    const
        cryptVal = $("script[data-name='episode']").data().value,
        decryptedData = CryptoJS.AES['decrypt'](cryptVal, key, {
            'iv': iv
        }),
        decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData),
        videoId = decryptedStr.substring(0, decryptedStr.indexOf('&')),
        encryptedVideoId = CryptoJS.AES['encrypt'](videoId, key, {
            'iv': iv
        }).toString();

    return 'id=' + encryptedVideoId + decryptedStr.substring(decryptedStr.indexOf('&')) + '&alias=' + videoId;

}
 function decryptEncryptAjaxResponse(obj) {
    const decrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(obj.data, second_key, {
        'iv': iv
    }));
    return JSON.parse(decrypted);
}




app.get("/watch/:id/:episode", async(req, res) => {
  try {
  var id = req.params.id;
  var episode = req.params.episode;
  
        let urlx = `${baseURL}${id}-episode-${episode}`;
  let ress = await axios.get(`${urlx}`);
  let $ = cheerio.load(ress.data);
     link = new URL("https:" + $("li.anime").children("a").attr("data-video"));
      let prev = $(".anime_video_body_episodes_l")
      let next = $(".anime_video_body_episodes_r");
   prev = prev.children("a").text() ? `https://animexninja-api.dhvitop1.repl.co/watch/${id}/${Number(episode) - 1}` : null;
     next = next.children("a").text() ? `https://animexninja-api.dhvitop1.repl.co/watch/${id}/${Number(episode) + 1}` : null;
  
 


  let result = await scrapeMP4(link);

db.set(`${id}-episode-${episode}`, {
  result: result,
});
  return res.render("index.ejs", { result: result, prev: prev, next: next, episode: episode });
  
  } catch(e) {
    console.log(e)
   return res.send("404");
  }

})



function useRegex(input) {
    let regex = /<a ?.*? href="(?:(?:.*?nzarticles\.xyz.*?)|(?:[^\.]*?))".*?>(.*?)<\/a>/gm;
    return input.match(regex);
}




const scrapeMP4 = async( serverUrl ) => {
let sources = []
  const goGoServerPage = await axios.get(serverUrl.href, { headers: { 'User-Agent': USER_AGENT } })
        const $$ = cheerio.load(goGoServerPage.data)

        const params = await generateEncryptAjaxParameters($$, serverUrl.searchParams.get('id'));


  //console.log(params)
        const fetchRes = await axios.get(`
        ${serverUrl.protocol}//${serverUrl.hostname}/encrypt-ajax.php?${params}`, {
            headers: {
                'User-Agent': USER_AGENT,
                'Referer': serverUrl.href,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        const res =  decryptEncryptAjaxResponse(fetchRes.data)

        if (!res.source) return { error: "No source found" };


 
        res.source_bk.forEach(source => sources.push(source))
 res.source.forEach(source => source.file.includes("m3u8") ? sources.push(source) : sources.push({
   file: ""
 }));
 
   let watch = sources[0].file;
   let sr2 = sources[1] && sources[1].file.includes("m3u8") ? sources[1].file : null;
  let sourcer;
   if(sr2) {
      sourcer = sr2;
   } else {
      sourcer = watch;
   }
        return {
            Referer: serverUrl.href,
            sources: watch,
            sources2: sr2,
          all: res.source,
           sourcer: sourcer
        }

   
 
    
}

app.get("/api/genre/:type/:page", (req, res) => {
  var results = [];
  var type = req.params.type;
  var page = req.params.page;
  if (isNaN(page)) {
    return res.status(404).json({ results });
  }
  url = `${baseURL}genre/${type}?page=${page}`;
  rs(url, (err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        $(".img").each(function (index, element) {
          let title = $(this).children("a").attr().title;
          let id = $(this).children("a").attr().href.slice(10);
          let image = $(this).children("a").children("img").attr().src;

          results[index] = { title, id, image };
        });

        res.status(200).json({ results });
      } catch (e) {
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});

app.get("/api/recently_added/:page", (req, res) => {
  var page = req.params.page;
  var results = [];
  if (isNaN(page)) {
    return res.status(404).json({ results });
  }
  url = `${baseURL}?page=${page}`;
  rs(url, (err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        $(".img").each(function (index, element) {
          let title = $(this).children("a").attr().title;
          let id = $(this).children("a").attr().href.slice(1);
          let image = $(this).children("a").children("img").attr().src;
          let episodenumber = $(this)
            .parent()
            .children("p.episode")
            .text()
            .replace(" ", "-")
            .toLowerCase();
          id = id.replace("-" + episodenumber, "");
          episodenumber = episodenumber.replace("episode-", "");
          results[index] = { title, id, image, episodenumber };
        });

        res.status(200).json({ results });
      } catch (e) {
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});

app.get("/api/genrelist", (req, res) => {
  var list = [];

  let url = baseURL;
  rs(url, (err, resp, html) => {
    if (!err) {
      try {
        var $ = cheerio.load(html);
        $("nav.genre")
          .children("ul")
          .children("li")
          .each(function (index, element) {
            list[index] = $(this).text();
          });

        res.status(200).json({ list });
      } catch (e) {
        res.status(404).json({ e: "404 fuck off!!!!!" });
      }
    }
  });
});



 app.listen(config.port, () => { console.log(`Api running on port ${config.port}. Add http://localhost:${config.port} to the website config.`)});

module.exports = app;
