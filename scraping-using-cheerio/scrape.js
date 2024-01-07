const request = require('request')
const cheerio = require('cheerio')

request(
    'https://www.freecodecamp.org/news/html-list-how-to-use-bullet-points-ordered-and-unordered-lists/',
    (error, response, html) => {
        if (!error && response.statusCode === 200) {
            // const $ = cheerio.load(html)
            console.log(html)
        }
    }
)
