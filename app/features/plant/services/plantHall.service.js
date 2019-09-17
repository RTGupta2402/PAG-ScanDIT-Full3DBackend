var plantModel = require('../models/plant.model');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var util = require('../../../common/utility/utils');


/****
 * function to get the search results from parse server
 */
const getHallByPlantNumber = async (plantNumber) => {
    try {
        var result = await helper.getDataFromCollection(plantModel.HALL_COLLECTION,plantModel.HALL_PLANT_NUMBER_FIELD, plantNumber,[]);
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

const getHallsforPlant = async (request) => {
    const plantNumber = util.sanitizeString(request.params.plantNumber.toString());
    if (util.isNormalInteger(plantNumber)) {
        var plantHallsResults ;
        try {
            plantHallsResults = await getHallByPlantNumber(plantNumber);
            return helper.createResponse(plantHallsResults, constants.SUCCESS, constants.SUCCESS_CODE)
        }
        catch (ex) {
            return helper.createResponse(null, ex.message, constants.INTERNAL_SERVER_ERROR_CODE);
        }
    } else {
        return helper.createResponse(null, constants.ERROR_PLANT_NUMBER_NOT_INTEGER, constants.BAD_REQUEST_CODE);
    }

}

module.exports = {
    getHallsforPlant,
}