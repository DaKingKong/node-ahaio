'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/releases';

    /**
     * Gets details about a specific release
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Release ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Gets a specific releases features
     * @param {string} id
     * @param {function} callback
     */
    function features(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Release ID required')); }

        client.get(`${route}/${id}/features`, callback);
    }

    /**
     * Search all releases for a name or ID
     * @param {string} query - Sub-string to match against release name or ID
     * @param callback
     */
    function search(query, callback) {
        if (_.isEmpty(query)) { return callback(new Error('Release ID required')); }

        client.get(`${route}`, {q: query}, callback);
    }

    return {
        get,
        features,
        search
    }
};
