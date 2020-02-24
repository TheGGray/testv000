const Discord = require("discord.js");
const request = require('request');
const cheerio = require('cheerio');
const prefix = '.';

module.exports = {
    komut: "anime",
    açıklama: "Rastgele anime fotoğrafı gönderir.",
    kategori: "eğlence",
    alternatifler: ['anime'],
    kullanım: ".anime",
    yetki: 1,
};


module.exports.baslat = (client, message) => {

    let args = message.content.substring(prefix.length).split(" ");
 
    switch (args[0]) {
        case 'anime':
        image(message);

        break;
    }
};

function image(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "anime",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
};

request(options, function(error, response, responseBody) {
    if (error) {
        return;
    }

    $ = cheerio.load(responseBody);

    var links = $(".image a.link");

    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
   
    console.log(urls);

    if (!urls.length) {
       
        return;
    }
    message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
});
}