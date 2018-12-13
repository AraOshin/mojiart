

import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import EmojiArtPicker from './EmojiArtPicker';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


const EmojiSelectSideBar = ({ handleEmojiSelect, handleEmojiSkinSelect }) => (
  <div>
    <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
      Pick an Emoji to ART with
    </Typography>
    <EmojiArtPicker
      style={{
        position: 'relative', zIndex: 100,
      }}
      onEmojiSelect={handleEmojiSelect}
      onSkinChange={handleEmojiSkinSelect}
    />
  </div>
);


export default connect(mapStateToProps)(EmojiSelectSideBar);
