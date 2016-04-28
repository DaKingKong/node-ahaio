'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/requirements';

    /**
     * Gets details about a specific requirement
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Requirement ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Gets a specific requirements tasks
     * @param {string} id
     * @param {function} callback
     */
    function tasks(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Requirement ID required')); }

        client.get(`${route}/${id}/tasks`, callback);
    }

    return {
        get,
        tasks
    }
};
