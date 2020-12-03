import React, {useEffect, useState} from 'react';
import {Layer, Feature, Popup} from 'react-mapbox-gl';
import {svg} from './logo';
import {defaultZoom, Mapbox, mapStyles, maxZoom} from './config';
import {useLocation, useHistory} from 'react-router-dom';
import {getTrailIdFromLocation} from '../../../helpers/hiking';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const flyToOptions = {
  speed: 0.8,
};

const image = new Image();
image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg);
const images = ['logo', image];

const useStyles = makeStyles(styles);

const Map = props => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const trails = useSelector(state => state.app.trails);
  const settings = useSelector(state => state.app.settings);

  const [styleLoaded, setStyleLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [position, setPosition] = useState({
    center: settings.center,
    zoom: [settings.zoom],
  });

  /**
   * _event on map drag
   * @param {object} ev: _map event
   */
  const onDragEnd = ev => {
    if (props.setCenter) {
      const center = ev.getCenter();
      props.setCenter([center.lng, center.lat]);
    }
  };

  /**
   * _event on map zooming
   * @param {object} ev: _map event
   */
  const onZoomEnd = ev => {
    if (props.setZoom) {
      const zoom = ev.getZoom();
      props.setZoom(zoom);
    }
  };

  /**
   * _on map style loaded
   */
  const onStyleLoad = _ => {
    setStyleLoaded(true);
  };

  /**
   * _on marker click
   * @param {number} id: _trail id
   */
  const markerClick = id => {
    history.push(`/trail/${id}`);
  };

  /**
   * _update trails
   */
  const updateTrails = _ => {
    if (props.onChange) props.onChange();
    setShowButton(false);
  };

  const onToggleHover = (cursor, {map}) => {
    map.getCanvas().style.cursor = cursor;
  };

  useEffect(() => {
    if (props.trail) {
      setPosition({
        zoom: [maxZoom],
        center: props.trail.coordinates,
      });
    } else {
      setPosition(prevState => ({
        ...prevState,
        zoom: [defaultZoom],
      }));
    }
  }, [props.trail]);

  useEffect(() => {
    if (props.isInitiated && styleLoaded) setShowButton(!props.trail);
  }, [props.position, props.trail, props.isInitiated]);

  useEffect(() => {
    console.log('_location');
    if (props.setTrail) {
      props.setTrail(getTrailIdFromLocation(location));
    }
  }, [location]);

  return (
    <div className={classes.root}>
      {showButton ? (
        <Button
          color="primary"
          variant="contained"
          onClick={updateTrails}
          className={classes.showButton}
        >
          Update this area
        </Button>
      ) : (
        ''
      )}
      <Mapbox
        style={settings.isDark ? mapStyles.dark : mapStyles.light}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        onDragEnd={onDragEnd}
        onZoomEnd={onZoomEnd}
        onStyleLoad={onStyleLoad}
        fitBounds={undefined}
        zoom={position.zoom}
        center={position.center}
        flyToOptions={flyToOptions}
      >
        <Layer type="symbol" layout={{'icon-image': 'logo'}} images={images}>
          {trails
            .filter(t => !props.trail || t.id === props.trail.id)
            .map(v => (
              <Feature
                key={v.id}
                onMouseEnter={onToggleHover.bind(null, 'pointer')}
                onMouseLeave={onToggleHover.bind(null, '')}
                onClick={markerClick.bind(null, v.id)}
                coordinates={v.coordinates}
              />
            ))}
        </Layer>
        {props.trail ? (
          <Popup key={props.trail.id} coordinates={props.trail.coordinates}>
            <div>
              <div>{props.trail.name}</div>
            </div>
          </Popup>
        ) : (
          ''
        )}
      </Mapbox>
    </div>
  );
};

export default Map;
