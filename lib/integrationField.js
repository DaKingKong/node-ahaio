'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/integration_fields';

    /**
     * Deletes a specific requirement
     * @param {string} id
     * @param {function} callback
     */
    function remove(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Integration Field ID required')); }

        client.delete(`${route}/${id}`, callback);
    }

    return {
        remove
    }
};
