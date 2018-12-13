

const initialState = {
  // loading: {},
  emojiSizeValue: 48,
  paintedEmojisHistory: [],

};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'SET_LOADING':
    //   // console.log('reducer called', action.payload);
    //   return {
    //     ...state,
    //     loading: { ...state.loading, [action.date]: action.loading },
    //   };
    case 'CHANGE_EMOJI_SIZE':
      console.log('reducer called', action.emojiSizeValue);
      return {
        ...state,
        emojiSizeValue: action.emojiSizeValue,
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


    default:
      return state;
  }
};

export default rootReducer;
