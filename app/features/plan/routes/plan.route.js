var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');
var planCreateModule = require('../../plan/services/planCreate.service')
var planUpdateModule = require('../../plan/services/planUpdate.service')
/**
 * Cloud function to create new Plan by inserting unique Plan Reference Number
 */
Parse.Cloud.define("createPlanReferenceNumber", async (request) => {
  return await validator.validatePlanReferenceCreateRequest(request) ?
    await planCreateModule.createPlanWithUniqueReference(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to update plan's attached regulations on basis of unique plan reference number 
 */
Parse.Cloud.define("updatePlanRegulations", async (request) => {
  return await validator.validatePlanRegulationsUpdateRequest(request) ?
    await planUpdateModule.updateRegulationsForPlan(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to update plan's attached stations on basis of unique plan reference number 
 */
Parse.Cloud.define("updatePlanStations", async (request) => {
  return await validator.validatePlanStationsUpdateRequest(request) ?
    await planUpdateModule.updateStationsForPlan(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to update plan's attached jigs on basis of unique plan reference number 
 */
Parse.Cloud.define("updatePlanJigs", async (request) => {
  return await validator.validatePlanJigsUpdateRequest(request) ?
    await planUpdateModule.updateJigsForPlan(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to update plan's attached tools on basis of unique plan reference number 
 */
Parse.Cloud.define("updatePlanTools", async (request) => {
  return await validator.validatePlanToolsUpdateRequest(request) ?
    await planUpdateModule.updateToolsForPlan(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});
