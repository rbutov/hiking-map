import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Button, ButtonGroup, Grid, IconButton} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {toggleIsDark} from '../../actions/appActions';
import {getQueryFromLocation} from '../../helpers/hiking';

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
  const location = useLocation();

  const query = getQueryFromLocation(location);

  const settings = useSelector(state => state.app.settings);

  return (
    <Grid item xs={12}>
      <Grid container alignItems={'center'}>
        <Grid item xs={2}>
          <Link to={'/'}>
            <img
              className={classes.logo}
              alt="Hiking map"
              src={`${process.env.PUBLIC_URL}/logo.svg`}
            />
          </Link>
        </Grid>
        <Grid item xs={8}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              component={Link}
              color={location.search === '' ? 'secondary' : 'primary'}
              to={process.env.PUBLIC_URL}
            >
              Trails
            </Button>
            <Button
              component={Link}
              color={query.has('history') ? 'secondary' : 'primary'}
              to={`${process.env.PUBLIC_URL}/?history`}
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
