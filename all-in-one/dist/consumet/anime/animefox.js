"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const animefox = new extensions_1.ANIME.AnimeFox();
    fastify.get('/animefox', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the animefox provider: check out the provider's website @ https://animefox.tv/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/animefox',
        });
    });
    fastify.get('/animefox/recent-episodes', async (request, reply) => {
        const page = request.params.page;
        const res = await animefox.fetchRecentEpisodes(page);
        reply.status(200).send(res);
    });
    fastify.get('/animefox/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await animefox.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/animefox/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await animefox
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
    fastify.get('/animefox/watch', async (request, reply) => {
        const episodeId = request.query.episodeId;
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'episodeId is required' });
        try {
            const res = await animefox
                .fetchEpisodeSources(episodeId)
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
