var jigsModel = require('../models/jigs.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the jigs result from parse server
 */
const getJigsBySapMaterialNumber = async (sapMaterialNumber) => {
    try {
        var result = await helper.getDataFromCollection(jigsModel.JIGS_COLLECTION,jigsModel.JIGS_SAP_MATERIAL_FIELD, sapMaterialNumber,[]);
        return result;
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching jigs on basis of material number searched.
 * @param {Object} request 
 * @returns {Object} response
 */

const getJigsForSapMaterialNumber = async (request) => {
    const sapMaterialNumber = util.sanitizeString(request.params.sapNumber.toString());
    if (util.isNormalInteger(sapMaterialNumber)) {
        var sapMaterialNumberResults ;
        try {
            sapMaterialNumberResults = await getJigsBySapMaterialNumber(parseInt(sapMaterialNumber));
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
    getJigsForSapMaterialNumber,
}