import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

class ImageUploader extends Component {
  imageUpload = (e) => {
    const fileUrl = window.URL.createObjectURL(e.target.files[0]);
    this.props.dispatch({
      type: 'UPLOAD_CANVAS_IMG',
      canvasImg: fileUrl,
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
          <Button variant="contained" component="span" style={{ marginTop: 15 }}>
            Upload
          </Button>
        </label>

      </div>
    );
  }
}

export default connect()(ImageUploader);
