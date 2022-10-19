"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = async (fastify, options) => {
    const flixhq = new extensions_1.MOVIES.FlixHQ();
    fastify.get('/flixhq', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the flixhq provider: check out the provider's website @ https://flixhq.to/",
            routes: ['/:query', '/info', '/watch'],
            documentation: 'https://docs.consumet.org/#tag/flixhq',
        });
    });
    fastify.get('/flixhq/:query', async (request, reply) => {
        const query = decodeURIComponent(request.params.query);
        const page = request.query.page;
        const res = await flixhq.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/flixhq/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({
                message: 'id is required',
            });
        try {
            const res = await flixhq
                .fetchMediaInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply.status(500).send({
                message: 'Something went wrong. Please try again later. or contact the developers.',
            });
        }
    });
    fastify.get('/flixhq/watch', async (request, reply) => {
        const episodeId = request.query.episodeId;
        const mediaId = request.query.mediaId;
        const server = request.query.server;
        if (typeof episodeId === 'undefined')
            return reply.status(400).send({ message: 'episodeId is required' });
        if (typeof mediaId === 'undefined')
            return reply.status(400).send({ message: 'mediaId is required' });
        if (server && !Object.values(models_1.StreamingServers).includes(server))
            return reply.status(400).send({ message: 'Invalid server query' });
        try {
            const res = await flixhq
                .fetchEpisodeSources(episodeId, mediaId, server)
                .catch((err) => reply.status(404).send({ message: 'Media Not found.' }));
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
