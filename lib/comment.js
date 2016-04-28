'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/comments';

    /**
     * Gets details about a specific comment
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Comment ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    return {
        get
    }
};
