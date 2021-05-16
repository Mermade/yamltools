const yaml = require('yaml'); // v2.0.0-1
const assert = require('assert');

describe('wrappers',function(){

  it('should unwrap',function(){

    const o = { enum: [] };
    o.enum.push(new String('mystring'));
    o.bool = Boolean(false);
    o.num = Number(123);

    const y = yaml.stringify(o);
    assert.equal(y,`enum:\n  - mystring\nbool: false\nnum: 123\n`);
  });
});

