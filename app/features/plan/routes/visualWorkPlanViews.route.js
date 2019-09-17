var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');
var visualWorkPlanViewsModule = require('../../plan/services/visualWorkPlanViews.service')
/**
 * Cloud function to create new views with respect to a task and plan
 */
Parse.Cloud.define("addVisualWorkPlanViewsForTask", async (request) => {
  return await validator.validateVisualWorkPlanViewsAddRequest(request) ?
    await visualWorkPlanViewsModule.addVisualWorkPlanViewsForTask(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

