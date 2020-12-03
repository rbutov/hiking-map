import React from 'react';
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

const NoData = _ => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      No data
    </div>
  );
};

export default NoData;
