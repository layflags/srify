// external dependencies
const test = require('tape')
const cheerio = require('cheerio')
const htmlLooksLike = require('html-looks-like')

// local dependencies
const {
  MARKUP,
  INTEGRITY_STYLE_1,
  INTEGRITY_STYLE_1_SHA512,
  INTEGRITY_SCRIPT_1,
  INTEGRITY_SCRIPT_2,
  BASE_DIR
} = require('./fixtures')

// module under test
const srify = require('../src')

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
  t.plan(6)
  const output = srify(MARKUP, { baseDir: BASE_DIR })
  const $ = cheerio.load(output)
  const $link = $('link[integrity]')
  const $script = $('script[integrity]')
  t.ok(htmlLooksLike.bool(output, MARKUP), 'should not remove any markup')
  t.equal($link.length, 1, 'there should be only one link tag with integrity')
  t.equal(
    $link.attr('integrity'),
    INTEGRITY_STYLE_1,
    'integrity value of style should match'
  )
  t.equal($script.length, 2, 'there should be two script tags with integrity')
  t.equal(
    $script.filter('[src="/script1.js"]').attr('integrity'),
    INTEGRITY_SCRIPT_1,
    'integrity value of 1st script should match'
  )
  t.equal(
    $script.filter('[src="/script2.js"]').attr('integrity'),
    INTEGRITY_SCRIPT_2,
    'integrity value of 2nd script should match'
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
    INTEGRITY_STYLE_1_SHA512,
    'integrity value should match sha512 version of style1.css'
  )
})
