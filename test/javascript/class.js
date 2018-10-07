
class Foo {
  constructor(a, b, c) {
    this.isFoo = true;
  }

  one() {
    return this.isFoo;
  }

  two() {
    return this.isFoo;
  }
}

class Bar extends Foo {
  constructor(options) {
    if (Array.isArray(options)) options = options[0];

    if (!options) {
      throw new Error('expected options');
    }
    var utils1 = {bar: function() {}};
    var utils2 = {bar: () => {}};

    var arr = [].slice.call(arguments);

    options.foo1 = new Buffer(utils1.bar('slsllslsl'));
    options.foo2 = new Buffer(this.bar('fsfssfsss'));

    Object.defineProperty(this, 'abc', {
      configurable: true,
      set: function(val) {
        this._abc = val;
      },
      get: function() {
        return this._abc;
      }
    });
  }

  one() {
    return this.isBar;
  }

  two() {
    return this.isBar;
  }
}

var foo = new Foo({a: b}, c, d);
