const assert = require('assert');

const yaml = require('yaml');
const tools = require('../index.js');

describe('comments',function(){

  it('should include comments in parsed object',function(){
    const o = tools.parseWithComments(`
hello:
  name: User
  # username
  color: green
`);
    assert.deepStrictEqual(o,{ hello: { name: 'User', $comment: 'username',
      color: 'green' } });
  });

  it('should respect commentProperty',function(){
    const o = tools.parseWithComments(`
hello:
  name: User
  # username
  color: green
`,'x-comment');
    assert.deepStrictEqual(o,{ hello: { name: 'User', 'x-comment': 'username',
      color: 'green' } });
  });

  it('should stringify mixed comments',function(){
    const o = tools.parseWithComments(`
hello:
  # baseComment
  name: User
  $comment: username
  color: green
`);
  assert.equal(tools.stringifyWithComments(o),
`hello:
  # username
  name: User
  # baseComment
  color: green
`);
  });

  it('should stringify comments',function(){
    const o = { hello: { name: 'User', $comment: 'username',
      color: 'green' } };
    assert.equal(tools.stringifyWithComments(o),
`hello:
  # username
  name: User
  color: green
`);
  });

  it('should stringify comments with commentProperty',function(){
    const o = { hello: { name: 'User', 'x-comment': 'username',
      color: 'green' } };
    assert.equal(tools.stringifyWithComments(o,'x-comment'),
`hello:
  # username
  name: User
  color: green
`);
  });

});
