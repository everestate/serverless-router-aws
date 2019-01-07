const Router = require('@everestate/serverless-router');
const HTTP = require('../HTTP');

const subj = (router = new Router([HTTP])) => {
  router.http
    .get('/users/:userId/appointments', (ctx, event) =>
      ({ method: 'get', ctx, event }))
    .post('/users/:userId/appointments', (ctx, event) =>
      ({ method: 'post', ctx, event }))
    .patch('/users/:userId/appointments', (ctx, event) =>
      ({ method: 'patch', ctx, event }))
    .put('/users/:userId/appointments', (ctx, event) =>
      ({ method: 'put', ctx, event }))
    .delete('/users/:userId/appointments', (ctx, event) =>
      ({ method: 'delete', ctx, event }));
  return router;
};

describe('HTTP', () => {
  describe('on GET request', () =>
    test('invokes matching callback', () => {
      const event = {
        httpMethod: 'GET',
        path: '/users/1/appointments',
      };
      expect(subj().dispatch(event)).toEqual({
        method: 'get',
        ctx: {},
        event,
      });
    }));

  describe('on POST request', () =>
    test('invokes matching callback', () => {
      const event = {
        httpMethod: 'POST',
        path: '/users/1/appointments',
      };
      expect(subj().dispatch(event)).toEqual({
        method: 'post',
        ctx: {},
        event,
      });
    }));

  describe('on PATCH request', () =>
    test('invokes matching callback', () => {
      const event = {
        httpMethod: 'PATCH',
        path: '/users/1/appointments',
      };
      expect(subj().dispatch(event)).toEqual({
        method: 'patch',
        ctx: {},
        event,
      });
    }));

  describe('on PUT request', () =>
    test('invokes matching callback', () => {
      const event = {
        httpMethod: 'PUT',
        path: '/users/1/appointments',
      };
      expect(subj().dispatch(event)).toEqual({
        method: 'put',
        ctx: {},
        event,
      });
    }));

  describe('on DELETE request', () =>
    test('invokes matching callback', () => {
      const event = {
        httpMethod: 'DELETE',
        path: '/users/1/appointments',
      };
      expect(subj().dispatch(event)).toEqual({
        method: 'delete',
        ctx: {},
        event,
      });
    }));


  describe('on ALL request', () =>
    test('matches all methods', () => {
      const router = new Router([HTTP]);
      router.http
        .all('/users/:userId/appointments', (ctx, event) =>
          ({ method: 'all', ctx, event }))
        .delete('/users/:userId/appointments', (ctx, event) =>
          ({ method: 'delete', ctx, event }));

      const event = {
        httpMethod: 'DELETE',
        path: '/users/1/appointments',
      };

      expect(router.dispatch(event)).toEqual({
        method: 'all',
        ctx: {},
        event,
      });
    }));

  test('pluginName', () =>
    expect(HTTP.pluginName).toEqual('http'));
});
