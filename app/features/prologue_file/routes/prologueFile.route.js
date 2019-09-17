var prologueFileModule = require('../services/prologueFile.service');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');

/**
 * Cloud function to get File(Image) with respect to specific key 
 */
Parse.Cloud.define("getFileByKey", async (request) => {
    return await validator.validateGetFileByKeyRequest(request) ?
        await prologueFileModule.getFileForKey(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});



