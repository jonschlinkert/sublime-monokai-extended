#!/usr/bin/env node

/**
 * This is a comment
 *
 * ```js
 * var foo = "bar"
 * ```
 * @param {String} a This is a description
 * @param {String} b This is a description
 * @param {String} c This is a description
 * @returns {Object}
 * @public
 */

var fs = require('fs');

var object = {
  property: {
    one: {
      two: {
        three: function(foo, bar) {
          if (foo === bar) {
            switch (foo) {
              case 'a':
                return foo;
              case 'b':
              default: {
                return bar;
              }
            }
          }
        },
        fat: (foo, bar) => {
          return foo;
        }
      }
    }
  }
};

class Foo() {
  constructor() {
    super();
    this.admin = true;
    this.length = 0;
  }

  node() {
    this.length++;
  }
}

function fn(a, b, c) {
  return a + b + c;
}

var es6template = fn`this is a ${template}`;

var words = 'Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> Usage: $ lth [options] <file> <dest> '

var regex = /^(abc)\1(?!foo)\\\b(?=bar)[^123a-z]12$/;

/**
 * This is a comment
 * https://foo.com
 * @param one is a parameter
 * @param two is a parameter
 */

function help() {
  console.error('Usage: $ lth [options] <file> <dest>');
  console.error();
  console.error('  file:  The file to convert');
  console.error('  dest:  Required if --overwrite is not defined');
  console.error();
  console.error('Options:');
  console.error();
  console.error('-o, --overwrite', 'Overwrite the source file');
  console.error();
}

var argv = minimist(process.argv.slice(2), opts);
if (argv.version) {
  console.log(pkg.name, pkg.version);
  process.exit();
}

if (argv.help) {
  help();
  process.exit();
}

var filepath, destpath;
if (argv._[0]) {
  filepath = argv._[0];
  destpath = argv._[1];
} else {
  filepath = argv.file;
  destpath = argv.dest;
}

if (!filepath) {
  help();
  process.exit(1);
}

if (!destpath) {
  destpath = filepath.replace(/\.(html|liquid)/, '.hbs');
}

fs.readFile(path.resolve(filepath), function(err, buf) {
  handleError(err);

  var str = buf.toString();
  str = convert(str, argv);

  writeFile(destpath, str, function(err) {
    handleError(err);
    ok('Success:', filepath);
  });
});

function handleError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}

class Base {}

/**
 * Create the core application
 */

class LintDeps extends Base {
  constructor(options) {
    super(null, options);
    this.is('app');
    this.defaults = {};
    this.config = {};
    this.use(cwd());
    this.use(option());
    this.use(task());
    this.use(yarn());
    this.use(npm());
    this.use(pkg());
    this.validTypes = utils.validTypes;
    this.cache.files = {};
  }

  /**
   * Initialize config and load plugins with the given `options`.
   */

  lazyInit() {
    if (!this.isInitialized && this.options.init !== false) {
      this.isInitialized = true;
      const pwd = process.cwd();
      const app = this;

      this.on('cwd', function(cwd) {
        console.log('changing cwd to:', cwd);
        process.chdir(cwd);
      });

      this.once('end', function() {
        if (pwd !== app.cwd) {
          process.chdir(pwd);
        }
      });

      if (!this.options.verbose) {
        this.enable('silent');
      }

      // load all config files
      this.loadConfig();
    }
  };

  /**
   * Initialize plugins and defaults with the given `options`
   *
   * ```js
   * var app = new LintDeps();
   * app.loadConfig(types[, options]);
   * // example
   * app.loadConfig(['global', 'local', 'cwd']);
   * ```
   * @param {Array} `types` Configuration types/locations to load. See [merge-configs][] for details.
   * @param {Object} `options`
   * @api public
   */

  loadConfig(types, options) {
    if (!Array.isArray(types)) {
      options = types;
      types = [];
    }

    this.use(defaults());
    const opts = utils.merge({}, this.defaults, this.options, options);
    opts.types = utils.union([], utils.get(opts, 'config.types'), types);
    opts.files = utils.get(opts, 'config.files');
    opts.filter = utils.get(opts, 'config.filter');
    this.config = configs('lint-deps', opts);
    // const js = this.config.js.filter(function(fp) {
    //   const base = path.basename(path.dirname(fp));
    //   if (base !== '.lint-deps') {
    //     return false;
    //   }
    //   return path.basename(fp) === 'index.js';
    // });

    const globalJs = glob.sync('lint-deps-*', {cwd: dir}).map(function(name) {
      return require.resolve(path.resolve(dir, name));
    });

    utils.normalizeOptions(this.config.merged);
    this.default(this.config.merged);
    const js = utils.union([], this.defaults.js, this.config.js, this.options.js, globalJs);

    this.loadPlugins(js);
    utils.normalizeOptions(this.options);

    const devDeps = this.options.dev;
    const deps = this.options.deps;

    if (devDeps) {
      utils.unionValue(this.options, 'devDependencies.files.patterns', devDeps);
      this.updatePackage('devDependencies.files.patterns', devDeps, utils.unionValue);
    }
    if (deps) {
      utils.unionValue(this.options, 'dependencies.files.patterns', deps);
      this.updatePackage('dependencies.files.patterns', deps, utils.unionValue);
    }
  };

  /**
   * Update `prop` in package.json with the given `value`.
   *
   * @param {String} `prop`
   * @param {Any} `val`
   * @param {Function} `fn` (optional)
   * @return {undefined}
   * @api public
   */

  updatePackage(prop, val, fn) {
    this.on('done', () => {
      var pkg = JSON.parse(fs.readFileSync(this.pkg.path, 'utf8'));
      if (typeof fn === 'function') {
        fn(pkg, 'lintDeps.' + prop, val);
      } else {
        utils.set(pkg, 'lintDeps.' + prop, val);
      }
      writeJson.sync(this.pkg.path, pkg);
    });
  };

  /**
   * Load an array of plugins. A plugin is a function that takes an
   * instance of `LintDeps`.
   *
   * ```js
   * var app = new LintDeps();
   * // plugins
   * app.loadPlugins([
   *   function(app) {},
   *   function(app) {},
   *   function(app) {},
   * ]);
   * ```
   * @param {Array|Function} `fns` One or more plugin functions.
   * @api public
   */

  loadPlugins(fns) {
    var plugins = utils.arrayify(fns);
    for (var i = 0; i < plugins.length; i++) {
      var plugin = plugins[i];
      if (typeof plugin === 'string' && fs.existsSync(plugin)) {
        plugin = require(plugin);
      }
      if (typeof plugin === 'function') {
        this.use(plugin);
      }
    }
  };

  /**
   * Lint for missing or unused dependencies for the given
   * dependency `types` in the specified `files`.
   *
   * @param {String|Array} `types` One or more dependency types (`dependency`, `devDependency` etc)
   * @param {String|Array} `files` Array of file objects, or glob pattern(s) of the files to include in the search. If files are objects, they must include a `type` property that specifies the dependency type associated with the file.
   * @param {Array} `options` Globbing options.
   * @return {Object} Returns an object with missing and unused dependencies.
   * @api public
   */

  lint(types, files, options) {
    if (types === '*') {
      types = utils.validTypes;
    }

    if (typeof types === 'string') {
      types = [types];
    }

    if (utils.isObject(files)) {
      options = files;
    }

    if (typeof this.report === 'undefined') {
      this.report = {};
    }

    this.report.types = [];

    for (var i = 0; i < types.length; i++) {
      var report = this.lintType(types[i], options);
      if (report) {
        this.report.types.push(report.type);
        this.report.missingCount += report.missingCount;
      }
    }

    Object.defineProperty(this.report, 'missingCount', {
      configurable: true,
      set: function(val) {
        this._missingCount = val;
      },
      get: function() {
        var count = this._missingCount || 0;
        for (var i = 0; i < this.types.length; i++) {
          count += this[this.types[i]].missingCount;
        }
        return count;
      }
    });

    Object.defineProperty(this.report, 'missingTypes', {
      configurable: true,
      get: function() {
        var types = [];
        for (var i = 0; i < this.types.length; i++) {
          var type = this.types[i];
          if (this[type].missingCount > 0) {
            types.push(type);
          }
        }
        return types;
      }
    });

    Object.defineProperty(this.report, 'unused', {
      configurable: true,
      get: function() {
        var unused = [];
        for (var i = 0; i < this.types.length; i++) {
          unused = unused.concat(this[this.types[i]].unused);
        }
        return unused;
      }
    });

    Object.defineProperty(this.report, 'unusedCount', {
      configurable: true,
      get: function() {
        var count = 0;
        for (var i = 0; i < this.types.length; i++) {
          count += this[this.types[i]].unused.length;
        }
        return count;
      }
    });

    this.uniquify(this.report);
    return this.report;
  };

  /**
   * Lint for missing or unused dependencies for a single dependency `type`.
   *
   * @param {String} `type` Dependency type (`dependency`, `devDependency` etc)
   * @param {String|Array} `files` Glob pattern(s) of the files to include in the search.
   * @param {Array} `options` Globbing options.
   * @return {Object} Returns an object with missing and unused dependencies.
   * @api public
   */

  lintType(type, files, options) {
    this.emit('lintType:starting', type);
    this.lazyInit();

    if (!Array.isArray(files)) {
      options = files;
      files = undefined;
    }

    this.report = this.report || {};
    var typeOpts = this.typeOptions(type, options);
    var app = this;

    if (!files) files = this.loadFiles(typeOpts);
    if (Array.isArray(this.cache[type])) {
      utils.union(files, this.cache[type]);
    }

    if (files.length === 0) return;

    files = files.reduce(function(acc, file) {
      if (utils.isGlob(file)) {
        return acc.concat(app.loadFiles(file, typeOpts));
      }

      if (app.filter(file) === false) {
        return acc;
      }

      if (typeof file === 'string') {
        file = app.toFile(file, options);
      }

      if (!utils.isObject(file) || !file._isVinyl) {
        throw new Error('cannot load file: ' + file);
      }

      if (file.isDirectory()) {
        return acc;
      }

      file.modules = file.modules || [];
      file.type = type;

      if (!app.cache.files[file.path]) {
        app.cache.files[file.path] = file;
        acc.push(file);
      }

      return acc;
    }, []);

    files = utils.sortFiles(files);

    var report = this.report[type] || (this.report[type] = {});
    var pkg = utils.clone(typeOpts.pkg || this.pkg.data);
    var deps = Object.keys(pkg[type] || {});
    var missing = { modules: [], files: {} };
    var modules = {};
    var used = [];
    var all = [];

    report.type = type;

    Object.defineProperty(report, 'missingCount', {
      get: function() {
        return this.missing.modules.length;
      }
    });

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      file.missing = [];

      this.emit('file', file);

      utils.union(used, file.modules);
      utils.unionValue(report, 'files', file);

      for (var j = 0; j < file.modules.length; j++) {
        var name = file.modules[j];

        utils.unionValue(modules, name, file.relative);
        utils.union(all, name);

        if (!utils.has(deps, name)) {
          var mkey = 'files.' + file.relative.split('.').join('\\.');
          utils.unionValue(missing, mkey, name);
          utils.unionValue(missing, 'modules', name);
          utils.unionValue(file, 'missing', name);
        }
      }
    }

    missing.modules.sort();

    var whitelist = get(this, 'config.pkg.whitelist') || [];
    // var addl = get(this, 'config.pkg.missing') || [];
    // if (addl && type === 'devDependencies') {
    //   utils.union(missing.modules, addl);
    // }

    var unused = utils.diff(deps.slice(), used.slice());
    if (whitelist.length) {
      unused = unused.filter(function(name) {
        return !utils.mm.any(name, whitelist);
      });
    }

    utils.set(report, 'unused', unused);
    utils.set(report, 'missing', missing);
    utils.set(report, 'modules', modules);

    this.updateLocked(type, report, typeOpts);
    this.emit('lintType:finished', type);
    return report;
  };

  /**
   * Returns an object with information about why a package is used.
   *
   * @param {String} `name`
   * @param {Object} `options`
   * @returns {Object}
   * @api public
   */

  why(name, options) {
    if (typeof name !== 'string') {
      throw new TypeError('expected name to be a string');
    }

    var report = this.lint('*', options);
    var res = {name: name, files: {}, types: [], count: 0};
    var keys = report.types;
    var len = keys.length;
    var idx = -1;

    while (++idx < len) {
      var type = keys[idx];
      var obj = report[type];

      if (obj.modules.hasOwnProperty(name)) {
        var files = obj.modules[name];
        res.files[type] = files;
        res.count += files.length;
      }
    }

    var types = utils.validTypes;
    var pkg = this.pkg.data;

    for (var i = 0; i < types.length; i++) {
      var t = types[i];
      if (pkg[t] && pkg[t][name]) {
        res.types.push(t);
      }
    }

    return res;
  };

  typeOptions(type, options) {
    var merged = this.mergeOpts(options);
    var opts = get(merged, type) || merged;
    if (opts.options) {
      opts = utils.merge({}, opts, opts.options);
      delete opts.options;
    }
    return opts;
  };

  isLocked(name) {

  };

  /**
   * Remove module names from the "missing" list in a given type of
   * dependencies when the exist in another type of dependencies.
   *
   * @param {object} `report`
   * @param {string} `removeType` (optional) The type of dependencies to remove names from. Defaults to `devDependencies`
   * @param {string} `keepType` (optional) The type to reference. Defaults to `dependencies`
   * @returns {undefined}
   */

  uniquify(report, removeType, keepType) {
    var exclude = this.pkg.get('lintDeps.modules.exclude') || [];

    if (removeType && keepType) {
      utils.uniquify(report, removeType, keepType);
      return;
    }

    if (utils.has(report.types, 'dependencies')) {
      for (var i = 0; i < report.types.length; i++) {
        var type = report.types[i];

        if (exclude.length) {
          utils.remove(report[type].missing.modules, exclude);

          var files = report[type].files;
          for (var j = 0; j < files.length; j++) {
            utils.remove(files[j].missing, exclude);
          }
        }

        if (type !== 'dependencies') {
          utils.uniquify(report, type, 'dependencies');

          var deps = Object.keys(report.dependencies.modules);
          var arr = report[type].files;

          for (var k = 0; k < arr.length; k++) {
            utils.remove(arr[k].missing, deps);
          }
        }
      }
    }
  };

  /**
   * Update the array of "missing" modules on `report.missing.modules` with
   * matching modules that have locked versions defined on `options.lock`.
   */

  updateLocked(type, report, options) {
    var locked = options.lock || {};
    var keys = Object.keys(locked);
    var mods = report.missing.modules;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = locked[key];
      var idx = mods.indexOf(key);
      if (idx !== -1) {
        mods[idx] = key + '@' + val;
      }
    }
  };

  /**
   * Merge lint-deps defaults with user-provided config and `options`.
   *
   * @param {Object=} `options`
   * @returns {Object}
   * @api public
   */

  mergeOpts(options) {
    return utils.merge({}, this.defaults, this.options, options);
  };

  /**
   * Get a file from the cache.
   *
   * @param {String} `type`
   * @param {String} `basename`
   * @param {Function} `fn`
   * @return {Object|undefined}
   * @api public
   */

  getFile(type, basename, fn) {
    if (Array.isArray(this.cache[type])) {
      var files = this.cache[type];
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.basename === basename) {
          return file;
        }
        if (typeof fn === 'function' && fn(file)) {
          return file;
        }
      }
    }
  };

  /**
   * Add a file to the `cache` array for the given dependency `type`.
   *
   * @param {String} type The dependency type to associate with the file.
   * @param {Object} file
   * @returns {Object} Returns the instance for chaining
   * @api public
   */

  addFile(type, file) {
    this.union(`cache.${type}`, file);
    return this;
  };

  /**
   * Load a glob of vinyl files.
   *
   * ```js
   * var files = lintDeps.glob('*.js');
   * ```
   * @param {Array|String} `patterns` One or more glob patterns.
   * @param {Object} `options`
   * @returns {Array} Returns an array of [vinyl][] file objects.
   * @api public
   */

  loadFiles(patterns, options) {
    this.emit('loading-files', patterns, options);
    var moduleOpts = {};
    var app = this;

    if (utils.isObject(patterns) && patterns.files) {
      moduleOpts = Object.assign(patterns.modules);
      options = patterns.files.options;
      patterns = patterns.files.patterns;
    }

    if (!utils.isValidGlob(patterns)) return [];
    var opts = Object.assign({cwd: this.cwd}, options);

    return utils.glob.sync(patterns, opts).reduce(function(acc, basename) {
      var fp = path.join(opts.cwd, basename);
      var file = app.toFile(fp, moduleOpts);
      if (file.isDirectory()) {
        return acc;
      }

      if (app.filter(file) === false) {
        return acc;
      }
      return acc.concat(file);
    }, []);
  };

  /**
   * Strip code comments and match requires/imports in the `file.contents`
   * of a vinyl `file`, then push it onto the given `files` array.
   *
   * ```js
   * lintDeps.toFile(files, file, options);
   *
   * // example gulp plugin usage
   * function plugin(options) {
   *   var files = [];
   *   return through.obj(function(file, enc, next) {
   *     files.push(toFile(file, options));
   *     next();
   *   }, function() {
   *
   *   });
   * }
   * ```
   * @param {Array|String} `patterns` One or more glob patterns.
   * @param {Object} `options`
   * @api public
   */

  toFile(file, options) {
    if (typeof file === 'string') {
      file = new File({path: path.resolve(this.cwd, file)});
    }

    if (!file.stat) {
      file.stat = fs.statSync(file.path);
    }

    if (file.isDirectory()) return file;

    if (!file.contents) {
      file.contents = fs.readFileSync(file.path);
    }

    file.folder = path.basename(file.dirname);
    this.stripComments(file, options);
    this.matchModules(file, options);
    return file;
  };

  /**
   * Match module names defined using node's `require` system and
   * es imports. Adds a `file.modules` property with an array of matches.
   *
   * @param {Object} `file` Vinyl file
   * @param {Object} `options`
   * @returns {undefine}
   * @api public
   */

  matchModules(file, options) {
    var opts = Object.assign({}, options);
    var matches = utils.modules(file.contents.toString(), opts);
    var isIgnored = this.isIgnored(opts.exclude);
    file.modules = [];

    for (var i = 0; i < matches.length; i++) {
      var name = matches[i].module;

      if (!utils.isValidPackageName(name)) {
        continue;
      }

      // get the module name from `foo/bar`
      if (!/^@[^/]+?\/[^/]+?$/.test(name)) {
        name = name.split(/[\\\/]/)[0];
      }

      if (!isIgnored(name)) {
        file.modules.push(name);
      }
    }
  };

  /**
   * Strip all comments from `file.contents`, to avoid false positives
   * when require statements or imports are commented out.
   *
   * @param {Object} `file` Vinyl file
   * @param {Object} `options`
   * @returns {undefine}
   * @api public
   */

  stripComments(file, options) {
    var opts = Object.assign({}, this.options, options);
    var str = file.contents.toString();
    if (!utils.isString(str)) return;

    if (typeof opts.stripComments === 'function') {
      opts.stripComments.call(this, file);
      return;
    }

    // strip hash-bang from bos and quoted strings in
    // unit tests etc, since they choke esprima
    str = str.replace(/#!\/usr[^\n'",]+/gm, '');
    str = str.replace(/^\s*\/\/[^\n]+/gm, '');

    try {
      file.contents = new Buffer(utils.stripComments(str));
    } catch (err) {
      if (opts.verbose) {
        console.log('esprima parsing error in: ' + file.path);
        console.log(err);
      }
    }
  };

  /**
   * Returns a matcher function that returns true when the given
   * string matches one of the provided ignore `patterns`.
   *
   * @param {String|Array} patterns One or more glob patterns
   * @param {Object} options
   * @returns {Function} Returns a matcher function that takes a string.
   * @api public
   */

  isIgnored(patterns, options) {
    if (patterns == null) {
      return function() {
        return false;
      };
    }

    if (typeof patterns === 'string') {
      patterns = [patterns];
    }

    if (patterns.length === 0) {
      return function() {
        return false;
      };
    }

    return utils.mm.matcher(patterns, options);
  };

  /**
   * Return true if `file` should be filtered out
   *
   * @param {[type]} file
   * @return {[type]}
   * @api public
   */

  filter(file) {
    if (file.isFiltered || file.isValid) {
      return true;
    }

    file.isFiltered = true;
    if (typeof this.options.filter === 'function') {
      return this.options.filter.call(this, file);
    }

    var stat = fs.statSync(file.path);
    if (!stat.isFile()) {
      return false;
    }
    if (file.extname !== '.js' && file.folder !== 'bin') {
      return false;
    }
    return true;
  };
}

/**
 * Expose `LintDeps`
 * @type {constructor}
 */

module.exports = LintDeps;
