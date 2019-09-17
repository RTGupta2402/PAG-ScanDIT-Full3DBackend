var planModel = require('../models/plan.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');
var visualWorkPlanStationsModel = require('../models/visualWorkPlanStations.model');
var plantModel = require('../../plant/models/plant.model');

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
 * 
 * @param {object} result 
 * @returns {array} array 
 */
const prepareVisualWorkPlanStationsResultArray = (result) => {
    let visualWorkPlanStationsArray = [];
    result.forEach(visualWorkPlanstation => {
        visualWorkPlanStationsArray.push(
            new visualWorkPlanStationsModel.VisualWorkPlanStations(
                visualWorkPlanstation.get(visualWorkPlanStationsModel.VISUAL_WORK_PLAN_STATIONS_PLAN_STATION_FIELD).objectId,
                visualWorkPlanstation.get(visualWorkPlanStationsModel.VISUAL_WORK_PLAN_STATIONS_POSITION_FIELD),
                visualWorkPlanstation.get(visualWorkPlanStationsModel.VISUAL_WORK_PLAN_STATIONS_PLAN_FIELD).objectId,
                visualWorkPlanstation.id
            )
        )
    });
    return visualWorkPlanStationsArray;
}

/****
 * function to save stations and their positions(order of showing)  with respect to plan
 */
const saveVisualWorkPlanStations = async (plan, stations) => {
    try {
        let planObjectId = await plan.id;
        let stationColletion = plantModel.STATION_COLLECTION;
        let planColletion = planModel.PLAN_COLLECTION;
        var result = await visualWorkPlanStationsModel.save(planObjectId, stations, stationColletion, planColletion);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * Function to add stations during visual work plan creation provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const addVisualWorkPlanStations = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const WorkPlanStations = request.params.WorkPlanStations;
    if (!util.isArray(WorkPlanStations))
        return helper.createResponse(null, constants.ERROR_VISUAL_WORK_PLAN_STATIONS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (WorkPlanStations.length <= 0)
        return helper.createResponse(null, constants.ERROR_NO_VISUAL_WORK_PLAN_STATION_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let result = await saveVisualWorkPlanStations(planObj, WorkPlanStations);
        if (!result)
            return helper.createResponse(null, constants.ERROR_SAVING_VISUAL_WORK_STATIONS, constants.CONFLICT_CODE);
        return helper.createResponse(prepareVisualWorkPlanStationsResultArray(result), constants.MESSAGE_VISUAL_WORK_STATIONS_ADDED, constants.SUCCESS_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
}




module.exports = {
    addVisualWorkPlanStations
}