'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var moment = require('moment');

var AhaClient = require('../../index');

describe('lib/index.js', function() {
   context('multiple param constructor', function() {
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
   context('argmap constructor', function() {
       it('should correctly build a client (username/password)', function() {
           let aha = new AhaClient({ 'username': 'user', 'password': 'pass', 'subdomain': 'sub'});
           expect(aha.baseUrl).to.eql('https://sub.aha.io/api/v1');
           expect(aha.auth.user).to.eql('user');
           expect(aha.auth.pass).to.eql('pass');
       });

       it('should correctly build a client (token)', function() {
           let aha = new AhaClient({ 'token': 'token', 'subdomain': 'sub' });
           expect(aha.baseUrl).to.eql('https://sub.aha.io/api/v1');
           expect(aha.auth.token).to.eql('token');
       });

       it('should correctly handle non-subdomain clients', function() {
           let aha = new AhaClient({ 'username': 'user', 'password': 'pass', 'subdomain': 'sub', 'options': {useSubdomain: false}});
           expect(aha.baseUrl).to.eql('https://secure.aha.io/api/v1');
           expect(_.isEmpty(aha.requestDefaultHeaders)).to.eql(false);
           expect(aha.requestDefaultHeaders['X-AHA-ACCOUNT']).to.eql('sub');
       });
   })
});
