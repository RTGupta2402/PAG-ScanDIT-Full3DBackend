var SapHtzModel = require('../models/SapHtz');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');

/**
 * Get the Htz number results from SAP_HTZ collection of mongodb from parse server 
 */
const getHtzSearchResults = async (sapHtzNumber) => {
    try {
        var result = await helper.searchDataByObjectId(SapHtzModel.SAP_HTZ_COLLECTION, SapHtzModel.SAP_HTZ_HTZ_NUMBER_FIELD, sapHtzNumber);
        if(result.length > 0) {
            var sapNumberArray = [];
            result.forEach(sapNumber => {
                sapNumberArray.push(new SapHtzModel.SapHtz(sapNumber.get(SapHtzModel.SAP_HTZ_SAP_NUMBER_FIELD),
                sapNumber.get(SapHtzModel.SAP_HTZ_HTZ_NUMBER_FIELD),
                sapNumber.get(SapHtzModel.SAP_HTZ_HTZ_NAME_FIELD),
                sapNumber.get(SapHtzModel.SAP_HTZ_PLAN_GROUP_FIELD),
                sapNumber.get(SapHtzModel.SAP_HTZ_PLAN_GROUP_COUNTER_FIELD),
                sapNumber.get(SapHtzModel.SAP_HTZ_MATERIAL_IMAGE_FIELD) !== undefined ? sapNumber.get(SapHtzModel.SAP_HTZ_MATERIAL_IMAGE_FIELD)._url: null,
                sapNumber.get(SapHtzModel.SAP_HTZ_IS_SELECTABLE_FIELD)))
            });
            return sapNumberArray;
        } else {
            return result;
        }
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching sap_htz objects on basis of htz number searched.
 * @param {Object} request 
 * @returns {Object} response
 */

const seachHtzNumber = async (request) => {
    var htzNumberToBeSearched = request.params.searchHtz.toString().toUpperCase();
    var htzNumberResults ;
    try {
        htzNumberResults = await getHtzSearchResults(htzNumberToBeSearched);
        return helper.createResponse(htzNumberResults, constants.SUCCESS, constants.SUCCESS_CODE)
    }
    catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
}

module.exports = {
    seachHtzNumber
}