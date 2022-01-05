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
// ø QUICK_LIST_COURSE_EDIT
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


$w.onReady(function () {
	setUpOnReady()
	konstantTermCoursesOnReady()
	wixStorageDisplayOnReady()	
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
	// let allCoursesWorkingObject = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223"},{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224"},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseName":"Creative Creatures","courseNameAbbrv":"CreativeCreatures","curriculumKey":"CREATURES","courseKey":"CREATURESv2324bCHOa","sectionArray":["CREATURESv2324bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3356","termId":"202223","weekId":"202224"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseName":"Gadgets and Gizmos","courseNameAbbrv":"Gadgets","curriculumKey":"GADGETS","courseKey":"GADGETSv2324bCHOb","sectionArray":["GADGETSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"25","termId":"202223","weekId":"202224"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseName":"Intro to STEAM","courseNameAbbrv":"Int Ste","curriculumKey":"INTROSTEAM","courseKey":"INTROSTEAMv2324bCHOb","sectionArray":["INTROSTEAMv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"39","termId":"202223","weekId":"202224"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2324fhCHOb","sectionArray":["MADSCICHEMv2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202224"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2324ceCHOb","sectionArray":["ROBOTCODEv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202224"},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225"},{"_id":"3575","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2325ceCHOb","sectionArray":["CERAMICSv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202225"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2325ceCHOb","sectionArray":["DRONEACv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202225"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325bCHOa","sectionArray":["GIRLLEADELv2325bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325ceCHOa","sectionArray":["GIRLLEADELv2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseName":"Girls Leadership MS","courseNameAbbrv":"GirlsLeadershipMS","curriculumKey":"GIRLLEADMS","courseKey":"GIRLLEADMSv2325fhCHOa","sectionArray":["GIRLLEADMSv2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3360","termId":"202223","weekId":"202225"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2325bCHOb","sectionArray":["MADSCICHEMv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202225"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseName":"Pirate Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"PIRATESCI","courseKey":"PIRATESCIv2325bCHOb","sectionArray":["PIRATESCIv2325bCHOb1"],"sectionCount":"2","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3511","termId":"202223","weekId":"202225"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseName":"STEAM Survivor","courseNameAbbrv":"z_STRING_z","curriculumKey":"Survivor","courseKey":"Survivorv2325ceCHOb","sectionArray":["Survivorv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3501","termId":"202223","weekId":"202225"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225"},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226"},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2326ceCHOb","sectionArray":["MADSCICHEMv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202226"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseName":"Maker Laboratory","courseNameAbbrv":"Maker Sum","curriculumKey":"MAKERLAB","courseKey":"MAKERLABv2326ceCHOa","sectionArray":["MAKERLABv2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1296","termId":"202223","weekId":"202226"},{"_id":"3590","courseNameDisplay":"Art Lab","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABv2328bCHOb","sectionArray":["ARTLABv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202223","weekId":"202228"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseName":"Construction Kids","courseNameAbbrv":"ConstructKids","curriculumKey":"CONKIDS","courseKey":"CONKIDSv2328bCHOa","sectionArray":["CONKIDSv2328bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1283","termId":"202223","weekId":"202228"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2328fhCHOb","sectionArray":["DRONEACv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202228"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2328fhCHOb","sectionArray":["FORENSICSv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202228"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseName":"Journey to Atlantis","courseNameAbbrv":"z_STRING_z","curriculumKey":"ATLANTIS","courseKey":"ATLANTISv2328bCHOb","sectionArray":["ATLANTISv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3515","termId":"202223","weekId":"202228"},{"_id":"3591","courseNameDisplay":"Photography 101","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2328ceCHOb","sectionArray":["PHOTOv2328ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202228"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2329fhCHOb","sectionArray":["BIOMECHv2329fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202229"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseName":"Digging Dinos","courseNameAbbrv":"z_STRING_z","curriculumKey":"Dinosaurs","courseKey":"Dinosaursv2329bCHOb","sectionArray":["Dinosaursv2329bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3516","termId":"202223","weekId":"202229"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2329ceCHOb","sectionArray":["FORENSICSv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202229"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329bCHOa","sectionArray":["LEADSTEAMv2329bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329beCHOa","sectionArray":["LEADSTEAMv2329beCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL25","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329fhCHOa","sectionArray":["LEADSTEAMv2329fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseName":"Paint and Mixed Media","courseNameAbbrv":"Paint","curriculumKey":"PAINTMEDIA","courseKey":"PAINTMEDIAv2329ceCHOb","sectionArray":["PAINTMEDIAv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"29","termId":"202223","weekId":"202229"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2329dhCHOb","sectionArray":["PHOTOv2329dhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL48","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202229"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2329ceCHOb","sectionArray":["ROBOTCODEv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202229"}]
	let allCoursesWorkingObject = [{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","courseTilePath":"https://static.wixstatic.com/media/523205_9249dded66d24a1cb1add3acf6b7e5e4~mv2.jpeg"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","courseTilePath":"FFALSE"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","courseTilePath":"FFALSE"},{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseName":"Creative Creatures","courseNameAbbrv":"CreativeCreatures","curriculumKey":"CREATURES","courseKey":"CREATURESv2324bCHOa","sectionArray":["CREATURESv2324bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3356","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseName":"Gadgets and Gizmos","courseNameAbbrv":"Gadgets","curriculumKey":"GADGETS","courseKey":"GADGETSv2324bCHOb","sectionArray":["GADGETSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"25","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseName":"Intro to STEAM","courseNameAbbrv":"Int Ste","curriculumKey":"INTROSTEAM","courseKey":"INTROSTEAMv2324bCHOb","sectionArray":["INTROSTEAMv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"39","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2324fhCHOb","sectionArray":["MADSCICHEMv2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2324ceCHOb","sectionArray":["ROBOTCODEv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3575","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2325ceCHOb","sectionArray":["CERAMICSv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2325ceCHOb","sectionArray":["DRONEACv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325bCHOa","sectionArray":["GIRLLEADELv2325bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325ceCHOa","sectionArray":["GIRLLEADELv2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseName":"Girls Leadership MS","courseNameAbbrv":"GirlsLeadershipMS","curriculumKey":"GIRLLEADMS","courseKey":"GIRLLEADMSv2325fhCHOa","sectionArray":["GIRLLEADMSv2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3360","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2325bCHOb","sectionArray":["MADSCICHEMv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseName":"Pirate Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"PIRATESCI","courseKey":"PIRATESCIv2325bCHOb","sectionArray":["PIRATESCIv2325bCHOb1"],"sectionCount":"2","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3511","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseName":"STEAM Survivor","courseNameAbbrv":"z_STRING_z","curriculumKey":"Survivor","courseKey":"Survivorv2325ceCHOb","sectionArray":["Survivorv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3501","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2326ceCHOb","sectionArray":["MADSCICHEMv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseName":"Maker Laboratory","courseNameAbbrv":"Maker Sum","curriculumKey":"MAKERLAB","courseKey":"MAKERLABv2326ceCHOa","sectionArray":["MAKERLABv2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1296","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3590","courseNameDisplay":"Art Lab","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABv2328bCHOb","sectionArray":["ARTLABv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseName":"Construction Kids","courseNameAbbrv":"ConstructKids","curriculumKey":"CONKIDS","courseKey":"CONKIDSv2328bCHOa","sectionArray":["CONKIDSv2328bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1283","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2328fhCHOb","sectionArray":["DRONEACv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2328fhCHOb","sectionArray":["FORENSICSv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseName":"Journey to Atlantis","courseNameAbbrv":"z_STRING_z","curriculumKey":"ATLANTIS","courseKey":"ATLANTISv2328bCHOb","sectionArray":["ATLANTISv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3515","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3591","courseNameDisplay":"Photography 101","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2328ceCHOb","sectionArray":["PHOTOv2328ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2329fhCHOb","sectionArray":["BIOMECHv2329fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseName":"Digging Dinos","courseNameAbbrv":"z_STRING_z","curriculumKey":"Dinosaurs","courseKey":"Dinosaursv2329bCHOb","sectionArray":["Dinosaursv2329bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3516","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2329ceCHOb","sectionArray":["FORENSICSv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329bCHOa","sectionArray":["LEADSTEAMv2329bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329beCHOa","sectionArray":["LEADSTEAMv2329beCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL25","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329fhCHOa","sectionArray":["LEADSTEAMv2329fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseName":"Paint and Mixed Media","courseNameAbbrv":"Paint","curriculumKey":"PAINTMEDIA","courseKey":"PAINTMEDIAv2329ceCHOb","sectionArray":["PAINTMEDIAv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"29","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2329dhCHOb","sectionArray":["PHOTOv2329dhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL48","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2329ceCHOb","sectionArray":["ROBOTCODEv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"}]
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
		 
		element.weight = Number(element.weekNameCardinal) * 1000 + index
	}
	memory.setItem('memoryWorkingBackupObject',JSON.stringify(allCoursesWorkingObject))
	// $w('#developerResponseTXTBX').value = JSON.stringify(allCoursesWorkingObject,undefined,4)
	
	
	console.log(`groupEnd: konstantTermCoursesOnReady()`)
	console.groupEnd()
	composeFilterFormObject()
}

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

//==================================================             </OnReady Called Functions>
//==========================================================================================

//====================================================================================================
//==============================        <Filter and Load Course-Repeater>         ==============================
//====================================================================================================

function evaluationPaginationAndLoadRepeater(forceRepaginate = false){
	// ø LOAD_COURSES_ON_READY_03_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
	// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
	// console.groupCollapsed(`evaluationPaginationAndLoadRepeater`)
	console.group(`evaluationPaginationAndLoadRepeater`)
	let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
	let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
	// /* EVEN ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35","37","39","41"]
	// /* ODD ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["0","2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36","38","40","42"]
	console.log(`allCoursesWorkingObject [array - from JSON.parse() below]`)
	console.dir(allCoursesWorkingObject)
	console.log(`filteredCourseBuffer [array - from JSON.parse() below]`)
	console.dir(filteredCourseBuffer)
	console.log('return FORCE: evaluationPaginationAndLoadRepeater: just logs above')

	let repeaterId = '#courseFilteredRPTR'
	let paginationId = '#courseFilteredPGNTN'
	let pageItemCount = 8
	if(forceRepaginate === true || $w(paginationId).totalPages === 100){
		// totalPages === 100 indicates default paginationObject
		$w(paginationId).currentPage = 1
		$w(paginationId).totalPages = Math.ceil(filteredCourseBuffer.length / pageItemCount);
	}
	let pageIndex = $w(paginationId).currentPage - 1
	let offset = pageIndex * pageItemCount

	let repeaterCoursesObjectArray = []
	for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
		const filteredPointerIndex = filteredCourseBuffer[rptrIndex]
		const element = allCoursesWorkingObject[filteredPointerIndex];
		if(typeof element !== 'undefined'){
			repeaterCoursesObjectArray.push(element)	
		}
	}
	// console.log(`repeaterCoursesObjectArray: [array below]`)
	// console.dir(repeaterCoursesObjectArray)
	
	$w(repeaterId).data = repeaterCoursesObjectArray;
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)

	$w(repeaterId).onItemReady( ($courseElement, courseElementData, index) => {

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

// ø <KEEP_FOR transform into 'Edit Section' && || 'Add Section'>
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
// ø </KEEP_FOR transform into 'Edit Section' && || 'Add Section'>

//====================================================================================================
//==============================        </Filter and Load Course-Repeater>        ==============================
//====================================================================================================

//====================================================================================================
//========================================        <Confirm Backend with Mulitply and Publick with Add>
//========================================       </Confirm Backend with Mulitply and Publick with Add>
//====================================================================================================

//====================================================================================================
//============================================================                  <Overall THINGS Course>
//============================================================        ...Some Active && Some Vestigial
//====================================================================================================

//==========================================================================================
//==================================================       <Instantiate from Curricula Click>
 
// ø <---------- <adjustCourseFiltersAany>  ---------->
function adjustCourseFiltersAany(){
	$w('#previewCourseBTN').label = 'Apply Filters'
	$w('#previewCourseBTN').show()
	$w('#clearCourseFormBTN').show()

}
// ø <---------- </adjustCourseFiltersAany> ---------->

// ø <---------- <resetCourseFiltersAll>  ---------->
function resetCourseFiltersAll(){
// ø CREATE_NEW_COURSE_±2_resetCourseForm
	// let wID_unsetArray = ['#courseNameINPUT','#courseNameDisplayINPUT','#regionLocationINPUT','#regionLocationKeyINPUT']
	$w('#clearCourseFormBTN').hide()
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
	// ø <#previewCourseBTN>
	$w('#previewCourseBTN').label = 'Apply No-Filters'
	$w('#previewCourseBTN').show()
	// ø </#previewCourseBTN>
	// $w('#daysOfWeekCBXGRP').value = ['1','2','3','4','5']
	// $w('#daysOfWeekCBXGRP').value = ['MON','TUE','WED','THU','FRI']
	// $w("#myCheckboxGroup").value = ["value1", "value2"];
	// session.setItem('lastResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// memory.setItem('memoryResponseObject', '')/*BIGBLEED*//*LINE_327*/
	// ø TERMINUS CREATE_NEW_COURSE_±2_resetCourseForm
	// ø ±1 course form scripts, but...
	// ø NEXT-BTN_click =>  CREATE_NEW_COURSE_00_Click_PreviewBTN
}
// ø <---------- </resetCourseFiltersAll> ---------->

// ø <---------- <Instantiate jsonDocDb for Locations>  ---------->
// ø <VESTIGIAL_CODE_except_for_Location_DropDown>
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
// ø </VESTIGIAL_CODE_except_for_Location_DropDown>
// ø <---------- </Instantiate jsonDocDb for Locations> ---------->

// ø <---------- <Populate Form Curriculum and Locations>  ---------->
// ø <VESTIGIAL_CODE_except_for_GENERAL_loadAfterClick>
export function newCourseFormLoadAfterClick_DEP(newCourseDataObject){
	$w('#courseNameINPUT').value = newCourseDataObject.name
	$w('#courseNameDisplayINPUT').value = newCourseDataObject.name
	// session.setItem('lastResponseObject', JSON.stringify(newCourseDataObject))/*BIGBLEED*//*LINE_473*/
	memory.setItem('memoryResponseObject', JSON.stringify(newCourseDataObject))/*BIGBLEED*//*LINE_473*/
}
// ø </VESTIGIAL_CODE_except_for_GENERAL_loadAfterClick>
// ø <---------- </Populate Form Curriculum and Locations> ---------->

//==================================================      </Instantiate from Curricula Click>
//==========================================================================================
//==========================================================================================
//==================================================         <Apply Filter Button: Validate>

// ø <---------- <validate Filter-Form data>  ---------->
export function validateFilterForm(){
	// ø FILTER_COURSES_01_validateFilterForm
	// ø CREATE_NEW_COURSE_01_ValidateFilterForm
	let ErrorString = ''
	//ø <GradeLevel>
	let isValidGradeLevel = 'TTRUE'
	isValidGradeLevel = $w('#minGradeDRPDN').value !== 'NA' && $w('#gradeLevelDRPDN').value !== 'NA' ? 'BOTH_VALUES' : isValidGradeLevel

	let stringIsValidHOLDER = ''
	if(isValidGradeLevel !== 'TTRUE'){
		stringIsValidHOLDER = isValidGradeLevel === 'BOTH_VALUES' ? `You cannot select both a 'Grade Contains' Grades and a Grade-Level from the Drop-Down` : stringIsValidHOLDER
		ErrorString += ` •  ${stringIsValidHOLDER}\n`
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


	// ø CREATE_NEW_COURSE_01_ValidateFilterForm
	if(ErrorString.length === 0){
		// ø SUCCESS CREATE_NEW_COURSE_01_ValidateFilterForm
		// ø NEXT CREATE_NEW_COURSE_02_composeFilterFormObject
		$w('#previewErrorStringTXT').text = `Holder for Errors`
		$w('#previewErrorStringTXT').collapse()
		console.log('VALID CALL: composeFilterFormObject()')
		composeFilterFormObject()
	}else{
		// ø FAILURE CREATE_NEW_COURSE_01_ValidateFilterForm
		// ø NEXT CREATE_NEW_COURSE_02_catchAndDisplayError
		catchAndDisplayError(ErrorString)
	}
}
// ø <---------- </validate Filter-Form data> ---------->

// ø <---------- <catch & display ERROR>  ---------->
export function catchAndDisplayError(ErrorString){
	// ø FILTER_COURSES_02err_catchAndDisplayError
	console.log(`ErrorString: `)
	console.log(ErrorString)
	$w('#previewErrorStringTXT').expand()
	$w('#previewErrorStringTXT').text = 'CANNOT APPLY FILTER:\n' + ErrorString + `use the 'Reset Filters' button to try agin...` 
}
// ø <---------- </catch & display ERROR> ---------->

//==================================================        </Apply Filter Button: Validate>
//==========================================================================================

//==========================================================================================
//==================================================      <Preview Button: Compose & Display_VESTIGIAL>

// ø <---------- <collectAndCalculateData_DEP(courseStartDate, courseEndDate)>  ---------->
// ø <---------- <composeFilterFormObject>  ---------->
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
// ø <---------- </composeFilterFormObject> ---------->

// ø <---------- <applyFilterToBuffer>  ---------->
function applyFilterToBuffer(paramObjectFilterForm){
	// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
	// ø FILTER_COURSES_03_applyFilterToBuffer
	// ø CREATE_NEW_COURSE_03_applyFilterToBuffer_paramObjectFilterForm
	// console.groupCollapsed(`applyFilterToBuffer(paramObjectFilterForm)`)
	console.group(`applyFilterToBuffer(paramObjectFilterForm)`)
	console.log(`REACHED: applyFilterToBuffer(paramObjectFilterForm)`)

	$w('#previewCourseBTN').hide()

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
	let filteredCourseExcludedBuffer = []
	let filteringComplete = paramObjectFilterForm.pipedBoolean === "false|false|false|false|false" ? true : false
	if(filteringComplete){
		filteredCourseBuffer = Object.keys(allCoursesWorkingObject)
		filteredCourseExcludedBuffer = []
		console.log(`ALL_FALSE: filteredCourseBuffer: [array below]`)
		console.dir(filteredCourseBuffer)
		// console.log(`LOAD_COURSE_REPEATER: evaluationPaginationAndLoadRepeater()`)
		console.log(`groupEnd: applyFilterToBuffer(paramObjectFilterForm)`)
		console.groupEnd()
		memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
		evaluationPaginationAndLoadRepeater(true)
		return
	}
	// return
	for (let index = 0; index < allCoursesWorkingObject.length; index++) {
		const courseThis = allCoursesWorkingObject[index];
		let includeThis = true

		let logicalOpertor = 'ALL_AND'// maybe 'ALL_OR' later, maybe even trickier
		// ø <logicalOpertor === 'ALL_AND'>
		if(logicalOpertor === 'ALL_AND'){

			// ø <Apply Either Grade Based Filter>
			// ø ø <Apply Grade Level Filter>
			if(paramObjectFilterForm.byGradeLevel){
				// console.log(`DO: Apply Grade Level Filter`)
				if(courseThis.gradeLevelKey !== paramObjectFilterForm.gradeLevel){
					includeThis = false
				}
			}
			// ø ø </Apply Grade Level Filter>
			// ø ø 
			// ø ø <Apply Contains Level Filter>
			if(paramObjectFilterForm.byContainsGrade){
				// console.log(`DO: Apply Contains Level Filter`)
				if(!courseThis.gradeLevelFullArray.includes(Number(paramObjectFilterForm.containsGrade))){
					includeThis = false
				}
			}
			// ø ø </Apply Contains Level Filter>
			// ø </Apply Either Grade Based Filter>
			// ø 
			// ø <Apply Either Date Based Filter>
			// ø ø <Apply Week Number Filter>
			if(paramObjectFilterForm.byWeek){
				if(Number(courseThis.weekNameCardinal) !== paramObjectFilterForm.weekCardinal){
					includeThis = false
				}
			}
			// ø ø </Apply Week Number Filter>
			// ø ø 
			// ø ø <Apply Contains Date Filter>
			if(paramObjectFilterForm.byContainsDate){
				let dateIsWithinSpan = true
				dateIsWithinSpan = paramObjectFilterForm.containsDateISO.substr(0,11) < courseThis.courseDateStart.substr(0,11) ? false : dateIsWithinSpan
				dateIsWithinSpan = paramObjectFilterForm.containsDateISO.substr(0,11) > courseThis.courseDateEnd.substr(0,11) ? false : dateIsWithinSpan
				if(!dateIsWithinSpan){
					includeThis = false
				}
			}
			// ø ø </Apply Contains Date Filter>
			// ø </Apply Either Date Based Filter>
		}
		// ø </logicalOpertor === 'ALL_AND'>
		if(includeThis){
			filteredCourseBuffer.push(index.toString())
		}
		if(!includeThis){
			filteredCourseExcludedBuffer.push(index.toString())
		}

	}

	memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
	console.log(`FILTER_APPLIED: filteredCourseBuffer: [array below]`)
	console.dir(filteredCourseBuffer)
	console.log(`FILTER_APPLIED: filteredCourseExcludedBuffer: [array below]`)
	console.dir(filteredCourseExcludedBuffer)




	memory.setItem('memoryParamObject', JSON.stringify(paramObjectFilterForm))

	console.log(`groupEnd: applyFilterToBuffer(paramObjectFilterForm)`)
	console.groupEnd()
	// return
	evaluationPaginationAndLoadRepeater(true)

}
// ø <---------- </applyFilterToBuffer> ---------->

//==================================================     </Preview Button: Compose & Display_VESTIGIAL>
//==========================================================================================

//==========================================================================================
//==================================================      <Post Course & API POST to Drupal_VESTIGIAL_PATCH>

// ø <---------- <Post Course to Drupal_VESTIGIAL_PATCH>  ---------->
export async function newCourseDrupalPOST_VESTIGIAL_PATCH_DEP(newCourseDrupalObject = {}){
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
// ø <---------- </Post Course to Drupal_VESTIGIAL_PATCH> ---------->
//==================================================     </Post Course & API POST to Drupal_VESTIGIAL_PATCH>
//==========================================================================================


//====================================================================================================
//============================================================                </Overall THINGS Course>
//====================================================================================================
 
//====================================================================================================
//============================================================                     <Edit Course Logic>
//====================================================================================================
// ø QUICK_LIST_COURSE_EDIT:
// ø COURSE_EDIT_00a_BTTNS
// ø COURSE_EDIT_00b_courseEditNavigation
// ø COURSE_EDIT_00c_instantiateCourseItemSingletonRepeater
// ø COURSE_EDIT_00d_courseEditLogicSWITCH
// ø COURSE_EDIT_01a_courseTilePath
//==========================================================================================
//==================================================                <Course Edit Navigation>
// ø COURSE_EDIT_00b_courseEditNavigation
function courseEditNavigation(scriptName = 'STRING', itemId = "777"){
	if(scriptName === 'OFF_RAMP'){
		$w('#courseEditMSBOX').changeState(`nullSTT`);
		$w(`#courseTilePathEditBTTN`).enable()
		$w(`#currCourseTilePathINPUT`).value = ''
		$w(`#currCourseTilePathINPUT`).resetValidityIndication()
		$w(`#nextCourseTilePathINPUT`).value = ''
		$w(`#nextCourseTilePathINPUT`).resetValidityIndication()
		$w(`#courseAddSectionBTTN`).enable()
		$w(`#courseEditSectionBTTN`).enable()
		$w('#courseEditSTRP').collapse()
		$w(`#courseTilePathEditSingletonBTTN`).hide()
		$w(`#courseAddSectionSingletonBTTN`).hide()
		$w(`#courseEditSectionSingletonBTTN`).hide()

		$w('#responseStringCourseTilePathTXT').text = ''
		$w('#responseStringCourseTilePathTXT').hide()
		// $w('#previewCourseTileBTTN').hide()
		$w('#postCourseTileBTTN').hide()
		return
	}
	let currentCourseTilePath = instantiateCourseItemSingletonRepeater(itemId)
	let courseEditActionKeyArray = ['courseTilePathEdit','courseAddSection','courseEditSection']
	// ø <¿Map?>
	let actionKey = 'PENDING'
	// actionKey = scriptName.includes(ourseEditActionKeyArray[1]) ? ourseEditActionKeyArray[1] : actionKey
	// actionKey = scriptName.includes(ourseEditActionKeyArray[2]) ? ourseEditActionKeyArray[2] : actionKey
	courseEditActionKeyArray.forEach(element => {
		actionKey = scriptName.includes(element) ? element : actionKey
		$w(`#${element}BTTN`).disable()
		console.log(`$w('#elementBTTN').disable(): $w('#${element}BTTN').disable()`)
	});
	if(actionKey === 'courseTilePathEdit' && currentCourseTilePath.length === 0){
		actionKey = 'courseTileSvgEdit'
		courseEditActionKeyArray.push(actionKey) // may be MOOT, but better form
	}
	console.log(`actionKey: ${actionKey}`)
	// ø </¿Map?>

	// ø disable Buttons (lest inadvertant click)
	// ø expand courseEditSTRP
	$w('#courseEditSTRP').expand()
	// ø change State
	let wIdSingletonBTTN = `#${actionKey}SingletonBTTN`
	// ø <KLUDGE>
	wIdSingletonBTTN = wIdSingletonBTTN === `#courseTileSvgEditSingletonBTTN` ? `#courseTilePathEditSingletonBTTN` : wIdSingletonBTTN
	// ø </KLUDGE>
	$w(wIdSingletonBTTN).show()
	$w('#courseEditMSBOX').changeState(`${actionKey}STT`);

	// ø scrollTo ANCHR
	$w('#courseEditANCHR').scrollTo()
	let paramObject = {}
	paramObject.nid = Number(itemId)
	// ø COURSE_EDIT_00d_courseEditLogicSWITCH
	// ø SUFFICIENT: for now, swap code to SWITCH if one more...
	if(actionKey === 'courseTilePathEdit'){
		// ! YIKES: courseEdit (actionKey) to doCourseEdit_courseTilePath: ¿time to change actionKey strings?
		paramObject.nid = Number(itemId)
		paramObject.currentCourseTilePath = currentCourseTilePath
		paramObject.actionKey = actionKey
		paramObject.stepKey = 'onReady'
		doCourseEdit_courseTilePath('NO_OVERLOAD',paramObject)
	}
	if(actionKey === 'courseTileSvgEdit'){
		// ! YIKES: courseEdit (actionKey) to doCourseEdit_courseTilePath: ¿time to change actionKey strings?
		paramObject.nid = Number(itemId)
		paramObject.currentCourseTilePath = currentCourseTilePath
		paramObject.actionKey = actionKey
		paramObject.stepKey = 'onReady'
		doCourseEdit_courseTileSvg('NO_OVERLOAD',paramObject)
	}
	if(actionKey === 'courseAddSection'){
		paramObject.nid = Number(itemId)
		// paramObject.currentCourseTilePath = currentCourseTilePath
		paramObject.actionKey = actionKey
		paramObject.stepKey = 'onReady'
		doCourseAddSection('NO_OVERLOAD', paramObject)
	}
	if(actionKey === 'courseEditSection'){
		paramObject.nid = Number(itemId)
		// paramObject.currentCourseTilePath = currentCourseTilePath
		paramObject.actionKey = actionKey
		paramObject.stepKey = 'onReady'
		doCourseEditSection('NO_OVERLOAD', paramObject)
	}
}
 
// ø <---------- <instantiateCourseItemSingletonRepeater(itemId)  ---------->
// ø COURSE_EDIT_00c_instantiateCourseItemSingletonRepeater
 function instantiateCourseItemSingletonRepeater(itemId = "777"){
	const wIdSingleton = '#courseEditRPTR'
	const wIdClickedRepeater = '#courseFilteredRPTR'
	// console.log(`wIdSingleton: ${wIdSingleton}`)
	const data = $w(wIdClickedRepeater).data;
	// console.log(`data`)
	// console.dir(data)
	let clickedItemData = data.find(item => item._id === itemId);

	let currentCourseTilePath = typeof clickedItemData.courseTilePath === 'string' ? 'STRING' : 'NNULL'
	currentCourseTilePath = currentCourseTilePath === 'STRING' && clickedItemData.courseTilePath. length > 20 ? clickedItemData.courseTilePath : 'NNULL'
	currentCourseTilePath = currentCourseTilePath !== 'NNULL' ? currentCourseTilePath : ''
	// $w('#currCourseTilePathINPUT').value = currentCourseTilePath !== 'NNULL' ? currentCourseTilePath : ''
	// $w('#currCourseTilePathINPUT').value = currentCourseTilePath !== 'NNULL' ? currentCourseTilePath : 'https://static.wixstatic.com/shapes/523205_8ec1c41ed0e04ad0ab9c57a0d5d37983.svg'
	

	let repeaterDataArray = []
	repeaterDataArray.push(clickedItemData)
	console.log(`repeaterDataArray:`)
	console.dir(repeaterDataArray)

	$w(wIdSingleton).data = repeaterDataArray
    
	const wIdCourseTileIMG = '#courseTileOneIMG'
	const wIdcourseTopTXT = '#courseTopOneTXT'
	// • REDUNDANCY IS A GOOD THING

	$w(wIdSingleton).onItemReady( ($courseElement, courseElementData, index) => {

		$courseElement('#courseNameDisplaySingleTXT').text = courseElementData.courseNameDisplay
		$courseElement('#locationConcatSingleTXT').text = `${courseElementData.locationNameCommon} [${courseElementData.locationKey}]`
		$courseElement('#simpleWeekSingleTXT').text = `${courseElementData.weekNameCardinal} [${courseElementData.weekDateStartAbbrv}]`
		$courseElement('#gradeLevelHumanSingleTXT').text = courseElementData.gradeLevelHuman
		$courseElement('#timeSpanStringSingleTXT').text = courseElementData.weekTimeBlockSpanString
		$courseElement('#daysOfWeekStringSingleTXT').text = courseElementData.weekDaysOfWeekString
		$courseElement('#courseKeySingleTXT').text = courseElementData.courseKey
		$courseElement('#sectionCountSingleTXT').text = courseElementData.sectionCount
		// $courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath

		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(courseElementData,undefined,4)
		console.log(`courseElementData: [object below]`)
		console.dir(courseElementData)
	})
	return currentCourseTilePath
 }
// ø <---------- </instantiateCourseItemSingletonRepeater(itemId) ---------->
//==================================================               </Course Edit Navigation>
//==========================================================================================

//==========================================================================================
//==================================================            <Course Edit Action Scripts>
// ø <---------- <doCourseEdit_courseTilePath(paramObject)>  ---------->
// ø COURSE_EDIT_01a_courseTilePath
async function doCourseEdit_courseTilePath(stepThis = 'NO_OVERLOAD', paramObject = {}){
	if(typeof paramObject.nid === 'undefined'){
		paramObject = JSON.parse(memory.getItem('memoryResponseObject'))
	}
	let responseObject = {}
	if(typeof paramObject.nid === 'undefined'){
		responseObject.negative = {}
		responseObject.negative.boolean = true
		responseObject.negative.stringArray = []
		responseObject.negative.stringArray.push(`if(typeof paramObject.nid === 'undefined')`)
		console.log(`responseObject: [object below]`)
		console.dir(responseObject)
		return responseObject
	}
	paramObject.stepKey = stepThis === 'NO_OVERLOAD' ? paramObject.stepKey : stepThis
	let supportedStepKeyArray = ['onReady','onPathChange','onPreviewClick','onPostClick']
	responseObject.paramObject = paramObject
	responseObject.responseObject = {}
	if(paramObject.actionKey !== 'courseTilePathEdit'){
		responseObject.negative = {}
		responseObject.negative.boolean = true
		responseObject.negative.stringArray = []
		responseObject.negative.stringArray.push(`if(!supportedStepKeyArray.includes(paramObject.stepKey))`)
		console.log(`responseObject: [object below]`)
		console.dir(responseObject)
		return responseObject
	}
	if(!supportedStepKeyArray.includes(paramObject.stepKey)){
		responseObject.negative = {}
		responseObject.negative.boolean = true
		responseObject.negative.stringArray = []
		responseObject.negative.stringArray.push(`if(!supportedStepKeyArray.includes(paramObject.stepKey))`)
		responseObject.negative.stringArray.push(`supportedStepKeyArray: ${supportedStepKeyArray.toString()}`)
		responseObject.negative.stringArray.push(`paramObject.stepKey: ${paramObject.stepKey}`)
		console.log(`responseObject: [object below]`)
		console.dir(responseObject)
		return responseObject
	}
	// ø <STEP: onReady [could become a ƒn]>
	if(paramObject.stepKey === 'onReady'){
		$w('#currCourseTilePathINPUT').value = paramObject.currentCourseTilePath.length < 25 ? '' : paramObject.currentCourseTilePath
		doCourseEdit_previewCourseTilePath(paramObject.currentCourseTilePath,paramObject.stepKey)
		$w('#previewCourseTileBTTN').show()
		let affirmativeParamObject = JSON.parse(memory.getItem('memoryResponseObject'))
		memory.setItem('memoryResponseObject',JSON.stringify(paramObject))
		return
	}
	// ø </STEP: onReady [could become a ƒn]>
	// ø <STEP: onPathChange [could become a ƒn]>
	if(paramObject.stepKey === 'onPathChange'){
		$w('#responseStringCourseTilePathTXT').text = ``
		$w('#responseStringCourseTilePathTXT').hide()
		$w('#previewCourseTileBTTN').show()
		return
	}
	// ø </STEP: onPathChange [could become a ƒn]>
	// ø <STEP: onPreviewClick [could become a ƒn]>
	if(paramObject.stepKey === 'onPreviewClick'){
		const wIdNextCourseTilePath = '#nextCourseTilePathINPUT'
		const nextCourseTilePath = $w(wIdNextCourseTilePath).value
		let nextPathIsValid = true

		nextPathIsValid = nextCourseTilePath.length < 25 ? false : nextPathIsValid
		if(nextPathIsValid){
			doCourseEdit_previewCourseTilePath(nextCourseTilePath,paramObject.stepKey)
		}else{
			$w('#responseStringCourseTilePathTXT').text = 'ERROR: Supplied Path is Invalid'
			$w('#responseStringCourseTilePathTXT').show()
		}
		// nextPathIsValid = $w('#courseTilePathIMG').rendered === false ? false : nextPathIsValid

		console.log(`preview Course Tile Object: $w('#courseTilePathIMG'): [object below]`)
		console.dir($w('#courseTilePathIMG'))
		console.log(`Esoterica: $w('#courseTilePathIMG').isVisible: ${$w('#courseTilePathIMG').isVisible}`)

		// if(nextPathIsValid === true && $w('#courseTilePathIMG').rendered === false){
		// 	$w('#responseStringCourseTilePathTXT').text = 'ERROR: new Path Could Not Be Rendered'
		// 	$w('#responseStringCourseTilePathTXT').show()
		// 	doCourseEdit_previewCourseTilePath(paramObject.currentCourseTilePath,paramObject.stepKey)
		// 	nextPathIsValid = false
		// }
		let validPathBeginsWithString = `https://static.wixstatic.com/media/`
		let validPathBeginsWithStringLength = validPathBeginsWithString.length
		if(nextPathIsValid === true && nextCourseTilePath.substr(0,validPathBeginsWithStringLength)!== validPathBeginsWithString){
			$w('#responseStringCourseTilePathTXT').text = 'ERROR: new Path Could Not Be Rendered'
			$w('#responseStringCourseTilePathTXT').show()
			doCourseEdit_previewCourseTilePath(paramObject.currentCourseTilePath,paramObject.stepKey)
			$w('#previewCourseTileBTTN').hide()
			nextPathIsValid = false
		}
		if(nextPathIsValid){
			paramObject.nextCourseTilePath = nextCourseTilePath
			// let affirmativeParamObject = JSON.parse(memory.getItem('memoryResponseObject'))
			memory.setItem('memoryResponseObject',JSON.stringify(paramObject))
			$w('#previewCourseTileBTTN').hide()
			$w('#postCourseTileBTTN').show()
			console.log(`paramObject: memory.setItem('memoryResponseObject', [object below] )`)
			console.dir(paramObject)
		}
		
		return
	}
	// ø </STEP: onPreviewClick [could become a ƒn]>
	// ø <STEP: onPostClick [could become a ƒn]>
	if(paramObject.stepKey === 'onPostClick'){
		$w('#responseStringCourseTilePathTXT').text = `FAUX: Post (actually 'PATCH')`
		$w('#responseStringCourseTilePathTXT').show()

	// paramObject.currentCourseTilePath = paramObject.currentCourseTilePath.length < 20 ? oopsCourseTilePath : paramObject.currentCourseTilePath
	console.log(`doCourseEdit: paramObject; [object below]`)
	console.dir(paramObject)

	// ø <PATCH-by-Code>
	// ø <PATCH-Course-courseTilePath>
	// • source: /Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWixNonGit/apiDrupal/BINARY_supportedBundles/courses_3499/reducedForPATCH
	let nidThis = paramObject.nid
	let field_coursetilepathThis = paramObject.nextCourseTilePath
	let requestBodyObject = {}
	requestBodyObject.nid = []
	requestBodyObject.nid[0] = {}
	requestBodyObject.nid[0].value = nidThis
	requestBodyObject.type = []
	requestBodyObject.type[0] = {}
	requestBodyObject.type[0].target_id = 'courses'
	requestBodyObject.type[0].target_type = 'node_type'

	requestBodyObject.field_coursetilepath = []
	requestBodyObject.field_coursetilepath[0] = {}
	requestBodyObject.field_coursetilepath[0].value = field_coursetilepathThis

	let requestBodyPATCH = JSON.stringify(requestBodyObject)
	console.log(`JSON.stringify(requestBodyObject): requestBodyPATCH: [prettified JSON below]`)
	console.log(JSON.stringify(requestBodyObject,undefined,4))

	let responseAsFetch = await patchDrupalNode(nidThis, requestBodyPATCH)
	console.log(`responseAsFetch = patchDrupalNode(nidThis, requestBodyPATCH): [¿prettified? JSON below]`)
	console.log(responseAsFetch)

	// ø </PATCH-Course-courseTilePath>
	// ø </PATCH-by-Code>

	$w('#postCourseTileBTTN').hide()
	return // ø MOOT - but structurally consistent
	}
	// ø </STEP: onPostClick [could become a ƒn]>


}
// ø <---------- </doCourseEdit_courseTilePath(paramObject)> ---------->
// ø <---------- <doCourseEdit_previewCourseTilePath(preview)> ---------->
function doCourseEdit_previewCourseTilePath(path = 'FFFALSE', topText = 'NNULL'){
	const oopsCourseTilePath = 'https://static.wixstatic.com/shapes/523205_8ec1c41ed0e04ad0ab9c57a0d5d37983.svg'
	path = path === 'FFFALSE' ? 'FFALSE' : path
	path = path.length < 25 ? oopsCourseTilePath : path
	topText = topText === 'NNULL' ? '' : topText
	const wIdRepeater = '#singletonCourseTilePathRPTR'
	let repeaterDataArray = []
	let repeaterThis = {}
	repeaterThis._id = "777"
	repeaterThis.courseTilePath = path
	repeaterThis.topText = topText
	// repeaterThis.topText = `<div style="background-color:blue;"><span style="color:yellow;">`
	repeaterDataArray.push(repeaterThis)
	let response = {}
	response.repeaterDataArray = repeaterDataArray
	// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(response,undefined,4)
	// console.log(`response: [object below]`)
	// console.dir(response)
	// ø LOAD_COURSES_ON_READY_03_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
	$w(wIdRepeater).data = repeaterDataArray

	const wIdCourseTileIMG = '#courseTilePathIMG'
	const wIdcourseTopTXT = '#courseTileTopTXT'
	// • REDUNDANCY IS A GOOD THING

	$w(wIdRepeater).onItemReady( ($courseElement, courseElementData, index) => {

		$courseElement(wIdcourseTopTXT).html = courseElementData.topText
		$courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath

		// $w(wIdKldgeResponseTXTBX).value = JSON.stringify(courseElementData,undefined,4)
		console.log(`courseElementData: [object below]`)
		console.dir(courseElementData)
	})

    

}
// ø <---------- </doCourseEdit_previewCourseTilePath(preview)> ---------->

// ø <---------- <doCourseEdit_courseTileSvg(paramObject)>  ---------->
function doCourseEdit_courseTileSvg(stepThis = 'NO_OVERLOAD', paramObject = {}){
	console.log(`doCourseAddSection: paramObject; [object below]`)
	console.dir(paramObject)
}
// ø <---------- </doCourseEdit_courseTileSvg(paramObject)> ---------->
 
// ø <---------- <doCourseAddSection(paramObject)>  ---------->
function doCourseAddSection(stepThis = 'NO_OVERLOAD', paramObject = {}){
	console.log(`doCourseAddSection: paramObject; [object below]`)
	console.dir(paramObject)
}
// ø <---------- </doCourseAddSection(paramObject)> ---------->
 
// ø <---------- <doCourseEditSection(paramObject)>  ---------->
function doCourseEditSection(stepThis = 'NO_OVERLOAD', paramObject = {}){
	console.log(`doCourseEditSection: paramObject; [object below]`)
	console.dir(paramObject)

}
// ø <---------- </doCourseEditSection(paramObject)> ---------->
 
//==================================================           </Course Edit Action Scripts>
//==========================================================================================

//====================================================================================================
//============================================================                    </Edit Course Logic>
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
export function develTestingBTN_DEP_click(event) {
	develTestingCALL() 
}
async function develTestingCALL_DEP(){
	if($w('#develTestingRADIOGRP').value === 'CURRENT'){
		await onReadyCurriculaJSON()
	}
	if($w('#develTestingRADIOGRP').value === 'ONDECK'){
		konstantSelectedCurriculaRepeaterOnReady_DEP()
	}
}
export async function doKLUDGE_DEP(){
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

export function selectedNewCourseBTN_DEP_click(event) {
	// ø CREATE_NEW_COURSE_±1_completeCourseForm_SCRIPTS
	let scriptName = 'selectedNewCourseBTN_click'
	let clickedItemData = processSelectCurriculum(event,scriptName)
	// ø NEXT CREATE_NEW_COURSE_±1a_instantiateNewCourseObject
	instantiateNewCourseObject(clickedItemData)
}

export function btnKLUDGEdeveloperTask_DEP_click(event) {
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

export function previewCourseBTN_click(event) {
	// ø FILTER_COURSES_00_previewCourseBTN_click
	// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
	// ø NEXT CREATE_NEW_COURSE_01_ValidateFilterForm
	validateFilterForm()
}
export async function ZZZpostCourseBTN_DEP_click(event) {
	// ø CREATE_NEW_COURSE_04_Click_PostBTN
    // ø NEXT CREATE_NEW_COURSE_05_newCourseDrupalPOST
	$w('#postCourseBTN').hide()
	await newCourseDrupalPOST()
}

export function clearCourseFormBTN_click(event) {
	// $w('#postCourseBTN').hide()
	// ø CREATE_NEW_COURSE_±3_Click_clearCourseForm
	// ø NEXT CREATE_NEW_COURSE_±2_resetCourseForm
	resetCourseFiltersAll()
}

export function kludgeDevelBTN_DEP_click(event) {
	$w("#courseEditMSBOX").changeState("develSTT");
}

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


export function develBTN_DEP_click(event) {
	console.log(`export function develBTN_click(event)`)
	toggleTopSection()
}

export function curriculaSelectedPGNTN_click(event) {
	evaluationPaginationAndLoadRepeater()
}

export function btnblkToggle3BTN_click(event) {
	btnblkToggleBTN_click('btnblkToggle3BTN_click(event)')
}

export function btnblkDo3BTN_click(event) {
	btnblkDoBTN_click('btnblkDo3BTN_click(event)') 
}

//==========================================================================================
//==================================================          <adjustCourseFiltersAany BTNs>


export function weekCountDRPDN_change(event) {
	adjustCourseFiltersAany() 
}

export function startDateDTPKR_change(event) {
	adjustCourseFiltersAany() 
}

export function gradeLevelDRPDN_change(event) {
	adjustCourseFiltersAany() 
}

export function minGradeDRPDN_change(event) {
	adjustCourseFiltersAany() 
}

export function regionLocationKeyINPUT_change(event) {
	console.group(`regionLocationKeyINPUT_change(event)`)
	// console.groupCollapsed(`regionLocationKeyINPUT_change(event)`)
	adjustCourseFiltersAany() 
	console.log(`YIKES!: Not Working`)
	console.log(`groupEnd: regionLocationKeyINPUT_change(event)`)
	console.groupEnd()
}
//==================================================         </adjustCourseFiltersAany BTNs>
//==========================================================================================

//==========================================================================================
//==================================================             <courseEditNvibation BTTNs>
	// courseEditNavigation('scriptName')
// ø COURSE_EDIT_00a_BTTNS

export function courseTilePathEditBTTN_click(event) {
	console.log(`event.context.itemId: ${event.context.itemId}`)
	// console.log(`event.context: [object below]`)
	// console.dir(event.context)
	// console.log(`event: [¿object? below]`)
	// console.dir(event)
	courseEditNavigation('courseTilePathEditBTTN_click',event.context.itemId)
}

export function courseAddSectionBTTN_click(event) {
	courseEditNavigation('courseAddSectionBTTN_click',event.context.itemId)
}

export function courseEditSectionBTTN_click(event) {
	courseEditNavigation('courseEditSectionBTTN_click',event.context.itemId)
}

export function courseNavigationOffRampBTTN_DEP_click(event) {
	courseEditNavigation('OFF_RAMP')
}

export function editCourseCanxBTTN_click(event) {
	courseEditNavigation('OFF_RAMP')
}

export function gotoCourseTilePathEditBTTN_click(event) {
	$w('#courseEditMSBOX').changeState('courseTilePathEditSTT')
}

export function gotoCourseTileSvgEditBTTN_click(event) {
	$w('#courseEditMSBOX').changeState('courseTileSvgEditSTT')
}
//==================================================            </courseEditNvibation BTTNs>
//==========================================================================================

//==========================================================================================
//==================================================              <nextCourseTilePath BTTNs>


export function nextCourseTilePathINPUT_change(event) {
	doCourseEdit_courseTilePath('onPathChange')
}


export function previewCourseTileBTTN_click(event) {
	doCourseEdit_courseTilePath('onPreviewClick')
}

export function postCourseTileBTTN_click(event) {
	doCourseEdit_courseTilePath('onPostClick')
}
//==================================================             </nextCourseTilePath BTTNs>
//==========================================================================================


