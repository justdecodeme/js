/***********************************************************************************
          Learning Javascript Data Structure and Algorithm - Loiane Groner          
***********************************************************************************/

/***********/
/* Preface */
/***********/
// JS has grown so much that is no longer just a frontend language; 
// it is also present now on the server (NodeJS) and database as well (MongoDB)

/**********************************************/
/* Chapter 01 - JavaScript - A Quick Overview */
/**********************************************/
// Learning data structures and algorithms is very important for any technology professional. Since
// Data structure and algorithms can solve the most common problems efficiently. This will make 
// a difference to the quality of the source code you write in the future (including performance)

// As best practice, we should include any js code at the end of the body tag. This way, the HTML will 
// be parsed by the browser and displayed before the scripts are loaded. This boosts the performance 
// of the page.

// You may hear that global variables in JS are evil and this is true. Usually, the quality of JS source code
// is measured by the number of global variables and functions (a large number is bad). So, whenever possible,
// try avoiding global variables.

// In Object Oriented Programming (OOP), an object is an instance of a class

// ECMAScript is a scripting language specification. JavaScript is an implementation of this specification, 
// as are Jscript and ActionScript

// ECMAScript 2015 == ES6
// ECMAScript 2016 == ES7

// ECMAScript 6 functionalities (✗✓)
// ----------------------------------
// let and const (✓)
// Template literals (✓)
// Destructuring Assignment (✓)
// Spread and Rest operator (✓)
// Arrow functions using => (✓)
// Classes (✓)
// Default parameters (✓)
// iterators (✓)
// typed arrays (✗)
// Set  (✗)
// Map (✗)
// WeakSet (✗)
// WeakMap (✗)
// modules (✗)
// tail calls (✗)
// Symbol (✗)

// let and const has same begavior except variable defined as const has a read-only value, meaning a constant value.

// It is good to remember that JavaScript object-oriented programming is done through prototype

/***********************/
/* Chapter 02 - Arrays */
/***********************/
// In JavaScript, an array is a mutable object. Arrays in JavaScript are modified objects.
// Javascript arrays are not strongly typed as in other languages such as C and Java.

// The push and pop method allow an array to emulate a basic stack data structure.
// The unshift and shift method allow an array to emulate a basic queue data structure.

// JavaScripts only support 1D arrays, it does not support matrices. However, we can implement matrices
// or any multidimensional array using an array of arrays. (as given below)
//day 1
averageTemp[0] = [];
averageTemp[0][0] = 72;
averageTemp[0][1] = 75;
averageTemp[0][2] = 79;
averageTemp[0][3] = 79;
averageTemp[0][4] = 81;
averageTemp[0][5] = 81;
//day 2
averageTemp[1] = [];
averageTemp[1][0] = 81;
averageTemp[1][1] = 79;
averageTemp[1][2] = 75;
averageTemp[1][3] = 75;
averageTemp[1][4] = 73;
averageTemp[1][5] = 72;

// The 3 methods (map, filter, reduce) are the base of the functional programming of JavaScript

// Typed arrays are great to work with WebGL APIs, manipulate bits, and manipulate files 
// images.

/***********************/
/* Chapter 03 - Stacks */
/***********************/
// A stack is an ordered collection of items that follows the LIFO (Last In First Out)

// Stacks have a variety of applications in real-world problems, like:
// 01. backtracking problems to remember tasks or paths visited
// 02. undo ActionScript
// 03. decimal to binary (✓)
// 04. balanced parenthesis problem
// 05. tower of Hanoi 

/***********************/
/* Chapter 04 - Queues */
/***********************/
// A queue is an ordered collection of items that follows the FIFO (First In First Out)
// Queues have a variety of applications in real-world problems, like:
// 01. printing line in computer science








