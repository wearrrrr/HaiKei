async function loadZoroSource(source) {
    let url = await fetch("https://api.haikei.xyz/anime/zoro/info?id=hk-hk-" + source) 
    let zoroData = await url.json()
    let zoroEp = zoroData.episodes[Number(ep) - 1]
    let zoroEpId = zoroEp.id
    let url2 = await fetch("https://api.haikei.xyz/anime/zoro/watch?episodeId=" + zoroEpId)
    zoroData2 = await url2.json()
    streamSource = zoroData2.sources.find(x => x.quality === 'auto')
    player.unload()
    player.load("https://cors.haikei.xyz/" + streamSource.url)
    video.addEventListener('loadeddata', (e) => {
        if (navigator.userAgent.includes("iPhone")) {
            loadSubsZoro();
        } else {
            if (video.readyState >= 3) {
                loadSubsZoro();
            }
        }
     });
}
async function loadSubsZoro() {
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
}
async function defaultSourceLoad() {
    if (defaultSource == "gogoanime") {
        let showID = document.getElementById('gogoanime').value
        let url = await fetch("https://api.haikei.xyz/anime/gogoanime/watch/" + showID + '-episode-' + ep + "?server=vidstreaming")
        data = await url.json()
        streamSource = data.sources.find(x => x.quality === 'default')
        player.load("https://proxy.vnxservers.com/proxy/m3u8/" + encodeURIComponent(streamSource.url) + "?forcedHeadersProxy=%7B%22Content-Type%22%3A%22video%2FMP2T%22%7D");
    } else if (defaultSource == "zoro") {
        loadZoroSource(document.getElementById('zoro').value)
    } else {
        let showID = document.getElementById('gogoanime').value
        let url = await fetch("https://api.haikei.xyz/anime/gogoanime/watch/" + showID + '-episode-' + ep + "?server=vidstreaming")
        data = await url.json()
        streamSource = data.sources.find(x => x.quality === 'default')
        player.load("https://proxy.vnxservers.com/proxy/m3u8/" + encodeURIComponent(streamSource.url) + "?forcedHeadersProxy=%7B%22Content-Type%22%3A%22video%2FMP2T%22%7D");
    }
}
let zoroData2;
defaultSourceLoad()
document.getElementById('select-source').addEventListener('change', async function(e) {
    destroyAniSkipButton()
    let source = e.target.value;
    let selector = document.getElementById('select-source')
    let options = selector.options
    let selectedIndex = options[selector.selectedIndex].id.toLowerCase()

    if (selectedIndex == "gogoanime") {
        let url = await fetch("https://api.haikei.xyz/anime/" + selectedIndex + "/watch/" + source + '-episode-' + ep + "?server=vidstreaming")
        data = await url.json()
        streamSource = data.sources.find(x => x.quality === 'default')
        player.unload()
        player.load("https://proxy.vnxservers.com/proxy/m3u8/" + encodeURIComponent(streamSource.url) + "?forcedHeadersProxy=%7B%22Content-Type%22%3A%22video%2FMP2T%22%7D");
        destroyAniSkipButton()
    }
    if (selectedIndex == "gogoanime (dub)") {
        let url = await fetch("https://api.haikei.xyz/anime/gogoanime/watch/" + source + '-episode-' + ep + "?server=vidstreaming")
        data = await url.json()
        streamSource = data.sources.find(x => x.quality === 'default')
        player.unload()
        player.load("https://proxy.vnxservers.com/proxy/m3u8/" + encodeURIComponent(streamSource.url) + "?forcedHeadersProxy=%7B%22Content-Type%22%3A%22video%2FMP2T%22%7D");
        destroyAniSkipButton()
    }
    if (selectedIndex == "zoro") {
        loadZoroSource(source)
        destroyAniSkipButton()

    }
    if (selectedIndex == "animepahe") {
        let url = await fetch("https://api.consumet.org/anime/" + selectedIndex + "/info/" + source) // https://api.haikei.xyz/anime/animepahe/info/4
        let data = await url.json()
        let paheEp = data.episodes[Number(ep) - 1]
        let paheEpId = paheEp.id
        let url2 = await fetch("https://api.consumet.org/anime/" + selectedIndex + "/watch/" + paheEpId)
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
        player.load("https://cors.haikei.xyz/" + streamSource.url)
    }
})