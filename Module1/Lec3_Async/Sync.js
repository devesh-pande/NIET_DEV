// FS => File System
// Use fs


let fs = require("fs");

console.log("Start");

// Sync Function
let f1KaData = fs.readFileSync("./f1.txt", "utf8");
console.log(f1KaData);

console.log("end");