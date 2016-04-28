'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/time_tracking_events';

    /**
     * Deletes a specific time tracking event
     * @param {string} id
     * @param {function} callback
     */
    function remove(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Time Tracking Event ID required')); }

        client.delete(`${route}/${id}`, callback);
    }

    return {
        remove
    }
};
