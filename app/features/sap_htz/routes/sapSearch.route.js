var seachSapModule = require('../services/sapSearch.service');
var searchHtzModule = require('../services/htzSearch.service');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');

/**
 * Cloud function to search Sap_htz on basis of sap material number search
 */
Parse.Cloud.define("searchMaterialNumber", async (request) => {
  return await validator.validateSapSearchRequest(request) ?
    await seachSapModule.seachSapMaterialNumber(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to search Sap_htz on basis of Htz number search
 */
Parse.Cloud.define("searchHtzNumber", async (request) => {
  return await validator.validateHtzSearchRequest(request) ?
    await searchHtzModule.seachHtzNumber(request)
    : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});