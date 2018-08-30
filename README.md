# srify

Node.js script for adding `integrity` attributes to same domain `<script src>` and stylesheet `<link>` tags on html markup.

## Install

```
npm install srify
```

## Usage

```javascript
const srify = require('srify')

const markup = `
  <html>
    <head>
      <link rel="stylesheet" href="/style.css" />
      <link rel="stylesheet" href="https://some.cdn/style.css" />
      <script src="https://some.cdn/script.js"></script>
    </head>
    <body>
      <script src="/script.js"></script>
    </body>
  </html>
`
const markupSrified = srify(markup, {
  style: true,            // default: false
  script: true,           // default: false
  algorithm: 'sha384',    // default!
  baseDir: 'build/assets' // default: ''
})
console.log(markupSrified)
```

output:
```html
<html>
  <head>
    <link rel="stylesheet" href="/style.css" integrity="sha384-OHOO3P0V8mBnd24oTanI8YyewsyftnJMiEZs6HkCBi+OwqzBuXhdF/2SkMK4BIGZ" />
    <link rel="stylesheet" href="https://some.cdn/style.css" />
    <script src="https://some.cdn/script.js"></script>
  </head>
  <body>
    <script src="/script.js" integrity="sha384-Hu7SkqY3fsGrlxpcjDcNGNyTFizFfXWWga1eZACsk/MGVg1IUN/4VtNQb+fi7hrd"></script>
  </body>
</html>
```

## Test

```
npm test
```

## Change log

* `1.0.0`: initial release

## License

[MIT](LICENSE)
