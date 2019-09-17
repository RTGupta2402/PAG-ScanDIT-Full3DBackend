// Request data validation for sap material number search request
const validateSapSearchRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.searchSap) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for htz number search request
const validateHtzSearchRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.searchHtz) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for htz number search request
const validateGetRegulationsByProcessRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.processId) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}


// Request data validation for htz number search request
const validateGetRegulationsByKindRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.regulationKindId) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for htz number search request
const validateGetHallsForPlantRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.plantNumber) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for htz number search request
const validateGetToolsForStationRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.stationId) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}


// Request data validation for htz number search request
const validateGetstationsforHallRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.hallId) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for htz number search request
const validateGetJigsForSapRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params && request.params.sapNumber) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

const validateGetRegulationsRequest = async (request) => {
    var isValidrequest = false;
    if (request.params && request.params.sapNumber) {
        isValidrequest = true;
    }
    return isValidrequest;
}

// Request data validation for creation of unique plan reference number
const validatePlanReferenceCreateRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.sapMaterialNumber &&
        request.params.htzNumber &&
        request.params.planGroup &&
        request.params.planGroupCounter) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for updation of regulations of a plan
const validatePlanRegulationsUpdateRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber &&
        request.params.planRegulations) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for updation of stations of a plan
const validatePlanStationsUpdateRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber &&
        request.params.planStations) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for Getting File(image or any other type) by key
const validateGetFileByKeyRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.key) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for updation of jigs of a plan
const validatePlanJigsUpdateRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber &&
        request.params.planJigs) {
        isvalidRequest = true;
    }
    return isvalidRequest;
} 

// Request data validation for updation of jigs of a plan
const validatePlanToolsUpdateRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber &&
        request.params.planTools) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for adding stations for visual work of a plan 
const validateVisualWorkPlanStationsAddRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber &&
        request.params.WorkPlanStations) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for adding tasks for visual-work-plan station
const validateVisualWorkPlanTasksAddRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber &&
        request.params.visualWorkStationObjectId &&
        request.params.tasksForVisualWorkStation) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for adding views for visual-work-plan task
const validateVisualWorkPlanViewsAddRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planReferenceNumber && 
        request.params.visualWorkTaskObjId &&
        request.params.viewsForVisualWorkTask) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

// Request data validation for adding views for visual-work-plan task
const validateGetRegulationsAssociatedWithPlanRequest = async (request) => {
    var isvalidRequest = false;
    if (request.params &&
        request.params.planObjectId) {
        isvalidRequest = true;
    }
    return isvalidRequest;
}

module.exports = {
    validateSapSearchRequest,
    validateHtzSearchRequest,
    validateGetRegulationsRequest,
    validatePlanReferenceCreateRequest,
    validateGetRegulationsByKindRequest,
    validateGetRegulationsByProcessRequest,
    validateGetHallsForPlantRequest,
    validateGetstationsforHallRequest,
    validateGetToolsForStationRequest,
    validateGetJigsForSapRequest,
    validatePlanRegulationsUpdateRequest,
    validatePlanStationsUpdateRequest,
    validateGetFileByKeyRequest,
    validatePlanJigsUpdateRequest,
    validatePlanToolsUpdateRequest,
    validateVisualWorkPlanStationsAddRequest,
    validateVisualWorkPlanTasksAddRequest,
    validateVisualWorkPlanViewsAddRequest,
    validateGetRegulationsAssociatedWithPlanRequest
}