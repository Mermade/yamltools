'use strict';

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
       return;
     });
     if (existing) {
       existing.value.value += '\n' + comment;
     }
     else {
       state.parent.push(ast.createPair(commentProperty,comment.trim()));
     }
    }
  });
  return ast.toJSON();
}

function parseWithAliases(str) {
  const aliases = new Map();
  const ast = yaml.parseDocument(str);
  yaml.visit(ast,function(key,node,path) {
    if (yaml.isAlias(node)) {
      aliases.set(node.source,node.resolve(ast).toJS());
    }
  });
  return { data: ast.toJS(), aliases };
}

function stringifyWithComments(obj,commentProperty = '$comment') {
  const ast = yaml.parseDocument(yaml.stringify(obj));
  let parent, grandparent = {};
  yaml.visit(ast,function(key,node,path) {
    let kill = false;
    if (yaml.isPair(node)) {
      if (node.key.value === commentProperty) {
        const comment = node.value.value;
        grandparent.commentBefore = grandparent.commentBefore ? `${grandparent.commentBefore} ${node.value.value}` : ` ${node.value.value}`;
        kill = true;
      }
    }
    grandparent = parent;
    parent = node;
    if (kill) return yaml.visit.REMOVE;
  });
  return ast.toString();
}

module.exports = {
  parseWithComments,
  stringifyWithComments,
  parseWithAliases
};

