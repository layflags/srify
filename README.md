<a href="https://www.buymeacoffee.com/layflags" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

# srify

Adds computed `integrity` attributes to same domain external script and stylesheet tags on html markup.

## Install

```
npm install srify
```

## Usage

### CLI

```
srify build/index.html
srify --help
```

### Node.js

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
  style: true,            // default
  script: true,           // default
  algorithm: 'sha384',    // default
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

* `2.0.3`: fix `<noscript>` regex
* `2.0.2`: properly handle `<link>` tags inside `<noscript>`
* ~~`2.0.1`: xxxxxxxx xxxxxx xxxx xxxxxx~~ *(removed)*
* `2.0.0`: add CLI command, change options defaults
* `1.0.1`: fix main entry in `package.json`
* `1.0.0`: initial release

## License

[MIT](LICENSE)
