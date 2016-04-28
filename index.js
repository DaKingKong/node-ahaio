'use strict';

const request = require('request');
const _ = require('lodash');

var product = require('./lib/product');
var release = require('./lib/release');
var feature = require('./lib/feature');
var task = require('./lib/task');
var note = require('./lib/note');
var idea = require('./lib/idea');
var initiative = require('./lib/initiative');
var requirement = require('./lib/requirement');
var page = require('./lib/page');
var customObjectRecord = require('./lib/customObjectRecord');
var integration = require('./lib/integration');
var integrationField = require('./lib/integrationField');
var timeTrackingEvent = require('./lib/timeTrackingEvent');

/**
 * @param {string} username
 * @param {string} password
 * @param {string} subdomain - AHA Subdomain/Company Name (http://subdomain.aha.io)
 * @param {object} [options]
 * @param {boolean} [options.useSubdomain] - Use your AHA subdomain, or use 'secure.aha.io'. Defaults to true
 */
function Client(username, password, subdomain, options) {
    if (!(this instanceof Client)) {
        return new Client(username, password, subdomain, options);
    }

    this.options = options || { useSubdomain: true, timeout: null };
    this.username = username;
    this.password = password;
    this.subdomain = subdomain;

    this.requestDefaultHeaders = {};

    if (this.options.useSubdomain === false) {
        this.requestDefaultHeaders['X-AHA-ACCOUNT'] = this.subdomain;
        this.subdomain = 'secure';
    };

    this.auth = {
        user: this.username,
        pass: this.password
    };

    this.baseUrl = `https://${this.subdomain}.aha.io/api/v1`;

    Client.prototype.product = product(this);
    Client.prototype.release = release(this);
    Client.prototype.feature = feature(this);
    Client.prototype.task = task(this);
    Client.prototype.note = note(this);
    Client.prototype.idea = idea(this);
    Client.prototype.initiative = initiative(this);
    Client.prototype.requirement = requirement(this);
    Client.prototype.page = page(this);
    Client.prototype.customObjectRecord = customObjectRecord(this);
    Client.prototype.integration = integration(this);
    Client.prototype.integrationField = integrationField(this);
    Client.prototype.timeTrackingEvent = timeTrackingEvent(this);

}

Client.prototype._request = function (method, path, params, body, callback){
    var client = this;

    var options = {
        method: method,
        qs: params,
        uri: client.baseUrl + path,
        json: body,
        auth: client.auth
    };

    if (client.options && client.options.timeout) {
        options.timeout = client.options.timeout
    }

    //Prepare request headers
    options.headers = client.requestDefaultHeaders;

    //Initiate HTTP request
    request(options, function (err, response, body){
        var data;
        if (callback) {
            if (!body) {
                data = err;
            } else {
                try {
                    data = JSON.parse(body);
                } catch(e) {
                    data = body;
                }
            }

            //request doesn't think 4xx is an error - we want an error for any non-2xx status codes
            //we also we want this to be a real error object...
            if (!err && (response.statusCode < 200 || response.statusCode > 206)){
                err = new Error('HTTP request error.');
                err.code = response.statusCode;
            }

            if(err && typeof err === 'string') {
                err = new Error(err);
                err.code = response.statusCode;
            }

            callback(err, data, response);
        }
        return this;
    });
};

Client.prototype.get = function(path, params, callback) {
    if (_.isFunction(params)) {
        callback = params;
        params = {};
    }

    return this._request('GET', path, params, null, callback);
};

Client.prototype.post = function(path, body, callback) {
    if (_.isFunction(body)) {
        callback = body;
        body = null;
    }

    return this._request('POST', path, null, body, callback);
};

Client.prototype.put = function(path, body, callback) {
    if (_.isFunction(body)) {
        callback = body;
        body = {};
    }

    return this._request('PUT', path, null, body, callback);
};

Client.prototype.delete = function(path, body, callback) {
    if (_.isFunction(body)) {
        callback = body;
        body = {};
    }

    return this._request('DELETE', path, null, body, callback);
};

module.exports = Client;