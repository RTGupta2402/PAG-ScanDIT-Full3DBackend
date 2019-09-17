var regulationModel = require('../model/regulation.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the regulations results from parse server
 */
const getRegulationsByKind = async (regulationKindId) => {
    try {
        var result = await regulationModel.getRegulationnsByProcessOrKind(regulationKindId , regulationModel.REGULATION_KIND_COLLECTION, regulationModel.REGULATION_KIND_FIELD);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching regulations  on basis of regulation_Type Object ID.
 * @param {Object} request 
 * @returns {Object} response
 */

const getRegulationByKind = async (request) => {
    const regulationKindObjectId = util.sanitizeString(request.params.regulationKindId.toString());
        var regulationResults ;
        try {
            regulationResults = await getRegulationsByKind(regulationKindObjectId);
            return helper.createResponse(regulationResults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }
}

module.exports = {
    getRegulationByKind,
}