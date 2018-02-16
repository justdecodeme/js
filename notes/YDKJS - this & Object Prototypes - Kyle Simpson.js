/****************************************************
          YDKJS - UP & GOING - KYLE SIMPSON
****************************************************/

/************/
/* Foreword */
/************/
// When i started using JS 15 years ago, the practice of using non-HTML
// technologies such as CSS and JS in your web pages was callled DHTML or
// Dynamic HTML.

/*****************************/
/* Chapter 1: this or That ? */
/*****************************/
function foo() {
	console.log(this);
}
foo(); // this -> Window object
foo.call(foo); // this -> foo itself

// this is actually a binding that is made when a function is invoked, and
// what it references is determined entirely by the call-site (the location in code
// where a function is called (not where it's declared)) where the
// function is called.

/****************************************/
/* Chapter 2: this All Makes Sense Now? */
/****************************************/
