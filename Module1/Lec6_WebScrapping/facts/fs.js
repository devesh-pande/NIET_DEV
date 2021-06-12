const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./index.html", "utf8");

// console.log(htmlKaData);

// cheerio is based on jquery
let ch = cheerio.load(htmlKaData);

// let pTagKaData = ch("p").text();
// <p>Hey this is a p tag !!</p>
// console.log(pTagKaData);

let pTagInsideUl = ch("ul p").text();
// console.log(pTagInsideUl);

// direct children
let directPTag = ch("ul>p").text();
// console.log(directPTag);

// classses and ids

// i want main p tags
let classMainPTags = ch(".mainp").text();
// console.log(classMainPTags);

// ids -> #main
let idMain = ch("#main").text();
console.log(idMain);

