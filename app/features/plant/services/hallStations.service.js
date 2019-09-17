var plantModel = require('../models/plant.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the search results from parse server
 */
const getStationByHallObjectId = async (hallObjectId) => {
    try {
        var result = await helper.getDataFromCollectionWithPointerObjectId(plantModel.STATION_COLLECTION,
            plantModel.STATION_HALL_ATTACHED_FIELD, 
            hallObjectId , 
            [plantModel.STATION_HALL_ATTACHED_FIELD] , 
            plantModel.HALL_COLLECTION);

        return result;
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

const getStationsforHall  = async (request) => {
    const hallObjectId = util.sanitizeString(request.params.hallId.toString());
    //if (util.isNormalInteger(plantNumber)) {
        var plantHallsResults ;
        try {
            plantHallsResults = await getStationByHallObjectId(hallObjectId);
            return helper.createResponse(plantHallsResults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }
  //  } else {
   //     return helper.createResponse(null, constants.ERROR_PLANT_NUMBER_NOT_INTEGER, constants.BAD_REQUEST_CODE);
   // }

}

module.exports = {
    getStationsforHall,
}