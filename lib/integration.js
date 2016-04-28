'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/integrations';

    /**
     * Gets details about a specific integration
     * @param {string} integrationId - ID of integration the field belongs to
     * @param {string} fieldName - Integration fields to search for the value
     * @param {string} fieldValue - Value needle to match
     * @param {function} callback
     */
    function findObjectsByFieldKeyValue(integrationId, fieldName, fieldValue, callback) {
        if (_.isEmpty(integrationId)) { return callback(new Error('Integration ID required')); }
        if (_.isEmpty(integrationId)) { return callback(new Error('Field Name required')); }
        if (_.isEmpty(integrationId)) { return callback(new Error('Field Value required')); }

        client.get(`${route}/${integrationId}/fields/${fieldName}/value/${fieldValue}`, callback);
    }

    return {
        findObjectsByFieldKeyValue
    }
};
