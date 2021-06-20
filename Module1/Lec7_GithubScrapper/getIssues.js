const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function getIssues(projectPath , projectIssuesLink){
    request(projectIssuesLink, function(err, res, data){
        processHTML(data, projectPath);
    })
}

function processHTML(html , projectPath){
    let ch = cheerio.load(html);
    let allIssuesATag = ch('a[data howercard type="issues"]');
    let allIssues = [];
    for (let i=0 ; i<10 ; i++){
        let oneIssue = ch(allIssuesATag[i]);
        let issueName = oneIssue.text().trim();
        let issueLink = "https://www.github.com"+oneIssue.attr("href");
        allIssues.push({issueName , issueLink});
    }
    fs.writeFileSync(`${projectPath}/issues.json`, JSON.stringify(allIssues));
    
}


module.exports = getIssues;