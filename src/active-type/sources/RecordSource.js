import update from '../events/update';
import { get } from 'lodash';

export default class RecordSource extends EventTarget {
  constructor(type, query) {
    super();

    this.type = type;
    this.query = query;

    this._requested = false;
    this._loading = false;

    this.handleResponse = this.handleResponse.bind(this);
  }

  handleResponse(response) {
    this._loading = false;
    this._record = new this.type(this.recordData(response));

    this.dispatchEvent(update());

    return response;
  }

  recordData(response) {
    return get(response, ['data', 'data', this.type.objectPath], null);
  }

  find(variables) {
    this._requested = true;
    this._loading = true;
    this.dispatchEvent(update());

    return this.query.show(variables).then(this.handleResponse);
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
};
