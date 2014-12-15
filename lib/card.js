'use strict';

var assert    = require('assert')
  , resource  = require('./resource');

module.exports = resource.create('Card', {
  path: '/cards'
})
.on('preFind', preFind);

function preFind(options) {
  assert(!(options.page < 1 || options.count < 1), 'Invalid Page Count');
}