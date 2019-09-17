var regulationModel = require('../model/regulation.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/**
 * function to get the regulations results from parse server
 */
const getRegulationsNotLinkedToAny = async () => {
    try {
        var result = await helper.getDataFromCollection(regulationModel.REGULATION_COLLECTION,regulationModel.REGULATION_SAP_MATERIAL_NUMBER_FIELD, undefined,[regulationModel.REGULATION_PROCESS_FIELD, regulationModel.REGULATION_KIND_FIELD]);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching Regulations not linked to any sap material number
 * @param {Object} request 
 * @returns {Object} response
 */

const getPredefinedRegulations = async () => {
        var regulationsResults ;
        try {
            regulationsResults = await getRegulationsNotLinkedToAny();
            return helper.createResponse(regulationsResults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }

}

module.exports = {
    getPredefinedRegulations,
}