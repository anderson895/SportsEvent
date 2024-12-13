import { ApiEndpoint } from './index';

const Api = {
  USER: (base = '/user') => ({
    REGISTRATION: ApiEndpoint(base + '/registration'),
    LOGIN: ApiEndpoint(base + '/login'),
    LIST: ApiEndpoint(base + '/list'),
    UPDATE: ApiEndpoint(base + '/update'),
    COACH: ApiEndpoint(base + '/coach'),
  }),
  TEAMS:(base = '/teams') => ({
    LIST: ApiEndpoint(base + '/list'),
    ADD: ApiEndpoint(base + '/add'),
    EDIT: ApiEndpoint(base + '/edit'),
    DELETE: ApiEndpoint(base + '/delete'),
    COACHES: ApiEndpoint(base + '/coach-list'),
    ADDPLAYER: ApiEndpoint(base + '/add-player'),
    DELETEPLAYER: ApiEndpoint(base + '/delete-player'),
    INFO: ApiEndpoint(base + '/info'),
  }),
  EVENTS:(base = '/events') => ({
    LIST: ApiEndpoint(base + '/list'),
    ADD: ApiEndpoint(base + '/add'),
    SPORTS: ApiEndpoint(base + '/sportsEvent'),
    INFO: ApiEndpoint(base + '/information'),
    EDIT: ApiEndpoint(base + '/edit'),
    DELETE: ApiEndpoint(base + '/delete'),
    MATCHCREATE: ApiEndpoint(base + '/create-match'),
    BRACKETMATCH: ApiEndpoint(base + '/bracket-match'),
    SETSCORE: ApiEndpoint(base + '/single/set-winner'),
    SETSCORE1: ApiEndpoint(base + '/double/set-winner'),
    SETSCORE2: ApiEndpoint(base + '/round-robin/set-winner'),
    SETSCHEDULE: ApiEndpoint(base + '/set-schedule'),
    SPORTEVENTS: ApiEndpoint(base + '/sports-events'),
  }),
  SPORTS:(base = '/sports') =>({
    LIST: ApiEndpoint(base + '/list'),
    SUMMARY: ApiEndpoint(base + '/summary'),
    ADD: ApiEndpoint(base + '/add'),
    EDIT: ApiEndpoint(base + '/edit'),
    DELETE: ApiEndpoint(base + '/delete'),
  }),
  GAMES:(base = '/games') =>({
    LIST: ApiEndpoint(base + '/schedule'),
    ID: ApiEndpoint(base + '/match'),
    INCREMENT: ApiEndpoint(base + '/increment-score'),
    STATUS: ApiEndpoint(base + '/status'),
  }),
  MEDIA:(base = '/media') =>({
    LIST: ApiEndpoint(base + '/list'),
    ADD: ApiEndpoint(base + '/add'),
    DELETE: ApiEndpoint(base + '/delete-media'),
  })
};

export default Api;