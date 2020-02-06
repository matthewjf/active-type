import update from '../events/update';
import { get } from 'lodash';
import BaseSource from './BaseSource';

export default class RecordSource extends BaseSource {
  handleResponse(response) {
    this._loading = false;
    this._record = new this.type(this.recordData(response));
    this._errors = this.errorData(response);

    this.dispatchUpdate();

    return response;
  }

  find(variables) {
    this._requested = true;
    this._loading = true;
    this.dispatchUpdate();

    return this.query.show(variables).then(this.handleResponse);
  }

  record() {
    return this._record;
  }
};
