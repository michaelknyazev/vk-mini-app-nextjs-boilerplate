import axios from 'axios';

const HttpServiceError = function (result, message, fileName, lineNumber) {
  const _error = new Error(message, fileName, lineNumber);

  _error.name = 'HttpService Error';
  _error.result = result;

  Object.setPrototypeOf(_error, Object.getPrototypeOf(this));
  Error.captureStackTrace(_error, HttpServiceError);

  return _error;
}

HttpServiceError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

Object.setPrototypeOf(HttpServiceError, Error);

export const http = axios.create();

export const success = (data) => {
  // Success

  return data;
};

export const error = (e) => {
  const { request, status, config, data } = e;
  const _regex = /((http|https):\/\/([0-9a-zA-Z.]+(\.[a-z.]+))(\/[\S]+))/ig
  const hostname = _regex.exec(config.url);
  const [url, scheme, host, zone, path] = hostname.slice(1, hostname.length);

  switch (status) {
    case 404:
      return data && { data } || { success: false, event: 'MODEL_ITEM_NOT_FOUND' }
    default:
      return {
        success: false,
        event: 'FRONTEND_REQUEST_HOSTUNREACHABLE',
        result: {
          hostname: host,
          path
        }
      };
  }
}