import {IFramePlugin, IFrameNodeSpec} from './index';
import {schema} from 'jest-prosemirror';

describe('IFramePlugin', () => {
  let plugin: IFramePlugin;

  beforeEach(() => {
    plugin = new IFramePlugin();
  });

  it('Should create', () => {
    expect(plugin).toBeTruthy();
  });

  it('Should create schema', () => {
    const effectiveSchema = plugin.getEffectiveSchema(schema);
    expect(effectiveSchema.spec.nodes.get('iframe')).toEqual(IFrameNodeSpec);
  });
});
