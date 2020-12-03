import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Logo from './Logo';

const useStyles = makeStyles(_ => ({
  logoContainer: {
    top: 'calc(50% - 100px)',
    left: 'calc(50% - 100px)',
    position: 'absolute',
  },
}));

const LoadApplication = _ => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.logoContainer}>
        <Logo />
      </div>
    </>
  );
};

export default LoadApplication;
