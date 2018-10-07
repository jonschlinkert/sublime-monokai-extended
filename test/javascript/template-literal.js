function foo() {}

var bar = {a: 'a', b: {c: {d: {e: 'f'}}}};

var string1 = foo`this is a string`;
var string2 = foo`this is a ${bar.a}`;
var string3 = foo`this is a ${bar.b.c.d.e}`;
