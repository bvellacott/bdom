# bdom - jsx compatible shorthand tool for creating actual dom elements

This is useful, because it lets you create dom elements in a readable way and get references to the dom elements that you want to modify.

## installation
```bash
npm install bdom
```

### usage
```js
const dom = require('bdom')
const { H1, text, Svg, Link, Text, Figcaption, style } = dom // capital elements attributes and text lower case

const txt = text('BAR')

const title = 
  H1(
    txt, 
    Figcaption( style('background-color: orange; font-size:0.5rem;'), 'a friend of foo' ),
    Svg({ width: '100', height: '100' },
      Link({ href: "https://google.com" },
        Text({ x: "10", y: "25" }, 'google'))))
)

let secs = 0
const intervalRef = setInterval(() => { 
    txt.nodeValue = 'BAR-' + (secs += 1)
}, 1000)

document.findElementsByTagName('body')[0].appendChild(title)
```

...and the same by replacing React and in jsx

```js
const dom = require('bdom')
const { text } = dom
const React = dom

const txt = text('BAR')

const title = 
<h1>
    {txt}
    <figcaption style="background-color: orange; font-size:0.5rem;">a friend of foo</figcaption>
    <svg width="100" height="100" >
        <link href="https://google.com">
            <text x="10" y="25" >google</text>
        </link>
    </svg>
</h1>

let secs = 0
const intervalRef = setInterval(() => { 
    txt.nodeValue = 'BAR-' + (secs += 1)
}, 1000)

document.findElementsByTagName('body')[0].appendChild(title)
```

## tests
npm test

##  build
npm run build