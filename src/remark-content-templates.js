var visit = require('unist-util-visit')
var is = require('unist-util-is')

module.exports = attacher

function attacher() {
  return transformer

  function transformer(tree, file) {
    visit(tree, 'ParagraphNode', visitor)

    function visitor(node) {
      console.log(node)
      var children = node.children

      children.forEach(function(child, index) {
        if (
          is(children[index - 1], 'SentenceNode') &&
          is(child, 'WhiteSpaceNode') &&
          is(children[index + 1], 'SentenceNode')
        ) {
          console.log(child)
          if (child.value.length !== 1) {
            file.message(
              'Expected 1 space between sentences, not ' + child.value.length,
              child
            )
          }
        }
      })
    }
  }
}