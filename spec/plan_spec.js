'use strict';

var expect    = require('chai').use(require('chai-as-promised')).expect
  , nock      = require('nock')
  , pagarme   = require('../')('ak_test_Rw4JR98FmYST2ngEHtMvVf5QJW7Eoo')
  , Plan      = pagarme.Plan;

describe('Plan', function() {

  var planFixture;

  before(function() {
    planFixture = require('./fixtures/plan');
  });

  after(nock.cleanAll);

  it('should create a plan', function() {
    Plan.create(planFixture)
      .then(function(obj) {
        expect(obj.id).to.be.ok;
      });
  });

  it('should search plan by criteria', function() {
    Plan.create(planFixture)
      .then(function(obj) {
        return Plan.findBy({ trial_days: planFixture.trial_days });
      })
      .then(function(plans) {
        Object.keys(plans).map(function(key) {
          expect(plans[key].trial_days).to.be.equal(parseInt(planFixture.trial_days));
        });
      });
  });
});