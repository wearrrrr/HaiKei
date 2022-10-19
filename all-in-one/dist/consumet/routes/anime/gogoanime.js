"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = async (fastify, options) => {
    const gogoanime = new extensions_1.ANIME.Gogoanime();
    fastify.get('/gogoanime', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the gogoanime provider: check out the provider's website @ https://gogoanime.gg/",
            routes: [
                '/:query',
                '/info/:id',
                '/watch/:episodeId',
                '/servers/:episodeId',
                '/top-airing',
                '/recent-episodes',
            ],
            documentation: 'https://docs.consumet.org/#tag/gogoanime',
        });
    });
    fastify.get('/gogoanime/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page || 1;
        const res = await gogoanime.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/gogoanime/info/:id', async (request, reply) => {
        const id = decodeURIComponent(request.params.id);
        try {
            const res = await gogoanime
                .fetchAnimeInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/gogoanime/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const server = request.query.server;
        if (server && !Object.values(models_1.StreamingServers).includes(server)) {
            reply.status(400).send('Invalid server');
        }
        try {
            const res = await gogoanime
                .fetchEpisodeSources(episodeId, server)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/gogoanime/servers/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        try {
            const res = await gogoanime
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
    fastify.get('/gogoanime/top-airing', async (request, reply) => {
        try {
            const page = request.query.page;
            const res = await gogoanime.fetchTopAiring(page);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
    fastify.get('/gogoanime/recent-episodes', async (request, reply) => {
        try {
            const type = request.query.type;
            const page = request.query.page;
            const res = await gogoanime.fetchRecentEpisodes(page, type);
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developers for help.' });
        }
    });
};
exports.default = routes;
