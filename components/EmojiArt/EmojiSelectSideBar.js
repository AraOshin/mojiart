import React from 'react';
import { Typography } from '@material-ui/core';
import EmojiArtPicker from './EmojiArtPicker';
import EmojiSelectButtonDialog from './EmojiSelectButtonDialog';


const EmojiSelectSideBar = () => (
  <div className="side-bar">
    <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
      Pick an Emoji to ART with
    </Typography>
    <EmojiSelectButtonDialog />

    <div
      className="emoji-picker"
    >
      <EmojiArtPicker style={{
        position: 'relative',
        zIndex: 100,
      }}
      />
    </div>
  </div>
);


export default EmojiSelectSideBar;
