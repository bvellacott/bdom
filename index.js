'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var doc = window.document;
var _window = window,
    Element = _window.Element,
    Attr = _window.Attr,
    DocumentFragment = _window.DocumentFragment,
    Node = _window.Node;
var ELEMENT_NODE = doc.ELEMENT_NODE,
    ATTRIBUTE_NODE = doc.ATTRIBUTE_NODE,
    DOCUMENT_FRAGMENT_NODE = doc.DOCUMENT_FRAGMENT_NODE;


var svgNS = 'http://www.w3.org/2000/svg';

var testedNodeTypes = {
	ELEMENT_NODE: ELEMENT_NODE,
	DOCUMENT_FRAGMENT_NODE: DOCUMENT_FRAGMENT_NODE
};

var reactDebugAttributes = {
	__source: 1,
	__self: 1,
	onclick: 1
};

var svgnames = {
	'svg': 1,
	'g': 1,
	'defs': 1,
	'desc': 1,
	'title': 1,
	'symbol': 1,
	'script': 1,
	'use': 1,
	'image': 1,
	'switch': 1,
	'style': 1,
	'path': 1,
	'rect': 1,
	'circle': 1,
	'ellipse': 1,
	'line': 1,
	'link': 1,
	'polyline': 1,
	'polygon': 1,
	'text': 1,
	'tspan': 1,
	'tref': 1,
	'textPath': 1,
	'altGlyph': 1,
	'glyphRef': 1,
	'altGlyphItem': 1,
	'altGlyphDef': 1,
	'marker': 1,
	'color-profile': 1,
	'filter': 1,
	'cursor': 1,
	'view': 1,
	'animate': 1,
	'set': 1,
	'animateMotion': 1,
	'animateColor': 1,
	'animateTransform': 1,
	'font': 1,
	'glyph': 1,
	'missing-glyph': 1,
	'hkern': 1,
	'vkern': 1,
	'font-face': 1,
	'font-face-src': 1,
	'font-face-uri': 1,
	'font-face-format': 1,
	'font-face-name': 1,
	'foreignObject': 1
};

var svgConversions = {
	'link': 'a'
};

var plugins = [];

function addAttributesTo(node, attributes) {
	var value = void 0;
	for (var attrName in attributes) {
		value = attributes[attrName];
		// check if a property with the name exists on the instance and set it instead if true
		if (node.namespaceURI !== svgNS && (attrName in node || attrName in reactDebugAttributes)) {
			var curValue = node[attrName];
			if (curValue && (typeof curValue === 'undefined' ? 'undefined' : _typeof(curValue)) === 'object') {
				// if the target is an object, attempt to assign the value on it
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					throw new Error(attrName + ' is an object. You can only assign another object on it');
				}
				Object.assign(curValue, value);
			} else {
				node[attrName] = value;
			}
		} else if (value && typeof value !== 'string') {
			value = typeof value.toString === 'function' ? value.toString() : '' + value;
			// console.log(node.nodeName, ' : ', node.namespaceURI, ' : ', attrName)
			// value = 'Haloo!'
			node.setAttribute(attrName, value);
		} else {
			node.setAttribute(attrName, value);
		}
	}
}

function addChildren(element, children, offset) {
	for (var i = offset; i < children.length; i++) {
		addChild(element, children[i]);
	}
}

function addChild(element, child) {
	switch (typeof child === 'undefined' ? 'undefined' : _typeof(child)) {
		case 'object':
			if (child) {
				if (child instanceof Attr || /* deprecated node type -> */child.nodeType === ATTRIBUTE_NODE) {
					element.setAttributeNode(child);
				} else if (child.nodeType in testedNodeTypes || child instanceof Element || child instanceof DocumentFragment) {
					element.appendChild(child);
				} else if (child instanceof Node || child.nodeType) {
					if (console && console.log) {
						console.log('!WARNING! - support for nodes of type: ' + (child.name || child.nodeType) + " hasn't been tested - !WARNING!");
					}
					element.appendChild(child);
				} else if (typeof child !== 'string' && typeof child.length === 'number') {
					addChildren(element, child, 0);
				} else {
					addAttributesTo(element, child);
				}
			}
			break;
		// nulls are disregarded
		case 'undefined':
			// undefineds are disregarded
			break;
		case 'string':
		case 'number':
		case 'boolean':
			element.appendChild(doc.createTextNode(child));
			break;
		default:
			throw new Error('an unhandled element appending situation was found');
	}
}

// element factory
function El(name) {
	if (!name) {
		throw new Error('you must provide a tag name for the createable element');
	}

	var newNode = void 0;
	if (typeof name === 'function') {
		var props = arguments[1] || {};
		var children = [];
		for (var ci = 2; ci < arguments.length; ci++) {
			children.push(arguments[ci]);
		}
		newNode = new name(props, children);
	} else if (name instanceof Element || name.nodeType === ELEMENT_NODE) {
		newNode = name;
	} else if (name in svgnames) {
		var conversion = svgConversions[name];
		newNode = doc.createElementNS(svgNS, conversion || name);
		addChildren(newNode, arguments, 1);
	} else {
		newNode = doc.createElement(name);
		addChildren(newNode, arguments, 1);
	}

	return newNode;
}

// attribute factory
function attribute(name, value) {
	var attr = doc.createAttribute(name, value);
	attr.nodeValue = value;
	return attr;
}

// methods to create shorthand builders
function createEl(name) {
	return function () {
		return El.apply(dom, [name].concat(Array.prototype.slice.call(arguments)));
	};
}

function createAttr(name) {
	return function (value) {
		return attribute(name, value);
	};
}

// data is a special case because it has an optional extension
function data(arg1, arg2) {
	if (arguments.length > 1) {
		return attribute('data-' + arg1, arg2);
	}
	return attribute('data', arg1);
}

var dom = {
	El: El,
	text: function text(txt) {
		return doc.createTextNode(txt);
	},
	attribute: attribute,

	// element factories
	Html: createEl('html'),
	Body: createEl('body'),
	Div: createEl('div'),
	Span: createEl('span'),
	Applet: createEl('applet'),
	Object: createEl('object'),
	Iframe: createEl('iframe'),
	H1: createEl('h1'),
	H2: createEl('h2'),
	H3: createEl('h3'),
	H4: createEl('h4'),
	H5: createEl('h5'),
	H6: createEl('h6'),
	P: createEl('p'),
	Blockquote: createEl('blockquote'),
	Pre: createEl('pre'),
	A: createEl('a'),
	Abbr: createEl('abbr'),
	Acronym: createEl('acronym'),
	Address: createEl('address'),
	Big: createEl('big'),
	Cite: createEl('cite'),
	Code: createEl('code'),
	Del: createEl('del'),
	Dfn: createEl('dfn'),
	Em: createEl('em'),
	Img: createEl('img'),
	Ins: createEl('ins'),
	Kbd: createEl('kbd'),
	Q: createEl('q'),
	S: createEl('s'),
	Samp: createEl('samp'),
	Small: createEl('small'),
	Strike: createEl('strike'),
	Strong: createEl('strong'),
	Sub: createEl('sub'),
	Sup: createEl('sup'),
	Tt: createEl('tt'),
	Var: createEl('var'),
	B: createEl('b'),
	U: createEl('u'),
	I: createEl('i'),
	Center: createEl('center'),
	Dl: createEl('dl'),
	Dt: createEl('dt'),
	Dd: createEl('dd'),
	Ol: createEl('ol'),
	Ul: createEl('ul'),
	Li: createEl('li'),
	Fieldset: createEl('fieldset'),
	Form: createEl('form'),
	Label: createEl('label'),
	Legend: createEl('legend'),
	Table: createEl('table'),
	Caption: createEl('caption'),
	Tbody: createEl('tbody'),
	Tfoot: createEl('tfoot'),
	Thead: createEl('thead'),
	Tr: createEl('tr'),
	Th: createEl('th'),
	Td: createEl('td'),
	Article: createEl('article'),
	Aside: createEl('aside'),
	Canvas: createEl('canvas'),
	Details: createEl('details'),
	Embed: createEl('embed'),
	Figure: createEl('figure'),
	Figcaption: createEl('figcaption'),
	Footer: createEl('footer'),
	Header: createEl('header'),
	Hgroup: createEl('hgroup'),
	Menu: createEl('menu'),
	Nav: createEl('nav'),
	Output: createEl('output'),
	Ruby: createEl('ruby'),
	Section: createEl('section'),
	Summary: createEl('summary'),
	Time: createEl('time'),
	Mark: createEl('mark'),
	Audio: createEl('audio'),
	Video: createEl('video'),

	// svg elements
	Svg: createEl('svg'),
	G: createEl('g'),
	Defs: createEl('defs'),
	Desc: createEl('desc'),
	Title: createEl('title'),
	Symbol: createEl('symbol'),
	Script: createEl('script'),
	Use: createEl('use'),
	Image: createEl('image'),
	Switch: createEl('switch'),
	Style: createEl('style'),
	Path: createEl('path'),
	Rect: createEl('rect'),
	Circle: createEl('circle'),
	Ellipse: createEl('ellipse'),
	Line: createEl('line'),
	Link: createEl('link'),
	Polyline: createEl('polyline'),
	Polygon: createEl('polygon'),
	Text: createEl('text'),
	Tspan: createEl('tspan'),
	Tref: createEl('tref'),
	TextPath: createEl('textPath'),
	AltGlyph: createEl('altGlyph'),
	GlyphRef: createEl('glyphRef'),
	AltGlyphItem: createEl('altGlyphItem'),
	AltGlyphDef: createEl('altGlyphDef'),
	Marker: createEl('marker'),
	ColorProfile: createEl('color-profile'),
	Filter: createEl('filter'),
	Cursor: createEl('cursor'),
	View: createEl('view'),
	Animate: createEl('animate'),
	Set: createEl('set'),
	AnimateMotion: createEl('animateMotion'),
	AnimateColor: createEl('animateColor'),
	AnimateTransform: createEl('animateTransform'),
	Font: createEl('font'),
	Glyph: createEl('glyph'),
	MissingGlyph: createEl('missing-glyph'),
	Hkern: createEl('hkern'),
	Vkern: createEl('vkern'),
	FontFace: createEl('font-face'),
	FontFaceSrc: createEl('font-face-src'),
	FontFaceUri: createEl('font-face-uri'),
	FontFaceFormat: createEl('font-face-format'),
	FontFaceName: createEl('font-face-name'),
	ForeignObject: createEl('foreignObject'),

	// data is a special case because it has an optional extension
	data: data,

	accept: createAttr('accept'),
	acceptCharset: createAttr('accept-charset'),
	accesskey: createAttr('accesskey'),
	action: createAttr('action'),
	align: createAttr('align'),
	alt: createAttr('alt'),
	async: createAttr('async'),
	autocomplete: createAttr('autocomplete'),
	autofocus: createAttr('autofocus'),
	autoplay: createAttr('autoplay'),
	autosave: createAttr('autosave'),
	bgcolor: createAttr('bgcolor'),
	border: createAttr('border'),
	buffered: createAttr('buffered'),
	challenge: createAttr('challenge'),
	charset: createAttr('charset'),
	checked: createAttr('checked'),
	cite: createAttr('cite'),
	class: createAttr('class'),
	code: createAttr('code'),
	codebase: createAttr('codebase'),
	color: createAttr('color'),
	cols: createAttr('cols'),
	colspan: createAttr('colspan'),
	content: createAttr('content'),
	contenteditable: createAttr('contenteditable'),
	contextmenu: createAttr('contextmenu'),
	controls: createAttr('controls'),
	coords: createAttr('coords'),
	crossorigin: createAttr('crossorigin'),
	datetime: createAttr('datetime'),
	default: createAttr('default'),
	defer: createAttr('defer'),
	dir: createAttr('dir'),
	dirname: createAttr('dirname'),
	disabled: createAttr('disabled'),
	download: createAttr('download'),
	draggable: createAttr('draggable'),
	dropzone: createAttr('dropzone'),
	enctype: createAttr('enctype'),
	for: createAttr('for'),
	form: createAttr('form'),
	formaction: createAttr('formaction'),
	headers: createAttr('headers'),
	height: createAttr('height'),
	hidden: createAttr('hidden'),
	high: createAttr('high'),
	href: createAttr('href'),
	hreflang: createAttr('hreflang'),
	httpEquiv: createAttr('http-equiv'),
	icon: createAttr('icon'),
	id: createAttr('id'),
	integrity: createAttr('integrity'),
	ismap: createAttr('ismap'),
	itemprop: createAttr('itemprop'),
	keytype: createAttr('keytype'),
	kind: createAttr('kind'),
	label: createAttr('label'),
	lang: createAttr('lang'),
	language: createAttr('language'),
	list: createAttr('list'),
	loop: createAttr('loop'),
	low: createAttr('low'),
	manifest: createAttr('manifest'),
	max: createAttr('max'),
	maxlength: createAttr('maxlength'),
	minlength: createAttr('minlength'),
	media: createAttr('media'),
	method: createAttr('method'),
	min: createAttr('min'),
	multiple: createAttr('multiple'),
	muted: createAttr('muted'),
	name: createAttr('name'),
	novalidate: createAttr('novalidate'),
	open: createAttr('open'),
	optimum: createAttr('optimum'),
	pattern: createAttr('pattern'),
	ping: createAttr('ping'),
	placeholder: createAttr('placeholder'),
	poster: createAttr('poster'),
	preload: createAttr('preload'),
	radiogroup: createAttr('radiogroup'),
	readonly: createAttr('readonly'),
	rel: createAttr('rel'),
	required: createAttr('required'),
	reversed: createAttr('reversed'),
	rows: createAttr('rows'),
	rowspan: createAttr('rowspan'),
	sandbox: createAttr('sandbox'),
	scope: createAttr('scope'),
	scoped: createAttr('scoped'),
	seamless: createAttr('seamless'),
	selected: createAttr('selected'),
	shape: createAttr('shape'),
	size: createAttr('size'),
	sizes: createAttr('sizes'),
	slot: createAttr('slot'),
	span: createAttr('span'),
	spellcheck: createAttr('spellcheck'),
	src: createAttr('src'),
	srcdoc: createAttr('srcdoc'),
	srclang: createAttr('srclang'),
	srcset: createAttr('srcset'),
	start: createAttr('start'),
	step: createAttr('step'),
	style: createAttr('style'),
	summary: createAttr('summary'),
	tabindex: createAttr('tabindex'),
	target: createAttr('target'),
	title: createAttr('title'),
	type: createAttr('type'),
	usemap: createAttr('usemap'),
	value: createAttr('value'),
	width: createAttr('width'),
	wrap: createAttr('wrap')
};

dom.createElement = dom.El;

module.exports = dom;
