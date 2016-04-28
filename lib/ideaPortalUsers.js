'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/idea_portals';

    /**
     * Gets a specific idea_portals users
     * @param {string} ideaPortalId - Numeric ID, or key of the idea portal to get portal users for
     * @param {string} userId - Numeric ID, or key of the portal user to be retrieved
     * @param {function} callback
     */
    function get(ideaPortalId, userId, callback) {
        if (_.isEmpty(ideaPortalId)) { return callback(new Error('Idea Portal ID required')); }
        if (_.isEmpty(userId)) { return callback(new Error('User ID required')); }

        client.get(`${route}/${ideaPortalId}/portal_users/${userId}`, callback);
    }

    /**
     * Lists all users associated with an idea_portal
     * @param {string} ideaPortalId - Numeric ID, or key of the idea portal to get portal users for
     * @param {function} callback
     */
    function list(ideaPortalId, callback) {
        if (_.isEmpty(ideaPortalId)) { return callback(new Error('Idea Portal ID required')); }

        client.get(`${route}/${ideaPortalId}/portal_users`, callback);
    }

    return {
        get,
        list
    }
};
