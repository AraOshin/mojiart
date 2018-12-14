import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';
import './EmojiArt.css';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,
  emoji: state.root.emoji,
  emojiSkin: state.root.emojiSkin,
  paintMode: state.root.paintMode,

});


class Canvas extends Component {
  state = {
    paintedEmojis: [
    ],
    mouseInCanvas: true,
    painting: false,

  }


  componentDidMount = () => {
    window.addEventListener('click', (e) => {
      if (this.props.paintMode === 'stamp') {
        if (this.props.emoji && this.state.mouseInCanvas) {
          this.handleEmojiStamp(e);
          this.handleEmojiPaintStroke();
        }
      }
      if (this.props.paintMode === 'brush') {
        if (this.props.emoji && this.state.mouseInCanvas) {
          this.setState({ painting: !this.state.painting });
          if (this.state.painting === false) this.handleEmojiPaintStroke();
        }
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (this.props.emoji
        && this.state.mouseInCanvas) {
        this.state.painting === true && this.handleEmojiPaint(e);
      }
    });
  }

  handleEmojiPaintStroke = () => {
    this.props.dispatch({
      type: 'UPDATE_HISTORY',
      mode: this.state.mode,
      paintedEmojis: this.state.paintedEmojis,
    });
  }


  handleEmojiStamp = (e) => {
    const {
      left,
      top,
      emoji,
      emojiSizeValue,
      emojiSkin,
    } = this.props;
    {
      const newPaintedEmoji = {
        x: e.clientX - (this.props.emojiSizeValue / 2) - left,
        y: e.clientY - (this.props.emojiSizeValue / 2) - top,
        emoji,
        size: emojiSizeValue,
        skin: emojiSkin,
      };


      const updatedPaintedEmojis = [
        ...this.state.paintedEmojis,
        newPaintedEmoji,
      ];
      this.setState({ paintedEmojis: updatedPaintedEmojis });
      console.log('PAINTING', this.state.mouseInCanvas);
    }
  }


  handleEmojiPaint = (e) => {
    {
      const newPaintedEmoji = {
        x: e.clientX - (this.props.emojiSizeValue / 2) - this.props.left,
        y: e.clientY - (this.props.emojiSizeValue / 2) - this.props.top,
        emoji: this.props.emoji,
        size: this.props.emojiSizeValue,
        skin: this.props.emojiSkin,
      };


      const updatedPaintedEmojis = [
        ...this.state.paintedEmojis,
        newPaintedEmoji,
      ];
      this.setState({ paintedEmojis: updatedPaintedEmojis });
      console.log('PAINTING', this.state.mouseInCanvas);
    }
  }


  handleCanvasMouseEnter = () => {
    this.setState({ mouseInCanvas: true });
  }

  handleCanvasMouseLeave = () => {
    this.setState({ mouseInCanvas: false });
  }


  render() {
    return (
      <div
        onMouseEnter={() => this.handleCanvasMouseEnter()}
        onMouseLeave={() => this.handleCanvasMouseLeave()}
      >
        {
          this.state.paintedEmojis.map(paintedEmoji => (
            <div style={{ position: 'absolute', top: paintedEmoji.y, left: paintedEmoji.x }}>
              <Emoji
                emoji={paintedEmoji.emoji.id}
                size={paintedEmoji.size}
                skin={paintedEmoji.skin}
              />
            </div>
          ))
        }
        {console.log(this.props.top)}


      </div>
    );
  }
}

export default connect(mapStateToProps)(Canvas);
