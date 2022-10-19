"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const models_1 = require("@consumet/extensions/dist/models");
const routes = async (fastify, options) => {
    let anilist = new extensions_1.META.Anilist();
    fastify.get('/anilist', (_, rp) => {
        rp.status(200).send({
            intro: "Welcome to the anilist provider: check out the provider's website @ https://anilist.co/",
            routes: ['/:query', '/info/:id', '/watch/:episodeId'],
            documentation: 'https://docs.consumet.org/#tag/anilist',
        });
    });
    fastify.get('/anilist/:query', async (request, reply) => {
        const query = request.params.query;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const res = await anilist.search(query, page, perPage);
        reply.status(200).send(res);
    });
    fastify.get('anilist/advanced-search', async (request, reply) => {
        const query = request.query.query;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const type = request.query.type;
        let genres = request.query.genres;
        const id = request.query.id;
        const format = request.query.format;
        let sort = request.query.sort;
        const status = request.query.status;
        const year = request.query.year;
        const season = request.query.season;
        if (genres) {
            JSON.parse(genres).forEach((genre) => {
                if (!Object.values(models_1.Genres).includes(genre)) {
                    return reply.status(400).send({ message: `${genre} is not a valid genre` });
                }
            });
            genres = JSON.parse(genres);
        }
        if (sort)
            sort = JSON.parse(sort);
        if (season)
            if (!['WINTER', 'SPRING', 'SUMMER', 'FALL'].includes(season))
                return reply.status(400).send({ message: `${season} is not a valid season` });
        const res = await anilist.advancedSearch(query, type, page, perPage, format, sort, genres, id, year, status, season);
        reply.status(200).send(res);
    });
    fastify.get('/anilist/trending', async (request, reply) => {
        const page = request.query.page;
        const perPage = request.query.perPage;
        const res = await anilist.fetchTrendingAnime(page, perPage);
        reply.status(200).send(res);
    });
    fastify.get('/anilist/popular', async (request, reply) => {
        const page = request.query.page;
        const perPage = request.query.perPage;
        const res = await anilist.fetchPopularAnime(page, perPage);
        reply.status(200).send(res);
    });
    fastify.get('/anilist/airing-schedule', async (request, reply) => {
        const page = request.query.page;
        const perPage = request.query.perPage;
        const weekStart = request.query.weekStart;
        const weekEnd = request.query.weekEnd;
        const notYetAired = request.query.notYetAired;
        const res = await anilist.fetchAiringSchedule(page, perPage, weekStart, weekEnd, notYetAired);
        reply.status(200).send(res);
    });
    fastify.get('/anilist/genre', async (request, reply) => {
        const genres = request.query.genres;
        const page = request.query.page;
        const perPage = request.query.perPage;
        if (typeof genres === 'undefined')
            return reply.status(400).send({ message: 'genres is required' });
        JSON.parse(genres).forEach((genre) => {
            if (!Object.values(models_1.Genres).includes(genre)) {
                return reply.status(400).send({ message: `${genre} is not a valid genre` });
            }
        });
        const res = await anilist.fetchAnimeGenres(JSON.parse(genres), page, perPage);
        reply.status(200).send(res);
    });
    fastify.get('/anilist/recent-episodes', async (request, reply) => {
        const provider = request.query.provider;
        const page = request.query.page;
        const perPage = request.query.perPage;
        const res = await anilist.fetchRecentEpisodes(provider, page, perPage);
        reply.status(200).send(res);
    }),
        fastify.get('/anilist/random-anime', async (request, reply) => {
            const res = await anilist.fetchRandomAnime().catch((err) => {
                return reply.status(404).send({ message: 'Anime not found' });
            });
            reply.status(200).send(res);
        });
    fastify.get('/anilist/servers/:id', async (request, reply) => {
        const id = request.params.id;
        const provider = request.query.provider;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            anilist = new extensions_1.META.Anilist(possibleProvider);
        }
        const res = await anilist.fetchEpisodeServers(id);
        anilist = new extensions_1.META.Anilist();
        reply.status(200).send(res);
    });
    fastify.get('/anilist/episodes/:id', async (request, reply) => {
        const id = request.params.id;
        const provider = request.query.provider;
        let fetchFiller = request.query.fetchFiller;
        let dub = request.query.dub;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            anilist = new extensions_1.META.Anilist(possibleProvider);
        }
        if (dub === 'true' || dub === '1')
            dub = true;
        else
            dub = false;
        if (fetchFiller === 'true' || fetchFiller === '1')
            fetchFiller = true;
        else
            fetchFiller = false;
        const res = await anilist.fetchEpisodesListById(id, dub, fetchFiller);
        anilist = new extensions_1.META.Anilist();
        reply.status(200).send(res);
    });
    // anilist info without episodes
    fastify.get('/anilist/data/:id', async (request, reply) => {
        const id = request.params.id;
        const res = await anilist.fetchAnilistInfoById(id);
        reply.status(200).send(res);
    });
    // anilist info with episodes
    fastify.get('/anilist/info/:id', async (request, reply) => {
        const id = request.params.id;
        const provider = request.query.provider;
        let fetchFiller = request.query.fetchFiller;
        let isDub = request.query.dub;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            anilist = new extensions_1.META.Anilist(possibleProvider);
        }
        if (isDub === 'true' || isDub === '1')
            isDub = true;
        else
            isDub = false;
        if (fetchFiller === 'true' || fetchFiller === '1')
            fetchFiller = true;
        else
            fetchFiller = false;
        try {
            const res = await anilist
                .fetchAnimeInfo(id, isDub, fetchFiller)
                .catch((err) => reply.status(404).send({ message: err }));
            anilist = new extensions_1.META.Anilist();
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
    // anilist character info
    fastify.get('/anilist/character/:id', async (request, reply) => {
        const id = request.params.id;
        const res = await anilist.fetchCharacterInfoById(id);
        reply.status(200).send(res);
    });
    fastify.get('/anilist/watch/:episodeId', async (request, reply) => {
        const episodeId = request.params.episodeId;
        const provider = request.query.provider;
        if (typeof provider !== 'undefined') {
            const possibleProvider = extensions_1.PROVIDERS_LIST.ANIME.find((p) => p.name.toLowerCase() === provider.toLocaleLowerCase());
            anilist = new extensions_1.META.Anilist(possibleProvider);
        }
        try {
            const res = await anilist
                .fetchEpisodeSources(episodeId)
                .catch((err) => reply.status(404).send({ message: err }));
            anilist = new extensions_1.META.Anilist();
            reply.status(200).send(res);
        }
        catch (err) {
            reply
                .status(500)
                .send({ message: 'Something went wrong. Contact developer for help.' });
        }
    });
};
exports.default = routes;
