var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');
var visualWorkPlanTasksModule = require('../../plan/services/visualWorkPlanTasks.service')
/**
 * Cloud function to create new Plan by inserting unique Plan Reference Number
 */
Parse.Cloud.define("addVisualWorkPlanTasksForStation", async (request) => {
  return await validator.validateVisualWorkPlanTasksAddRequest(request) ?
    await visualWorkPlanTasksModule.addVisualWorkPlanTasksForStation(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

