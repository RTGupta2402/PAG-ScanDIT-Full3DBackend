var visualWorkPlanTasksModel = require('../models/visualWorkPlanTasks.model');
var planModel = require('../models/plan.model');
var processesModel = require('../../processes/models/processes.model');
var viewPicturesModel = require('../../processes/models/viewPictures.model');
const VISUAL_WORK_PLAN_VIEWS_COLLECTION = "Visual_Work_Plan_Views";
const VISUAL_WORK_PLAN_VIEWS_NAME_FIELD = "viewName";
const VISUAL_WORK_PLAN_VIEWS_POSITION_FIELD = "position";
const VISUAL_WORK_PLAN_VIEWS_PLAN_FIELD = "plan";
const VISUAL_WORK_PLAN_VIEWS_VISAUL_WORK_PLAN_TASK_FIELD = "visualWorkPlanTask";
const VISUAL_WORK_PLAN_VIEWS_PROCESS_FIELD = "process";
const VISUAL_WORK_PLAN_VIEWS_INSTRUCTION_FIELD = "instruction"
const VISUAL_WORK_PLAN_VIEWS_DESCRIPTION_FIELD = "description";
const VISUAL_WORK_PLAN_VIEWS_VIEW_PICTURE_FIELD = "viewPicture";

class VisualWorkPlanViews {
    constructor(viewName, position, processObjId, instruction, description, viewPictureObjId, visualWorkPlanTaskObjId, planObjId, visualWorkPlanViewObjectId) {
        this.taskName = viewName;
        this.position = position;
        this.instruction = instruction;
        this.description = description;
        this.process = { className: processesModel.PROCESSES_COLLECTION, __type: 'Pointer', objectId: processObjId };
        this.viewPicture = { className: viewPicturesModel.VIEW_PICTURES_COLLECTION, __type: 'Pointer', objectId: viewPictureObjId };
        this.visualWorkPlanTask = { className: visualWorkPlanTasksModel.VISUAL_WORK_PLAN_TASKS_COLLECTION, __type: 'Pointer', objectId: visualWorkPlanTaskObjId };
        this.plan = { className: planModel.PLAN_COLLECTION, __type: 'Pointer', objectId: planObjId };
        this.visualWorkPlanViewObjectId = visualWorkPlanViewObjectId;
    }
}

var save = async (data) => {
    try {
        let VWPViews = [];
        data.forEach(element => {
            const visualWorkPlanStationObj = new Parse.Object(VISUAL_WORK_PLAN_VIEWS_COLLECTION);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_NAME_FIELD, element.taskName);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_POSITION_FIELD, element.position);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_PROCESS_FIELD, element.process);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_INSTRUCTION_FIELD, element.instruction);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_DESCRIPTION_FIELD, element.description);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_VIEW_PICTURE_FIELD, element.viewPicture);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_VISAUL_WORK_PLAN_TASK_FIELD, element.visualWorkPlanTask);
            visualWorkPlanStationObj.set(VISUAL_WORK_PLAN_VIEWS_PLAN_FIELD, element.plan);
            VWPViews.push(visualWorkPlanStationObj);
        });
        let result = await Parse.Object.saveAll(VWPViews);
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
    VisualWorkPlanViews,
    VISUAL_WORK_PLAN_VIEWS_COLLECTION,
    VISUAL_WORK_PLAN_VIEWS_NAME_FIELD,
    VISUAL_WORK_PLAN_VIEWS_POSITION_FIELD,
    VISUAL_WORK_PLAN_VIEWS_PLAN_FIELD,
    VISUAL_WORK_PLAN_VIEWS_VISAUL_WORK_PLAN_TASK_FIELD,
    VISUAL_WORK_PLAN_VIEWS_PROCESS_FIELD,
    VISUAL_WORK_PLAN_VIEWS_INSTRUCTION_FIELD,
    VISUAL_WORK_PLAN_VIEWS_DESCRIPTION_FIELD,
    VISUAL_WORK_PLAN_VIEWS_VIEW_PICTURE_FIELD
}
