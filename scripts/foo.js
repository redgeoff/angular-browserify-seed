'use strict';

var Bar = require('./bar'), bar = new Bar();

module.exports = function ($q) {

  this.get = function () {
  var defer = $q.defer();
  setTimeout(function () {
    defer.resolve('foo' + bar.get());
  }, 100);
  return defer.promise;
  };

};