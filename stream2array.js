'use strict';

const fs = require('fs');

const s = fs.readFileSync(process.argv[2],'utf8');
const lines = s.split('\r').join('').split('\n');
const a = [];
for (let line of lines) {
  if (line.trim()) {
    try {
      const j = JSON.parse(line);
      a.push(j);
    }
    catch (ex) {}
  }
}

if (process.argv[3]) {
  fs.writeFileSync(process.argv[3],JSON.stringify(a,null,2),'utf8');
}
else {
  console.log(JSON.stringify(a,null,2));
}
