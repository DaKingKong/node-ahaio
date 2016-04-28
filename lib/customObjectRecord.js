'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/custom_object_records';

    /**
     * Gets details about a specific Custom Object Record
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Custom Object Record ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Deletes a specific custom object record
     * @param {string} id
     * @param {function} callback
     */
    function remove(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Custom Object Record ID required')); }

        client.delete(`${route}/${id}`, callback);
    }

    return {
        get,
        remove
    }
};
