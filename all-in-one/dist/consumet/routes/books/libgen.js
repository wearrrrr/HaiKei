"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const routes = async (fastify, options) => {
    const libgen = new extensions_1.BOOKS.Libgen();
    fastify.get('/', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the libgen provider. check out the provider's website @ http://libgen.rs/",
            routes: ['/s', '/fs'],
            documentation: 'https://docs.consumet.org/#tag/libgen (needs to be updated)',
        });
    });
    fastify.get('/s', async (request, reply) => {
        const { bookTitle, page } = request.query;
        if (bookTitle.length < 4)
            return reply.status(400).send({
                message: 'length of bookTitle must be > 4 characters',
                error: 'short_length',
            });
        if (isNaN(page)) {
            return reply.status(400).send({
                message: 'page is missing',
                error: 'invalid_input',
            });
        }
        try {
            const data = await libgen.search(bookTitle, page);
            return reply.status(200).send(data);
        }
        catch (e) {
            return reply.status(400).send(e);
        }
    });
};
exports.default = routes;
