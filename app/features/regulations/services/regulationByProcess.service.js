var regulationModel = require('../model/regulation.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the regulations by process object id
 */
const getRegulationsByProcess = async (processObjectId) => {
    try {
        var result = await regulationModel.getRegulationnsByProcessOrKind(processObjectId , regulationModel.REGULATION_PROCESS_COLLECTION, regulationModel.REGULATION_PROCESS_FIELD);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching Regulations on basis on Regulation_Process Object ID
 * @param {Object} request 
 * @returns {Object} response
 */

const getRegulationByProcess = async (request) => {
    const processObjectId = util.sanitizeString(request.params.processId.toString());
        var regulationResults ;
        try {
            regulationResults = await getRegulationsByProcess(processObjectId);
            return helper.createResponse(regulationResults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }
}

module.exports = {
    getRegulationByProcess,
}