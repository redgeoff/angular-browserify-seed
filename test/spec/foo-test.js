'use strict';

// Note: karma-browserify-preprocessor requires test filenames to end with "-test"

var Foo = require('../../scripts/foo');

describe('Foo', function () {

  var foo;
  beforeEach(function () {
    foo = new Foo(Q);
  });

  it('should get', function () {
    runs(function () {
      return foo.get().then(function (data) {
        expect(data).toEqual('foobar 3');
      });
    });
  });

});
