import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';

const styles = {
  root: {
    width: 150,
  },
  slider: {
    padding: '22px 0px',
  },
};

class SimpleSlider extends React.Component {
  state = {
    value: 48,
  };

  handleChange = (event, value) => {
    this.setState({ value });


    this.props.dispatch({
      type: 'CHANGE_EMOJI_SIZE',
      emojiSizeValue: value,

    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div
        className={classes.root}
      >

        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          min={12}
          max={98}
          style={{ padding: 10 }}
        />


      </div>

    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(SimpleSlider));