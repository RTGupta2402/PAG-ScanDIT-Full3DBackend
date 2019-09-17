 var SapHtzmodel = require('../models/SapHtz');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');


/****
 * function to get the search results from parse server
 */
const getSapSearchResults = async (sapMaterialNumber) => {
    try {
        var result = await helper.searchDataByObjectId(SapHtzmodel.SAP_HTZ_COLLECTION,SapHtzmodel.SAP_HTZ_SAP_NUMBER_FIELD, sapMaterialNumber);
        if(result.length > 0) {
            var sapNumberArray = [];
            result.forEach(sapNumber => {
                sapNumberArray.push(new SapHtzmodel.SapHtz(sapNumber.get(SapHtzmodel.SAP_HTZ_SAP_NUMBER_FIELD),
                sapNumber.get(SapHtzmodel.SAP_HTZ_HTZ_NUMBER_FIELD),
                sapNumber.get(SapHtzmodel.SAP_HTZ_HTZ_NAME_FIELD),
                sapNumber.get(SapHtzmodel.SAP_HTZ_PLAN_GROUP_FIELD),
                sapNumber.get(SapHtzmodel.SAP_HTZ_PLAN_GROUP_COUNTER_FIELD),
                sapNumber.get(SapHtzmodel.SAP_HTZ_MATERIAL_IMAGE_FIELD) !== undefined ? sapNumber.get(SapHtzmodel.SAP_HTZ_MATERIAL_IMAGE_FIELD)._url: null,
                sapNumber.get(SapHtzmodel.SAP_HTZ_IS_SELECTABLE_FIELD)))
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
 * Fetching Material Number on basis of material number searched.
 * @param {Object} request 
 * @returns {Object} response
 */

const seachSapMaterialNumber = async (request) => {
    var sapNumberToBeSearched = request.params.searchSap.toString();
    var sapMaterialNumberResults ;
    try {
        sapMaterialNumberResults = await getSapSearchResults(sapNumberToBeSearched);
        return helper.createResponse(sapMaterialNumberResults, constants.SUCCESS, constants.SUCCESS_CODE)
    }
    catch (ex) {
        return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
    }
}

module.exports = {
    seachSapMaterialNumber,
}