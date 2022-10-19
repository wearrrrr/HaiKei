"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const libgen_1 = __importDefault(require("./libgen"));
const routes = async (fastify, options) => {
    const lbgen = new extensions_1.BOOKS.Libgen();
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Books 📚');
    });
    fastify.get('/s', async (request, reply) => {
        const { bookTitle, page } = request.query;
        if (!bookTitle)
            return reply.status(400).send({
                message: 'bookTitle query needed',
                error: 'invalid_input',
            });
        try {
            const data = await lbgen.search(bookTitle, page);
            return reply.status(200).send(data);
        }
        catch (e) {
            return reply.status(500).send({
                message: e,
                error: 'internal_error',
            });
        }
    });
    await fastify.register(libgen_1.default, { prefix: '/libgen' });
};
exports.default = routes;
