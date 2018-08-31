// node dependencies
const { execSync } = require('child_process')

// external dependencies
const test = require('tape')

// local dependencies
const { version } = require('../package.json')
const {
  INTEGRITY_STYLE,
  INTEGRITY_STYLE_SHA512,
  INTEGRITY_EMPTY_FILE
} = require('./fixtures')

// helpers
const run = cmd => execSync(cmd, { stdio: ['pipe', 'pipe', null] }).toString()

test('[cli] renders help text for no arguments or option --help / -h', t => {
  t.plan(3)
  t.ok(
    run('src/cli.js').match(/Usage:/),
    'should render help text for no arguments'
  )
  t.ok(
    run('src/cli.js --help').match(/Usage:/),
    'should render help text for option --help'
  )
  t.ok(
    run('src/cli.js -h').match(/Usage:/),
    'should render help text for option -h'
  )
})

test('[cli] renders version for option --version / -v', t => {
  t.plan(2)
  t.ok(
    run('src/cli.js --version').includes(version),
    'should render version from package.json for option --version'
  )
  t.ok(
    run('src/cli.js -v').includes(version),
    'should render version from package.json for option -v'
  )
})

test('[cli] exits with error when file n/a', t => {
  t.plan(1)
  t.throws(
    () => run('src/cli.js foo.bar'),
    /cannot open file/,
    'should exit with `cannot open file`'
  )
})

test('[cli] renders integrity enriched markup for existing html file', t => {
  t.plan(2)
  t.notOk(
    run('cat test/fixtures/markup.html').match(/integrity=".+"/),
    'original markup should not have integrity attributes set'
  )
  t.ok(
    run('src/cli.js test/fixtures/markup.html').match(/integrity=".+"/),
    'processed markup should have integrity attributes set'
  )
})

test('[cli] renders integrity w/ different --algorithm if option is set', t => {
  t.plan(2)
  t.ok(
    run('src/cli.js test/fixtures/markup.html').includes(
      `integrity="${INTEGRITY_STYLE}"`
    ),
    'should set sha384 integrity for style1.css when using default algorithm'
  )
  t.ok(
    run('src/cli.js --algorithm=sha512 test/fixtures/markup.html').includes(
      `integrity="${INTEGRITY_STYLE_SHA512}"`
    ),
    'should set sha512 integrity for style1.css when using sha512 algorithm'
  )
})

test('[cli] loads assets from directory specified by option --basedir', t => {
  t.plan(1)
  t.ok(
    run(
      'src/cli.js --basedir=test/fixtures/empty test/fixtures/markup.html'
    ).includes(`integrity="${INTEGRITY_EMPTY_FILE}"`),
    'should set integrity of empty file for empty fixtures'
  )
})
