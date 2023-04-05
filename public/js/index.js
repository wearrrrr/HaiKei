const swiper = new Swiper(".swiper", {
  // Optional parameters
    direction: "horizontal",
    loop: true,
    allowTouchMove: true,
    pagination: {
    el: ".swiper-pagination",
    },
    autoplay: {
        delay: 6000,

    },
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
});