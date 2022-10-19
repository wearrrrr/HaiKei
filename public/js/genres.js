async function getGenres() {
    let genres;

    const res = await fetch(window.location.protocol + "//" + window.location.hostname + ":8080" + `/consumet/meta/anilist/genres?genres=`, {

    })

    genres = await res.json();

    console.log(genres)

    const slideContainer = document.getElementById("splide__list")
    slideContainer.style = "display: flex; align-items: center; justify-content: center"

    for (let c in genres) {
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
function toggle() {
    window.location.href = `/genre/${genre}`
}