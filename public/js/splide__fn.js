let perPage = 6

function carouselInit() {
    carousel = new Splide('.splide', {
        type: "loop",
        perPage: perPage,
        gap: "10px",
        breakpoints: {
            1800: {
                perPage: 8
            },
            1500: {
                perPage: 4,
            },
            730: {
                perPage: 3,
            },
            525: {
                perPage: 2,
            },
            350: {
                perPage: 1,
            }
        },
        paginationKeyboard: true,
        height: '480px',
        }) // loads splide.js
    console.log("carousel.js loaded!")
}