var prologueFileModel = require('../models/prologueFile.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the File (image or any type) from parse server
 * @param {Object} request 
 * @returns {Object} response
 */
const getFileForKey = async (request) => {
    const key = util.sanitizeString(request.params.key.toString());
    var fileResults;
    try {
        fileResults = await helper.getDataFromCollection(prologueFileModel.PROLOGUE_FILE_COLLECTION, prologueFileModel.KEY_FIELD, key,[]);
        return fileResults;
    }
    catch (ex) {
        throw ex;
    }
}

module.exports = {
    getFileForKey,
}