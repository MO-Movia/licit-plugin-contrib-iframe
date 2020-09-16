
import * as React from 'react';
import PropTypes from 'prop-types';

import CustomButton from './CustomButton';
import preventEventDefault from './PreventEventDefault';
import '../styles.css';
import type { ImageLike } from '../Types';

type Props = {
  initialValue: ?ImageLike,
  close: (href: ?ImageLike) => void,
};

class IFrameEditor extends React.PureComponent<any, any> {
  _img = null;
  _unmounted = false;

  // [FS] IRAD-1005 2020-07-07
  // Upgrade outdated packages.
  // To take care of the property type declaration.
  static propsTypes = {
    initialValue: PropTypes.object,
    close: function (props: any, propName: string) {
      var fn = props[propName];
      if (!fn.prototype ||
        (typeof fn.prototype.constructor !== 'function' &&
          fn.prototype.constructor.length !== 1)) {
        return new Error(propName + 'must be a function with 1 arg of type ImageLike');
      }
    }
  }

  state = {
    ...(this.props.initialValue || {}),
    validValue: null,
  };

  componentWillUnmount(): void {
    this._unmounted = true;
  }

  render(): React.Element<any> {
    const { src, width, height, validValue } = this.state;
    return (
      <div className="czi-image-url-editor">
        <form className="czi-form" onSubmit={preventEventDefault}>
          <fieldset>
            <legend>IFrame Source</legend>
            <div className="czi-image-url-editor-src-input-row">
              <input
                autoFocus={true}
                className="czi-image-url-editor-src-input"
                onChange={this._onSrcChange}
                placeholder="Paste URL ..."
                type="text"
                value={src || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Width</legend>
            <div className="czi-image-url-editor-src-input-row">
              <input
                className="czi-image-url-editor-src-input"
                onChange={this._onWidthChange}
                placeholder="Width"
                type="text"
                value={width || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Height</legend>
            <div className="czi-image-url-editor-src-input-row">
              <input
                className="czi-image-url-editor-src-input"
                onChange={this._onHeightChange}
                placeholder="Height"
                type="text"
                value={height || ''}
              />
            </div>
          </fieldset>
          <div className="czi-form-buttons">
            <CustomButton label="Cancel" onClick={this._cancel} />
            <CustomButton 
              active={!!validValue}
              disabled={!validValue}
              label="OK"
              onClick={this._insert}
            />
          </div>
        </form>
      </div>
    );
  }

  _onSrcChange = (e: SyntheticInputEvent<>) => {
    const src = e.target.value;
    this.setState(
      {
        src,
        validValue: true,
      },
    );
  };

  _onWidthChange = (e: SyntheticInputEvent<>) => {
    const width = e.target.value;
    this.setState(
      {
        width,
        validValue: true,
      },
    );
  };

  _onHeightChange = (e: SyntheticInputEvent<>) => {
    const height = e.target.value;
    this.setState(
      {
        height,
        validValue: true,
      },
    );
  };

  _cancel = (): void => {
    this.props.close();
  };

  _insert = (): void => {
    const { validValue } = this.state;
    this.props.close(this.state);
  };
}

export default IFrameEditor;
