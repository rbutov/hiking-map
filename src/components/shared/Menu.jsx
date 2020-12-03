import React from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Grid, IconButton} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {toggleIsDark} from '../../actions/appActions';

const useStyles = makeStyles(_ => ({
  logo: {
    width: 38,
    top: 2,
    position: 'relative',
  },
}));

const Menu = _ => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const settings = useSelector(state => state.app.settings);

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'}>
        <Grid item xs={2}>
          <Link to={'/'}>
            <img className={classes.logo} alt="Hiking map" src="/logo.svg" />
          </Link>
        </Grid>
        <Grid item xs={8}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              component={Link}
              color={location.pathname === '/' ? 'secondary' : 'primary'}
              to={'/'}
            >
              Trails
            </Button>
            <Button
              component={Link}
              color={location.pathname === '/history' ? 'secondary' : 'primary'}
              to={'/history'}
            >
              History
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(toggleIsDark())}
          >
            {settings.isDark ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Menu;
