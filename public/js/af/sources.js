async function defaultSourceLoad() {
    let showID = document.getElementById('Gogoanime').value
    let url = await fetch("https://api.haikei.xyz/anime/gogoanime/watch/" + showID + '-episode-' + ep + "?server=vidstreaming")
    data = await url.json()
    streamSource = data.sources.find(x => x.quality === 'default')
    player.load(streamSource.url)
}
let zoroData2;
defaultSourceLoad()
document.getElementById('select-source').addEventListener('change', async function(e) {
    let source = e.target.value;
    let selector = document.getElementById('select-source')
    let options = selector.options
    let selectedIndex = options[selector.selectedIndex].id.toLowerCase()

    if (selectedIndex == "gogoanime") {
        let url = await fetch("https://api.haikei.xyz/anime/" + selectedIndex + "/watch/" + source + '-episode-' + ep + "?server=vidstreaming")
        data = await url.json()
        streamSource = data.sources.find(x => x.quality === 'default')
        player.unload()
        streamSource.url.replace('.pro', '.net')
        player.load(streamSource.url)
        destroyAniSkipButton()
    }
    if (selectedIndex == "gogoanime (dub)") {
        let url = await fetch("https://api.haikei.xyz/anime/gogoanime/watch/" + source + '-episode-' + ep + "?server=vidstreaming")
        data = await url.json()
        streamSource = data.sources.find(x => x.quality === 'default')
        player.unload()
        player.load(streamSource.url)
        destroyAniSkipButton()
    }
    if (selectedIndex == "zoro") {
        // im still not sure why this works but it does
        let url = await fetch("https://api.haikei.xyz/anime/" + selectedIndex + "/info?id=hk-hk-" + source) 
        let zoroData = await url.json()
        let zoroEp = zoroData.episodes[Number(ep) - 1]
        let zoroEpId = zoroEp.id
        let url2 = await fetch("https://api.haikei.xyz/anime/" + selectedIndex + "/watch?episodeId=" + zoroEpId)
        zoroData2 = await url2.json()
        streamSource = zoroData2.sources.find(x => x.quality === 'auto')
        // load in the url, but add a cors proxy to it
        player.unload()
        player.load("https://cors.haikei.xyz/" + streamSource.url)
        setTimeout(() => {
            let subtitles = zoroData2.subtitles;
            let subtitleForm;
            subtitles.forEach((track) => {
            if (track.lang == "English") {
                subtitleForm = "en"
            } else if (track.lang == "Arabic - العربية (Arabic)") {
                subtitleForm = "ar"
            } else if (track.lang == "French") {
                subtitleForm = "fr"
            } else if (track.lang == "Portuguese - Português (Brasil)") {
                subtitleForm = "pt"
            } else if (track.lang == "Spanish - Español (España)") {
                subtitleForm = "es"
            } else if (track.lang == "Russian - Русский (Russian)") {
                subtitleForm = "ru"
            } else if (track.lang == "German - Deutsch") {
                subtitleForm = "de"
            } else if (track.lang == "Italian - Italiano (Italian)") {
                subtitleForm = "it"
            }
            
            player.addTextTrackAsync(track.url, subtitleForm, 'subtitle', 'text/vtt', '', track.lang)
            }); 
        }, 500);
        destroyAniSkipButton()

    }
    if (selectedIndex == "animepahe") {
        let url = await fetch("https://api.haikei.xyz/anime/" + selectedIndex + "/info/" + source) // https://api.haikei.xyz/anime/animepahe/info/4
        let data = await url.json()
        let paheEp = data.episodes[Number(ep) - 1]
        let paheEpId = paheEp.id
        let url2 = await fetch("https://api.haikei.xyz/anime/" + selectedIndex + "/watch/" + paheEpId)
        data2 = await url2.json()
        console.log(data2)
        // this is what happens to a mf when there isn't an auto quality selector.
        streamSource = data2.sources.find(x => x.quality === '1080')
        if (streamSource == undefined) {
            streamSource = data2.sources.find(x => x.quality === '720')
        } if (streamSource == undefined) {
            streamSource = data2.sources.find(x => x.quality === '480')
        } if (streamSource == undefined) {
            streamSource = data2.sources.find(x => x.quality === '360')
        }
        player.unload()
        player.getNetworkingEngine().registerRequestFilter(function(type, request) {
            console.log(request);
            request.headers["x-referer"] = "https://kwik.cx/"
          });  
        player.load("https://cdn.nade.me/redirect?url=" + streamSource.url)
    }
})