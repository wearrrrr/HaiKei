const cp = require('child_process')
const os = require('os')
const path = require('path')
const chalk = require('chalk')


// Chalk template for console output.
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const info = chalk.bold.blue;
const success = chalk.bold.green;

console.log(success("Starting Web Server..."))

let webServer = cp.fork("server.js", {cwd: "./"})

webServer.on("message", function (data) {
    console.log("Message From Child ==> " + info(data))
})

webServer.on("exit", function(exitCode) {
    console.log(exitCode)
})
if (os.platform == "win32") {
    console.log("platform is win32")
    console.log(success("Starting Consumet..."))
    let consumetServer = cp.spawn('consumet_start.bat')
    consumetServer.stdout.on('data', function (data) {
    console.log(data.toString());
    });

    consumetServer.stderr.on('data', function (data) {
    console.log(data.toString());
    });
} 
if (os.platform == 'darwin' || os.platform == 'linux') {
    console.log("platform is " + os.platform)
    console.log(success("Starting Consumet..."))
    let consumetServer = cp.exec('consumet_start.sh')
}


// let aioServer = cp.fork("bin.js", { cwd: "./all-in-one/"})
