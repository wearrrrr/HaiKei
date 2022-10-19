"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
const server_1 = __importDefault(require("./server"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
program
    .option("-cm, --consumet", "Starts the consumet api server", false)
    .option("-az, --animeez", "Starts the AnimeEZ api server", false)
    .option("-p, --port <port>", "Change Listening port", process.env.PORT || "8080")
    .option("-h, --host", "Set the host", "localhost")
    .option("-l, --logging", "disable or enable logging.", false)
    .action(({ consumet, animeez, port, host, logging, }) => {
    const aniServer = new server_1.default({ consumet, animeez, port, host, logging });
    aniServer.start();
});
program.parse(process.argv);
program.version("0.1");
