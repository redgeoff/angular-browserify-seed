'use strict';

var Bar = require('../../scripts/bar'),
    Utils = require('./utils'), utils = new Utils();

describe('Bar', function () {

  var bar;
  beforeEach(function () {
    bar = new Bar();
  });

  it('should get', function () {
    expect(bar.get()).toEqual('bar 3');
    expect(utils.get()).toEqual('angular-browserify-seed');
  });

});
