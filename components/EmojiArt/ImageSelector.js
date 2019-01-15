import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ImageSelector extends React.Component {
  state = {
    selectedCanvasImg: '',
    open: false,
  };

  handleChange = (event) => {
    const selectedCanvasImg = event.target.value === 'none'
      ? null
      : event.target.value;

    this.setState({ selectedCanvasImg });

    if (selectedCanvasImg) {
      this.props.dispatch({
        type: 'SELECT_CANVAS_IMG',
        selectedImage: selectedCanvasImg,
      });
    }
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Select Image</InputLabel>
          <Select
            displayEmpty
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.selectedCanvasImg}
            onChange={this.handleChange}
            inputProps={{
              name: 'select',
              id: 'demo-controlled-open-select',
            }}
          >

            <MenuItem value="nature">Nature</MenuItem>
            <MenuItem value="ocean">Ocean</MenuItem>
            <MenuItem value="colorful">Colorful</MenuItem>
            <MenuItem value="none"><em>None</em></MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ImageSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(ImageSelector));
