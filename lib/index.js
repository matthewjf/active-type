'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodash = require('lodash');
var React = require('react');
var React__default = _interopDefault(React);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var ActiveType =
/*#__PURE__*/
function () {
  _createClass(ActiveType, null, [{
    key: "defineMethods",
    value: function defineMethods() {
      var _this = this;

      if (this._methodsDefined) return;
      this._methodsDefined = true;
      this.attributes && this.attributes.forEach(function (attribute) {
        _this.prototype[attribute] = function () {
          return this._data && this._data[attribute];
        };
      });
      this.associations && this.associations.forEach(function (association) {
        _this.prototype[association.name()] = function () {
          return this._associations && this._associations[association.name()];
        };
      });
    }
  }]);

  function ActiveType(data) {
    _classCallCheck(this, ActiveType);

    this._data = data;
    this._associations = {};
    if (data) this.buildAssociations(data);
    this.constructor.defineMethods();
  }

  _createClass(ActiveType, [{
    key: "buildAssociations",
    value: function buildAssociations(data) {
      var _this2 = this;

      if (!this.constructor.associations) return;
      this.constructor.associations.forEach(function (association) {
        var associationName = association.name();
        if (!data[associationName]) return;
        _this2._associations[associationName] = association.fromJson(data[associationName]);
      });
    }
  }]);

  return ActiveType;
}();

var Query =
/*#__PURE__*/
function () {
  function Query(adapter, showQuery, listQuery) {
    _classCallCheck(this, Query);

    this.adapter = adapter;
    this.listQuery = listQuery;
    this.showQuery = showQuery;
  }

  _createClass(Query, [{
    key: "list",
    value: function list(variables) {
      var adapter = this.adapter,
          listQuery = this.listQuery;
      return adapter.execute(listQuery, variables);
    }
  }, {
    key: "show",
    value: function show(variables) {
      var adapter = this.adapter,
          showQuery = this.showQuery;
      return adapter.execute(showQuery, variables);
    }
  }]);

  return Query;
}();

var Adapter =
/*#__PURE__*/
function () {
  function Adapter(request, method, path) {
    _classCallCheck(this, Adapter);

    this.request = request;
    this.method = method;
    this.path = path;
  }

  _createClass(Adapter, [{
    key: "execute",
    value: function execute(query, variables) {
      var path = this.path,
          request = this.request,
          method = this.method;
      return request[method](path, {
        query: query,
        variables: variables
      });
    }
  }]);

  return Adapter;
}();

function updateEvent() {
  return new Event('update');
}

var BaseSource =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(BaseSource, _EventTarget);

  function BaseSource(type, query, objectPath) {
    var _this;

    _classCallCheck(this, BaseSource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseSource).call(this));
    _this.type = type;
    _this.query = query;
    _this.objectPath = objectPath;
    _this._requested = false;
    _this._loading = false;
    _this.handleResponse = _this.handleResponse.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BaseSource, [{
    key: "errorData",
    value: function errorData(response) {
      return lodash.get(response, ['data', 'errors'], null);
    }
  }, {
    key: "recordData",
    value: function recordData(response) {
      return lodash.get(response, ['data', 'data', this.objectPath], null);
    }
  }, {
    key: "dispatchUpdate",
    value: function dispatchUpdate() {
      this.dispatchEvent(updateEvent());
    }
  }, {
    key: "requested",
    value: function requested() {
      return this._requested;
    }
  }, {
    key: "loaded",
    value: function loaded() {
      return this._requested && !this._loading;
    }
  }, {
    key: "loading",
    value: function loading() {
      return this._loading;
    }
  }, {
    key: "record",
    value: function record() {
      return this._record;
    }
  }, {
    key: "errors",
    value: function errors() {
      return this._errors;
    }
  }]);

  return BaseSource;
}(_wrapNativeSuper(EventTarget));

var RecordSource =
/*#__PURE__*/
function (_BaseSource) {
  _inherits(RecordSource, _BaseSource);

  function RecordSource() {
    _classCallCheck(this, RecordSource);

    return _possibleConstructorReturn(this, _getPrototypeOf(RecordSource).apply(this, arguments));
  }

  _createClass(RecordSource, [{
    key: "handleResponse",
    value: function handleResponse(response) {
      this._loading = false;
      this._record = new this.type(this.recordData(response));
      this._errors = this.errorData(response);
      this.dispatchUpdate();
      return response;
    }
  }, {
    key: "find",
    value: function find(variables) {
      this._requested = true;
      this._loading = true;
      this.dispatchUpdate();
      return this.query.show(variables).then(this.handleResponse);
    }
  }, {
    key: "record",
    value: function record() {
      return this._record;
    }
  }]);

  return RecordSource;
}(BaseSource);

var CollectionSource =
/*#__PURE__*/
function (_BaseSource) {
  _inherits(CollectionSource, _BaseSource);

  function CollectionSource(type, query, objectPath) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, CollectionSource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollectionSource).call(this, type, query, objectPath));
    _this.args = {};
    _this.paginated = options.paginated;
    return _this;
  }

  _createClass(CollectionSource, [{
    key: "handleResponse",
    value: function handleResponse(response) {
      var _this2 = this;

      this._loading = false;
      this._records = this.recordData(response).map(function (datum) {
        return new _this2.type(datum);
      });
      this._errors = this.errorData(response);
      if (this.paginated) this._paginationData = this.paginationData(response);
      this.dispatchUpdate();
      return response;
    }
  }, {
    key: "recordData",
    value: function recordData(response) {
      var results = lodash.get(response, ['data', 'data', this.objectPath], null);
      if (this.paginated) return results.nodes;
      return results;
    }
  }, {
    key: "paginationData",
    value: function paginationData(response) {
      return lodash.get(response, ['data', 'data', this.objectPath, 'pageInfo'], null);
    }
  }, {
    key: "where",
    value: function where(args) {
      Object.assign(this.args, args);
      return this;
    }
  }, {
    key: "all",
    value: function all() {
      this._requested = true;
      this._loading = true;
      this.dispatchUpdate();
      return this.query.list(this.args).then(this.handleResponse);
    }
  }, {
    key: "records",
    value: function records() {
      return this._records;
    }
  }, {
    key: "hasNextPage",
    value: function hasNextPage() {
      return this._paginationData && this._paginationData.hasNextPage || false;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      throw new Error('not implemented');
    }
  }]);

  return CollectionSource;
}(BaseSource);

var createReactClass = require('create-react-class');
function connectSource (Component, sources) {
  return createReactClass({
    componentDidMount: function componentDidMount() {
      var _this = this;

      this.state = {
        value: 0
      };

      this.listener = function listener() {
        this.setState({
          value: this.state.value + 1
        });
      }.bind(this);

      Object.values(sources).forEach(function (source) {
        return source.addEventListener('update', _this.listener);
      });
    },
    componentWillUnmount: function componentWillUnmount() {
      var _this2 = this;

      Object.values(sources).forEach(function (source) {
        return source.removeEventListener('update', _this2.listener);
      });
    },
    render: function render() {
      return React__default.createElement(Component, _extends({}, this.props, sources));
    }
  });
}

var Base =
/*#__PURE__*/
function () {
  function Base(name, klass) {
    _classCallCheck(this, Base);

    this._name = name;
    this._klass = klass;
  }

  _createClass(Base, [{
    key: "klass",
    value: function klass() {
      return this._klass;
    }
  }, {
    key: "name",
    value: function name() {
      return this._name;
    }
  }]);

  return Base;
}();

var HasMany =
/*#__PURE__*/
function (_Base) {
  _inherits(HasMany, _Base);

  function HasMany() {
    _classCallCheck(this, HasMany);

    return _possibleConstructorReturn(this, _getPrototypeOf(HasMany).apply(this, arguments));
  }

  _createClass(HasMany, [{
    key: "fromJson",
    value: function fromJson(data) {
      var type = this.klass();
      return data.map(function (datum) {
        return new type(datum);
      });
    }
  }]);

  return HasMany;
}(Base);

var BelongsTo =
/*#__PURE__*/
function (_Base) {
  _inherits(BelongsTo, _Base);

  function BelongsTo() {
    _classCallCheck(this, BelongsTo);

    return _possibleConstructorReturn(this, _getPrototypeOf(BelongsTo).apply(this, arguments));
  }

  _createClass(BelongsTo, [{
    key: "fromJson",
    value: function fromJson(datum) {
      var type = this.klass();
      return new type(datum);
    }
  }]);

  return BelongsTo;
}(Base);

exports.Adapter = Adapter;
exports.BelongsTo = BelongsTo;
exports.CollectionSource = CollectionSource;
exports.HasMany = HasMany;
exports.Query = Query;
exports.RecordSource = RecordSource;
exports.connectSource = connectSource;
exports.default = ActiveType;
//# sourceMappingURL=index.js.map
