var jigsBySapModule = require('../services/jigsBySap.service');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');

/**
 * Cloud function to search Jigs on basis of sap material number search
 */
Parse.Cloud.define("getJigsForSapMaterialNumber", async (request) => {
    return await validator.validateGetJigsForSapRequest(request) ?
        await jigsBySapModule.getJigsForSapMaterialNumber(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});
