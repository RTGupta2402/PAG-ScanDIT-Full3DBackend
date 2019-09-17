var plantHallModule = require('../services/plantHall.service');
var hallStationModule = require('../services/hallStations.service');
var helper = require('../../../common/utility/helper');
var constants = require('../../../common/utility/constants');
var validator = require('../../../common/utility/validator');

/**
 * Cloud function to search Halls on basis of plant number
 */
Parse.Cloud.define("getHallsForPlant", async (request) => {
    return await validator.validateGetHallsForPlantRequest(request) ?
        await plantHallModule.getHallsforPlant(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

/**
 * Cloud function to search Stations for Hall number
 */
Parse.Cloud.define("getStationsForHall", async (request) => {
    return await validator.validateGetstationsforHallRequest(request) ?
        await hallStationModule.getStationsforHall(request)
        : helper.createResponse(null, constants.VALIDATION_ERROR, constants.BAD_REQUEST_CODE)
});

