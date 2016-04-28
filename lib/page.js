'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/pages';

    /**
     * Gets details about a specific page
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Page ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    return {
        get
    }
};
