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
    // console.log(dataComp);

    let sFlagedData = [];
    // let emptyPushed = false ;
    for (let i=0 ; i<dataComp.length ; i++){
        if (dataComp[i] != ''){
            sFlagedData.push(dataComp[i]);
            // emptyPushed = false;
        }else if ( dataComp[i] == '' && dataComp[i-1] != '' && i != 0){
            sFlagedData.push(dataComp[i]);
            // emptyPushed = true ;
        }
    } 
    
    // console.log(sFlaggedData);
    let sFlagedString = sFlagedData.join("\r\n");
    return sFlagedString;
} 
data = applySFlag();
console.log(data);
