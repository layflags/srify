// node dependencies
const fs = require('fs')

const BASE_DIR = 'test/fixtures'

const INTEGRITY_STYLE_1 =
  'sha384-OHOO3P0V8mBnd24oTanI8YyewsyftnJMiEZs6HkCBi+OwqzBuXhdF/2SkMK4BIGZ'

const INTEGRITY_STYLE_1_SHA512 =
  'sha512-nhlj/W5JmcntmU2ClZyFnvQLswVkJN3z5FO68G9OcsrgbW6Jqh36lObgZ6BVpcWHFeDHM1vrvAqgMXkveq+/9Q=='

const INTEGRITY_SCRIPT_1 =
  'sha384-Hu7SkqY3fsGrlxpcjDcNGNyTFizFfXWWga1eZACsk/MGVg1IUN/4VtNQb+fi7hrd'

const INTEGRITY_SCRIPT_2 =
  'sha384-hp5tnaw8RT0zq5S2OLkmXpNprpaLoCp2zPGa5I4/Ly+OSYWS8ZdVWquhSx/X0dSL'

const INTEGRITY_EMPTY_FILE =
  'sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb'

const MARKUP = fs.readFileSync('test/fixtures/markup.html').toString()

module.exports = {
  BASE_DIR,
  INTEGRITY_STYLE_1,
  INTEGRITY_STYLE_1_SHA512,
  INTEGRITY_SCRIPT_1,
  INTEGRITY_SCRIPT_2,
  INTEGRITY_EMPTY_FILE,
  MARKUP
}
