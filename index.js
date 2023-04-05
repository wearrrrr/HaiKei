const cp = require('child_process')
const os = require('os')
const chalk = require('chalk')


// Chalk template for console output.
const error = chalk.bold.red;
const success = chalk.bold.green;

console.log(success("Starting Web Server..."))

if (os.platform == "win32") {
    console.log("platform is " + os.platform)
    console.log(success("Starting Consumet..."))
    let consumetServer = cp.spawn('consumet_start.bat')
    consumetServer.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    consumetServer.stderr.on('data', function (data) {
    console.log(data.toString());
    });

    console.log(success("Starting Redis..."))

    try {
        cp.exec('memurai')
    } catch {
        error("Failed to start memurai! Is it installed?")
    }
    try {
        console.log(success("Starting frontend..."))
        let webserver = cp.spawn('webserver.bat')
        webserver.stdout.on('data', (data) => {console.log(data.toString())});
    } catch {
        console.log(error("Failed to start frontend! Try running yarn again."))
    }
} 
if (os.platform == 'darwin' || os.platform == 'linux') {
    console.log("platform is " + os.platform)
    console.log(success("Starting Consumet..."))
    let consumetServer = cp.spawn('./consumet_start.sh')
    consumetServer.stdout.on('data', function (data) {
    console.log(data.toString());
    });

    consumetServer.stderr.on('data', function (data) {
    console.log(data.toString());
    });
    let webserver = cp.spawn('./webserver.sh')
    webserver.stdout.on('data', (data) => {console.log(data.toString())});
}
if (os.platform == "linux" ) {
    console.log(success("Starting Redis..."))
    try {
        cp.spawn("redis-server")
    } catch {
        console.log(error("Failed to start redis! Is it installed?"))
    }

}


// let aioServer = cp.fork("bin.js", { cwd: "./all-in-one/"})
