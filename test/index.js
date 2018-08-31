// external dependencies
const test = require('tape')
const _cheerio = require('cheerio')
const _htmlLooksLike = require('html-looks-like')

// local dependencies
const {
  MARKUP,
  INTEGRITY_STYLE,
  INTEGRITY_STYLE_SHA512,
  INTEGRITY_SCRIPT,
  BASE_DIR
} = require('./fixtures')

// module under test
const srify = require('../src')

// XXX: monkey patch to handle problematic <noscript> tags,
//      see https://bit.ly/2wD2XNr
const { cheerio, htmlLooksLike } = (() => {
  const tweak = markup => markup.replace(/<\/?noscript>/g, '')
  const cheerioLoad = _cheerio.load.bind(_cheerio)
  return {
    htmlLooksLike: (() => {
      const f = (src, tmpl) => _htmlLooksLike(tweak(src), tweak(tmpl))
      f.bool = (src, tmpl) => _htmlLooksLike.bool(tweak(src), tweak(tmpl))
      return f
    })(),
    cheerio: { load: markup => cheerioLoad(tweak(markup)) }
  }
})()

test('is a function', t => {
  t.plan(1)
  t.equal(typeof srify, 'function', 'should be a function')
})

test('fails when `markup` is missing', t => {
  t.plan(1)
  t.throws(
    () => srify(),
    /markup must be a string/,
    'should throw `markup must be a string` error'
  )
})

test('sets integrity attribute on link and script tags', t => {
  t.plan(5)
  const output = srify(MARKUP, { baseDir: BASE_DIR })
  const $ = cheerio.load(output)
  const $link = $('link[integrity]')
  const $script = $('script[integrity]')
  t.ok(htmlLooksLike.bool(output, MARKUP), 'should not remove any markup')
  t.equal($link.length, 2, 'there should be two link tags with integrity')
  t.equal(
    $link.filter('[href="/style1.css"]').attr('integrity'),
    INTEGRITY_STYLE,
    'integrity value of style should match'
  )
  t.equal($script.length, 2, 'there should be two script tags with integrity')
  t.equal(
    $script.filter('[src="/script1.js"]').attr('integrity'),
    INTEGRITY_SCRIPT,
    'integrity value of 1st script should match'
  )
})

test('just returns `markup` if `script` & `style` option flags are off', t => {
  t.plan(1)
  htmlLooksLike(srify(MARKUP, { script: false, style: false }), MARKUP)
  t.pass('should return wrapped/fixed/reformatted `markup`')
})

test('sets integrity with different `algorithm` if option is set', t => {
  t.plan(1)
  const output = srify(MARKUP, {
    style: true,
    baseDir: BASE_DIR,
    algorithm: 'sha512'
  })
  const $ = cheerio.load(output)
  t.equal(
    $('link[integrity]').attr('integrity'),
    INTEGRITY_STYLE_SHA512,
    'integrity value should match sha512 version of style1.css'
  )
})
