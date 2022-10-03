async function getRecentReleases() {
    let recentReleases;

    const res = await fetch("http://localhost:3001/recent-release", {

    })

    recentReleases = await res.json();

    console.log(recentReleases)

    const slideContainer = document.getElementById("splide__list")
    slideContainer.style = "display: flex; align-items: center; justify-content: center"

    for (let c in recentReleases) {
        // create slides
        const card = document.createElement("li")
        card.className = "splide__slide"
        card.setAttribute("onclick","window.location.href=" + `"${window.location.origin}/watch/${recentReleases[c].animeId}-episode-${recentReleases[c].episodeNum}"`);
        slideContainer.appendChild(card)

        // add image to slide
        const slideImg = document.createElement("img")
        slideImg.style = "width: 164px; height: 231px; align-self: center"
        slideImg.src = recentReleases[c].animeImg
        card.appendChild(slideImg)

        // add title to slide
        const animeTxt = document.createElement("p")
        animeTxt.textContent = recentReleases[c].animeTitle
        animeTxt.className = "splide__animeTitle"
        card.appendChild(animeTxt)

        // add episode number to slide
        const episodeTxt = document.createElement("p")
        episodeTxt.textContent = "Episode: " + recentReleases[c].episodeNum
        episodeTxt.className = "splide__episodeNum"        
        card.appendChild(episodeTxt)


        }



    carousel.mount();

    }
carouselInit()
getRecentReleases()