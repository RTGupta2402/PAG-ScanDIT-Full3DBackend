var planModel = require('../models/plan.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');
var SapHtzModel = require('../../sap_htz/models/SapHtz');


/****
 * function to get Regulations Associated With Plan
 */
const regulationsForPlan = async (planObjectId) => {
    try {
        var result = planModel.getRegulationsAssociatedWithPlan(planObjectId);
        if (result) {
            return result;
        }
    }
    catch (ex) {
        throw ex;
    }
}

/**
* Function to get Regulations Associated With Plan provided all parameters in the request body
* @param {Object} request 
* @returns {Object} response
*/
const getRegulationsAssociatedWithPlan = async (request) => {
    const planObjectId = util.sanitizeString(request.params.planObjectId.toString());
    try {
        //var result = await planModel.getRegulationsAssociatedWithPlan(planObjectId);
        let result = await regulationsForPlan(planObjectId)
        if (result) {
            return result;
        }
    }
    catch (ex) {
        throw ex;
    }
}

module.exports = {
    getRegulationsAssociatedWithPlan
}