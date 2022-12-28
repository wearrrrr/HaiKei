let randomData;
async function randomAnime() {
    let randomIcn = document.getElementById('random-btn').className = "fa-regular fa-spinner-third"
    document.getElementById('random-btn').classList.add("spinning")
    let randomOutput = await fetch('https://cors.haikei.xyz/https://api.haikei.xyz/meta/anilist/random-anime');
    randomData = await randomOutput.json()
    window.location.href = '/watch/' + randomData.title.romaji.replace(/ /g, '-').replace('.', '').replace(',', '').replace('/', '').replace('?', '').replace(/:/g, '').replace(/!/g, '').replace('∞', '').replace(/☆/g, '-').replace(/;/g, '').replace(/~/g, '').replace(/ä/g, 'a') + '-episode-1'
}