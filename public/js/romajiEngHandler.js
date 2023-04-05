let ele = document.querySelector(':root');
let cs = getComputedStyle(ele);
let brandColor = cs.getPropertyValue('--brand-color')
let textColor = cs.getPropertyValue('--light-accent')

let currentLang = localStorage.getItem('lang') || "jp"

function loadLangFromLocalStorage() {
    if (localStorage.getItem('lang') === 'undefined' || localStorage.getItem('lang') === null) {
        swapNamesToJP();
     }
    if (localStorage.getItem('lang') === 'jp') {
        swapNamesToJPInit();
    } else {
        swapNamesToEngInit();
    }
}

loadLangFromLocalStorage();

function swapNamesToEng() {
    document.getElementById("jp").style.backgroundColor = "";
    document.getElementById("jp").style.color = textColor;
    document.getElementById("eng").style.backgroundColor = brandColor;
    document.getElementById("eng").style.color = "white";

    let titleSwap = document.getElementsByClassName('language-toggleable')
    let arrToSwap = []
    let currentTitles = []
    for (let i = 0; i < titleSwap.length; i++) {
        titleSwap[i].style.opacity = 0;
        arrToSwap.push(titleSwap[i].dataset.altName)
        currentTitles.push(titleSwap[i].innerText)
    }
    setTimeout(() => {
        for (let i = 0; i < titleSwap.length; i++) {
            titleSwap[i].innerText = arrToSwap[i]
            titleSwap[i].dataset.altName = currentTitles[i]
            titleSwap[i].style.opacity = 1;
        }
    }, 250);

    localStorage.setItem("lang", "eng")
}

function swapNamesToEngInit() {
    document.getElementById("jp").style.backgroundColor = "";
    document.getElementById("jp").style.color = textColor;
    document.getElementById("eng").style.backgroundColor = brandColor;
    document.getElementById("eng").style.color = "white";

    let titleSwap = document.getElementsByClassName('language-toggleable')
    let arrToSwap = []
    let currentTitles = []
    for (let i = 0; i < titleSwap.length; i++) {
        arrToSwap.push(titleSwap[i].dataset.altName)
        currentTitles.push(titleSwap[i].innerText)
        titleSwap[i].style.display = "-webkit-box";
    }
    for (let i = 0; i < titleSwap.length; i++) {
        titleSwap[i].innerText = arrToSwap[i]
        titleSwap[i].dataset.altName = currentTitles[i]
    }

    localStorage.setItem("lang", "eng")
}

function swapNamesToJPInit() {
    document.getElementById("eng").style.backgroundColor = "";
    document.getElementById("eng").style.color = textColor;
    document.getElementById("jp").style.backgroundColor = brandColor;
    document.getElementById("jp").style.color = "white";

    let itemsToReveal = document.getElementsByClassName("language-toggleable")

    for (let i = 0; i < itemsToReveal.length; i++) {
        itemsToReveal[i].style.display = "-webkit-box";
    }

    localStorage.setItem("lang", "jp")
}

function swapNamesToJP() {
    document.getElementById("eng").style.backgroundColor = "";
    document.getElementById("eng").style.color = textColor;
    document.getElementById("jp").style.backgroundColor = brandColor;
    document.getElementById("jp").style.color = "white";

    let titleSwap = document.getElementsByClassName('language-toggleable')
    let arrToSwap = []
    let currentTitles = []
    for (let i = 0; i < titleSwap.length; i++) {
        titleSwap[i].style.opacity = 0;
        arrToSwap.push(titleSwap[i].dataset.altName)
        currentTitles.push(titleSwap[i].innerText)
    }
    setTimeout(() => {
        for (let i = 0; i < titleSwap.length; i++) {
            titleSwap[i].innerText = arrToSwap[i]
            titleSwap[i].dataset.altName = currentTitles[i]
            titleSwap[i].style.opacity = 1;
        }
    }, 250);

    localStorage.setItem("lang", "jp")
}

document.getElementById("eng").addEventListener("click", () => {
    document.getElementById("eng").classList.add("active")
    document.getElementById("jp").classList.remove("active")
    swapNamesToEng();
});
document.getElementById("jp").addEventListener("click", () => {
    document.getElementById("jp").classList.add("active")
    document.getElementById("eng").classList.remove("active")
    swapNamesToJP();
});