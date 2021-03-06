'use strict';

var assert      = require('assert')
  , util        = require('util')
  , _           = require('lodash')
  , needle      = require('needle')
  , crypto      = require('crypto');

function Pagarme(config) {
  config || (config = {});

  assert(this instanceof Pagarme, 'Pagarme must be called with new');
  assert(!!config.key, 'You need to configure a API key before performing requests.');

  this.key                    = config.key;
  this.endpoint               = 'https://api.pagar.me/%s';

  this.Card                   = require('./card')(this);
  this.BankAccount            = require('./bank_account')(this);
  this.Plan                   = require('./plan')(this);
  this.Subscription           = require('./subscription')(this);
  this.Transaction            = require('./transaction')(this);
  this.Recipient              = require('./recipient')(this);
}

function generateQuery() {
  var query = _.omit(_.extend.apply(_, [{}].concat([].slice.apply(arguments))), _.isUndefined);
  return _.isEmpty(query) ? undefined : query;
}

Pagarme.prototype.base = function(options) {
  options = _.defaults(options, {version: '1'});
  return util.format.apply(util, [this.endpoint, options.version]);
};

Pagarme.prototype.url = function(options) {
  _.defaults(options, {path: ''});
  return this.base(options) + options.path;
};

Pagarme.prototype.request = function(options, cb) {
  options = _.defaults(options, {
    method: 'GET',
    query: {}
  });

  var requestParams = generateQuery({api_key: this.key}, options.query);

  return needle.request(
    options.method,
    this.url(options),
    requestParams,
    {json: true, timeout: 8000},
    function(err, res) {
      if (res.statusCode === 200) return cb(null, res.body);
      var error = {
        type: res.body.errors || 'unknown',
        body: res.body,
        statusCode: res.statusCode
      };
      return cb(error);
    });
};

Pagarme.prototype.validateFingerprint = function(id, fingerprint) {
  var hash = id + '#' + crypto.createHash('sha1').digest('hex') + this.key;
  return hash === fingerprint;
};

module.exports = Pagarme;
