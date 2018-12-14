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
import Footer from './Footer';


class EmojiArtLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          />
        </Paper>


        <Paper className="side-bar-right">
          <EmojiSettingsSideBar />
        </Paper>

        <RootRef rootRef={this.cardRef}>
          <Card className="canvas">
            <Canvas
              left={this.state.cell.left}
              top={this.state.cell.top}
            />
          </Card>
        </RootRef>
        <Paper className="footer">
          <Footer />
        </Paper>
      </div>
    );
  }
}

export default connect()(EmojiArtLayout);
