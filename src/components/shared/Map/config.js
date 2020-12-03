import ReactMapboxGl from 'react-mapbox-gl';

export const maxDistance = 200;
export const minZoom = 7;
export const maxZoom = 16;
export const defaultZoom = minZoom;

export const Mapbox = ReactMapboxGl({
  minZoom,
  maxZoom,
  accessToken: process.env.REACT_APP_MAP_API_KEY,
});

export const home = [-122.143936, 37.468319];

export const mapStyles = {
  light: 'mapbox://styles/mapbox/light-v9',
  dark: 'mapbox://styles/mapbox/dark-v9',
};
