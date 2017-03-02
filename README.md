# [sublime-monokai-extended](https://github.com/jonschlinkert/sublime-monokai-extended) [![package control total downloads](https://img.shields.io/packagecontrol/dt/Monokai%20Extended.svg?style=flat-square)](https://packagecontrol.io/packages/Monokai%20Extended/)

_(Companion to [sublime-markdown-extended](https://github.com/jonschlinkert/sublime-markdown-extended))_

<br>

Extends [Soda Monokai][soda] with:

* Additional syntax highlighting for markdown, LESS, coffee, diffs, and handlebars and more! 
* Improved syntax highlighting for regular expressions, HTML, LESS, CSS, JavaScript and more!

<br>

#### See: [examples ↓](#examples) | [before and after screenshots][ba]

<br>

## Getting Started

### 1. Installation

#### Package Control

If you already have [Package Control](http://wbond.net/sublime_packages/package_control/) installed in Sublime Text:

* Select "Install Package" from the Command Palette: <kbd>Ctrl+Shift+P</kbd> on Windows and Linux or <kbd>⇧⌘P</kbd> on OS X)
* Search for "**Monokai Extended**" and click <kbd>enter</kbd>.


#### Manual Installation

Go to `Preferences -> Browse Packages`, and then either download and unzip this plugin into that directory, or:

``` bash
git clone https://github.com/jonschlinkert/sublime-monokai-extended.git "sublime-monokai-extended"
```


### 2. Switch Themes

Open a Markdown file in Sublime Text and make sure that syntax highlighting is set to Markdown Extended (not Markdown) `View -> Syntax -> Markdown Extended`.

Then go to `Preferences -> Color Scheme -> Monokai Extended` and pick a theme.


## Monokai Enhancements

Adds scopes, support and/or improves styling for:

* [GitGutter](https://github.com/jisaacks/GitGutter)
* `Makefile`
* `HTML: Doctype/XML Processing`
* `HTML: Comment Block`
* `HTML: Script`
* `HTML: Style`
* `HTML: Text`
* `HTML: Attribute punctuation`
* `HTML: Attributes`
* `HTML: Quotation Marks`
* `HTML: Tag`
* `HTML: style`
* `HTML: Styles`
* `HTML: {}`
* `HTML: Tags punctuation`
* `Handlebars: Variable` (To highlight Handlebars, install the [Handlebars](https://github.com/daaain/Handlebars) language package for Sublime Text)
* `Handlebars: Constant`
* `CSS: Selector`
* `CSS: Tag Name`
* `CSS: @import`
* `CSS: @at-rule`
* `CSS: #Id`
* `CSS: .class`
* `CSS: Property Name`
* `CSS: Property Value`
* `CSS: Standard Value`
* `CSS: Additional Constants`
* `CSS: Numeric Value`
* `CSS: Constructor Argument`
* `CSS: !Important`
* `CSS: {}`
* `CSS: Tag Punctuation`
* `CSS: : ,`
* `CSS :pseudo`
* `LESS: variables`
* `LESS: mixins`
* `LESS: extend`
* `js: function name`
* `js: storage type`
* `js: source`
* `js: function`
* `js: numeric constant`
* `js: literal language variable` (When using [babel-sublime](https://github.com/babel/babel-sublime))
* `js: []`
* `js: ()`
* `js: {}`
* `JSON string`
* `CoffeeScript: #{}`
* `diff.range`
* `markdown: plain` (Also install [sublime-markdown-extended](https://github.com/jonschlinkert/sublime-markdown-extended) for additional features.)
* `markdown: raw inline`
* `markdown: linebreak`
* `markdown: heading`
* `markdown: italic`
* `markdown: bold`
* `markdown: underline`
* `markdown: blockquote`
* `markdown: quote`
* `markdown: link`
* `markdown: raw block`
* `markdown: fenced code block`
* `markdown: fenced language`
* `markdown: raw block fenced`
* `markdown: list items punctuation`
* `markdown: separator`
* `markdown: table`

## Examples

### Markdown

See **[before and after examples][ba]**

![image](https://f.cloud.github.com/assets/383994/726833/0fde0d16-e138-11e2-8e3d-8dbfc91224e7.png)


***


### CSS

The following improvements apply to both CSS and LESS.

### CSS Before

#### Spot the #ids at a glance?

![image](https://f.cloud.github.com/assets/383994/810420/8b3f263a-eeb6-11e2-9c60-1ec64c8e455b.png)

### CSS After

#### How about now?

![image](https://f.cloud.github.com/assets/383994/810415/63269ae8-eeb6-11e2-8731-5c73dd1d31a7.png)



## Authors

**Jon Schlinkert**

+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [http://github.com/jonschlinkert](http://github.com/jonschlinkert)

**Alexander Krivoshhekov**

+ [http://twitter.com/FlatDev](http://twitter.com/FlatDev)
+ [http://github.com/SuperPaintman](http://github.com/SuperPaintman)


## License

Copyright © 2013-2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](LICENSE).


[soda]: https://github.com/buymeasoda/soda-theme
[ba]: https://github.com/jonschlinkert/sublime-monokai-extended/issues/4
[yfm]: http://assemble.io/docs/YAML-front-matter.html "YAML Front Matter"
[gfm]: https://help.github.com/articles/github-flavored-markdown#syntax-highlighting "GitHub Flavored Markdown"
