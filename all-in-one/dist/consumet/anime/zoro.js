"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = async (fastify, options) => {
    const zoro = new extensions_1.ANIME.Zoro();
    fastify.get('/zoro', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the zoro provider: check out the provider's website @ https://zoro.to/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/zoro',
        });
    });
    fastify.get('/zoro/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const res = await zoro.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/zoro/recent-episodes', async (request, reply) => {
        const page = request.query.page;
        const res = await zoro.fetchRecentEpisodes(page);
        reply.status(200).send(res);
    });
    fastify.get('/zoro/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await zoro
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            return reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
    fastify.get('/zoro/watch', async (request, reply) => {
        const episodeId = request.query.episodeId;
        const server = request.query.server;
        if (server && !Object.values(models_1.StreamingServers).includes(server))
            return reply.status(400).send({ message: 'server is invalid' });
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await zoro
                .fetchEpisodeSources(episodeId, server)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
};
exports.default = routes;
