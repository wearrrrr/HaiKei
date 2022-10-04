async function getTrending() {
    let trending;

    const res = await fetch("http://localhost:3001/top-airing", {

    })

    trending = await res.json();

    console.log(trending)

    const slideContainer = document.getElementById("splide__list")
    slideContainer.style = "display: flex; align-items: center; justify-content: center"

    for (let c in trending) {
        // create slides
        const card = document.createElement("li")
        card.className = "splide__slide"
        card.setAttribute("onclick","window.location.href=" + `"${window.location.origin}/watch/${trending[c].animeId}-episode-1"`);
        slideContainer.appendChild(card)

        // add image to slide
        const slideImg = document.createElement("img")
        slideImg.style = "width: 164px; height: 231px; align-self: center"
        slideImg.src = trending[c].animeImg
        card.appendChild(slideImg)

        // add title to slide
        const animeTxt = document.createElement("p")
        animeTxt.textContent = trending[c].animeTitle
        animeTxt.className = "splide__animeTitle"
        card.appendChild(animeTxt)

        // add episode number to slide
        const releaseTxt = document.createElement("p")
        releaseTxt.textContent = "Latest Episode: " + trending[c].latestEp
        releaseTxt.className = "splide__episodeNum"        
        card.appendChild(releaseTxt)


        }



    carousel.mount();

    }
carouselInit()
getTrending()