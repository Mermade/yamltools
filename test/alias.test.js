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

    assert.equal(result.data.hello,result.data.outputs); // two objects share identity

    const compare = { "hello": { "world": { "message": "Hello, world" }}};
    compare.outputs = compare.hello;
    assert.deepEqual(result.data, compare);

    const aliases = new Map();
    aliases.set('a', { 'world': { 'message': 'Hello, world' }});
    assert.deepEqual(result.aliases, aliases);
    //assert.equal(result.aliases, aliases); // object identity is not preserved
  });
});

