// e.keyCode added for legacy support, if no one uses a legacy browser I will remove this in a later release
let searchBox = document.getElementById("search-box")
searchBox.addEventListener('keyup', function(e) {
    if (e.key == "Enter" || e.keyCode == 13) {
        window.location.href = `/search?query=${searchBox.value}`
    }
})