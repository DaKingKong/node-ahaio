'use strict';

var _ = require('lodash');

module.exports = function(client) {
    var route = '/comments';

    /**
     * Gets details about a specific comment
     * @param {string} id - Numeric ID of the comment
     * @param {function} callback
     */
    function get(id, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Comment ID required')); }

        client.get(`${route}/${id}`, callback);
    }

    /**
     * Specific a comment attachment via a link
     * @param {string} id - Numeric ID of the comment
     * @param {string} fileUrl - AHA URL of uploaded file
     * @param {string} fileName - AHA uploaded file name
     * @param [contentType='text/html'] - File content type
     * @param {function} callback
     */
    function addAttachment(id, fileUrl, fileName, contentType, callback) {
        if (_.isEmpty(id)) { return callback(new Error('Comment ID required')); }
        if (_.isEmpty(fileUrl)) { return callback(new Error('File Url required')); }
        if (_.isEmpty(fileName)) { return callback(new Error('File Name required')); }

        if (_.isFunction(contentType)) {
            callback = contentType;
            contentType = 'text/html';
        }

        var payload = {
            attachment: {
                file_url: fileUrl,
                file_name: fileName,
                content_type: contentType
            }
        }

        client.post(`${route}/${id}/attachments`, payload, callback);
    }

    // todo: implement uploadAttachment
    // http://www.aha.io/api/resources#Upload%20and%20attach%20a%20file%20to%20a%20comment

    return {
        get,
        addAttachment
    }
};
