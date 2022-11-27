const consumetURL = "http://localhost:8081/http://localhost:8080/"
let recentReleases;
let recentReleases2;
async function loadRecentReleases() {
    fetch(`${consumetURL}anime/gogoanime/recent-episodes`)
    .then((response) => response.json())
    .then((data) => recentReleases = data)
    .then(() => 
    recentReleases.results.forEach((ep) => {
        
    }));
    fetch(`${consumetURL}anime/gogoanime/recent-episodes?page=2`)
    .then((response) => response.json())
    .then((data) => recentReleases2 = data);
}
loadRecentReleases()
