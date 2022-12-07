//@ts-nocheck
import axios from 'axios'
import cheerio from 'cheerio'
import { spawn } from 'child_process';
let BASE_URL = "https://zoro.to"
export const randomShow = async() => {
    try {
    const randomPage = await axios.get(`${BASE_URL}/random`);
    const $ = cheerio.load(randomPage.data);
    let list = []

    list.push({
        id: $('div.film-buttons').find('a').attr('href').slice(7),
        image: $('div.anisc-poster').find('div > img').attr('src'),
        title: $('div.anisc-detail').find('h2').attr('data-jname'),
        description: $('div.film-description').text().trim(),
        
    })

    if ($('div.item-title:nth-child(3) > span.item-head').text() == "Synonyms:") {
        list.push({
            metadata: {
                japanese: $('div.item-title:nth-child(2) > span.name').text(),
                premiered: $('div.item-title:nth-child(5) > span.name').text(),
                status: $('div.item-title:nth-child(7) > span.name').text(),
                rating: Math.round(parseFloat($('div.item-title:nth-child(8) > span.name').text()) * 10),
            }
        })  
    } else {
        list.push({
            metadata: {
                japanese: $('div.item-title:nth-child(2) > span.name').text(),
                premiered: $('div.item-title:nth-child(4) > span.name').text(),
                status: $('div.item-title:nth-child(6) > span.name').text(),
                rating: Math.round(parseFloat($('div.item-title:nth-child(7) > span.name').text()) * 10),
            }
        }) 
    }

    // $('div.film_list-wrap > div').each((i, el) => {
    //     var _a;
    //     list.push({
    //         id: (_a = $(el).find('div.film-poster > a').attr('href')) === null || _a === void 0 ? void 0 : _a.replace('/', ''),
    //         image: $(el).find('div.film-poster > img').attr('data-src'),
    //         title: $(el).find('div.film-poster > img').attr('alt'),
    //         url: `${this.baseUrl}${$(el).find('div.film-poster > a').attr('href')}`,
    //         episode: parseInt($(el).find('div.tick-eps').text().replace(/\s/g, '').replace('Ep', '').split('/')[0]),
    //     });
    // });
    return list;
    } catch (err) {
        console.log(err)
        return { error: err };
    }
};