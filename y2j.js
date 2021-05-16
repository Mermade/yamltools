#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yaml = require('yaml');
const comments = require('./index.js');

const argv = require('tiny-opts-parser')(process.argv);
if (argv.c) argv.comments = argv.c;
if (argv.m) argv.minify = argv.m;

if (argv._.length<3) {
    console.log('Usage: y2j [--comments|-c] [--minify|-m} [--] {infile} {outfile}');
}
else {
    const s = fs.readFileSync(argv._[2],'utf8');
    try {
      let obj;
      if (argv.comments) obj = comments.parseWithComments(s)
      else obj = yaml.parse(s);
      fs.writeFileSync(argv._[3],JSON.stringify(obj,null,argv.minify ? 0 : 2),'utf8');
    }
    catch (ex) {
      console.warn(ex.message);
    }
}

