export default class Base {
  constructor(name, klass) {
    this._name = name;
    this._klass = klass;
  }

  klass() {
    return this._klass;
  }

  name() {
    return this._name;
  }
}
