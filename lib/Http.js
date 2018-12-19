const pathToRegexp = require('path-to-regexp');
const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');

class Http extends BasePlugin {
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
    const re = pathToRegexp(pathToMatch);
    return (event) => {
      const { path, httpMethod } = event;
      if (!this.matchesMethod(httpMethod, httpMethodToMatch) || !re.exec(path)) {
        return false;
      }
      return true;
    };
  }
}

module.exports = Http;
