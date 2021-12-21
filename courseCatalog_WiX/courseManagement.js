// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
// import { currentMember } from 'wix-members';
// • <import from> 'public/'
// • <import from> 'public/buttonBlockModule.js'
import {addFrom_toggleExpandButtons} from 'public/buttonBlockModule.js'; 
import {assignStringsOnReady} from 'public/buttonBlockModule.js'; 
import {btnblkToggleBTN_click} from 'public/buttonBlockModule.js'; 
import {btnblkDoBTN_click} from 'public/buttonBlockModule.js'; 
// • </import from> 'public/buttonBlockModule.js'
// • <import from> 'public/utilityModule.js'
import {getWeekId} from 'public/utilityModule.js'; 
import {courseKeyHuman} from 'public/utilityModule.js'; 
import {getSourcedJSON_byKey} from 'public/utilityModule.js'; 
import {getCurrentMemberObject} from 'public/utilityModule.js'; 
// • </import from> 'public/utilityModule.js'
// • <import from> 'public/inventoryDocDbJSON.js'
import {datestampinventoryDocDbJSON} from 'public/inventoryDocDbJSON.js'
import {getInventoryResponse} from 'public/inventoryDocDbJSON.js'
import {locationGetByRegionKey} from 'public/inventoryDocDbJSON.js'
import {weeksGetByTermId} from 'public/inventoryDocDbJSON.js'
import {gradeLevelGetCurrent} from 'public/inventoryDocDbJSON.js'
// • </import from> 'public/inventoryDocDbJSON.js'
// • <import from> 'public/timeCrunchModule.js'
import {timeCrunch} from 'public/timeCrunchModule.js'
import {jsDaysOfWeekArrayToString} from 'public/timeCrunchModule.js'
import {getEndDateFromSchedule_Start_Weeks_DaysOfWeek} from 'public/timeCrunchModule.js'
// • </import from> 'public/timeCrunchModule.js'
import {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
import {getNatoPhoneticArrayObjectItem} from 'public/natoPhoneticTestData.js';
// • </import from> 'public/'
import {getDrupalURI} from 'backend/apiDrupalModule.jsw';
import {postDrupalNode} from 'backend/apiDrupalModule.jsw';
import {patchDrupalNode} from 'backend/apiDrupalModule.jsw';
import {CONSTRUCT_apiObject_POSTbyKind} from 'public/apiObjectPrepModule.js';
// import {apiObjectPrep} from 'public/apiObjectPrepModule.js';
import {utilityDirectParseDataIntoTemplate} from 'public/apiObjectPrepModule.js';
import { compareAsc, format } from 'date-fns'
import {adminDispatch} from 'public/adminDispatch.js';
import {fetch} from 'wix-fetch';

// ø QUICK_LIST:
// ø CREATE_NEW_COURSE
// ø CREATE_NEW_COURSE_±3_Click_clearCourseForm
// ø CREATE_NEW_COURSE_±2_resetCourseForm
// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
// ø CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
// ø 
// ø LOAD_COURSES_ON_READY_00_konstantTermCoursesOnReady
// ø LOAD_COURSES_ON_READY_01_composeFilterFormObject_OnReadyForceChangeNoFilter
// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
// ø LOAD_COURSES_ON_READY_03_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
// ø 
// ø FILTER_COURSES_00_previewCourseBTN_click
// ø FILTER_COURSES_01_validateFilterForm
// ø FILTER_COURSES_02_composeFilterFormObject | FILTER_COURSES_02err_catchAndDisplayError
// ø FILTER_COURSES_03_applyFilterToBuffer
// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
// ø 
// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
// ø CREATE_NEW_COURSE_01_validateFilterForm
// ø CREATE_NEW_COURSE_02
// ø CREATE_NEW_COURSE_02_composeFilterFormObject [CREATE_NEW_COURSE_02_catchAndDisplayError]
// // ø CREATE_NEW_COURSE_02_collectAndCalculateData_DEP [CREATE_NEW_COURSE_02_catchAndDisplayError]
// // ø CREATE_NEW_COURSE_03_composeAndDisplayPreview
// ø CREATE_NEW_COURSE_03_applyFilterToBuffer_paramObjectFilterForm
// ø CREATE_NEW_COURSE_04_evaluationPaginationAndLoadRepeater
// // ø CREATE_NEW_COURSE_03a_transformBlock
// ø TRANSFORM_REPEATER_DATA <----- KLUDGE
// ø CREATE_NEW_COURSE_03a_transformBlock
// ø CREATE_NEW_COURSE_04_Click_PostBTN
// ø CREATE_NEW_COURSE_05_newCourseDrupalPOST


$w.onReady(function () {
	// await onReadyCurriculaJSON()
	setUpOnReady()
	// konstantSelectedCurriculaRepeaterOnReady_DEP()
	konstantTermCoursesOnReady()
	wixStorageDisplayOnReady()	
    // datestampinventoryDocDbJSONOnReady()
	// develOnReady()
	// callPublicADD_from_toggleExpandButtons_OnReady ()
	let buttonObjectButtonsUsedArray = [2,3]
	assignStringsOnReady(buttonObjectButtonsUsedArray,[2,3])
	wixUserPermissionsOnReady()
});
//==========================================================================================
//==================================================              <OnReady Called Functions>
//==================================================     (in the order they are called above)
function setUpOnReady(){
	memory.setItem('memoryResponseObject', memory.getItem('memoryParamObject'))
	memory.setItem('memoryParamObject', JSON.stringify({"pipedBoolean":"ON_READY"}))
	// ¯\__  triggers _FILTER_ of no-Filter onReady()  __/¯
}
function cleanUpOnReady(){
	// memory.setItem('memoryParamObject', JSON.stringify({"pipedBoolean":"ON_READY"}))
}

async function konstantTermCoursesOnReady(){
	// ø LOAD_COURSES_ON_READY_00_konstantTermCoursesOnReady
	console.groupCollapsed(`konstantTermCoursesOnReady()`)
	// console.group(`konstantTermCoursesOnReady()`)
	// ø <KLUDGE_GET>
	// ø ¯\_(ツ)_/¯ => until I can get 'simple' fetch() working
	let allCoursesWorkingObject = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224"},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseName":"Creative Creatures","courseNameAbbrv":"CreativeCreatures","curriculumKey":"CREATURES","courseKey":"CREATURESv2324bCHOa","sectionArray":["CREATURESv2324bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3356","termId":"202223","weekId":"202224"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseName":"Gadgets and Gizmos","courseNameAbbrv":"Gadgets","curriculumKey":"GADGETS","courseKey":"GADGETSv2324bCHOb","sectionArray":["GADGETSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"25","termId":"202223","weekId":"202224"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseName":"Intro to STEAM","courseNameAbbrv":"Int Ste","curriculumKey":"INTROSTEAM","courseKey":"INTROSTEAMv2324bCHOb","sectionArray":["INTROSTEAMv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"39","termId":"202223","weekId":"202224"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2324fhCHOb","sectionArray":["MADSCICHEMv2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202224"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2324ceCHOb","sectionArray":["ROBOTCODEv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202224"},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225"},{"_id":"3575","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2325ceCHOb","sectionArray":["CERAMICSv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202225"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2325ceCHOb","sectionArray":["DRONEACv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202225"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325bCHOa","sectionArray":["GIRLLEADELv2325bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325ceCHOa","sectionArray":["GIRLLEADELv2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseName":"Girls Leadership MS","courseNameAbbrv":"GirlsLeadershipMS","curriculumKey":"GIRLLEADMS","courseKey":"GIRLLEADMSv2325fhCHOa","sectionArray":["GIRLLEADMSv2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3360","termId":"202223","weekId":"202225"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2325bCHOb","sectionArray":["MADSCICHEMv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202225"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseName":"Pirate Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"PIRATESCI","courseKey":"PIRATESCIv2325bCHOb","sectionArray":["PIRATESCIv2325bCHOb1"],"sectionCount":"2","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3511","termId":"202223","weekId":"202225"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseName":"STEAM Survivor","courseNameAbbrv":"z_STRING_z","curriculumKey":"Survivor","courseKey":"Survivorv2325ceCHOb","sectionArray":["Survivorv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3501","termId":"202223","weekId":"202225"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225"},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226"},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2326ceCHOb","sectionArray":["MADSCICHEMv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202226"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseName":"Maker Laboratory","courseNameAbbrv":"Maker Sum","curriculumKey":"MAKERLAB","courseKey":"MAKERLABv2326ceCHOa","sectionArray":["MAKERLABv2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1296","termId":"202223","weekId":"202226"},{"_id":"3590","courseNameDisplay":"Art Lab","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABv2328bCHOb","sectionArray":["ARTLABv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202223","weekId":"202228"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseName":"Construction Kids","courseNameAbbrv":"ConstructKids","curriculumKey":"CONKIDS","courseKey":"CONKIDSv2328bCHOa","sectionArray":["CONKIDSv2328bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1283","termId":"202223","weekId":"202228"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2328fhCHOb","sectionArray":["DRONEACv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202228"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2328fhCHOb","sectionArray":["FORENSICSv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202228"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseName":"Journey to Atlantis","courseNameAbbrv":"z_STRING_z","curriculumKey":"ATLANTIS","courseKey":"ATLANTISv2328bCHOb","sectionArray":["ATLANTISv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3515","termId":"202223","weekId":"202228"},{"_id":"3591","courseNameDisplay":"Photography 101","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2328ceCHOb","sectionArray":["PHOTOv2328ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202228"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2329fhCHOb","sectionArray":["BIOMECHv2329fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202229"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseName":"Digging Dinos","courseNameAbbrv":"z_STRING_z","curriculumKey":"Dinosaurs","courseKey":"Dinosaursv2329bCHOb","sectionArray":["Dinosaursv2329bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3516","termId":"202223","weekId":"202229"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2329ceCHOb","sectionArray":["FORENSICSv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202229"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329bCHOa","sectionArray":["LEADSTEAMv2329bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329beCHOa","sectionArray":["LEADSTEAMv2329beCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL25","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329fhCHOa","sectionArray":["LEADSTEAMv2329fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseName":"Paint and Mixed Media","courseNameAbbrv":"Paint","curriculumKey":"PAINTMEDIA","courseKey":"PAINTMEDIAv2329ceCHOb","sectionArray":["PAINTMEDIAv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"29","termId":"202223","weekId":"202229"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2329dhCHOb","sectionArray":["PHOTOv2329dhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL48","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202229"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2329ceCHOb","sectionArray":["ROBOTCODEv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202229"}]
	// ø </KLUDGE_GET>
	
	let weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))
	// console.log(`weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))`)
	// console.log(`weekDocDbObject = weeksGetByTermId(${Number(session.getItem('termId'))})`)
	// console.log(`weekDocDbObject: [object below]`)
	// console.dir(weekDocDbObject)
	let weekObjectThis = {}
	// weekObjectThis = weekDocDbObject[202223]
	// console.log(`weekObjectThis: [object below]`)
	// console.log(weekObjectThis)

	let locationObject = locationGetByRegionKey(session.getItem('termRegionId'))
	// console.log(`locationObject: [object below]`)
	// console.dir(locationObject)


	let gradeLevelDocDbObject = gradeLevelGetCurrent()
	// console.log(`gradeLevelDocDbObject: [object below]`)
	// console.dir(gradeLevelDocDbObject)
	let gradeLevelObjectThis = {}

	
	
	for (let index = 0; index < allCoursesWorkingObject.length; index++) {
		const element = allCoursesWorkingObject[index];
		gradeLevelObjectThis = gradeLevelDocDbObject[element.gradeLevelKey]
		weekObjectThis = weekDocDbObject[element.weekId]
		 
		element.weekNameCardinal = weekObjectThis.nameCardinal
		element.weekDateStartAbbrv = weekObjectThis.dateStartAbbrv
		element.weekDaysOfWeekString = weekObjectThis.daysOfWeekString

		let weekTimeBlockKey = (element.courseOptions).replace(',','_')
		weekTimeBlockKey = weekTimeBlockKey.includes('FD') ? 'FD' : weekTimeBlockKey
		weekTimeBlockKey = weekTimeBlockKey === 'HD_AM' ? 'AM' : weekTimeBlockKey
		weekTimeBlockKey = weekTimeBlockKey === 'HD_PM' ? 'PM' : weekTimeBlockKey
		element.weekTimeBlockKey = weekTimeBlockKey	
		element.weekTimeBlockSpanString = weekObjectThis[weekTimeBlockKey]['timeBlockSpanString']
		 
		element.locationNameCommon = locationObject[element.locationKey]['nameCommon']
		 
		element.gradeLevelHuman = gradeLevelObjectThis.humanHyphenatedKey
		element.gradeLevelFullArray = gradeLevelObjectThis.fullArray
		 
		element.weight = index
	}
	memory.setItem('memoryWorkingBackupObject',JSON.stringify(allCoursesWorkingObject))
	// $w('#developerResponseTXTBX').value = JSON.stringify(allCoursesWorkingObject,undefined,4)
	
	
	console.log(`groupEnd: konstantTermCoursesOnReady()`)
	console.groupEnd()
	composeFilterFormObject()
}
async function konstantSelectedCurriculaRepeaterOnReady_DEP(){
	// console.groupCollapsed(`konstantSelectedCurriculaRepeaterOnReady_DEP()`)
	console.group(`konstantSelectedCurriculaRepeaterOnReady_DEP()`)
	let termObject = JSON.parse(memory.getItem('memoryResponseObject'))
	console.log(`termObject: [object below`)
	console.dir(termObject)
	
	//ø <REGION FORM HERE KLUDGE - @todo: gather from docDbJSON>
	let regionKeyNameObject = {"CHO":"Charlottesville","RIC":"Richmond","ROA":"Blacksburg"}
	$w('#regionNameINPUT').value = regionKeyNameObject[termObject.termRegion]
	$w('#regionNameINPUT').value += ` [${termObject.termRegion}]`
	//ø </REGION FORM HERE KLUDGE>
	
	session.setItem('termId',termObject.termId)
	session.setItem('termRecordId',termObject._id)
	console.log(`session.getItem('termRecordId'): ${session.getItem('termRecordId')}`)
	session.setItem('termRegionId',termObject.termRegion)
	console.log(`session.getItem('termRegionId'): ${session.getItem('termRegionId')}`)
	// let url = `https://live-steamda.pantheonsite.io/wixcourses/${termObject.termId}/${termObject.termRegion}?_format=json`
	let url = `https://live-steamda.pantheonsite.io/wixcourses/${termObject.termId}/${termObject.termRegion}`
	console.log(`url: ${url}`)
	// let options = { mode: 'no-cors' }
	// let coursesGET = await  fetch(url, { "mode": "no-cors" })
	// let KLUDGE_GET = [{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224"}]
	// let KLUDGE_GET = [{"_id":"3557","courseNameDisplay":"Art Lab ECHO g1w2bFDampm","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2323bCHOb","sectionArray":["ARTLABu2323bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM,PM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202123"},{"_id":"3545","courseNameDisplay":"Drone Academy BACKUP","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323bCHOb","sectionArray":["DRONEACu2323bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3546","courseNameDisplay":"Drone Academy BGBLD","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ilCHOa","sectionArray":["DRONEACu2323ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3524","courseNameDisplay":"Drone Academy BRAVO","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323bCHOb","sectionArray":["DRONEACu2323bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3525","courseNameDisplay":"Drone Academy CHARLIE","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ceCHOb","sectionArray":["DRONEACu2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3526","courseNameDisplay":"Drone Academy DELTA","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ilCHOb","sectionArray":["DRONEACu2323ilCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3527","courseNameDisplay":"Drone Academy ECHO","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323bCHOa","sectionArray":["DRONEACu2323bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3528","courseNameDisplay":"Drone Academy FOXTROT","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ceCHOa","sectionArray":["DRONEACu2323ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3529","courseNameDisplay":"Drone Academy GOLF","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323fhCHOa","sectionArray":["DRONEACu2323fhCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3530","courseNameDisplay":"Drone Academy HOTEL","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ilCHOa","sectionArray":["DRONEACu2323ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3552","courseNameDisplay":"Art Lab ALPHA g1w2bFD","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324bCHOa","sectionArray":["ARTLABu2324bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3553","courseNameDisplay":"Art Lab BRAVO g2w2bFD","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324ceCHOa","sectionArray":["ARTLABu2324ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3554","courseNameDisplay":"Art Lab CHARLIE g3w2bFD","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324fhCHOa","sectionArray":["ARTLABu2324fhCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3555","courseNameDisplay":"Art Lab DELTA g4w2bFD","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324ilCHOa","sectionArray":["ARTLABu2324ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3558","courseNameDisplay":"Art Lab FOXTROT g1w2bAM","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324bCHOa","sectionArray":["ARTLABu2324bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3559","courseNameDisplay":"Art Lab GOLF g2w2bPM","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324ceCHOa","sectionArray":["ARTLABu2324ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"13:30:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3560","courseNameDisplay":"Art Lab HOTEL g3w2bFDampm","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324fhCHOa","sectionArray":["ARTLABu2324fhCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM,PM","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3561","courseNameDisplay":"Art Lab INDIA g4w2bFDam","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324ilCHOa","sectionArray":["ARTLABu2324ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3531","courseNameDisplay":"Drone Academy INDIA w2l1g1","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324bCHOa","sectionArray":["DRONEACu2324bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3532","courseNameDisplay":"Drone Academy JULIET w2b1g2","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324ceCHOa","sectionArray":["DRONEACu2324ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3533","courseNameDisplay":"Drone Academy KILO w2b1g3","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324ceCHOa","sectionArray":["DRONEACu2324ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3535","courseNameDisplay":"Drone Academy MIKE w2b2g1","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324bCHOb","sectionArray":["DRONEACu2324bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3536","courseNameDisplay":"Drone Academy NOVEMBER w2b2g2","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324ceCHOb","sectionArray":["DRONEACu2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3537","courseNameDisplay":"Drone Academy OSCAR w2b2g3","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324fhCHOb","sectionArray":["DRONEACu2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3538","courseNameDisplay":"Drone Academy PAPA w2b2g4","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2324ilCHOb","sectionArray":["DRONEACu2324ilCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202124"},{"_id":"3542","courseNameDisplay":"Drone Academy TANGO w3b1g4","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325ilCHOa","sectionArray":["DRONEACu2325ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3544","courseNameDisplay":"Drone AcademyUNIFORM w3b2g1","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325bCHOb","sectionArray":["DRONEACu2325bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3547","courseNameDisplay":"Drone Academy VICTOR w3b2g2","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325ceCHOb","sectionArray":["DRONEACu2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3548","courseNameDisplay":"Drone Academy WHISKEY w3b2g3","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325fhCHOb","sectionArray":["DRONEACu2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3549","courseNameDisplay":"Drone Academy Xray w3b2g4","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325ilCHOb","sectionArray":["DRONEACu2325ilCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":"PPENDING","courseTimeDuration":"PPENDING","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3539","courseNameDisplay":"Drone Academy QUEBEC w3b1g1","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325bCHOa","sectionArray":["DRONEACu2325bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3540","courseNameDisplay":"Drone Academy ROMEO w3b1g2","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325ceCHOa","sectionArray":["DRONEACu2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3541","courseNameDisplay":"Drone Academy SIERRA w3b1g3","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2325fhCHOa","sectionArray":["DRONEACu2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-21T11:59:00.000Z","courseDateEnd":"2021-06-25T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202125"},{"_id":"3550","courseNameDisplay":"Drone Academy YANKEE w4b1g1","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2326bCHOa","sectionArray":["DRONEACu2326bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-28T11:59:00.000Z","courseDateEnd":"2021-07-02T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202126"},{"_id":"3551","courseNameDisplay":"Drone AcademyZULU w4b1g2","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2326ceCHOa","sectionArray":["DRONEACu2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-28T11:59:00.000Z","courseDateEnd":"2021-07-02T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202126"},{"_id":"3523","courseNameDisplay":"Drone Academy ALPHA","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2326ceCHOb","sectionArray":["DRONEACu2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-28T11:59:00.000Z","courseDateEnd":"2021-07-02T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202126"},{"_id":"3534","courseNameDisplay":"Drone Academy LIMA w2b1g4","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2326ilCHOa","sectionArray":["DRONEACu2326ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-28T11:59:00.000Z","courseDateEnd":"2021-07-02T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202126"},{"_id":"3543","courseNameDisplay":"Drone Academy BRAD","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2332ceCHOa","sectionArray":["DRONEACu2332ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-08-09T11:59:00.000Z","courseDateEnd":"2021-08-13T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202132"}]
	// let KLUDGE_GET = [{"_id":"3557","courseNameDisplay":"Art Lab ECHO g1w2bFDampm","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2323bCHOb","sectionArray":["ARTLABu2323bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM,PM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202123"},{"_id":"3524","courseNameDisplay":"Drone Academy BRAVO","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323bCHOb","sectionArray":["DRONEACu2323bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3525","courseNameDisplay":"Drone Academy CHARLIE","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ceCHOb","sectionArray":["DRONEACu2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3526","courseNameDisplay":"Drone Academy DELTA","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ilCHOb","sectionArray":["DRONEACu2323ilCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3527","courseNameDisplay":"Drone Academy ECHO","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323bCHOa","sectionArray":["DRONEACu2323bCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3528","courseNameDisplay":"Drone Academy FOXTROT","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ceCHOa","sectionArray":["DRONEACu2323ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3529","courseNameDisplay":"Drone Academy GOLF","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323fhCHOa","sectionArray":["DRONEACu2323fhCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3530","courseNameDisplay":"Drone Academy HOTEL","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ilCHOa","sectionArray":["DRONEACu2323ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3545","courseNameDisplay":"Drone Academy BACKUP","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323bCHOb","sectionArray":["DRONEACu2323bCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3546","courseNameDisplay":"Drone Academy BGBLD","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2323ilCHOa","sectionArray":["DRONEACu2323ilCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-07T11:59:00.000Z","courseDateEnd":"2021-06-11T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL912","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202123"},{"_id":"3559","courseNameDisplay":"Art Lab GOLF g2w2bPM","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABu2324ceCHOa","sectionArray":["ARTLABu2324ceCHOa1"],"sectionCount":"1","courseDateStart":"2021-06-14T11:59:00.000Z","courseDateEnd":"2021-06-18T11:59:00.000Z","couseTimeStart":"13:30:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"16","termId":"202123","weekId":"202124"},{"_id":"3523","courseNameDisplay":"Drone Academy ALPHA","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACu2326ceCHOb","sectionArray":["DRONEACu2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2021-06-28T11:59:00.000Z","courseDateEnd":"2021-07-02T11:59:00.000Z","couseTimeStart":false,"courseTimeDuration":false,"courseDaysOfWeek":"1,2,3,4,5","courseOptions":false,"jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202123","weekId":"202126"}]
	// let KLUDGE_GET = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224"},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseName":"Creative Creatures","courseNameAbbrv":"CreativeCreatures","curriculumKey":"CREATURES","courseKey":"CREATURESv2324bCHOa","sectionArray":["CREATURESv2324bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3356","termId":"202223","weekId":"202224"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseName":"Gadgets and Gizmos","courseNameAbbrv":"Gadgets","curriculumKey":"GADGETS","courseKey":"GADGETSv2324bCHOb","sectionArray":["GADGETSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"25","termId":"202223","weekId":"202224"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseName":"Intro to STEAM","courseNameAbbrv":"Int Ste","curriculumKey":"INTROSTEAM","courseKey":"INTROSTEAMv2324bCHOb","sectionArray":["INTROSTEAMv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"39","termId":"202223","weekId":"202224"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2324fhCHOb","sectionArray":["MADSCICHEMv2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202224"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2324ceCHOb","sectionArray":["ROBOTCODEv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202224"},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225"},{"_id":"3575","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2325ceCHOb","sectionArray":["CERAMICSv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202225"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2325ceCHOb","sectionArray":["DRONEACv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202225"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325bCHOa","sectionArray":["GIRLLEADELv2325bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325ceCHOa","sectionArray":["GIRLLEADELv2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseName":"Girls Leadership MS","courseNameAbbrv":"GirlsLeadershipMS","curriculumKey":"GIRLLEADMS","courseKey":"GIRLLEADMSv2325fhCHOa","sectionArray":["GIRLLEADMSv2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3360","termId":"202223","weekId":"202225"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2325bCHOb","sectionArray":["MADSCICHEMv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202225"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseName":"Pirate Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"PIRATESCI","courseKey":"PIRATESCIv2325bCHOb","sectionArray":["PIRATESCIv2325bCHOb1"],"sectionCount":"2","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3511","termId":"202223","weekId":"202225"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseName":"STEAM Survivor","courseNameAbbrv":"z_STRING_z","curriculumKey":"Survivor","courseKey":"Survivorv2325ceCHOb","sectionArray":["Survivorv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3501","termId":"202223","weekId":"202225"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225"},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226"},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2326ceCHOb","sectionArray":["MADSCICHEMv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202226"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseName":"Maker Laboratory","courseNameAbbrv":"Maker Sum","curriculumKey":"MAKERLAB","courseKey":"MAKERLABv2326ceCHOa","sectionArray":["MAKERLABv2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1296","termId":"202223","weekId":"202226"},{"_id":"3590","courseNameDisplay":"Art Lab","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABv2328bCHOb","sectionArray":["ARTLABv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202223","weekId":"202228"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseName":"Construction Kids","courseNameAbbrv":"ConstructKids","curriculumKey":"CONKIDS","courseKey":"CONKIDSv2328bCHOa","sectionArray":["CONKIDSv2328bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1283","termId":"202223","weekId":"202228"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2328fhCHOb","sectionArray":["DRONEACv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202228"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2328fhCHOb","sectionArray":["FORENSICSv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202228"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseName":"Journey to Atlantis","courseNameAbbrv":"z_STRING_z","curriculumKey":"ATLANTIS","courseKey":"ATLANTISv2328bCHOb","sectionArray":["ATLANTISv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3515","termId":"202223","weekId":"202228"},{"_id":"3591","courseNameDisplay":"Photography 101","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2328ceCHOb","sectionArray":["PHOTOv2328ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202228"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2329fhCHOb","sectionArray":["BIOMECHv2329fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202229"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseName":"Digging Dinos","courseNameAbbrv":"z_STRING_z","curriculumKey":"Dinosaurs","courseKey":"Dinosaursv2329bCHOb","sectionArray":["Dinosaursv2329bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3516","termId":"202223","weekId":"202229"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2329ceCHOb","sectionArray":["FORENSICSv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202229"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329bCHOa","sectionArray":["LEADSTEAMv2329bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329beCHOa","sectionArray":["LEADSTEAMv2329beCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"AM","jCal":"NNULL","gradeLevelKey":"GL25","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329fhCHOa","sectionArray":["LEADSTEAMv2329fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseName":"Paint and Mixed Media","courseNameAbbrv":"Paint","curriculumKey":"PAINTMEDIA","courseKey":"PAINTMEDIAv2329ceCHOb","sectionArray":["PAINTMEDIAv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"29","termId":"202223","weekId":"202229"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2329dhCHOb","sectionArray":["PHOTOv2329dhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL48","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202229"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2329ceCHOb","sectionArray":["ROBOTCODEv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"NNULL","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202229"}]
	let KLUDGE_GET = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224"},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseName":"Creative Creatures","courseNameAbbrv":"CreativeCreatures","curriculumKey":"CREATURES","courseKey":"CREATURESv2324bCHOa","sectionArray":["CREATURESv2324bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3356","termId":"202223","weekId":"202224"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseName":"Gadgets and Gizmos","courseNameAbbrv":"Gadgets","curriculumKey":"GADGETS","courseKey":"GADGETSv2324bCHOb","sectionArray":["GADGETSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"25","termId":"202223","weekId":"202224"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseName":"Intro to STEAM","courseNameAbbrv":"Int Ste","curriculumKey":"INTROSTEAM","courseKey":"INTROSTEAMv2324bCHOb","sectionArray":["INTROSTEAMv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"39","termId":"202223","weekId":"202224"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2324fhCHOb","sectionArray":["MADSCICHEMv2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202224"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2324ceCHOb","sectionArray":["ROBOTCODEv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202224"},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225"},{"_id":"3575","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2325ceCHOb","sectionArray":["CERAMICSv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202225"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2325ceCHOb","sectionArray":["DRONEACv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202225"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325bCHOa","sectionArray":["GIRLLEADELv2325bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325ceCHOa","sectionArray":["GIRLLEADELv2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseName":"Girls Leadership MS","courseNameAbbrv":"GirlsLeadershipMS","curriculumKey":"GIRLLEADMS","courseKey":"GIRLLEADMSv2325fhCHOa","sectionArray":["GIRLLEADMSv2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3360","termId":"202223","weekId":"202225"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2325bCHOb","sectionArray":["MADSCICHEMv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202225"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseName":"Pirate Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"PIRATESCI","courseKey":"PIRATESCIv2325bCHOb","sectionArray":["PIRATESCIv2325bCHOb1"],"sectionCount":"2","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3511","termId":"202223","weekId":"202225"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseName":"STEAM Survivor","courseNameAbbrv":"z_STRING_z","curriculumKey":"Survivor","courseKey":"Survivorv2325ceCHOb","sectionArray":["Survivorv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3501","termId":"202223","weekId":"202225"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225"},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226"},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2326ceCHOb","sectionArray":["MADSCICHEMv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202226"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseName":"Maker Laboratory","courseNameAbbrv":"Maker Sum","curriculumKey":"MAKERLAB","courseKey":"MAKERLABv2326ceCHOa","sectionArray":["MAKERLABv2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1296","termId":"202223","weekId":"202226"},{"_id":"3590","courseNameDisplay":"Art Lab","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABv2328bCHOb","sectionArray":["ARTLABv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202223","weekId":"202228"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseName":"Construction Kids","courseNameAbbrv":"ConstructKids","curriculumKey":"CONKIDS","courseKey":"CONKIDSv2328bCHOa","sectionArray":["CONKIDSv2328bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1283","termId":"202223","weekId":"202228"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2328fhCHOb","sectionArray":["DRONEACv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202228"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2328fhCHOb","sectionArray":["FORENSICSv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202228"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseName":"Journey to Atlantis","courseNameAbbrv":"z_STRING_z","curriculumKey":"ATLANTIS","courseKey":"ATLANTISv2328bCHOb","sectionArray":["ATLANTISv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3515","termId":"202223","weekId":"202228"},{"_id":"3591","courseNameDisplay":"Photography 101","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2328ceCHOb","sectionArray":["PHOTOv2328ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202228"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2329fhCHOb","sectionArray":["BIOMECHv2329fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202229"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseName":"Digging Dinos","courseNameAbbrv":"z_STRING_z","curriculumKey":"Dinosaurs","courseKey":"Dinosaursv2329bCHOb","sectionArray":["Dinosaursv2329bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3516","termId":"202223","weekId":"202229"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2329ceCHOb","sectionArray":["FORENSICSv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202229"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329bCHOa","sectionArray":["LEADSTEAMv2329bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329beCHOa","sectionArray":["LEADSTEAMv2329beCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL25","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329fhCHOa","sectionArray":["LEADSTEAMv2329fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseName":"Paint and Mixed Media","courseNameAbbrv":"Paint","curriculumKey":"PAINTMEDIA","courseKey":"PAINTMEDIAv2329ceCHOb","sectionArray":["PAINTMEDIAv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"29","termId":"202223","weekId":"202229"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2329dhCHOb","sectionArray":["PHOTOv2329dhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL48","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202229"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2329ceCHOb","sectionArray":["ROBOTCODEv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202229"}]
	memory.setItem('memoryWorkingObject',JSON.stringify(KLUDGE_GET))
	$w('#developerResponseTXTBX').value = JSON.stringify(KLUDGE_GET,undefined,4)
	// import {fetch} from 'wix-fetch';

// ...

// fetch("https://live-steamda.pantheonsite.io/wixcourses/202123/CHO?_format=json", {"method": "get","mode": "no-cors"})
//   .then( (httpResponse) => {
//     let url = httpResponse.url;
//     let statusCode = httpResponse.status;
//     let statusText = httpResponse.statusText;
//     let headers = httpResponse.headers;
//     let bodyUsed = httpResponse.bodyUsed;
//     if (httpResponse.ok) {
//       return httpResponse.json();
//     }
//     else {
//       return Promise.reject("Fetch did not succeedZ");
//     }
//   } )
//   .then( (json) => {
//     console.log(json.someKey);
//   } )
//   .catch( (err) => {
//     console.log(err);
//   } );

// let coursesGET = getDrupalURI(uri = 'enpoint-uri', auth = true, devKludege = false)
	// let coursesGET = await getDrupalURI(url, false)
	// // let coursesGET = await getDrupalURI(url, false, true)
	// console.log(`coursesGET: `)
	// console.dir(coursesGET)
	// console.log(`groupEnd: konstantSelectedCurriculaRepeaterOnReady_DEP()`)
	// console.groupEnd()
	composeFilterFormObject()
	return
	let curriculaBufferThis = termObject.curriculum.curricula

	delete termObject.curriculum
	// console.log(`termObject: [object less-curriculum below]`)
	// console.dir(termObject)
	memory.setItem('memoryParamObject', JSON.stringify(termObject))

	// console.log(`curriculaBufferThis: [array below]`)
	// console.dir(curriculaBufferThis)

	let curriculaBuffer = []
	curriculaBufferThis.forEach(element => {
		if(element.status === '7'){
		element._id = element.nid
		curriculaBuffer.push(element)

		}
	});


	// console.log(`curriculaBuffer: [array below]`)
	// console.dir(curriculaBuffer)
	
	let yesObject = {}
	yesObject.key = 'yes'
	yesObject.status = '7'
	yesObject.repeaterId = '#curriculaSelectedRPTR'
	yesObject.paginationId = '#curriculaSelectedPGNTN'
	yesObject.prefixId = 'selected'
	yesObject.pageItemCount = 8
	yesObject.forcePaginationOffset = 0
	yesObject.curriculaObjectArray = curriculaBuffer

	// console.log(`yesObject: [array below]`)
	// console.dir(yesObject)
	memory.setItem('memoryWorkingObject',JSON.stringify(yesObject))

	evaluationPaginationAndLoadRepeater()
}
//==================================================             </OnReady Called Functions>
//==========================================================================================


async function wixUserPermissionsOnReady(){

	let workingMember = await getCurrentMemberObject()
	// console.log(`workingMember: [object below]`)
	// console.dir(workingMember)
	
	let develEmailArray = ['brad@steamda.com'] 
	if(develEmailArray.includes(workingMember.email)){
		const develShowArray = ["#develBTN"];
		develShowArray.forEach(element => {
			$w(element).show()
		});
		// ø <expand OnReady() as well>
		// toggleTopSection()
		// ø </expand OnReady() as well>
	}
	if(workingMember.roles.includes('Admin')){
		const adminShowArray = []
		adminShowArray.forEach(element => {
			$w(element).show()
		});
	}
	
}

export function  datestampinventoryDocDbJSONOnReady() {
    console.groupCollapsed(`'inventoryDocDbJSON.js' date-stamp function DEMO`)
    let datestampStringResult = datestampinventoryDocDbJSON();
    console.log(datestampStringResult);
    console.log(`groupEnd: 'inventoryDocDbJSON.js' date-stamp function DEMO`);
    console.groupEnd()
}
export function wixStorageDisplayOnReady(){
	// set lastTermNameTXT
	$w('#lastTermNameTXT').text = 'Course Management for:\n' + session.getItem('lastTermName')
}
export async function onReadyCurriculaJSON_DEP(){
	await load_reloadEntirePage_DEP()
}
//====================================================================================================
//==============================        <loadCurriculaRepeater_DEP>         ==============================
//====================================================================================================
function evaluationPaginationAndLoadRepeater(){
	// ø LOAD_COURSES_ON_READY_03_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
	// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
	// ø CREATE_NEW_COURSE_04_evaluationPaginationAndLoadRepeater
	// console.groupCollapsed(`evaluationPaginationAndLoadRepeater`)
	console.group(`evaluationPaginationAndLoadRepeater`)
	let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
	let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
	// /* EVEN ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35","37","39","41"]
	// /* ODD ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["0","2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36","38","40","42"]
	// 		memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
	//memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
	console.log(`allCoursesWorkingObject [array - from JSON.parse() below]`)
	console.dir(allCoursesWorkingObject)
	console.log(`filteredCourseBuffer [array - from JSON.parse() below]`)
	console.dir(filteredCourseBuffer)
	console.log('return FORCE: evaluationPaginationAndLoadRepeater: just logs above')

	// let curriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))
	// console.log(`curriculaObjectArray: [array below]`)
	// console.dir(curriculaObjectArray)
	// let repeaterObject = yesObject
	// console.log(`repeaterObject: [object below]`)
	// console.dir(repeaterObject)
	
	// let areValidParameters = true
	// repeaterObject.notes = []
	// repeaterObject.notes.push('VALIDATION Is Pending')
	// if(!areValidParameters){
	// 	// return repeaterObject
	// 	return
	// }
	// repeaterObject.notes.push(`'forcePaginationOffset' Attribute will be destroyed as soon as it is utilized`)
	// repeaterObject.notes.push(`'forcePaginationOffset' ONLY used if the PaginationObject _cannot_ be counted on [100?,3?], especially at instantiation`)
	// let paramObject = {}
	// paramObject.kind = 'location'
	// paramObject.key = session.getItem('termRegionId')
	// let locationObject = locationGetByKey('CHO')
	// let locationObject = locationGetByRegionKey(session.getItem('termRegionId'))
	// console.log(`locationObject: [object below]`)
	// console.dir(locationObject)


	// let weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))
	// console.log(`weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))`)
	// console.log(`weekDocDbObject = weeksGetByTermId(${Number(session.getItem('termId'))})`)
	// console.log(`weekDocDbObject: [object below]`)
	// console.dir(weekDocDbObject)

	// let gradeLevelDocDbObject = gradeLevelGetCurrent()
	// console.log(`gradeLevelDocDbObject: [object below]`)
	// console.dir(gradeLevelDocDbObject)


	let repeaterId = '#courseFilteredRPTR'
	let paginationId = '#courseFilteredPGNTN'
	let pageItemCount = 8
	if($w(paginationId).totalPages === 100){
		// totalPages === 100 indicates default paginationObject
		$w(paginationId).currentPage = 1
		$w(paginationId).totalPages = Math.ceil(filteredCourseBuffer.length / pageItemCount);
	}
	// repeaterObject.currentPagination = {}
	// repeaterObject.currentPagination.totalPages = $w(paginationId).totalPages
	// repeaterObject.currentPagination.currentPage = $w(paginationId).currentPage
	let pageIndex = $w(paginationId).currentPage - 1
	let offset = pageIndex * pageItemCount
	// repeaterObject.currentPagination.pageIndex = pageIndex
	// repeaterObject.currentPagination.offset = offset

	let repeaterCoursesObjectArray = []
	for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
		const filteredPointerIndex = filteredCourseBuffer[rptrIndex]
		const element = allCoursesWorkingObject[filteredPointerIndex];
		if(typeof element !== 'undefined'){
			// ø <TRANSFORM_REPEATER_DATA>
			// element.simpleWeek = element.weekId - element.termId + 1
			// ø </TRANSFORM_REPEATER_DATA>
			repeaterCoursesObjectArray.push(element)	
		}
	}
	console.log(`repeaterCoursesObjectArray: [array below]`)
	console.dir(repeaterCoursesObjectArray)
	
	// let prefix = 'selected'//KLUDGE: rewrite later
	// let keyTXTid = '#'+ prefix + 'KeyTXT'
	// let nameTXTid = '#'+ prefix + 'NameTXT'

	$w(repeaterId).data = repeaterCoursesObjectArray;
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)
	// let gradeLevelObjectThis = {}
	// let weekObjectThis = {}
	// let weekTimeBlockKey = 'STRING'
	// let weekTimeBlockObjectThis = {}
	console.log(`REFACTOR: repeaterCurriculaObjectArray => repeaterCourseObjectArray`)
	$w(repeaterId).onItemReady( ($courseElement, courseElementData, index) => {
		// gradeLevelObjectThis = gradeLevelDocDbObject[courseElementData.gradeLevelKey]
		// console.log(`gradeLevelObjectThis: [object below]`)
		// console.log(gradeLevelObjectThis)
		// weekObjectThis = weekDocDbObject[courseElementData.weekId]
		// weekTimeBlockKey = (courseElementData.courseOptions).replace(',','_')
		// console.log(`weekObjectThis: [object below]`)
		// console.log(weekObjectThis)
		 
		// weekTimeBlockKey = weekTimeBlockKey.includes('FD') ? 'FD' : weekTimeBlockKey
		// weekTimeBlockKey = weekTimeBlockKey === 'HD_AM' ? 'AM' : weekTimeBlockKey
		// weekTimeBlockKey = weekTimeBlockKey === 'HD_PM' ? 'pM' : weekTimeBlockKey
		// console.log(`weekTimeBlockKey: ${weekTimeBlockKey}`)
		// weekTimeBlockObjectThis = weekObjectThis[weekTimeBlockKey]
		// console.log(`weekTimeBlockObjectThis: [object below]`)
		// console.log(weekTimeBlockObjectThis)

		 
		$courseElement('#courseNameDisplayTXT').text = courseElementData.courseNameDisplay;
		$courseElement('#locationConcatTXT').text = `${courseElementData.locationNameCommon} [${courseElementData.locationKey}]`
		$courseElement('#simpleWeekTXT').text = `${courseElementData.weekNameCardinal} [${courseElementData.weekDateStartAbbrv}]`

		$courseElement('#gradeLevelHumanTXT').text = courseElementData.gradeLevelHuman
		$courseElement('#timeSpanStringTXT').text = courseElementData.weekTimeBlockSpanString
		$courseElement('#timeSpanStringTXT').text += (courseElementData.courseOptions.substr(3)).length > 0 ? ` [${courseElementData.courseOptions.substr(3)}]` : ''
		$courseElement('#daysOfWeekStringTXT').text = courseElementData.weekDaysOfWeekString
		$courseElement('#courseKeyTXT').text = courseElementData.courseKey;
		$courseElement('#sectionCountTXT').text = courseElementData.sectionCount.toString()
	});
	console.log(`groupEnd: evaluationPaginationAndLoadRepeater`)
	console.groupEnd()

}

export async function load_reloadEntirePage_DEP(kind = 'ONREADY'){
	// ø BEGIN load_reloadEntirePage_DEP
	// FOR postCurriculaSelectionsUpdate()
	if(kind === 'POSTUPDATE') {
		console.groupCollapsed(`if(kind === 'POSTUPDATE'): if(${kind} === 'POSTUPDATE')`)
		// $w('#updatesPendingCONTBX').collapse()
		let toUpdateCurriculumRecordId = session.getItem('termRecordId')
		console.log(`toUpdateCurriculumRecordId: ${toUpdateCurriculumRecordId}`)
		let toUpdateCurriculumRecord = await wixData.get("term",toUpdateCurriculumRecordId )
		console.log(`current: toUpdateCurriculumRecord: [object below] `)
		console.dir(toUpdateCurriculumRecord)
		// session.setItem('lastParamObject', JSON.stringify(toUpdateCurriculumRecord,undefined,4))/*BIGBLEED*//*LINE_79*/
		console.log(`current: toUpdateCurriculumRecord: [object below] `)
		console.dir(toUpdateCurriculumRecord)
		console.groupEnd()

	}
	// FOR onReadyCurriculaJSON()
	// console.groupCollapsed(`onReadyCurriculaJSON()`)
	// let termObject = JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_87*/
	// ø TOP__SIDE__BY__SIDE
	let termObject = JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_87*/
	console.log(`termObject: [object belowZZZ]`)
	console.dir(termObject)
	//ø <REGION FORM HERE KLUDGE - @todo: gather from docDbJSON>
	let regionKeyNameObject = {"CHO":"Charlottesville","RIC":"Richmond","ROA":"Blacksburg"}
	$w('#regionNameINPUT').value = regionKeyNameObject[termObject.termRegion]
	$w('#regionNameINPUT').value += ` [${termObject.termRegion}]`
	//ø </REGION FORM HERE KLUDGE>
	// console.log(`termObject._id: ${termObject._id}`)
	// console.groupEnd()
	session.setItem('termRecordId',termObject._id)
	session.setItem('termRegionId',termObject.termRegion)
	console.log(`session.getItem('termRecordId') ${session.getItem('termRecordId')}`)
	let curriculaBufferThis = JSON.stringify(termObject.curriculum.curricula)
	console.log(`curriculaBufferThis.length: ${curriculaBufferThis.length}`)
	if(curriculaBufferThis.length < 300){
		// curriculaBufferThis = `[{"name":"Test Kitchen","textKey":"TESTKITCH","abbrvName":"Test Kitchen","isoLastUpdate":"2021-11-09T17:06:33+0000","status":"0","counter":82,"repeaterDataArrayIndex":81,"nid":"3363"},{"name":"Art of Theater","textKey":"THEATER","abbrvName":"Theater","isoLastUpdate":"2021-11-08T16:21:44+0000","status":"0","counter":83,"repeaterDataArrayIndex":82,"nid":"19"},{"name":"Toy Inventing and Woodworking","textKey":"TOYWOOD","abbrvName":"TOYINVENTWOOD","isoLastUpdate":"2021-11-09T17:06:45+0000","status":"0","counter":85,"repeaterDataArrayIndex":84,"nid":"3330"},{"name":"Weather","textKey":"WEATHER","abbrvName":"Weather","isoLastUpdate":"2021-11-09T17:07:17+0000","status":"0","counter":89,"repeaterDataArrayIndex":88,"nid":"1225"},{"name":"Wildlife and Dissection","textKey":"WILDDISC","abbrvName":false,"isoLastUpdate":"2021-11-09T17:09:31+0000","status":"0","counter":90,"repeaterDataArrayIndex":89,"nid":"1226"},{"name":"Woodworking","textKey":"WOODWORKING","abbrvName":"Woodw","isoLastUpdate":"2021-11-09T17:07:33+0000","status":"0","counter":95,"repeaterDataArrayIndex":94,"nid":"47"}]`
		let sourcedJSON_drupalCurricula = await getSourcedJSON_byKeyPageByPage('drupalCurricula')//JSON.stringify(FIELD)
		// console.log(`sourcedJSON_drupalCurricula.curricula: [array below]`)
		// console.log(sourcedJSON_drupalCurricula)
		// console.dir(sourcedJSON_drupalCurricula.curricula)
		curriculaBufferThis = JSON.stringify(sourcedJSON_drupalCurricula.curricula)
	}
	// console.log(`curriculaBufferThis: [array below]`)
	// console.dir(curriculaBufferThis)
	// session.setItem('curriculaBuffer', curriculaBufferThis)/*BIGBLEED*//*LINE_112*/
	memory.setItem('memoryWorkingObject', curriculaBufferThis)/*BIGBLEED*//*LINE_112*/
	// ø CURRENT_SIDE_BY_SIDE
	// session.setItem('curriculaBufferNOCHANGE',curriculaBufferThis)/*BIGBLEED*//*LINE_113*/
	memory.setItem('memoryWorkingBackupObject',curriculaBufferThis)/*BIGBLEED*//*LINE_113*/
	loadAllCurriculaRepeaters_DEP()
	// ø END load_reloadEntirePage_DEP
}
export function loadAllCurriculaRepeaters_DEP(){
	// ø BEGIN loadAllCurriculaRepeaters_DEP
	// ø <Tasks Upon any loadCurricularRepeater>
	// 	$w('#updatesPendingCONTBX').expand()
	// }
	// ø </Tasks Upon any loadCurricularRepeater>
	let simpleParamArray = ['yes']
	// let simpleParamArray = ['maybe','yes','no']
	let paginationObject = {}
	let paginationObjectThis = {}
	// let fullCurriculaObjectArray = JSON.parse(session.getItem('curriculaBuffer'))/*BIGBLEED*//*LINE_125*/
	let fullCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))/*BIGBLEED*//*LINE_125*/
	// console.log(`fullCurriculaObjectArray: [array below]`)
	// console.dir(fullCurriculaObjectArray)
	// let KLUDGE = '<KLUDGE: Exit Early>'
	// return

	paginationObject.totalCountAllCurricula = fullCurriculaObjectArray.length
	// let totalCount = 0
	let paginationObjectArray = []
	for (let index = 0; index < simpleParamArray.length; index++) {
		// const repeaterId = simpleParamArray[index];
		const simpleParam = simpleParamArray[index];
		// const status = activeRepeaterStatusArray[index];
		// loadCurriculaRepeater_DEP(repeaterId, status)
		// loadCurriculaRepeater_DEP(repeaterId)
		paginationObjectThis = loadCurriculaRepeater_DEP(simpleParam)
		paginationObjectArray.push(paginationObjectThis)
	}
	paginationObject.paginationObjectArray = paginationObjectArray
	$w('#developerResponseTXTBX').value = JSON.stringify(paginationObject,undefined,4)
	// ø END loadAllCurriculaRepeaters_DEP
}
export function loadCurriculaRepeater_DEP(simpleParam = 'default'){
	// ø BEING loadCurriculaRepeateZr_DEP
	// console.group(`loadCurriculaRepeater_DEP(repeaterId = 'default', status = '0')`)
	console.groupCollapsed(`loadCurriculaRepeater_DEP(${simpleParam} = 'default')`)
	// console.group(`loadCurriculaRepeater_DEP(${simpleParam} = 'default')`)
	let supportedSimpleParam = ['maybe','yes','no']
	// repeaterId = supportedRepeaterValues.includes(repeaterId) ? repeaterId : 'maybe'
	simpleParam = supportedSimpleParam.includes(simpleParam) ? simpleParam : 'maybe'
	let status = '777'
	let repeaterId = 'repeaterIdHOLDER'
	let prefixId = 'prefixIdHOLDER'
	console.log(`supported: simpleParam: ${simpleParam}`)
	let repeaterFinal2dArray = [['maybe','0','#curriculaOndeckRPTR','ondeck'],['yes','7','#curriculaSelectedRPTR','selected'],['no','9','#curriculaRejectedRPTR','rejected']]

	for (let index = 0; index < supportedSimpleParam.length; index++) {
		const key = supportedSimpleParam[index];
		const kvp = repeaterFinal2dArray[index];
		if(key === simpleParam){
			status = kvp[1]
			repeaterId = kvp[2]
			prefixId = kvp[3]
		}
		
	}

	console.log(`final: simpleParam: ${simpleParam}`)
	console.log(`final: status: ${status}`)
	console.log(`final: repeaterId: ${repeaterId}`)
	console.log(`final: prefixId: ${prefixId}`)

	// let fullCurriculaObjectArray = JSON.parse(session.getItem('curriculaBuffer'))/*BIGBLEED*//*LINE_175*/
	let fullCurriculaObjectArray = JSON.parse(memory.getItem('memoryWorkingObject'))/*BIGBLEED*//*LINE_175*/
	console.log(`fullCurriculaObjectArray: [array below]`)
	console.dir(fullCurriculaObjectArray)
	let curriculaObjectArray = [];
	let totalCount = 0
	let count = 0
	let pageIndex = 0
	let page = pageIndex + 1
	let pageItemCount = 8
	let offset = pageIndex * pageItemCount
	let totalPages = Math.ceil(totalCount / pageItemCount)
	let paginationObject = {}

	paginationObject.simpleParam = simpleParam
	paginationObject.status = status
	paginationObject.repeaterId = repeaterId
	paginationObject.prefixId = prefixId
	
	paginationObject.pageIndex = pageIndex
	paginationObject.page = page
	paginationObject.pageItemCount = pageItemCount
	paginationObject.offset = offset
	paginationObject.totalPages = totalPages
	let DEVEL_MAX = 6
	let done = false
	fullCurriculaObjectArray.forEach(elementObject => {
		// done = index_id >= DEVEL_MAX ? true : false
		done = count >= pageItemCount ? true : done
		if(elementObject.status === status){
			totalCount++
			if(!done){
				// elementObject._id = index_id.toString()
				elementObject._id = elementObject.nid.toString()
				curriculaObjectArray.push(elementObject)
				count++
			}
		}
	});
	paginationObject.totalCount = totalCount
	paginationObject.pageItemCountThisPage = count
	console.log(`curriculaObjectArray: `)
	console.dir(curriculaObjectArray)


	// return
	console.groupCollapsed(`rptr load iteration: repeaterId: ${repeaterId}`)
	$w(repeaterId).data = curriculaObjectArray;
	console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	console.dir($w(repeaterId).data)
	let keyTXTid = '#'+ prefixId + 'KeyTXT'
	let nameTXTid = '#'+ prefixId + 'NameTXT'
	$w(repeaterId).onItemReady( ($curriculumElement, curriculumElementData, index) => {
		$curriculumElement(keyTXTid).text = curriculumElementData.textKey;
		$curriculumElement(nameTXTid).text = curriculumElementData.name;
	});

	console.log(`groupEnd: rptr load iteration: repeaterId: ${repeaterId}`)
	console.groupEnd()

	console.log(`groupEnd: loadCurriculaRepeater_DEP(${simpleParam} = 'default')`)
	console.groupEnd()
	return paginationObject
	// ø END loadCurriculaRepeateZr_DEP
}
export function processSelectCurriculum(event,scriptName){
	// ø BEGIN processSelectCurriculum
	console.groupCollapsed(`processSelectCurriculum(scriptname)`)
	// console.group(`processSelectCurriculum(scriptname)`)
	// console.log(`$item:`)
	// console.dir($item)
	console.log(`scriptName: ${scriptName}`)
	scriptName = scriptName.toLowerCase()
	console.log(`scriptName: ${scriptName}`)
	let repeaterId = 'selected'
	repeaterId = scriptName.includes('location') ? 'location' : repeaterId
	console.log(`inferred from scriptName: repeaterId: ${repeaterId}`)
	// let repeaterFinal2dArray = [['ondeck','#curriculaOndeckRPTR'],['selected','#curriculaSelectedRPTR'],['rejected','#curriculaRejectedRPTR']]
	let repeaterFinal2dArray = [['ondeck','#curriculaOndeckRPTR'],['selected','#curriculaSelectedRPTR'],['rejected','#curriculaRejectedRPTR'],['location','#formLocationRPTR']]
	repeaterFinal2dArray.forEach(kvp => {
		const key = kvp[0]
		if(key === repeaterId){
			repeaterId = kvp[1]
		}
	});
	console.log(`final: repeaterId: ${repeaterId}`)

	const data = $w(repeaterId).data;
	console.log(`data`)
	console.dir(data)
    let clickedItemData = data.find(item => item._id === event.context.itemId);
	console.log(`clickedItemData:`)
	console.dir(clickedItemData)
	console.log(`groupEnd: processSelectCurriculum(scriptname)`)
	console.groupEnd()
	return clickedItemData
	// ø END processSelectCurriculum
}

//====================================================================================================
//==============================        </loadCurriculaRepeater_DEP>        ==============================
//====================================================================================================

//====================================================================================================
//========================================        <Confirm Backend with Mulitply and Publick with Add>
export function callPublicADD_from_toggleExpandButtons_OnReady () {
	console.groupCollapsed(`callPublicADD_from_toggleExpandButtons_OnReady`)
	let yyyymmOfBuild = 202111
	let ddOfBuild = 9
    let sum = addFrom_toggleExpandButtons(yyyymmOfBuild,ddOfBuild);
	console.log(`${sum} = addFrom_toggleExpandButtons(${202111},${9})`)
    console.groupEnd();
}


export async function develOnReady(){
	// let termObject = JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_288*/
	let termObject = JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_288*/
}
//========================================       </Confirm Backend with Mulitply and Publick with Add>
//====================================================================================================

//====================================================================================================
//============================================================                  <Overall Build Course>
//====================================================================================================

//==========================================================================================
//==================================================       <Instantiate from Curricula Click>
 
// ø <---------- <restCourseFormAll>  ---------->
function resetCourseFiltersAll(){
// ø CREATE_NEW_COURSE_±2_resetCourseForm
	// let wID_unsetArray = ['#courseNameINPUT','#courseNameDisplayINPUT','#regionLocationINPUT','#regionLocationKeyINPUT']
	let wID_unsetArray = ['#regionLocationINPUT','#regionLocationKeyINPUT']
	for (let index = 0; index < wID_unsetArray.length; index++) {
		const element = wID_unsetArray[index];
		$w(element).value = ''
	}
	$w('#selectLocationBTN').label = 'Select Location'

	$w('#startDateDTPKR').value = null
	$w('#startDateDTPKR').resetValidityIndication()
	// $w('#courseNameDisplayINPUT').resetValidityIndication()
	// $w('#halfDayCBXGRP').value = []
	// $w('#halfDayCBXGRP').resetValidityIndication()
	 
	$w('#previewErrorStringTXT').text = `Holder for Errors`
	$w('#previewErrorStringTXT').collapse()
	// $w('#newCourseDataObjectPreview').text = `use $w('#coursePreviewTXT').html`
	// $w('#previewCourseBTN').show()
	// $w('#formPreviewCNTBX').hide()
	// $w('#postCourseBTN').hide()
	// $w('#selectedNewCourseBTN').enable()
	 
	$w('#gradeLevelDRPDN').value = 'NA'
	$w('#minGradeDRPDN').value = 'NA'
	$w('#weekCountDRPDN').value = 'NA'
	// $w('#daysOfWeekCBXGRP').value = ['1','2','3','4','5']
	// $w('#daysOfWeekCBXGRP').value = ['MON','TUE','WED','THU','FRI']
	// $w("#myCheckboxGroup").value = ["value1", "value2"];
	// session.setItem('lastResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// memory.setItem('memoryResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// ø TERMINUS CREATE_NEW_COURSE_±2_resetCourseForm
	// ø ±1 course form scripts, but...
	// ø NEXT-BTN_click =>  CREATE_NEW_COURSE_00_Click_PreviewBTN
}
// ø <---------- </restCourseFormAll> ---------->
 
// ø <---------- <On Click Curriculum Object>  ---------->
export function instantiateNewCourseObject(clickedItemData){
	// ø CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
	console.groupCollapsed(`export function instantiateNewCourseObject(clickedItemData)`)
	console.log(`clickedItemData: [object below]`)
	console.dir(clickedItemData)

	let newCourseDataObject = {}
	newCourseDataObject.notes = []
	newCourseDataObject.abbrvName = clickedItemData.abbrvName
	newCourseDataObject.name = clickedItemData.name
	newCourseDataObject.curriculumId = clickedItemData.nid
	newCourseDataObject.textKey = clickedItemData.textKey
	newCourseDataObject.notes.push(`append clickedItemData to newCourseDataObject`)
	// console.log(`append clickedItemData: newCourseDataObject: [object below]`)
	// console.dir(newCourseDataObject)

	// let lastTermRecord =  JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_350*/
	let lastTermRecord =  JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_350*/
	// console.log(`lastTermRecord: [object below]`)
	// console.dir(lastTermRecord)
 
	newCourseDataObject.termDateEnd = lastTermRecord.termDateEnd
	newCourseDataObject.termDateStart = lastTermRecord.termDateStart
	newCourseDataObject.termId = lastTermRecord.termId
	newCourseDataObject.termRegion = lastTermRecord.termRegion
	newCourseDataObject.title = lastTermRecord.title
	newCourseDataObject.termWix_id = lastTermRecord._id
	newCourseDataObject.notes.push(`append lastTermRecord to  newCourseDataObject`)
	// console.log(`append lastTermRecord: newCourseDataObject: [object below]`)

	// appendLocationsJsonDocDb(newCourseDataObject)
	// console.log(`append Locations: newCourseDataObject: [object below]`)
	console.log(`CREATE_NEW_COURSE_±1a_instantiateNewCourseObject: newCourseDataObject:`)
	console.dir(newCourseDataObject)
	
	newCourseFormLoadAfterClick(newCourseDataObject)

	console.log(`groupEnd: export function instantiateNewCourseObject(clickedItemData)`)
	console.groupEnd()

}
// ø <---------- </On Click Curriculum Object> ---------->
 
 
// ø <---------- <On Change Start-Time & Duration>  ---------->
function onChangeStartTimeDurationRadioSettings(scriptName = 'STRING'){
	let whatChanged = scriptName.substr(-7) === '_change' ? scriptName.substr(0, scriptName.length - 7) : scriptName
	$w('#developerResponseTXTBX').value += 'NEW-CHANGE:\n===========\n' + whatChanged
	let supportedWhatChangedArray = ['summerTmBlksRDBTNS','startTimeTMPKR','durationTMPKR']
	if(!supportedWhatChangedArray.includes(whatChanged)){
		return
	}
	let wIdWhatChanged = '#' + whatChanged
	if(whatChanged === 'summerTmBlksRDBTNS'){
		$w('#developerResponseTXTBX').value += '\nSINCE: Summner-Block is: '+ $w('#summerTmBlksRDBTNS').value
		//Full Day,FULL; Morning,AM; Afternoon,PM
		if($w('#summerTmBlksRDBTNS').value === 'FULL'){
			$w('#developerResponseTXTBX').value += '\nSET: Start & Duration to: 9:00am - 8:00'
			// $w("#myTimeInput").value = "16:30";
			$w('#startTimeTMPKR').value = '09:00'
			$w('#durationTMPKR').value = '08:00'
			$w('#halfDayCNTBX').expand()
		}
		if($w('#summerTmBlksRDBTNS').value === 'AM'){
			$w('#developerResponseTXTBX').value += '\nSET: Start & Duration to: 9:00am - 3:30'
			// $w('#developerResponseTXTBX').value += '\nto: AM'
			$w('#startTimeTMPKR').value = '09:00'
			$w('#durationTMPKR').value = '03:30'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
		if($w('#summerTmBlksRDBTNS').value === 'PM'){
			$w('#developerResponseTXTBX').value += '\nSET: Start & Duration to: 1:30pm - 3:30'
			// $w('#developerResponseTXTBX').value += '\nto: PM'
			$w('#startTimeTMPKR').value = '13:30'
			$w('#durationTMPKR').value = '03:30'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
	}
	if(whatChanged !== 'summerTmBlksRDBTNS'){
		$w('#developerResponseTXTBX').value += `\nSINCE: StartTime: ${$w('#startTimeTMPKR').value} & Duration: ${$w('#durationTMPKR').value}`
		$w('#summerTmBlksRDBTNS').value = ''
		if($w('#startTimeTMPKR').value === '09:00:00.000' && $w('#durationTMPKR').value === '08:00:00.000'){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: FULL'
			$w('#summerTmBlksRDBTNS').value = 'FULL'
			$w('#halfDayCNTBX').expand()
		}
		if($w('#startTimeTMPKR').value === '09:00:00.000' && $w('#durationTMPKR').value === '03:30:00.000'){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: AM'
			$w('#summerTmBlksRDBTNS').value = 'AM'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
		if($w('#startTimeTMPKR').value === '13:30:00.000' && $w('#durationTMPKR').value === '03:30:00.000'){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: PM'
			$w('#summerTmBlksRDBTNS').value = 'PM'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
		if($w('#summerTmBlksRDBTNS').value.length === 0){
			$w('#developerResponseTXTBX').value += '\nSET: Summner-Block to: EEMPTY'
			$w('#halfDayCBXGRP').value = []
			$w('#halfDayCBXGRP').resetValidityIndication()
			$w('#halfDayCNTBX').collapse()
		}
	}
		$w('#developerResponseTXTBX').value += '\n...\n'
}
// ø <---------- </On Change Start-Time & Duration> ---------->
 
// ø <---------- <Instantiate jsonDocDb for Locations>  ---------->
export function appendLocationsJsonDocDb(newCourseDataObject){
	let paramObject = {}
	paramObject.kind = 'location'
	paramObject.key = session.getItem('termRegionId')
	let locationResponseObject = getInventoryResponse(paramObject)

	let locationObjectArray = locationResponseObject.data.response
	console.log(`locationResponseObject.data.response: locationObjectArray: [object below]`)
	console.dir(locationObjectArray)
	let locationKeyConcatSting = '_'
	for (let index = 0; index < locationObjectArray.length; index++) {
		const element = locationObjectArray[index];
		locationKeyConcatSting += element.key + '_'
	}
	session.setItem('supportedLocationConcatString', locationKeyConcatSting)
	
	// ø <Load Locations Repeater Right Here>

	// • <Specific WiX Repeater Code>
    let repeaterId = '#formLocationRPTR'
    let prefixId = 'formLocation'
	// console.groupCollapsed(`rptr load iteration: repeaterId: ${repeaterId}`)
	$w(repeaterId).data = locationObjectArray;
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)
	let keyTXTid = '#'+ prefixId + 'KeyTXT'
	let nameTXTid = '#'+ prefixId + 'NameTXT'
	$w(repeaterId).onItemReady( ($locationElement, locationElementData, index) => {
        $locationElement(keyTXTid).text = locationElementData.key;
		$locationElement(nameTXTid).text = locationElementData.nameFull;
	});
    // • </Specific WiX Repeater Code>

	// ø </Load Locations Repeater Right Here>
}
// ø <---------- </Instantiate jsonDocDb for Locations> ---------->

// ø <---------- <Populate Form Curriculum and Locations>  ---------->
export function newCourseFormLoadAfterClick(newCourseDataObject){
	$w('#courseNameINPUT').value = newCourseDataObject.name
	$w('#courseNameDisplayINPUT').value = newCourseDataObject.name
	// session.setItem('lastResponseObject', JSON.stringify(newCourseDataObject))/*BIGBLEED*//*LINE_473*/
	memory.setItem('memoryResponseObject', JSON.stringify(newCourseDataObject))/*BIGBLEED*//*LINE_473*/
}
// ø <---------- </Populate Form Curriculum and Locations> ---------->

//==================================================      </Instantiate from Curricula Click>
//==========================================================================================
//==========================================================================================
//==================================================              <Preview Button: Validate>

// ø <---------- <validate preview data>  ---------->
export function validateFilterForm(){
	// ø FILTER_COURSES_01_validateFilterForm
	// ø CREATE_NEW_COURSE_01_ValidateFilterForm
	let ErrorString = ''
	// if(($w('#courseNameINPUT').value).length === 0){
	// 	ErrorString += ` •  'Course Name' is blank please select a Course at Left\n`
	// }
	// if(($w('#courseNameDisplayINPUT').value).length === 0){
	// 	ErrorString += ` •  'Course Name Display' cannot be blank\n`
	// }
	//ø <GradeLevel>
	let isValidGradeLevel = 'TTRUE'
	// isValidMaxMin = $w('#minGradeDRPDN').value === 'NA' && $w('#gradeLevelDRPDN').value === 'NA' ? 'BOTH_NA' : isValidMaxMin
	isValidGradeLevel = $w('#minGradeDRPDN').value !== 'NA' && $w('#gradeLevelDRPDN').value !== 'NA' ? 'BOTH_VALUES' : isValidGradeLevel

	// isValidMaxMin = isValidMaxMin === 'FFALSE' ? 'MIN_MAX_JUST_ONE' : isValidMaxMin
	// isValidMaxMin = isValidMaxMin === 'BOTH_VALUES' && Number($w('#minGradeDRPDN').value) > Number($w('#maxGradeDRPDN').value) ? 'MIN_GT_MAX' : isValidMaxMin
	// isValidMaxMin = isValidMaxMin === 'BOTH_NA' && $w('#gradeLevelDRPDN').value === 'NA' ? 'ALL_UNSET' : isValidMaxMin
	// isValidMaxMin = isValidMaxMin === 'BOTH_VALUES' && $w('#gradeLevelDRPDN').value !== 'NA' ? 'ALL_SET' : isValidMaxMin

	// let testAppendString = `\nisValidGradeLevel: ${isValidGradeLevel}: `
	let stringIsValidHOLDER = ''
	// isValidMaxMin = isValidMaxMin.includes('BOTH') ? 'TTRUE' : 'FFALSE'
	// testAppendString += `${isValidMaxMin}`
	if(isValidGradeLevel !== 'TTRUE'){
		// stringMinMax = stringMinMax === 'MIN_MAX_JUST_ONE' ? 'Only one-of  Min-Grade and Max-Grade is set' : stringMinMax
		// stringMinMax = stringMinMax === 'MIN_GT_MAX' ? 'Min-Grade cannot be greater than Max-Grade' : stringMinMax
		// stringMinMax = stringMinMax === 'ALL_UNSET' ? 'No Valid Grade-Level was selected' : stringMinMax
		stringIsValidHOLDER = isValidGradeLevel === 'BOTH_VALUES' ? `You cannot select both a 'Grade Contains' Grades and a Grade-Level from the Drop-Down` : stringIsValidHOLDER
		ErrorString += ` •  ${stringIsValidHOLDER}\n`
		// console.log(`isValidMaxMin === '${isValidMaxMin}': ErrorString: ${ErrorString}`)
	}
	//ø </GradeLevel>

	//ø <Week-Contains Date>
	let isValidWeekDate = 'TTRUE'
	let date = $w("#startDateDTPKR").value;
	console.log(`date: [object below]`)
	console.dir(date)
	let stringDatePicker = ''
	if(date === null){
		stringDatePicker = `NNULL`
	} else {
		stringDatePicker = date.toISOString(); // "Fri Jan 13 2017"
	}
	console.log(`stringDatePicker: date.toISOString(): ${stringDatePicker}`)
	isValidWeekDate = $w('#weekCountDRPDN').value !== 'NA' && stringDatePicker !== 'NNULL' ? 'BOTH_VALUES' : isValidWeekDate
	stringIsValidHOLDER = ''
	if(isValidWeekDate !== 'TTRUE'){
		stringIsValidHOLDER = isValidWeekDate === 'BOTH_VALUES' ? `You cannot select both a 'Week Drop-Dow' Week and a 'Contains Date' from the Date-Picker` : stringIsValidHOLDER
		ErrorString += ` •  ${stringIsValidHOLDER}\n`
		console.log(`isValidWeekDate: ${isValidWeekDate}`)
	}
	//ø </Week-Contains Date>

	// let weekContainsDateKLUDGE = true
	// if (weekContainsDateKLUDGE) {
	// 	return
	// }



	// if(($w('#isValidWeekDate').value !== 'TTRUE'){
	// 	ErrorString += ` •  You cannot select both a 'Week Drop-Dow' Week and a 'Contains Date' from the Date-Picker\n`
	// }


	// let coursStartDateDaysOfWeekAreNotNull = ($w('#daysOfWeekCBXGRP').selectedIndices).length === 0 ? false : true
	// coursStartDateDaysOfWeekAreNotNull = $w('#startDateDTPKR').value === null ? false : coursStartDateDaysOfWeekAreNotNull
	// // console.log(`coursStartDateDaysOfWeekAreNotNull: ${coursStartDateDaysOfWeekAreNotNull}`)
	// let courseStartDateDate = $w('#startDateDTPKR').value
	// courseStartDateDate = courseStartDateDate == null ? new Date(1961,11,25,6,59) : courseStartDateDate
	// let courseStartDate = courseStartDateDate.toISOString()
	// courseStartDate   =  (courseStartDate).substr(0,11) + '11:59' + ':00.000Z'//"2021-08-13T05:00:00.000Z"
	// let courseEndDate = 'SKIP_TERM_DATES_LOGIC'
	// if(coursStartDateDaysOfWeekAreNotNull){
	// 	let weeks = Number($w('#weekCountDRPDN').value)
	// 	let daysOfWeek = $w('#daysOfWeekCBXGRP').selectedIndices
	// 	let getEndDateFromScheduleResponse = getEndDateFromSchedule_Start_Weeks_DaysOfWeek(courseStartDate, weeks, daysOfWeek)
	// 	if(getEndDateFromScheduleResponse.affirmativeBoolean === true){
	// 		courseEndDate = getEndDateFromScheduleResponse.affirmative.simpleResponse
	// 	}else{
	// 		ErrorString += ` •  Could not properly Calculat the 'End Date' of the Course\n`
			
	// 	}
		
	// 	// let termObject = JSON.parse(local.getItem('lastParamObject'))/*BIGBLEED*//*LINE_536*/
	// 	let termObject = JSON.parse(memory.getItem('memoryParamObject'))/*BIGBLEED*//*LINE_536*/
	// 	let termDateStart =  (termObject.termDateStart).substr(0,11) + '00:01' + ':00.000Z'//"2021-08-13T05:00:00.000Z"
	// 	let termDateEnd   =  (termObject.termDateEnd).substr(0,11) + '23:59' + ':00.000Z'//"2021-08-13T05:00:00.000Z"

	// 	if(courseEndDate !== 'SKIP_TERM_DATES_LOGIC'){
	// 		if(courseStartDate < termDateStart){
	// 			ErrorString += ` •  The Course begins before the Term has started\n`
	// 		}
	// 		if(courseEndDate > termDateEnd){
	// 			ErrorString += ` •  The Course ends after the Term is over\n`
	// 		}
	// 	}
	// }else{
	// 	ErrorString += ` •  A Start Date for the Course must be selected\n`
	// }
	// let HOLDER = '_' + $w('#regionLocationKeyINPUT').value + '_'
	// if(!(session.getItem('supportedLocationConcatString')).includes(HOLDER)){
	// 		ErrorString += ` •  Please select a Valid Location\n`
	// }

// ø CREATE_NEW_COURSE_01_ValidateFilterForm
	if(ErrorString.length === 0){
		// ErrorString = ErrorString.length === 0 ? 'NO ERRORS YET' : ErrorString
		// ø SUCCESS CREATE_NEW_COURSE_01_ValidateFilterForm
		// // ø NEXT CREATE_NEW_COURSE_02_collectAndCalculateData_DEP
		// ø NEXT CREATE_NEW_COURSE_02_composeFilterFormObject
		$w('#previewErrorStringTXT').text = `Holder for Errors`
		$w('#previewErrorStringTXT').collapse()
		// collectAndCalculateData_DEP(courseStartDate, courseEndDate)
		console.log('VALID CALL: composeFilterFormObject()')
		composeFilterFormObject()
	}else{
		// ø FAILURE CREATE_NEW_COURSE_01_ValidateFilterForm
		// ø NEXT CREATE_NEW_COURSE_02_catchAndDisplayError
		catchAndDisplayError(ErrorString)
	}



	// ErrorString += '\n' + testAppendString
	// $w('#formPreviewCNTBX').show()
	// $w('#coursePreviewTXT').text = ErrorString
	// return
/*
	- ‡ courseNameDisplay non-Empty
	- ‡ at least one day selected
  - GradeLevel is Valid
	  - ‡ GradeLevel DropDown is Valid 
		  - ‡ XOR 
	  - † (GradeMin Valid && GradeMax Valid) && GradMin <= GradeMax 

	- † Start Date between termDates 
	- † Start Date + Weeks + last Day of Week between TermDates 
*/
}
// ø <---------- </validate preview data> ---------->

// ø <---------- <catch & display ERROR>  ---------->
export function catchAndDisplayError(ErrorString){
	// ø FILTER_COURSES_02err_catchAndDisplayError
	// ø TERMINUS CREATE_NEW_COURSE_02_catchAndDisplayError
	// START OVER: NEXT-BTN_click => CREATE_NEW_COURSE_±3_Click_clearCourseForm
	// ADJUST FORM: NEXT-BTN_click =>  CREATE_NEW_COURSE_00_Click_PreviewBTN
	console.log(`ErrorString: `)
	console.log(ErrorString)
	$w('#previewErrorStringTXT').expand()
	$w('#previewErrorStringTXT').text = 'CANNOT APPLY FILTER:\n' + ErrorString + `use the 'Reset Filters' button to try agin...` 
}
// ø <---------- </catch & display ERROR> ---------->

//==================================================             </Preview Button: Validate>
//==========================================================================================

//==========================================================================================
//==================================================      <Preview Button: Compose & Display>

// ø <---------- <collectAndCalculateData_DEP(courseStartDate, courseEndDate)>  ---------->
function composeFilterFormObject(){
	// ø LOAD_COURSES_ON_READY_01_composeFilterFormObject_OnReadyForceChangeNoFilter
	// ø FILTER_COURSES_02_composeFilterFormObject
	// ø CREATE_NEW_COURSE_02_composeFilterFormObject
	// console.groupCollapsed(`composeFilterFormObject()`)
	console.group(`composeFilterFormObject()`)
	let paramObjectFilterForm = {}
	paramObjectFilterForm.byWeek = $w('#weekCountDRPDN').value === 'NA' ? false : true
	paramObjectFilterForm.byContainsDate = $w('#startDateDTPKR').value === null ? false : true
	paramObjectFilterForm.byGradeLevel = $w('#gradeLevelDRPDN').value === 'NA' ? false : true
	paramObjectFilterForm.byContainsGrade = $w('#minGradeDRPDN').value === 'NA' ? false : true
	paramObjectFilterForm.byLocationKey = $w('#regionLocationKeyINPUT').value.length === 0 ? false : true
	paramObjectFilterForm.pipedBoolean = `${paramObjectFilterForm.byWeek}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byContainsDate}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byGradeLevel}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byContainsGrade}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byLocationKey}`
	if(paramObjectFilterForm.byWeek){paramObjectFilterForm.weekCardinal = Number($w('#weekCountDRPDN').value); paramObjectFilterForm.weekId = 777777}
	if(paramObjectFilterForm.byContainsDate){paramObjectFilterForm.containsDateISO = $w('#startDateDTPKR').value.toISOString()}
	if(paramObjectFilterForm.byGradeLevel){paramObjectFilterForm.gradeLevel = $w('#gradeLevelDRPDN').value}
	if(paramObjectFilterForm.byContainsGrade){paramObjectFilterForm.containsGrade = $w('#minGradeDRPDN').value}
	if(paramObjectFilterForm.byLocationKey){paramObjectFilterForm.locationKey = $w('#regionLocationKeyINPUT').value}

	// console.log(`paramObjectFilterForm: [object below]`)
	// console.dir(paramObjectFilterForm)
	
	let previousParmObjectFilterForm = JSON.parse(memory.getItem('memoryParamObject'))

	console.log(`previousParmObjectFilterForm: [object below]`)
	console.dir(previousParmObjectFilterForm)

	let changedContinue = false
	changedContinue = paramObjectFilterForm.pipedBoolean === previousParmObjectFilterForm.pipedBoolean ? changedContinue : true

	console.log(`pipedBoolean: changedContinue: ${changedContinue}`)
	if(!changedContinue){
		let attributeArray = Object.keys(paramObjectFilterForm)
		for (let index = 0; index < attributeArray.length; index++) {
			const attribute = attributeArray[index];
			changedContinue = paramObjectFilterForm[attribute] === previousParmObjectFilterForm[attribute] ? changedContinue : true
			console.log(`${attribute}: changedContinue: ${changedContinue}`)
		}
	}
	if(changedContinue){
		console.log(`changedContinue: ${changedContinue}: CONTINUE`)
	}
	if(!changedContinue){
		console.log(`changedContinue: ${changedContinue}: NO_ACTION`)
	}
	

	console.log(`groupEnd: composeFilterFormObject()`)
	console.groupEnd()
	if(changedContinue){
		applyFilterToBuffer(paramObjectFilterForm)
	}
}
function applyFilterToBuffer(paramObjectFilterForm){
	// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
	// ø FILTER_COURSES_03_applyFilterToBuffer
	// ø CREATE_NEW_COURSE_03_applyFilterToBuffer_paramObjectFilterForm
	// console.groupCollapsed(`applyFilterToBuffer(paramObjectFilterForm)`)
	console.group(`applyFilterToBuffer(paramObjectFilterForm)`)
	console.log(`REACHED: applyFilterToBuffer(paramObjectFilterForm)`)

	// let weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))
	// console.log(`weekDocDbObject = weeksGetByTermId(Number(session.getItem('termId')))`)
	// console.log(`weekDocDbObject = weeksGetByTermId(${Number(session.getItem('termId'))})`)
	// console.log(`weekDocDbObject: [object below]`)
	// console.dir(weekDocDbObject)

	// let gradeLevelDocDbObject = gradeLevelGetCurrent()
	// console.log(`gradeLevelDocDbObject: [object below]`)
	// console.dir(gradeLevelDocDbObject)

	let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
	console.log(`allCoursesWorkingObject: [array below]`)
	console.dir(allCoursesWorkingObject)
	console.log(`paramObjectFilterForm: [object below]`)
	console.dir(paramObjectFilterForm)
	// return
	let filteredCourseBuffer = []
	let filteringComplete = paramObjectFilterForm.pipedBoolean === "false|false|false|false|false" ? true : false
	if(filteringComplete){
		filteredCourseBuffer = Object.keys(allCoursesWorkingObject)
		console.log(`filteredCourseBuffer: [array below]`)
		console.dir(filteredCourseBuffer)
		// console.log(`LOAD_COURSE_REPEATER: evaluationPaginationAndLoadRepeater()`)
		console.log(`groupEnd: applyFilterToBuffer(paramObjectFilterForm)`)
		console.groupEnd()
		memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
		evaluationPaginationAndLoadRepeater()
		return
	}




	memory.setItem('memoryParamObject', JSON.stringify(paramObjectFilterForm))

	console.log(`groupEnd: applyFilterToBuffer(paramObjectFilterForm)`)
	console.groupEnd()
}
// ø <---------- <collectAndCalculateData_DEP(courseStartDate, courseEndDate)>  ---------->
export function collectAndCalculateData_DEP(courseStartDate, courseEndDate){
    // ø CREATE_NEW_COURSE_02_collectAndCalculateData_DEP
	// console.group(`collectAndCalculateData_DEP(${courseEndDate})`)
	console.groupCollapsed(`collectAndCalculateData_DEP(${courseEndDate})`)
	// let newCourseDataObject = JSON.parse(session.getItem('lastResponseObject'))/*BIGBLEED*//*LINE_613*/
	let newCourseDataObject = JSON.parse(memory.getItem('memoryResponseObject'))/*BIGBLEED*//*LINE_613*/
	// console.log(`newCourseDataObject: `)
	// console.dir(newCourseDataObject)
	// return
	let newCourseApiObject = CONSTRUCT_apiObject_POSTbyKind('courses')
	console.log(`newCourseApiObject = CONSTRUCT_apiObject_POSTbyKind('courses'): `)
	console.dir(newCourseApiObject)
	let gradeLevelKey = $w('#gradeLevelDRPDN').value === 'NA' ? 'GL' + $w('#minGradeDRPDN').value + $w('#maxGradeDRPDN').value : $w('#gradeLevelDRPDN').value
	let daysofweek = ($w('#daysOfWeekCBXGRP').selectedIndices).toString()
	console.log(`daysofweek: ${daysofweek}`)
	console.log(`typeof daysofweek: ${typeof daysofweek}`)
	newCourseApiObject.workingDataObject.type = "courses"
	newCourseApiObject.workingDataObject.title = $w('#courseNameDisplayINPUT').value
	// newCourseApiObject.workingDataObject.promote = true
	// newCourseApiObject.workingDataObject.sticky = false
	newCourseApiObject.workingDataObject.field_coursedateend = courseEndDate
	newCourseApiObject.workingDataObject.field_coursedatestart = courseStartDate
	newCourseApiObject.workingDataObject.field_coursekey = "z_BELOW_z"
	newCourseApiObject.workingDataObject.field_coursename = newCourseDataObject.name
	newCourseApiObject.workingDataObject.field_coursenameabbrv = newCourseDataObject.abbrvName
	newCourseApiObject.workingDataObject.field_coursenameabbrv = newCourseDataObject.abbrvName
	newCourseApiObject.workingDataObject.field_courseoptions = $w('#halfDayCBXGRP').value.toString()
	newCourseApiObject.workingDataObject.field_coursetimeduration = $w('#durationTMPKR').value
	newCourseApiObject.workingDataObject.field_coursetimeduration = $w('#durationTMPKR').value
	newCourseApiObject.workingDataObject.field_coursetimestart = $w('#startTimeTMPKR').value
	newCourseApiObject.workingDataObject.field_curriculumid = Number(newCourseDataObject.curriculumId)
	newCourseApiObject.workingDataObject.field_curriculumkey = newCourseDataObject.textKey
	newCourseApiObject.workingDataObject.field_daysofweek = daysofweek
	// newCourseApiObject.workingDataObject.field_enrollexcptn = "NNULL"
	newCourseApiObject.workingDataObject.field_gradelevelkey = gradeLevelKey
	newCourseApiObject.workingDataObject.field_jcal = "NNULL"
	newCourseApiObject.workingDataObject.field_locationkey = $w('#regionLocationKeyINPUT').value
	newCourseApiObject.workingDataObject.field_locationname = $w('#regionLocationINPUT').value
	newCourseApiObject.workingDataObject.field_sectionarray = "z_BELOW_z"
	newCourseApiObject.workingDataObject.field_sectioncount = 1
	newCourseApiObject.workingDataObject.field_termid = newCourseDataObject.termId
	newCourseApiObject.workingDataObject.field_weekid = getWeekId($w('#startDateDTPKR').value)
    
	// let requiredAttributesArray = ['curriculumKey', 'termId', 'weekId', 'gradeLevelKey', 'locationKey', 'sectionId']
	let courseObjectHOLDER = {}
	courseObjectHOLDER.curriculumKey = newCourseApiObject.workingDataObject.field_curriculumkey
	courseObjectHOLDER.termId = newCourseApiObject.workingDataObject.field_termid
	courseObjectHOLDER.weekId = newCourseApiObject.workingDataObject.field_weekid
	courseObjectHOLDER.gradeLevelKey = newCourseApiObject.workingDataObject.field_gradelevelkey
	courseObjectHOLDER.locationKey = newCourseApiObject.workingDataObject.field_locationkey
	courseObjectHOLDER.sectionId = newCourseApiObject.workingDataObject.field_sectioncount
	courseKeyHuman(courseObjectHOLDER)
	newCourseApiObject.workingDataObject.field_coursekey = courseObjectHOLDER.courseKey
	newCourseApiObject.workingDataObject.field_sectionarray = courseObjectHOLDER.sectionKey
    // ! CONSIDER HERE: {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
    
	// $w('#developerTaskTXTBX').value =  JSON.stringify(newCourseApiObject)
    
	newCourseApiObject.paramObject.requestBody = utilityDirectParseDataIntoTemplate(JSON.stringify(newCourseApiObject.docDbJSON.template),newCourseApiObject.workingDataObject)
    
	// session.setItem('lastResponseObject', JSON.stringify(newCourseApiObject))/*BIGBLEED*//*LINE_663*/
	memory.setItem('memoryResponseObject', JSON.stringify(newCourseApiObject))/*BIGBLEED*//*LINE_663*/
	// ø CREATE_NEW_COURSE_02_collectAndCalculateData_DEP
	// ø NEXT CREATE_NEW_COURSE_03_composeAndDisplayPreview
	composeAndDisplayPreview(newCourseApiObject.workingDataObject)
}
// ø <---------- </collectAndCalculateData_DEP(courseStartDate, courseEndDate)> ---------->

// ø <---------- <Compose & Display Preview>  ---------->
export function composeAndDisplayPreview(workingDataObject){
	// ø CREATE_NEW_COURSE_03_composeAndDisplayPreview
	console.group(`composeAndDisplayPreview(newCourseDataObject)`)
	// console.groupCollapsed(`composeAndDisplayPreview(newCourseDataObject)`)
	
	$w('#formPreviewCNTBX').show()

	$w('#newCourseDataObjectPreview').text = 'PASSTHRU: composeAndDisplayPreview(newCourseDataObject)'
	$w('#newCourseDataObjectPreview').text += '\nWill Use Console-Log to proceed, leave this task for last'
	
	$w('#previewCourseBTN').hide()
	$w('#postCourseBTN').show()

	console.log(`groupEnd: composeAndDisplayPreview(newCourseDataObject)`)
	console.groupEnd()
	console.group(`Automated Code from api_OOP`)

	// <COMPOSE_PREVIEW_TEXT>
	delete workingDataObject.type
	console.log(`before Preview Composition Code: workingDataObject: [object below`)
	console.dir(workingDataObject)

	let lineBeginText = ''
	let paddedAttribute = 'PENDING'
	let paddingSide = 'LEFT'
	paddingSide = paddingSide === 'LEFT' ? paddingSide : 'RIGHT'
	let keyValueSeparatorText = ': '
	let maxLength = 0
	let attributeArrayMaxLength = Object.keys(workingDataObject)
	let attributeKeyString = 'PENDING'//Separate attributes from Key-Strings so that you can get fancy later
	let attributeArrayKeyString = []//Separate attributes from Key-Strings so that you can get fancy later
	for (let indexMaxLength = 0; indexMaxLength < attributeArrayMaxLength.length; indexMaxLength++){
		attributeKeyString = '>' + attributeArrayMaxLength[indexMaxLength] + '<' // Ugly, but fancy...
		attributeArrayKeyString.push(attributeKeyString)
		//const attributeMaxLength = attributeArrayMaxLength[indexMaxLength]
		maxLength = maxLength > attributeKeyString.length ? maxLength : attributeKeyString.length
	}
	console.log(`attributeArrayKeyString: RAW:`)
	console.dir(attributeArrayKeyString)
	// ø CREATE_NEW_COURSE_03a_transformBlock
	let transformObject = {}
	// let transformObject = {"title":{"key":"title","label":"Course Name Display","reorderEdited":100,"reorderIndex":0},"field_coursedateend":{"key":"field_coursedateend","label":"Course Date End","reorderEdited":301,"reorderIndex":8},"field_coursedatestart":{"key":"field_coursedatestart","label":"Course Date Start","reorderEdited":300,"reorderIndex":7},"field_coursekey":{"key":"field_coursekey","label":"Course Key","reorderEdited":104,"reorderIndex":4},"field_coursename":{"key":"field_coursename","label":"Course Name","reorderEdited":101,"reorderIndex":1},"field_coursenameabbrv":{"key":"field_coursenameabbrv","label":"Course Name Abbrv","reorderEdited":102,"reorderIndex":2},"field_coursetimeduration":{"key":"field_coursetimeduration","label":"Course Time Duration","reorderEdited":303,"reorderIndex":10},"field_coursetimestart":{"key":"field_coursetimestart","label":"Course Time Start","reorderEdited":302,"reorderIndex":9},"field_curriculumid":{"key":"field_curriculumid","label":"Curriculum ID","reorderEdited":1001,"reorderIndex":16},"field_curriculumkey":{"key":"field_curriculumkey","label":"Curriculum Key","reorderEdited":103,"reorderIndex":3},"field_daysofweek":{"key":"field_daysofweek","label":"Days of Week","reorderEdited":304,"reorderIndex":11},"field_enrollexcptn":{"key":"field_enrollexcptn","label":"Enroll Excptn","reorderEdited":2299,"reorderIndex":19},"field_gradelevelkey":{"key":"field_gradelevelkey","label":"Grade Level Key","reorderEdited":400,"reorderIndex":13},"field_jcal":{"key":"field_jcal","label":"jCal","reorderEdited":305,"reorderIndex":12},"field_locationkey":{"key":"field_locationkey","label":"Location Key","reorderEdited":501,"reorderIndex":15},"field_locationname":{"key":"field_locationname","label":"Location Name","reorderEdited":500,"reorderIndex":14},"field_sectionarray":{"key":"field_sectionarray","label":"Section Key","reorderEdited":105,"reorderIndex":5},"field_sectioncount":{"key":"field_sectioncount","label":"Section Count","reorderEdited":106,"reorderIndex":6},"field_termid":{"key":"field_termid","label":"Term ID","reorderEdited":1900,"reorderIndex":17},"field_weekid":{"key":"field_weekid","label":"Week ID","reorderEdited":2000,"reorderIndex":18}}
	// attributeArrayKeyString = ["Course Name Display","Promote","Sticky","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","Location Key","Location Name","Section","Section Count","Term ID","Week ID"]
	// attributeArrayKeyString = ["Course Name Display","Promote","Sticky","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","jCal Expression","Location Key","Location Name","Section","Section Count","Term ID","Week ID"]
	// • ¯\_(ツ)_/¯   ¯\__ (keep jCAL field as 'NNULL' - expect it to be more important) __/¯
	// attributeArrayKeyString = ["Course Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Enroll Excptn","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-12T17:17:00 update to add Start Time and Time Duration, using new mechanism (AGAIN!)       ) __/¯
	// attributeArrayKeyString = ["Course Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Enroll Excptn","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-12T18:21:00 update to add Start Time and Time Duration, using new mechanism (AGAIN!)       ) __/¯
	// attributeArrayKeyString = ["Course Name DisplayZ","Course Date EndZ","Course Date StartZ","Course KeyZ","Course NameZ","Course Name AbbrvZ","Course Time DurationZ","Course Time StartZ","Curriculum IDZ","Curriculum KeyZ","Days of WeekZ","fGrade Level KeyZ","jCalZ","Location KeyZ","Location NameZ","SectionZ","Section CountZ","Term IDZ","Week IDZ"]
	// ø ¯\__ (      2021-12-13T06:21:00 Full-Boat Documented       ) __/¯
	// attributeArrayKeyString = ["ZCourse Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-13T08:28:00 Full-Boat Documented       ) __/¯
	attributeArrayKeyString = ["Course Name Display","Course Date End","Course Date Start","Course Key","Course Name","Course Name Abbrv","Half Day Options","Course Time Duration","Course Time Start","Curriculum ID","Curriculum Key","Days of Week","Grade Level Key","jCal","Location Key","Location Name","Section Key","Section Count","Term ID","Week ID"]
	// ø ¯\__ (      2021-12-13T14:13:00 Full-Boat Documented       ) __/¯
	let attributeArrayReOrderArray = []
	// let attributeArrayReOrderArray = [0,6,7,14,13,11,4,3,10,12,16,18,17,8,9,5,15,1,2]
	// let attributeArrayReOrderArray = [0,7,8,4,1,2,10,9,16,3,11,19,13,12,15,14,5,6,17,18]
	// ø ¯\__ (      2021-12-12T17:17:00 update to add Start Time and Time Duration, using new mechanism (AGAIN!)       ) __/¯
	// let attributeArrayReOrderArray = [0,8,7,4,1,2,10,9,16,3,11,19,13,12,15,14,5,6,17,18]
	// attributeArrayReOrderArray = [2,11,10,6,3,4,13,12,9,5,14,16,15,18,17,7,8,0,1]
	// ø ¯\__ (      2021-12-13T06:21:00 Full-Boat Documented       ) __/¯
	// attributeArrayReOrderArray = [0,11,10,4,1,2,13,12,16,3,14,7,15,9,8,5,6,17,18]
	// ø ¯\__ (      2021-12-13T08:28:00 Full-Boat Documented       ) __/¯
	attributeArrayReOrderArray = [0,8,7,4,1,2,11,10,9,17,3,12,14,13,16,15,5,6,18,19]
	// ø ¯\__ (      2021-12-13T14:13:00 Full-Boat Documented       ) __/¯
	let reOrderIndex = 0
	// • ¯\_(ツ)_/¯   ¯\__ (keep jCAL field as 'NNULL' - expect it to be more important) __/¯
	// ø <Transform Literals>
	// ø ø <Transform Workings>
	console.log(`<Transform Workings>`)
	// let workingDaysOfWeek = workingDataObject.field_daysofweek.toString() + 'ZZZ'
	let workingDaysOfWeek = jsDaysOfWeekArrayToString(workingDataObject.field_daysofweek)
	console.log(`</Transform Workings>`)
	// ø ø </Transform Workings>
	let transformLiteralsObject = {}
	transformLiteralsObject.field_jcal = 'jCal formatted schedule is pending'
	transformLiteralsObject.field_daysofweek = workingDaysOfWeek
	transformLiteralsObject.field_coursedatestart = format(new Date(workingDataObject.field_coursedatestart), 'EEE MMMMMM d, yyyy')
	transformLiteralsObject.field_coursedateend = format(new Date(workingDataObject.field_coursedateend), 'EEE MMMMMM d, yyyy')
	
	// ø </Transform Literals>
	// console.log(`attributeArrayKeyString: DISPLAY:`)
	// console.dir(attributeArrayKeyString)
	// • COURSES: ["title","promote","sticky","field_coursedateend","field_coursedatestart","field_coursekey","field_coursename","field_coursenameabbrv","field_curriculumid","field_curriculumkey","field_daysofweek","field_gradelevelkey","field_jcal","field_locationkey","field_locationname","field_sectionarray","field_sectioncount","field_termid","field_weekid"]
	maxLength = paddingSide === 'LEFT' ? maxLength * -1 : maxLength
	let valueString = 'STRING'
	let padding = '                                                  '
	let previewText = ''
	//let attributeKeyString = 'PENDING'
	let attributeArray = Object.keys(workingDataObject)
	console.log(`≈673≈ attributeArray: [array below]`)
	console.dir(attributeArray)
	let develReorderAttributeArray = []
	let noDisplayAttributeArray = ['promote','sticky']
	let develReorderIndex = 777
	let develReorderIndexArray = []
	for (let index = 0; index < attributeArray.length; index++){
		reOrderIndex = index
		// develReorderIndex = 777
		if(typeof attributeArrayReOrderArray.indexOf(index) === 'number'){
			develReorderIndex = attributeArrayReOrderArray.indexOf(index)
			reOrderIndex = attributeArrayReOrderArray.indexOf(index)
		}
		develReorderIndexArray.push(develReorderIndex)
		// if(typeof transformObject[attribute]['reorderIndex'] === 'number'){
		// 	reOrderIndex = transformObject[attribute]['reorderIndex']
		// }
		const attribute = attributeArray[reOrderIndex]
		// if(typeof attributeArrayReOrderArray[index] === 'number'){
		// 	reOrderIndex = attributeArrayReOrderArray[index]
		// }
		attributeKeyString = attribute
		if (typeof attributeArrayKeyString[reOrderIndex] === 'string') {
			attributeKeyString = attributeArrayKeyString[reOrderIndex]
		}
		// if(typeof transformObject[attribute]['label'] === 'string'){
		// 	attributeKeyString = transformObject[attribute]['label']
		// }
		// if(typeof attributeArrayKeyString[reOrderIndex] === 'string'){
		// 	attributeKeyString = attributeArrayKeyString[reOrderIndex]
		// }
		develReorderAttributeArray.push(attribute)
		if(typeof workingDataObject[attribute] === 'undefined'){
			workingDataObject[attribute] = `${attribute} UNDEFINED`
		}
		valueString = typeof transformLiteralsObject[attribute] === 'string' ? transformLiteralsObject[attribute] : workingDataObject[attribute].toString()
		if(!noDisplayAttributeArray.includes(attribute)){
			paddedAttribute = paddingSide === 'LEFT' ? (padding + attributeKeyString).substr(maxLength) : (attributeKeyString + padding).substr(0,maxLength)
			previewText += '\n ' + lineBeginText + ' ' + paddedAttribute + keyValueSeparatorText  
			previewText += valueString
		}
	}
	// </COMPOSE_PREVIEW_TEXT>
	console.log(`after 'COMPOSE_PREVIEW_TEXT': develReorderIndexArray: [${develReorderIndexArray.toString()}]`)
	console.log(`after 'COMPOSE_PREVIEW_TEXT': develReorderAttributeArray: [${develReorderAttributeArray.toString()}]`)
	console.warn(previewText)
	// $w('#newCourseDataObjectPreview').text = previewText
	console.groupEnd()


	// ø TERMINUS CREATE_NEW_COURSE_03_composeAndDisplayPreview
	// ø NEXT-BTN_click => CREATE_NEW_COURSE_04_Click_PostBTN
}
// ø <---------- </Compose & Display Preview> ---------->

//==================================================     </Preview Button: Compose & Display>
//==========================================================================================

//==========================================================================================
//==================================================      <Post Course & API POST to Drupal>

// ø <---------- <Post Course to Drupal>  ---------->
export async function newCourseDrupalPOST(newCourseDrupalObject = {}){
    // ø CREATE_NEW_COURSE_05_newCourseDrupalPOST
	console.group(`newCourseDrupalPOST(newCourseDrupalObject)`)
	// console.groupCollapsed(`newCourseDrupalPOST(newCourseDrupalObject)`)
	console.log(`newCourseDrupalObject: prototype only: [object below]`)
	console.dir(newCourseDrupalObject)

	let kludgeOptionsReturn = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
	// $w('#kludgeBooleanRADIO').value = 'false'
	if (kludgeOptionsReturn) {
        let kludgeExpires = new Date(2021,12,5)
        let now = new Date()
        if(now > kludgeExpires){
            kludgeOptionsReturn = false
        }
    }


	// let newCourseApiObject = JSON.parse(session.getItem('lastResponseObject'))/*BIGBLEED*//*LINE_789*/
	let newCourseApiObject = JSON.parse(memory.getItem('memoryResponseObject'))/*BIGBLEED*//*LINE_789*/
	if (kludgeOptionsReturn) {
		// newCourseApiObject.paramObject.requestBody = newCourseApiObject.paramObject.requestBody.replace('courses','course')
	}

	let responseObject = await postDrupalNode(newCourseApiObject.paramObject.requestBody, kludgeOptionsReturn)
	let responseString = 'PPENDING'
	let responseBoolean = null
	console.log(`newCourseDrupalPOST: postDrupalNode: responseObject: [object below]`)
	console.dir(responseObject)
	$w('#developerResponseTXTBX').value = JSON.stringify(responseObject, undefined, 4)
	// $w('#developerResponseTXTBX').value = responseObject
	if(typeof responseObject.nid === 'undefined'){
		responseBoolean = false
		responseString = 'ERROR: Course Not Posted [1]'// get fancier later if you capture the promise-error
	}else if(responseObject.nid[0].value > 3500){
		responseBoolean = true
		responseString = `SUCEESS: Course Posted [${responseObject.nid[0].value}]`// get fancier later if you capture the promise-error
	}else{
		responseBoolean = false
		responseString = 'ERROR: Course Not Posted [2]'// get fancier later if you capture the promise-error
	}

	console.log(`responseString: `)
	console.log(responseString)
	$w('#previewErrorStringTXT').expand()
	$w('#previewErrorStringTXT').text = responseString
		
	// $w('#previewErrorStringTXT').text = `Holder for Errors`
	// $w('#previewErrorStringTXT').collapse()
	$w('#newCourseDataObjectPreview').text = `use $w('#coursePreviewTXT').html`
	$w('#previewCourseBTN').hide()
	$w('#formPreviewCNTBX').hide()
	$w('#postCourseBTN').hide()
	$w('#selectedNewCourseBTN').disable()



	// ø TERMINUS CREATE_NEW_COURSE_05_newCourseDrupalPOST
	// ø ANOTHER COURSE: NEXT-BTN_click => CREATE_NEW_COURSE_±3_Click_clearCourseForm

	// console.log(`only console.log() for now...`)
	console.log(`groupEnd: newCourseDrupalPOST(newCourseDrupalObject)`)
	console.groupEnd()

}
// ø <---------- </Post Course to Drupal> ---------->

// ø <---------- <Reset WiX Page for Next Course>  ---------->
// ø <---------- </Reset WiX Page for Next Course> ---------->

//==================================================     </Post Course & API POST to Drupal>
//==========================================================================================


//====================================================================================================
//============================================================                 </Overall Build Course>
//====================================================================================================
 
//==========================================================================================
//==================================================            <Utility and Button Scripts>
 function toggleTopSection(){
	 console.log(`$w('#topPanelSCTN').isVisible: ${$w('#topPanelSCTN').isVisible}`)
	 if($w('#topPanelSCTN').isVisible){
		$w('#topPanelSCTN').collapse()
	 }else{
		$w('#topPanelSCTN').expand()
	 }
 }
//==================================================           </Utility and Button Scripts>
//==========================================================================================
 
//==========================================================================================
//==================================================                  <KLUDGE Buttons Steps>
// KLUDGE BUTTON AS STEPS:
/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function develTestingBTN_click(event) {
	develTestingCALL() 
}
async function develTestingCALL(){
	if($w('#develTestingRADIOGRP').value === 'CURRENT'){
		await onReadyCurriculaJSON()
	}
	if($w('#develTestingRADIOGRP').value === 'ONDECK'){
		konstantSelectedCurriculaRepeaterOnReady_DEP()
	}
}
export async function doKLUDGE(){
	const wIdKldgeDoxTXTBX = '#developerTaskTXTBX'
	const wIdKldgeResponseTXTBX = '#developerResponseTXTBX'
	let KLUDGE = ''
	let step = KLUDGE
	let iso = '2021-11-26T08:44:00'
	let descrArray = []
	{
		// // let nidArray = [3473]
		// let nidArray = [3495,3496,3497,3498]
		// let nidThis = nidArray[Math.floor(Math.random() * nidArray.length)]
		// // // let nidThis = nidArray[nidArray.length - 1]
		// // let nidThis = nidArray[0]
		// console.log(`nidThis: ${nidThis}`)
		// {
		// 	// KLUDGE = 'drupalNodeGET(nidThis)'
		// 	KLUDGE = 'getDrupalNode(nidThis)'
		// 	step = KLUDGE
		// 	iso = '2021-11-30T16:53:00'
		// 	descrArray = []
		// 	KLUDGE = `getDrupalNode(${nidThis})`
		// 	descrArray.push(KLUDGE)
		// 	KLUDGE = `import {getDrupalNode} from 'backend/apiDrupalModule.jsw'`
		// 	descrArray.push(KLUDGE)
		// 	KLUDGE = `[below always last]`
		// 	KLUDGE = iso
		// 	descrArray.push(KLUDGE)
		// }

		// // drupalNodeGET(nidThis)
		// // export async function getDrupalNode(nid) 
		// let responseObject = await getDrupalNode(nidThis)
		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(responseObject, undefined, 4)
	}
	{
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('R')
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('Juliet')
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('F')
		// let natoPhoneticObject = getNatoPhoneticArrayObjectItem('Oscar')
		let natoPhoneticObject = getNatoPhoneticArrayObjectItem('Ozark')
		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(natoPhoneticObject, undefined, 4)
		
		{
			KLUDGE = 'postDrupalNode(requestBodyThis)'
			step = KLUDGE
			iso = '2021-11-30T18:11:00'
			descrArray = []
			KLUDGE = 'drupalNodePOST(requestBodyThis)'
			descrArray.push(KLUDGE)
			KLUDGE = `import {postDrupalNode} from 'backend/apiDrupalModule.jsw'`
			descrArray.push(KLUDGE)
			KLUDGE = 'title: ' + natoPhoneticObject.word
			descrArray.push(KLUDGE)
			KLUDGE = 'body: ' + natoPhoneticObject.sentence
			descrArray.push(KLUDGE)
			KLUDGE = 'kludgeObject: for testing'
			descrArray.push(KLUDGE)
		// 	KLUDGE = `[below always last]`
			KLUDGE = iso
			descrArray.push(KLUDGE)
			KLUDGE = step + ':'
			descrArray.forEach(descrThis => {
				KLUDGE += '\n  - ' + descrThis
			});
			$w(wIdKldgeDoxTXTBX).value = KLUDGE
		}
		let requestBodyThis = "{\n  \"type\":[{\"target_id\":\"page\"}],\n  \"title\":[{\"value\":\"{%title%}\"}],\n  \"body\":[{\"value\":\"{%body%}\"}]\n}"
		requestBodyThis = requestBodyThis.replace('{%title%}',natoPhoneticObject.word)
		requestBodyThis = requestBodyThis.replace('{%body%}',natoPhoneticObject.sentence)
		// console.log(`requestBodyThis: `)
		let kludgeOptionsReturn = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
		// $w('#kludgeBooleanRADIO').value = 'false'
		// console.log(requestBodyThis)
		// iso = requestBodyThis
		// drupalNodePOST(requestBodyThis)
		// let responseObject = await postDrupalNode(requestBodyThis)
		// let responseObject = await postDrupalNode(requestBodyThis, true)
		let responseObject = await postDrupalNode(requestBodyThis, kludgeOptionsReturn)
		$w(wIdKldgeResponseTXTBX).value = JSON.stringify(responseObject, undefined, 4)
		
	}

}
 

//==================================================                 </KLUDGE Buttons Steps>
//==========================================================================================



//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================

export function btnblkToggle4BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle2BTN_click(event)')
}

export function btnblkDo4BTN_click(event) {
	btnblkDoBTN_click('btnblkDo2BTN_click(event)') 
}

export function selectedNewCourseBTN_click(event) {
	// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
	let scriptName = 'selectedNewCourseBTN_click'
	let clickedItemData = processSelectCurriculum(event,scriptName)
	// ø NEXT CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
	instantiateNewCourseObject(clickedItemData)
}

export function btnKLUDGEdeveloperTask_click(event) {
	doKLUDGE()
}

export function selectLocationBTN_click(event) {
	if($w('#regionLocationKeyINPUT').value.length > 0){
		$w('#regionLocationKeyINPUT').value = ''
		$w('#regionLocationINPUT').value = ''
		$w('#selectLocationBTN').label = 'Select Location'
		return
	}
	// $w('#selectLocationBTN').label = 'Toggle to All Locations'
	// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
	if($w('#formLocationRPTR').collapsed === false){
		$w('#formLocationRPTR').collapse()
		return
	}
	let KLUDGE_newCourseDataObject = {}
	$w('#formLocationRPTR').expand()
	appendLocationsJsonDocDb(KLUDGE_newCourseDataObject)
}

export function formSelectLocationBTN_click(event) {
	let clickedItemData = processSelectCurriculum(event,'formSelectLocationBTN_click')
	console.log(`clickedItemData: [object below]`)
	console.dir(clickedItemData)
	$w('#regionLocationINPUT').value = clickedItemData.nameFull
	$w('#regionLocationKeyINPUT').value = clickedItemData.key
	$w('#formLocationRPTR').collapse()
	$w('#selectLocationBTN').label = 'Toggle to All Locations'
}

export function rawPreviewKLUDGE_PreTrash(){
	let newCourseDataObject = {"topping":[{"id":"5001","type":"None"},{"id":"5002","type":"Glazed"},{"id":"5005","type":"Sugar"},{"id":"5007","type":"Powdered Sugar"},{"id":"5006","type":"Chocolate with Sprinkles"},{"id":"5003","type":"Chocolate"},{"id":"5004","type":"Maple"}]}
	console.log(`newCourseDataObject: [object below] [maybe]]`)
	console.dir(newCourseDataObject)
	$w('#formPreviewCNTBX').show()
	$w('#coursePreviewTXT').text = JSON.stringify(newCourseDataObject, undefined, 4)
	
}

export function previewCourseBTN_click(event) {
	// ø FILTER_COURSES_00_previewCourseBTN_click
	// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
	// ø NEXT CREATE_NEW_COURSE_01_ValidateFilterForm
	validateFilterForm()
}
export async function postCourseBTN_click(event) {
	// ø CREATE_NEW_COURSE_04_Click_PostBTN
    // ø NEXT CREATE_NEW_COURSE_05_newCourseDrupalPOST
	$w('#postCourseBTN').hide()
	await newCourseDrupalPOST()
}

export function clearCourseFormBTN_click(event) {
	$w('#postCourseBTN').hide()
	// ø CREATE_NEW_COURSE_±3_Click_clearCourseForm
	// ø NEXT CREATE_NEW_COURSE_±2_resetCourseForm
	resetCourseFiltersAll()
}

export function getItemLastResponseObjectBTN_click(event) {
	// $w('#developerResponseTXTBX').value = session.getItem('lastResponseObject')/*BIGBLEED*//*LINE_1015*/
	$w('#developerResponseTXTBX').value = memory.getItem('memoryResponseObject')/*BIGBLEED*//*LINE_1015*/
}

export function kludgeDevelBTN_click(event) {
	$w("#BannerStateBox").changeState("Four");
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function adminDispatchBTN_click(event) {
	// ø doKludge JUST FOR adminDispatch iterations...
	const wIdKldgeDoxTXTBX = '#developerTaskTXTBX'
	const wIdKldgeResponseTXTBX = '#developerResponseTXTBX'
	let KLUDGE = ''
	let step = KLUDGE
	let iso = '2008-01-20T12:00:00'
	iso = '2021-12-07T09:37:00'
	iso = '2021-12-07T10:53:00'
	iso = '2021-12-07T11:22:00'
	let descrArray = []
	let responseObject = {}
	let responseString = 'STRING'
		if(iso === '2021-12-07T09:37:00'){
			{
				KLUDGE = 'adminDispatch()'
				step = KLUDGE
				iso = '2021-12-07T09:37:00'
				descrArray = []
				KLUDGE = 'only defuaul parameter'
				descrArray.push(KLUDGE)
				KLUDGE = `import {adminDispatch} from 'public/adminDispatch.js'`
				descrArray.push(KLUDGE)
				KLUDGE = `paramObject.call: 'undefined''`
				descrArray.push(KLUDGE)
			// 	KLUDGE = `[below always last]`
				KLUDGE = iso
				descrArray.push(KLUDGE)
				KLUDGE = step + ':'
				descrArray.forEach(descrThis => {
					KLUDGE += '\n  - ' + descrThis
				});
				$w(wIdKldgeDoxTXTBX).value = KLUDGE
			}
			responseObject = adminDispatch()
			responseString = JSON.stringify(responseObject, undefined, 4)
		}
		if(iso === '2021-12-07T10:53:00'){
			{
				KLUDGE = 'adminDispatch(paramObject)'
				step = KLUDGE
				iso = '2021-12-07T10:53:00'
				descrArray = []
				KLUDGE = 'paramObject = {}'
				descrArray.push(KLUDGE)
				KLUDGE = `import {adminDispatch} from 'public/adminDispatch.js'`
				descrArray.push(KLUDGE)
				KLUDGE = `paramObject.call: 'undefined''`
				descrArray.push(KLUDGE)
			// 	KLUDGE = `[below always last]`
				KLUDGE = iso
				descrArray.push(KLUDGE)
				KLUDGE = step + ':'
				descrArray.forEach(descrThis => {
					KLUDGE += '\n  - ' + descrThis
				});
				$w(wIdKldgeDoxTXTBX).value = KLUDGE
			}
			let paramObject = {}
			responseObject = adminDispatch(paramObject)
			responseString = JSON.stringify(responseObject, undefined, 4)
		}
		if(iso === '2021-12-07T11:22:00'){
			let paramObject = {}
			paramObject.call = 'curriculumUpdatePeding'
			paramObject.liveDrupalCurriculaISO = '2021-12-07T11:22:00'
			paramObject.termCurriculaISO = '2021-12-07T11:22:00'
			paramObject.wixSourcedJSONCurriculaISO = '2021-12-07T11:22:00'
			{
				KLUDGE = 'adminDispatch(paramObject)'
				step = KLUDGE
				iso = '2021-12-07T11:22:00'
				descrArray = []
				KLUDGE = 'paramObject: call: ${call}'
				descrArray.push(KLUDGE)
				KLUDGE = 'paramObject: liveDrupalCurriculaISO: ${liveDrupalCurriculaISO}'
				descrArray.push(KLUDGE)
				KLUDGE = 'paramObject: termCurriculaISO: ${termCurriculaISO}'
				descrArray.push(KLUDGE)
				KLUDGE = 'paramObject: wixSourcedJSONCurriculaISO: ${wixSourcedJSONCurriculaISO}'
				descrArray.push(KLUDGE)
				KLUDGE = `import {adminDispatch} from 'public/adminDispatch.js'`
				descrArray.push(KLUDGE)
				KLUDGE = `paramObject.call: 'undefined''`
				descrArray.push(KLUDGE)
			// 	KLUDGE = `[below always last]`
				KLUDGE = iso
				descrArray.push(KLUDGE)
				KLUDGE = step + ':'
				descrArray.forEach(descrThis => {
					KLUDGE += '\n  - ' + descrThis
				});
				$w(wIdKldgeDoxTXTBX).value = KLUDGE
			}
			responseObject = adminDispatch(paramObject)
			responseString = JSON.stringify(responseObject, undefined, 4)
		}
		$w(wIdKldgeResponseTXTBX).value = responseString
		
}

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event let 
*/
export function summerTmBlksRDBTNS_change(event) {
	onChangeStartTimeDurationRadioSettings('summerTmBlksRDBTNS_change')
}

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event
*/
export function startTimeTMPKR_change(event) {
	onChangeStartTimeDurationRadioSettings('startTimeTMPKR_change')
}

/**
*	Adds an event handler that runs when an input element's value
 is changed.
	[Read more](https://www.wix.com/corvid/reference/$w.ValueMixin.html#onChange)
*	 @param {$w.Event} event
*/
export function durationTMPKR_change(event) {
	onChangeStartTimeDurationRadioSettings('durationTMPKR_change')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function develBTN_click(event) {
	console.log(`export function develBTN_click(event)`)
	toggleTopSection()
}

export function curriculaSelectedPGNTN_click(event) {
	evaluationPaginationAndLoadRepeater()
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkToggle3BTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
	btnblkToggleBTN_click('btnblkToggle3BTN_click(event)')
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function btnblkDo3BTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
	btnblkDoBTN_click('btnblkDo3BTN_click(event)') 
}