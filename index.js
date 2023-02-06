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

let webserver = cp.spawn('./webserver.sh')
webserver.stdout.on('data', (data) => {console.log(data.toString())});

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

    let memurai = cp.exec('memurai')
    memurai.stdout.on('data', (data) => console.log(data.toString()))
    memurai.stderr.on('data', (data) => console.log(data.toString()))

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
}
if (os.platform == "linux" ) {
    console.log(success("Starting Redis..."))
    let redis = cp.spawn("redis-server")
    // redis.stdout.on('data', function (data) {
    // console.log(data.toString());
    // });

    // redis.stderr.on('data', function (data) {
    // console.log(data.toString());
    // });
}


// let aioServer = cp.fork("bin.js", { cwd: "./all-in-one/"})
