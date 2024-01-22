import {Node, NodeSpec} from 'prosemirror-model';
import {IFRAME} from './Constants';

function getAttrs(dom: HTMLElement): {
  align: string;
  height: number;
  src: string;
  width: number;
  marginLeft: number;
  marginTop: number;
} {
  let {width, height, marginLeft, marginTop} = dom.style;
  let align = dom.getAttribute('align');
  if (align) {
    align = /(left|right|center)/.test(align) ? align : null;
  }

  width = width || dom.getAttribute('width');
  height = height || dom.getAttribute('height');
  marginLeft = marginLeft || dom.getAttribute('marginLeft');
  marginTop = marginTop || dom.getAttribute('marginTop');

  return {
    align,
    height: parseInt(height, 10) || null,
    src: dom.getAttribute('src') || null,
    width: parseInt(width, 10) || null,
    marginLeft: parseInt(marginLeft, 10) || null,
    marginTop: parseInt(marginTop, 10) || null,
  };
}

// https://github.com/ProseMirror/prosemirror-schema-basic/blob/master/src/schema-basic.js
export const IFrameNodeSpec: NodeSpec = {
  inline: true,
  attrs: {
    align: {default: null},
    height: {default: null},
    src: {default: null},
    width: {default: null},
    marginLeft: {default: null},
    marginTop: {default: null},
  },
  group: 'inline',
  draggable: true,
  parseDOM: [{tag: IFRAME + '[src]', getAttrs}],
  toDOM(node: Node) {
    // [FS] IRAD- 2021-06-21
    // New inputs for the iframe plugin
    let style = '';
    style += `margin-top: ${node.attrs.marginTop}px ;`;
    style += `margin-left: ${node.attrs.marginLeft}px ;`;
    return [IFRAME, {...node.attrs, style}];
  },
};
