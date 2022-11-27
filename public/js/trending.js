let trending;
async function getTrending() {


    const res = await fetch(window.location.protocol + "//" + window.location.hostname + ":8080" + "/consumet/anime/gogoanime/top-airing", {

    })

    trending = await res.json();

    const slideContainer = document.getElementById("splide__list")
    slideContainer.style = "display: flex; align-items: center; justify-content: center"

    for (let c in trending.results) {
        // create slides
        const card = document.createElement("li")
        card.className = "splide__slide"
        card.setAttribute("onclick","window.location.href=" + `"${window.location.origin}/watch/${trending['results'][c].id}-episode-1"`);
        slideContainer.appendChild(card)

        // add image to slide
        const slideImg = document.createElement("img")
        slideImg.style = "width: 164px; height: 231px; align-self: center"
        slideImg.src = trending['results'][c].image
        card.appendChild(slideImg)

        // add title to slide
        const animeTxt = document.createElement("p")
        animeTxt.textContent = trending['results'][c].title
        animeTxt.className = "splide__animeTitle"
        card.appendChild(animeTxt)

        // add episode number to slide
        const releaseTxt = document.createElement("p")
        releaseTxt.textContent = "Genres: " + trending.results[c].genres[0] + ', ' +  trending.results[c].genres[1]
        releaseTxt.className = "splide__episodeNum"        
        card.appendChild(releaseTxt)


        }



    carousel.mount();

    }
carouselInit()
getTrending()