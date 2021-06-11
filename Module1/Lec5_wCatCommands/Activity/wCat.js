const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
let fs = require("fs");
let {applySFlag , applyNFlag , applyBFlag} = require("./util.js")
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
        data += "\r\n" ;
    }
}

if (flags.includes("-s")){
    // data s flagged !!
    data = applySFlag(data);
}
if (flags.includes("-n") && flags.includes("-b ")){
    if (flags.indexOf("-n") < flags.indexOf("-b")){
        data = applyNFlag(data);
    }else {
        data = applyBFlag(data);
    }
}else if (flags.includes("-n")){
    data = applyNFlag(data);
}else if (flags.includes("-b")){
    data = applyBFlag(data);
}

console.log(data);