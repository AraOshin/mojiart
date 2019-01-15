import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart';
import PropTypes from 'prop-types';
import EmojiSizeSlider from './EmojiSizeSlider';
import ImageUploader from './ImageUploader';
import ImageSelector from './ImageSelector';

const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,
  paintMode: state.root.paintMode,

});

const EmojiSettingsSideBar = ({
  emojiSizeValue,
  paintMode,
  dispatch,
}) => (
    <div className="side-bar">

      <div>
        <Typography gutterBottom align="center" variant="h6" component="h2" color="primary">
          Choose mode
        </Typography>
        <div className="layout-row">
          <Button
            onClick={() => dispatch({
              type: 'CHANGE_PAINT_MODE',
              mode: 'brush',
            })
            }
            variant="contained"
            color={paintMode === 'brush' ? 'primary' : null}
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

            onClick={() => dispatch({
              type: 'CHANGE_PAINT_MODE',
              mode: 'stamp',
            })
            }
            variant="contained"
            color={paintMode === 'stamp' ? 'primary' : null}
          >
            stamp
          </Button>
        </div>

      </div>


      <div>
        <Typography align="center" gutterBottom variant="h6" component="h2" color="primary">
          Adjust Size
        </Typography>

        <EmojiSizeSlider />
        <Emoji emoji="strawberry" size={emojiSizeValue} />
      </div>

      <div>
        <Typography align="center" gutterBottom variant="h6" component="h2" color="primary">
          Add Bakcground Image
        </Typography>

        <div className="layout-row">
          <ImageUploader />
          <Typography
            style={{ margin: '.5em' }}
            color="primary"
            variant="h6"
            component="h2"
          >
            or
          </Typography>
          <ImageSelector />

        </div>

      </div>

    </div>


);

EmojiSettingsSideBar.propTypes = {
  emojiSizeValue: PropTypes.number,
  paintMode: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(EmojiSettingsSideBar);
