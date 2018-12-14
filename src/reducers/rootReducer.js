

const initialState = {
  // loading: {},
  emojiSizeValue: 48,
  paintedEmojisHistory: [],
  selectedEmoji: null,
  paintMode: 'brush',
  emojiSkin: '1',

};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_EMOJI_SIZE':
      console.log('reducer called', action.emojiSizeValue);
      return {
        ...state,
        emojiSizeValue: action.emojiSizeValue,
      };
    case 'CHANGE_PAINT_MODE':
      console.log('reducer called', action.mode);
      return {
        ...state,
        paintMode: action.mode,
      };
    case 'UPDATE_HISTORY':
      console.log('reducer called', action.paintedEmojis);
      return {
        ...state,
        paintedEmojisHistory: state.paintedEmojisHistory
          .concat(
            action.mode === 'stamp'
              ? action.paintedEmojis
              : [action.paintedEmojis],
          ),
      };
    case 'SELECT_EMOJI':
      console.log('reducer called', action.emoji);
      return {
        ...state,
        emoji: action.emoji,
      };
    case 'SELECT_SKIN':
      console.log('reducer called', action.skin);
      return {
        ...state,
        emojiSkin: action.skin,
      };
    case 'CLEAR_CANVAS':
      console.log('reducer called', 'clear canvas');
      return {
        ...state,
        paintedEmojisHistory: [],
      };
    default:
      return state;
  }
};

export default rootReducer;
