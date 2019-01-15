import React from 'react';
import { Dialog, DialogContent, Button } from '@material-ui/core';
import { Emoji } from 'emoji-mart';
import EmojiArtPicker from './EmojiArtPicker';


class EmojiSelectButtonDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <div className="emoji-select-button">
          <Emoji
            emoji="strawberry"
            size={40}
            onClick={this.handleClickOpen}
          />
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>

            <div style={{ width: 350, height: 470 }}>

              <EmojiArtPicker />


            </div>
            <Button onClick={this.handleClose} color="primary">
              Select
            </Button>


          </DialogContent>


        </Dialog>
      </div>
    );
  }
}

export default EmojiSelectButtonDialog;
