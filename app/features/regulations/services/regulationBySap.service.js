var regulationModel = require('../model/regulation.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the regulations from parse server
 */
const getRegulations = async (sapMaterialNumber) => {
    try {
        var result = await helper.getDataFromCollection(regulationModel.REGULATION_COLLECTION,regulationModel.REGULATION_SAP_MATERIAL_NUMBER_FIELD, sapMaterialNumber,[regulationModel.REGULATION_PROCESS_FIELD, regulationModel.REGULATION_KIND_FIELD]);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching Regulations on basis of material number searched.
 * @param {Object} request 
 * @returns {Object} response
 */

const getRegulationForSapMaterialNumber = async (request) => {
    const sapMaterialNumber = util.sanitizeString(request.params.sapNumber.toString());
    if (util.isNormalInteger(sapMaterialNumber)) {
        var sapMaterialNumberResults ;
        try {
            sapMaterialNumberResults = await getRegulations(parseInt(sapMaterialNumber));
            return helper.createResponse(sapMaterialNumberResults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }
    } else {
        return helper.createResponse(null, constants.ERROR_SAP_NUMNER_NOT_INTEGER, constants.BAD_REQUEST_CODE);
    }

}

module.exports = {
    getRegulationForSapMaterialNumber,
}