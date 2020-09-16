// @flow

export type NodeSpec = {
  attrs?: ?{[key: string]: any},
  content?: ?string,
  draggable?: ?boolean,
  group?: ?string,
  inline?: ?boolean,
  name?: ?string,
  parseDOM?: ?Array<any>,
  toDOM?: ?(node: any) => Array<any>,
};

export type ImageLike = {
  height: number,
  id: string,
  src: string,
  width: number,
};

