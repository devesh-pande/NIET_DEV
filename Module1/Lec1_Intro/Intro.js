// top to bottom compilation
// left to right

//

// console.log("Hello world !!") ;

// char , int , double , float , boolean , String ,

// Javascript data types =>
// Number , Boolean , String , undefined , Object(Array, object)

// declaration and initialization  of a variable

// (latest)ES6 syntax => let and const


// bloack scoped


let a = 10 ;

if (true){
    // console.log(a);
}


if (true){
    let b=10 ;
}

// console.log(b) ; Not defined  Reference error

// let c ; // takes undefined value
// console.log(c); 

// d = 100 ;
// if (true){
//     d = 200;
//     // console.log(d);
// }
// // console.log(d);

// d = 100 ;
// if (true){
//     let d = 200;
//     console.log(d);
// }
// console.log(d);



// const -> block scoped and constant

const pi = 3.14 ;
// console.log(pi);

//  pi = 200 ;  // TypeError Assignment to a const variable




let b = "fniw";
let c = 'erf';
let d = true;
let e = 3.42323;
let f = undefined;

// Non Primitive => Object arrays

// Arrays => dynamic
let movies = ["The winter Soldier" , "Robot" , 30 , 100 , ' $'];


// push , pop , unshift , shift , splice

// console.log(movies[2]);
movies.pop();

movies.push("Atom"); 

movies.unshift("The First Aveneger");  // Append at the start of array
// shift -> Delete from front
// console.log(movies);

movies.splice(2, 1);
// movies.splice(index, count);

// movies[100] = 'find me';
// console.log(movies);

// let movie = [] // new Array();



// Object

// let avenger = {};   // new Object();


let avenger = {
    "full name" : "Steve",
    place : "Queens",
    skills : ["Martial Arts", "Judo",
                {
                    Bestfriend : [
                        { name : "Bucky", skills : [] },
                        { name : "Natasha", skills : ["Fighting"] },
                    ],
                },
                ],
    movies : ["first avenger", "Winter Soldier"],
    age : 200
};

// Dot Notation

// console.log(avenger.place);
// console.log(avenger.movies);

// Bracket Notation
let key = "age";
avenger["full name"];

// console.log(avenger[key]);


avenger.skills.push("Speed") ;
avenger["friend"] = "Buck";
console.log(avenger.skills[2]["Bestfriend"][1].skills[0].substring(4));

