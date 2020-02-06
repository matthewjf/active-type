export default class ActiveType {
  static defineMethods() {
    if (this._methodsDefined) return;

    this._methodsDefined = true;

    this.attributes && this.attributes.forEach(attribute => {
      this.prototype[attribute] = function() { return this._data && this._data[attribute] };
    })

    this.associations && this.associations.forEach(association => {
      this.prototype[association.name()] = function() { return this._associations && this._associations[association.name()] };
    })
  }

  constructor(data) {
    this._data = data;
    this._associations = {};

    this.buildAssociations(data);
    this.constructor.defineMethods();
  }

  buildAssociations(data) {
    if (!this.constructor.associations) return;

    this.constructor.associations.forEach(association => {
      const associationName = association.name();
      if (!data[associationName]) return;
      this._associations[associationName] = association.fromJson(data[associationName]);
    });
  }
};
