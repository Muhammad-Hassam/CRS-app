import React from 'react';
import Grid from '@material-ui/core/Grid';

const Footer = () => {
  return (
    <Grid container style={{ backgroundColor: 'skyblue', marginTop: '35px' }}>
      <Grid item xs={12} md={12} sm={12}>
        <h4 style={{ textAlign: 'center' }}>
          &copy; 2021 footwear. All rights reserved. Theme design by Hassam
        </h4>
      </Grid>
    </Grid>
  );
};
export default Footer;
