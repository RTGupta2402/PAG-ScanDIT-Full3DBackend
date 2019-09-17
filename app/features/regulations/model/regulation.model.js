
const REGULATION_COLLECTION = "Regulations";
const REGULATION_PROCESS_COLLECTION = "Regulation_Process";
const REGULATION_KIND_COLLECTION = "Regulation_Type";
const REGULATION_NAME_FIELD = "name";
const REGULATION_REGULATION_FIELD = "regulationId";
const REGULATION_KIND_FIELD = "regulationKind";
const REGULATION_PROCESS_FIELD = "regulationProcess";
const REGULATION_SAP_MATERIAL_NUMBER_FIELD = "sapMaterialNumber";

/**
 *  function will return the regulations on basis of Kind or Process provided
 * @param {string} processObjectId Object id of regulation process or kind
 * @param {string} queryByParameter Collection on which pointer is created
 * @param {string} queryForParameter Column with pointer
 */
const getRegulationnsByProcessOrKind = async (processObjectId , queryByParameter , queryForParameter) => {
    try {
        var query = new Parse.Query(REGULATION_COLLECTION);
        var InnerObject = Parse.Object.extend(queryByParameter);
        var innerObject =  new InnerObject() 
        innerObject.id = processObjectId; 
        query.equalTo(queryForParameter, innerObject);
        query.include(REGULATION_KIND_FIELD);
        query.include(REGULATION_PROCESS_FIELD);
        var result = await query.find();
        if (result) {
            return result;
        }

    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    REGULATION_COLLECTION,
    REGULATION_NAME_FIELD,
    REGULATION_REGULATION_FIELD,
    REGULATION_KIND_FIELD,
    REGULATION_PROCESS_FIELD,
    REGULATION_SAP_MATERIAL_NUMBER_FIELD,
    REGULATION_PROCESS_COLLECTION,
    REGULATION_KIND_COLLECTION,
    getRegulationnsByProcessOrKind
}