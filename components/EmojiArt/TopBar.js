import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageUploader from './ImageUploader';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


const TopBar = ({ dispatch }) => (
  <div className="top-bar">
    <Button
      onClick={() => dispatch({
        type: 'CLEAR_CANVAS',
      })}
      variant="contained"
      color="primary"
    >
      Clear
        <DeleteIcon />
    </Button>
    <Button
      onClick={() => dispatch({
        type: 'UNDO_STROKE',
      })}
      variant="contained"
      color="primary"
    >
      Undo
    </Button>

  </div>
);


TopBar.propTypes = {
  dispatch: PropTypes.func,
};


export default connect(mapStateToProps)(TopBar);
