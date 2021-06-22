function applySFlag(data){
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

function applyNFlag(data){
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

function applyBFlag(data){
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

module.exports.applySFlag = applySFlag;
module.exports.applyBFlag = applyBFlag;
module.exports.applyNFlag = applyNFlag;