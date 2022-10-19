"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getComics_1 = __importDefault(require("./getComics"));
const routes = async (fastify, options) => {
    await fastify.register(getComics_1.default, { prefix: '/getComics' });
    fastify.get('/', async (request, reply) => {
        reply.status(200).send('Welcome to Consumet Comics 🦸‍♂️');
    });
    fastify.get('/s', async (request, reply) => {
        const { comicTitle, page } = request.query;
        reply.status(300).redirect(`getComics/s?comicTitle=${comicTitle}&page=${page}`);
    });
};
exports.default = routes;
