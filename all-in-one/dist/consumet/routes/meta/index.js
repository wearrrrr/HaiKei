"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const anilist_1 = __importDefault(require("./anilist"));
const routes = async (fastify, options) => {
    await fastify.register(anilist_1.default, { prefix: '/' });
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Meta');
    });
    fastify.get('/:metaProvider', async (request, reply) => {
        const queries = {
            metaProvider: '',
            page: 1,
        };
        queries.metaProvider = decodeURIComponent(request.params.metaProvider);
        queries.page = request.query.page;
        if (queries.page < 1)
            queries.page = 1;
        const provider = extensions_1.PROVIDERS_LIST.META.find((provider) => provider.toString.name === queries.metaProvider);
        try {
            if (provider) {
                reply.redirect(`/anime/${provider.toString.name}`);
            }
            else {
                reply
                    .status(404)
                    .send({ message: 'Provider not found, please check the providers list.' });
            }
        }
        catch (err) {
            reply.status(500).send('Something went wrong. Please try again later.');
        }
    });
};
exports.default = routes;
