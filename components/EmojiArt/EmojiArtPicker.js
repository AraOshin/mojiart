

import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const EmojiArtPicker = ({
  style,
  dispatch,
}) => (
    <Picker
      title="Pick-a-moji"
      emoji="strawberry"
      set="apple"
      perLine={6}
      onSelect={emoji => dispatch({
        type: 'SELECT_EMOJI',
        emoji,
      })
      }
      onSkinChange={skin => dispatch({
        type: 'SELECT_SKIN',
        skin,
      })
      }
      style={style || {
        position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%, -50%)', zIndex: '2',
      }}
    />
);

EmojiArtPicker.propTypes = {
  style: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect()(EmojiArtPicker);
