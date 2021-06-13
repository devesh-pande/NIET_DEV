// let matchLink = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard';
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


function getMatchDetails(matchLink){
    
    request(matchLink , function(error , response , html){
        processHTML(html);
    })

}


function processHTML(html){
    let ch = cheerio.load(html);
    let bothInnings = ch('.Collapsible');
    // [ <div class="Collapsible"></div> , <div class="Collapsible"></div>  ]
    fs.writeFileSync("match.html" , bothInnings+"");

    for(let i=0 ; i<bothInnings.length ; i++){
        let oneInning = bothInnings[i];
        let teamName = ch(oneInning).find("h5").text().split(" INNINGS ")[0];
        console.log(teamName);

        let allTrs = ch(oneInning).find(".table.batsman tbody tr");

        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){
                // 0 batsmanname
                let batsmanName = ch(allTds[0]).text();
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

                console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                // processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }
    }
    console.log("#############################################");
}


// function  processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
//     // FS ??
// }


module.exports = getMatchDetails;