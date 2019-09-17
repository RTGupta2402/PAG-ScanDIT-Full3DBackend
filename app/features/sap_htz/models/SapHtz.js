// Model class for the SAP_HTZ collection
const SAP_HTZ_COLLECTION = "SAP_HTZ";
const SAP_HTZ_HTZ_NUMBER_FIELD = "htzNumber";
const SAP_HTZ_SAP_NUMBER_FIELD = "sapMaterialNumber";
const SAP_HTZ_HTZ_NAME_FIELD = "sapMaterialNumber";
const SAP_HTZ_PLAN_GROUP_FIELD = "planGroup";
const SAP_HTZ_PLAN_GROUP_COUNTER_FIELD = "planGroupCounter";
const SAP_HTZ_MATERIAL_IMAGE_FIELD = "sapMaterialImage";
const SAP_HTZ_IS_SELECTABLE_FIELD = "isSelectable";

class SapHtz {
    constructor(sapMaterialNumber, htzNumber, htzName, planGroup, planGroupcounter, imageURL, isSelectable) {
        this.sapMaterialNumber = sapMaterialNumber;
        this.htzNumber = htzNumber
        this.htzName = htzName;
        this.planGroup = planGroup;
        this.planGroupcounter = planGroupcounter;
        this.imageURL = imageURL;
        this.isSelectable = isSelectable;
    }
}

/****
 * function to add unique plan group counter 
 * @param {string} sapMaterialNumber value of sap material number w.r.t it, plan group counter need to be add 
 * @param {string} planGroupCounter value of the plan group counter
 * @return {boolen} boolen
 */

var insertPlanGroupCounter = async (sapMaterialNumber, planGroupCounter) => {
    const SapHtzObject = Parse.Object.extend(SAP_HTZ_COLLECTION);
    var query = new Parse.Query(SapHtzObject);
    try {
        query.equalTo(SAP_HTZ_SAP_NUMBER_FIELD, sapMaterialNumber);
        var objectSapHtz = await query.first();
        objectSapHtz.addUnique(SAP_HTZ_PLAN_GROUP_COUNTER_FIELD, parseInt(planGroupCounter));
        let result = await objectSapHtz.save();
        if (result)
            return true;
    } catch (err) {
       throw(err)
    }
}

module.exports = {
    insertPlanGroupCounter,
    SapHtz,
    SAP_HTZ_COLLECTION,
    SAP_HTZ_HTZ_NUMBER_FIELD,
    SAP_HTZ_SAP_NUMBER_FIELD,
    SAP_HTZ_HTZ_NAME_FIELD,
    SAP_HTZ_PLAN_GROUP_FIELD,
    SAP_HTZ_PLAN_GROUP_COUNTER_FIELD,
    SAP_HTZ_MATERIAL_IMAGE_FIELD,
    SAP_HTZ_IS_SELECTABLE_FIELD,
}