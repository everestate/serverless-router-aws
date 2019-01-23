const pathToRegexp = require('path-to-regexp');
const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');

class HTTP extends BasePlugin {
  get(path, callback) {
    return this.appendRoute('GET', path, callback);
  }

  post(path, callback) {
    return this.appendRoute('POST', path, callback);
  }

  patch(path, callback) {
    return this.appendRoute('PATCH', path, callback);
  }

  put(path, callback) {
    return this.appendRoute('PUT', path, callback);
  }

  delete(path, callback) {
    return this.appendRoute('DELETE', path, callback);
  }

  all(path, callback) {
    return this.appendRoute('*', path, callback);
  }

  static matchesMethod(httpMethod, httpMethodToMatch) {
    return httpMethodToMatch === '*' || httpMethodToMatch === httpMethod;
  }

  static match(httpMethodToMatch, pathToMatch) {
    return (event) => {
      const { path, httpMethod } = event;
      if (!this.matchesMethod(httpMethod, httpMethodToMatch)) {
        return null;
      }

      const keys = [];
      const result = pathToRegexp(pathToMatch, keys).exec(path);
      if (!result) {
        return null;
      }

      return this.ctx(keys, result);
    };
  }

  static ctx(keys, result) {
    return keys.reduce((acc, key, i) => ({ ...acc, [key.name]: result[i + 1] }), {});
  }
}

module.exports = HTTP;
