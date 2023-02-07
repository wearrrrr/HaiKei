// Universal Functions for Every HaiKei page

function defaultConfig() {
    localStorage.setItem("_noads", false)
    localStorage.setItem("_firstload", false)
    localStorage.setItem("videoSource", "gogoanime")
}
if (localStorage.getItem("_firstload") == undefined) {
    defaultConfig()
}