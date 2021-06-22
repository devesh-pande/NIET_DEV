const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
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
        data += "\r\n" ;
    }
}

// console.log(data);

// -s flag

function applySFlag(){
    let dataComp = data.split("\r\n");
    // console.log(dataComp);

    let sFlagedData = [];
    let nonEmptyFound = false ;
    
    for (let i=0 ; i<dataComp.length ; i++){
        if (dataComp[i] != ''){
            sFlagedData.push(dataComp[i]);
            nonEmptyFound = true ;
        }else if ( dataComp[i] == '' && dataComp[i-1] != '' && nonEmptyFound){
            sFlagedData.push(dataComp[i]);
        }
    } 
    
    // console.log(sFlaggedData);
    let sFlagedString = sFlagedData.join("\r\n");
    return sFlagedString;
} 
// data = applySFlag();
// console.log(data);



// -n flag


function applyNFlag(){
    let dataComps = data.split("\r\n");

    let count = 1;
    for (let i=0 ; i<dataComps.length ; i++){
        // 1. hey I'm f1
        dataComps[i] = `${count}.${dataComps[i]}`;   //String Interpolation
        count++;    
    }
    // console.log(dataComps);
    let nFlaggedString = dataComps.join("\r\n");
    return nFlaggedString;
} 
// data = applyNFlag();
// console.log(data);



// -b flag


function applyBFlag(){
    let dataComps = data.split("\r\n");

    let count = 1;
    for (let i=0 ; i<dataComps.length ; i++){
        // 1. hey I'm f1
        if(dataComps[i] != ''){
            dataComps[i] = `${count}.${dataComps[i]}`;   //String Interpolation
            count++;  
        }  
    }
    // console.log(dataComps);
    let nFlaggedString = dataComps.join("\r\n");
    return nFlaggedString;
} 
data = applyBFlag();
console.log(data);
