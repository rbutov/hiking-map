import {getTrails, getTrailsById} from '../services/hikingApi';
import {defaultZoom, home} from '../components/shared/Map/config';

/**
 * _default app settings
 * @returns {{isDark: boolean, center: number[], zoom: [number]}}
 */
export const getDefaultSettings = () => {
  return {isDark: true, center: home, zoom: [defaultZoom]};
};

/**
 * _get trail id from current url
 * @param {string} location: _current url
 * @returns {null|number}: _hiking id
 */
export const getTrailIdFromLocation = location => {
  const query = new URLSearchParams(location.search);
  return query.has('trail') ? parseInt(query.get('trail')) : null;
};

/**
 * _get query from ulr
 * @param {object} location: _current url
 * @returns {URLSearchParams}: _query params
 */
export const getQueryFromLocation = location => {
  console.log(location);
  return new URLSearchParams(location.search);
};

/**
 * _map hiking data from api data
 * @param {array} data: _data from api
 * @returns {*}: _mapped data
 */
export const mapData = data => {
  return data.map(v => ({
    id: v.id,
    name: v.name,
    coordinates: [v.longitude, v.latitude],
    image: v.imgSqSmall,
    imageLarge: v.imgSmallMed,
    type: v.type,
    summary: v.summary,
    difficulty: v.difficulty,
    stars: v.stars,
    length: v.length,
    location: v.location,
    low: v.low,
    high: v.high,
  }));
};

/**
 * _load trails from API
 * @param {number} lng: _longitude
 * @param {number} lat: _latitude
 * @param {number} distance: _max distance from center
 * @param {array} ids: _trails ids
 * @returns {Promise<unknown>}: _loaded trails
 */
export const loadTrails = ({lng, lat, distance, ids = []}) => {
  const apiError = 'Hikingproject.com is down.';
  return new Promise((resolve, reject) => {
    if (ids.length > 0) {
      getTrailsById({
        ids,
      })
        .then(response => {
          if (response.success === 1) {
            resolve(mapData(response.trails));
          } else {
            reject(apiError);
          }
        })
        .catch(_ => reject(apiError));
    } else {
      getTrails({
        lon: lng,
        lat,
        maxDistance: distance,
      })
        .then(response => {
          if (response.success === 1) {
            resolve(mapData(response.trails));
          } else {
            reject(apiError);
          }
        })
        .catch(_ => reject(apiError));
    }
  });
};
