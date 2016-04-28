'use strict';

const _ = require('lodash');
const moment = require('moment');

module.exports = function(client) {
    var route = '/features';

    /**
     * Gets details about a specific feature
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Feature ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Search for features by name or ID
     * @param {string} query - Sub-string to match against feature name or ID
     * @param callback
     */
    function search(query, callback) {
        if (_.isEmpty(query)) { return callback(new Error('Query required')); }

        client.get(`${route}`, {q: query}, callback);
    }

    /**
     * Search for features by tag
     * @param {string} tag
     * @param callback
     */
    function searchByTag(tag, callback) {
        if (_.isEmpty(tag)) { return callback(new Error('Tag parameter required')); }

        client.get(`${route}`, {tag: tag}, callback);
    }

    /**
     * Search all releases for a name or ID
     * @param {string} strDate - UTC timestamp (in ISO8601 format)
     * @param callback
     */
    function modifiedSince(strDate, callback) {
        if (_.isEmpty(strDate)) { return callback(new Error('date parameter required')); }

        client.get(`${route}`, {updated_since: strDate}, callback);
    }

    /**
     * Get features by assigned user
     * @param {string} user - ID or email address of user
     * @param callback
     */
    function assignedToUser(user, callback) {
        if (_.isEmpty(user)) { return callback(new Error('User parameter required')); }

        client.get(`${route}`, {assigned_to_user: user}, callback);
    }

    return {
        get,
        search,
        searchByTag,
        modifiedSince,
        assignedToUser
    }
};
