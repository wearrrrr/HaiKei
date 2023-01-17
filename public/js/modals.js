$("#login").iziModal();
$("#userInfo").iziModal();
$("#register").iziModal();

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