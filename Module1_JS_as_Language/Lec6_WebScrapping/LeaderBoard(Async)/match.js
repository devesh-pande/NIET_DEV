// let matchLink = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard';
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let leaderboard = [];
let count=0;

function getMatchDetails(matchLink){
    console.log(`Sending Request ${count}`);
    count++;
    // Async
    request(matchLink , function(error , response , html){
        count--;
        console.log(`Inside callback ${count}`);
        processHTML(html);
        if(count == 0){
            console.table(leaderboard);
        }
    })
}


function processHTML(html){
    let ch = cheerio.load(html);
    let bothInnings = ch('.Collapsible');
    // [ <div class="Collapsible"></div> , <div class="Collapsible"></div>  ]
    // fs.writeFileSync("match.html" , bothInnings+"");

    for(let i=0 ; i<bothInnings.length ; i++){
        let oneInning = bothInnings[i];
        let teamName = ch(oneInning).find("h5").text().split(" INNINGS ")[0];
        let allTrs = ch(oneInning).find(".table.batsman tbody tr");

        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){
                // 0 batsmanname
                let batsmanName = ch(allTds[0]).text().trim();
                // 2 runs
                let runs = ch(allTds[2]).text();
                // 3 balls
                let balls = ch(allTds[3]).text();
                // 5 fours
                let fours = ch(allTds[5]).text();
                // 6 sixes
                let sixes = ch(allTds[6]).text();
                // 7 strikeRate
                let strikeRate = ch(allTds[7]).text();

                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }
    }
}


function processLeaderboard(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    // check if the batsman is already present in lb
    for(let i=0 ; i<leaderboard.length ; i++){
        let lbObject = leaderboard[i];
        if(lbObject.Team == teamName && lbObject.Batsman == batsmanName){
            lbObject.Runs += runs; 
            lbObject.Balls += balls;
            lbObject.Fours += fours;
            lbObject.Sixes += sixes;
            return;
        }
    }

    let inning = {
        Team : teamName , 
        Batsman : batsmanName ,
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }
    leaderboard.push(inning);
}


module.exports = getMatchDetails;