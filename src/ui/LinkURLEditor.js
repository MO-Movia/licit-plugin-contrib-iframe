// @flow

import * as React from 'react';
import sanitizeURL from './SanitizeURL';
import CustomButton from './CustomButton';
import {ENTER} from './KeyCodes';
import preventEventDefault from './PreventEventDefault';

const BAD_CHARACTER_PATTER = /\s/;

class LinkURLEditor extends React.PureComponent<any, any> {
  state = {
    url: this.props.href,
  };

  render(): React.Element<any> {
    const {href} = this.props;
    const {url} = this.state;

    const error = url ? BAD_CHARACTER_PATTER.test(url) : false;

    let label = 'Apply';
    let disabled = !!error;
    if (href) {
      label = url ? 'Apply' : 'Remove';
      disabled = error;
    } else {
      disabled = error || !url;
    }

    return (
      <div className="czi-image-url-editor">
        <form className="czi-form" onSubmit={preventEventDefault}>
          <fieldset>
            <legend>Add a Link</legend>
            <input
              autoFocus={true}
              onChange={this._onURLChange}
              onKeyDown={this._onKeyDown}
              placeholder="Paste a URL"
              spellCheck={false}
              type="text"
              value={url || ''}
            />
          </fieldset>
          <div className="czi-form-buttons">
            <CustomButton label="Cancel" onClick={this._cancel} />
            <CustomButton
              active={true}
              disabled={disabled}
              label={label}
              onClick={this._apply}
            />
          </div>
        </form>
      </div>
    );
  }

  _onKeyDown = (e: any) => {
    if (e.keyCode === ENTER) {
      e.preventDefault();
      this._apply();
    }
  };

  _onURLChange = (e: SyntheticInputEvent<>) => {
    const url = e.target.value;
    this.setState({
      url,
    });
  };

  _cancel = (): void => {
    this.props.close();
  };

  _apply = (): void => {
    const {url} = this.state;
    if (url && !BAD_CHARACTER_PATTER.test(url)) {
      this.props.close(sanitizeURL(url));
    }
  };
}

export default LinkURLEditor;