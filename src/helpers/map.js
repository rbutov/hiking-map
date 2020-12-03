import {maxDistance, minZoom, maxZoom} from '../components/shared/Map/config';

/**
 * _calculate max distance from zoom
 * @param {number} zoom: _map zoom value
 * @returns {number}: _maximum distance
 */
export const calculateDistance = zoom => {
  return ((maxZoom - zoom) / (maxZoom - minZoom)) * maxDistance;
};
