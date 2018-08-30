const BASE_DIR = 'test/fixtures'

const INTEGRITY_STYLE_1 =
  'sha384-OHOO3P0V8mBnd24oTanI8YyewsyftnJMiEZs6HkCBi+OwqzBuXhdF/2SkMK4BIGZ'

const INTEGRITY_STYLE_1_SHA512 =
  'sha512-nhlj/W5JmcntmU2ClZyFnvQLswVkJN3z5FO68G9OcsrgbW6Jqh36lObgZ6BVpcWHFeDHM1vrvAqgMXkveq+/9Q=='

const INTEGRITY_SCRIPT_1 =
  'sha384-Hu7SkqY3fsGrlxpcjDcNGNyTFizFfXWWga1eZACsk/MGVg1IUN/4VtNQb+fi7hrd'

const INTEGRITY_SCRIPT_2 =
  'sha384-hp5tnaw8RT0zq5S2OLkmXpNprpaLoCp2zPGa5I4/Ly+OSYWS8ZdVWquhSx/X0dSL'

const MARKUP = `
  <html>
    <head>
      <link rel="stylesheet" href="/style1.css" />
      <link rel="stylesheet" href="https://some.cdn/style-ext-1.css" />
      <link rel="stylesheet" href="http://some.cdn/style-ext-2.css" />
      <link rel="stylesheet" href="//some.cdn/style-ext-3.css" />
      <script src="/script1.js"></script>
      <script src="https://some.cdn/script-ext-1.js"></script>
      <script src="http://some.cdn/script-ext-2.js"></script>
    </head>
    <body>
      <p>hello</p>
      <script src="/script2.js"></script>
      <script src="//some.cdn/script-ext-3.js"></script>
    </body>
  </html>
`

module.exports = {
  BASE_DIR,
  INTEGRITY_STYLE_1,
  INTEGRITY_STYLE_1_SHA512,
  INTEGRITY_SCRIPT_1,
  INTEGRITY_SCRIPT_2,
  MARKUP
}
