let fs = require("fs");

let input = process.argv.splice(2);

let flags = [];
let files = [];

for (let i=0 ; i<input.length ; i++){
    if (input[i].startsWith("-")){
        flags.push(input[i]);
    }else {
        files.push(input[i]);
    }
}

// console.log(flags);
// console.log(files);

let data = "" ;

for (let i=0 ; i<files.length ; i++){
    let fileKadata = fs.readFileSync(files[i]);
    data += fileKadata;
    if (i != files.length-1){
        data += "\n" ;
    }
}

// console.log(data);

// -s flag

function applySFlag(){
    let dataComp = data.split("\r\n");
    
    console.log(dataComp);
} 
applySFlag();
