import update from '../events/update';
import { get } from 'lodash';

export default class BaseSource extends EventTarget {
  constructor(type, query, objectPath, options = {}) {
    super();

    this.type = type;
    this.query = query;
    this.objectPath = objectPath;

    this._requested = false;
    this._loading = false;

    this.handleResponse = this.handleResponse.bind(this);
  }

  errorData(response) {
    return get(response, ['data', 'errors'], null);
  }

  recordData(response) {
    return get(response, ['data', 'data', this.objectPath], null);
  }

  dispatchUpdate() {
    this.dispatchEvent(update());
  }

  requested() {
    return this._requested;
  }

  loaded() {
    return this._requested && !this._loading;
  }

  loading() {
    return this._loading;
  }

  record() {
    return this._record;
  }

  errors() {
    return this._errors;
  }
};
