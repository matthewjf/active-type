import React, { useEffect, useState } from 'react';
var createReactClass = require('create-react-class');
import update from './events/update';

export default function(Component, sources) {
  return createReactClass({
    componentDidMount: function() {
      this.state = {value: 0};

      this.listener = function listener() {
        this.setState({ value: this.state.value + 1 });
      }.bind(this);

      Object.values(sources).forEach(source => source.addEventListener('update', this.listener));
    },
    componentWillUnmount: function() {
      Object.values(sources).forEach(source => source.removeEventListener('update', this.listener));
    },
    render: function() {
      return <Component {...this.props} {...sources} />;
    }
  });
}
