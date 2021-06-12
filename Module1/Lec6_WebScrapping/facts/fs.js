const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./index.html", "utf8");

// console.log(htmlKaData);


let ch = cheerio.load(htmlKaData);

console.log(ch);