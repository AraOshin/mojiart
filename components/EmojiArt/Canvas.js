import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';
import './EmojiArt.css';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


class Canvas extends Component {
  state = {
    paintedEmojis: [
    ],
    mouseInCanvas: true,
    paintMode: 'brush',
    painting: false,
    skin: 1,

  }


  componentDidMount = () => {
    window.addEventListener('click', (e) => {
      if (this.state.paintMode === 'stamp') {
        if (this.props.emoji && this.state.mouseInCanvas) {
          this.handleEmojiStamp(e);
          this.handleEmojiPaintStroke();
        }
      }
      if (this.state.paintMode === 'brush') {
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
    {
      const newPaintedEmoji = {
        x: e.clientX - this.props.left,
        y: e.clientY - this.props.top,
        emoji: this.props.emoji,
        size: this.props.emojiSizeValue,
        skin: this.state.skin,
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
        skin: this.state.skin,
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
    console.log('ENTER', this.state.mouseInCanvas);
  }

  handleCanvasMouseLeave = () => {
    this.setState({ mouseInCanvas: false });
    console.log('EXIT', this.state.mouseInCanvas);
  }

  // renderEmojiArt = () => this.state.paintedEmojis.map(paintedEmoji => (
  //   <div style={{ position: 'absolute', top: paintedEmoji.y, left: paintedEmoji.x }}>
  //     <Emoji
  //       emoji={paintedEmoji.emoji.emoji.id}
  //       size={paintedEmoji.size}
  //       skin={paintedEmoji.skin}
  //     />
  //   </div>
  // ))


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
                emoji={paintedEmoji.emoji.emoji.id}
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
