/****************************************************
          YDKJS - UP & GOING - KYLE SIMPSON
****************************************************/

/************/
/* PAGE VII */
/************/
// Brendan Eich ?
// Brendan Eich (born July 4, 1961) is an American technologist and creator of the JavaScript programming language.
// He co-founded the Mozilla project, the Mozilla Foundation and the Mozilla Corporation, and served as the Mozilla Corporation's
// chief technical officer and briefly its chief executive officer. He is the CEO of Brave Software.

// "Javascript" is related to "Java" as "Carnival" is to "Car"

/***********/
/* PAGE 04 */
/***********/
// It's typically asserted that JS is interpreted, because your JS source code is processed each time it's run. But that's not
// entirely accurate. The JS engine actually compiles the program on the fly and then immediately runs the compiled code.

/***********/
/* PAGE 05 */
/***********/
// The best way to learn programming is to start coding.
// There is absolutely no substitute for practice in learning programming.

/***********/
/* PAGE 11 */
/***********/
// Coercion: The conversion of value from one type to another in JS is called coercion. There are two types
// 1. explicit coercion
	var a = "4";
	var b = Number(a);
	console.log(a);  // "4"
	console.log(b);  // 4
	typeof a;  // string
	typeof b;  // number
// 2. implicit coercion
	"4" == 4;  // true, due to "4" here converts to 4 or vice versa ?

	var a = "4";
	var b = "5";
	b = a * 1;  // "4" implicitly coerced to 4 here

/***********/
/* PAGE 12 */
/***********/
// One of the most important lessons you can learn about writing code is that it's not just for the computer.
// Code is every bit as much, if not more, for the developer as it is for the compiler.

/***********/
/* PAGE 13 */
/***********/
// There are lots of opinions on what makes well-commented code; we can't really define absolute universal rules. But
// some observations and guidelines are quite useful.
	// 1. Code without comments is suboptimal.
	// 2. Too many comments (one per line, for example) is probably a sign of poorly written code.
	// 3. Comments should explain why, not what. They can optionally explain how if what's written is particularly confusing.
// If code is well commented, everyone who reads your code will thank you!

/***********/
/* PAGE 14 */
/***********/
// JS uses dynamic typing (weak typing) approach instead of static typing (type enforcement).

/***********/
/* PAGE 16 */
/***********/
// constant variable diclaration
	var TAX_RATE = 0.08;
	// as of ES6
	const TAX_RATE = 0.08 ;

/***********/
/* PAGE 20 */
/***********/
// The only difference between while and do-while loop is whether the conditional is tested before the
// first iteration (while) or after the first iteration (do-while).

/***********/
/* PAGE 24 */
/***********/
// In JS, each function gets its own scope (technically called lexical scope).
// Scope is basically a collection of variables as well as the rules for how
// those variables are accessed by name.

/***********/
/* PAGE 30 */
/***********/
// ECMAScript is the official name of the JS specification.

// JS has typed values, not typed variables. The following built-in types are available:
	// string,	number,	boolean,	null,	undefined,	object,	symbol (new in ES6)

// Examples:
	var a;
	typeof a;  // undefined
	a = "hello"
	typeof a;  // string
	a = 42;
	typeof a;  // number
	a = true;
	typeof a;  // boolean
	a = null;
	typeof a;  // object--bug
	a = undefined;
	typeof a;  // undefined
	a = { b: "C" };
	typeof a;  // object
	function foo() { return 4; }
	foo.bar = "hello";
	typeof foo;  // function
	typeof foo();  // number
	typeof foo.bar  // string
    // 'typeof a' is not asking for the "type of a", but rather for the "type of the value currently in a".
    // Only values have types in JS; variables are just simple containers for those values.

/***********/
/* PAGE 36 */
/***********/
// condition is FALSE for
	// "" (empty string)
	// 0, -0, NaN (invalid numbers)
	// null, undefined
	// false
// condition is TRUE for
	// "hello"
	// 4
	// true
	// [], [1, "2"] (arrays)
	// {}, { a: 4 } (objects)
	// function foo() { .. } (functions)

/***********/
/* PAGE 37 */
/***********/
// non-equality should not be confused with inequality.
// Inequalities are a different concept. If you recall in mathematics statements that involve < and > are called
// inequalities. You're concerned is how a value is less than or greater than another.
// You can think of non-equality as the concept that's the direct opposite of equality. In equality you're simply
// concerned whether two values are equal or not, and in non-equality you're concerned whether two values are
// non-equal or not.

// The difference between == and === is usually characterized that == checks for value equality and === check for
// both value and type equality. However, this is inaccurate. The proper way to characterize them is that == checks
// for value equality with coercion allowed, and === checks for value equality without allowing coercion; === is
// often called "strict equality" for this reason.

/***********/
/* PAGE 38 */
/***********/
// To know whether to use == or === in various situations, here are author's simple rules:
// 	1. If either value (aka side ) in a comparison could be the true or false value, avoid == and use ===.
// 	2. If either value in a comparison be of these specific values (0, "", or []-empty array), avoid == and use ===.
// 	3. In all other cases, you are safe to use ==. Not only is it safe, but in many cases it simplifies your code in a
//     way that improves readability.

// Arrays are by default coerced to strings by simply joining all the values with commas (,) in between.
	var a = [1, 2, 3];
	var b = [1, 2, 3];
	var c = "1, 2, 3";
	a == c;  // true
	b == c;  // true
	a == b;  // false

// Inequality example
	var a = 4;
	var b = "foo";
	a < b;  // false, because b coerced to NaN
	a > b;  // false, same as above
	a == b;  // false, because a coerced to "4"

/***********/
/* PAGE 41 */
/***********/
// Hoisting: Hoisting is JavaScript's default behavior of moving all declarations to the top of the current
// scope (to the top of the current script or the current function).

// JavaScript only hoists declarations, not initializations.
    (function(){
    	console.log(a);  // undefined (here a is only declared not initialized yet - hoisting concept)
    	var a = 4;
    	console.log(a);  // 4
    })();
// -----------------------------------------------
    (function(){
    	x();  // work
    	y();  // not work
    	// function declaration is hoisted to top
    	function x(){
        	console.log('x');
    	}
    	// function expression is not hoisted only name is hoisted to top
    	var y = function(){
        	console.log('y');
    	}
    })();

/***********/
/* PAGE 43 */
/***********/
// ES6 lets you declare variables to belong to individual blocks (pairs of { .. }), using let keyword.
    {
      console.log(c); // undefined. Due to hoisting
      var c = 2;
    }
    {
      console.log(b); // ReferenceError: b is not defined
      let b = 3;
    }

/***********/
/* PAGE 45 */
/***********/
// Strict mode is a big win for code, and you should use it for all your programs. You can opt in to strict
// mode for and individual function, or and entire file, depending on where you put the strict mode pragma.
    (function(){
    	"use strict";  // turn on strict mode
    	a = 1;  // 'var' missing, ReferenceError
    })();
    b = 1;  // this code is not in strict mode

/***********/
/* PAGE 47 */
/***********/
// Function as values

// This function expression assigned to the foo variable is called anonymous because it has no name.
    var foo = function() {
    	// ..
    }

// This function expression is named(bar), even as a reference to it is also assigned to the x variable. (More preferable)
    var x = function bar() {
    	// ..
    }

// Immediately Invoked Function Expressions (IIFEs) to execute a function expression
    function foo() { .. }
    // 'foo' function reference expression,
    // then '()' executes it
    foo():

    // 'IIFE' function expression,
    // then '()' executes it
    (function() IIFE() { .. })();

    // IIFEs can also have return values
    var x = ( function IIFE() {
    	return 4;
    })();
    x; // 4

/***********/
/* PAGE 49 */
/***********/
// Closure is one of the most important, and often least understood, concepts in JS. It will be one of the
// most important techniques in you JS skill set.
// A closure is a function having access to the parent scope, even after the parent function has closed.

    var add = (function () {
        var counter = 0;
        return function () {return counter += 1;}
    })();
    console.log(add());  // 1
    console.log(add());  // 2
    console.log(add());  // 3
// -----------------------------------------------
    function makeAdder(x) {
    	function add(y) {
    		return y + x;
    	}
    	return add;
    }
    var plusOne = makeAdder(1);  // set x = 1
    var plusTen = makeAdder(10);  // set x = 10
    plusOne(3);  // 4 <-- 3+1
    plusTen(13);  // 23 <-- 13+10
// -----------------------------------------------
    function counter() {
    	var counter = 0;
    	// this function is ENCLOSED inside other function
    	var increment = function() {
    		counter++;
    		console.log(counter);
    	}
    	return {
    		increment
    	}
    }
    var x = counter();
    x.increment();  // 1
    x.increment();  // 2
    var x1 = counter();
    x1.increment();  // 1

// The most common usage of closure in JS is the module Pattern.
    function User() {
    	var username, password;
    	function doLogin(user, pw) {
    		username = user;
    		password = pw;
    		// do the rest of login work
    		console.log("loged in");
    		console.log("UN: " + username + ", " + "PW: " + password);
    	}
    	var publicAPI = {
    		login: doLogin
    	}
    	return publicAPI;
    }
    // create a 'User' module instance
    var fred = User();
    fred.login("fred", "1234");

/***********/
/* PAGE 52 */
/***********/
// this identifier
    function foo() {
    	console.log(this.bar);
    }
    var bar = "global";
    var obj1 = {
    	bar: "obj1",
    	foo: foo
    };
    var obj2 = {
    	bar: "obj2"
    }
    foo();  // "global"
    obj1.foo();  // "obj1"
    foo.call(obj2);  // "obj2"
    new foo();  // undefined, sets this to new brand new empty object

/***********/
/* PAGE 53 */
/***********/
// prototypes
    var foo = {
    	a: 42
    }
    // create 'bar' and link it to 'foo'
    var bar = Object.create(foo);
    bar.b = "hello world";
    console.log(bar.b);
    console.log(bar.a);

/***********/
/* PAGE 55 */
/***********/
// There are two main techniques you can use to "bring" the newer JS stuff to older browsers:
// 1. Polyfilling (ES5-Shim and ES6-Shim)
// he word 'polyfill' is an invented term (by Remy Sharp) used to refer to taking the definition of a newer feature
// and producing a piece of code that's equivalent to the behavior, but is able to run in older JS environments

// 2. Transpiling (Babel and Traceur-Transpiles ES6, ES7 and beyond into ES5)
// here is no way to polyfill new syntax that has been added to the language. The new syntax would throw an error
// in the old JS engine as unrecognized/invalid. or the better option is to use a tool that converts your newer
// code into older code equivalents. This process is commonly called 'transpiling,' a term for transforming + compiling.
// You typically insert the transpiler into your build process, similar to your code linter or your minifier.
