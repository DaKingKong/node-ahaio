'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/workflows';

    /**
     * Gets details about a specific workflow
     * @param {string} id - Numeric ID of the workflow
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Workflow ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    return {
        get
    }
};
