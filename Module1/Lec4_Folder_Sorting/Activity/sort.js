let fs = require("fs");

let extensions = require("./extensions");

let testFolderPath = "./testFolder" ;

// fs fucntion which gives content of a directory

let contents = fs.readdirSync(testFolderPath);
// console.log(contents);

for (let i=0 ; i< contents.length ; i++){
    let file = contents[i];
    sortFile(file);
}

function sortFile(file){
    let ext = file.split(".")[1];
    let folderName = getFolderName(ext);

    // console.log(ext , folderName)
    let folderPath = testFolderPath + "/" + folderName ; 
    if (!fs.existsSync(folderPath)){
        // folder doesn't exist
        // create folder

        fs.mkdirSync(folderPath);
    }

    // move on
    // copy file 
    let sourceFilePath = testFolderPath + "/" + file ;
    let destinationFilePath = folderPath + "/" + file ;
    fs.copyFileSync(sourceFilePath , destinationFilePath);
    // delete file
    fs.unlinkSync(sourceFilePath);

}


function getFolderName(ext){
    // ext = 'jpg'

    let folderName ;

    // for in

    for (let key in extensions){
        if(extensions[key].includes(ext)){
            folderName = key ;
            return folderName;
        }
    }
}


// Task
// 1. Think of recursive code
// 2. If you are inside a sorted folder then come back don't sort
