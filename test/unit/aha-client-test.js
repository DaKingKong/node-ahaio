'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var moment = require('moment');

var AhaClient = require('../../index');

describe('lib/index.js', function() {
   context('constructor', function() {
       it('should correctly build a client', function() {
           let aha = new AhaClient('user', 'pass', 'sub');

           expect(aha.baseUrl).to.eql('https://sub.aha.io/api/v1');
           expect(aha.auth.user).to.eql('user');
           expect(aha.auth.pass).to.eql('pass');
       });

       it('should correctly handle non-subdomain clients', function() {
           let aha = new AhaClient('user', 'pass', 'sub', {useSubdomain: false});

           expect(aha.baseUrl).to.eql('https://secure.aha.io/api/v1');
           expect(_.isEmpty(aha.requestDefaultHeaders)).to.eql(false);
           expect(aha.requestDefaultHeaders['X-AHA-ACCOUNT']).to.eql('sub');
       });
   })
});