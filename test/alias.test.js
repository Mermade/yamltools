'use strict';

const assert = require('assert');

const util = require('node:util');
const tools = require('../index.js');

const input = `
hello: &a
  world:
    message: Hello, world
outputs:
  *a
`

describe('Aliases', () => {
  it('should parse and return aliases', () => {
    const result = tools.parseWithAliases(input);
    assert.deepEqual(result.data, {
        hello: {
          world: {
            message: 'Hello, world'
          }
        },
        outputs: {
          world: {
            message: 'Hello, world'
          }
        }
    });
    const aliases = new Map();
    aliases.set('a', { 'world': { 'message': 'Hello, world' }});
    assert.deepEqual(result.aliases, aliases);
  });
});

//const parsed = tools.parseWithAliases(input);
//console.log(util.inspect(parsed.data,{depth:null,showHidden:true}));
//console.log('Object identity one',parsed.data.hello === parsed.data.outputs);
//console.log();
//console.log(util.inspect(parsed.aliases,{depth:null,showHidden:false}));
//console.log('Object identity two',parsed.data.hello === parsed.aliases.get('a'));
