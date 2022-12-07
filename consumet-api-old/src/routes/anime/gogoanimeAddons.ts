//@ts-nocheck
// i do not know how TS works for typing, sorry.
import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = 'https://gogoanime.film/';
const Genres = [
    'action',
    'adventure',
    'cars',
    'comedy',
    'crime',
    'dementia',
    'demons',
    'drama',
    'dub',
    'ecchi',
    'family',
    'fantasy',
    'game',
    'gourmet',
    'harem',
    'hentai',
    'historical',
    'horror',
    'josei',
    'kids',
    'magic',
    'martial-arts',
    'mecha',
    'military',
    'Mmusic',
    'mystery',
    'parody',
    'police',
    'psychological',
    'romance',
    'samurai',
    'school',
    'sci-fi',
    'seinen',
    'shoujo',
    'shoujo-ai',
    'shounen',
    'shounen-ai',
    'slice-of-Life',
    'space',
    'sports',
    'super-power',
    'supernatural',
    'suspense',
    'thriller',
    'vampire',
    'yaoi',
    'yuri',
    'isekai',
];
/*  Genre scraper for gogoanime that has more options than anilist.co
    however future shows show up so maybe start on the second or third page.*/
export const scrapeGenre = async({ list = [], genre, page }) => {
    try {
        genre = genre.trim().replace(/ /g, '-').toLowerCase();

        if (Genres.indexOf(genre) > -1) {
            const genrePage = await axios.get(`${BASE_URL}genre/${genre}?page=${page}`);
            const $ = cheerio.load(genrePage.data);

            $('div.last_episodes > ul > li').each((i, elem) => {
                list.push({
                    id: $(elem).find('p.name > a').attr('href').split('/')[2],
                    title: $(elem).find('p.name > a').attr('title'),
                    image: $(elem).find('div > a > img').attr('src'),
                    released: $(elem).find('p.released').text().replace('Released: ', '').trim(),
                    url: BASE_URL + '/' + $(elem).find('p.name > a').attr('href'),
                });
            });
            return list;
        }
        return { error: 'Genre Not Found' };
    } catch (err) {
        return { error: err };
    }
};


//gogohd.com scraper, also can be used to get the animeID
export const scrapeDownloadUrl = async({ list = [], episodeId}) => {
    try {
            const downloadPage = await axios.get(`${BASE_URL}${episodeId}`);
            const $ = cheerio.load(downloadPage.data);

            $('.dowloads').each((i, elem) => {
                list.push({
                    downloadUrl: $(elem).find('a').attr('href')
                });
            });
            return list;
    } catch (err) {
        return { error: err };
    }
};