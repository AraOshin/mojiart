import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


const TopBar = ({ dispatch }) => (
  <div>
    <Button
      onClick={() => dispatch({
        type: 'CLEAR_CANVAS',
      })}
      variant="contained"
      color="primary"
    >
      Clear Canvas
        <DeleteIcon />
    </Button>
  </div>
);


TopBar.propTypes = {
  dispatch: PropTypes.func,
};


export default connect(mapStateToProps)(TopBar);
