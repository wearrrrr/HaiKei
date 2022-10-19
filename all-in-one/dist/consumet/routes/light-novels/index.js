"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const readlightnovels_1 = __importDefault(require("./readlightnovels"));
const routes = async (fastify, options) => {
    await fastify.register(readlightnovels_1.default, { prefix: '/' });
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Light Novels');
    });
    fastify.get('/:lightNovelProvider', async (request, reply) => {
        const queries = {
            lightNovelProvider: '',
            page: 1,
        };
        queries.lightNovelProvider = decodeURIComponent(request.params
            .lightNovelProvider);
        queries.page = request.query.page;
        if (queries.page < 1)
            queries.page = 1;
        const provider = extensions_1.PROVIDERS_LIST.LIGHT_NOVELS.find((provider) => provider.toString.name === queries.lightNovelProvider);
        try {
            if (provider) {
                reply.redirect(`/light-novels/${provider.toString.name}`);
            }
            else {
                reply
                    .status(404)
                    .send({ message: 'Page not found, please check the providers list.' });
            }
        }
        catch (err) {
            reply.status(500).send('Something went wrong. Please try again later.');
        }
    });
};
exports.default = routes;
