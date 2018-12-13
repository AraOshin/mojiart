

import React from 'react';
import { Typography, CardContent, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart';
import EmojiSizeSlider from './EmojiSizeSlider';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


const EmojiSettingsSideBar = ({ onModeSelectClick, currentPaintMode, emojiSizeValue }) => (
  <div>
    <CardContent>
      <Typography gutterBottom align="center" variant="h6" component="h2" color="primary">
        Choose mode
      </Typography>
      <div style={{
        display: 'flex', flexFlow: 'row', justifyContent: 'center', paddingBottom: '10px', align: 'center',
      }}
      >
        <Button
          onClick={() => onModeSelectClick('brush')}
          variant="contained"
          color={currentPaintMode === 'brush' ? 'primary' : null}
        >
          Brush
        </Button>
        <Typography
          style={{ margin: '.5em' }}
          color="primary"
          variant="h6"
          component="h2"
        >
          or
        </Typography>
        <Button
          onClick={() => onModeSelectClick('stamp')}
          variant="contained"
          color={currentPaintMode === 'stamp' ? 'primary' : null}
        >
          stamp
        </Button>
      </div>

      <Typography align="center" gutterBottom variant="h6" component="h2" color="primary">
        Adjust Size
      </Typography>

      <EmojiSizeSlider />
      <Emoji emoji="strawberry" size={emojiSizeValue} />

    </CardContent>
  </div>
);


export default connect(mapStateToProps)(EmojiSettingsSideBar);
