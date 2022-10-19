"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const mangakakalot = new extensions_1.MANGA.MangaKakalot();
    fastify.get('/mangakakalot', (_, rp) => {
        rp.status(200).send({
            intro: `Welcome to the MangaKakalot provider: check out the provider's website @ ${mangakakalot.toString.baseUrl}`,
            routes: ['/:query', '/info', '/read'],
            documentation: 'https://docs.consumet.org/#tag/mangakakalot',
        });
    });
    fastify.get('/mangakakalot/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await mangakakalot.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/mangakakalot/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await mangakakalot
                .fetchMangaInfo(id)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/mangakakalot/read', async (request, reply) => {
        const chapterId = request.query.chapterId;
        if (typeof chapterId === 'undefined')
            return reply.status(400).send({ message: 'chapterId is required' });
        try {
            const res = await mangakakalot
                .fetchChapterPages(chapterId)
                .catch((err) => reply.status(404).send({ message: err.message }));
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
