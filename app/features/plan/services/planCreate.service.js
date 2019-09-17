var planModel = require('../models/plan.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');
var SapHtzModel = require('../../sap_htz/models/SapHtz');


/****
 * function to get the search results from parse server
 */
const savePlanRefernceNumber = async (referenceNumber) => {
    try {
        var planData = new planModel.Plan(referenceNumber)
        var result = await planModel.save(planData);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * 
 * @param {string} sapNumber Valid SAP Material Number 
 * @param {string} htzNumber Valid HTZ Number associated with SAP Material Number
 * @param {string} planGroup  Valid Plan group associated with SAP Material number 
 */
const checkSapHtzPlanGroupAssociation = async (sapNumber, htzNumber, planGroup) => {
    try {
        var result = await helper.getDataByObjectId(SapHtzModel.SAP_HTZ_COLLECTION, SapHtzModel.SAP_HTZ_SAP_NUMBER_FIELD, sapNumber);
        if (result) {
            if (result.get(SapHtzModel.SAP_HTZ_HTZ_NUMBER_FIELD) === htzNumber && result.get(SapHtzModel.SAP_HTZ_PLAN_GROUP_FIELD) === planGroup) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (ex) {
        return false;
    }
}

const checkPlanGroupcounterUnique = async (planGroupCounterToBeChecked) => {
    try {
        var result = await helper.getDataByObjectId(SapHtzModel.SAP_HTZ_COLLECTION, SapHtzModel.SAP_HTZ_PLAN_GROUP_COUNTER_FIELD, planGroupCounterToBeChecked)
        if (result === undefined) {
            return true;
        } else {
            return false;
        }
    } catch (ex) {
        return false;
    }
}

/****
 * function to check whther the refernce number created for Plan is unique or not
 */
const checkPlanReferenceNumberUnique = async (planReferenceNumberToBeChecked) => {
    try {
        var result = await helper.getDataByObjectId(planModel.PLAN_COLLECTION, planModel.PLAN_REFERENCE_NUMBER_FIELD, planReferenceNumberToBeChecked)
        if (result === undefined) {
            return true;
        } else {
            return false;
        }
    } catch (ex) {
        return false;
    }
}
/**
 * Function to create the unique plan reference number provided all the request body
 * @param {Object} request 
 * @returns {Object} response
 */

const createPlanWithUniqueReference = async (request) => {
    const sapNumber = util.sanitizeString(request.params.sapMaterialNumber.toString());
    const htzNumber = util.sanitizeString(request.params.htzNumber.toString());
    const planGroup = util.sanitizeString(request.params.planGroup.toString());
    const plangroupcounter = util.sanitizeString(request.params.planGroupCounter.toString());

    if (!util.isNormalInteger(plangroupcounter))
        return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_NOT_INTEGER, constants.BAD_REQUEST_CODE);
    var planUniqueRefernceNumber = planGroup.concat('-', plangroupcounter);
    try {
        var isPlanGroupCounterUnique = await checkPlanGroupcounterUnique(plangroupcounter);
        if (!isPlanGroupCounterUnique)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_EXISTS, constants.CONFLICT_CODE)
        var isPlanReferenceNumberUnique = await checkPlanReferenceNumberUnique(planUniqueRefernceNumber);
        if (!isPlanReferenceNumberUnique)
            return helper.createResponse(null, constants.ERROR_REFERENCE_NUMBER_EXISTS, constants.CONFLICT_CODE)
        var isSapHtzPlanGroupAssociationCorrect = await checkSapHtzPlanGroupAssociation(sapNumber, htzNumber, planGroup);
        if (!isSapHtzPlanGroupAssociationCorrect)
            return helper.createResponse(null, constants.MESSAGE_SAP_HTZ_PLAN_NOT_CORRECT, constants.BAD_REQUEST_CODE)
        var createdReferenceNumber = await savePlanRefernceNumber(planUniqueRefernceNumber);
        if (!createPlanWithUniqueReference)
            return helper.createResponse(null, constants.ERROR_SAVING_REFERENCE_NUMBER, constants.BAD_REQUEST_CODE);
        var insertedPlanGroupCounter = await SapHtzModel.insertPlanGroupCounter(sapNumber, plangroupcounter);
        if (!insertedPlanGroupCounter)
            return helper.createResponse(null, constants.ERROR_INSERTING_PLAN_GROUP_COUNTER, constants.BAD_REQUEST_CODE);
        return helper.createResponse(new planModel.Plan(createdReferenceNumber), constants.MESSAGE_PLAN_REFERNCE_CREATED, constants.SUCCESS_CODE);
    }
    catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }

    //Create reference number from plan graoup and plan group counter received by request
}

module.exports = {
    createPlanWithUniqueReference,
}