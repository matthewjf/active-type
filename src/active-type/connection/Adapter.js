export default class Adapter {
  constructor(request, method, path) {
    this.request = request;
    this.method = method;
    this.path = path;
  }

  execute(query, variables) {
    const { path, request, method } = this;
    return request[method](path, { query: query, variables: variables });
  }
};
