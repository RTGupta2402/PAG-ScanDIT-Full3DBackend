const VISUAL_WORK_PLAN_TASKS_COLLECTION = "Visual_Work_Plan_Tasks";
const VISUAL_WORK_PLAN_TASKS_NAME_FIELD = "taskName";
const VISUAL_WORK_PLAN_TASKS_POSITION_FIELD = "position";
const VISUAL_WORK_PLAN_TASKS_PLAN_FIELD = "plan";
const VISUAL_WORK_PLAN_TASKS_VISAUL_WORK_PLAN_STATION_FIELD = "visualWorkPlanStation";
const VISUAL_WORK_PLAN_TASK_OBJECT_ID_FIELD = "objectId"
var visualWorkPlanStationsModel = require('../models/visualWorkPlanStations.model');
var planModel = require('../models/plan.model');
class VisualWorkPlanTasks {
    constructor(taskName, position, visualWorkPlanStationObjId, planObjId, visualWorkPlanTaskObjectId) {
        this.taskName = taskName;
        this.position = position;
        this.plan = { className: planModel.PLAN_COLLECTION, __type: 'Pointer', objectId: planObjId };
        this.visualWorkPlanStation = { className: visualWorkPlanStationsModel.VISUAL_WORK_PLAN_STATIONS_COLLECTION, __type: 'Pointer', objectId: visualWorkPlanStationObjId };
        this.visualWorkPlanTaskObjectId = visualWorkPlanTaskObjectId;
    }
}

var save = async (data) => {
    try {
        let VWPTasks = [];
        data.forEach(element => {
            const visualWorkPlanStationObj = new Parse.Object(VISUAL_WORK_PLAN_TASKS_COLLECTION);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_TASKS_NAME_FIELD, element.taskName);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_TASKS_POSITION_FIELD, element.position);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_TASKS_VISAUL_WORK_PLAN_STATION_FIELD, element.visualWorkPlanStation);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_TASKS_PLAN_FIELD, element.plan);
            VWPTasks.push(visualWorkPlanStationObj);
        });
        let result = await Parse.Object.saveAll(VWPTasks);
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
    VisualWorkPlanTasks,
    VISUAL_WORK_PLAN_TASKS_COLLECTION,
    VISUAL_WORK_PLAN_TASKS_NAME_FIELD,
    VISUAL_WORK_PLAN_TASKS_POSITION_FIELD,
    VISUAL_WORK_PLAN_TASKS_PLAN_FIELD,
    VISUAL_WORK_PLAN_TASKS_VISAUL_WORK_PLAN_STATION_FIELD,
    VISUAL_WORK_PLAN_TASK_OBJECT_ID_FIELD
}
