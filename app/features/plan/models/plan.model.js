const PLAN_COLLECTION = "Plan";
const PLAN_REFERENCE_NUMBER_FIELD = "planReferenceNumber";
const PLAN_REGULATIONS_ATTACHED_FIELD = "regulationsAttached";
const PLAN_STATIONS_ATTACHED_FIELD = "stationsAttached";
const PLAN_JIGS_ATTACHED_FIELD = "jigsAttached";
const PLAN_TOOLS_ATTACHED_FIELD = "toolsAttached";
const PLAN_OBJECT_ID_FIELD = "objectId";
// Model class for the Plan collection
class Plan {
    constructor(planReferenceNumber, regulationsAttached, stationsAttached, jigsAttached, toolsAttached) {
        this.planReferenceNumber = planReferenceNumber;
        this.regulationsAttached = regulationsAttached;
        this.stationsAttached = stationsAttached;
        this.jigsAttached = jigsAttached;
        this.toolsAttached = toolsAttached;
    }
}

const save = async (data) => {
    const plan = new Parse.Object(PLAN_COLLECTION);
    try {
        plan.set(PLAN_REFERENCE_NUMBER_FIELD, data.planReferenceNumber);
        await plan.save();
        if (plan.isNew) {
            return plan.get(PLAN_REFERENCE_NUMBER_FIELD);
        } else {
            return undefined;
        }
    } catch (err) {
        throw err;
    }
}

const getRegulationsAssociatedWithPlan = async (planObjectId) => {
    try {
        var query = new Parse.Query(PLAN_COLLECTION);
        query.equalTo(PLAN_OBJECT_ID_FIELD, planObjectId);
        var result = await query.first();
        if (result) {
            result.relation(PLAN_REGULATIONS_ATTACHED_FIELD).query()
            .include('regulationProcess')
            .each(function(relatedObject) {
                console.log(relatedObject.get("regulationProcess").get("name"));
                console.log(relatedObject.get("regulationId")+' - '+relatedObject.get("name")+' - '+relatedObject.get("regulationProcess.name"));
             });
            return result;
        }
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    Plan,
    save,
    PLAN_COLLECTION,
    PLAN_REFERENCE_NUMBER_FIELD,
    PLAN_REGULATIONS_ATTACHED_FIELD,
    PLAN_STATIONS_ATTACHED_FIELD,
    PLAN_JIGS_ATTACHED_FIELD,
    PLAN_TOOLS_ATTACHED_FIELD,
    PLAN_OBJECT_ID_FIELD,
    getRegulationsAssociatedWithPlan
}