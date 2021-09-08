import * as React from 'react';
import {
  CustomButton,
  preventEventDefault,
} from '@modusoperandi/licit-ui-commands';
import '../styles.css';

class IFrameEditor extends React.PureComponent<any, any> {
  _img = null;
  _unmounted = false;

  state = {
    ...(this.props.initialValue || {}),
    validValue: null,
  };

  componentWillUnmount(): void {
    this._unmounted = true;
  }

  render(): React.ReactNode {
    const {src, width, height, validValue, marginLeft, marginTop} = this.state;
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
          <fieldset>
            <legend>Margin Left</legend>
            <div className="czi-image-url-editor-src-input-row">
              <input
                autoFocus={true}
                className="czi-image-url-editor-src-input"
                onChange={this._onMarginLeftChange}
                placeholder="Margin Left"
                type="text"
                value={marginLeft || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Margin Top</legend>
            <div className="czi-image-url-editor-src-input-row">
              <input
                autoFocus={true}
                className="czi-image-url-editor-src-input"
                onChange={this._onMarginTopChange}
                placeholder="Margin Top"
                type="text"
                value={marginTop || ''}
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

  _onSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const src = e.target.value;
    this.setState({
      src,
      validValue: true,
    });
  };

  _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = e.target.value;
    this.setState({
      width,
      validValue: true,
    });
  };

  _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = e.target.value;
    this.setState({
      height,
      validValue: true,
    });
  };

  // on change the margin left input in ui
  _onMarginLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const marginLeft = e.target.value;
    this.setState({
      marginLeft,
      validValue: true,
    });
  };
  // on change the margin top input in ui
  _onMarginTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const marginTop = e.target.value;
    this.setState({
      marginTop,
      validValue: true,
    });
  };
  _cancel = (): void => {
    this.props.close();
  };

  _insert = (): void => {
    this.props.close(this.state);
  };
}

export default IFrameEditor;
