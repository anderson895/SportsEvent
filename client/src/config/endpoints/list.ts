import { ApiEndpoint } from './index';

const Api = {
  USER: (base = '/user') => ({
    REGISTRATION: ApiEndpoint(base + '/registration'),
    LOGIN: ApiEndpoint(base + '/login')
  }),
  TEAMS:(base = '/teams') => ({
    LIST: ApiEndpoint(base + '/list'),
    ADD: ApiEndpoint(base + '/add'),
    EDIT: ApiEndpoint(base + '/edit'),
    DELETE: ApiEndpoint(base + '/delete'),
  }),
  EVENTS:(base = '/events') => ({
    LIST: ApiEndpoint(base + '/list'),
    ADD: ApiEndpoint(base + '/add'),
    INFO: ApiEndpoint(base + '/information'),
    EDIT: ApiEndpoint(base + '/edit'),
    DELETE: ApiEndpoint(base + '/delete'),
  }),
  SPORTS:(base = '/sports') =>({
    LIST: ApiEndpoint(base + '/list'),
    ADD: ApiEndpoint(base + '/add'),
    EDIT: ApiEndpoint(base + '/edit'),
    DELETE: ApiEndpoint(base + '/delete'),
  })
};

export default Api;