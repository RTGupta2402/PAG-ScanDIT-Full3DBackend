var responseModel = require('../models/response');

/**
 * Creating a response
 * @param {Object} object Data you ned to pass in response
 * @param {string} message Message to be passed in response
 * @param {number} statuscode Status code to be passed in response
 * @returns {Object} Response
 */
function createResponse(object, message, statuscode) {
    return  new responseModel.Response(object, message, statuscode);
}

/**
 * Reusable  Function which will use to search the data
 * @param {string} objectName Class name in parse dashboard
 * @param {string} attributeName Column to be matched in collection
 * @param {string} attributeValue Value to be checked in column
 * @return {object} Object
 */
const searchDataByObjectId = async (objectName, attributeName, attributeValue) => {
    try { 
        var query = new Parse.Query(objectName);
        query.startsWith(attributeName, attributeValue);
        var result = await query.find();
        if(result) {
            return result;
        }
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * Reusable  Function which will get the data from class
 * @param {string} objectName Class name in parse dashboard
 * @param {string} attributeName Column to be matched in collection
 * @param {string} attributeValue Value to be checked in column
 * @return {object} Object
 */
const getDataByObjectId = async (objectName, attributeName, attributeValue) => {
    try { 
        var query = new Parse.Query(objectName);
        query.equalTo(attributeName, attributeValue);
        var result = await query.first();
        if(result) {
            return result;
        }
    }
    catch (ex) {
        throw ex;
    }
}

/**
 * Reusable  Function which will use to fetch the data
 * @param {string} objectName Class name in parse dashboard
 * @param {string} attributeName Column to be matched in collection
 * @param {string} attributeValue Value to be checked in column
 * @param {string} includedPointers Pointers column to be included in result
 * @return {object} Object
 */
const getDataFromCollection = async(objectName, attributeName, attributeValue, includedPointers) => {
    try {
        var query = new Parse.Query(objectName);
        query.equalTo(attributeName, attributeValue);
        if (includedPointers.length > 0) {
            includedPointers.forEach(column => {
                query.include(column);
            });
        }
        var result = await query.find();
        if (result) {
            return result;
        }
    } catch(ex) {
        throw ex;
    }
}

/**
 * Reusable  Function which will use to fetch the data
 * @param {string} objectName Class name in parse dashboard
 * @param {string} attributeName Column to be matched in collection
 * @param {string} attributeValue Value to be checked in column
 * @param {string} includedPointers Pointers column to be included in result
 * @return {object} Object
 */
const getDataFromCollectionWithPointerObjectId = async(objectName, attributeName, attributeValue, includedPointers, pointerObjectName) => {
    try {
        var query = new Parse.Query(objectName);
        query.equalTo(attributeName, { "__type": "Pointer", "className": pointerObjectName, "objectId": attributeValue });
        if (includedPointers.length > 0) {
            includedPointers.forEach(column => {
                query.include(column);
            });
        }
        var result = await query.find();
        if (result) {
            return result;
        }
    } catch(ex) {
        throw ex;
    }
}



/**
 * Reusable  Function which will use to fetch the data
 * @param {string} objectName Class name in parse dashboard
 * @param {string} attributeName Column to be matched in collection
 * @param {string} attributeValue Value to be checked in column
 * @param {string} includedPointers Pointers column to be included in result
 * @return {object} Object
 */
const getDataFromCollectionWithRelationObjectId = async(objectName, attributeName, attributeValue, relationObjectName) => {
    try {
        var stationQuery = new Parse.Query(relationObjectName)
        stationQuery.equalTo("objectId",attributeValue);
        var stationresult  = await stationQuery.first();
        if(stationresult) {
            var query = new Parse.Query(objectName);
            query.equalTo(attributeName, stationresult);
            var result = await query.find();
            if (result) {
                return result;
            }
        }
    } catch(ex) {
        throw ex;
    }
}

/**
 * Reusable  Function which will use to update a collection filed which is a type of relation  
 * @param {parse Object} parent Parse object of collection(parent collection) in which relational coulmn exists
 * @param {string} attachedField Column name which is need to be updated
 * @param {array} objectIdsToBeAttached Array of objectids (type string) which are need to relate 
 * @param {string} collectionNameToBeAttached Attached Class name from the parent class
 * @return {boolean} Boolean
 */

const updateAttachedFieldOfCollection = async (parent,attachedField,objectIdsToBeAttached,collectionNameToBeAttached) => {
    try {
            let objectsToBeAttached = []; 
            objectIdsToBeAttached.forEach(objectIdToBeAttached => {
                objectsToBeAttached.push({ className: collectionNameToBeAttached, id: objectIdToBeAttached });
            });
            let relation = parent.relation(attachedField);
            //relation.remove({ className: collectionNameToBeAttached, id: "cSDy3ZW0aR" });
            relation.add(objectsToBeAttached);
            let result = await parent.save();
            if (result)
                return true;
        }
     catch (err) {
        console.error(err);
        throw (err)
    }
}

module.exports = {
    searchDataByObjectId,
    createResponse,
    getDataByObjectId,
    getDataFromCollection,
    getDataFromCollectionWithPointerObjectId,
    getDataFromCollectionWithRelationObjectId,
    updateAttachedFieldOfCollection
}