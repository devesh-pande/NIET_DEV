const fs = require("fs");

// promises facts =>
// 1. Promisified functions they will return a promise object whose state is pending Promise<Pending>
// 2. then() and catch() functions can be called on pending promise object Promise<Pending>.then() or Promise<Pending>.catch();
// 3. Function passed inside a then call is known as success callback scb;
// 4. Function passed inside a catch call is knownn as failure callback fcb;
// 5. Initial State of Promise is Pending => either resolved or rejected !
// 6. IF a Promise is resolved/success its scb is fired !
// 7. If a promise is rejected/fail its fcb is fired !
// 8. then() function call returns a pending Promise ka object => thenKaPromise
// 9. catch() function call returns a pendign Promise object => catchKaPromise


let f1KaPromise = fs.promises.readFile("./f1.txt");

f1KaPromise.then(function (data){
    console.log(data+"");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise ;
}).then(function(data){
    console.log(data+"");
})