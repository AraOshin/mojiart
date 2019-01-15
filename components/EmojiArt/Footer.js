import React from 'react';
import { Typography } from '@material-ui/core';
import { Emoji } from 'emoji-mart';


const Footer = () => (
  <div>

    <a href="https://github.com/AraOshin/mojiart">

      <div style={{
        display: 'flex', flexFlow: 'row', justifyContent: 'center',
      }}
      >
        <Emoji emoji="art" size={34} />
        <Typography style={{ margin: '.2em' }} variant="h6" component="h2" color="primary">
          emoji-art
        </Typography>

        <Emoji emoji="art" size={34} />
      </div>
    </a>
  </div>
);


export default Footer;
