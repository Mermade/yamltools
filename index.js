const yaml = require('yaml');
const recurse = require('reftools/lib/recurse.js').recurse;

function parseWithComments(str, commentProperty = '$comment') {
  const ast = yaml.parseDocument(str);

  recurse(ast,{},function(obj,key,state){
    let comment;
    if (obj[key] && obj[key].commentBefore) comment = obj[key].commentBefore;
    if (obj[key] && obj[key].comment) comment = obj[key].comment;
    if (comment && Array.isArray(state.parent)) {
      let existing = state.parent.find(function(e,i,a){
        if (e.key.value === commentProperty) return true;
      });
      if (existing) {
        existing.value.value += '\n' + comment;
      }
      else {
        state.parent.push(ast.createPair(commentProperty,comment));
      }
    }
  });
  return ast.toJSON();
}

function stringifyWithComments(obj,commentProperty = '$comment') {
  const ast = yaml.parseDocument(yaml.stringify(obj));
  recurse(ast,{ identityDetection: true },function(obj,key,state){
    if (obj && obj[key] && obj[key].key && obj[key].key.value === commentProperty) {
      if (Array.isArray(obj)) {
        const comment = obj[key].value.value;
        obj.splice(key,1);
        const target = (key === 0 ? 1 : key-1);
        if (obj[target]) obj[target].commentBefore = comment;
      }
    }
  });
  return ast.toString();
}

module.exports = {
  parseWithComments,
  stringifyWithComments
};

