$("#login").iziModal();
$("#userInfo").iziModal();
$("#register").iziModal();


setTimeout(() => {
  const iziModalCSS = document.createElement("link");
  iziModalCSS.rel = "stylesheet";
  iziModalCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/izimodal/1.6.1/css/iziModal.css";
  document.head.appendChild(iziModalCSS);

  const fontAwesomeCSS = document.createElement("link");
  fontAwesomeCSS.rel = "stylesheet";
  fontAwesomeCSS.href = "https://site-assets.fontawesome.com/releases/v6.2.1/css/all.css";
  document.head.appendChild(fontAwesomeCSS);
}, 0);
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