var planModel = require('../models/plan.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');
var visualWorkPlanTasksModel = require('../models/visualWorkPlanTasks.model');
var visualWorkPlanStationsModel = require('../models/visualWorkPlanStations.model');

/****
 * function to get the plan by plan reference number result from parse server
 */
const getPlanByPlanReferenceNumber = async (planReferenceNumber) => {
    try {
        let result = await helper.getDataByObjectId(planModel.PLAN_COLLECTION, planModel.PLAN_REFERENCE_NUMBER_FIELD, planReferenceNumber);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

/****
 * function to check whther visual work plan station exists in DB or not
 */

const checkVisualWorkPlanStationExistence = async (visualWorkStationObjectIdToBeCheck) => {
    try {
        let result = await helper.getDataByObjectId(visualWorkPlanStationsModel.VISUAL_WORK_PLAN_STATIONS_COLLECTION, visualWorkPlanStationsModel.VISUAL_WORK_PLAN_STATIONS_OBJECT_ID_FIELD, visualWorkStationObjectIdToBeCheck)
        return result;
    } catch (ex) {
        return false;
    }
}

/**
 * 
 * @param {object} result 
 * @returns {array} array 
 */
const prepareVisualWorkPlanTasksArrayResult = (result) => {
    let visualWorkPlanTasksArray = [];
    result.forEach(visualWorkPlanTask => {
        visualWorkPlanTasksArray.push(
            new visualWorkPlanTasksModel.VisualWorkPlanTasks(
                visualWorkPlanTask.get(visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASKS_NAME_FIELD),
                visualWorkPlanTask.get(visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASKS_POSITION_FIELD),
                visualWorkPlanTask.get(visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASKS_VISAUL_WORK_PLAN_STATION_FIELD),
                visualWorkPlanTask.get(visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASKS_PLAN_FIELD),
                visualWorkPlanTask.id
            )
        )
    });
    return visualWorkPlanTasksArray;
}

/****
 * function to save tasks for a station and their positions(order of showing)  with respect to plan
 */
const saveVisualWorkPlanTasks = async (plan, visualStationObjectId, tasks) => {
    try {
        let planObjectId = await plan.id;
        let taskData = [];
        tasks.forEach(task => {
            taskData.push(new visualWorkPlanTasksModel.VisualWorkPlanTasks(
                task.taskName,
                task.position,
                visualStationObjectId,
                planObjectId,
            ))
        });
        var result = await visualWorkPlanTasksModel.save(taskData);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * Function to Task for a station during visual work plan creation provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const addVisualWorkPlanTasksForStation = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const visualWorkStationObjectId = util.sanitizeString(request.params.visualWorkStationObjectId.toString());
    const tasks = request.params.tasksForVisualWorkStation;
    if (!util.isArray(tasks))
        return helper.createResponse(null, constants.ERROR_VISUAL_WORK_PLAN_TASKS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (tasks.length <= 0)
        return helper.createResponse(null, constants.ERROR_NO_VISUAL_WORK_PLAN_TASK_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let IsVisualWorkPlanStationExists = await checkVisualWorkPlanStationExistence(visualWorkStationObjectId);
        if (!IsVisualWorkPlanStationExists)
            return helper.createResponse(null, constants.ERROR_VISUAL_WORK_PLAN_STATION_NOT_FOUND, constants.CONFLICT_CODE);
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let result = await saveVisualWorkPlanTasks(planObj, visualWorkStationObjectId, tasks);
        if (!result)
            return helper.createResponse(null, constants.ERROR_SAVING_VISUAL_WORK_TASKS, constants.CONFLICT_CODE);
        return helper.createResponse(prepareVisualWorkPlanTasksArrayResult(result), constants.MESSAGE_VISUAL_WORK_TASKS_ADDED, constants.SUCCESS_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
}
module.exports = {
    addVisualWorkPlanTasksForStation
}