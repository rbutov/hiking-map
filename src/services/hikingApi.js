import request from '../helpers/request';
import api from '../configs/api';

/**
 * _get trails list from API
 * @param {number} lat: _longitude
 * @param {number} lon: _latitude
 * @param {number} maxDistance: _max distance from center
 * @param {number} maxResults: _max count of trails
 * @param {object|null} token: _cancel token
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}: _trails
 */
export const getTrails = async ({
  lat,
  lon,
  maxDistance = 200,
  maxResults = 100,
  token = null,
}) => {
  const params = {
    lat,
    lon,
    maxDistance,
    maxResults,
  };
  params.key = process.env.REACT_APP_HIKING_API_KEY;
  return request(api.getTrails, params, token);
};

/**
 * _get trails list by IDs from API
 * @param {array} ids: _trail ids
 * @param {object|null} token: _cancel token
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}: _trails
 */
export const getTrailsById = async (ids, token = null) => {
  const params = {
    ids,
  };
  params.key = process.env.REACT_APP_HIKING_API_KEY;
  return request(api.getTrailsById, params, token);
};
