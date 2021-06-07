// @flow

import type {NodeSpec} from './Types';

function getAttrs(dom: HTMLElement) {
  let { width, height } = dom.style;
  let align = dom.getAttribute('align');
  if (align) {
    align = /(left|right|center)/.test(align) ? align : null;
  }

  width = width || dom.getAttribute('width');
  height = height || dom.getAttribute('height');


  return {
    align,
    height: parseInt(height, 10) || null,
    src: dom.getAttribute('src') || null,
    width: parseInt(width, 10) || null,
  };
}

// https://github.com/ProseMirror/prosemirror-schema-basic/blob/master/src/schema-basic.js
const IFrameNodeSpec: NodeSpec = {
  inline: true,
  attrs: {
    align: { default: null },
    height: { default: null },
    src: { default: null },
    width: { default: null },
  },
  group: 'inline',
  draggable: true,
  parseDOM: [{ tag: 'iframe[src]', getAttrs }],
  toDOM(node) {
    return ['iframe', node.attrs];
  },
};

export default IFrameNodeSpec;
