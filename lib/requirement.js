'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/requirements';

    /**
     * Gets details about a specific requirement
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Requirement ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Gets a specific requirements tasks
     * @param {string} id
     * @param {function} callback
     */
    function tasks(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Requirement ID required')); }

        client.get(`${route}/${id}/tasks`, callback);
    }

    /**
     * Deletes a specific requirement
     * @param {string} id
     * @param {function} callback
     */
    function remove(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('requirement ID required')); }

        client.delete(`${route}/${id}`, callback);
    }

    /**
     * Adds a comment to a requirement
     * @param {string} requirementId - Numeric ID or key of the requirement the comment should be created for
     * @param {object} comment
     * @param {string} comment.body - HTML string of message body
     * @param {object} comment.user
     * @param {string} comment.user.email - User email of comment poster
     * @param callback
     */
    function addComment(requirementId, comment, callback) {
        if (_.isEmpty(requirementId)) { return callback(new Error('Feature ID required')); }
        if (_.isEmpty(comment) || !_.isObject(comment)) { return callback(new Error('Comment parameter missing or invalid.')); }
        if (_.isEmpty(comment.user)) { return callback(new Error('Missing or invalid comment.user object.')); }
        if (_.isEmpty(comment.user.string)) { return callback(new Error('Missing or invalid comment.user.email string.')); }

        client.post(`${route}/${requirementId}/comments`, comment, callback);
    }

    return {
        get,
        tasks,
        remove,
        addComment
    }
};
