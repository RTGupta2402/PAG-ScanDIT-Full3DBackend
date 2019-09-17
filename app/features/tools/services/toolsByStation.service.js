var toolModel = require('../models/tools.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the tools by station from parse server
 */
const getToolsForStationById = async (stationId) => {
    try {
        var result = await helper.getDataFromCollectionWithRelationObjectId(toolModel.TOOLS_COLLECTION,
            toolModel.TOOLS_STATION_ATTACHED_FIELD, 
            stationId , 
            toolModel.STATION_COLLECTION);
            
        return result;
    }
    catch (ex) {
        throw ex;
    }
}
/**
 * Fetching Tools for station id passed
 * @param {Object} request 
 * @returns {Object} response
 */

const getToolsForStation  = async (request) => {
    const stationId = util.sanitizeString(request.params.stationId.toString());
        var toolsresults ;
        try {
            toolsresults = await getToolsForStationById(stationId);
            return helper.createResponse(toolsresults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }
}

module.exports = {
    getToolsForStation,
}