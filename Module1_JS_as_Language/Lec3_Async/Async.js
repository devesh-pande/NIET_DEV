// FS => File System

let fs = require("fs");

console.log("Start");

fs.readFile("./f1.txt", cb); 

function cb(error, data){
    console.log(error);
    console.log(data + "");

}

console.log("End");


// What if we need to read multiple files in async mode paarallely

