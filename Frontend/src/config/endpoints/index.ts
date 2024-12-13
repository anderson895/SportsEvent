const Endpoint: (prefix: string) => (endpoint: string) => string =
  (prefix) => (endpoint) =>
    prefix + endpoint;

const ApiEndpoint = Endpoint('/v1');

export { ApiEndpoint };