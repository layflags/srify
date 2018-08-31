// node dependencies
const path = require('path')
const fs = require('fs')

// external dependencies
const _cheerio = require('cheerio')
const ssri = require('ssri')

// helper
const isExternalUrl = url => /^(https?:)?\/\//.test(url)

// XXX: monkey patch to handle problematic <noscript> tags,
//      see https://bit.ly/2wD2XNr
const cheerio = (() => {
  const tweak = markup => markup.replace(/(<\/?)noscript>/g, '$1no-script>')
  const untweak = markup => markup.replace(/(<\/?)no-script>/g, '$1noscript>')
  const cheerioLoad = _cheerio.load.bind(_cheerio)
  return {
    load: markup => {
      const $ = cheerioLoad(tweak(markup))
      const $html = $.html.bind($)
      $.html = (...args) => untweak($html(...args))
      return $
    }
  }
})()

module.exports = (
  markup,
  { style = true, script = true, baseDir = '', algorithm = 'sha384' } = {}
) => {
  if (typeof markup !== 'string') throw Error('markup must be a string')

  const $ = cheerio.load(markup)
  const setIntegrityAttribute = (tagSelector, urlAttributeName) => {
    $(tagSelector).each((i, elem) => {
      const url = $(elem).attr(urlAttributeName)
      if (!isExternalUrl(url)) {
        const filename = path.join(baseDir, url)
        const data = fs.readFileSync(filename)
        const integrity = ssri.stringify(
          ssri.fromData(data, { algorithms: [algorithm] })
        )
        $(elem).attr('integrity', integrity)
      }
    })
  }

  if (style) setIntegrityAttribute('link[rel="stylesheet"]', 'href')
  if (script) setIntegrityAttribute('script[src]', 'src')

  return $.html()
}
