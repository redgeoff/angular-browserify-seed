'use strict';

var angular = window.angular; // jshint ignore:line

var app = angular.module('foobar', []);

app.service('foo', ['$q', require('./foo')]);
app.service('bar', require('./bar'));