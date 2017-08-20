const doc = window.document
const { Element, Attr, Node} = window
const { ELEMENT_NODE, ATTRIBUTE_NODE } = doc

function addAttributesTo(node, attributes) {
	let value
	for(let attrName in attributes) {
		value = attributes[attrName]
		if(value && typeof value !== 'string') {
			value = typeof value.toString === 'function' ? value.toString() : '' + value
		}
		node.setAttribute(attrName, value)
	}
}

function addChildren(element, children, offset) {
	for(let i = offset; i < children.length; i++) {
		addChild(element, children[i])
	}
}

function addChild(element, child, offset) {
	switch(typeof child) {
		case 'object':
			if(child) {
				if(child instanceof Attr || /* deprecated */ child.nodeType === ATTRIBUTE_NODE) {
					element.setAttributeNode(child)
				}
				else if(child instanceof Element || child.nodeType === ELEMENT_NODE) {
					element.appendChild(child)
				}
				else if(child instanceof Node || child.nodeType) {
					if(console && console.log) {
						console.log('!WARNING! - support for nodes of type: ' + 
							(child.name || child.nodeType) + 
							" hasn't been tested - !WARNING!")
					}
					element.appendChild(child)
				}
				else if(typeof child.length === 'number') {
					addChildren(element, child, 0)
				}
				else {
					addAttributesTo(element, child)
				}
			}
			break
			// nulls are disregarded
		case 'undefined':
			// undefineds are disregarded
			break
		case 'string':
		case 'number':
		case 'boolean':
			element.appendChild(doc.createTextNode(child))
			break
		default:
			throw new Error('an unhandled element appending situation was found')
	}
}

// element factory
function element(name) {
	if(!name) {
		throw new Error('you must provide a tag name for the createable element')
	}

	const newNode = doc.createElement(name)
	addChildren(newNode, arguments, 1)

	return newNode
}

// attribute factory
function attribute(name, value) {
	const attr = doc.createAttribute(name, value) 
	attr.nodeValue = value
	return attr
}

// methods to create shorthand builders
function createEl(name) { 
	return function() { return element.apply(dom, [name, ...arguments]) }
}

function createAttr(name) { 
	return function(value) { return attribute(name, value) }
}

// data is a special case because it has an optional extension
function data(arg1, arg2) {
	if(arguments.length > 1) {
		return attribute('data-' + arg1, arg2) 
	}
	return attribute('data', arg1)
}


const dom = {
	element,
	text: function(txt) { return doc.createTextNode(txt) },
	attribute,

	// element factories
	html: createEl('html'),
	body: createEl('body'),
	div: createEl('div'),
	span: createEl('span'),
	applet: createEl('applet'),
	object: createEl('object'),
	iframe: createEl('iframe'),
	h1: createEl('h1'),
	h2: createEl('h2'),
	h3: createEl('h3'),
	h4: createEl('h4'),
	h5: createEl('h5'),
	h6: createEl('h6'),
	p: createEl('p'),
	blockquote: createEl('blockquote'),
	pre: createEl('pre'),
	a: createEl('a'),
	abbr: createEl('abbr'),
	acronym: createEl('acronym'),
	address: createEl('address'),
	big: createEl('big'),
	cite: createEl('cite'),
	code: createEl('code'),
	del: createEl('del'),
	dfn: createEl('dfn'),
	em: createEl('em'),
	img: createEl('img'),
	ins: createEl('ins'),
	kbd: createEl('kbd'),
	q: createEl('q'),
	s: createEl('s'),
	samp: createEl('samp'),
	small: createEl('small'),
	strike: createEl('strike'),
	strong: createEl('strong'),
	sub: createEl('sub'),
	sup: createEl('sup'),
	tt: createEl('tt'),
	varAttr: createEl('var'),
	b: createEl('b'),
	u: createEl('u'),
	i: createEl('i'),
	center: createEl('center'),
	dl: createEl('dl'),
	dt: createEl('dt'),
	dd: createEl('dd'),
	ol: createEl('ol'),
	ul: createEl('ul'),
	li: createEl('li'),
	fieldset: createEl('fieldset'),
	form: createEl('form'),
	label: createEl('label'),
	legend: createEl('legend'),
	table: createEl('table'),
	caption: createEl('caption'),
	tbody: createEl('tbody'),
	tfoot: createEl('tfoot'),
	thead: createEl('thead'),
	tr: createEl('tr'),
	th: createEl('th'),
	td: createEl('td'),
	article: createEl('article'),
	aside: createEl('aside'),
	canvas: createEl('canvas'),
	details: createEl('details'),
	embed: createEl('embed'),
	figure: createEl('figure'),
	figcaption: createEl('figcaption'),
	footer: createEl('footer'),
	header: createEl('header'),
	hgroup: createEl('hgroup'),
	menu: createEl('menu'),
	nav: createEl('nav'),
	output: createEl('output'),
	ruby: createEl('ruby'),
	section: createEl('section'),
	summary: createEl('summary'),
	time: createEl('time'),
	mark: createEl('mark'),
	audio: createEl('audio'),
	video: createEl('video'),

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
	citeAttr: createAttr('cite'),
	classAttr: createAttr('class'),
	codeAttr: createAttr('code'),
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
	defaultAttr: createAttr('default'),
	defer: createAttr('defer'),
	dir: createAttr('dir'),
	dirname: createAttr('dirname'),
	disabled: createAttr('disabled'),
	download: createAttr('download'),
	draggable: createAttr('draggable'),
	dropzone: createAttr('dropzone'),
	enctype: createAttr('enctype'),
	forAttr: createAttr('for'),
	formAttr: createAttr('form'),
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
	labelAttr: createAttr('label'),
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
	spanAttr: createAttr('span'),
	spellcheck: createAttr('spellcheck'),
	src: createAttr('src'),
	srcdoc: createAttr('srcdoc'),
	srclang: createAttr('srclang'),
	srcset: createAttr('srcset'),
	start: createAttr('start'),
	step: createAttr('step'),
	style: createAttr('style'),
	summaryAttr: createAttr('summary'),
	tabindex: createAttr('tabindex'),
	target: createAttr('target'),
	title: createAttr('title'),
	type: createAttr('type'),
	usemap: createAttr('usemap'),
	value: createAttr('value'),
	width: createAttr('width'),
	wrap: createAttr('wrap')
}

dom.createElement = dom.element

module.exports = dom
