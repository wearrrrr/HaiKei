let perPage = 5

function carouselInit() {
    carousel = new Splide('.splide', {
        type: "loop",
        perPage: perPage,
        gap: "10px",
        breakpoints: {
            1000: {
                perPage: 4,
            },
            730: {
                perPage: 3,
            },
            525: {
                perPage: 2,
            },
        },
        paginationKeyboard: true,
        height: '480px',
        }) // loads splide.js
    console.log("carousel.js loaded!")
}