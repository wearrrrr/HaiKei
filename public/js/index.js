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
$("#login").iziModal();
$("#userInfo").iziModal();

let navFlag = 0; // false

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navFlag === 1) {
        sidebarClose();
    }
});

function sidebarOpen() {
  if (window.innerWidth <= 585) {
    document.getElementById("sidebar-nav").style.width = "100%";
    navFlag = 1; // true
  } else {
    document.getElementById("sidebar-nav").style.width = "360px";
    document.getElementById("sidebar-nav").style.filter = "brightness(1.5)"
    document.getElementById('full-doc').style.filter = "brightness(0.5)"
    navFlag = 1;
  }

}

function sidebarClose() {
    document.getElementById("sidebar-nav").style.width = "0";
    document.getElementById("sidebar-nav").style.filter = "brightness(0)"
    document.getElementById('full-doc').style.filter = "brightness(1)"
    navFlag = 0;
}
let ele = document.querySelector(':root');
let cs = getComputedStyle(ele);
let brandColor = cs.getPropertyValue('--brand-color')
let textColor = cs.getPropertyValue('--light-accent')

function loadLangFromLocalStorage() {
    if (localStorage.getItem('lang') === 'undefined' || localStorage.getItem('lang') === null) {
        engNames();
     }
    if (localStorage.getItem('lang') === 'jp') {
        romajiNames();
    } else {
        engNames();
    }
}

loadLangFromLocalStorage();

function engNames() {
    document.getElementById("jp").style.backgroundColor = "";
    document.getElementById("jp").style.color = textColor;
    document.getElementById("eng").style.backgroundColor = brandColor;
    document.getElementById("eng").style.color = "white";

    let jp_titles = document.getElementsByClassName('jp-title')
    let eng_titles = document.getElementsByClassName('eng-title')



    for (i = 0; i < eng_titles.length; i++) {
        if (eng_titles[i].classList.contains("hidden")) {
            jp_titles[i].classList.add('hidden')
            eng_titles[i].classList.remove("hidden")
        } else {

        }
    }

    localStorage.setItem('lang', 'en');

}

function romajiNames() {
    document.getElementById("eng").style.backgroundColor = "transparent";
    document.getElementById("eng").style.color = textColor;
    document.getElementById("jp").style.backgroundColor = brandColor;
    document.getElementById("jp").style.color = "white";

    let jp_titles = document.getElementsByClassName('jp-title')
    let eng_titles = document.getElementsByClassName('eng-title')



    for (i = 0; i < jp_titles.length; i++) {
        if (jp_titles[i].classList.contains("hidden")) {
            eng_titles[i].classList.add('hidden')
            jp_titles[i].classList.remove("hidden")
        } else {

        }
    }

    localStorage.setItem('lang', 'jp');
}