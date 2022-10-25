const cp = require('child_process')
const path = require('path')
const chalk = require('chalk')
const prompt = require('prompt-sync')({sigint: true});


// Chalk template for console output.
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.bold.blue;
const success = chalk.bold.green;

let askToExec = prompt(info(`Would you like to execute the following node processes? This will start a web server and api server (y/n)`))
if (askToExec.toLowerCase() == "y" || askToExec.toLowerCase() == "yes") {

console.log(success("Starting Web Server..."))

let webServer = cp.fork("server.js", {cwd: "./"})

webServer.on("message", function (data) {
    console.log("Message From Child ==> " + info(data))
})

webServer.on("exit", function(exitCode) {
    console.log(exitCode)
})

let apiServer = cp.fork("api.js", {cwd: "./gogoanime-api/lib"})
let aioServer = cp.fork("bin.js", { cwd: "./all-in-one/"})



} else if (askToExec.toLowerCase() !== "y") {
console.log(error("User denied permission to execute"))
process.exit()
}
