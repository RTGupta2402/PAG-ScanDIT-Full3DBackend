var regulationsBySapModule = require('../services/regulationBySap.service');
var regulationsByProcessModule = require('../services/regulationByProcess.service');
var regulationsByKindModule = require('../services/regulationBykind.service');
var regulationsModule = require('../services/regulation.service');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');

/**
 * Cloud function to get regulations on basis of sap material number
 */
Parse.Cloud.define("getRegulationsForSapMaterialNumber", async (request) => {
    return await validator.validateGetRegulationsRequest(request) ?
        await regulationsBySapModule.getRegulationForSapMaterialNumber(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to get regulations on basis of process object id
 */
Parse.Cloud.define("getRegulationsForProcess", async (request) => {
    return await validator.validateGetRegulationsByProcessRequest(request) ?
        await regulationsByProcessModule.getRegulationByProcess(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});


/**
 * Cloud function to get regulations on basis of kind object id
 */
Parse.Cloud.define("getRegulationsForKind", async (request) => {
    return await validator.validateGetRegulationsByKindRequest(request) ?
        await regulationsByKindModule.getRegulationByKind(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});


/**
 * Cloud function to get regulations not linked to any SAP Material number
 */
Parse.Cloud.define("getPredefinedRegulations", async () => {
    return await regulationsModule.getPredefinedRegulations();
});