const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const proccessOneTopic = require("./topic");

request("https://www.github.com/topics" , function(err , res , html) {
    proccessHTML(html);
})

function proccessHTML(html){
    let ch = cheerio.load(html);
    let allTopicsATags = ch('.topic-box a');
    // console.log(allTopicsATags);
    let allTopicInfo = [];
    for (let i=0 ; i<allTopicsATags.length ; i++){
        let oneTopicATag = ch(allTopicsATags[i]);
        let oneTopicLink = "https://www.github.com"+oneTopicATag.attr("href");
        let oneTopicName = oneTopicATag.find(".f3").text().trim();
        allTopicInfo.push({ TopicName : oneTopicName , TopicLink : oneTopicLink});

        // Create topic folder
        let topicFolderPath = `./Github/${oneTopicName}`;
        if (!fs.existsSync(topicFolderPath)){
            fs.mkdirSync(topicFolderPath);
        }
    }
    // console.log(allTopicInfo);
    for (let i=0 ; i<allTopicInfo.length ; i++){
        proccessOneTopic(allTopicInfo[i]);
    }
    
}