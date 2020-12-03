import React, {useEffect, useState} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import {makeStyles, ThemeProvider, Grid, CssBaseline} from '@material-ui/core';

import {styles} from './styles';
import Map from '../../shared/Map/Map';
import {defaultZoom, home} from '../../shared/Map/config';
import TrailView from '../../shared/TrailView';
import TrailsList from '../../shared/TrailsList';
import TrailsHistory from '../../shared/TrailsHistory';
import {getTrailIdFromLocation, loadTrails} from '../../../helpers/hiking';
import {calculateDistance} from '../../../helpers/map';

import dark from '../../../themes/dark';
import light from '../../../themes/light';
import Menu from '../../shared/Menu';
import LoadApplication from '../../shared/LoadApplication/LoadApplication';
import Loader from '../../shared/Loader';
import {useToasts} from 'react-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {
  addHistory,
  addTrails,
  setTrails,
  updatePosition,
} from '../../../actions/appActions';

const useStyles = makeStyles(styles);

const Home = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const {addToast} = useToasts();

  const trails = useSelector(state => state.app.trails);
  const settings = useSelector(state => state.app.settings);

  const [isInitiated, setIsInitiated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({
    center: settings.center,
    zoom: settings.zoom,
  });

  const theme = settings.isDark ? dark : light;

  const [trailId, setTrailId] = useState(null);
  const [trail, setTrail] = useState(null);

  /**
   * _load data from api
   * @param {number|null} lng: _longitude
   * @param {number|null} lat: _latitude
   * @param {number|null} distance: _max distance
   * @param {array} ids: _trails ids
   * @param {function|null} resolve: _custom resolve function
   */
  const loadTrailsFromApi = ({
    lng = null,
    lat = null,
    distance = null,
    ids = [],
    resolve = null,
  }) => {
    setIsLoading(true);
    if (ids.length === 0) {
      const id = getTrailIdFromLocation(location);
      if (id) {
        ids = [id];
      }
    }
    if (ids.length === 0) {
      if (!lng) {
        [lng, lat] = home;
      }
      if (!distance) {
        distance = calculateDistance(defaultZoom);
      }
    }

    loadTrails({lng, lat, distance, ids})
      .then(data => {
        if (resolve) {
          resolve(data);
        } else {
          dispatch(setTrails(data));
          dispatch(updatePosition(position));
        }
        setIsLoading(false);
      })
      .catch(error => {
        addToast(error, {
          appearance: 'error',
          autoDismiss: true,
        });
        setIsLoading(false);
      });
  };

  /**
   * _on map center or zoom changed
   */
  const onChange = () => {
    const distance = calculateDistance(position.zoom);
    const [lng, lat] = position.center;
    loadTrailsFromApi({lng, lat, distance});
  };

  /**
   * _on zoom changed
   * @param {number} zoom: _zoom of the map
   */
  const updateZoom = zoom => {
    setPosition(prevState => ({
      ...prevState,
      zoom,
    }));
  };

  /**
   * _on center changed
   * @param {array} center: _center of the map
   */
  const updateCenter = center => {
    setPosition(prevState => ({
      ...prevState,
      center,
    }));
  };

  /**
   * _set opened trail and save it to history
   * @param {object} trail: _trail
   * @param {boolean} saveHistory: _is needed to save it to history
   */
  const setOpenedTrail = (trail, saveHistory = false) => {
    setTrail(trail);
    dispatch(addHistory(trail));
  };

  useEffect(() => {
    if (trailId !== null) {
      const fTrail = trails.filter(t => t.id === trailId);

      if (fTrail.length === 0) {
        const resolve = data => {
          dispatch(addTrails(data[0]));
          setOpenedTrail(data[0]);
        };

        loadTrailsFromApi({ids: [trailId], resolve});
      } else {
        setOpenedTrail(fTrail[0], true);
      }
    } else {
      setTrail(null);
      if (trails.length === 1) {
        loadTrailsFromApi({});
      }
    }
  }, [trailId, trails]);

  useEffect(() => {
    if (trails.length === 0) loadTrailsFromApi({});
    setIsInitiated(true);
  }, []);

  if (
    !isInitiated ||
    process.env.REACT_APP_HIKING_API_KEY === '' ||
    process.env.REACT_APP_MAP_API_KEY === ''
  ) {
    return <LoadApplication />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.leftBar}>
          <Grid container className={classes.leftBarContainer}>
            <Menu />
            <Grid item xs={12} className={classes.trailsContainer}>
              <div className={classes.trails}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <Switch>
                    <Route path={'/trail/:id'}>
                      <TrailView trail={trail} />
                    </Route>
                    <Route path={'/history'}>
                      <TrailsHistory />
                    </Route>
                    <Route path={'/'}>
                      <TrailsList />
                    </Route>
                  </Switch>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.map}>
          <Map
            trail={trail}
            position={position}
            setZoom={updateZoom}
            setCenter={updateCenter}
            setTrail={setTrailId}
            onChange={onChange}
            isInitiated={isInitiated}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
