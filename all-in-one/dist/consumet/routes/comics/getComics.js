"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: `redis://default:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
const routes = async (fastify, options) => {
    // fastify.log.info(
    //   `redis://${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    // );
    fastify.get("/s", async (request, reply) => {
        let { comicTitle, page } = request.query;
        await client.connect();
        if (page == undefined)
            page = 1;
        if (await client.exists(`${comicTitle}:${page}`)) {
            const result = await client.get(`${comicTitle}:${page}`);
            client.disconnect();
            const resultParsed = JSON.parse(result);
            return reply.status(200).send(resultParsed);
        }
        if (comicTitle.length < 4)
            return reply.status(400).send({
                message: "length of comicTitle must be > 4 charactes",
                error: "short_length",
            });
        const getComics = new extensions_1.COMICS.GetComics();
        const result = await getComics
            .search(comicTitle, page == undefined ? 1 : page)
            .catch((err) => {
            return reply.status(400).send({
                // temp
                message: "page query must be defined",
                error: "invalid_input",
                // temp
            });
        });
        client.set(`${comicTitle}:${page}`, JSON.stringify(result));
        return reply.status(200).send(result);
    });
    fastify.get("/", (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the getComics provider: check out the provider's website @ https://getcomics.info/",
            routes: ["/s"],
            documentation: "https://docs.consumet.org/#tag/getComics (need to be updated)",
        });
    });
};
exports.default = routes;
