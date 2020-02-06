import Base from './Base';

export default class BelongsTo extends Base {
  fromJson(datum) {
    const type = this.klass();
    return new type(datum);
  }
}
