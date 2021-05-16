#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yaml = require('yaml');
const comments = require('./index.js');

const argv = require('tiny-opts-parser')(process.argv);
if (argv.c) argv.comments = argv.c;

if (argv._.length<3) {
    console.log('Usage: j2y {infile} {outfile}');
}
else {
    const s = fs.readFileSync(argv._[2],'utf8');
    try {
      //const obj = yaml.parse(s);
      const obj = JSON.parse(s);
      fs.writeFileSync(argv._[3],argv.comments ? comments.stringifyWithComments(obj) : yaml.stringify(obj),'utf8');
    }
    catch (ex) {
      console.warn(ex.message);
    }
}

