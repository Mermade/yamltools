'use strict';

const assert = require('assert');

const util = require('node:util');
const yaml = require('yaml');

const input = `
hello: &a
  world:
    message: Hello, world
outputs:
  *a
`

const jsonInput = `{ "hello" &a { "world": { "message": "Hello, world" } },
    "outputs": *a }`;

describe('Aliases', () => {
  it('should parse aliases with the core ruleset', () => {
    const result = yaml.parse(input, { schema: 'core' });
    assert.deepEqual(result, {
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
  });
});

describe('Aliases', () => {
  it('should parse aliases with the json ruleset', () => {
    try {
      yaml.parse(jsonInput, { schema: 'json' });
      assert.ok(false, 'Should not get here');
    }
    catch (ex) {
    }
  });
});

describe('Aliases', () => {
  it('should parse aliases with the failsafe ruleset', () => {
    const result = yaml.parse(input, { schema: 'failsafe' });
    assert.deepEqual(result, {
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
  });
});

