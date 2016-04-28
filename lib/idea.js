'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/ideas';

    /**
     * Gets details about a specific idea
     * @param {string} id
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Idea ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Search for ideas by name or ID
     * @param {string} query - Sub-string to match against idea name or ID
     * @param callback
     */
    function search(query, callback) {
        if (_.isEmpty(query)) { return callback(new Error('Query required')); }

        client.get(`${route}`, {q: query}, callback);
    }

    /**
     * Search for ideas by name or ID
     * @param {string} query - Sub-string to match against idea name or ID
     * @param callback
     */
    function searchRelated(query, callback) {
        if (_.isEmpty(query)) { return callback(new Error('Query required')); }

        client.get(`${route}/related`, {q: query}, callback);
    }

    /**
     * Search for ideas by tag
     * @param {string} tag
     * @param callback
     */
    function searchByTag(tag, callback) {
        if (_.isEmpty(tag)) { return callback(new Error('Tag parameter required')); }

        client.get(`${route}`, {tag: tag}, callback);
    }

    /**
     * Gets a specific ideas endorsements
     * @param {string} id
     * @param {function} callback
     */
    function endorsements(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Idea ID required')); }

        client.get(`${route}/${id}/endorsements`, callback);
    }

    /**
     * Gets a specific ideas subscriptions
     * @param {string} id
     * @param {function} callback
     */
    function subscriptions(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Idea ID required')); }

        client.get(`${route}/${id}/subscriptions`, callback);
    }

    /**
     * Gets a specific ideas tasks
     * @param {string} id
     * @param {function} callback
     */
    function tasks(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Idea ID required')); }

        client.get(`${route}/${id}/tasks`, callback);
    }

    return {
        get,
        search,
        searchByTag,
        searchRelated,
        endorsements,
        subscriptions,
        tasks
    }
};
