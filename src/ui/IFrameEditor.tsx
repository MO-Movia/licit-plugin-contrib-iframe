import React from 'react';
import {CustomButton} from '@modusoperandi/licit-ui-commands';

class IFrameEditor extends React.PureComponent<any, any> {
  state = {
    ...(this.props.initialValue || {}),
    validValue: null,
  };

  render(): React.ReactNode {
    const {src, width, height, validValue, marginLeft, marginTop} = this.state;
    return (
      <div className="molif-czi-image-url-editor">
        <form className="molif-czi-form" onSubmit={this.preventEventDefault}>
          <fieldset>
            <legend>IFrame Source</legend>
            <div className="molif-czi-image-url-editor-src-input-row">
              <input
                autoFocus={true}
                className="molif-czi-image-url-editor-src-input"
                onChange={this._onSrcChange}
                placeholder="Paste URL ..."
                type="text"
                value={src || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Width</legend>
            <div className="molif-czi-image-url-editor-src-input-row">
              <input
                className="molif-czi-image-url-editor-src-input"
                onChange={this._onWidthChange}
                placeholder="Width"
                type="text"
                value={width || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Height</legend>
            <div className="molif-czi-image-url-editor-src-input-row">
              <input
                className="molif-czi-image-url-editor-src-input"
                onChange={this._onHeightChange}
                placeholder="Height"
                type="text"
                value={height || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Margin Left</legend>
            <div className="molif-czi-image-url-editor-src-input-row">
              <input
                autoFocus={true}
                className="molif-czi-image-url-editor-src-input"
                onChange={this._onMarginLeftChange}
                placeholder="Margin Left"
                type="text"
                value={marginLeft || ''}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Margin Top</legend>
            <div className="molif-czi-image-url-editor-src-input-row">
              <input
                autoFocus={true}
                className="molif-czi-image-url-editor-src-input"
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

  preventEventDefault(e: React.SyntheticEvent): void {
    e.preventDefault();
  }

  _onSrcChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const src = e.target.value;
    this.setState({
      src,
      validValue: true,
    });
  };

  _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const width = e.target.value;
    this.setState({
      width,
      validValue: true,
    });
  };

  _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const height = e.target.value;
    this.setState({
      height,
      validValue: true,
    });
  };

  // on change the margin left input in ui
  _onMarginLeftChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const marginLeft = e.target.value;
    this.setState({
      marginLeft,
      validValue: true,
    });
  };
  // on change the margin top input in ui
  _onMarginTopChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
