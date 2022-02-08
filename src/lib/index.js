'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

styleInject(css_248z);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag$1(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement$1(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet$1 = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement$1(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (process.env.NODE_ENV !== 'production') {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag$1(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production' && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (process.env.NODE_ENV !== 'production') {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} value
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string} type
 * @param {string[]} props
 * @param {object[]} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {string} value
 * @param {object} root
 * @param {string} type
 */
function copy (value, root, type) {
	return node(value, root.root, root.parent, type, root.props, root.children, 0)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				return delimiter(type === 34 || type === 39 ? type : character)
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// " ' [ (
			case 34: case 39: case 91: case 40:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset:
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule) {
									// d m s
									case 100: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, length, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

/**
 * @param {string} value
 * @param {number} length
 * @return {string}
 */
function prefix (value, length) {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return WEBKIT + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return WEBKIT + value + MOZ + value + MS + value + value
		// flex, flex-direction
		case 6828: case 4268:
			return WEBKIT + value + MS + value + value
		// order
		case 6165:
			return WEBKIT + value + MS + 'flex-' + value + value
		// align-items
		case 5187:
			return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value
		// align-content
		case 4675:
			return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value
		// flex-shrink
		case 5548:
			return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
		// cursor
		case 6187:
			return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if (strlen(value) - 1 - length > 6)
				switch (charat(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if (charat(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length) + value : value
				}
			break
		// position: sticky
		case 4949:
			// (s)ticky?
			if (charat(value, length + 1) !== 115)
				break
		// display: (flex|inline-flex)
		case 6444:
			switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
				// stic(k)y
				case 107:
					return replace(value, ':', ':' + WEBKIT) + value
				// (inline-)?fl(e)x
				case 101:
					return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
			}
			break
		// writing-mode
		case 5936:
			switch (charat(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
			}

			return WEBKIT + value + MS + value + value
	}

	return value
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';
	var length = sizeof(children);

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case RULESET: element.value = element.props.join(',');
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (!element.return)
		switch (element.type) {
			case DECLARATION: element.return = prefix(element.value, element.length);
				break
			case KEYFRAMES:
				return serialize([copy(replace(element.value, '@', '@' + WEBKIT), element, '')], callback)
			case RULESET:
				if (element.length)
					return combine(element.props, function (value) {
						switch (match(value, /(::plac\w+|:read-\w+)/)) {
							// :read-(only|write)
							case ':read-only': case ':read-write':
								return serialize([copy(replace(value, /:(read-\w+)/, ':' + MOZ + '$1'), element, '')], callback)
							// :placeholder
							case '::placeholder':
								return serialize([
									copy(replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1'), element, ''),
									copy(replace(value, /:(plac\w+)/, ':' + MOZ + '$1'), element, ''),
									copy(replace(value, /:(plac\w+)/, MS + 'input-$1'), element, '')
								], callback)
						}

						return ''
					})
		}
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var last = function last(arr) {
  return arr.length ? arr[arr.length - 1] : null;
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifier(position - 1);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // .length indicates if this rule contains pseudo or not
  !element.length) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return !!element && element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule') return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses && cache.compat !== true) {
      var prevElement = index > 0 ? children[index - 1] : null;

      if (prevElement && isIgnoringComment(last(prevElement.children))) {
        return;
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

var isBrowser$3 = typeof document !== 'undefined';
var getServerStylisCache = isBrowser$3 ? undefined : weakMemoize(function () {
  return memoize(function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (process.env.NODE_ENV !== 'production' && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (isBrowser$3 && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;
  var nodesToHydrate = [];

  if (isBrowser$3) {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (process.env.NODE_ENV !== 'production') {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  if (isBrowser$3) {
    var currentSheet;
    var finalizingPlugins = [stringify, process.env.NODE_ENV !== 'production' ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if (process.env.NODE_ENV !== 'production' && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stringify];

    var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return serialize(compile(styles), _serializer);
    }; // $FlowFixMe


    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
        process.env.NODE_ENV === 'development' && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet$1({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

reactIs_development.AsyncMode = AsyncMode;
reactIs_development.ConcurrentMode = ConcurrentMode;
reactIs_development.ContextConsumer = ContextConsumer;
reactIs_development.ContextProvider = ContextProvider;
reactIs_development.Element = Element;
reactIs_development.ForwardRef = ForwardRef;
reactIs_development.Fragment = Fragment;
reactIs_development.Lazy = Lazy;
reactIs_development.Memo = Memo;
reactIs_development.Portal = Portal;
reactIs_development.Profiler = Profiler;
reactIs_development.StrictMode = StrictMode;
reactIs_development.Suspense = Suspense;
reactIs_development.isAsyncMode = isAsyncMode;
reactIs_development.isConcurrentMode = isConcurrentMode;
reactIs_development.isContextConsumer = isContextConsumer;
reactIs_development.isContextProvider = isContextProvider;
reactIs_development.isElement = isElement;
reactIs_development.isForwardRef = isForwardRef;
reactIs_development.isFragment = isFragment;
reactIs_development.isLazy = isLazy;
reactIs_development.isMemo = isMemo;
reactIs_development.isPortal = isPortal;
reactIs_development.isProfiler = isProfiler;
reactIs_development.isStrictMode = isStrictMode;
reactIs_development.isSuspense = isSuspense;
reactIs_development.isValidElementType = isValidElementType;
reactIs_development.typeOf = typeOf;
  })();
}

if (process.env.NODE_ENV === 'production') {
  reactIs$1.exports = reactIs_production_min;
} else {
  reactIs$1.exports = reactIs_development;
}

var reactIs = reactIs$1.exports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser$2 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$2 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      if (!isBrowser$2 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$2 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with @emotion/babel-plugin.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser$1 = typeof document !== 'undefined';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */React.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

if (process.env.NODE_ENV !== 'production') {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = React.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser$1) {
  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = React.useContext(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache({
          key: 'css'
        });
        return /*#__PURE__*/React.createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'EmotionThemeContext';
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if (process.env.NODE_ENV !== 'production' && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  if (process.env.NODE_ENV !== 'production') {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z0-9$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};
var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles, undefined, React.useContext(ThemeContext));

  if (process.env.NODE_ENV !== 'production' && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && (process.env.NODE_ENV === 'production' || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/React.createElement(type, newProps);

  if (!isBrowser$1 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
});

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal';
}

var Fragment = jsxRuntime.Fragment;
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsxRuntime.jsx(type, props, key);
  }

  return jsxRuntime.jsx(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsxRuntime.jsxs(type, props, key);
  }

  return jsxRuntime.jsxs(Emotion, createEmotionProps(type, props), key);
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (process.env.NODE_ENV !== 'production') {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production' && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (process.env.NODE_ENV !== 'production') {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();

var pkg = {
	name: "@emotion/react",
	version: "11.4.1",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.cjs.js": "./dist/emotion-react.browser.cjs.js",
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"isolated-hoist-non-react-statics-do-not-use-this-in-your-code",
		"types/*.d.ts",
		"macro.js",
		"macro.d.ts",
		"macro.js.flow"
	],
	sideEffects: false,
	author: "mitchellhamilton <mitchell@mitchellhamilton.me>",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.13.10",
		"@emotion/cache": "^11.4.0",
		"@emotion/serialize": "^1.0.2",
		"@emotion/sheet": "^1.0.2",
		"@emotion/utils": "^1.0.0",
		"@emotion/weak-memoize": "^0.2.5",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		"@babel/core": "^7.0.0",
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@babel/core": {
			optional: true
		},
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@babel/core": "^7.13.10",
		"@emotion/css": "11.1.3",
		"@emotion/css-prettifier": "1.0.0",
		"@emotion/server": "11.4.0",
		"@emotion/styled": "11.3.0",
		"@types/react": "^16.9.11",
		dtslint: "^0.3.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js"
		],
		umdName: "emotionReact"
	}
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {
  if (process.env.NODE_ENV !== 'production' && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, React.useContext(ThemeContext));

  if (!isBrowser$1) {
    var _ref;

    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      serializedStyles += next.styles;
      next = next.next;
    }

    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);

    if (shouldCache) {
      return null;
    }

    return /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = React.useRef();
  React.useLayoutEffect(function () {
    var key = cache.key + "-global";
    var sheet = new StyleSheet({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  React.useLayoutEffect(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (process.env.NODE_ENV !== 'production') {
  Global.displayName = 'EmotionGlobal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if (process.env.NODE_ENV !== 'production' && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = /* #__PURE__ */withEmotionCache(function (props, cache) {
  var rules = '';
  var serializedHashes = '';
  var hasRendered = false;

  var css = function css() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered);

    if (isBrowser$1) {
      insertStyles(cache, serialized, false);
    } else {
      var res = insertStyles(cache, serialized, false);

      if (res !== undefined) {
        rules += res;
      }
    }

    if (!isBrowser$1) {
      serializedHashes += " " + serialized.name;
    }

    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: React.useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;

  if (!isBrowser$1 && rules.length !== 0) {
    var _ref;

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + " " + serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
});

if (process.env.NODE_ENV !== 'production') {
  ClassNames.displayName = 'EmotionClassNames';
}

if (process.env.NODE_ENV !== 'production') {
  var isBrowser = typeof document !== 'undefined'; // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock

  var isJest = typeof jest !== 'undefined';

  if (isBrowser && !isJest) {
    var globalContext = isBrowser ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}

let warned = false;

var colors = {
  black: '#000',
  white: '#fff',
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  get lightBlue() {
    if (!warned) {
      console.log('warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.');
      console.log('warn - Please update your color palette to eliminate this warning.');
      warned = true;
    }
    return {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    }
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warmGray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  trueGray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  coolGray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  blueGray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

//@ts-ignore
var foundation = {
    theme: {
        typography: {
            fontFamily: {
                default: 'Urbanist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                openSans: "'Open Sans', sans-serif",
            },
            display: {
                fontSize: "40px",
                lineHeight: "60px",
                fontWeight: "700",
            },
            h1: {
                fontSize: "32px",
                lineHeight: "48px",
                fontWeight: "700",
            },
            h2: {
                fontSize: "28px",
                lineHeight: "42px",
                fontWeight: "700",
            },
            h3: {
                fontSize: "24px",
                lineHeight: "36px",
                fontWeight: "700",
            },
            h4: {
                fontSize: "22px",
                lineHeight: "33px",
                fontWeight: "700",
            },
            title1: {
                fontSize: "21px",
                lineHeight: "31.5px",
                fontWeight: "700",
            },
            title2: {
                fontSize: "18px",
                lineHeight: "27px",
                fontWeight: "700",
            },
            title3: {
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "700",
            },
            title4: {
                fontSize: "15px",
                lineHeight: "22.5px",
                fontWeight: "700",
            },
            title5: {
                fontSize: "14px",
                lineHeight: "21px",
                fontWeight: "700",
            },
            title6: {
                fontSize: "13px",
                lineHeight: "19.5px",
                fontWeight: "700",
            },
            body1: {
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "400",
            },
            body2: {
                fontSize: "15px",
                lineHeight: "22.5px",
                fontWeight: "400",
            },
            body3: {
                fontSize: "14px",
                lineHeight: "21px",
                fontWeight: "400",
            },
            body4: {
                fontSize: "13px",
                lineHeight: "19.5px",
                fontWeight: "400",
            },
            caption1: {
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: "700",
            },
            caption2: {
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: "400",
            },
            caption3: {
                fontSize: "11px",
                lineHeight: "16.5px",
                fontWeight: "700",
            },
            caption4: {
                fontSize: "11px",
                lineHeight: "16.5px",
                fontWeight: "400",
            },
            label: {
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: "400",
            },
            tag: {
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: "700",
            },
        },
        colors: {
            primary: {
                darkest: "#05449E",
                dark: "#1173CF",
                main: "#1892F0",
                light: "#8ec8f7",
                lightest: "#E3F1FD",
            },
            secondary: {
                darkest: "#005384",
                dark: "#0083b9",
                main: "#00A1D9",
                light: "#80d0e9",
                lightest: "#e0f4fa",
            },
        },
        spacing: 4,
        spacingSize: {
            xxs: 4,
            xs: 8,
            s: 16,
            m: 20,
            l: 40,
            xl: 60,
        },
        button: {
            disabled: {
                background: colors.gray[300],
                color: colors.gray[400],
            },
        },
        container: {
            center: true,
        },
        screens: {
            sm: "640px",
            md: "1024px",
            lg: "1280px",
            xl: "1536px",
        },
    },
    tailWindColors: colors,
};

exports.ButtonVariant = void 0;
(function (ButtonVariant) {
    ButtonVariant["normal"] = "normal";
    ButtonVariant["solid"] = "solid";
    ButtonVariant["text"] = "text";
})(exports.ButtonVariant || (exports.ButtonVariant = {}));
exports.ButtonColor = void 0;
(function (ButtonColor) {
    ButtonColor["primary"] = "primary";
    ButtonColor["secondary"] = "secondary";
    ButtonColor["normal"] = "normal";
})(exports.ButtonColor || (exports.ButtonColor = {}));
exports.ButtonSize = void 0;
(function (ButtonSize) {
    ButtonSize["small"] = "small";
    ButtonSize["medium"] = "medium";
    ButtonSize["large"] = "large";
})(exports.ButtonSize || (exports.ButtonSize = {}));
var btnStyle = css(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n  font-family: ", ";\n  display: inline-block;\n  border-radius: ", "px;\n  box-sizing: border-box;\n  border: 1px solid transparent;\n  background-color: transparent;\n  &.btn-fulled {\n    display: block;\n    width: 100%;\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", "60;\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  \n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", "60;\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n\n\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";;\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n\n  &.btn-disabled {\n    pointer-events: none;\n    color: ", ";\n  },\n  &.btn-variant-", ".btn-disabled,\n  &.btn-variant-", ".btn-disabled {\n    background-color: ", ";\n  },\n  &.btn-size-", " {\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    padding: ", "px ", "px;\n  },\n  &.btn-size-", " {\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    padding: 12px ", "px;\n  },\n  &.btn-size-", " {\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    padding: ", "px 12px;\n  },\n"], ["\n  font-family: ", ";\n  display: inline-block;\n  border-radius: ", "px;\n  box-sizing: border-box;\n  border: 1px solid transparent;\n  background-color: transparent;\n  &.btn-fulled {\n    display: block;\n    width: 100%;\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", "60;\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  \n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", "60;\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n\n\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    background-color: ", ";;\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n  &.btn-variant-", ".btn-color-", " {\n    color: ", ";\n    &:active, &:not([disabled]):not(.btn-disabled):not([tabindex='-1']):active {\n      border-color: ", ";\n    },\n    &:hover {\n      background-color: ", ";\n    }\n  },\n\n  &.btn-disabled {\n    pointer-events: none;\n    color: ", ";\n  },\n  &.btn-variant-", ".btn-disabled,\n  &.btn-variant-", ".btn-disabled {\n    background-color: ", ";\n  },\n  &.btn-size-", " {\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    padding: ", "px ", "px;\n  },\n  &.btn-size-", " {\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    padding: 12px ", "px;\n  },\n  &.btn-size-", " {\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    padding: ", "px 12px;\n  },\n"])), foundation.theme.typography.fontFamily.default, foundation.theme.spacingSize.xs, exports.ButtonVariant.solid, exports.ButtonColor.primary, foundation.theme.colors.primary.main, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.dark, exports.ButtonVariant.normal, exports.ButtonColor.primary, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.main, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.light, exports.ButtonVariant.text, exports.ButtonColor.primary, foundation.theme.colors.primary.main, foundation.theme.colors.primary.light, foundation.theme.colors.primary.lightest, exports.ButtonVariant.solid, exports.ButtonColor.secondary, foundation.theme.colors.secondary.main, foundation.theme.colors.secondary.lightest, foundation.theme.colors.secondary.lightest, foundation.theme.colors.secondary.dark, exports.ButtonVariant.normal, exports.ButtonColor.secondary, foundation.theme.colors.secondary.lightest, foundation.theme.colors.secondary.main, foundation.theme.colors.secondary.lightest, foundation.theme.colors.secondary.light, exports.ButtonVariant.text, exports.ButtonColor.secondary, foundation.theme.colors.secondary.main, foundation.theme.colors.secondary.light, foundation.theme.colors.secondary.lightest, exports.ButtonVariant.solid, exports.ButtonColor.normal, foundation.tailWindColors.gray[400], foundation.tailWindColors.gray[50], foundation.tailWindColors.gray[50], foundation.tailWindColors.gray[500], exports.ButtonVariant.normal, exports.ButtonColor.normal, foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[900], foundation.tailWindColors.gray[50], foundation.tailWindColors.gray[200], exports.ButtonVariant.text, exports.ButtonColor.normal, foundation.tailWindColors.gray[900], foundation.tailWindColors.gray[200], foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[300], exports.ButtonVariant.solid, exports.ButtonVariant.normal, foundation.tailWindColors.gray[200], exports.ButtonSize.large, foundation.theme.typography.title1.fontSize, foundation.theme.typography.title1.lineHeight, foundation.theme.typography.title1.fontWeight, foundation.theme.spacingSize.s, foundation.theme.spacing * 6, exports.ButtonSize.medium, foundation.theme.typography.title2.fontSize, foundation.theme.typography.title2.lineHeight, foundation.theme.typography.title2.fontWeight, foundation.theme.spacingSize.m, exports.ButtonSize.small, foundation.theme.typography.tag.fontSize, foundation.theme.typography.tag.lineHeight, foundation.theme.typography.tag.fontWeight, foundation.theme.spacingSize.xs);
/**
 * Primary UI component for user interaction
 */
var Button = function (_a) {
    var variant = _a.variant, disabled = _a.disabled, block = _a.block, color = _a.color, size = _a.size, children = _a.children, onClick = _a.onClick, props = __rest(_a, ["variant", "disabled", "block", "color", "size", "children", "onClick"]);
    var display = block ? "btn-fulled" : "";
    var activate = disabled ? "btn-disabled" : "btn-color-" + color;
    return (jsx("button", __assign({ type: "button", className: [
            "btn-variant-" + variant,
            activate,
            display,
            "btn-size-" + size,
        ].join(" "), css: [btnStyle] }, props, { onClick: onClick }, { children: children }), void 0));
};
var templateObject_1$h;

exports.IconButtonSize = void 0;
(function (IconButtonSize) {
    IconButtonSize["small"] = "small";
    IconButtonSize["medium"] = "medium";
    IconButtonSize["large"] = "large";
})(exports.IconButtonSize || (exports.IconButtonSize = {}));
var iconButtonStyle = css(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["\n  border-radius: 50%;\n  &:active,\n  &:not([disabled]):not(.btn-disabled):not([tabindex=\"-1\"]):active {\n    border-color: ", ";\n  }\n  ,\n  &:hover {\n    background-color: ", ";\n  }\n  &.iconBtn-size-", " {\n    padding: ", "px;\n    margin: -", "px;\n    & > svg {\n      width: ", ";\n      height: ", ";\n    }\n  }\n  &.iconBtn-size-", " {\n    padding: ", "px;\n    margin: -", "px;\n    & > svg {\n      width: ", ";\n      height: ", ";\n    }\n  }\n  &.iconBtn-size-", " {\n    padding: ", "px;\n    margin: -", "px;\n    & > svg {\n      width: ", ";\n      height: ", ";\n    }\n  }\n"], ["\n  border-radius: 50%;\n  &:active,\n  &:not([disabled]):not(.btn-disabled):not([tabindex=\"-1\"]):active {\n    border-color: ", ";\n  }\n  ,\n  &:hover {\n    background-color: ", ";\n  }\n  &.iconBtn-size-", " {\n    padding: ", "px;\n    margin: -", "px;\n    & > svg {\n      width: ", ";\n      height: ", ";\n    }\n  }\n  &.iconBtn-size-", " {\n    padding: ", "px;\n    margin: -", "px;\n    & > svg {\n      width: ", ";\n      height: ", ";\n    }\n  }\n  &.iconBtn-size-", " {\n    padding: ", "px;\n    margin: -", "px;\n    & > svg {\n      width: ", ";\n      height: ", ";\n    }\n  }\n"])), foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[50], exports.IconButtonSize.small, foundation.theme.spacingSize.xs, foundation.theme.spacingSize.xs, foundation.theme.typography.tag.lineHeight, foundation.theme.typography.tag.lineHeight, exports.IconButtonSize.medium, foundation.theme.spacingSize.xs + 4, foundation.theme.spacingSize.xs + 4, foundation.theme.typography.title2.lineHeight, foundation.theme.typography.title2.lineHeight, exports.IconButtonSize.large, foundation.theme.spacingSize.s, foundation.theme.spacingSize.s, foundation.theme.typography.title1.lineHeight, foundation.theme.typography.title1.lineHeight);
var IconButton = function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? exports.IconButtonSize.medium : _b, onClick = _a.onClick, props = __rest(_a, ["children", "size", "onClick"]);
    return (jsx("button", __assign({ onClick: onClick, className: ["iconBtn-size-" + size].join(" "), css: iconButtonStyle, type: "button" }, props, { children: children }), void 0));
};
var templateObject_1$g;

exports.ButtonLoaderSize = void 0;
(function (ButtonLoaderSize) {
    ButtonLoaderSize["small"] = "small";
    ButtonLoaderSize["medium"] = "medium";
    ButtonLoaderSize["large"] = "large";
})(exports.ButtonLoaderSize || (exports.ButtonLoaderSize = {}));
var LdsEllipsis1 = keyframes(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n    0% {\n        transform: scale(0);\n    }\n    100% {\n        transform: scale(1);\n    }\n"], ["\n    0% {\n        transform: scale(0);\n    }\n    100% {\n        transform: scale(1);\n    }\n"])));
var LdsEllipsis2 = keyframes(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n    0% {\n        transform: translate(0, 0);\n    }\n    100% {\n        transform: translate(12px, 0);\n    }\n"], ["\n    0% {\n        transform: translate(0, 0);\n    }\n    100% {\n        transform: translate(12px, 0);\n    }\n"])));
var LdsEllipsis3 = keyframes(templateObject_3$6 || (templateObject_3$6 = __makeTemplateObject(["\n    0% {\n        transform: scale(1);\n    }\n    100% {\n        transform: scale(0);\n    }\n"], ["\n    0% {\n        transform: scale(1);\n    }\n    100% {\n        transform: scale(0);\n    }\n"])));
var CircularAnimate$1 = css(templateObject_4$4 || (templateObject_4$4 = __makeTemplateObject(["\n    display: block;\n    margin: 0 auto;\n    position: relative;\n    width: 36px;\n    &.btn-loader-small {\n        height: 18px;\n        &>div {\n            top: 6px;\n            width: 6px;\n            height: 6px;\n        }\n    }\n    &.btn-loader-medium {\n        height: 20px;\n        &>div {\n            top: 7px;\n            width: 6px;\n            height: 6px;\n        }\n    }\n    &.btn-loader-large {\n        height: 24px;\n        &>div {\n            top: 9px;\n            width: 6px;\n            height: 6px;\n        }\n    }\n    &>div {\n        position: absolute;\n        border-radius: 50%;\n        background: #000;\n        animation-timing-function: cubic-bezier(0, 1, 1, 0);\n        &:nth-child(1) {\n            left: 4px;\n            animation: ", " 0.6s infinite;\n        }\n        &:nth-child(2) {\n            left: 4px;\n            animation: ", " 0.6s infinite;\n        }\n        &:nth-child(3) {\n            left: 16px;\n            animation: ", " 0.6s infinite;\n        }\n        &:nth-child(4) {\n            left: 28px;\n            animation: ", " 0.6s infinite;\n        }\n    }\n"], ["\n    display: block;\n    margin: 0 auto;\n    position: relative;\n    width: 36px;\n    &.btn-loader-small {\n        height: 18px;\n        &>div {\n            top: 6px;\n            width: 6px;\n            height: 6px;\n        }\n    }\n    &.btn-loader-medium {\n        height: 20px;\n        &>div {\n            top: 7px;\n            width: 6px;\n            height: 6px;\n        }\n    }\n    &.btn-loader-large {\n        height: 24px;\n        &>div {\n            top: 9px;\n            width: 6px;\n            height: 6px;\n        }\n    }\n    &>div {\n        position: absolute;\n        border-radius: 50%;\n        background: #000;\n        animation-timing-function: cubic-bezier(0, 1, 1, 0);\n        &:nth-child(1) {\n            left: 4px;\n            animation: ", " 0.6s infinite;\n        }\n        &:nth-child(2) {\n            left: 4px;\n            animation: ", " 0.6s infinite;\n        }\n        &:nth-child(3) {\n            left: 16px;\n            animation: ", " 0.6s infinite;\n        }\n        &:nth-child(4) {\n            left: 28px;\n            animation: ", " 0.6s infinite;\n        }\n    }\n"])), LdsEllipsis1, LdsEllipsis2, LdsEllipsis2, LdsEllipsis3);
var ButtonLoader = function (_a) {
    var _b = _a.color, color = _b === void 0 ? '#fff' : _b, _c = _a.size, size = _c === void 0 ? exports.ButtonLoaderSize.medium : _c, props = __rest(_a, ["color", "size"]);
    return (jsxs("div", __assign({ css: CircularAnimate$1, className: "btn-loader-" + size }, props, { children: [jsx("div", { style: { backgroundColor: color } }, void 0), jsx("div", { style: { backgroundColor: color } }, void 0), jsx("div", { style: { backgroundColor: color } }, void 0), jsx("div", { style: { backgroundColor: color } }, void 0)] }), void 0));
};
var templateObject_1$f, templateObject_2$9, templateObject_3$6, templateObject_4$4;

var LdsRing = keyframes(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n"], ["\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n"])));
var CircularAnimate = css(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n    display: inline-block;\n    position: relative;\n    width: 44px;\n    height: 44px;\n    &>div {\n        box-sizing: border-box;\n        display: block;\n        position: absolute;\n        width: 44px;\n        height: 44px;\n        margin: 4px;\n        border: 4px solid #fff;\n        border-radius: 50%;\n        animation: ", " 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n        border-color: #fff transparent transparent transparent;\n        &:nth-child(1) {\n            animation-delay: -0.45s;\n        }\n        &:nth-child(2) {\n            animation-delay: -0.3s;\n        }\n        &:nth-child(3) {\n            animation-delay: -0.15s;\n        }\n    }\n"], ["\n    display: inline-block;\n    position: relative;\n    width: 44px;\n    height: 44px;\n    &>div {\n        box-sizing: border-box;\n        display: block;\n        position: absolute;\n        width: 44px;\n        height: 44px;\n        margin: 4px;\n        border: 4px solid #fff;\n        border-radius: 50%;\n        animation: ", " 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n        border-color: #fff transparent transparent transparent;\n        &:nth-child(1) {\n            animation-delay: -0.45s;\n        }\n        &:nth-child(2) {\n            animation-delay: -0.3s;\n        }\n        &:nth-child(3) {\n            animation-delay: -0.15s;\n        }\n    }\n"])), LdsRing);
var Circular = function (_a) {
    var props = __rest(_a, []);
    return (jsxs("div", __assign({ css: CircularAnimate }, props, { children: [jsx("div", {}, void 0), jsx("div", {}, void 0), jsx("div", {}, void 0)] }), void 0));
};
var templateObject_1$e, templateObject_2$8;

var List = function (_a) {
    var children = _a.children, spacing = _a.spacing, props = __rest(_a, ["children", "spacing"]);
    return (jsx("div", __assign({ className: "flex flex-col space-y-" + spacing + "" }, props, { children: children }), void 0));
};

var ImageIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsxs("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [jsx("path", { d: "M0 0h24v24H0z", fill: "none" }, void 0), jsx("path", { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" }, void 0)] }), void 0));
};

var ListStyle = css(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  padding: ", "px;\n  cursor: pointer;\n  text-align: left;\n  border-radius: ", "px;\n  min-height: 48px;\n  &.listButton-selected-true {\n    pointer-events: none;\n    background-color: ", ";\n    color: ", ";\n    & svg {\n      fill: ", ";\n      & > path {\n        fill: ", ";\n      }\n    }\n  }\n  &:active,\n  &:not([disabled]):not(.btn-disabled):not([tabindex=\"-1\"]):active {\n    border-color: ", ";\n  }\n  ,\n  &:hover {\n    background-color: ", ";\n  }\n  & > * {\n    pointer-events: none;\n  }\n  & .listImage {\n    border-radius: 50%;\n    background-color: ", ";\n    overflow: hidden;\n    position: relative;\n    & > img {\n      position: absolute;\n      max-width: 100%;\n      height: auto;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    & > svg {\n      fill: ", ";\n      position: absolute;\n      font-size: 16px;\n      width: 16px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n"], ["\n  padding: ", "px;\n  cursor: pointer;\n  text-align: left;\n  border-radius: ", "px;\n  min-height: 48px;\n  &.listButton-selected-true {\n    pointer-events: none;\n    background-color: ", ";\n    color: ", ";\n    & svg {\n      fill: ", ";\n      & > path {\n        fill: ", ";\n      }\n    }\n  }\n  &:active,\n  &:not([disabled]):not(.btn-disabled):not([tabindex=\"-1\"]):active {\n    border-color: ", ";\n  }\n  ,\n  &:hover {\n    background-color: ", ";\n  }\n  & > * {\n    pointer-events: none;\n  }\n  & .listImage {\n    border-radius: 50%;\n    background-color: ", ";\n    overflow: hidden;\n    position: relative;\n    & > img {\n      position: absolute;\n      max-width: 100%;\n      height: auto;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    & > svg {\n      fill: ", ";\n      position: absolute;\n      font-size: 16px;\n      width: 16px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n"])), foundation.theme.spacingSize.xs, foundation.theme.spacingSize.xs, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.theme.colors.primary.light, foundation.theme.colors.primary.lightest, foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[400]);
var truncateTypo$3 = css(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"], ["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"])));
var ListButton = function (_a) {
    var children = _a.children, value = _a.value, imgSrc = _a.imgSrc, withImage = _a.withImage, onClick = _a.onClick, selected = _a.selected, props = __rest(_a, ["children", "value", "imgSrc", "withImage", "onClick", "selected"]);
    return (jsxs("button", __assign({ type: "button", css: ListStyle, className: [
            "flex",
            "items-center",
            "space-x-2",
            "listButton-selected-" + selected,
        ].join(" "), value: value, onClick: onClick }, props, { children: [withImage && (jsx("div", __assign({ className: "flex-none" }, { children: jsx("div", __assign({ className: "listImage w-9 h-9" }, { children: imgSrc ? jsx("img", { src: imgSrc }, void 0) : jsx(ImageIcon, {}, void 0) }), void 0) }), void 0)), jsx("div", __assign({ css: truncateTypo$3, className: "truncate w-full" }, { children: children }), void 0)] }), void 0));
};
var templateObject_1$d, templateObject_2$7;

var CloseIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsxs("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }, void 0), jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" }, void 0)] }), void 0));
};

exports.TypoVariant = void 0;
(function (TypoVariant) {
    TypoVariant["display"] = "display";
    TypoVariant["h1"] = "h1";
    TypoVariant["h2"] = "h2";
    TypoVariant["h3"] = "h3";
    TypoVariant["h4"] = "h4";
    TypoVariant["title1"] = "title1";
    TypoVariant["title2"] = "title2";
    TypoVariant["title3"] = "title3";
    TypoVariant["title4"] = "title4";
    TypoVariant["title5"] = "title5";
    TypoVariant["title6"] = "title6";
    TypoVariant["body1"] = "body1";
    TypoVariant["body2"] = "body2";
    TypoVariant["body3"] = "body3";
    TypoVariant["body4"] = "body4";
    TypoVariant["caption1"] = "caption1";
    TypoVariant["caption2"] = "caption2";
    TypoVariant["caption3"] = "caption3";
    TypoVariant["caption4"] = "caption4";
    TypoVariant["label"] = "label";
    TypoVariant["tag"] = "tag";
})(exports.TypoVariant || (exports.TypoVariant = {}));
var typographyStyle = function (variant, color) { return css(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  font-family: ", ";\n  &.typography-", " {\n    ", "\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    ", "\n  }\n"], ["\n  font-family: ", ";\n  &.typography-", " {\n    ", "\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    ", "\n  }\n"])), foundation.theme.typography.fontFamily.default, exports.TypoVariant[variant], variant === "tag" || variant === "label" ? "display: inherit;" : "", foundation.theme.typography[variant].fontSize, foundation.theme.typography[variant]
    .lineHeight, foundation.theme.typography[variant]
    .fontWeight, color && "color:" + color + ";"); };
var Typography = function (_a) {
    var variant = _a.variant, color = _a.color, children = _a.children, props = __rest(_a, ["variant", "color", "children"]);
    return (jsxs(Fragment, { children: [variant === exports.TypoVariant.display && (jsx("div", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant === exports.TypoVariant.h1 && (jsx("h1", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant === exports.TypoVariant.h2 && (jsx("h2", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant === exports.TypoVariant.h3 && (jsx("h3", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant === exports.TypoVariant.h4 && (jsx("h4", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant && variant.match(/title/g) && (jsx("div", __assign({ css: [
                    typographyStyle(variant, color),
                    css(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ], className: "typography-" + variant }, props, { children: children }), void 0)), variant && variant.match(/body/g) && (jsx("p", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant && variant.match(/caption/g) && (jsx("caption", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant === exports.TypoVariant.tag && (jsx("span", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0)), variant === exports.TypoVariant.label && (jsx("span", __assign({ className: "typography-" + variant, css: [
                    typographyStyle(variant, color),
                    css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n              color: ", ";\n            "], ["\n              color: ", ";\n            "])), color),
                ] }, props, { children: children }), void 0))] }, void 0));
};
var templateObject_1$c, templateObject_2$6, templateObject_3$5, templateObject_4$3, templateObject_5$1, templateObject_6$1, templateObject_7$1, templateObject_8$1, templateObject_9, templateObject_10, templateObject_11;

var modalHeaderStyle = css(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  padding: ", "px;\n"], ["\n  padding: ", "px;\n"])), foundation.theme.spacingSize.xxs * 4);
css(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n  padding: ", "px;\n  margin: -", "px;\n"], ["\n  padding: ", "px;\n  margin: -", "px;\n"])), foundation.theme.spacingSize.xxs * 4, foundation.theme.spacingSize.xxs * 4);
var truncateTypo$2 = css(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"], ["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"])));
var ModalHeader = function (_a) {
    var title = _a.title, _b = _a.showClose, showClose = _b === void 0 ? true : _b, onClose = _a.onClose, props = __rest(_a, ["title", "showClose", "onClose"]);
    return (jsxs("div", __assign({ css: modalHeaderStyle }, props, { className: "modal-header flex space-x-4" }, { children: [jsx("div", __assign({ css: truncateTypo$2, className: "flex-grow truncate items-center flex" }, { children: jsx(Typography, __assign({ variant: "h4", color: foundation.tailWindColors.gray[900] }, { children: title }), void 0) }), void 0), showClose === true ? (jsx("div", __assign({ className: "flex-none items-center flex" }, { children: jsx(IconButton, __assign({ onClick: onClose, size: exports.IconButtonSize.large }, { children: jsx(CloseIcon, {}, void 0) }), void 0) }), void 0)) : null] }), void 0));
};
var templateObject_1$b, templateObject_2$5, templateObject_3$4;

var modalContentStyle = css(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  overflow: auto;\n  padding: 0px ", "px\n    calc(\n      constant(safe-area-inset-bottom) +\n        ", "px\n    )\n    ", "px;\n  padding: 0px ", "px\n    calc(\n      env(safe-area-inset-bottom) + ", "px\n    )\n    ", "px;\n  max-height: 500px;\n  @media (min-width: ", ") {\n    padding: 0px ", "px\n      ", "px\n      ", "px;\n  }\n"], ["\n  overflow: auto;\n  padding: 0px ", "px\n    calc(\n      constant(safe-area-inset-bottom) +\n        ", "px\n    )\n    ", "px;\n  padding: 0px ", "px\n    calc(\n      env(safe-area-inset-bottom) + ", "px\n    )\n    ", "px;\n  max-height: 500px;\n  @media (min-width: ", ") {\n    padding: 0px ", "px\n      ", "px\n      ", "px;\n  }\n"])), foundation.theme.spacingSize.xxs * 4, foundation.theme.spacingSize.xxs * 8, foundation.theme.spacingSize.xxs * 4, foundation.theme.spacingSize.xxs * 4, foundation.theme.spacingSize.xxs * 8, foundation.theme.spacingSize.xxs * 4, foundation.theme.screens.sm, foundation.theme.spacingSize.xxs * 4, foundation.theme.spacingSize.xxs * 4, foundation.theme.spacingSize.xxs * 4);
var ModalContent = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (jsx("div", __assign({ css: modalContentStyle }, props, { children: children }), void 0));
};
var templateObject_1$a;

var BackDropStyle = css(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1200;\n    display: flex;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5);\n    &>* {\n        \n    }\n"], ["\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1200;\n    display: flex;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5);\n    &>* {\n        \n    }\n"])));
var BackDrop = function (_a) {
    var children = _a.children, onClick = _a.onClick, props = __rest(_a, ["children", "onClick"]);
    return (jsx("div", __assign({ css: BackDropStyle, className: "modal-backdrop", onClick: onClick }, props, { children: children }), void 0));
};
var templateObject_1$9;

exports.ModalSize = void 0;
(function (ModalSize) {
    ModalSize["small"] = "small";
    ModalSize["medium"] = "medium";
    ModalSize["large"] = "large";
})(exports.ModalSize || (exports.ModalSize = {}));
var modalStyle = css(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 1300;\n  inset: 0px;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  & > .modal-backdrop {\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: -1;\n    display: flex;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5);\n  }\n  & > .modal-container {\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n    height: 100%;\n    outline: 0;\n    pointer-events: none;\n    & > .modal-paper {\n      pointer-events: all;\n      display: flex;\n      width: 100%;\n      max-height: 100%;\n      margin: 0;\n      max-width: 100%;\n      flex-direction: column;\n      border-radius: ", "px\n        ", "px 0 0;\n      background-color: ", ";\n      transition: transform;\n      overflow: hidden;\n      position: relative;\n      & > .modal-header {\n        padding: ", "px;\n        width: 100%;\n        background-color: #fff;\n      }\n      & > .modal-fixed-contents {\n        padding: ", "px\n          ", "px;\n      }\n      @media (min-width: ", ") {\n        max-height: calc(100% - 64px);\n        overflow: auto;\n        border-radius: ", "px;\n        margin: ", "px;\n\n        &.modal-size-", " {\n          max-width: 414px;\n        }\n        &.modal-size-", " {\n          max-width: 600px;\n        }\n        &.modal-size-", " {\n          max-width: 1200px;\n        }\n      }\n    }\n    @media (min-width: ", ") {\n      align-items: center;\n    }\n  }\n"], ["\n  position: fixed;\n  z-index: 1300;\n  inset: 0px;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  & > .modal-backdrop {\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: -1;\n    display: flex;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5);\n  }\n  & > .modal-container {\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n    height: 100%;\n    outline: 0;\n    pointer-events: none;\n    & > .modal-paper {\n      pointer-events: all;\n      display: flex;\n      width: 100%;\n      max-height: 100%;\n      margin: 0;\n      max-width: 100%;\n      flex-direction: column;\n      border-radius: ", "px\n        ", "px 0 0;\n      background-color: ", ";\n      transition: transform;\n      overflow: hidden;\n      position: relative;\n      & > .modal-header {\n        padding: ", "px;\n        width: 100%;\n        background-color: #fff;\n      }\n      & > .modal-fixed-contents {\n        padding: ", "px\n          ", "px;\n      }\n      @media (min-width: ", ") {\n        max-height: calc(100% - 64px);\n        overflow: auto;\n        border-radius: ", "px;\n        margin: ", "px;\n\n        &.modal-size-", " {\n          max-width: 414px;\n        }\n        &.modal-size-", " {\n          max-width: 600px;\n        }\n        &.modal-size-", " {\n          max-width: 1200px;\n        }\n      }\n    }\n    @media (min-width: ", ") {\n      align-items: center;\n    }\n  }\n"])), foundation.theme.spacingSize.s, foundation.theme.spacingSize.s, foundation.tailWindColors.white, foundation.theme.spacingSize.s, foundation.theme.spacingSize.xs, foundation.theme.spacingSize.s, foundation.theme.screens.sm, foundation.theme.spacingSize.s, foundation.theme.spacingSize.m, exports.ModalSize.small, exports.ModalSize.medium, exports.ModalSize.large, foundation.theme.screens.sm);
var fadeIn = keyframes(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n"], ["\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n"])));
var fadeOut = keyframes(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n    from {\n        opacity: 1;\n    }\n    to {\n        opacity: 0;\n    }\n"], ["\n    from {\n        opacity: 1;\n    }\n    to {\n        opacity: 0;\n    }\n"])));
var slideIn = keyframes(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n    from {\n        transform: translateY(100%);\n    }\n    to {\n        transform: translateY(0);\n    }\n"], ["\n    from {\n        transform: translateY(100%);\n    }\n    to {\n        transform: translateY(0);\n    }\n"])));
var slideOut = keyframes(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    from {\n        transform: translateY(0);\n    }\n    to {\n        transform: translateY(100%);\n    }\n"], ["\n    from {\n        transform: translateY(0);\n    }\n    to {\n        transform: translateY(100%);\n    }\n"])));
var openDialog = css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  & > .modal-backdrop {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n  }\n  & .modal-paper {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n    @media (min-width: ", ") {\n      animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n  }\n"], ["\n  & > .modal-backdrop {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n  }\n  & .modal-paper {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n    @media (min-width: ", ") {\n      animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n  }\n"])), fadeIn, slideIn, foundation.theme.screens.sm, fadeIn);
var closeDialog = css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  & > .modal-backdrop {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n  }\n  & .modal-paper {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n    @media (min-width: ", ") {\n      animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n  }\n"], ["\n  & > .modal-backdrop {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n  }\n  & .modal-paper {\n    animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    animation-fill-mode: forwards;\n    @media (min-width: ", ") {\n      animation: ", " 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    }\n  }\n"])), fadeOut, slideOut, foundation.theme.screens.sm, fadeOut);
var Modal = function (_a) {
    var title = _a.title, size = _a.size, children = _a.children, fixChildren = _a.fixChildren, open = _a.open, _b = _a.canClose, canClose = _b === void 0 ? true : _b, onClose = _a.onClose, props = __rest(_a, ["title", "size", "children", "fixChildren", "open", "canClose", "onClose"]);
    var _c = React.useState(true), openTransition = _c[0], setOpenTransition = _c[1];
    var handleClose = function () {
        if (canClose === false) {
            return;
        }
        setOpenTransition(false);
        setTimeout(function () {
            onClose();
            setOpenTransition(true);
        }, 150); // 우선 줄여서 닫기 시 살짝 보이는거 없앰 콜백으로 컨트롤 가능하도록 조정해야할듯
    };
    return (jsx(Fragment, { children: open && (jsxs("div", __assign({ css: [modalStyle, openTransition ? openDialog : closeDialog] }, props, { children: [jsx(BackDrop, { onClick: handleClose }, void 0), jsx("div", __assign({ className: "modal-container" }, { children: jsxs("div", __assign({ className: ["modal-paper", "modal-size-" + size].join(" ") }, { children: [jsx(ModalHeader, { title: title, showClose: canClose, onClose: handleClose }, void 0), fixChildren !== undefined && (jsx("div", __assign({ className: "modal-fixed-contents" }, { children: fixChildren }), void 0)), jsx(ModalContent, { children: children }, void 0)] }), void 0) }), void 0), jsx(Global, { styles: css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n              body {\n                overflow: hidden;\n              }\n            "], ["\n              body {\n                overflow: hidden;\n              }\n            "]))) }, void 0)] }), void 0)) }, void 0));
};
var templateObject_1$8, templateObject_2$4, templateObject_3$3, templateObject_4$2, templateObject_5, templateObject_6, templateObject_7, templateObject_8;

var KeyboardArrowDownIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsxs("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }, void 0), jsx("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }, void 0)] }), void 0));
};

var selectStyle = css(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  font-family: ", ";\n  border: 1px solid ", ";\n  box-sizing: border-box;\n  border-radius: ", "px;\n  padding: ", "px;\n  cursor: pointer;\n  &.select-error {\n    border-color: ", ";\n    color: ", "!important;\n    background-color: ", "!important;\n    svg {\n      fill: ", "!important;\n    }\n  }\n  &:focus,\n  &.select-focus {\n    border: 2px solid ", ";\n    padding: ", "px;\n  }\n  & .listImage {\n    border-radius: 50%;\n    background-color: ", ";\n    overflow: hidden;\n    position: relative;\n    & > img {\n      position: absolute;\n      width: 100%;\n      height: auto;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    & > svg {\n      fill: ", ";\n      position: absolute;\n      font-size: 16px;\n      width: 16px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n  & .listImage > img {\n  }\n  & > input {\n    display: none;\n    opacity: 0;\n  }\n"], ["\n  font-family: ", ";\n  border: 1px solid ", ";\n  box-sizing: border-box;\n  border-radius: ", "px;\n  padding: ", "px;\n  cursor: pointer;\n  &.select-error {\n    border-color: ", ";\n    color: ", "!important;\n    background-color: ", "!important;\n    svg {\n      fill: ", "!important;\n    }\n  }\n  &:focus,\n  &.select-focus {\n    border: 2px solid ", ";\n    padding: ", "px;\n  }\n  & .listImage {\n    border-radius: 50%;\n    background-color: ", ";\n    overflow: hidden;\n    position: relative;\n    & > img {\n      position: absolute;\n      width: 100%;\n      height: auto;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    & > svg {\n      fill: ", ";\n      position: absolute;\n      font-size: 16px;\n      width: 16px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n  & .listImage > img {\n  }\n  & > input {\n    display: none;\n    opacity: 0;\n  }\n"])), foundation.theme.typography.fontFamily, foundation.theme.colors.primary.light, foundation.theme.spacingSize.xs, foundation.theme.spacingSize.s, foundation.tailWindColors.red[500], foundation.tailWindColors.red[500], foundation.tailWindColors.red[50], foundation.tailWindColors.red[500], foundation.theme.colors.primary.main, foundation.theme.spacingSize.s - 1, foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[400]);
css(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  position: fixed;\n  z-index: 1300;\n  inset: 0px;\n  & > .modal-backdrop {\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: flex;\n    z-index: -1;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5);\n  }\n  & > .modal-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    outline: 0;\n    & > .modal-paper {\n      display: flex;\n      max-width: 414px;\n      width: 100%;\n      max-height: calc(100% - 64px);\n      flex-direction: column;\n      background-color: ", ";\n      margin: ", "px;\n      border-radius: ", "px;\n      & > .modal-header {\n        padding: ", "px;\n      }\n      & > .modal-content {\n        padding: ", "px;\n      }\n    }\n  }\n"], ["\n  position: fixed;\n  z-index: 1300;\n  inset: 0px;\n  & > .modal-backdrop {\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    display: flex;\n    z-index: -1;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    background-color: rgba(0, 0, 0, 0.5);\n  }\n  & > .modal-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    outline: 0;\n    & > .modal-paper {\n      display: flex;\n      max-width: 414px;\n      width: 100%;\n      max-height: calc(100% - 64px);\n      flex-direction: column;\n      background-color: ", ";\n      margin: ", "px;\n      border-radius: ", "px;\n      & > .modal-header {\n        padding: ", "px;\n      }\n      & > .modal-content {\n        padding: ", "px;\n      }\n    }\n  }\n"])), foundation.tailWindColors.white, foundation.theme.spacingSize.m, foundation.theme.spacingSize.s, foundation.theme.spacingSize.s, foundation.theme.spacingSize.s);
var truncateTypo$1 = css(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"], ["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"])));
var ErrorContainer = css(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n  margin-top: ", "px;\n"], ["\n  margin-top: ", "px;\n"])), foundation.theme.spacingSize.xxs);
var Select = function (_a) {
    var id = _a.id, title = _a.title, withImage = _a.withImage, items = _a.items, _b = _a.selectedIndex, selectedIndex = _b === void 0 ? 0 : _b, error = _a.error, errorText = _a.errorText, _c = _a.searchText, searchText = _c === void 0 ? "" : _c, modalChildren = _a.modalChildren, onSelect = _a.onSelect, props = __rest(_a, ["id", "title", "withImage", "items", "selectedIndex", "error", "errorText", "searchText", "modalChildren", "onSelect"]);
    var errorClass = error && "select-error";
    var _d = React.useState(false), open = _d[0], setOpen = _d[1];
    var _e = React.useState([]), filteredItems = _e[0], setFilteredItems = _e[1];
    var _f = React.useState({
        value: (items[0] || {}).value || "",
        label: (items[0] || {}).label || "",
        subLabel: (items[0] || {}).subLabel || "",
        img: (items[0] || {}).img || "",
    }), selectValue = _f[0], setSelectValue = _f[1];
    // const handleClick = (value: string, label: string, subLabel: string, img: string) => {
    //   setSelectValue({ ...selectValue, value: value, label: label, subLabel: subLabel, img: img });
    // }
    var handleClick = function (index) {
        // if (items.length === 0) {
        //   return;
        // }
        // const selectedItem = items[index];
        // if (selectedItem === undefined) {
        //   return;
        // }
        // console.log('selectedItem', selectedItem);
        // setSelectValue({ ...selectValue, value: selectedItem.value, label: selectedItem.label, subLabel: selectedItem.subLabel, img: selectedItem.img });
        if (onSelect) {
            var item = filteredItems[index];
            for (var i = 0; i < items.length; i++) {
                if (items[i].value === item.value) {
                    onSelect(i);
                    break;
                }
            }
        }
    };
    React.useEffect(function () {
        // handleClick(selectedIndex);
        if (items.length === 0) {
            return;
        }
        var selectedItem = items[selectedIndex];
        if (selectedItem === undefined) {
            return;
        }
        console.log("selectedItem", selectedItem);
        setSelectValue(__assign(__assign({}, selectValue), { value: selectedItem.value, label: selectedItem.label, subLabel: selectedItem.subLabel, img: selectedItem.img }));
    }, [selectedIndex, items]);
    React.useEffect(function () {
        // setSelectedCountryIndex(0);
        // setSelectedDistrictIndex(0);
        if (searchText === "") {
            setFilteredItems(items);
            return;
        }
        var searchLabel = searchText.toLowerCase();
        setFilteredItems(items.filter(function (item) {
            return item.label.toLowerCase().indexOf(searchLabel) > -1;
        }));
    }, [open, searchText]);
    return (jsxs(Fragment, { children: [jsxs("div", __assign({ className: ["flex space-x-1", "items-center", errorClass].join(" "), css: selectStyle }, props, { onClick: function () { return setOpen(true); } }, { children: [withImage && (jsx("div", __assign({ className: "flex-none" }, { children: jsx("div", __assign({ className: "listImage w-6 h-6" }, { children: selectValue.img ? jsx("img", { src: selectValue.img }, void 0) : jsx(ImageIcon, {}, void 0) }), void 0) }), void 0)), jsxs("div", __assign({ css: truncateTypo$1, className: "truncate flex-grow" }, { children: [selectValue.label && (jsx(Typography, __assign({ variant: "title2", color: !error
                                    ? foundation.tailWindColors.gray[900]
                                    : foundation.tailWindColors.red[500] }, { children: selectValue.label }), void 0)), selectValue.subLabel && (jsx(Typography, __assign({ variant: "label", color: !error
                                    ? foundation.tailWindColors.gray[900]
                                    : foundation.tailWindColors.red[500] }, { children: selectValue.subLabel }), void 0))] }), void 0), jsx("div", __assign({ className: "flex-none w-6 h-6" }, { children: jsx(KeyboardArrowDownIcon, {}, void 0) }), void 0), jsx("input", { id: id, name: id, type: "text", defaultValue: selectValue.value || "" }, void 0)] }), void 0), error && (errorText !== "" || errorText) && (jsx("div", __assign({ css: ErrorContainer }, { children: jsx(Typography, __assign({ variant: "label", color: foundation.tailWindColors.red[500] }, { children: errorText }), void 0) }), void 0)), jsx(Modal, __assign({ title: title, size: "small", open: open, onClose: function () { return setOpen(false); }, fixChildren: modalChildren !== undefined ? modalChildren : undefined }, { children: jsx(List, __assign({ spacing: 2 }, { children: filteredItems.length > 0 ? (filteredItems.map(function (item, index) { return (jsxs(ListButton, __assign({ withImage: withImage, imgSrc: withImage && item.img, value: item.value, onClick: function () {
                            // handleClick(item.value, item.label, item.subLabel, item.img);
                            handleClick(index);
                            setOpen(false);
                        } }, { children: [item.label && (jsx(Typography, __assign({ variant: "title2", color: foundation.tailWindColors.gray[900] }, { children: item.label }), void 0)), item.subLabel && (jsx(Typography, __assign({ variant: "label", color: foundation.tailWindColors.gray[500] }, { children: item.subLabel }), void 0))] }), "option_" + id + "_" + index)); })) : (jsx(Typography, __assign({ variant: "body2", color: foundation.tailWindColors.gray[900] }, { children: "You don\u2019t have any activity history yet." }), void 0)) }), void 0) }), void 0)] }, void 0));
};
var templateObject_1$7, templateObject_2$3, templateObject_3$2, templateObject_4$1;

var SearchIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { d: "M21.75 20.6895L16.086 15.0255C17.4471 13.3915 18.1258 11.2956 17.981 9.17393C17.8362 7.05223 16.8789 5.06805 15.3084 3.63414C13.7379 2.20023 11.6751 1.42701 9.54896 1.47532C7.42288 1.52363 5.39726 2.38975 3.8935 3.89351C2.38974 5.39727 1.52362 7.42288 1.47531 9.54897C1.427 11.6751 2.20023 13.7379 3.63413 15.3084C5.06804 16.8789 7.05222 17.8362 9.17392 17.981C11.2956 18.1258 13.3915 17.4471 15.0255 16.086L20.6895 21.75L21.75 20.6895ZM3 9.75C3 8.41498 3.39588 7.10994 4.13758 5.9999C4.87927 4.88987 5.93348 4.02471 7.16688 3.51382C8.40028 3.00292 9.75748 2.86925 11.0669 3.1297C12.3762 3.39015 13.579 4.03303 14.523 4.97703C15.467 5.92104 16.1098 7.12377 16.3703 8.43314C16.6307 9.74251 16.4971 11.0997 15.9862 12.3331C15.4753 13.5665 14.6101 14.6207 13.5001 15.3624C12.3901 16.1041 11.085 16.5 9.74999 16.5C7.96039 16.498 6.24466 15.7862 4.97922 14.5208C3.71378 13.2553 3.00198 11.5396 3 9.75V9.75Z", fill: "black" }, void 0) }), void 0));
};

exports.inputVariant = void 0;
(function (inputVariant) {
    inputVariant["standard"] = "standard";
    inputVariant["filled"] = "filled";
    inputVariant["outlined"] = "outlined";
})(exports.inputVariant || (exports.inputVariant = {}));
exports.inputType = void 0;
(function (inputType) {
    inputType["text"] = "text";
    inputType["email"] = "email";
    inputType["password"] = "password";
    inputType["number"] = "number";
    inputType["search"] = "search";
})(exports.inputType || (exports.inputType = {}));
var TextFieldContainer = css(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  font-family: ", ";\n  & > label {\n    display: block;\n    margin-bottom: ", "px;\n  }\n"], ["\n  font-family: ", ";\n  & > label {\n    display: block;\n    margin-bottom: ", "px;\n  }\n"])), foundation.theme.typography.fontFamily.default, foundation.theme.spacingSize.xxs);
var SignContainer = css(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  right: ", "px;\n  transform: translateY(-50%);\n"], ["\n  position: absolute;\n  top: 50%;\n  right: ", "px;\n  transform: translateY(-50%);\n"])), foundation.theme.spacingSize.s);
var TextFieldStyle = css(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  position: relative;\n  margin-bottom: ", "px;\n  & > input,\n  & > .input-ce {\n    display: block;\n    width: 100%;\n    padding: ", "px\n      ", "px;\n    border-radius: ", "px;\n    outline: none;\n    box-sizing: border-box;\n    font-size: ", ";\n    font-weight: ", ";\n    color: ", ";\n    background-color: ", ";\n    -webkit-appearance: none;\n    &::placeholder {\n      color: ", ";\n      font-weight: ", ";\n    }\n    &:disabled,\n    &:disabled::placeholder {\n      color: ", ";\n    }\n  }\n  & > input[type=\"search\"]::-ms-clear,\n  & > input[type=\"search\"]::-ms-reveal {\n    display: none;\n    width: 0;\n    height: 0;\n  }\n  & > input[type=\"search\"]::-webkit-search-decoration,\n  & > input[type=\"search\"]::-webkit-search-cancel-button,\n  & > input[type=\"search\"]::-webkit-search-results-button,\n  & > input[type=\"search\"]::-webkit-search-results-decoration {\n    display: none;\n  }\n  &.input-error > input,\n  &.input-error > .input-ce {\n    color: ", "!important;\n    background-color: ", "!important;\n  }\n  &.input-error > input::placeholder,\n  &.input-error > .input-ce::placeholder {\n    color: ", ";\n  }\n  &.inputType-", " {\n    & > input,\n    & > .input-ce {\n      border: 1px solid ", ";\n      &:focus {\n        background-color: ", ";\n        border: 2px solid ", ";\n        padding: ", "px;\n      }\n      &:disabled,\n      &:disabled::placeholder {\n        border-color: ", ";\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n    &.input-error > input,\n    &.input-error > .input-ce {\n      border: 2px solid ", ";\n      padding: ", "px;\n    }\n  }\n  &.inputType-", " {\n    & > input,\n    & > .input-ce {\n      border-radius: 0;\n      border-bottom: 1px solid ", ";\n      &:focus {\n        background-color: ", ";\n        border-bottom: 2px solid ", ";\n        padding-bottom: ", "px;\n      }\n      &:disabled,\n      &:disabled::placeholder {\n        border-color: ", ";\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n    &.input-error > input,\n    &.input-error > .input-ce {\n      border-bottom: 2px solid ", ";\n      padding-bottom: ", "px;\n    }\n  }\n  &.inputType-", " {\n    & > input,\n    & > .input-ce {\n      border: 1px solid transparent;\n      background-color: ", ";\n      &:focus {\n        border-color: transparent;\n        background-color: ", ";\n      }\n      &:disabled,\n      &:disabled::placeholder {\n        background-color: ", ";\n      }\n    }\n    &.input-error > input,\n    &.input-error > .input-ce {\n      border-color: ", ";\n    }\n  }\n"], ["\n  position: relative;\n  margin-bottom: ", "px;\n  & > input,\n  & > .input-ce {\n    display: block;\n    width: 100%;\n    padding: ", "px\n      ", "px;\n    border-radius: ", "px;\n    outline: none;\n    box-sizing: border-box;\n    font-size: ", ";\n    font-weight: ", ";\n    color: ", ";\n    background-color: ", ";\n    -webkit-appearance: none;\n    &::placeholder {\n      color: ", ";\n      font-weight: ", ";\n    }\n    &:disabled,\n    &:disabled::placeholder {\n      color: ", ";\n    }\n  }\n  & > input[type=\"search\"]::-ms-clear,\n  & > input[type=\"search\"]::-ms-reveal {\n    display: none;\n    width: 0;\n    height: 0;\n  }\n  & > input[type=\"search\"]::-webkit-search-decoration,\n  & > input[type=\"search\"]::-webkit-search-cancel-button,\n  & > input[type=\"search\"]::-webkit-search-results-button,\n  & > input[type=\"search\"]::-webkit-search-results-decoration {\n    display: none;\n  }\n  &.input-error > input,\n  &.input-error > .input-ce {\n    color: ", "!important;\n    background-color: ", "!important;\n  }\n  &.input-error > input::placeholder,\n  &.input-error > .input-ce::placeholder {\n    color: ", ";\n  }\n  &.inputType-", " {\n    & > input,\n    & > .input-ce {\n      border: 1px solid ", ";\n      &:focus {\n        background-color: ", ";\n        border: 2px solid ", ";\n        padding: ", "px;\n      }\n      &:disabled,\n      &:disabled::placeholder {\n        border-color: ", ";\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n    &.input-error > input,\n    &.input-error > .input-ce {\n      border: 2px solid ", ";\n      padding: ", "px;\n    }\n  }\n  &.inputType-", " {\n    & > input,\n    & > .input-ce {\n      border-radius: 0;\n      border-bottom: 1px solid ", ";\n      &:focus {\n        background-color: ", ";\n        border-bottom: 2px solid ", ";\n        padding-bottom: ", "px;\n      }\n      &:disabled,\n      &:disabled::placeholder {\n        border-color: ", ";\n        background-color: ", ";\n        color: ", ";\n      }\n    }\n    &.input-error > input,\n    &.input-error > .input-ce {\n      border-bottom: 2px solid ", ";\n      padding-bottom: ", "px;\n    }\n  }\n  &.inputType-", " {\n    & > input,\n    & > .input-ce {\n      border: 1px solid transparent;\n      background-color: ", ";\n      &:focus {\n        border-color: transparent;\n        background-color: ", ";\n      }\n      &:disabled,\n      &:disabled::placeholder {\n        background-color: ", ";\n      }\n    }\n    &.input-error > input,\n    &.input-error > .input-ce {\n      border-color: ", ";\n    }\n  }\n"])), foundation.theme.spacingSize.xxs * 1, foundation.theme.spacingSize.s, foundation.theme.spacingSize.s, foundation.theme.spacingSize.xs, foundation.theme.typography.title1.fontSize, foundation.theme.typography.title1.fontWeight, foundation.tailWindColors.gray[900], foundation.tailWindColors.white, foundation.theme.colors.primary.light, foundation.theme.typography.body1.fontWeight, foundation.tailWindColors.gray[400], foundation.tailWindColors.red[500], foundation.tailWindColors.red[50], foundation.tailWindColors.red[500], exports.inputVariant.outlined, foundation.theme.colors.primary.light, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.main, foundation.theme.spacingSize.s - 1, foundation.tailWindColors.gray[400], foundation.tailWindColors.gray[300], foundation.tailWindColors.gray[900], foundation.tailWindColors.red[500], foundation.theme.spacingSize.s - 1, exports.inputVariant.standard, foundation.theme.colors.primary.light, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.main, foundation.theme.spacingSize.s - 1, foundation.tailWindColors.gray[400], foundation.tailWindColors.gray[300], foundation.tailWindColors.gray[900], foundation.tailWindColors.red[500], foundation.theme.spacingSize.s - 1, exports.inputVariant.filled, foundation.tailWindColors.gray[100], foundation.theme.colors.primary.lightest, foundation.tailWindColors.gray[300], foundation.tailWindColors.red[500]);
var SearchIconContainer = css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: ", "px;\n  transform: translateY(-50%);\n  & > svg {\n    fill: ", ";\n    & > path {\n      fill: ", ";\n    }\n  }\n"], ["\n  position: absolute;\n  top: 50%;\n  left: ", "px;\n  transform: translateY(-50%);\n  & > svg {\n    fill: ", ";\n    & > path {\n      fill: ", ";\n    }\n  }\n"])), foundation.theme.spacingSize.s + 1, foundation.tailWindColors.gray[500], foundation.tailWindColors.gray[500]);
var TextField = function (_a) {
    var variant = _a.variant, type = _a.type, title = _a.title, id = _a.id, inputMode = _a.inputMode, helperText = _a.helperText, placeHolder = _a.placeHolder, defaultValue = _a.defaultValue, error = _a.error, errorText = _a.errorText, disabled = _a.disabled, onChange = _a.onChange, onInput = _a.onInput, onFocus = _a.onFocus, pattern = _a.pattern, _b = _a.autocomplete, autocomplete = _b === void 0 ? "off" : _b, readonly = _a.readonly, onKeyUp = _a.onKeyUp, onKeyDown = _a.onKeyDown, onKeyPress = _a.onKeyPress, maxlength = _a.maxlength, sign = _a.sign, _c = _a.contenteditable, contenteditable = _c === void 0 ? false : _c, _d = _a.textAlign, textAlign = _d === void 0 ? "left" : _d; __rest(_a, ["variant", "type", "title", "id", "inputMode", "helperText", "placeHolder", "defaultValue", "error", "errorText", "disabled", "onChange", "onInput", "onFocus", "pattern", "autocomplete", "readonly", "onKeyUp", "onKeyDown", "onKeyPress", "maxlength", "sign", "contenteditable", "textAlign"]);
    var errorClass = error && "input-error";
    var initValue = defaultValue === undefined
        ? undefined
        : type === exports.inputType.number
            ? Number(defaultValue)
            : defaultValue;
    var _e = React__default['default'].useState(0), signWidth = _e[0], setSignWidth = _e[1];
    var _f = React__default['default'].useState(0), searchWidth = _f[0], setSearchWidth = _f[1];
    var signRef = React__default['default'].useRef(null);
    var searchRef = React__default['default'].useRef(null);
    var inputRef = React__default['default'].useRef(null);
    React__default['default'].useEffect(function () {
        if (signRef.current !== null) {
            setSignWidth(signRef.current.offsetWidth);
        }
        if (searchRef.current !== null) {
            setSearchWidth(searchRef.current.offsetWidth);
        }
    }, [sign, signRef, type, searchRef]);
    return (jsxs("div", __assign({ css: TextFieldContainer }, { children: [(title !== "" || title) && (jsx("label", __assign({ htmlFor: id }, { children: jsx(Typography, __assign({ variant: "tag", color: foundation.tailWindColors.gray[500] }, { children: title }), void 0) }), void 0)), jsxs("div", __assign({ className: ["inputType-" + variant, errorClass].join(" "), css: TextFieldStyle }, { children: [jsx("div", __assign({ ref: searchRef, css: SearchIconContainer }, { children: type === exports.inputType.search && jsx(SearchIcon, {}, void 0) }), void 0), contenteditable === true ? (jsx("div", { className: "input-ce", contentEditable: true, placeholder: placeHolder, onInput: onInput || onChange, onKeyDown: onKeyDown, onKeyPress: onKeyPress, onKeyUp: onKeyUp, style: signWidth > 0
                            ? {
                                paddingRight: foundation.theme.spacingSize.m + 4 + signWidth + "px",
                            }
                            : { paddingRight: foundation.theme.spacingSize.s + "px" } }, void 0)) : (jsx("input", { ref: inputRef, type: type, id: id, autoComplete: autocomplete, readOnly: readonly, inputMode: inputMode, pattern: pattern, placeholder: placeHolder, onChange: onChange, onKeyDown: onKeyDown, onKeyPress: onKeyPress, onKeyUp: onKeyUp, onFocus: onFocus, value: initValue, maxLength: maxlength, disabled: disabled, style: {
                            textAlign: textAlign,
                            paddingRight: signWidth > 0
                                ? foundation.theme.spacingSize.m + 4 + signWidth + "px"
                                : foundation.theme.spacingSize.s + "px",
                            paddingLeft: type === exports.inputType.search
                                ? foundation.theme.spacingSize.m + 4 + searchWidth + "px"
                                : foundation.theme.spacingSize.s + "px",
                        } }, void 0)), jsx("div", __assign({ ref: signRef, css: SignContainer }, { children: sign }), void 0)] }), void 0), !error && (helperText !== "" || helperText) && (jsx(Typography, __assign({ variant: "label", color: foundation.tailWindColors.gray[500] }, { children: helperText }), void 0)), error && (errorText !== "" || errorText) && (jsx(Typography, __assign({ variant: "label", color: foundation.tailWindColors.red[500] }, { children: errorText }), void 0))] }), void 0));
};
var templateObject_1$6, templateObject_2$2, templateObject_3$1, templateObject_4;

exports.ChipVariant = void 0;
(function (ChipVariant) {
    ChipVariant["normal"] = "normal";
    ChipVariant["solid"] = "solid";
    ChipVariant["outlined"] = "outlined";
})(exports.ChipVariant || (exports.ChipVariant = {}));
var TextColor;
(function (TextColor) {
    TextColor["black"] = "black";
    TextColor["white"] = "white";
    TextColor["false"] = "false";
})(TextColor || (TextColor = {}));
var chipStyle = function (colorPalette, variant, textColor) {
    var colorStyle = colorPalette !== "class"
        ? "color: " + (textColor
            ? textColor === "black"
                ? foundation.tailWindColors.gray[900]
                : foundation.tailWindColors.white
            : colorPalette) + ";\n        border-color: " + (variant !== "normal" ? colorPalette : colorPalette + "60") + ";\n        background-color: " + (variant !== "normal"
            ? variant !== "solid"
                ? "transparent"
                : colorPalette
            : colorPalette + "60") + ";"
        : "";
    return css(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n    display: inline-block;\n    letter-spacing: -0.04em;\n    font-size: 12px;\n    font-weight: 700;\n    border: 1px solid transparent;\n    ", "\n    &.chip-size-small {\n      line-height: 14px;\n      padding: ", "px\n        ", "px;\n      border-radius: ", "px;\n    }\n    &.chip-size-medium {\n      line-height: 18px;\n      padding: ", "px\n        ", "px;\n      border-radius: ", "px;\n    }\n    &.chip-variant-normal {\n      &.chip-color-normal {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n      &.chip-color-primary,\n      &.chip-color-secondary {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n    }\n    &.chip-variant-solid {\n      &.chip-color-normal {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n      &.chip-color-primary,\n      &.chip-color-secondary {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n    }\n    &.chip-variant-outlined {\n      &.chip-color-normal {\n        color: ", ";\n        border-color: ", ";\n        background-color: transparent;\n      }\n      &.chip-color-primary,\n      &.chip-color-secondary {\n        color: ", ";\n        border-color: ", ";\n        background-color: transparent;\n      }\n    }\n    &.chip-click-true {\n      cursor: pointer;\n    }\n    &.chip-disabled {\n      pointer-events: none !important;\n      color: ", " !important;\n      border-color: ", " !important;\n      background-color: ", " !important;\n    }\n  "], ["\n    display: inline-block;\n    letter-spacing: -0.04em;\n    font-size: 12px;\n    font-weight: 700;\n    border: 1px solid transparent;\n    ", "\n    &.chip-size-small {\n      line-height: 14px;\n      padding: ", "px\n        ", "px;\n      border-radius: ", "px;\n    }\n    &.chip-size-medium {\n      line-height: 18px;\n      padding: ", "px\n        ", "px;\n      border-radius: ", "px;\n    }\n    &.chip-variant-normal {\n      &.chip-color-normal {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n      &.chip-color-primary,\n      &.chip-color-secondary {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n    }\n    &.chip-variant-solid {\n      &.chip-color-normal {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n      &.chip-color-primary,\n      &.chip-color-secondary {\n        color: ", ";\n        border-color: ", ";\n        background-color: ", ";\n      }\n    }\n    &.chip-variant-outlined {\n      &.chip-color-normal {\n        color: ", ";\n        border-color: ", ";\n        background-color: transparent;\n      }\n      &.chip-color-primary,\n      &.chip-color-secondary {\n        color: ", ";\n        border-color: ", ";\n        background-color: transparent;\n      }\n    }\n    &.chip-click-true {\n      cursor: pointer;\n    }\n    &.chip-disabled {\n      pointer-events: none !important;\n      color: ", " !important;\n      border-color: ", " !important;\n      background-color: ", " !important;\n    }\n  "])), colorStyle, foundation.theme.spacingSize.xxs / 2, foundation.theme.spacingSize.xxs + 2, (foundation.theme.spacingSize.xxs + 14) / 2, foundation.theme.spacingSize.xxs, foundation.theme.spacingSize.xs + 4, (foundation.theme.spacingSize.xs + 18) / 2, foundation.tailWindColors.gray[900], foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[100], foundation.theme.colors.primary.main, foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.lightest, foundation.tailWindColors.gray[50], foundation.tailWindColors.gray[900], foundation.tailWindColors.gray[900], foundation.theme.colors.primary.lightest, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.tailWindColors.gray[900], foundation.tailWindColors.gray[900], foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.tailWindColors.gray[300], foundation.tailWindColors.gray[200], foundation.tailWindColors.gray[200]);
};
var Chip = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? exports.ChipVariant.normal : _b, _c = _a.color, color = _c === void 0 ? "normal" : _c, _d = _a.size, size = _d === void 0 ? "medium" : _d, _e = _a.textColor, textColor = _e === void 0 ? TextColor.false : _e, label = _a.label, children = _a.children, onClick = _a.onClick, disabled = _a.disabled, props = __rest(_a, ["variant", "color", "size", "textColor", "label", "children", "onClick", "disabled"]);
    var colorPalette = color !== "normal" && color !== "primary" && color !== "secondary"
        ? color
        : "class";
    return (jsxs("div", __assign({ css: chipStyle(colorPalette, variant, textColor), className: [
            "chip-variant-" + variant,
            colorPalette === "class" && "chip-color-" + color,
            "chip-size-" + size,
            onClick && "chip-click-true",
            disabled ? "chip-disabled" : "",
        ].join(" "), onClick: onClick }, props, { children: [label, children] }), void 0));
};
var templateObject_1$5;

var gridSpacing = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
exports.alignContentType = void 0;
(function (alignContentType) {
    alignContentType["stretch"] = "stretch";
    alignContentType["center"] = "center";
    alignContentType["flexStart"] = "start";
    alignContentType["flexEnd"] = "end";
    alignContentType["spaceBetween"] = "between";
    alignContentType["spaceAround"] = "around";
})(exports.alignContentType || (exports.alignContentType = {}));
exports.alignItemsType = void 0;
(function (alignItemsType) {
    alignItemsType["stretch"] = "stretch";
    alignItemsType["center"] = "center";
    alignItemsType["flexStart"] = "start";
    alignItemsType["flexEnd"] = "end";
    alignItemsType["baseline"] = "baseline";
})(exports.alignItemsType || (exports.alignItemsType = {}));
exports.directionType = void 0;
(function (directionType) {
    directionType["row"] = "row";
    directionType["rowReverse"] = "row-reverse";
    directionType["column"] = "col";
    directionType["columnReverse"] = "col-reverse";
})(exports.directionType || (exports.directionType = {}));
exports.justifyContentType = void 0;
(function (justifyContentType) {
    justifyContentType["center"] = "center";
    justifyContentType["flexStart"] = "start";
    justifyContentType["flexEnd"] = "end";
    justifyContentType["spaceBetween"] = "between";
    justifyContentType["spaceAround"] = "around";
    justifyContentType["spaceEvenly"] = "evenly";
})(exports.justifyContentType || (exports.justifyContentType = {}));
exports.wrapType = void 0;
(function (wrapType) {
    wrapType["nowrap"] = "nowrap";
    wrapType["wrap"] = "wrap";
    wrapType["wrapReverse"] = "wrap-reverse";
})(exports.wrapType || (exports.wrapType = {}));
var spacingType;
(function (spacingType) {
    spacingType["xxs"] = "xxs";
    spacingType["xs"] = "xs";
    spacingType["s"] = "s";
    spacingType["m"] = "m";
    spacingType["l"] = "l";
    spacingType["xl"] = "xl";
})(spacingType || (spacingType = {}));
var GridStyle = function (spacing) { return css(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  &.container.spacing-", " {\n    width: calc(\n      100% + ", "px\n    );\n    margin-left: -", "px;\n    margin-right: -", "px;\n\n    // \uD328\uB529\uC740 \uC65C \uC92C\uC744\uAE4C\uC694???\n    & > * {\n      padding-left: ", "px;\n      padding-right: ", "px;\n    }\n    &.ySpacing > * {\n      padding-top: ", "px;\n      padding-bottom: ", "px;\n    }\n  }\n"], ["\n  &.container.spacing-", " {\n    width: calc(\n      100% + ", "px\n    );\n    margin-left: -", "px;\n    margin-right: -", "px;\n\n    // \uD328\uB529\uC740 \uC65C \uC92C\uC744\uAE4C\uC694???\n    & > * {\n      padding-left: ", "px;\n      padding-right: ", "px;\n    }\n    &.ySpacing > * {\n      padding-top: ", "px;\n      padding-bottom: ", "px;\n    }\n  }\n"])), gridSpacing[spacing], foundation.theme.spacing * gridSpacing[spacing] * 2, foundation.theme.spacing * gridSpacing[spacing], foundation.theme.spacing * gridSpacing[spacing], foundation.theme.spacing * gridSpacing[spacing], foundation.theme.spacing * gridSpacing[spacing], foundation.theme.spacing * gridSpacing[spacing], foundation.theme.spacing * gridSpacing[spacing]); };
var Grid = function (_a) {
    var _b = _a.alignContent, alignContent = _b === void 0 ? exports.alignContentType.stretch : _b, _c = _a.alignItems, alignItems = _c === void 0 ? exports.alignItemsType.stretch : _c, _d = _a.container, container = _d === void 0 ? false : _d, _e = _a.direction, direction = _e === void 0 ? exports.directionType.row : _e; _a.item; var _g = _a.justifyContent, justifyContent = _g === void 0 ? exports.justifyContentType.flexStart : _g, _h = _a.wrap, wrap = _h === void 0 ? exports.wrapType.wrap : _h, _j = _a.spacing, spacing = _j === void 0 ? 0 : _j, children = _a.children, props = __rest(_a, ["alignContent", "alignItems", "container", "direction", "item", "justifyContent", "wrap", "spacing", "children"]);
    var spacingClasses = spacing;
    if (direction === "col" || direction === "col-reverse") {
        spacingClasses = spacing + " ySpacing";
    }
    var containerClass = container
        ? "container flex flex-" + direction + " items-" + alignItems + " flex-" + wrap + " justify-" + justifyContent + " content-" + alignContent + " spacing-" + spacingClasses
        : "";
    var sizes = ["xs", "sm", "md", "lg", "xl"];
    var sizeClasses = [];
    for (var _i = 0, sizes_1 = sizes; _i < sizes_1.length; _i++) {
        var size = sizes_1[_i];
        var sizeValue = props[size];
        if (size === "xs" && sizeValue === undefined) {
            break;
        }
        if (sizeValue === undefined) {
            continue;
        }
        var prefix = size === "xs" ? "" : size + ":";
        if (sizeValue === true) {
            sizeClasses.push(prefix + "flex-none");
            sizeClasses.push(prefix + "w-auto");
            continue;
        }
        if (sizeValue === "auto") {
            sizeClasses.push(prefix + "flex-grow");
            sizeClasses.push(prefix + "w-auto");
            continue;
        }
        if (typeof sizeValue !== "number") {
            continue;
        }
        if (sizeValue === 12) {
            sizeClasses.push(prefix + "w-full");
        }
        else {
            sizeClasses.push(prefix + "w-" + sizeValue + "/12");
        }
    }
    return (jsx("div", __assign({ css: [GridStyle(spacing)], className: __spreadArray([containerClass], sizeClasses).join(" ") }, props, { children: children }), void 0));
};
var templateObject_1$4;

var SideBarStyle = css(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n    \n"], ["\n    \n"])));
var SideBarIcon = css(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n    color: ", ";\n    &>svg {\n        width: 18px;\n        height: 18px;\n        fill: ", ";\n        & path {\n            fill: ", ";\n        }\n    }\n    &.sidebar-icon-selected {\n        color: ", ";\n        &>svg {\n            fill: ", ";\n            & path {\n                fill: ", ";\n            }\n        }\n    }\n"], ["\n    color: ", ";\n    &>svg {\n        width: 18px;\n        height: 18px;\n        fill: ", ";\n        & path {\n            fill: ", ";\n        }\n    }\n    &.sidebar-icon-selected {\n        color: ", ";\n        &>svg {\n            fill: ", ";\n            & path {\n                fill: ", ";\n            }\n        }\n    }\n"])), foundation.tailWindColors.gray[500], foundation.tailWindColors.gray[500], foundation.tailWindColors.gray[500], foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main);
var SideBar = function (_a) {
    var items = _a.items, selectedIndex = _a.selectedIndex, props = __rest(_a, ["items", "selectedIndex"]);
    return (jsx("div", __assign({ css: SideBarStyle }, props, { children: jsx(List, { children: items.map(function (item, index) { return (jsx(ListButton, __assign({ onClick: function () { if (item.onSelect) {
                    item.onSelect();
                } }, selected: selectedIndex === index }, { children: jsxs(Grid, __assign({ container: true, alignItems: exports.alignItemsType.center, spacing: spacingType.xxs }, { children: [jsx(Grid, __assign({ item: true }, { children: jsx("div", __assign({ css: SideBarIcon, className: selectedIndex === index ? 'sidebar-icon-selected' : 'sidebar-icon-default' }, { children: item.icon }), void 0) }), void 0), jsx(Grid, __assign({ item: true }, { children: jsx(Typography, __assign({ variant: exports.TypoVariant.title2, color: selectedIndex === index ? foundation.theme.colors.primary.main : foundation.tailWindColors.gray[500] }, { children: item.label }), void 0) }), void 0)] }), void 0) }), 'sideBar_' + index)); }) }, void 0) }), void 0));
};
var templateObject_1$3, templateObject_2$1;

var AppBarStyle = css(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1100;\n  display: block;\n  background-color: ", ";\n  & button {\n    min-height: 60px;\n    border-radius: 0;\n    svg {\n      width: 16px;\n      height: 16px;\n      margin: 0 auto;\n      fill: ", ";\n      path {\n        fill: ", ";\n      }\n    }\n    &.btn-color-primary {\n      pointer-events: none;\n      svg {\n        fill: ", ";\n        path {\n          fill: ", ";\n        }\n      }\n    }\n  }\n"], ["\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1100;\n  display: block;\n  background-color: ", ";\n  & button {\n    min-height: 60px;\n    border-radius: 0;\n    svg {\n      width: 16px;\n      height: 16px;\n      margin: 0 auto;\n      fill: ", ";\n      path {\n        fill: ", ";\n      }\n    }\n    &.btn-color-primary {\n      pointer-events: none;\n      svg {\n        fill: ", ";\n        path {\n          fill: ", ";\n        }\n      }\n    }\n  }\n"])), foundation.tailWindColors.white, foundation.tailWindColors.gray[500], foundation.tailWindColors.gray[500], foundation.theme.colors.primary.main, foundation.theme.colors.primary.main);
var AppBar = function (_a) {
    var items = _a.items, selectedIndex = _a.selectedIndex, props = __rest(_a, ["items", "selectedIndex"]);
    var buttonLink = function (link) {
        window.location.replace(link);
    };
    return (jsx("div", __assign({ css: AppBarStyle, className: "appBar" }, props, { children: jsx(Grid, __assign({ container: true, justifyContent: exports.justifyContentType.center }, { children: items.map(function (item, index) { return (jsx(Grid, __assign({ item: true, xs: 3 }, { children: jsx(Button, __assign({ block: true, variant: exports.ButtonVariant.text, color: selectedIndex === index
                        ? exports.ButtonColor.primary
                        : exports.ButtonColor.normal, onClick: function () { return buttonLink(item.link); } }, { children: jsxs(Grid, __assign({ container: true, direction: exports.directionType.column }, { children: [jsx(Grid, __assign({ item: true }, { children: item.icon }), void 0), jsx(Grid, __assign({ item: true }, { children: jsx(Typography, __assign({ variant: exports.TypoVariant.tag }, { children: item.label }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0)); }) }), void 0) }), void 0));
};
var templateObject_1$2;

var RadioStyle = css(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  padding: ", "px;\n  cursor: pointer;\n  text-align: left;\n  border-radius: ", "px;\n  min-height: 48px;\n  color: ", ";\n  & svg {\n    fill: ", ";\n    & > path {\n      fill: ", ";\n    }\n  }\n  border: 1px solid ", ";\n  &.radio-selected-true {\n    pointer-events: none;\n    padding: ", "px;\n    border: 2px solid ", ";\n    color: ", ";\n    & svg {\n      fill: ", ";\n      & > path {\n        fill: ", ";\n      }\n    }\n  }\n  &:active,\n  &:not([disabled]):not(.btn-disabled):not([tabindex=\"-1\"]):active {\n    border-color: ", ";\n  }\n  ,\n  &:hover {\n    background-color: ", ";\n  }\n  & > * {\n    pointer-events: none;\n  }\n  & .listImage {\n    border-radius: 50%;\n    background-color: ", ";\n    overflow: hidden;\n    position: relative;\n    & > img {\n      position: absolute;\n      max-width: 100%;\n      height: auto;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    & > svg {\n      fill: ", ";\n      position: absolute;\n      font-size: 16px;\n      width: 16px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n"], ["\n  padding: ", "px;\n  cursor: pointer;\n  text-align: left;\n  border-radius: ", "px;\n  min-height: 48px;\n  color: ", ";\n  & svg {\n    fill: ", ";\n    & > path {\n      fill: ", ";\n    }\n  }\n  border: 1px solid ", ";\n  &.radio-selected-true {\n    pointer-events: none;\n    padding: ", "px;\n    border: 2px solid ", ";\n    color: ", ";\n    & svg {\n      fill: ", ";\n      & > path {\n        fill: ", ";\n      }\n    }\n  }\n  &:active,\n  &:not([disabled]):not(.btn-disabled):not([tabindex=\"-1\"]):active {\n    border-color: ", ";\n  }\n  ,\n  &:hover {\n    background-color: ", ";\n  }\n  & > * {\n    pointer-events: none;\n  }\n  & .listImage {\n    border-radius: 50%;\n    background-color: ", ";\n    overflow: hidden;\n    position: relative;\n    & > img {\n      position: absolute;\n      max-width: 100%;\n      height: auto;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n    & > svg {\n      fill: ", ";\n      position: absolute;\n      font-size: 16px;\n      width: 16px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    }\n  }\n"])), foundation.theme.spacingSize.s, foundation.theme.spacingSize.xs, foundation.tailWindColors.gray[500], foundation.tailWindColors.gray[500], foundation.tailWindColors.gray[500], foundation.theme.colors.primary.lightest, foundation.theme.spacingSize.s - 1, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.theme.colors.primary.main, foundation.theme.colors.primary.light, foundation.theme.colors.primary.lightest, foundation.tailWindColors.gray[100], foundation.tailWindColors.gray[400]);
var truncateTypo = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"], ["\n  & > * {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n"])));
var blindInput = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: none;\n  opacity: 0;\n"], ["\n  display: none;\n  opacity: 0;\n"])));
var Radio = function (_a) {
    var id = _a.id, formName = _a.formName, children = _a.children, value = _a.value, imgSrc = _a.imgSrc, withImage = _a.withImage, onClick = _a.onClick, selected = _a.selected, props = __rest(_a, ["id", "formName", "children", "value", "imgSrc", "withImage", "onClick", "selected"]);
    return (jsxs("label", __assign({ htmlFor: id, css: RadioStyle, className: [
            "flex",
            "items-center",
            "space-x-2",
            "radio-selected-" + selected,
        ].join(" "), onClick: onClick }, props, { children: [withImage && (jsx("div", __assign({ className: "flex-none" }, { children: jsx("div", __assign({ className: "listImage w-9 h-9" }, { children: imgSrc ? jsx("img", { src: imgSrc }, void 0) : jsx(ImageIcon, {}, void 0) }), void 0) }), void 0)), jsx("div", __assign({ css: truncateTypo, className: "truncate w-full" }, { children: children }), void 0), jsxs("div", __assign({ className: "flex-none" }, { children: [selected ? jsx(CheckCircleIconFill, {}, void 0) : jsx(CheckCircleIcon, {}, void 0), jsx("input", { css: blindInput, type: "radio", id: id, name: formName, value: value, checked: selected }, void 0)] }), void 0)] }), void 0));
};
var templateObject_1$1, templateObject_2, templateObject_3;

var Spacer = function (_a) {
    var _b = _a.flexGrow, flexGrow = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.x, x = _d === void 0 ? 0 : _d;
    // flex를 사용하는 방식으로 바꿔야함
    var spacer = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n    ", "\n    ", "\n  "], ["\n    ", "\n    ", "\n    ", "\n  "])), flexGrow !== undefined ? "flex-grow: " + flexGrow + ";" : "", y !== undefined ? "height: " + y + "px;" : "", x !== undefined ? "width: " + x + "px;" : "");
    return jsx("div", { className: "spacer", css: spacer }, void 0);
};
var templateObject_1;

var AddIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z", fill: "black" }, void 0) }), void 0));
};

var ArrowBackIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z", fill: "black" }, void 0) }), void 0));
};

var ArrowFowardIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z", fill: "black" }, void 0) }), void 0));
};

var CheckCircleIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z", fill: "black" }, void 0) }), void 0));
};

var CheckCircleIconFill = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.29 16.29L5.7 12.7C5.31 12.31 5.31 11.68 5.7 11.29C6.09 10.9 6.72 10.9 7.11 11.29L10 14.17L16.88 7.29C17.27 6.9 17.9 6.9 18.29 7.29C18.68 7.68 18.68 8.31 18.29 8.7L10.7 16.29C10.32 16.68 9.68 16.68 9.29 16.29Z", fill: "black" }, void 0) }), void 0));
};

var InfoIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z", fill: "black" }, void 0) }), void 0));
};

var KeyboardArrowUpIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z", fill: "black" }, void 0) }), void 0));
};

var KeyboardArrowLeftIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z", fill: "black" }, void 0) }), void 0));
};

var KeyboardArrowRightIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z", fill: "black" }, void 0) }), void 0));
};

var ModeEditIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM21.41 6.34L17.66 2.59L15.13 5.13L18.88 8.88L21.41 6.34Z", fill: "black" }, void 0) }), void 0));
};

var MoreIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z", fill: "black" }, void 0) }), void 0));
};

var SendIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z", fill: "black" }, void 0) }), void 0));
};

var WalletIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M19.2 7.2H4.19999V6.6L17.4 5.544V6.6H19.2V4.8C19.2 3.48 18.1308 2.5536 16.8252 2.7396L4.77599 4.4604C3.46919 4.6476 2.39999 5.88 2.39999 7.2V19.2C2.39999 19.8365 2.65285 20.447 3.10294 20.8971C3.55302 21.3471 4.16347 21.6 4.79999 21.6H19.2C19.8365 21.6 20.447 21.3471 20.897 20.8971C21.3471 20.447 21.6 19.8365 21.6 19.2V9.6C21.6 8.96348 21.3471 8.35303 20.897 7.90294C20.447 7.45286 19.8365 7.2 19.2 7.2ZM17.4 15.6072C17.1635 15.6071 16.9294 15.5605 16.711 15.4699C16.4925 15.3793 16.2941 15.2466 16.127 15.0794C15.9598 14.9121 15.8272 14.7136 15.7368 14.4951C15.6464 14.2766 15.5999 14.0425 15.6 13.806C15.6001 13.5695 15.6467 13.3354 15.7373 13.117C15.8278 12.8986 15.9605 12.7001 16.1278 12.533C16.2951 12.3658 16.4936 12.2332 16.7121 12.1428C16.9306 12.0524 17.1647 12.0059 17.4012 12.006C17.8787 12.0062 18.3367 12.196 18.6742 12.5338C19.0118 12.8716 19.2014 13.3297 19.2012 13.8072C19.201 14.2847 19.0112 14.7427 18.6734 15.0802C18.3356 15.4178 17.8775 15.6074 17.4 15.6072Z", fill: "black" }, void 0) }), void 0));
};

var WavesIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" }, { children: jsx("path", { xmlns: "http://www.w3.org/2000/svg", d: "M19.95 8.91C19.2 8.53 18.37 8.11 17 8.11C15.63 8.11 14.8 8.53 14.05 8.91C13.4 9.23 12.87 9.51 12 9.51C11.1 9.51 10.6 9.26 9.95 8.91C9.2 8.54 8.38 8.11 7 8.11C5.62 8.11 4.8 8.53 4.05 8.91C3.62 9.13 3.24 9.32 2.78 9.43C2.33 9.53 2 9.89 2 10.34V10.41C2 11.01 2.54 11.45 3.12 11.33C3.87 11.18 4.43 10.89 4.95 10.64C5.6 10.31 6.12 10.04 7 10.04C7.88 10.04 8.4 10.29 9.05 10.64C9.8 11.02 10.62 11.44 12 11.44C13.38 11.44 14.2 11.01 14.95 10.64C15.6 10.32 16.13 10.04 17 10.04C17.9 10.04 18.4 10.29 19.05 10.64C19.57 10.9 20.13 11.19 20.88 11.34C21.46 11.45 22 11.01 22 10.42V10.33C22 9.87 21.66 9.51 21.21 9.41C20.75 9.31 20.38 9.13 19.95 8.91ZM17 12.54C15.65 12.54 14.8 12.97 14.05 13.34C13.4 13.69 12.9 13.94 12 13.94C11.1 13.94 10.6 13.69 9.95 13.34C9.2 12.96 8.38 12.54 7 12.54C5.62 12.54 4.8 12.97 4.05 13.34C3.62 13.57 3.25 13.76 2.79 13.86C2.34 13.96 2 14.32 2 14.78V14.87C2 15.46 2.54 15.9 3.12 15.78C3.87 15.63 4.43 15.34 4.95 15.09C5.6 14.77 6.13 14.49 7 14.49C7.87 14.49 8.4 14.74 9.05 15.09C9.8 15.47 10.62 15.89 12 15.89C13.38 15.89 14.2 15.46 14.95 15.09C15.6 14.77 16.13 14.49 17 14.49C17.9 14.49 18.4 14.74 19.05 15.09C19.57 15.35 20.13 15.64 20.88 15.79C21.46 15.9 22 15.46 22 14.88V14.79C22 14.33 21.66 13.97 21.21 13.87C20.75 13.77 20.38 13.58 19.95 13.35C19.2 12.96 18.35 12.54 17 12.54Z", fill: "black" }, void 0) }), void 0));
};

var PersonIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsxs("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, { children: [jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }, void 0), jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" }, void 0)] }), void 0));
};

var CardIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "black" }, { children: jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4V9V20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20V9V4ZM21 5V8H3V5H21ZM3 10V19H21V10H3ZM6 13.5C5.44772 13.5 5 13.9477 5 14.5C5 15.0523 5.44772 15.5 6 15.5H7C7.55228 15.5 8 15.0523 8 14.5C8 13.9477 7.55228 13.5 7 13.5H6ZM10 13.5C9.44772 13.5 9 13.9477 9 14.5C9 15.0523 9.44772 15.5 10 15.5H11C11.5523 15.5 12 15.0523 12 14.5C12 13.9477 11.5523 13.5 11 13.5H10ZM14 13.5C13.4477 13.5 13 13.9477 13 14.5C13 15.0523 13.4477 15.5 14 15.5H15C15.5523 15.5 16 15.0523 16 14.5C16 13.9477 15.5523 13.5 15 13.5H14Z" }, void 0) }), void 0));
};

var ShoppingBagIcon = function (_a) {
    var props = __rest(_a, []);
    return (jsxs("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "black" }, { children: [jsx("path", { d: "M9.222 9.6C9.222 9.04771 8.77428 8.6 8.222 8.6C7.66972 8.6 7.222 9.04771 7.222 9.6C7.222 12.2453 9.35572 14.4 12 14.4C14.6444 14.4 16.7775 12.2451 16.7775 9.6C16.7775 9.04771 16.3298 8.6 15.7775 8.6C15.2252 8.6 14.7775 9.04771 14.7775 9.6C14.7775 11.1519 13.5286 12.4 12 12.4C10.4713 12.4 9.222 11.1517 9.222 9.6Z" }, void 0), jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.03183 1.90223C5.22057 1.64911 5.51776 1.5 5.8335 1.5H18.1665C18.4822 1.5 18.7794 1.64911 18.9682 1.90223L21.7956 5.69414C21.8613 5.78023 21.9133 5.87729 21.9484 5.9821C21.9843 6.08897 22.0012 6.19996 22 6.31029V20.5C22 21.0304 21.7893 21.5391 21.4142 21.9142C21.0391 22.2893 20.5304 22.5 20 22.5H4C3.46957 22.5 2.96086 22.2893 2.58579 21.9142C2.21071 21.5391 2 21.0304 2 20.5V6.31029C1.99878 6.19996 2.01575 6.08897 2.05159 5.9821C2.08671 5.87728 2.13872 5.7802 2.20439 5.69411L5.03183 1.90223ZM17.6648 3.5L19.0069 5.3H4.99306L6.33524 3.5H17.6648ZM4 7.3V20.5H20V7.3H4Z" }, void 0)] }), void 0));
};

exports.AddIcon = AddIcon;
exports.AppBar = AppBar;
exports.ArrowBackIcon = ArrowBackIcon;
exports.ArrowFowardIcon = ArrowFowardIcon;
exports.BackDrop = BackDrop;
exports.Button = Button;
exports.ButtonLoader = ButtonLoader;
exports.CardIcon = CardIcon;
exports.CheckCircleIcon = CheckCircleIcon;
exports.CheckCircleIconFill = CheckCircleIconFill;
exports.Chip = Chip;
exports.Circular = Circular;
exports.CloseIcon = CloseIcon;
exports.Grid = Grid;
exports.IconButton = IconButton;
exports.ImageIcon = ImageIcon;
exports.InfoIcon = InfoIcon;
exports.KeyboardArrowDownIcon = KeyboardArrowDownIcon;
exports.KeyboardArrowLeftIcon = KeyboardArrowLeftIcon;
exports.KeyboardArrowRightIcon = KeyboardArrowRightIcon;
exports.KeyboardArrowUpIcon = KeyboardArrowUpIcon;
exports.List = List;
exports.ListButton = ListButton;
exports.Modal = Modal;
exports.ModalContent = ModalContent;
exports.ModalHeader = ModalHeader;
exports.ModeEditIcon = ModeEditIcon;
exports.MoreIcon = MoreIcon;
exports.PersonIcon = PersonIcon;
exports.Radio = Radio;
exports.Select = Select;
exports.SendIcon = SendIcon;
exports.ShoppingBagIcon = ShoppingBagIcon;
exports.SideBar = SideBar;
exports.Spacer = Spacer;
exports.TextField = TextField;
exports.Typography = Typography;
exports.WalletIcon = WalletIcon;
exports.WavesIcon = WavesIcon;
exports.foundation = foundation;
//# sourceMappingURL=index.js.map