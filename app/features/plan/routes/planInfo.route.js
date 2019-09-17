var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');
var planInfoModule = require('../../plan/services/planInfo.service')
/**
 * Cloud function to get regulations associated with plan
 */
Parse.Cloud.define("getRegulationsAssociatedWithPlan", async (request) => {
  return await validator.validateGetRegulationsAssociatedWithPlanRequest(request) ?
    await planInfoModule.getRegulationsAssociatedWithPlan(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});
