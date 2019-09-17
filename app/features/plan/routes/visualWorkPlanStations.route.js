var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');
var visualWorkPlanStationsModule = require('../../plan/services/visualWorkPlanStations.service')
/**
 * Cloud function to create new Plan by inserting unique Plan Reference Number
 */
Parse.Cloud.define("addVisualWorkPlanStations", async (request) => {
  return await validator.validateVisualWorkPlanStationsAddRequest(request) ?
    await visualWorkPlanStationsModule.addVisualWorkPlanStations(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

