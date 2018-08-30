// node dependencies
const path = require('path')
const fs = require('fs')

// external dependencies
const cheerio = require('cheerio')
const ssri = require('ssri')

// helper
const isExternalUrl = url => /^(https?:)?\/\//.test(url)

module.exports = (
  markup,
  { style = false, script = false, baseDir = '', algorithm = 'sha384' } = {}
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
