'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/tasks';

    /**
     * Gets details about a specific task
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Task ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Gets a specific tasks attachments
     * @param {string} id
     * @param {function} callback
     */
    function attachments(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Task ID required')); }

        client.get(`${route}/${id}/attachments`, callback);
    }

    return {
        get,
        attachments
    }
};
