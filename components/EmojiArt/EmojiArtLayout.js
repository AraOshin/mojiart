import React, { Component } from 'react';
import { Emoji } from 'emoji-mart';
import './EmojiArt.css';
import {
  Paper,
  Card,
  Button,
  Typography,
  CardContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import EmojiArtPicker from './EmojiArtPicker';
import EmojiSizeSlider from './EmojiSizeSlider';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


class EmojiArtLayout extends Component {
  state = {
    paintedEmojis: [
    ],
    emoji: null,
    mouseInCanvas: true,
    paintMode: 'brush',
    painting: false,
    skin: 1,

  }


  componentDidMount = () => {
    window.addEventListener('click', (e) => {
      if (this.state.paintMode === 'stamp') {
        if (this.state.emoji && this.state.mouseInCanvas) {
          this.handleEmojiPaint(e);
          this.handleEmojiPaintStroke();
        }
      }
      if (this.state.paintMode === 'brush') {
        if (this.state.emoji && this.state.mouseInCanvas) {
          this.setState({ painting: !this.state.painting });
          if (this.state.painting === false) this.handleEmojiPaintStroke();
        }
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (this.state.emoji
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


  handleEmojiPaint = (e) => {
    {
      const newPaintedEmoji = {
        x: e.clientX - (this.props.emojiSizeValue / 2),
        y: e.clientY - (this.props.emojiSizeValue / 2),
        emoji: this.state.emoji,
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

  handleEmojiSelect = (emoji) => {
    this.setState({ emoji: { emoji } });
    this.setState({ painting: false }); // todo remove this fix
  }

  handleEmojiSkinSelect = (skin) => {
    this.setState({ skin });
    this.setState({ painting: false }); // todo remove this fix
  }

  handleModeSelect = (mode) => {
    if (mode === 'stamp') this.setState({ paintMode: 'stamp' });
    if (mode === 'brush') this.setState({ paintMode: 'brush' });
    this.setState({ painting: false }); // todo remove this fix
  }

  handleCanvasClear = () => {
    this.setState(({ paintedEmojis: [] }));
    this.setState({ painting: false }); // todo remove this fix
  }

  handleCanvasMouseEnter = () => {
    this.setState({ mouseInCanvas: true });
    console.log('ENTER', this.state.mouseInCanvas);
  }

  handleCanvasMouseLeave = () => {
    this.setState({ mouseInCanvas: false });
    console.log('EXIT', this.state.mouseInCanvas);
  }

  renderEmojiArt = () => this.state.paintedEmojis.map(paintedEmoji => (
    <div style={{ position: 'absolute', top: paintedEmoji.y, left: paintedEmoji.x }}>
      <Emoji
        emoji={paintedEmoji.emoji.emoji.id}
        size={paintedEmoji.size}
        skin={paintedEmoji.skin}
      />
    </div>
  ))


  render() {
    return (
      <div className="emoji-art-container">
        <Paper className="top-bar">
          <Button
            onClick={this.handleCanvasClear}
            variant="contained"
            color="primary"
          >
            Clear Canvas
        <DeleteIcon />
          </Button>
        </Paper>

        <Paper className="side-bar">
          <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
            Pick an Emoji to ART with
          </Typography>
          <EmojiArtPicker
            style={{
              position: 'relative', zIndex: 100,
            }}
            onEmojiSelect={this.handleEmojiSelect}
            onSkinChange={this.handleEmojiSkinSelect}
          />
        </Paper>
        <div className="side-bar-right">
          <Paper style={{ height: '100%' }}>
            <CardContent>
              <Typography gutterBottom align="center" variant="h6" component="h2" color="primary">
                Choose mode
              </Typography>
              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', paddingBottom: '10px', align: 'center',
              }}
              >
                <Button
                  onClick={() => this.handleModeSelect('brush')}
                  variant="contained"
                  color={this.state.paintMode === 'brush' ? 'primary' : null}
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
                  onClick={() => this.handleModeSelect('stamp')}
                  variant="contained"
                  color={this.state.paintMode === 'stamp' ? 'primary' : null}
                >
                  stamp
                </Button>
              </div>

              <Typography align="center" gutterBottom variant="h6" component="h2" color="primary">
                Adjust Size
              </Typography>

              <EmojiSizeSlider />
              <Emoji emoji="strawberry" size={this.props.emojiSizeValue} />

            </CardContent>
          </Paper>
        </div>


        <div
          className="canvas"
          onMouseEnter={() => this.handleCanvasMouseEnter()}
          onMouseLeave={() => this.handleCanvasMouseLeave()}
        >
          <Card>
            {this.renderEmojiArt()}

          </Card>

        </div>


      </div>


    );
  }
}

export default connect(mapStateToProps)(EmojiArtLayout);
