const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const getIssues = require("./getIssues");

function proccessOneTopic(topicInfoObject){
    // TopicInfoObject :-> TopicName , TopicLink
    // Object Destructuring
    let {TopicLink , TopicName} = topicInfoObject ;
    request(TopicLink, function(err , res , data){
        processHTML(data, TopicName);
    })
}

function processHTML(html , topicName){
    let ch = cheerio.load(html);
    let allProjectsATags = ch("a.text-bold");
    let allProjectInfo = [];
    for (let i=0 ; i<10 ; i++){
        let oneProjectATag = ch(allProjectsATags[i]);
        let projectLink = "https://www.github.com"+oneProjectATag.attr("href");
        // console.log(projectLink);
        let projectIssuesLink = projectLink+"/issues";
        let projectName = projectLink.split("/").pop();
        allProjectInfo.push({ projectName , projectLink , projectIssuesLink});
    }
    // console.log(allProjectInfo);

    for (let i=0 ; i<allProjectInfo.length ; i++){
        let {projectName , projectIssuesLink} = allProjectInfo[i];
        let projectPath = `./Github/${topicName}/${projectName}`;
        // Creates Project Folder
        if (!fs.existsSync(projectPath)){
            fs.mkdirSync(projectPath);
        }

        // Create issues file from projectissuesLink 
        getIssues(projectPath, projectIssuesLink);
    }
}

module.exports = proccessOneTopic ;