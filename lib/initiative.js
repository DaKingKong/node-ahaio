'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/initiatives';

    /**
     * Gets details about a specific initiative
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Initiative ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    return {
        get
    }
};
