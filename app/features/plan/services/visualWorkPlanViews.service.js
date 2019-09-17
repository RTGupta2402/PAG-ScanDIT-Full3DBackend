var planModel = require('../models/plan.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');
var visualWorkPlanViewsModel = require('../models/visualWorkPlanViews.model');
var visualWorkPlanTasksModel = require('../models/visualWorkPlanTasks.model');

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
const prepareVisualWorkPlanViewsArrayResult = (result) => {
    let visualWorkPlanViewsArray = [];
    result.forEach(visualWorkPlanView => {
        visualWorkPlanViewsArray.push(
            new visualWorkPlanViewsModel.VisualWorkPlanViews(
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_NAME_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_POSITION_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_PROCESS_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_INSTRUCTION_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_DESCRIPTION_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_VIEW_PICTURE_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_VISAUL_WORK_PLAN_TASK_FIELD),
                visualWorkPlanView.get(visualWorkPlanViewsModel.VISUAL_WORK_PLAN_VIEWS_PLAN_FIELD),
                visualWorkPlanView.id
            )
        )
    });
    return visualWorkPlanViewsArray;
}

/****
 * function to check whther visual work plan task exists in DB or not
 */

const checkVisualWorkPlanTaskExistence = async (visualWorkPlanTaskObjectIdToBeCheck) => {
    try {
        let result = await helper.getDataByObjectId(visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASKS_COLLECTION, visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASK_OBJECT_ID_FIELD, visualWorkPlanTaskObjectIdToBeCheck)
        return result;
    } catch (ex) {
        return false;
    }
}

/****
 * function to save views for a task and their positions(order of showing)  with respect to plan
 */
const saveVisualWorkPlanViews = async (plan, visualTaskId, views) => {
    try {
        let planObjectId = await plan.id;
        let viewsData = [];
        views.forEach(view => {
            viewsData.push(new visualWorkPlanViewsModel.VisualWorkPlanViews(
                util.sanitizeString(view.taskName.toString()),
                parseInt(util.sanitizeString(view.position.toString())),
                util.sanitizeString(view.processId.toString()),
                util.sanitizeString(view.instruction.toString()),
                util.sanitizeString(view.description.toString()),
                util.sanitizeString(view.imageId.toString()),
                util.sanitizeString(visualTaskId.toString()),
                planObjectId,
            ))
        });
        var result = await visualWorkPlanViewsModel.save(viewsData);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * Function to views for a task during visual work plan creation provided all parameters in the request body
 * @param {Object} request 
 * @returns {Object} response
 */
const addVisualWorkPlanViewsForTask = async (request) => {
    const planReferenceNumber = util.sanitizeString(request.params.planReferenceNumber.toString());
    const taskObjId = util.sanitizeString(request.params.visualWorkTaskObjId.toString());
    const views = request.params.viewsForVisualWorkTask;
    if (!util.isArray(views))
        return helper.createResponse(null, constants.ERROR_VISUAL_WORK_PLAN_VIEWS_NOT_ARRAY, constants.BAD_REQUEST_CODE);
    if (views.length <= 0)
        return helper.createResponse(null, constants.ERROR_NO_VISUAL_WORK_PLAN_VIEW_PROVIDED, constants.BAD_REQUEST_CODE);
    try {
        let IsVisualWorkPlanTaskExists = await checkVisualWorkPlanTaskExistence(taskObjId);
        if (!IsVisualWorkPlanTaskExists)
            return helper.createResponse(null, constants.ERROR_VISUAL_WORK_PLAN_TASK_NOT_FOUND, constants.CONFLICT_CODE);
        let planObj = await getPlanByPlanReferenceNumber(planReferenceNumber);
        if (!planObj)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_FOUND, constants.CONFLICT_CODE);
        let result = await saveVisualWorkPlanViews(planObj, taskObjId, views);
        if (!result)
            return helper.createResponse(null, constants.ERROR_SAVING_VISUAL_WORK_VIEWS, constants.CONFLICT_CODE);
        return helper.createResponse(prepareVisualWorkPlanViewsArrayResult(result), constants.MESSAGE_VISUAL_WORK_VIEWS_ADDED, constants.SUCCESS_CODE);
    } catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
}

module.exports = {
    addVisualWorkPlanViewsForTask
}