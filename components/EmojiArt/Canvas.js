import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';
import './EmojiArt.css';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,
  emoji: state.root.emoji,
  emojiSkin: state.root.emojiSkin,
  paintMode: state.root.paintMode,
  paintedEmojisHistory: state.root.paintedEmojisHistory,
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
      paintedEmojisHistory: this.state.paintedEmojis,
    });
    // this.setState({ paintedEmojis: [] });
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

  renderCanvasEmojis = () => {
    if (this.props.paintedEmojisHistory.length) {
      return this.props.paintedEmojisHistory
        .map((emojiPaintStroke) => {
          if (Array.isArray(emojiPaintStroke)) {
            return emojiPaintStroke.map(emojiPaintStroke => (
              <div style={{ position: 'absolute', top: emojiPaintStroke.y, left: emojiPaintStroke.x }}>
                <Emoji
                  emoji={emojiPaintStroke.emoji.id}
                  size={emojiPaintStroke.size}
                  skin={emojiPaintStroke.skin}
                />
              </div>
            ));
          }
          return (
            <div style={{ position: 'absolute', top: emojiPaintStroke.y, left: emojiPaintStroke.x }}>
              <Emoji
                emoji={emojiPaintStroke.emoji.id}
                size={emojiPaintStroke.size}
                skin={emojiPaintStroke.skin}
              />
            </div>
          );
        });
    }
    return null;
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.handleCanvasMouseEnter()}
        onMouseLeave={() => this.handleCanvasMouseLeave()}
      >

        {
          this.state.paintedEmojis
            .map(paintedEmojis => (
              <div style={{ position: 'absolute', top: paintedEmojis.y, left: paintedEmojis.x }}>
                <Emoji
                  emoji={paintedEmojis.emoji.id}
                  size={paintedEmojis.size}
                  skin={paintedEmojis.skin}
                />
              </div>
            ))
        }
        {/* {this.renderCanvasEmojis()} */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Canvas);
