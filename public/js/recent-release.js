async function getRecentReleases() {
    let recentReleases;

    const res = await fetch(window.location.protocol + "//" + window.location.hostname + ":8080/consumet/anime/gogoanime/recent-episodes", {

    })

    recentReleases = await res.json();

    const slideContainer = document.getElementById("splide__list")
    slideContainer.style = "display: flex; align-items: center; justify-content: center"

    for (let c in recentReleases.results) {
        // create slides
        const card = document.createElement("li")
        card.className = "splide__slide"
        card.setAttribute("onclick","window.location.href=" + `"${window.location.origin}/watch/${recentReleases.results[c].episodeId}"`);
        slideContainer.appendChild(card)

        // add image to slide
        const slideImg = document.createElement("img")
        slideImg.style = "width: 164px; height: 231px; align-self: center"
        slideImg.src = recentReleases.results[c].image
        card.appendChild(slideImg)

        // add title to slide
        const animeTxt = document.createElement("p")
        animeTxt.textContent = recentReleases.results[c].title
        animeTxt.className = "splide__animeTitle"
        card.appendChild(animeTxt)

        // add episode number to slide
        const episodeTxt = document.createElement("p")
        episodeTxt.textContent = "Episode: " + recentReleases.results[c].episodeNumber
        episodeTxt.className = "splide__episodeNum"        
        card.appendChild(episodeTxt)


        }



    carousel.mount();

    }
carouselInit()
getRecentReleases()