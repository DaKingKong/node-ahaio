'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/products';

    /**
     * Gets details about a specific product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Updates a product
     * @param {string} id - Numeric ID or string key of product
     * @param {object} params
     * @param {string} params.name
     * @param {string} params.reference_prefix - Product abbreviation
     * @param {string} params.description
     * @param {string} params.parent_id - Numeric ID or prefix of product line to be parent. Must exist.
     * @param {function} callback
     */
    function update(id, params, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }
        if (_.isEmpty(params)) { return callback(new Error('Body required')); }

        var payload = {
            product: params
        };

        client.put(`${route}/${id}`, payload, callback);
    }

    /**
     * Creates a new product
     * @param {string} name
     * @param {string} prefix
     * @param {object} [optionalArgs]
     * @param {string} [optionalArgs.description]
     * @param {string} [optionalArgs.parent_id] - Numeric ID or prefix of product line to be parent. Must exist.
     * @param callback
     */
    function create(name, prefix, optionalArgs, callback) {
        if (_.isEmpty(name)) { return callback(new Error('Product name required')); }
        if (_.isEmpty(prefix)) { return callback(new Error('Product prefix required')); }

        if (_.isFunction(optionalArgs)) {
            callback = optionalArgs;
            optionalArgs = {};
        }

        var payload = {
            product: _.extend({name: name, reference_prefix: prefix}, optionalArgs)
        };

        client.post(`${route}`, body, callback);
    }

    function list(callback) {
        client.get(`${route}`, callback);
    }

    /**
     * Gets a list of all the releases in a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function releases(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/releases`, callback);
    }

    /**
     * Gets a list of all the initiatives for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function initiatives(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/initiatives`, callback);
    }

    /**
     * Gets a list of all the comments for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function comments(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/comments`, callback);
    }

    /**
     * Gets a list of all the ideas for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function ideas(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/ideas`, callback);
    }

    /**
     * Gets a list of all the idea categories for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function ideaCategories(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/idea_categories`, callback);
    }

    /**
     * Gets a list of all the pages for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function pages(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/pages`, callback);
    }

    /**
     * Gets a list of all the users for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function users(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/users`, callback);
    }

    /**
     * Gets a list of all the features for a product
     * @param {string} id - Numeric ID or string key of product
     * @param {function} callback
     */
    function features(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/features`, callback);
    }

    /**
     * Search product for features by name or ID
     * @param {string} id - Numeric ID or string key of product
     * @param {string} query
     * @param {function} callback
     */
    function searchFeatures(id, query, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Product ID required')); }
        if (_.isEmpty(query)) { return callback(new Error('Product ID required')); }

        client.get(`${route}/${id}/features`, {q: query}, callback);
    }

    return {
        get,
        update,
        create,
        list,
        releases,
        initiatives,
        comments,
        ideas,
        ideaCategories,
        pages,
        users,
        features,
        searchFeatures
    }
};
