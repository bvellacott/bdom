# bdom - jsx compatible shorthand tool for creating actual dom elements

## installation
```bash
npm install bdom
```

### usage
```js
const dom = require('bdom')
const { h1, text, figcaption, style } = dom

const txt = text('BAR')

const title = 
h1(
    txt, 
    figcaption( style('background-color: orange; font-size:0.5rem;'), 'a friend of foo' )
)

document.findElementsByTagName('body').appendChild(title)
```

...and the same by replacing React and in jsx

```js
const dom = require('bdom')
const React = dom

const txt = text('BAR')

const title = 
<h1>
    {txt}
    <figcaption style="background-color: orange; font-size:0.5rem;">a friend of foo</figcaption>
</h1>

document.findElementsByTagName('body').appendChild(title)
```

## tests
npm test

##  build
npm run build