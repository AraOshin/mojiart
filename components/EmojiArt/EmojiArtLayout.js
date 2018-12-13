import React, { Component } from 'react';
import './EmojiArt.css';
import {
  Paper,
  Card,
  RootRef,
} from '@material-ui/core';
import { connect } from 'react-redux';
import EmojiSelectSideBar from './EmojiSelectSideBar';
import TopBar from './TopBar';
import EmojiSettingsSideBar from './EmojiSettingsSideBar';
import Canvas from './Canvas';


const mapStateToProps = state => ({
  emojiSizeValue: state.root.emojiSizeValue,

});


class EmojiArtLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emoji: null,
      cell: {},
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.storeCell();
  }

  storeCell = () => {
    const cell = this.cardRef.current.getBoundingClientRect();
    this.setState({ cell });
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

  render() {
    return (
      <div className="emoji-art-container">

        <Paper className="top-bar">
          <TopBar onClearCanvasClick={this.handleCanvasClear} />
        </Paper>

        <Paper className="side-bar">
          <EmojiSelectSideBar
            handleEmojiSelect={this.handleEmojiSelect}
            handleEmojiSkinSelect={this.handleEmojiSkinSelect}
            currentPaintMode="brush" // todo
          />
        </Paper>


        <Paper className="side-bar-right">
          <EmojiSettingsSideBar onModeSelectClick={this.handleModeSelect} />
        </Paper>

        <RootRef rootRef={this.cardRef}>
          <Card className="canvas">
            <Canvas
              emoji={this.state.emoji}
              left={this.state.cell.left}
              top={this.state.cell.top}
            />
          </Card>
        </RootRef>


      </div>


    );
  }
}

export default connect(mapStateToProps)(EmojiArtLayout);
