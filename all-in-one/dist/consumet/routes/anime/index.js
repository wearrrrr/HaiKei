"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const gogoanime_1 = __importDefault(require("./gogoanime"));
const animepahe_1 = __importDefault(require("./animepahe"));
const zoro_1 = __importDefault(require("./zoro"));
const _9anime_1 = __importDefault(require("./9anime"));
const animixplay_1 = __importDefault(require("./animixplay"));
const animefox_1 = __importDefault(require("./animefox"));
const enime_1 = __importDefault(require("./enime"));
const routes = async (fastify, options) => {
    await fastify.register(gogoanime_1.default, { prefix: '/' });
    await fastify.register(animepahe_1.default, { prefix: '/' });
    await fastify.register(zoro_1.default, { prefix: '/' });
    await fastify.register(_9anime_1.default, { prefix: '/' });
    await fastify.register(animixplay_1.default, { prefix: '/' });
    await fastify.register(animefox_1.default, { prefix: '/' });
    await fastify.register(enime_1.default, { prefix: '/' });
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Anime 🗾');
    });
    fastify.get('/:animeProvider', async (request, reply) => {
        const queries = {
            animeProvider: '',
            page: 1,
        };
        queries.animeProvider = decodeURIComponent(request.params.animeProvider);
        queries.page = request.query.page;
        if (queries.page < 1)
            queries.page = 1;
        const provider = extensions_1.PROVIDERS_LIST.ANIME.find((provider) => provider.toString.name === queries.animeProvider);
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
