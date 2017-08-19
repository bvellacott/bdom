const expect = require('expect.js')

// set global document if case the tests arent run in the browser
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = (new JSDOM(`...`));
const doc = window.document
global.window = window

const { element, attribute, text } = tool = require('..')

describe('element builder', () => {

  it('no name throws error', () => {
    let exceptionThrown = false
    try {
    	element()
    } catch(e) {
    	exceptionThrown = true
    }
    expect(exceptionThrown).to.eql(true)
  })

  it('only name - no children', () => {
    const link = element('a')
    expect(link.nodeName).to.eql('A')
  })

  it('set attributes', () => {
    const link = element('a', { string: 'string', number: 1, boolean: true })
    
    expect(link.getAttribute('string')).to.equal('string')
    expect(link.getAttribute('number')).to.equal('1')
    expect(link.getAttribute('boolean')).to.equal('true')
  })

  it('add explicit attributes', () => {
  	const attr1 = doc.createAttribute('id')
  	const attr2 = doc.createAttribute('class')
  	attr1.value = 'a link' 
  	attr2.value = 'a beauty' 

    const link = element('a', attr1, attr2)
    
		expect(link.getAttribute('id')).to.equal('a link')    
		expect(link.getAttribute('class')).to.equal('a beauty')    
  })

  it('add child elements', () => {
    const link = element('a', doc.createElement('span'), doc.createElement('i'))
    
		expect(link.getElementsByTagName('span').length).to.equal(1)    
		expect(link.getElementsByTagName('i').length).to.equal(1)    
  })

  it('add text nodes', () => {
    const link = element('a', 
    	doc.createTextNode('what a wonderful link'), 
    	doc.createTextNode(" - isn't it?"))
    
		expect(link.text).to.equal("what a wonderful link - isn't it?")    
  })

  it('other nodes show a warning', () => {
  	let warning

  	const realLogger = global.console.log
  	global.console.log = (warn) => warning = warn

    const link = element('a', doc.createComment('comcomcomcomcomc...'))

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

    const link = element('a', 
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
	it('html', () => { expect(tool.html().nodeName).to.equal('HTML') })
	it('body', () => { expect(tool.body().nodeName).to.equal('BODY') })
	it('div', () => { expect(tool.div().nodeName).to.equal('DIV') })
	it('span', () => { expect(tool.span().nodeName).to.equal('SPAN') })
	it('applet', () => { expect(tool.applet().nodeName).to.equal('APPLET') })
	it('object', () => { expect(tool.object().nodeName).to.equal('OBJECT') })
	it('iframe', () => { expect(tool.iframe().nodeName).to.equal('IFRAME') })
	it('h1', () => { expect(tool.h1().nodeName).to.equal('H1') })
	it('h2', () => { expect(tool.h2().nodeName).to.equal('H2') })
	it('h3', () => { expect(tool.h3().nodeName).to.equal('H3') })
	it('h4', () => { expect(tool.h4().nodeName).to.equal('H4') })
	it('h5', () => { expect(tool.h5().nodeName).to.equal('H5') })
	it('h6', () => { expect(tool.h6().nodeName).to.equal('H6') })
	it('p', () => { expect(tool.p().nodeName).to.equal('P') })
	it('blockquote', () => { expect(tool.blockquote().nodeName).to.equal('BLOCKQUOTE') })
	it('pre', () => { expect(tool.pre().nodeName).to.equal('PRE') })
	it('a', () => { expect(tool.a().nodeName).to.equal('A') })
	it('abbr', () => { expect(tool.abbr().nodeName).to.equal('ABBR') })
	it('acronym', () => { expect(tool.acronym().nodeName).to.equal('ACRONYM') })
	it('address', () => { expect(tool.address().nodeName).to.equal('ADDRESS') })
	it('big', () => { expect(tool.big().nodeName).to.equal('BIG') })
	it('cite', () => { expect(tool.cite().nodeName).to.equal('CITE') })
	it('code', () => { expect(tool.code().nodeName).to.equal('CODE') })
	it('del', () => { expect(tool.del().nodeName).to.equal('DEL') })
	it('dfn', () => { expect(tool.dfn().nodeName).to.equal('DFN') })
	it('em', () => { expect(tool.em().nodeName).to.equal('EM') })
	it('img', () => { expect(tool.img().nodeName).to.equal('IMG') })
	it('ins', () => { expect(tool.ins().nodeName).to.equal('INS') })
	it('kbd', () => { expect(tool.kbd().nodeName).to.equal('KBD') })
	it('q', () => { expect(tool.q().nodeName).to.equal('Q') })
	it('s', () => { expect(tool.s().nodeName).to.equal('S') })
	it('samp', () => { expect(tool.samp().nodeName).to.equal('SAMP') })
	it('small', () => { expect(tool.small().nodeName).to.equal('SMALL') })
	it('strike', () => { expect(tool.strike().nodeName).to.equal('STRIKE') })
	it('strong', () => { expect(tool.strong().nodeName).to.equal('STRONG') })
	it('sub', () => { expect(tool.sub().nodeName).to.equal('SUB') })
	it('sup', () => { expect(tool.sup().nodeName).to.equal('SUP') })
	it('tt', () => { expect(tool.tt().nodeName).to.equal('TT') })
	it('varAttr', () => { expect(tool.varAttr().nodeName).to.equal('VAR') })
	it('b', () => { expect(tool.b().nodeName).to.equal('B') })
	it('u', () => { expect(tool.u().nodeName).to.equal('U') })
	it('i', () => { expect(tool.i().nodeName).to.equal('I') })
	it('center', () => { expect(tool.center().nodeName).to.equal('CENTER') })
	it('dl', () => { expect(tool.dl().nodeName).to.equal('DL') })
	it('dt', () => { expect(tool.dt().nodeName).to.equal('DT') })
	it('dd', () => { expect(tool.dd().nodeName).to.equal('DD') })
	it('ol', () => { expect(tool.ol().nodeName).to.equal('OL') })
	it('ul', () => { expect(tool.ul().nodeName).to.equal('UL') })
	it('li', () => { expect(tool.li().nodeName).to.equal('LI') })
	it('fieldset', () => { expect(tool.fieldset().nodeName).to.equal('FIELDSET') })
	it('form', () => { expect(tool.form().nodeName).to.equal('FORM') })
	it('label', () => { expect(tool.label().nodeName).to.equal('LABEL') })
	it('legend', () => { expect(tool.legend().nodeName).to.equal('LEGEND') })
	it('table', () => { expect(tool.table().nodeName).to.equal('TABLE') })
	it('caption', () => { expect(tool.caption().nodeName).to.equal('CAPTION') })
	it('tbody', () => { expect(tool.tbody().nodeName).to.equal('TBODY') })
	it('tfoot', () => { expect(tool.tfoot().nodeName).to.equal('TFOOT') })
	it('thead', () => { expect(tool.thead().nodeName).to.equal('THEAD') })
	it('tr', () => { expect(tool.tr().nodeName).to.equal('TR') })
	it('th', () => { expect(tool.th().nodeName).to.equal('TH') })
	it('td', () => { expect(tool.td().nodeName).to.equal('TD') })
	it('article', () => { expect(tool.article().nodeName).to.equal('ARTICLE') })
	it('aside', () => { expect(tool.aside().nodeName).to.equal('ASIDE') })
	it('canvas', () => { expect(tool.canvas().nodeName).to.equal('CANVAS') })
	it('details', () => { expect(tool.details().nodeName).to.equal('DETAILS') })
	it('embed', () => { expect(tool.embed().nodeName).to.equal('EMBED') })
	it('figure', () => { expect(tool.figure().nodeName).to.equal('FIGURE') })
	it('figcaption', () => { expect(tool.figcaption().nodeName).to.equal('FIGCAPTION') })
	it('footer', () => { expect(tool.footer().nodeName).to.equal('FOOTER') })
	it('header', () => { expect(tool.header().nodeName).to.equal('HEADER') })
	it('hgroup', () => { expect(tool.hgroup().nodeName).to.equal('HGROUP') })
	it('menu', () => { expect(tool.menu().nodeName).to.equal('MENU') })
	it('nav', () => { expect(tool.nav().nodeName).to.equal('NAV') })
	it('output', () => { expect(tool.output().nodeName).to.equal('OUTPUT') })
	it('ruby', () => { expect(tool.ruby().nodeName).to.equal('RUBY') })
	it('section', () => { expect(tool.section().nodeName).to.equal('SECTION') })
	it('summary', () => { expect(tool.summary().nodeName).to.equal('SUMMARY') })
	it('time', () => { expect(tool.time().nodeName).to.equal('TIME') })
	it('mark', () => { expect(tool.mark().nodeName).to.equal('MARK') })
	it('audio', () => { expect(tool.audio().nodeName).to.equal('AUDIO') })
	it('video', () => { expect(tool.video().nodeName).to.equal('VIDEO') })
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
	it('citeAttr', () => { expect(tool.citeAttr().nodeName).to.equal('cite') })
	it('classAttr', () => { expect(tool.classAttr().nodeName).to.equal('class') })
	it('codeAttr', () => { expect(tool.codeAttr().nodeName).to.equal('code') })
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
	it('defaultAttr', () => { expect(tool.defaultAttr().nodeName).to.equal('default') })
	it('defer', () => { expect(tool.defer().nodeName).to.equal('defer') })
	it('dir', () => { expect(tool.dir().nodeName).to.equal('dir') })
	it('dirname', () => { expect(tool.dirname().nodeName).to.equal('dirname') })
	it('disabled', () => { expect(tool.disabled().nodeName).to.equal('disabled') })
	it('download', () => { expect(tool.download().nodeName).to.equal('download') })
	it('draggable', () => { expect(tool.draggable().nodeName).to.equal('draggable') })
	it('dropzone', () => { expect(tool.dropzone().nodeName).to.equal('dropzone') })
	it('enctype', () => { expect(tool.enctype().nodeName).to.equal('enctype') })
	it('forAttr', () => { expect(tool.forAttr().nodeName).to.equal('for') })
	it('formAttr', () => { expect(tool.formAttr().nodeName).to.equal('form') })
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
	it('labelAttr', () => { expect(tool.labelAttr().nodeName).to.equal('label') })
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
	it('spanAttr', () => { expect(tool.spanAttr().nodeName).to.equal('span') })
	it('spellcheck', () => { expect(tool.spellcheck().nodeName).to.equal('spellcheck') })
	it('src', () => { expect(tool.src().nodeName).to.equal('src') })
	it('srcdoc', () => { expect(tool.srcdoc().nodeName).to.equal('srcdoc') })
	it('srclang', () => { expect(tool.srclang().nodeName).to.equal('srclang') })
	it('srcset', () => { expect(tool.srcset().nodeName).to.equal('srcset') })
	it('start', () => { expect(tool.start().nodeName).to.equal('start') })
	it('step', () => { expect(tool.step().nodeName).to.equal('step') })
	it('style', () => { expect(tool.style().nodeName).to.equal('style') })
	it('summaryAttr', () => { expect(tool.summaryAttr().nodeName).to.equal('summary') })
	it('tabindex', () => { expect(tool.tabindex().nodeName).to.equal('tabindex') })
	it('target', () => { expect(tool.target().nodeName).to.equal('target') })
	it('title', () => { expect(tool.title().nodeName).to.equal('title') })
	it('type', () => { expect(tool.type().nodeName).to.equal('type') })
	it('usemap', () => { expect(tool.usemap().nodeName).to.equal('usemap') })
	it('value', () => { expect(tool.value().nodeName).to.equal('value') })
	it('width', () => { expect(tool.width().nodeName).to.equal('width') })
	it('wrap', () => { expect(tool.wrap().nodeName).to.equal('wrap') })
})

