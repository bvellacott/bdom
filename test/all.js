const expect = require('expect.js')

// set global document if case the tests arent run in the browser
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = (new JSDOM(`...`));
const doc = window.document
global.window = window

const { El, attribute, text } = tool = require('..')

describe('element builder', () => {

  it('no name throws error', () => {
    let exceptionThrown = false
    try {
    	El()
    } catch(e) {
    	exceptionThrown = true
    }
    expect(exceptionThrown).to.eql(true)
  })

  it('only name - no children', () => {
    const link = El('a')
    expect(link.nodeName).to.eql('A')
  })

  it('set attributes', () => {
    const link = El('a', { string: 'string', number: 1, boolean: true })
    
    expect(link.getAttribute('string')).to.equal('string')
    expect(link.getAttribute('number')).to.equal('1')
    expect(link.getAttribute('boolean')).to.equal('true')
  })

  it('add explicit attributes', () => {
  	const attr1 = doc.createAttribute('id')
  	const attr2 = doc.createAttribute('class')
  	attr1.value = 'a link' 
  	attr2.value = 'a beauty' 

    const link = El('a', attr1, attr2)
    
		expect(link.getAttribute('id')).to.equal('a link')    
		expect(link.getAttribute('class')).to.equal('a beauty')    
  })

  it('add child elements', () => {
    const link = El('a', doc.createElement('span'), doc.createElement('i'))
    
		expect(link.getElementsByTagName('span').length).to.equal(1)    
		expect(link.getElementsByTagName('i').length).to.equal(1)    
  })

  it('add text nodes', () => {
    const link = El('a', 
    	doc.createTextNode('what a wonderful link'), 
    	doc.createTextNode(" - isn't it?"))
    
		expect(link.text).to.equal("what a wonderful link - isn't it?")    
  })

  it('array of children', () => {
  	const ary = [
			doc.createTextNode('what a wonderful link'), 
    	doc.createTextNode(" - isn't it?")
   	]

    const link = El('a', ary)
    
		expect(link.text).to.equal("what a wonderful link - isn't it?")    
  })

  it('other nodes show a warning', () => {
  	let warning

  	const realLogger = global.console.log
  	global.console.log = (warn) => warning = warn

    const link = El('a', doc.createComment('comcomcomcomcomc...'))

  	global.console.log = realLogger
    
		expect(warning).to.equal("!WARNING! - support for nodes" +
			" of type: 8 hasn\'t been tested - !WARNING!")    
  })

  it('add all in mixed order', () => {
  	let warning

  	const attr1 = doc.createAttribute('id')
  	const attr2 = doc.createAttribute('class')
  	attr1.value = 'a link' 
  	attr2.value = 'a beauty' 

  	const realLogger = global.console.log
  	global.console.log = (warn) => warning = warn

    const link = El('a', 
	    doc.createElement('span'), doc.createElement('i'),
    	{ string: 'string' },
    	doc.createTextNode('what a wonderful link'), 
    	{ number: 1 },
    	doc.createTextNode(" - isn't it?"),
    	{ boolean: true },
    	doc.createComment('comcomcomcomcomc...'),
    	attr1, 
    	attr2
    )
    
  	global.console.log = realLogger

    expect(link.getAttribute('string')).to.equal('string')
    expect(link.getAttribute('number')).to.equal('1')
    expect(link.getAttribute('boolean')).to.equal('true')
		expect(link.getAttribute('id')).to.equal('a link')    
		expect(link.getAttribute('class')).to.equal('a beauty')    
		expect(link.getElementsByTagName('span').length).to.equal(1)    
		expect(link.getElementsByTagName('i').length).to.equal(1)    
		expect(link.text).to.equal("what a wonderful link - isn't it?")    
		expect(warning).to.equal("!WARNING! - support for nodes" +
			" of type: 8 hasn\'t been tested - !WARNING!")    
  })


  it('add document fragment', () => {
  	let warning

  	const realLogger = global.console.log
  	global.console.log = (warn) => warning = warn

  	const fragment = doc.createDocumentFragment()
	  fragment.appendChild(doc.createElement('span'))
	  fragment.appendChild(doc.createElement('i'))
    fragment.appendChild(doc.createTextNode('what a wonderful link')) 
    fragment.appendChild(doc.createTextNode(" - isn't it?"))
    fragment.appendChild(doc.createComment('comcomcomcomcomc...'))

    const link = El('a', fragment)
    
  	global.console.log = realLogger

		expect(link.getElementsByTagName('span').length).to.equal(1)    
		expect(link.getElementsByTagName('i').length).to.equal(1)    
		expect(link.text).to.equal("what a wonderful link - isn't it?")    
		expect(warning).to.be(undefined)    
  })

})

describe('attribute builder', () => {
	it('create simple attribute', () => {
		// this directly utilises the dom api so testing needs to be minimal
		const attr = attribute('dude', 'seli')
		expect(attr.name).to.equal('dude')
		expect(attr.value).to.equal('seli')
	})
})

describe('text node builder', () => {
	it('create simple text node', () => {
		// this directly utilises the dom api so testing needs to be minimal
		const txt = text('some text')
		expect(txt.nodeValue).to.equal('some text')
	})
})

describe('element shorthand', () => {
	// the main builder has been tested, so only need to test that the right names apply
	it('html', () => { expect(tool.Html().nodeName).to.equal('HTML') })
	it('body', () => { expect(tool.Body().nodeName).to.equal('BODY') })
	it('div', () => { expect(tool.Div().nodeName).to.equal('DIV') })
	it('span', () => { expect(tool.Span().nodeName).to.equal('SPAN') })
	it('applet', () => { expect(tool.Applet().nodeName).to.equal('APPLET') })
	it('object', () => { expect(tool.Object().nodeName).to.equal('OBJECT') })
	it('iframe', () => { expect(tool.Iframe().nodeName).to.equal('IFRAME') })
	it('h1', () => { expect(tool.H1().nodeName).to.equal('H1') })
	it('h2', () => { expect(tool.H2().nodeName).to.equal('H2') })
	it('h3', () => { expect(tool.H3().nodeName).to.equal('H3') })
	it('h4', () => { expect(tool.H4().nodeName).to.equal('H4') })
	it('h5', () => { expect(tool.H5().nodeName).to.equal('H5') })
	it('h6', () => { expect(tool.H6().nodeName).to.equal('H6') })
	it('p', () => { expect(tool.P().nodeName).to.equal('P') })
	it('blockquote', () => { expect(tool.Blockquote().nodeName).to.equal('BLOCKQUOTE') })
	it('pre', () => { expect(tool.Pre().nodeName).to.equal('PRE') })
	it('a', () => { expect(tool.A().nodeName).to.equal('A') })
	it('abbr', () => { expect(tool.Abbr().nodeName).to.equal('ABBR') })
	it('acronym', () => { expect(tool.Acronym().nodeName).to.equal('ACRONYM') })
	it('address', () => { expect(tool.Address().nodeName).to.equal('ADDRESS') })
	it('big', () => { expect(tool.Big().nodeName).to.equal('BIG') })
	it('cite', () => { expect(tool.Cite().nodeName).to.equal('CITE') })
	it('code', () => { expect(tool.Code().nodeName).to.equal('CODE') })
	it('del', () => { expect(tool.Del().nodeName).to.equal('DEL') })
	it('dfn', () => { expect(tool.Dfn().nodeName).to.equal('DFN') })
	it('em', () => { expect(tool.Em().nodeName).to.equal('EM') })
	it('img', () => { expect(tool.Img().nodeName).to.equal('IMG') })
	it('ins', () => { expect(tool.Ins().nodeName).to.equal('INS') })
	it('kbd', () => { expect(tool.Kbd().nodeName).to.equal('KBD') })
	it('q', () => { expect(tool.Q().nodeName).to.equal('Q') })
	it('s', () => { expect(tool.S().nodeName).to.equal('S') })
	it('samp', () => { expect(tool.Samp().nodeName).to.equal('SAMP') })
	it('small', () => { expect(tool.Small().nodeName).to.equal('SMALL') })
	it('strike', () => { expect(tool.Strike().nodeName).to.equal('STRIKE') })
	it('strong', () => { expect(tool.Strong().nodeName).to.equal('STRONG') })
	it('sub', () => { expect(tool.Sub().nodeName).to.equal('SUB') })
	it('sup', () => { expect(tool.Sup().nodeName).to.equal('SUP') })
	it('tt', () => { expect(tool.Tt().nodeName).to.equal('TT') })
	it('var', () => { expect(tool.Var().nodeName).to.equal('VAR') })
	it('b', () => { expect(tool.B().nodeName).to.equal('B') })
	it('u', () => { expect(tool.U().nodeName).to.equal('U') })
	it('i', () => { expect(tool.I().nodeName).to.equal('I') })
	it('center', () => { expect(tool.Center().nodeName).to.equal('CENTER') })
	it('dl', () => { expect(tool.Dl().nodeName).to.equal('DL') })
	it('dt', () => { expect(tool.Dt().nodeName).to.equal('DT') })
	it('dd', () => { expect(tool.Dd().nodeName).to.equal('DD') })
	it('ol', () => { expect(tool.Ol().nodeName).to.equal('OL') })
	it('ul', () => { expect(tool.Ul().nodeName).to.equal('UL') })
	it('li', () => { expect(tool.Li().nodeName).to.equal('LI') })
	it('fieldset', () => { expect(tool.Fieldset().nodeName).to.equal('FIELDSET') })
	it('form', () => { expect(tool.Form().nodeName).to.equal('FORM') })
	it('label', () => { expect(tool.Label().nodeName).to.equal('LABEL') })
	it('legend', () => { expect(tool.Legend().nodeName).to.equal('LEGEND') })
	it('table', () => { expect(tool.Table().nodeName).to.equal('TABLE') })
	it('caption', () => { expect(tool.Caption().nodeName).to.equal('CAPTION') })
	it('tbody', () => { expect(tool.Tbody().nodeName).to.equal('TBODY') })
	it('tfoot', () => { expect(tool.Tfoot().nodeName).to.equal('TFOOT') })
	it('thead', () => { expect(tool.Thead().nodeName).to.equal('THEAD') })
	it('tr', () => { expect(tool.Tr().nodeName).to.equal('TR') })
	it('th', () => { expect(tool.Th().nodeName).to.equal('TH') })
	it('td', () => { expect(tool.Td().nodeName).to.equal('TD') })
	it('article', () => { expect(tool.Article().nodeName).to.equal('ARTICLE') })
	it('aside', () => { expect(tool.Aside().nodeName).to.equal('ASIDE') })
	it('canvas', () => { expect(tool.Canvas().nodeName).to.equal('CANVAS') })
	it('details', () => { expect(tool.Details().nodeName).to.equal('DETAILS') })
	it('embed', () => { expect(tool.Embed().nodeName).to.equal('EMBED') })
	it('figure', () => { expect(tool.Figure().nodeName).to.equal('FIGURE') })
	it('figcaption', () => { expect(tool.Figcaption().nodeName).to.equal('FIGCAPTION') })
	it('footer', () => { expect(tool.Footer().nodeName).to.equal('FOOTER') })
	it('header', () => { expect(tool.Header().nodeName).to.equal('HEADER') })
	it('hgroup', () => { expect(tool.Hgroup().nodeName).to.equal('HGROUP') })
	it('menu', () => { expect(tool.Menu().nodeName).to.equal('MENU') })
	it('nav', () => { expect(tool.Nav().nodeName).to.equal('NAV') })
	it('output', () => { expect(tool.Output().nodeName).to.equal('OUTPUT') })
	it('ruby', () => { expect(tool.Ruby().nodeName).to.equal('RUBY') })
	it('section', () => { expect(tool.Section().nodeName).to.equal('SECTION') })
	it('summary', () => { expect(tool.Summary().nodeName).to.equal('SUMMARY') })
	it('time', () => { expect(tool.Time().nodeName).to.equal('TIME') })
	it('mark', () => { expect(tool.Mark().nodeName).to.equal('MARK') })
	it('audio', () => { expect(tool.Audio().nodeName).to.equal('AUDIO') })
	it('video', () => { expect(tool.Video().nodeName).to.equal('VIDEO') })
})

describe('attribute shorthand', () => {
	it('accept', () => { expect(tool.accept().nodeName).to.equal('accept') })
	it('acceptCharset', () => { expect(tool.acceptCharset().nodeName).to.equal('accept-charset') })
	it('accesskey', () => { expect(tool.accesskey().nodeName).to.equal('accesskey') })
	it('action', () => { expect(tool.action().nodeName).to.equal('action') })
	it('align', () => { expect(tool.align().nodeName).to.equal('align') })
	it('alt', () => { expect(tool.alt().nodeName).to.equal('alt') })
	it('async', () => { expect(tool.async().nodeName).to.equal('async') })
	it('autocomplete', () => { expect(tool.autocomplete().nodeName).to.equal('autocomplete') })
	it('autofocus', () => { expect(tool.autofocus().nodeName).to.equal('autofocus') })
	it('autoplay', () => { expect(tool.autoplay().nodeName).to.equal('autoplay') })
	it('autosave', () => { expect(tool.autosave().nodeName).to.equal('autosave') })
	it('bgcolor', () => { expect(tool.bgcolor().nodeName).to.equal('bgcolor') })
	it('border', () => { expect(tool.border().nodeName).to.equal('border') })
	it('buffered', () => { expect(tool.buffered().nodeName).to.equal('buffered') })
	it('challenge', () => { expect(tool.challenge().nodeName).to.equal('challenge') })
	it('charset', () => { expect(tool.charset().nodeName).to.equal('charset') })
	it('checked', () => { expect(tool.checked().nodeName).to.equal('checked') })
	it('cite', () => { expect(tool.cite().nodeName).to.equal('cite') })
	it('class', () => { expect(tool.class().nodeName).to.equal('class') })
	it('code', () => { expect(tool.code().nodeName).to.equal('code') })
	it('codebase', () => { expect(tool.codebase().nodeName).to.equal('codebase') })
	it('color', () => { expect(tool.color().nodeName).to.equal('color') })
	it('cols', () => { expect(tool.cols().nodeName).to.equal('cols') })
	it('colspan', () => { expect(tool.colspan().nodeName).to.equal('colspan') })
	it('content', () => { expect(tool.content().nodeName).to.equal('content') })
	it('contenteditable', () => { expect(tool.contenteditable().nodeName).to.equal('contenteditable') })
	it('contextmenu', () => { expect(tool.contextmenu().nodeName).to.equal('contextmenu') })
	it('controls', () => { expect(tool.controls().nodeName).to.equal('controls') })
	it('coords', () => { expect(tool.coords().nodeName).to.equal('coords') })
	it('crossorigin', () => { expect(tool.crossorigin().nodeName).to.equal('crossorigin') })
	it('datetime', () => { expect(tool.datetime().nodeName).to.equal('datetime') })
	it('default', () => { expect(tool.default().nodeName).to.equal('default') })
	it('defer', () => { expect(tool.defer().nodeName).to.equal('defer') })
	it('dir', () => { expect(tool.dir().nodeName).to.equal('dir') })
	it('dirname', () => { expect(tool.dirname().nodeName).to.equal('dirname') })
	it('disabled', () => { expect(tool.disabled().nodeName).to.equal('disabled') })
	it('download', () => { expect(tool.download().nodeName).to.equal('download') })
	it('draggable', () => { expect(tool.draggable().nodeName).to.equal('draggable') })
	it('dropzone', () => { expect(tool.dropzone().nodeName).to.equal('dropzone') })
	it('enctype', () => { expect(tool.enctype().nodeName).to.equal('enctype') })
	it('for', () => { expect(tool.for().nodeName).to.equal('for') })
	it('form', () => { expect(tool.form().nodeName).to.equal('form') })
	it('formaction', () => { expect(tool.formaction().nodeName).to.equal('formaction') })
	it('headers', () => { expect(tool.headers().nodeName).to.equal('headers') })
	it('height', () => { expect(tool.height().nodeName).to.equal('height') })
	it('hidden', () => { expect(tool.hidden().nodeName).to.equal('hidden') })
	it('high', () => { expect(tool.high().nodeName).to.equal('high') })
	it('href', () => { expect(tool.href().nodeName).to.equal('href') })
	it('hreflang', () => { expect(tool.hreflang().nodeName).to.equal('hreflang') })
	it('httpEquiv', () => { expect(tool.httpEquiv().nodeName).to.equal('http-equiv') })
	it('icon', () => { expect(tool.icon().nodeName).to.equal('icon') })
	it('id', () => { expect(tool.id().nodeName).to.equal('id') })
	it('integrity', () => { expect(tool.integrity().nodeName).to.equal('integrity') })
	it('ismap', () => { expect(tool.ismap().nodeName).to.equal('ismap') })
	it('itemprop', () => { expect(tool.itemprop().nodeName).to.equal('itemprop') })
	it('keytype', () => { expect(tool.keytype().nodeName).to.equal('keytype') })
	it('kind', () => { expect(tool.kind().nodeName).to.equal('kind') })
	it('label', () => { expect(tool.label().nodeName).to.equal('label') })
	it('lang', () => { expect(tool.lang().nodeName).to.equal('lang') })
	it('language', () => { expect(tool.language().nodeName).to.equal('language') })
	it('list', () => { expect(tool.list().nodeName).to.equal('list') })
	it('loop', () => { expect(tool.loop().nodeName).to.equal('loop') })
	it('low', () => { expect(tool.low().nodeName).to.equal('low') })
	it('manifest', () => { expect(tool.manifest().nodeName).to.equal('manifest') })
	it('max', () => { expect(tool.max().nodeName).to.equal('max') })
	it('maxlength', () => { expect(tool.maxlength().nodeName).to.equal('maxlength') })
	it('minlength', () => { expect(tool.minlength().nodeName).to.equal('minlength') })
	it('media', () => { expect(tool.media().nodeName).to.equal('media') })
	it('method', () => { expect(tool.method().nodeName).to.equal('method') })
	it('min', () => { expect(tool.min().nodeName).to.equal('min') })
	it('multiple', () => { expect(tool.multiple().nodeName).to.equal('multiple') })
	it('muted', () => { expect(tool.muted().nodeName).to.equal('muted') })
	it('name', () => { expect(tool.name().nodeName).to.equal('name') })
	it('novalidate', () => { expect(tool.novalidate().nodeName).to.equal('novalidate') })
	it('open', () => { expect(tool.open().nodeName).to.equal('open') })
	it('optimum', () => { expect(tool.optimum().nodeName).to.equal('optimum') })
	it('pattern', () => { expect(tool.pattern().nodeName).to.equal('pattern') })
	it('ping', () => { expect(tool.ping().nodeName).to.equal('ping') })
	it('placeholder', () => { expect(tool.placeholder().nodeName).to.equal('placeholder') })
	it('poster', () => { expect(tool.poster().nodeName).to.equal('poster') })
	it('preload', () => { expect(tool.preload().nodeName).to.equal('preload') })
	it('radiogroup', () => { expect(tool.radiogroup().nodeName).to.equal('radiogroup') })
	it('readonly', () => { expect(tool.readonly().nodeName).to.equal('readonly') })
	it('rel', () => { expect(tool.rel().nodeName).to.equal('rel') })
	it('required', () => { expect(tool.required().nodeName).to.equal('required') })
	it('reversed', () => { expect(tool.reversed().nodeName).to.equal('reversed') })
	it('rows', () => { expect(tool.rows().nodeName).to.equal('rows') })
	it('rowspan', () => { expect(tool.rowspan().nodeName).to.equal('rowspan') })
	it('sandbox', () => { expect(tool.sandbox().nodeName).to.equal('sandbox') })
	it('scope', () => { expect(tool.scope().nodeName).to.equal('scope') })
	it('scoped', () => { expect(tool.scoped().nodeName).to.equal('scoped') })
	it('seamless', () => { expect(tool.seamless().nodeName).to.equal('seamless') })
	it('selected', () => { expect(tool.selected().nodeName).to.equal('selected') })
	it('shape', () => { expect(tool.shape().nodeName).to.equal('shape') })
	it('size', () => { expect(tool.size().nodeName).to.equal('size') })
	it('sizes', () => { expect(tool.sizes().nodeName).to.equal('sizes') })
	it('slot', () => { expect(tool.slot().nodeName).to.equal('slot') })
	it('span', () => { expect(tool.span().nodeName).to.equal('span') })
	it('spellcheck', () => { expect(tool.spellcheck().nodeName).to.equal('spellcheck') })
	it('src', () => { expect(tool.src().nodeName).to.equal('src') })
	it('srcdoc', () => { expect(tool.srcdoc().nodeName).to.equal('srcdoc') })
	it('srclang', () => { expect(tool.srclang().nodeName).to.equal('srclang') })
	it('srcset', () => { expect(tool.srcset().nodeName).to.equal('srcset') })
	it('start', () => { expect(tool.start().nodeName).to.equal('start') })
	it('step', () => { expect(tool.step().nodeName).to.equal('step') })
	it('style', () => { expect(tool.style().nodeName).to.equal('style') })
	it('summary', () => { expect(tool.summary().nodeName).to.equal('summary') })
	it('tabindex', () => { expect(tool.tabindex().nodeName).to.equal('tabindex') })
	it('target', () => { expect(tool.target().nodeName).to.equal('target') })
	it('title', () => { expect(tool.title().nodeName).to.equal('title') })
	it('type', () => { expect(tool.type().nodeName).to.equal('type') })
	it('usemap', () => { expect(tool.usemap().nodeName).to.equal('usemap') })
	it('value', () => { expect(tool.value().nodeName).to.equal('value') })
	it('width', () => { expect(tool.width().nodeName).to.equal('width') })
	it('wrap', () => { expect(tool.wrap().nodeName).to.equal('wrap') })
})

