import React from 'react';
import { Typography } from '@material-ui/core';
import EmojiArtPicker from './EmojiArtPicker';


const EmojiSelectSideBar = () => (
  <div className="side-bar-left">
    <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
      Pick an Emoji to ART with
    </Typography>
    <EmojiArtPicker
      style={{
        position: 'relative', zIndex: 100,
      }}
    />
  </div>
);


export default EmojiSelectSideBar;
