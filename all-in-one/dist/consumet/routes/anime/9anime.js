"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = async (fastify, options) => {
    const nineanime = await extensions_1.ANIME.NineAnime.create();
    fastify.get('/9anime', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the 9anime provider: check out the provider's website @ https://9anime.id/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/9anime',
        });
    });
    fastify.get('/9anime/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const res = await nineanime.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/9anime/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await nineanime
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
    fastify.get('/9anime/watch', async (request, reply) => {
        const episodeId = request.query.episodeId;
        const server = request.query.server;
        if (server && !Object.values(models_1.StreamingServers).includes(server))
            return reply.status(400).send({ message: 'server is invalid' });
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await nineanime
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
    fastify.get('/9anime/servers', async (request, reply) => {
        const episodeId = request.query.episodeId;
        try {
            const res = await nineanime
                .fetchEpisodeServers(episodeId)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
};
exports.default = routes;
