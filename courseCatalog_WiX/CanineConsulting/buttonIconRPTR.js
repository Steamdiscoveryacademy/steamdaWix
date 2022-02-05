// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixUsers from 'wix-users';
import wixWindow from 'wix-window';
import {local, session, memory} from 'wix-storage';


$w.onReady(function () {
    codeKludgeFirstOnReady()
    setUpOnReady()
    fetchRepeaterDataOnReady(true)
	instantiateRepeaterDataOnReady()
	// /*buttonBlockModule*/ assignStringsOnReady([2,3],[2,3])
	// /*LIVE*/wixUserPermissionsOnReady()
    /*DEP_of_wixUserPermissions*/ adminShowOnReady()
    // ø <UI-UX>
	wixWindow.scrollTo(100,125);
	wixStorageDisplayOnReady()	
    // ø </UI-UX>
    cleanUpOnReady()
    codeKludgeLastOnReady()
});

// ø QUICK_LIST:
// ø 
// ø LOAD_REPEATER_ANY: in this case LOAD_COURSES
// ø 
// ø LOAD_COURSES_ON_READY_00a_setUpOnReady
// ø ø                     NOTE: 'triggers _FILTER_ of no-Filter onReady()'
// ø ø                     NOTE: '[optional] capture memoryDoxObject'
// ø LOAD_COURSES_ON_READY_00b_fetchRepeaterDataOnReady_KLUDGE
// ø LOAD_COURSES_ON_READY_00c_instantiateRepeaterDataOnReady
// ø LOAD_COURSES_ON_READY_01_composeFilterFormObject_FUNGIBLE_OnReadyForceChangeNoFilter
// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
// ø LOAD_COURSES_ON_READY_03_rebuildBufferForGrid_OnReadyForceAllCourses
// ø LOAD_COURSES_ON_READY_04_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
// ø LOAD_COURSES_ON_READY_04a_evaluationPaginationAndLoadRepeaterThis_OnReadyFirstEightCourses
// ø 
// ø FILTER_COURSES_00_filterCoursesBTN_click_FUNGIBLE
// ø FILTER_COURSES_01_filterFormValidate_FUNGIBLE
// ø FILTER_COURSES_02_composeFilterFormObject_FUNGIBLE | FILTER_COURSES_02err_catchAndDisplayError_FUNGIBLE
// ø FILTER_COURSES_03_applyFilterToBuffer
// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
// ø 


//==========================================================================================
//==================================================              <OnReady Called Functions>
function adminShowOnReady(){
    const user = wixUsers.currentUser;
    const adminShowArray = ["#btnWiXHome"];
    if (user.loggedIn) {
        user.getRoles()
            .then((roles) => {
                if (roles.some(r => r.name === "Admin")) {
                    for (var i = 0; i < adminShowArray.length; i++) {
                        $w(adminShowArray[i]).show();
                    }
                }
            });
    }
}

// ø LOAD_COURSES_ON_READY_00b_fetchRepeaterDataOnReady_KLUDGE
function fetchRepeaterDataOnReady(KLUDGE = true){
    // console.group(`fetchRepeaterDataOnReady()`)
    console.groupCollapsed(`fetchRepeaterDataOnReady()`)
    console.log(`REACHED!`)
    
    // let fauxCoursesGetJSON = `{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","weekNameCardinal":"1","weekDateStartAbbrv":"Jun 6","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"K-2","gradeLevelFullArray":[0,1,2],"weight":0}`
// /*FULL 2022-01-02T09:41:00 */ let fauxCoursesGetJSON = `[{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","courseTilePath":"FFALSE"},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","courseTilePath":"FFALSE"},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","courseTilePath":"FFALSE"},{"_id":"3556","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"Architecture","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2324ceCHOb","sectionArray":["ARCHITECTv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3571","courseNameDisplay":"Creative Creatures","courseName":"Creative Creatures","courseNameAbbrv":"CreativeCreatures","curriculumKey":"CREATURES","courseKey":"CREATURESv2324bCHOa","sectionArray":["CREATURESv2324bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3356","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3567","courseNameDisplay":"Gadgets and Gizmos","courseName":"Gadgets and Gizmos","courseNameAbbrv":"Gadgets","curriculumKey":"GADGETS","courseKey":"GADGETSv2324bCHOb","sectionArray":["GADGETSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"25","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3566","courseNameDisplay":"Intro to STEAM","courseName":"Intro to STEAM","courseNameAbbrv":"Int Ste","curriculumKey":"INTROSTEAM","courseKey":"INTROSTEAMv2324bCHOb","sectionArray":["INTROSTEAMv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"39","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3570","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2324fhCHOb","sectionArray":["MADSCICHEMv2324fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3569","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2324ceCHOb","sectionArray":["ROBOTCODEv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202224","courseTilePath":"FFALSE"},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3575","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2325ceCHOb","sectionArray":["CERAMICSv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3577","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2325ceCHOb","sectionArray":["DRONEACv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3579","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325bCHOa","sectionArray":["GIRLLEADELv2325bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3580","courseNameDisplay":"Girls Leadership","courseName":"Girls Leadership Elem","courseNameAbbrv":"Girls Leadership Elem","curriculumKey":"GIRLLEADEL","courseKey":"GIRLLEADELv2325ceCHOa","sectionArray":["GIRLLEADELv2325ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3352","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3581","courseNameDisplay":"Girls Leadership MS","courseName":"Girls Leadership MS","courseNameAbbrv":"GirlsLeadershipMS","curriculumKey":"GIRLLEADMS","courseKey":"GIRLLEADMSv2325fhCHOa","sectionArray":["GIRLLEADMSv2325fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3360","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3574","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2325bCHOb","sectionArray":["MADSCICHEMv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3573","courseNameDisplay":"Pirate Science","courseName":"Pirate Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"PIRATESCI","courseKey":"PIRATESCIv2325bCHOb","sectionArray":["PIRATESCIv2325bCHOb1"],"sectionCount":"2","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3511","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3576","courseNameDisplay":"STEAM Survivor","courseName":"STEAM Survivor","courseNameAbbrv":"z_STRING_z","curriculumKey":"Survivor","courseKey":"Survivorv2325ceCHOb","sectionArray":["Survivorv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3501","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225","courseTilePath":"FFALSE"},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3585","courseNameDisplay":"Mad Scientist Chemistry","courseName":"Mad Scientist Chemistry","courseNameAbbrv":"Mad Science","curriculumKey":"MADSCICHEM","courseKey":"MADSCICHEMv2326ceCHOb","sectionArray":["MADSCICHEMv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"27","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3588","courseNameDisplay":"Maker Laboratory","courseName":"Maker Laboratory","courseNameAbbrv":"Maker Sum","curriculumKey":"MAKERLAB","courseKey":"MAKERLABv2326ceCHOa","sectionArray":["MAKERLABv2326ceCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1296","termId":"202223","weekId":"202226","courseTilePath":"FFALSE"},{"_id":"3590","courseNameDisplay":"Art Lab","courseName":"Art Lab","courseNameAbbrv":"Art Lab","curriculumKey":"ARTLAB","courseKey":"ARTLABv2328bCHOb","sectionArray":["ARTLABv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"16","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3594","courseNameDisplay":"Construction Kids","courseName":"Construction Kids","courseNameAbbrv":"ConstructKids","curriculumKey":"CONKIDS","courseKey":"CONKIDSv2328bCHOa","sectionArray":["CONKIDSv2328bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"1283","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3592","courseNameDisplay":"Drone Academy","courseName":"Drone Academy","courseNameAbbrv":"Drone Acad","curriculumKey":"DRONEAC","courseKey":"DRONEACv2328fhCHOb","sectionArray":["DRONEACv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"37","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3593","courseNameDisplay":"Forensics Investigators","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2328fhCHOb","sectionArray":["FORENSICSv2328fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3589","courseNameDisplay":"Journey to Atlantis","courseName":"Journey to Atlantis","courseNameAbbrv":"z_STRING_z","curriculumKey":"ATLANTIS","courseKey":"ATLANTISv2328bCHOb","sectionArray":["ATLANTISv2328bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3515","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3591","courseNameDisplay":"Photography 101","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2328ceCHOb","sectionArray":["PHOTOv2328ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-11T11:59:00.000Z","courseDateEnd":"2022-07-15T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202228","courseTilePath":"FFALSE"},{"_id":"3600","courseNameDisplay":"Sport & Trick Shot Biomechanics","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2329fhCHOb","sectionArray":["BIOMECHv2329fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3595","courseNameDisplay":"Digging Dinos","courseName":"Digging Dinos","courseNameAbbrv":"z_STRING_z","curriculumKey":"Dinosaurs","courseKey":"Dinosaursv2329bCHOb","sectionArray":["Dinosaursv2329bCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3516","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3598","courseNameDisplay":"Forensic Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2329ceCHOb","sectionArray":["FORENSICSv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3601","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329bCHOa","sectionArray":["LEADSTEAMv2329bCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3602","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329beCHOa","sectionArray":["LEADSTEAMv2329beCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL25","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3603","courseNameDisplay":"Lead with STEAM","courseName":"Lead with STEAM","courseNameAbbrv":"LeadwithSTEAM","curriculumKey":"LEADSTEAM","courseKey":"LEADSTEAMv2329fhCHOa","sectionArray":["LEADSTEAMv2329fhCHOa1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3461","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3596","courseNameDisplay":"Paint and Mixed Media","courseName":"Paint and Mixed Media","courseNameAbbrv":"Paint","curriculumKey":"PAINTMEDIA","courseKey":"PAINTMEDIAv2329ceCHOb","sectionArray":["PAINTMEDIAv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"29","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3599","courseNameDisplay":"Photography 201*","courseName":"Photography","courseNameAbbrv":"Photo","curriculumKey":"PHOTO","courseKey":"PHOTOv2329dhCHOb","sectionArray":["PHOTOv2329dhCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL48","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"30","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"},{"_id":"3597","courseNameDisplay":"Robotics and Coding","courseName":"Robotics and Coding","courseNameAbbrv":"Robot","curriculumKey":"ROBOTCODE","courseKey":"ROBOTCODEv2329ceCHOb","sectionArray":["ROBOTCODEv2329ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-07-18T11:59:00.000Z","courseDateEnd":"2022-07-22T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"33","termId":"202223","weekId":"202229","courseTilePath":"FFALSE"}]`
/*4wks x 3rows */ let fauxCoursesGetJSON = `[{"_id":"3562","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323bCHOb","sectionArray":["KICKOFFv2323bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","weekNameCardinal":"1","weekDateStartAbbrv":"Jun 6","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"K-2","gradeLevelFullArray":[0,1,2],"weight":1000},{"_id":"3563","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323ceCHOb","sectionArray":["KICKOFFv2323ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","weekNameCardinal":"1","weekDateStartAbbrv":"Jun 6","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"3-5","gradeLevelFullArray":[3,4,5],"weight":1001},{"_id":"3564","courseNameDisplay":"Kickoff Camp","courseName":"Kickoff Camp","courseNameAbbrv":"z_STRING_z","curriculumKey":"KICKOFF","courseKey":"KICKOFFv2323fhCHOb","sectionArray":["KICKOFFv2323fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-06T11:59:00.000Z","courseDateEnd":"2022-06-10T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3510","termId":"202223","weekId":"202223","weekNameCardinal":"1","weekDateStartAbbrv":"Jun 6","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"6-8","gradeLevelFullArray":[6,7,8],"weight":1002},{"_id":"3572","courseNameDisplay":"Biosphere Challenge","courseName":"Biosphere Challenge","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOSPHERE","courseKey":"BIOSPHEREv2324cfCHOa","sectionArray":["BIOSPHEREv2324cfCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL36","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"3520","termId":"202223","weekId":"202224","weekNameCardinal":"2","weekDateStartAbbrv":"Jun 13","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Incubator","gradeLevelHuman":"3-6","gradeLevelFullArray":[3,4,5,6],"weight":2004},{"_id":"3565","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2324bCHOb","sectionArray":["CERAMICSv2324bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202224","weekNameCardinal":"2","weekDateStartAbbrv":"Jun 13","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"K-2","gradeLevelFullArray":[0,1,2],"weight":2005},{"_id":"3568","courseNameDisplay":"Flight Technology:Gliders, Rockets and Drones","courseName":"Flight Technology:Gliders, Rockets and Drones","courseNameAbbrv":"Flight","curriculumKey":"FLIGHTTECH","courseKey":"FLIGHTTECHv2324ceCHOb","sectionArray":["FLIGHTTECHv2324ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-13T11:59:00.000Z","courseDateEnd":"2022-06-17T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"23","termId":"202223","weekId":"202224","weekNameCardinal":"2","weekDateStartAbbrv":"Jun 13","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"3-5","gradeLevelFullArray":[3,4,5],"weight":2007},{"_id":"3578","courseNameDisplay":"Architecture","courseName":"Architecture","courseNameAbbrv":"z_STRING_z","curriculumKey":"ARCHITECT","courseKey":"ARCHITECTv2325fhCHOb","sectionArray":["ARCHITECTv2325fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3500","termId":"202223","weekId":"202225","weekNameCardinal":"3","weekDateStartAbbrv":"Jun 20","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"6-8","gradeLevelFullArray":[6,7,8],"weight":3012},{"_id":"3583","courseNameDisplay":"Biomechanics in Sports & Trick Shots","courseName":"Biomechanics Lab","courseNameAbbrv":"z_STRING_z","curriculumKey":"BIOMECH","courseKey":"BIOMECHv2325ceCHOb","sectionArray":["BIOMECHv2325ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3509","termId":"202223","weekId":"202225","weekNameCardinal":"3","weekDateStartAbbrv":"Jun 20","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"3-5","gradeLevelFullArray":[3,4,5],"weight":3013},{"_id":"3582","courseNameDisplay":"Superhero Science","courseName":"Superhero Science","courseNameAbbrv":"z_STRING_z","curriculumKey":"SUPERHERO","courseKey":"SUPERHEROv2325bCHOb","sectionArray":["SUPERHEROv2325bCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-20T11:59:00.000Z","courseDateEnd":"2022-06-24T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"3514","termId":"202223","weekId":"202225","weekNameCardinal":"3","weekDateStartAbbrv":"Jun 20","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"K-2","gradeLevelFullArray":[0,1,2],"weight":3022},{"_id":"3586","courseNameDisplay":"Ceramics","courseName":"Ceramics","courseNameAbbrv":"Ceramics","curriculumKey":"CERAMICS","courseKey":"CERAMICSv2326fhCHOb","sectionArray":["CERAMICSv2326fhCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL68","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"20","termId":"202223","weekId":"202226","weekNameCardinal":"4","weekDateStartAbbrv":"Jun 27","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"6-8","gradeLevelFullArray":[6,7,8],"weight":4023},{"_id":"3584","courseNameDisplay":"Forensics Detectives","courseName":"Forensics","courseNameAbbrv":"Forensics","curriculumKey":"FORENSICS","courseKey":"FORENSICSv2326ceCHOb","sectionArray":["FORENSICSv2326ceCHOb1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"08:00:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"FD","jCal":"NNULL","gradeLevelKey":"GL35","locationName":"Charlottesville Catholic School","locationKey":"CHOb","courseRegionKey":"CHO","curriculumId":"24","termId":"202223","weekId":"202226","weekNameCardinal":"4","weekDateStartAbbrv":"Jun 27","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"FD","weekTimeBlockSpanString":"9:00am to 5:00pm","locationNameCommon":"Cville Catholic","gradeLevelHuman":"3-5","gradeLevelFullArray":[3,4,5],"weight":4024},{"_id":"3587","courseNameDisplay":"Inventing","courseName":"Inventing","courseNameAbbrv":"Invent","curriculumKey":"INVENT","courseKey":"INVENTv2326bCHOa","sectionArray":["INVENTv2326bCHOa1"],"sectionCount":"1","courseDateStart":"2022-06-27T11:59:00.000Z","courseDateEnd":"2022-07-01T11:59:00.000Z","couseTimeStart":"09:00:00.000","courseTimeDuration":"03:30:00.000","courseDaysOfWeek":"1,2,3,4,5","courseOptions":"HD,AM","jCal":"NNULL","gradeLevelKey":"GL02","locationName":"STEAM Incubator","locationKey":"CHOa","courseRegionKey":"CHO","curriculumId":"50","termId":"202223","weekId":"202226","weekNameCardinal":"4","weekDateStartAbbrv":"Jun 27","weekDaysOfWeekString":"Mon, Tue, Wed, Thu, Fri","weekTimeBlockKey":"AM","weekTimeBlockSpanString":"9:00am to 12:30pm","locationNameCommon":"Incubator","gradeLevelHuman":"K-2","gradeLevelFullArray":[0,1,2],"weight":4025}]`

// /*9wks x 3rows */ let fauxCoursesGetJSON = ``
    // ø ¯\_(ツ)_/¯ changed weight to weekCardinal * 1000 + index
    memory.setItem('memoryWorkingBackupObject',fauxCoursesGetJSON)

    console.log(`groupEnd: fetchRepeaterDataOnReady()`)
    console.groupEnd()
    // return responseObject
}

function cleanUpOnReady(){
    let usage = 'when there are bloated wix-Storage elements that should be destroyed for memory conservation'
}

function wixStorageDisplayOnReady(){
    let usage = 'when there are simple display elements based on previously wix-Stored data elements'
}

function codeKludgeFirstOnReady(){
    // console.groupCollapsed(`codeKludgeFirstOnReady()`)
    console.group(`codeKludgeFirstOnReady()`)
    $w('#develAreaBtN').expand()
    let paramObject = JSON.parse(memory.getItem('memoryParamObject'))
    $w('#developerResponseTXTBX').value = JSON.stringify(paramObject,undefined,4)
    if(paramObject.termId !== 202223 || paramObject.regionKey !== 'CHO'){
        $w('#developerResponseTXTBX').value = 'INVALID PARAMETER OBJECT:\n=========================\n'
         + $w('#developerResponseTXTBX').value
        $w('#develSTRP').expand()
    }

    console.log(`groupEnd: codeKludgeFirstOnReady()`)
    console.groupEnd()

    // $w('#developerResponseTXTBX').value = JSON.stringify(JSON.parse(memory.getItem('memoryWorkingBackupObject')),undefined,4)
}
function codeKludgeLastOnReady(){
    console.groupCollapsed(`codeKludgeLastOnReady()`)
    // console.group(`codeKludgeLastOnReady()`)
    
    let usage = 'nothing right now'

    console.log(`groupEnd: codeKludgeLastOnReady()`)
    console.groupEnd()
}

// ø LOAD_COURSES_ON_READY_00a_setUpOnReady
function setUpOnReady(){
    // console.group(`setUpOnReady()`)
    console.groupCollapsed(`setUpOnReady()`)
    let doxObject = {}
    doxObject.colCount = 9
    doxObject.repeaterWixId = '#weekOneCourseGridRPTR'
    let attributeThis = {}
    doxObject.attributeArray = []
    attributeThis = {}
    attributeThis.name = 'documentation'
    attributeThis.wId = 'DOX'
    attributeThis.notes = []
	attributeThis.notes.push(`USAGE: optional`)
	attributeThis.notes.push(`↪ Some use cases it would be overkill ie 'Terms' three of them, just brute-force-it`)
	attributeThis.notes.push(`↪ Some use cases it would be a sanity-saver ie 'Family' PrimaryParent, Secondary, 1+Children`)
	attributeThis.notes.push(`CONVENTION:`)
	attributeThis.notes.push(`.name = 'the repeater attribute object attribute name'`)
	attributeThis.notes.push(`.wId = the $w() Element Id:`)
	attributeThis.notes.push(`↪ IF Full THEN include the '#'`)
	attributeThis.notes.push(`↪ ELSE-IF TYPE only then only the Type ('TXT','HTML','CNTNRBX' etc) `)
	attributeThis.notes.push(`↪ prefix with '#' and name attribute (above)`)
	attributeThis.notes.push(`↪ can Mix and Match`)
	attributeThis.notes.push(`↪ prefix with '#' and name attribute (above), can Mix and Match`)
	attributeThis.notes.push(`↪ '#' will indicate which is which`)
    doxObject.attributeArray.push(attributeThis)
    // ø <OPTIONAL>
    memory.setItem('memoryDoxObject', JSON.stringify(doxObject))
    console.log(`doxObject [object below]`)
    console.dir(doxObject)
    // ø </OPTIONAL>

    
    memory.setItem('memoryResponseObject', memory.getItem('memoryParamObject'))
	memory.setItem('memoryParamObject', JSON.stringify({"pipedBoolean":"ON_READY"}))
	// ¯\__  triggers _FILTER_ of no-Filter onReady()  __/¯
    console.log(`groupEnd: setUpOnReady()`)
    console.groupEnd()
}

// ø LOAD_COURSES_ON_READY_00c_instantiateRepeaterDataOnReady
function instantiateRepeaterDataOnReady(){
    /**
     * NOTE: with the use of an Image rather than Data per se, this block might get considerably more simple, 
     *       of course, the path to the image will be complex
     */
    // console.groupCollapsed(`instantiateRepeaterDataOnReady()`)
	console.group(`instantiateRepeaterDataOnReady()`)

    let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
    console.log(`allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'): FROM KLUDGE [array of objects below]`)
    console.dir(allCoursesWorkingObject)

    // const emptyCourseTilePath = 'https://static.wixstatic.com/media/523205_f29a8c1b82894bdcb1cde4f24607b15b~mv2.png'
    let weekDocDbJSON = `{"cardinalityLookupObject":{"1":"202223","2":"202224","3":"202225","4":"202226","5":"202228","6":"202229","7":"202230","8":"202231","9":"202232"},"202223":{"key":"1","name":"Week One","_id":202223,"dateEnd":"2022-06-10T11:59:59.999Z","dateStart":"2022-06-06T11:59:59.999Z","dateStartAbbrv":"Jun 6","dateStartFull":"Monday, June 6, 2022","dateStartSlash":"6/6/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk1","nameCardinal":"1","nameCommon":"Week 1","nameFull":"Week One","nameOrdinal":"1st","spanEnd":"2022-06-10T17:00:00.000Z","spanStart":"2022-06-06T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":1,"weekId":202223,"weekNotesInternal":["real note here","another real note here"],"weekNotesPublic":[]},"202224":{"key":"2","name":"Week Two","_id":202224,"dateEnd":"2022-06-17T11:59:59.999Z","dateStart":"2022-06-13T11:59:59.999Z","dateStartAbbrv":"Jun 13","dateStartFull":"Monday, June 13, 2022","dateStartSlash":"6/13/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk2","nameCardinal":"2","nameCommon":"Week 2","nameFull":"Week Two","nameOrdinal":"2nd","spanEnd":"2022-06-17T17:00:00.000Z","spanStart":"2022-06-13T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":2,"weekId":202224,"weekNotesInternal":["real note here","another real note here"],"weekNotesPublic":[]},"202225":{"key":"3","name":"Week Three","_id":202225,"dateEnd":"2022-06-24T11:59:59.999Z","dateStart":"2022-06-20T11:59:59.999Z","dateStartAbbrv":"Jun 20","dateStartFull":"Monday, June 20, 2022","dateStartSlash":"6/20/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk3","nameCardinal":"3","nameCommon":"Week 3","nameFull":"Week Three","nameOrdinal":"3rd","spanEnd":"2022-06-24T17:00:00.000Z","spanStart":"2022-06-20T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":3,"weekId":202225,"weekNotesInternal":["real note here","another real note here"],"weekNotesPublic":[]},"202226":{"key":"4","name":"Week Four","_id":202226,"dateEnd":"2022-07-01T11:59:59.999Z","dateStart":"2022-06-27T11:59:59.999Z","dateStartAbbrv":"Jun 27","dateStartFull":"Monday, June 27, 2022","dateStartSlash":"6/27/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk4","nameCardinal":"4","nameCommon":"Week 4","nameFull":"Week Four","nameOrdinal":"4th","spanEnd":"2022-07-01T17:00:00.000Z","spanStart":"2022-06-27T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":4,"weekId":202226,"weekNotesInternal":["next week off for July 4th"],"weekNotesPublic":["next week we'll be off for July 4th"]},"202228":{"key":"5","name":"Week Five","_id":202228,"dateEnd":"2022-07-15T11:59:59.999Z","dateStart":"2022-07-11T11:59:59.999Z","dateStartAbbrv":"Jul 11","dateStartFull":"Monday, July 11, 2022","dateStartSlash":"7/11/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk5","nameCardinal":"5","nameCommon":"Week 5","nameFull":"Week Five","nameOrdinal":"5th","spanEnd":"2022-07-15T17:00:00.000Z","spanStart":"2022-07-11T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":5,"weekId":202228,"weekNotesInternal":["previous week off for July 4th"],"weekNotesPublic":[]},"202229":{"key":"6","name":"Week Six","_id":202229,"dateEnd":"2022-07-22T11:59:59.999Z","dateStart":"2022-07-18T11:59:59.999Z","dateStartAbbrv":"Jul 18","dateStartFull":"Monday, July 18, 2022","dateStartSlash":"7/18/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk6","nameCardinal":"6","nameCommon":"Week 6","nameFull":"Week Six","nameOrdinal":"6th","spanEnd":"2022-07-22T17:00:00.000Z","spanStart":"2022-07-18T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":6,"weekId":202229,"weekNotesInternal":[],"weekNotesPublic":[]},"202230":{"key":"7","name":"Week Seven","_id":202230,"dateEnd":"2022-07-29T11:59:59.999Z","dateStart":"2022-07-25T11:59:59.999Z","dateStartAbbrv":"Jul 25","dateStartFull":"Monday, July 25, 2022","dateStartSlash":"7/25/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk7","nameCardinal":"7","nameCommon":"Week 7","nameFull":"Week Seven","nameOrdinal":"7th","spanEnd":"2022-07-29T17:00:00.000Z","spanStart":"2022-07-25T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":7,"weekId":202230,"weekNotesInternal":[],"weekNotesPublic":[]},"202231":{"key":"8","name":"Week Eight","_id":202231,"dateEnd":"2022-08-05T11:59:59.999Z","dateStart":"2022-08-01T11:59:59.999Z","dateStartAbbrv":"Aug 1","dateStartFull":"Monday, August 1, 2022","dateStartSlash":"8/1/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk8","nameCardinal":"8","nameCommon":"Week 8","nameFull":"Week Eight","nameOrdinal":"8th","spanEnd":"2022-08-05T17:00:00.000Z","spanStart":"2022-08-01T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":8,"weekId":202231,"weekNotesInternal":[],"weekNotesPublic":[]},"202232":{"key":"9","name":"Week Nine","_id":202232,"dateEnd":"2022-08-12T11:59:59.999Z","dateStart":"2022-08-8T11:59:59.999Z","dateStartAbbrv":"Aug 8","dateStartFull":"Monday, August 8, 2022","dateStartSlash":"8/8/2022","daysOfWeekJSArray":[1,2,3,4,5],"daysOfWeekString":"Mon, Tue, Wed, Thu, Fri","nameAcronym":"Wk9","nameCardinal":"9","nameCommon":"Week 9","nameFull":"Week Nine","nameOrdinal":"9th","spanEnd":"2022-08-12T17:00:00.000Z","spanStart":"2022-08-08T09:00:00.000Z","termId":202223,"FD":{"timeBlockKey":"FD","timeBlockName":"Full Day","timeBlockStartTime":"09:00:00","timeBlockEndTime":"17:00:00","timeBlockDuration":"08:00:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"8 hours","timeBlockSpanString":"9:00am to 5:00pm","timeBlockSpanStringAbbrv":"9 to 5"},"AM":{"timeBlockKey":"AM","timeBlockName":"Morning","timeBlockStartTime":"09:00:00","timeBlockEndTime":"12:30:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"9:00am","timeBlockEndTimeString":"12:30pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"9:00am to 12:30pm","timeBlockSpanStringAbbrv":"9:00 to 12:30"},"PM":{"timeBlockKey":"PM","timeBlockName":"Afternoon","timeBlockStartTime":"13:30","timeBlockEndTime":"17:00:00","timeBlockDuration":"03:30:00","timeBlockStartTimeString":"1:30pm","timeBlockEndTimeString":"5:00pm","timeBlockDurationString":"3.5 hours","timeBlockSpanString":"1:30pm to 5:00pm","timeBlockSpanStringAbbrv":"1:30 to 5:00"},"weekCardinal":9,"weekId":202232,"weekNotesInternal":[],"weekNotesPublic":[]},"weeksAllNotesInternal":["span values:Zulu as Local or?...","termId is the OuterKey - weekId is the Inner Key","cardinalityLookupObject is how to get all of this data from the drop-down 1,,2,3,4...","note how cardinalityLookupObject _skips_ weekId:202227","weeksAllNotesPublic and weekNotesPublic:just a simple string that can be displayed in a bullet list"],"weeksAllNotesPublic":[]}`
    let weekDoDbObject = JSON.parse(weekDocDbJSON) 
    let nineWeekTilePathArray = [
        'https://static.wixstatic.com/media/523205_f29a8c1b82894bdcb1cde4f24607b15b~mv2.png',
        'https://static.wixstatic.com/media/523205_114dd1e33fdb47119f781a64296e0ad2~mv2.png',
        'https://static.wixstatic.com/media/523205_7cacff88119943d8889f06fb62c7f121~mv2.png',
        'https://static.wixstatic.com/media/523205_c48fb09bc4e246058a93521d5180bec0~mv2.png',
        'https://static.wixstatic.com/media/523205_4b27ad1015cf4b4c9f0958c5e91ac73c~mv2.png',
        'https://static.wixstatic.com/media/523205_dfb3eaab0b144d6c9a91fd36126c99ff~mv2.png',
        'https://static.wixstatic.com/media/523205_18a1cce02a3040c6b3b5ef5d259b14bb~mv2.png',
        'https://static.wixstatic.com/media/523205_e63a8e0e85bb46a883a07c2daf73f50a~mv2.png',
        'https://static.wixstatic.com/media/523205_b355d14b63d0430aad1c34cbae135c57~mv2.png',
        'https://static.wixstatic.com/media/523205_71af9a284e194c708f9860845273aca9~mv2.png'
        ]
    // ]
    let alphabetPath2dArray = [
        ['A','https://static.wixstatic.com/media/523205_114dd1e33fdb47119f781a64296e0ad2~mv2.png'],
        ['B','https://static.wixstatic.com/media/523205_7cacff88119943d8889f06fb62c7f121~mv2.png'],
        ['C','https://static.wixstatic.com/media/523205_c48fb09bc4e246058a93521d5180bec0~mv2.png'],
        ['D','https://static.wixstatic.com/media/523205_4b27ad1015cf4b4c9f0958c5e91ac73c~mv2.png'],
        ['E','https://static.wixstatic.com/media/523205_dfb3eaab0b144d6c9a91fd36126c99ff~mv2.png'],
        ['F','https://static.wixstatic.com/media/523205_18a1cce02a3040c6b3b5ef5d259b14bb~mv2.png'],
        ['G','https://static.wixstatic.com/media/523205_e63a8e0e85bb46a883a07c2daf73f50a~mv2.png'],
        ['H','https://static.wixstatic.com/media/523205_b355d14b63d0430aad1c34cbae135c57~mv2.png'],
        ['I','https://static.wixstatic.com/media/523205_71af9a284e194c708f9860845273aca9~mv2.png'],
        ['J','https://static.wixstatic.com/media/523205_ba09afbd5d1945dfb2218a7953a8ff15~mv2.png'],
        ['K','https://static.wixstatic.com/media/523205_db9f7b3be60f4c1ea91a1fb4814a40e6~mv2.png'],
        ['L','https://static.wixstatic.com/media/523205_b37fa3b7e7c44cad8b6dd2dc682941f9~mv2.png'],
        ['M','https://static.wixstatic.com/media/523205_b8616176e53f4178945c37525720bf71~mv2.png'],
        ['N','https://static.wixstatic.com/media/523205_641f8447016542e8b4055046746dc887~mv2.png'],
        ['O','https://static.wixstatic.com/media/523205_2db0e20ef9c545bca30b45e61e57dcb3~mv2.png'],
        ['P','https://static.wixstatic.com/media/523205_795061ecbcb24c3c94ab558b01fa57bc~mv2.png'],
        ['Q','https://static.wixstatic.com/media/523205_2e90375d9f224a20b8ae6ab9e4a15a28~mv2.png'],
        ['R','https://static.wixstatic.com/media/523205_01d1e7e0cad143d0894a8dd04ae67b5c~mv2.png'],
        ['S','https://static.wixstatic.com/media/523205_29d37d6424ea4090b87cba4b872dbf55~mv2.png'],
        ['T','https://static.wixstatic.com/media/523205_3ed832ccb7244ac58434b185c9072168~mv2.png'],
        ['U','https://static.wixstatic.com/media/523205_22ce77d1585a4159b7bf6dbd3d859b90~mv2.png'],
        ['V','https://static.wixstatic.com/media/523205_c5ba8700874c4764893ae81e5d4ff514~mv2.png'],
        ['W','https://static.wixstatic.com/media/523205_559053b3b8504c21b9a6546cc2f8ea38~mv2.png'],
        ['X','https://static.wixstatic.com/media/523205_676e64b830d34a0e85b0eea3a311b4e7~mv2.png'],
        ['Y','https://static.wixstatic.com/media/523205_6d9818ec43b445848557e054944a0c48~mv2.png'],
        ['Z','https://static.wixstatic.com/media/523205_78078c0c1fa64bb8bccb5f9ee09df8fa~mv2.png']
    ]
    let doxObject = JSON.parse(memory.getItem('memoryDoxObject'))
    const colCount = doxObject.colCount
    let row = 777
    let col = 777
    let rowColKey = 777
    let natoImageIndexByCol = 777
    let weekImageIndex = 777
    for (let index = 0; index < allCoursesWorkingObject.length; index++) {
        const element = allCoursesWorkingObject[index];
        // ø  THIS IS WHERE THE INSTANTIATION WOULD TAKE PLACE
        // row = Math.floor(index / colCount) + 1
        // col = (index % colCount) + 1
        // let weekThis = weekDocDbJSON[(element.weekId).toString()]
        let weekThis = weekDoDbObject[(element.weekId).toString()]
        col = weekThis.weekCardinal
        console.log(`weekThis: [object below]`)
        console.dir(weekThis)
        // rowColKey = row * 100 + col
        natoImageIndexByCol = col
        weekImageIndex = col
        weekImageIndex = weekImageIndex < 1 ? 0 : weekImageIndex
        weekImageIndex = weekImageIndex > 9 ? 0 : weekImageIndex

        // element.row = row
        element.col = col
        // element.rowColKey = rowColKey
        element.courseTilePath = alphabetPath2dArray[natoImageIndexByCol][1]
        // element.courseTilePathOrig = element.courseTilePath
        // element.courseTilePath = element.courseTilePath.length < 30 ? nineWeekTilePathArray[weekImageIndex] : element.courseTilePath
        // element.courseTilePath = element.courseTilePath.length < 30 ? 'https://static.wixstatic.com/shapes/523205_cae6afdc0f5a4a7a8386dd0da17dd7b1.svg' : element.courseTilePath
        element.courseTilePath = element.courseTilePath.length < 30 ? 'https://static.wixstatic.com/shapes/523205_b13ff92018494d5aaa4bac8992f90d9d.svg' : element.courseTilePath
    }

    // console.log(`allCoursesWorkingObject [object below]`)
    // console.dir(allCoursesWorkingObject)

    memory.setItem('memoryWorkingBackupObject',JSON.stringify(allCoursesWorkingObject))
	$w('#developerResponseTXTBX').value = JSON.stringify(allCoursesWorkingObject,undefined,4)
	
	
	console.log(`groupEnd: instantiateRepeaterDataOnReady()`)
	console.groupEnd()
	composeFilterFormObject()
}
//==================================================             </OnReady Called Functions>
//==========================================================================================

//====================================================================================================
//============================================================            <Filter & Render Grid Block>
//====================================================================================================

//==========================================================================================
//==================================================                     <Filter Grid Logic>

// ø <---------- <composeFilterFormObject>  ---------->
// ø LOAD_COURSES_ON_READY_01_composeFilterFormObject_FUNGIBLE_OnReadyForceChangeNoFilter
// ø FILTER_COURSES_02_composeFilterFormObject
function composeFilterFormObject(){
	// console.groupCollapsed(`composeFilterFormObject()`)
	console.group(`composeFilterFormObject()`)
    const wIdSelectedGrade = '#develFauxDRPDN'
    const wIdSelectedWeek = '#develFauxDRPDN'
    const wIdSelectedLocation = '#develFauxDRPDN'
	let paramObjectFilterForm = {}
	paramObjectFilterForm.byWeek = $w(wIdSelectedWeek).value === 'NA' ? false : true
	// paramObjectFilterForm.byContainsDate = $w(wIdSelectedWeek).value === null ? false : true
	paramObjectFilterForm.byContainsDate = false
	paramObjectFilterForm.byGradeLevel = $w(wIdSelectedGrade).value === 'NA' ? false : true
	paramObjectFilterForm.byContainsGrade = $w(wIdSelectedGrade).value === 'NA' ? false : true
	// paramObjectFilterForm.byLocationKey = $w(wIdSelectedLocation).value.length === 0 ? false : true
	paramObjectFilterForm.byLocationKey = false
	paramObjectFilterForm.pipedBoolean = `${paramObjectFilterForm.byWeek}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byContainsDate}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byGradeLevel}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byContainsGrade}|`
	paramObjectFilterForm.pipedBoolean += `${paramObjectFilterForm.byLocationKey}`
	if(paramObjectFilterForm.byWeek){paramObjectFilterForm.weekCardinal = Number($w(wIdSelectedWeek).value); paramObjectFilterForm.weekId = 777777}
	// if(paramObjectFilterForm.byContainsDate){paramObjectFilterForm.containsDateISO = $w('#startDateDTPKR').value.toISOString()}
	if(paramObjectFilterForm.byGradeLevel){paramObjectFilterForm.gradeLevel = $w(wIdSelectedGrade).value}
	if(paramObjectFilterForm.byContainsGrade){paramObjectFilterForm.containsGrade = $w(wIdSelectedGrade).value}
	if(paramObjectFilterForm.byLocationKey){paramObjectFilterForm.locationKey = $w(wIdSelectedLocation).value}

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
//==================================================                    </Filter Grid Logic>
//==========================================================================================
 
//==========================================================================================
//==================================================                    <Render Course Grid>
// ø <---------- <applyFilterToBuffer>  ---------->
// ø LOAD_COURSES_ON_READY_02_applyFilterToBuffer_OnReadyForceAllCourses
// ø FILTER_COURSES_03_applyFilterToBuffer
function applyFilterToBuffer(paramObjectFilterForm){
	// console.groupCollapsed(`applyFilterToBuffer(paramObjectFilterForm)`)
	console.group(`applyFilterToBuffer(paramObjectFilterForm)`)
	console.log(`REACHED: applyFilterToBuffer(paramObjectFilterForm)`)

    // ø <UI-UX>
	// $w('#previewCourseBTN').hide()
    // ø </UI-UX>

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
    let filteredCourseBufferElement = {}
	let filteredCourseExcludedBuffer = []
	let filteringComplete = paramObjectFilterForm.pipedBoolean === "false|false|false|false|false" ? true : false
	if(filteringComplete){
		// filteredCourseBuffer = Object.keys(allCoursesWorkingObject)
        for (let index = 0; index < allCoursesWorkingObject.length; index++) {
            const element = allCoursesWorkingObject[index];
            filteredCourseBufferElement = {}
            filteredCourseBufferElement.index = index
            // filteredCourseBufferElement.row = element.row
            filteredCourseBufferElement.col = element.col
            filteredCourseBuffer.push(filteredCourseBufferElement)
        }

		filteredCourseExcludedBuffer = []
		console.log(`ALL_FALSE: filteredCourseBuffer: [array below]`)
		console.dir(filteredCourseBuffer)
		// // console.log(`LOAD_COURSE_REPEATER: evaluationPaginationAndLoadRepeater()`)
		console.log(`groupEnd: applyFilterToBuffer(paramObjectFilterForm)`)
		console.groupEnd()
		memory.setItem('memoryWorkingObject',JSON.stringify(filteredCourseBuffer))
		// evaluationPaginationAndLoadRepeater(true)
        rebuildBufferForGrid()
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
			// filteredCourseBuffer.push(index.toString())
            // const element = filteredCourseBuffer[index];
            filteredCourseBufferElement = {}
            filteredCourseBufferElement.index = index
            filteredCourseBufferElement.row = courseThis.row
            filteredCourseBufferElement.col = courseThis.col
            filteredCourseExcludedBuffer.push(filteredCourseBufferElement)

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
	rebuildBufferForGrid()
	// evaluationPaginationAndLoadRepeater(true)

}
// ø <---------- </applyFilterToBuffer> ---------->
 
// ø <---------- <rebuildBufferForGrid>  ---------->
// ø LOAD_COURSES_ON_READY_03_rebuildBufferForGrid_OnReadyForceAllCourses
function rebuildBufferForGrid(){
    // console.groupCollapsed(`applyFilterToBuffer(paramObjectFilterForm)`)
    // let colCount = 4
    let doxObject = JSON.parse(memory.getItem('memoryDoxObject'))
    let colCount = doxObject.colCount
	console.group(`rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
	console.log(`REACHED: rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
    let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
    console.log(`filteredCourseBuffer: [array below]`)
    console.dir(filteredCourseBuffer)
    let gridWeekMaxArray = /*cardinalWeeks, Zero will be Zero so Not Max*/[0,0,0,0,0,0,0,0,0,0]
    for (let index = 0; index < filteredCourseBuffer.length; index++) {
        const element = filteredCourseBuffer[index]
        gridWeekMaxArray[element.col]++
    }
    console.log(`gridWeekMaxArray: [array below]`)
    console.dir(gridWeekMaxArray)
    let rowCount = Math.max(...gridWeekMaxArray)
    console.log(`rowCount: ${rowCount}`)


    let gridRebuildCourseBuffer = []
    let gridRebuildCourseElementThis = {}
    let placedCourseIndexArray = []
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const rowThis = rowIndex + 1
        for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const colThis = colIndex + 1
            gridRebuildCourseElementThis = {}
            gridRebuildCourseElementThis.col = colThis
            gridRebuildCourseElementThis.row = rowThis
            gridRebuildCourseElementThis._id = `row${rowThis}col${colThis}`
            gridRebuildCourseElementThis.pointerIndex = null
            // ø <loop Buffer>
            for (let bufferIndex = 0; bufferIndex < filteredCourseBuffer.length; bufferIndex++) {
                const bufferElement = filteredCourseBuffer[bufferIndex]
                if(!placedCourseIndexArray.includes(bufferIndex)){
                    if(colThis === bufferElement.col){
                        // gridRebuildCourseElementThis.row = rowThis
                        placedCourseIndexArray.push(bufferIndex)
                        gridRebuildCourseElementThis.pointerIndex = bufferIndex
                        break
                    }
                }
            }
            // ø </loop Buffer>
            gridRebuildCourseBuffer.push(gridRebuildCourseElementThis)
        }
    }
    // console.log(`gridRebuildCourseBuffer: [array below]`)
    // console.dir(gridRebuildCourseBuffer)


    // let gridRowLasttArray = /*cardinalWeeks, Zero will be Zero so Not Max*/[0,0,0,0,0,0,0,0,0,0]
    // for (let index = 0; index < filteredCourseBuffer.length; index++) {
    //     const element = filteredCourseBuffer[index]
    //     element.row = gridRowLasttArray[element.col] + 1
    //     gridRowLasttArray[element.col] = element.row
    // }
    // console.log(`gridRowLasttArray: [array below]`)
    // console.dir(gridRowLasttArray)
    // let rows = Math.max(...gridRowLasttArray)
    // console.log(`rows: ${rows}`)
	// console.log(`ROW_APPLIED: filteredCourseBuffer: [array below]`)
	// console.dir(filteredCourseBuffer)
    // return
    memory.setItem('memoryWorkingObject',JSON.stringify(gridRebuildCourseBuffer))
	console.log(`GRID_APPLIED: gridRebuildCourseBuffer: [array below]`)
	console.dir(gridRebuildCourseBuffer)
	// console.log(`FILTER_APPLIED: filteredCourseExcludedBuffer: [array below]`)
	// console.dir(filteredCourseExcludedBuffer)

	console.log(`groupEnd: rebuildBufferForGrid(KLUDGEparamObjectFilterForm)`)
	console.groupEnd()
	// return
	evaluationPaginationAndLoadRepeater(true)

}
// ø <---------- </rebuildBufferForGrid> ---------->
 
// ø <---------- <evaluationPaginationAndLoadRepeater(forceRepaginate)>  ----------->
// ø LOAD_COURSES_ON_READY_04_evaluationPaginationAndLoadRepeater_OnReadyFirstEightCourses
// ø FILTER_COURSES_04_evaluationPaginationAndLoadRepeater
function evaluationPaginationAndLoadRepeater(forceRepaginate = false){
    // let nullCourseTile = {}
    // nullCourseTile._id = `row777col777`
    // nullCourseTile.courseKey = ''
    // nullCourseTile.courseTilePath = 'https://static.wixstatic.com/media/523205_f29a8c1b82894bdcb1cde4f24607b15b~mv2.png'
	// console.groupCollapsed(`evaluationPaginationAndLoadRepeater`)
	console.group(`evaluationPaginationAndLoadRepeater`)
    // console.log(`FORCE RETURN: not rendered`)
    // console.log(`groupEnd: evaluationPaginationAndLoadRepeater`)
	// console.groupEnd()
    // return

	let allCoursesWorkingObject = JSON.parse(memory.getItem('memoryWorkingBackupObject'))
	let filteredCourseBuffer = JSON.parse(memory.getItem('memoryWorkingObject'))
	// /* EVEN ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35","37","39","41"]
	// /* ODD ONLY DEMO: SUCCESS*/ let filteredCourseBuffer = ["0","2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36","38","40","42"]
	console.log(`allCoursesWorkingObject [array - from JSON.parse() below]`)
	console.dir(allCoursesWorkingObject)
	console.log(`filteredCourseBuffer [array - from JSON.parse() below]`)
	console.dir(filteredCourseBuffer)
	// console.log('return FORCE: evaluationPaginationAndLoadRepeater: just logs above')

	// const repeaterId = '#weekOneCourseGridRPTR'
	const repeaterIdWordArray = ['ZERO','One','Two','Three','Four','Five','Six','Seven','Eight','Nine']
	// const repeaterIdArray = ['ZERO','#weekOneCourseGridRPTR','#weekTwoCourseGridRPTR','#weekThreeCourseGridRPTR','#weekFourCourseGridRPTR','#weekFiveCourseGridRPTR','#weekSixCourseGridRPTR','#weekSevenCourseGridRPTR','#weekEightCourseGridRPTR','#weekNineCourseGridRPTR']
	// const paginationId = '#courseFilteredPGNTN'
	// let pageItemCount = 12
	// if(forceRepaginate === true || $w(paginationId).totalPages === 100){
	// 	// totalPages === 100 indicates default paginationObject
	// 	$w(paginationId).currentPage = 1
	// 	$w(paginationId).totalPages = Math.ceil(filteredCourseBuffer.length / pageItemCount);
	// }
	// let pageIndex = $w(paginationId).currentPage - 1
	// let offset = pageIndex * pageItemCount

    // ø <SKIP PAGINATION>
	let pageItemCount = 300
	let offset = 0
    // ø </SKIP PAGINATION>

	let repeaterCoursesWeekOneObjectArray = []
	let repeaterCoursesWeekTwoObjectArray = []
	let repeaterCoursesWeekThreeObjectArray = []
	let repeaterCoursesWeekFourObjectArray = []
	let repeaterCoursesWeekFiveObjectArray = []
	let repeaterCoursesWeekSixObjectArray = []
	let repeaterCoursesWeekSevenObjectArray = []
	let repeaterCoursesWeekEightObjectArray = []
	let repeaterCoursesWeekNineObjectArray = []
    let element = {}
    let courseThis = {}
	for (let rptrIndex = offset ; rptrIndex < pageItemCount + offset; rptrIndex++) {
		// const filteredPointerIndex = filteredCourseBuffer[rptrIndex]
        // const element = filteredCourseBuffer[rptrIndex];
        element = filteredCourseBuffer[rptrIndex]
        // console.log(`filteredCourseBuffer[${rptrIndex}]: element: [object below]`)
        // console.dir(element)
        if(typeof element !== 'undefined'){
            if(element.pointerIndex === null){
                // console.log(`BEFORE: nullCourseTile: [object below]`)
                // console.dir(nullCourseTile)
                // // nullCourseTile._id = element._id
                // nullCourseTile._id = 'nullTile' + rptrIndex.toString()
                // // nullCourseTile._id = filteredCourseBuffer[rptrIndex]._id
                // console.log(`AFTER: nullCourseTile: [object below]`)
                // console.dir(nullCourseTile)
                let nullCourseTile = {}
                nullCourseTile._id = element._id
                nullCourseTile.courseKey = ''
                // nullCourseTile.courseTilePath = 'https://static.wixstatic.com/media/523205_f29a8c1b82894bdcb1cde4f24607b15b~mv2.png'
                // nullCourseTile.courseTilePath = 'https://static.wixstatic.com/shapes/523205_5e0b4cb0cbbd4049b1ca866f47b3c187.svg'
                // nullCourseTile.courseTilePath = 'https://static.wixstatic.com/shapes/523205_73371bf457694ccfb5bf69314b8937ab.svg'
                nullCourseTile.courseTilePath = 'https://static.wixstatic.com/shapes/523205_4a88418e1df2431ea63e2c7b0ddfb57c.svg'
                courseThis = nullCourseTile
                // repeaterCoursesWeekOneObjectArray.push(nullCourseTile)	
            }else{

                courseThis = allCoursesWorkingObject[element.pointerIndex]
                // courseThis = allCoursesWorkingObject[element.pointerIndex]
                // repeaterCoursesWeekOneObjectArray.push(allCoursesWorkingObject[element.pointerIndex])	
            }
        }else{
            break
        }
        switch (element.col) {
            case 1:
                repeaterCoursesWeekOneObjectArray.push(courseThis)	
                break;
            case 2:
                repeaterCoursesWeekTwoObjectArray.push(courseThis)	
                break;
            case 3:
                repeaterCoursesWeekThreeObjectArray.push(courseThis)	
                break;
            case 4:
                repeaterCoursesWeekFourObjectArray.push(courseThis)	
                break;
            case 5:
                repeaterCoursesWeekFiveObjectArray.push(courseThis)	
                break;
            case 6:
                repeaterCoursesWeekSixObjectArray.push(courseThis)	
                break;
            case 7:
                repeaterCoursesWeekSevenObjectArray.push(courseThis)	
                break;
            case 8:
                repeaterCoursesWeekEightObjectArray.push(courseThis)	
                break;
            case 9:
                repeaterCoursesWeekNineObjectArray.push(courseThis)	
                break;
        
            default:
                console.log(`switch: ${element.col} [element.col] is not supported at this time`)
                break;
        }
	}
	// console.log(`After SWITCH: repeaterCoursesWeekOneObjectArray: [array below]`)
	// console.dir(repeaterCoursesWeekOneObjectArray)
	// console.log(`After SWITCH: repeaterCoursesWeekFiveObjectArray: [array below]`)
	// console.dir(repeaterCoursesWeekFiveObjectArray)
	// console.log(`After SWITCH: repeaterCoursesWeekSixObjectArray: [array below]`)
	// console.dir(repeaterCoursesWeekSixObjectArray)
	
    evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[1], repeaterCoursesWeekOneObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[2], repeaterCoursesWeekTwoObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[3], repeaterCoursesWeekThreeObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[4], repeaterCoursesWeekFourObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[5], repeaterCoursesWeekFiveObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[6], repeaterCoursesWeekSixObjectArray, forceRepaginate)
    // evaluationPaginationAndLoadRepeaterThis(repeaterIdWordArray[7], repeaterCoursesWeekSevenObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterButtonThis(repeaterIdWordArray[7], repeaterCoursesWeekEightObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterButtonThis(repeaterIdWordArray[8], repeaterCoursesWeekEightObjectArray, forceRepaginate)
    evaluationPaginationAndLoadRepeaterButtonThis(repeaterIdWordArray[9], repeaterCoursesWeekNineObjectArray, forceRepaginate)

	// $w(repeaterId).data = repeaterCoursesWeekOneObjectArray;
	// // console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// // console.dir($w(repeaterId).data)
    // const wIdCourseTileIMG = '#courseTileIMG'
    // const wIdcourseTopTXT = '#courseTopTXT'
    // // • REDUNDANCY IS A GOOD THING

	// $w(repeaterId).onItemReady( ($courseElement, courseElementData, index) => {
	// 	$courseElement(wIdcourseTopTXT).text = courseElementData.courseKey
	// 	$courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath
	// });
	console.log(`groupEnd: evaluationPaginationAndLoadRepeater`)
	console.groupEnd()

}
// ø <---------- </evaluationPaginationAndLoadRepeater(forceRepaginate)> ----------->
// ø <---------- <evaluationPaginationAndLoadRepeaterThis(wIdRPTR,forceRepaginate)>  ----------->
// ø LOAD_COURSES_ON_READY_04a_evaluationPaginationAndLoadRepeaterThis_OnReadyFirstEightCourses
function evaluationPaginationAndLoadRepeaterThis(wIdWord = 'STRING', repeaterCoursesObjectArray = [], forceRepaginate = false){
    console.groupCollapsed(`evaluationPaginationAndLoadRepeaterThis`)
	// console.group(`evaluationPaginationAndLoadRepeaterThis`)
    let wIdRPTR = `#week${wIdWord}CourseGridRPTR`
    $w(wIdRPTR).data = repeaterCoursesObjectArray
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)
    const wIdCourseTileIMG = `#courseTile${wIdWord}IMG`
    const wIdcourseTopTXT = `#courseTop${wIdWord}TXT`
    // • REDUNDANCY IS A GOOD THING

	$w(wIdRPTR).onItemReady( ($courseElement, courseElementData, index) => {
		$courseElement(wIdcourseTopTXT).text = courseElementData.courseKey
		$courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath
	});

    console.log(`groupEnd: evaluationPaginationAndLoadRepeaterThis`)
	console.groupEnd()
}
// ø <---------- </evaluationPaginationAndLoadRepeaterThis(wIdRPTR,forceRepaginate)> ----------->
// ø <---------- <evaluationPaginationAndLoadRepeaterButtonThis(wIdRPTR,forceRepaginate)>  ----------->
// ø LOAD_COURSES_ON_READY_04a_evaluationPaginationAndLoadRepeaterThis_OnReadyFirstEightCourses BUTTON
function evaluationPaginationAndLoadRepeaterButtonThis(wIdWord = 'STRING', repeaterCoursesObjectArray = [], forceRepaginate = false){
    // console.groupCollapsed(`evaluationPaginationAndLoadRepeaterThis`)
	console.group(`evaluationPaginationAndLoadRepeaterButtonThis`)
    console.log(`wIdWord: ${wIdWord}`)
    let wIdRPTR = `#week${wIdWord}CourseGridRPTR`
    $w(wIdRPTR).data = repeaterCoursesObjectArray
	// console.log(`$w(repeaterId).data: $w(${repeaterId}).data:`)
	// console.dir($w(repeaterId).data)
    const wIdCourseTileIMG = `#courseTile${wIdWord}IMG`
    const wIdcourseTopTXT = `#courseTop${wIdWord}TXT`
    const supportedwIdWordArray = ['Seven','Eight','Nine']
    // • REDUNDANCY IS A GOOD THING
	$w(wIdRPTR).onItemReady( ($courseElement, courseElementData, index) => {
        // $courseElement is the "$w" of the Repeater Element 'Canvas'
        // courseElementData is the JSON element of the Repeater Datat (from collection or direct JSON)
		$courseElement(wIdcourseTopTXT).text = courseElementData.courseKey
		// $courseElement(wIdCourseTileIMG).src = courseElementData.courseTilePath

        // if(wIdWord === 'Eight' || wIdWord === 'Nine'){
        if(supportedwIdWordArray.includes(wIdWord)){
            console.log(`courseElementData [${index}]:`)
            console.dir(courseElementData)
            let svgIconArray = []
            // ø all Icons sourse: /Users/brad/Documents/bradRepositories/vsCode/snippets/svg
            // svgIconArray.push('https://static.wixstatic.com/shapes/523205_37802f6990194c648b6eba4488d9223f.svg')
            // ¯\_(blueCircle.svg)_/¯
            svgIconArray.push('https://static.wixstatic.com/shapes/523205_f7b397a850974e35aa4bcd62106f5d40.svg')
            // ¯\_(blueSquare_01LineCourseTemplate.svg)_/¯
            // svgIconArray.push('https://static.wixstatic.com/shapes/523205_f79820a4899348e293b508bf3f585960.svg')
            // ¯\_(redDiamond.svg)_/¯
            svgIconArray.push('https://static.wixstatic.com/shapes/523205_77715813e0474657bfd41dbcd378c95d.svg')
            // ¯\_(blueSquare_02LineCourseTemplate.svg)_/¯
            // svgIconArray.push('https://static.wixstatic.com/shapes/523205_af56185bc0bf4a53a22c506b32a78605.svg')
            // ¯\_(purpleTriangle.svg)_/¯
            svgIconArray.push('https://static.wixstatic.com/shapes/523205_cb81ffa08c574708b610215b18e676ab.svg')
            // ¯\_(blueSquare_03LineCourseTemplate.svg)_/¯
            let backgroundColorArray = ['#d9e1f2','#fce4d6','#e2efda','#dad2e9']
            let borderColorArray = ['#ff0000','#00ff00','#0000ff','#ff00ff']
            let labelColorArray = ['#ff0000','#aa00ff','#0000ff']
            // let labelArray = ['Marcy','Chester','Marais','CeeCee','Shirley']
            let labelArray = ['3 Spots Left','New Section Added','Wait-List Only','CeeCee','Shirley']
            // let backgroundColorArray = ['#d9e1f2','#fce4d6','#dad2e9']
            // console.log(`backgroundColorArray: ${backgroundColorArray}`)
            // console.log(`backgroundColorArray[index % backgroundColorArray.length]: backgroundColorArray[${index} % ${backgroundColorArray.length}]: ${backgroundColorArray[index % backgroundColorArray.length]}`)
            // let backgroundColorThis = backgroundColorArray[index % backgroundColorArray.length]
            // let backgroundColorThis = backgroundColorArray[index]
            // $courseElement(`#courseTile${wIdWord}BTTN`).style.backgroundColor = backgroundColorThis
            $courseElement(`#courseTile${wIdWord}BTTN`).style.backgroundColor = backgroundColorArray[index % backgroundColorArray.length]
            $courseElement(`#courseTile${wIdWord}BTTN`).style.borderColor = borderColorArray[index % borderColorArray.length]
            // $w(`#courseTile${wIdWord}BTTN`).style.borderRadius = '#fce4d6'
            $courseElement(`#courseTile${wIdWord}BTTN`).style.borderWidth = '3px'
            $courseElement(`#courseTile${wIdWord}BTTN`).style.color = labelColorArray[index % labelColorArray.length]//TEXT COLOR
            // $courseElement(`#courseTile${wIdWord}BTTN`).icon = 'https://static.wixstatic.com/shapes/523205_4a88418e1df2431ea63e2c7b0ddfb57c.svg'
            if(wIdWord === 'Eight' || wIdWord === 'Nine'){
                $courseElement(`#courseTile${wIdWord}BTTN`).icon = svgIconArray[index % svgIconArray.length]
            }

            $courseElement(`#courseTile${wIdWord}BTTN`).label = labelArray[index % labelArray.length]
            console.log(`$courseElement(#courseTile${wIdWord}BTTN) [${index}]:`)
            console.dir($courseElement(`#courseTile${wIdWord}BTTN`))

            $courseElement(wIdCourseTileIMG).src = svgIconArray[index % svgIconArray.length]
        }

	});

    console.log(`groupEnd: evaluationPaginationAndLoadRepeaterButtonThis`)
	console.groupEnd()
}
// ø <---------- </evaluationPaginationAndLoadRepeaterButtonThis(wIdRPTR,forceRepaginate)> ----------->
//==================================================                   </Render Course Grid>
//==========================================================================================
 
//====================================================================================================
//============================================================                    </Render Grid Block>
//====================================================================================================

//====================================================================================================
//============================================================               <Render Top Course Block>
//====================================================================================================

//==========================================================================================
//==================================================                     <Small Group Block>

// ø <---------- <lotsOfStuffHere( whichStuff = 'All of It')>  ---------->
function toggleTopCourseSection( whichStuff = 'All of It'){
    // console.log(`$w('#topSingleCourseSTRP').isVisible: ${$w('#topSingleCourseSTRP').isVisible}`)
    const isVisibleTopSingleCourse = $w('#topSingleCourseSTRP').isVisible
    if(isVisibleTopSingleCourse){
        // console.log(`$w('#topSingleCourseSTRP').isVisible: COLLAPSE`)
        $w('#topSingleCourseSTRP').collapse()
        $w('#topEmbedCourseContentSTRP').collapse()
        // $w("#topSingleCourseSTRP").collapse() 
        //     .then( () => {     
        //         $w('#topSingleCourseSTRP').show('roll')
        //     } ); 
        // $w('#topSingleCourseSTRP').hide()
        // $w("#topEmbedCourseContentSTRP").collapse() 
        //     .then( () => {     
        //         $w('#topEmbedCourseContentSTRP').show('roll')
        //     } ); 
        // $w('#topEmbedCourseContentSTRP').hide()
    }
    if(!isVisibleTopSingleCourse){
        // console.log(`!$w('#topSingleCourseSTRP').isVisible: EXPAND`)
        $w('#topSingleCourseSTRP').expand()
        $w('#topEmbedCourseContentSTRP').expand()
        // $w("#topSingleCourseSTRP").expand() 
        //     .then( () => {     
        //         $w('#topSingleCourseSTRP').show('roll')
        //     } ); 
        // $w("#topEmbedCourseContentSTRP").expand() 
        //     .then( () => {     
        //         $w('#topEmbedCourseContentSTRP').show('roll')
        //     } ); 
    }
    // $w('#topANCHR').scrollTo()
    wixWindow.scrollTo(100,125);

}
// ø <---------- </lotsOfStuffHere( whichStuff = 'All of It')> ---------->

//==================================================                    </Small Group Block>
//==========================================================================================

//====================================================================================================
//============================================================              </Render Top Course Block>
//====================================================================================================

//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================




/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function singleCourseContainerCNTRBX_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    toggleTopCourseSection() 
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function backToGridBTN_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    toggleTopCourseSection() 
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event
*/
export function develAreaBtN_click(event) {
	if($w('#develSTRP').isVisible){
        $w('#develSTRP').collapse()
    }else{
        $w('#develSTRP').expand()
    }
}