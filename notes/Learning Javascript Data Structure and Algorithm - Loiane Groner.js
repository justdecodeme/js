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

