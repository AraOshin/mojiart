import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

class UploadFileV2 extends Component {
  imageUpload = (e) => {
    const file = e.target.files[0];

    const getBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

    getBase64(file).then((base64) => {
      localStorage.fileBase64 = base64;
      console.debug('file stored', base64);

      this.props.dispatch({
        type: 'UPLOAD_CANVAS_IMG',
        canvasImg: base64,
      });
    });
  };


  render() {
    return (
      <div>


        <input
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          name="imageFile"
          accept=".jpg, .jpeg, .png"
          onChange={this.imageUpload}
        />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span">
            Upload
          </Button>
        </label>

      </div>
    );
  }
}


// UploadFileV2.propTypes = {
//   onFileLoaded: PropTypes.func.isRequired,
// };

export default connect()(UploadFileV2);
