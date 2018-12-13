import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


const TopBar = ({ onClearCanvasClick }) => (
  <div>
    <Button
      onClick={onClearCanvasClick}
      variant="contained"
      color="primary"
    >
      Clear Canvas
        <DeleteIcon />
    </Button>
  </div>
);


export default connect(mapStateToProps)(TopBar);
