"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const readlightnovels = new extensions_1.LIGHT_NOVELS.ReadLightNovels();
    fastify.get('/readlightnovels', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the readlightnovels provider: check out the provider's website @ https://readlightnovels.net/",
            routes: ['/:query', '/info', '/read'],
            documentation: 'https://docs.consumet.org/#tag/readlightnovels',
        });
    });
    fastify.get('/readlightnovels/:query', async (request, reply) => {
        const query = request.params.query;
        const res = await readlightnovels.search(query);
        reply.status(200).send(res);
    });
    fastify.get('/readlightnovels/info', async (request, reply) => {
        const id = request.query.id;
        const chapterPage = request.query.chapterPage;
        if (typeof id === 'undefined') {
            return reply.status(400).send({
                message: 'id is required',
            });
        }
        try {
            const res = await readlightnovels
                .fetchLightNovelInfo(id, chapterPage)
                .catch((err) => reply.status(404).send({ message: err }));
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Please try again later.' });
        }
    });
    fastify.get('/readlightnovels/read', async (request, reply) => {
        const chapterId = request.query.chapterId;
        if (typeof chapterId === 'undefined') {
            return reply.status(400).send({
                message: 'chapterId is required',
            });
        }
        try {
            const res = await readlightnovels
                .fetchChapterContent(chapterId)
                .catch((err) => reply.status(404).send(err));
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
