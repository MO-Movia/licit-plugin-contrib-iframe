// IFram ProseMirror Plugin
// [FS] IRAD-987 2020-06-12
import {Plugin, PluginKey} from 'prosemirror-state';
import {Fragment, Schema} from 'prosemirror-model';
import {IFRAMEKEY, IFRAME} from './Constants';
import {createPopUp} from '@modusoperandi/licit-ui-commands';
import IFrameEditor from './ui/IFrameEditor';
import {IFrameNodeSpec} from './IFrameNodeSpec';

export class IFramePlugin extends Plugin {
  _popUp = null;
  constructor() {
    super({
      key: new PluginKey(IFRAMEKEY),
      props: {
        handleDOMEvents: {
          keydown(view, event): boolean {
            if (event.key === 'F7') {
              const props = {runtime: view ? view['runtime'] : null};
              this['_popUp'] = createPopUp(IFrameEditor, props, {
                modal: true,
                onClose: (val) => {
                  if (this['_popUp']) {
                    this['_popUp'] = null;
                    executeWithUserInput(view, val);
                  }
                },
              });
              return true;
            }
            return false;
          },
        },
      },
    });
  }

  // [FS][IRAD-???? 2020-08-17]
  // Plugin method that supplies plugin schema to editor
  getEffectiveSchema(schema: Schema): Schema {
    return applyEffectiveSchema(schema);
  }
}

function applyEffectiveSchema(schema: Schema) {
  const nodes = schema.spec.nodes.append({ 'iframe': IFrameNodeSpec });
  const marks = schema.spec.marks;

  return new Schema({
    nodes: nodes,
    marks: marks,
  });
}

function executeWithUserInput(view, inputs) {
  const {state} = view;
  const {selection, schema} = state;

  let {tr} = state;
  tr = tr.setSelection(selection);
  if (inputs) {
    tr = insertIFrame(tr, schema, inputs);
  }
  view?.dispatch(tr);
  view?.focus();

  return false;
}

function insertIFrame(tr, schema, input) {
  const {selection} = tr;
  if (!selection) {
    return tr;
  }
  const {from, to} = selection;
  if (from !== to) {
    return tr;
  }

  const iframe = schema.nodes[IFRAME];
  if (!iframe) {
    return tr;
  }

  const attrs = {
    src: input.src || '',
    height: input.height || '',
    width: input.width || '',
    marginLeft: input.marginLeft || '',
    marginTop: input.marginTop || '',
  };

  const node = iframe.create(attrs, null, null);
  const frag = Fragment.from(node);
  tr = tr.insert(from, frag);
  return tr;
}
