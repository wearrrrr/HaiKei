"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const chalk_1 = __importDefault(require("chalk"));
/* consumet imports  */
const books_1 = __importDefault(require("./consumet/routes/books"));
const anime_1 = __importDefault(require("./consumet/routes/anime"));
const manga_1 = __importDefault(require("./consumet/routes/manga"));
const light_novels_1 = __importDefault(require("./consumet/routes/light-novels"));
const movies_1 = __importDefault(require("./consumet/routes/movies"));
const meta_1 = __importDefault(require("./consumet/routes/meta"));
const rapid_cloud_1 = __importDefault(require("./consumet/utils/rapid-cloud"));
class Server {
    consumet;
    animeez;
    port;
    host;
    logging;
    constructor({ consumet, animeez, port, host, logging, }) {
        this.consumet = consumet;
        this.animeez = animeez;
        this.port = port;
        this.host = host;
        this.logging = logging;
    }
    async start() {
        const consumet = this.consumet;
        const animeez = this.animeez;
        const port = this.port;
        const host = this.host;
        const logging = this.logging;
        const fastify = (0, fastify_1.default)({
            logger: {
                enabled: logging,
                level: "warn",
            },
        });
        await fastify.register(cors_1.default, {
            origin: "*",
            methods: "GET",
        });
        /* Registering consumet routes */
        await fastify.register(books_1.default, { prefix: "/consumet/books" });
        await fastify.register(anime_1.default, { prefix: "/consumet/anime" });
        await fastify.register(manga_1.default, { prefix: "/consumet/manga" });
        //await fastify.register(comics, { prefix: '/comics' });
        await fastify.register(light_novels_1.default, {
            prefix: "/consumet/light-novels",
        });
        await fastify.register(movies_1.default, { prefix: "/consumet/movies" });
        await fastify.register(meta_1.default, { prefix: "/consumet/meta" });
        await fastify.register(new rapid_cloud_1.default().returnSID, {
            prefix: "/consumet/utils",
        });
        try {
            fastify.get("/", (_, rp) => {
                rp.status(200).send({
                    message: "Welcome to All-in-One. All api's can be found in there respective directories",
                    info: `all api's work the same but use there respective directories as a prefix. example: http://${host}:${port}/consumet/anime/animepahe/{query}`,
                    consumet: consumet
                        ? {
                            prefix: "/consumet/",
                            books: "/consumet/books",
                            anime: "/consumet/anime",
                            manga: "/consumet/manga",
                            light_novels: "/consumet/light-novels",
                            movies: "/consumet/movies",
                            meta: "/consumet/meta",
                        }
                        : "consumet disabled",
                    animeEz: animeez ? "/animeez" : "animeez disabled",
                });
            });
            fastify.get("*", (request, reply) => {
                reply.status(404).send({
                    message: "",
                    error: "page not found",
                });
            });
            fastify.listen({ port: port, host: "localhost" }, (e, address) => {
                if (e)
                    throw e;
                console.log(chalk_1.default.green(`All-in-One Server Started on ${address}`));
            });
        }
        catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
}
exports.default = Server;
