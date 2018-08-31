#!/usr/bin/env node

// node dependencies
const fs = require('fs')
const path = require('path')

// external dependencies
const program = require('commander')

// local dependencies
const pkg = require('../package.json')
const srify = require('.')

program
  .version(pkg.version, '-v, --version')
  .arguments('<file>')
  .description(
    'Adds computed `integrity` attributes to same-domain external ' +
      'script and stylesheet tags on html files.'
  )
  .option(
    '-a, --algorithm <value>',
    'specify hashing algorithm (default: sha384)'
  )
  .option('-d, --basedir <value>', 'specify asset lookup base directory')
  .option('--noscript', 'do not process script tags', false)
  .option('--nostyle', 'do not process stylesheet link tags', false)
  .action((file, options) => {
    let markup, result
    try {
      markup = fs.readFileSync(file).toString()
    } catch (error) {
      process.stderr.write(`\n  error: cannot open file '${file}'\n\n`)
      process.exit(1)
    }
    try {
      result = srify(markup, {
        style: !options.nostyle,
        script: !options.noscript,
        algorithm: options.algorithm,
        baseDir: options.basedir || path.dirname(file)
      })
      process.stdout.write(result + '\n')
    } catch (error) {
      process.stderr.write(
        `\n  error: processing failed (${error.message})\n\n`
      )
      process.exit(1)
    }
  })

if (!process.argv.slice(2).length) program.help()

program.parse(process.argv)
