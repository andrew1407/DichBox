// Drop-in replacement for the `axios` module in the showcase build
// (aliased in webpack.config.js). Requests never leave the browser.
import { handleRequest } from './mockServer';

const LATENCY_MS = 150;

const post = (url, body) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const [status, data] = handleRequest(url, body);
    const response = { data, status, config: { url, method: 'post' }, headers: {} };
    if (status >= 400) {
      const err = new Error(`Request failed with status code ${status}`);
      err.response = response;
      reject(err);
    } else {
      resolve(response);
    }
  }, LATENCY_MS);
});

const axios = { post };

export default axios;
export { post };
