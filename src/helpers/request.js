import axios from 'axios';

/**
 * _axios request wrapper
 * @param {string} url: _request url
 * @param {object} params: _request params
 * @param {object} token: _cancel token
 * @returns {Promise<unknown>}: _response promise
 */
export default (url, params, token = null) => {
  return new Promise((resolve, reject) =>
    axios
      .get(url, {
        cancelToken: token,
        params,
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject('ERROR');
        }
      })
      .catch(error => reject(error)),
  );
};
