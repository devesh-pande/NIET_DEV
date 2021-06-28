// Async
// Await keyword is always used inside a function which is async 
const fs = require("fs");

console.log("Hello");

// Async function => i can do async tasks in this function
async function sayHi(){
    try{
        let f1KaPromise = fs.promises.readFile("./f1.txt" , "utf8");
        let f2KaPromise = fs.promises.readFile("./f2.txt" , "utf8");
        let bothData = await Promise.all([f1KaPromise , f2KaPromise]);
        console.log(bothData);
    }
    catch(err){
        
    }
    // console.log("fun says hi !!");
}

sayHi();


console.log("Byee");