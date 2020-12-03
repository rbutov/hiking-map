import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh',
  },
}));

const Loader = _ => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
