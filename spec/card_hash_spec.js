/* jshint -W030 */

'use strict';

var expect    = require('chai').expect
  , CardHash  = require('../lib/card_hash')
  , pagarme   = require('../')('ak_test_Rw4JR98FmYST2ngEHtMvVf5QJW7Eoo');

describe('CardHash', function() {

  it('should create card hash', function(done) {
    var params = {
      path: '/transactions',
      method: 'POST',
      query: require('./fixtures/transaction')
    };
    CardHash.create(pagarme, params, function(err, res) {
      expect(err).to.be.null;
      done();
    });
  });

  /*it('should generate card hash', function() {
    pagarme
      .request({ path: '/transactions/card_hash_key' })
      .then(function(data) {
        var card_hash = CardHash.toHash(data, {});
        expect(card_hash).to.be.ok;
      });
  });*/
});
