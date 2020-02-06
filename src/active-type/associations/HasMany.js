import Base from './Base';

export default class HasMany extends Base {
  fromJson(data) {
    const type = this.klass();
    return data.map(datum => new type(datum));
  }
}
