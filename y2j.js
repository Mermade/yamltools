#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yaml = require('yaml');
const comments = require('./index.js');

const argv = require('tiny-opts-parser')(process.argv);
if (argv.c) argv.comments = argv.c;

if (argv._.length<3) {
    console.log('Usage: y2j {infile} {outfile}');
}
else {
    const s = fs.readFileSync(argv._[2],'utf8');
    let obj;
    try {
      if (argv.comments) obj = comments.parseWithComments(s)
      else obj = yaml.parse(s);
    }
    catch (ex) {
      console.warn(ex.message);
    }
    fs.writeFileSync(argv._[3],JSON.stringify(obj,null,2),'utf8');
}

