"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const mangadex = new extensions_1.MANGA.MangaDex();
    fastify.get('/mangadex', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the mangadex provider: check out the provider's website @ https://mangadex.org/",
            routes: ['/:query', '/info/:id', '/read/:chapterId'],
            documentation: 'https://docs.consumet.org/#tag/mangadex',
        });
    });
    fastify.get('/mangadex/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const res = await mangadex.search(query, page);
        reply.status(200).send(res);
    });
    fastify.get('/mangadex/info/:id', async (request, reply) => {
        const id = decodeURIComponent(request.params.id);
        try {
            const res = await mangadex
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
    fastify.get('/mangadex/read/:chapterId', async (request, reply) => {
        const chapterId = request.params.chapterId;
        try {
            const res = await mangadex
                .fetchChapterPages(chapterId)
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
