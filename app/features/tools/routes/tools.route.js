var toolsStationModule = require('../services/toolsByStation.service');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');

/**
 * Cloud function to search tools on basis of station object id passed
 */
Parse.Cloud.define("getToolsForStation", async (request) => {
    return await validator.validateGetToolsForStationRequest(request) ?
        await toolsStationModule.getToolsForStation(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

