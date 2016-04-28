'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/notes';

    /**
     * Gets a specific notes attachments
     * @param {string} id
     * @param {function} callback
     */
    function attachments(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Note ID required')); }

        client.get(`${route}/${id}/attachments`, callback);
    }

    return {
        attachments
    }
};
