import { get } from 'lodash';
import BaseSource from './BaseSource';

export default class CollectionSource extends BaseSource {
  constructor(type, query, objectPath, options = {}) {
    super(type, query, objectPath);

    this.paginated = options.paginated;
  }

  handleResponse(response) {
    this._loading = false;

    this._records = this.recordData(response).map(datum => new this.type(datum));
    this._errors = this.errorData(response);

    if (this.paginated) this._paginationData = this.paginationData(response);

    this.dispatchUpdate();

    return response;
  }

  recordData(response) {
    const results = get(response, ['data', 'data', this.objectPath], null);
    if (this.paginated) return results.nodes;
    return results;
  }

  paginationData(response) {
    return get(response, ['data', 'data', this.objectPath, 'pageInfo'], null);
  }

  all(variables) {
    this._requested = true;
    this._loading = true;
    this.dispatchUpdate();

    return this.query.list(variables).then(this.handleResponse);
  }

  records() {
    return this._records;
  }
};
