// console.log(multiply);

// function multiply(a, b){
//     return a*b ;
// }

// console.log(add);

// function add(a, b){
//     return a+b ;
// }

// console.log(x);
// let x = multiply(10, 10);
// console.log(y);
// let y = add(x, 20);

// console.log(x);
// console.log(y);


//  Hoisting => Using undefined value of variable beffore initialization.
//      The variable and function declarations are put into memory during the 
//      compile phase, but stay exactly where you typed them in your code
// it's used in var

//  the variable and function declarations are put into memory during the compile phase, but stay exactly where you typed them in your code

console.log(a);     // Prints undefined value  -> hoisting
// let a = 10 ;        // 
var a = 10 ;

// Hoisting also occurs in let and const but we can't access its 
//      value because it's in temporal dead zone.

