/**
 * Storage
 */

var a = 'a';
let b = 'b';
const c = 'c';

/**
 * Primitives
 */

var number = 1;
var string = 'one';
var falsey = false;
var truthy = true;
var nil = null;
var undef = undefined;

/**
 * Regex
 */

var regex = [
  !/^@[^/]+?\/[^/]+?$/,
  /^(?:one)\s*\b(c)\s*\v\h\r\n(?!two)(?=three)$/,
  /[\\\/]/,
  /[^\\\/]/,
  /\\[-\\@`*_#+.!(){}[\]>]/,
  /(?=\S)(\1)((?!\1)|(?=\1\1))/
]

/**
 * Functions
 */

function foo() {}
function bar() {
  function bar() {
    function bar() {
      function bar() {
        function bar() {
          function bar() {
            function bar() {

            }
          }
        }
      }
    }
  }
}

/**
 * fat arrows
 */

var bar = (a, b, c) => {
  var bar = (a, b, c) => {
    var bar = (a, b, c) => {
      var bar = (a, b, c) => {
        var bar = (a, b, c) => {
          var bar = (a, b, c) => {
            var bar = (a, b, c) => {

            };
          };
        };
      };
    };
  };
};
