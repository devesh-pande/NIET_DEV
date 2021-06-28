
const fs = require("fs");

// Creating new promisified function
function myPromisifiedFun(filePath) {
  return new Promise(function (scb, fcb) {
    fs.readFile(filePath, function (error, data) {
      if (error) {
        fcb(error);
      } else {
        scb("Hey i am coming from scb");
      }
    });
  });
}

let pendingPromise = myPromisifiedFun("./f12.txt");

pendingPromise.then(function (data) {
  console.log(data + "");
});

pendingPromise.catch(function (error) {
  console.log(error);
});