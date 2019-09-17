const VISUAL_WORK_PLAN_STATIONS_COLLECTION = "Visual_Work_Plan_Stations";
const VISUAL_WORK_PLAN_STATIONS_PLAN_STATION_FIELD = "planStation";
const VISUAL_WORK_PLAN_STATIONS_POSITION_FIELD = "position";
const VISUAL_WORK_PLAN_STATIONS_PLAN_FIELD = "plan";
const VISUAL_WORK_PLAN_STATIONS_OBJECT_ID_FIELD = "objectId";

class VisualWorkPlanStations {
    constructor(planStation, position, plan, visualWorkPlanStationObjectId) {
        this.planStation = planStation;
        this.position = position;
        this.plan = plan;
        this.visualWorkPlanStationObjectId = visualWorkPlanStationObjectId;
    }
}

var save = async (planId, data,stationColletion,planColletion) => {
    try {
        let VWPSs = [];
        data.forEach(element => {
            const visualWorkPlanStationObj = new Parse.Object(VISUAL_WORK_PLAN_STATIONS_COLLECTION);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_STATIONS_PLAN_STATION_FIELD, { className: stationColletion, __type: 'Pointer', objectId: element.stationId });
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_STATIONS_POSITION_FIELD, element.position);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_STATIONS_PLAN_FIELD, { className: planColletion, __type: 'Pointer', objectId: planId });
            VWPSs.push(visualWorkPlanStationObj);
        });
        let result = await Parse.Object.saveAll(VWPSs);
        if (result.length) {
            return result;
        } else {
            return undefined;
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    save,
    VisualWorkPlanStations,
    VISUAL_WORK_PLAN_STATIONS_COLLECTION,
    VISUAL_WORK_PLAN_STATIONS_PLAN_STATION_FIELD,
    VISUAL_WORK_PLAN_STATIONS_POSITION_FIELD,
    VISUAL_WORK_PLAN_STATIONS_PLAN_FIELD,
    VISUAL_WORK_PLAN_STATIONS_OBJECT_ID_FIELD
}
