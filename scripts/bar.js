'use strict';

var _ = require('underscore');

module.exports = function () {

  this.get = function () {
    return 'bar ' + _.size({ one: 1, two: 2, three: 3 });
  };

};