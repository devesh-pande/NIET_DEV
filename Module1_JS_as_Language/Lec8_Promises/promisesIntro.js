const fs = require("fs");

console.log(fs);

// file system -> it also gives promisified functions
    // B                // A
let pendingPromise = fs.promises.readFile("./f1.txt");
// Promise<Pending>
console.log(pendingPromise);


// then ki call me jo function pass , uska nam scb --> success callback
pendingPromise.then(function(data){
    console.log(pendingPromise);
    console.log("Inside scb");
});


// catch ki call me jo function pass , uska nam fcb --> failure callback
pendingPromise.catch(function(error){
    console.log(pendingPromise);
    console.log("Inside fcb");
});