
// High Order Functions
//    Those functions which accept functions as a parameter



// CallBack Functions
//    Functions which are passed as an argument in a high order functions



function getFirstName(fullName){
    // "Steve Rogers"
    // split function
    fullName = fullName.split(" ");
    // ["Steve", "Rogers"];
    return fullName[0];
}

function getLastName(fullName){
    fullName = fullName.split(" ");
    return fullName[1];
}

function callName(fullName, fun){
    let name = fun(fullName);
    console.log(name);
}

callName("Steve Rogers", getFirstName);
callName("Tony Stark", getLastName);
