let allMatchesLink = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results';
const request = require("request");
const cheerio = require("cheerio");
const getMatchDetails = require("./match");

request(allMatchesLink , function(err , res , data){
    processHTML(data);
})


function processHTML(data){
    let ch = cheerio.load(data);

    let allATags = ch('a[data-hover="Scorecard"]');
    for(let i=0 ; i<allATags.length ; i++){
        let matchLink = "https://www.espncricinfo.com"+ch(allATags[i]).attr("href");
        // console.log(matchLink);
        getMatchDetails(matchLink);
    }
}