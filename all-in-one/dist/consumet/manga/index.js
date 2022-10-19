"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const mangadex_1 = __importDefault(require("./mangadex"));
const mangahere_1 = __importDefault(require("./mangahere"));
const mangakakalot_1 = __importDefault(require("./mangakakalot"));
const routes = async (fastify, options) => {
    await fastify.register(mangadex_1.default, { prefix: '/' });
    await fastify.register(mangahere_1.default, { prefix: '/' });
    await fastify.register(mangakakalot_1.default, { prefix: '/' });
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Manga');
    });
    fastify.get('/:mangaProvider', async (request, reply) => {
        const queries = {
            mangaProvider: '',
            page: 1,
        };
        queries.mangaProvider = decodeURIComponent(request.params.mangaProvider);
        queries.page = request.query.page;
        if (queries.page < 1)
            queries.page = 1;
        const provider = extensions_1.PROVIDERS_LIST.MANGA.find((provider) => provider.toString.name === queries.mangaProvider);
        try {
            if (provider) {
                reply.redirect(`/manga/${provider.toString.name}`);
            }
            else {
                reply
                    .status(404)
                    .send({ message: 'Page not found, please check the provider list.' });
            }
        }
        catch (err) {
            reply.status(500).send('Something went wrong. Please try again later.');
        }
    });
};
exports.default = routes;
