const cp = require('child_process')
const path = require('path')

const names = ["rowan", "jayden", "chris", "john"]

let childProcess = cp.fork("server.js", names, {cwd: "./"})

childProcess.on("message", function (data) {
    console.log(data)
});