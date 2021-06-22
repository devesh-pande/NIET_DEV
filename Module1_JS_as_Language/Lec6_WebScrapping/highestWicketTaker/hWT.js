
// Task -> highest Wicket taker name ?

const request = require("request");
const cheerio = require("cheerio");

// request -> Async function
let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(link , cb);

function cb(error , response , html){
    evalHTML(html);
}

function evalHTML(html){
    let ch = cheerio.load(html);
    // let winningTeam = ch('.match-header .status-text span').text();
    // console.log(winningTeam);

    let allBowlersTrs = ch(".table.bowler tbody tr");

    let highestWicketTakerName ;
    let highestWickets ;
    let lowestEconomy ;

    for (let i=0 ; i<allBowlersTrs.length ; i++){
        let oneBowlerDetail = allBowlersTrs[i];
        let allTds = ch(oneBowlerDetail).find("td"); 

        let bowlerName = ch(allTds[0]).text();

        let Wickets = ch(allTds[4]).text();

        let economy = ch(allTds[5]).text();

        if (i == 0){
            highestWicketTakerName = bowlerName ;
            highestWickets = Wickets ;
            lowestEconomy = economy ;
        }else if (highestWickets < Wickets || (highestWickets == Wickets && lowestEconomy > economy)){
            highestWicketTakerName = bowlerName ;
            highestWickets = Wickets ;
            lowestEconomy = economy ;
        }
    }

    console.log(`highest wicket taker's name : ${highestWicketTakerName} , with wickets : ${highestWickets} , with economy :    ${lowestEconomy} `);


}


