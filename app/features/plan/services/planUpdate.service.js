var planModel = require('../models/plan.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');
var regulationModel = require('../../regulations/model/regulation.model');
var plantModel = require('../../plant/models/plant.model');
var jigsModel = require('../../jigs/models/jigs.model');
var toolsModel = require('../../tools/models/tools.model');

/****
 * function to get the plan by plan reference number result from parse server
 */
const getPlanByPlanReferenceNumber = async (planReferenceNumber) => {
    try {
        var result = await helper.getDataByObjectId(planModel.PLAN_COLLECTION, planModel.PLAN_REFERENCE_NUMBER_FIELD, planReferenceNumber);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * Function to update regulations of a plan by unique plan reference number provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const updateRegulationsForPlan = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const regulationsAttached = request.params.planRegulations;
    if (!util.isArray(regulationsAttached))
        return helper.createResponse(null, constants.ERROR_PLAN_ATTACHED_REGULATIONS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (!regulationsAttached.length > 0)
        return helper.createResponse(null, constants.ERROR_NO_PLAN_REGULATION_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let isUpdatedplanAttachedRegulations = await helper.updateAttachedFieldOfCollection(planObj, planModel.PLAN_REGULATIONS_ATTACHED_FIELD, regulationsAttached, regulationModel.REGULATION_COLLECTION);
        if (!isUpdatedplanAttachedRegulations)
            return helper.createResponse(null, constants.ERROR_UPDATING_PLAN_ATTACHED_REGULATIONS, constants.CONFLICT_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
    return helper.createResponse(null, constants.MESSAGE_PLAN_ATTACHED_REGULATIONS_UPDATED, constants.SUCCESS_CODE);
}

/**
 * Function to update stations of a plan by unique plan reference number provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const updateStationsForPlan = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const stationsAttached = request.params.planStations;
    if (!util.isArray(stationsAttached))
        return helper.createResponse(null, constants.ERROR_PLAN_ATTACHED_STATIONS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (!stationsAttached.length > 0)
        return helper.createResponse(null, constants.ERROR_NO_PLAN_STATION_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let isUpdatedplanAttachedRegulations = await helper.updateAttachedFieldOfCollection(planObj, planModel.PLAN_STATIONS_ATTACHED_FIELD, stationsAttached, plantModel.STATION_COLLECTION);
        if (!isUpdatedplanAttachedRegulations)
            return helper.createResponse(null, constants.ERROR_UPDATING_PLAN_ATTACHED_STATIONS, constants.CONFLICT_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
    return helper.createResponse(null, constants.MESSAGE_PLAN_ATTACHED_STATIONS_UPDATED, constants.SUCCESS_CODE);
}

/**
 * Function to update stations of a plan by unique plan reference number provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const updateJigsForPlan = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const jigsAttached = request.params.planJigs;
    if (!util.isArray(jigsAttached))
        return helper.createResponse(null, constants.ERROR_PLAN_ATTACHED_JIGS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (!jigsAttached.length > 0)
        return helper.createResponse(null, constants.ERROR_NO_PLAN_JIG_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let isUpdatedplanAttachedJigs = await helper.updateAttachedFieldOfCollection(planObj, planModel.PLAN_JIGS_ATTACHED_FIELD, jigsAttached, jigsModel.JIGS_COLLECTION);
        if (!isUpdatedplanAttachedJigs)
            return helper.createResponse(null, constants.ERROR_UPDATING_PLAN_ATTACHED_JIGS, constants.CONFLICT_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
    return helper.createResponse(null, constants.MESSAGE_PLAN_ATTACHED_JIGS_UPDATED, constants.SUCCESS_CODE);
}

/**
 * Function to update tools of a plan by unique plan reference number provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const updateToolsForPlan = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const toolsAttached = request.params.planTools;
    if (!util.isArray(toolsAttached))
        return helper.createResponse(null, constants.ERROR_PLAN_ATTACHED_TOOLS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (!toolsAttached.length > 0)
        return helper.createResponse(null, constants.ERROR_NO_PLAN_TOOL_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let isUpdatedplanAttachedTools = await helper.updateAttachedFieldOfCollection(planObj, planModel.PLAN_TOOLS_ATTACHED_FIELD, toolsAttached, toolsModel.TOOLS_COLLECTION);
        if (!isUpdatedplanAttachedTools)
            return helper.createResponse(null, constants.ERROR_UPDATING_PLAN_ATTACHED_TOOLS, constants.CONFLICT_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
    return helper.createResponse(null, constants.MESSAGE_PLAN_ATTACHED_TOOLS_UPDATED, constants.SUCCESS_CODE);
}

module.exports = {
    updateRegulationsForPlan,
    updateStationsForPlan,
    updateJigsForPlan,
    updateToolsForPlan,
}