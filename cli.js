#!/usr/bin/env node
'use strict'
const cac = require('cac')
const main = require('./')

const cli = cac()

cli.command('*', 'My Default Command', input => {
  main(input[0]).then(res => console.log(res)).catch(e => {
    console.log(e)
    process.exit(1)
  })
})

cli.parse()
