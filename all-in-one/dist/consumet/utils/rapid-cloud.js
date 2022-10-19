"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reconnecting_websocket_1 = __importDefault(require("reconnecting-websocket"));
const ws_1 = require("ws");
class RapidCloud {
    baseUrl = "wss://ws1.rapid-cloud.co/socket.io/?EIO=4&transport=websocket";
    socket;
    sId = undefined;
    constructor() {
        this.socket = new reconnecting_websocket_1.default(this.baseUrl, undefined, {
            WebSocket: ws_1.WebSocket,
        });
        try {
            this.socket.onopen = () => {
                this.socket.send("40");
            };
            this.socket.onmessage = ({ data }) => {
                if (data?.startsWith("40")) {
                    this.sId = JSON.parse(data.split("40")[1]).sid;
                }
                else if (data == "2") {
                    this.socket.send("3");
                }
            };
            this.socket.onerror = (err) => {
                console.error("Websocket error: ", err);
            };
            setInterval(() => {
                this.socket.send("3");
            }, 25000);
            setInterval(() => {
                this.socket.reconnect();
            }, 7200000);
        }
        catch (err) {
            console.log(err);
        }
    }
    returnSID = async (fastify, options) => {
        fastify.get("/rapid-cloud", async (request, reply) => {
            reply.status(200).send(this.sId);
        });
    };
}
exports.default = RapidCloud;
