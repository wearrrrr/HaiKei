"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const mangahere = new extensions_1.MANGA.MangaHere();
    fastify.get('/mangahere', (_, rp) => {
        rp.status(200).send({
            intro: `Welcome to the MangaHere provider: check out the provider's website @ ${mangahere.toString.baseUrl}`,
            routes: ['/:query', '/info', '/read'],
            documentation: 'https://docs.consumet.org/#tag/mangahere',
        });
    });
    fastify.get('/mangahere/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const res = await mangahere.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/mangahere/info', async (request, reply) => {
        const id = request.query.id;
        if (typeof id === 'undefined')
            return reply.status(400).send({ message: 'id is required' });
        try {
            const res = await mangahere
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
    fastify.get('/mangahere/read', async (request, reply) => {
        const chapterId = request.query.chapterId;
        if (typeof chapterId === 'undefined')
            return reply.status(400).send({ message: 'chapterId is required' });
        try {
            const res = await mangahere
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
