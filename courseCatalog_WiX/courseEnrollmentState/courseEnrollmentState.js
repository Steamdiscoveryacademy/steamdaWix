// Filename: courseEnrollmentState.js
// ø <Putative IMPORTS> as of 20222-01-29T07:07:00
// ø ø CONTENT as of 20222-01-07T06:59:00
// ø ø Commented/Un-Commented as of 20222-01-07T06:59:00
// ø ø <WiX>
import {local, session, memory} from 'wix-storage';
import wixData from 'wix-data';
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import {fetch} from 'wix-fetch';
import {getJSON} from 'wix-fetch';
// ø ø </WiX>
// ø ø <NPM>
import { compareAsc, format } from 'date-fns'
// ø ø </NPM>
// • <import from> 'public/'
// • <import from> 'public/buttonBlockModule.js'
// import {addFrom_toggleExpandButtons} from 'public/buttonBlockModule.js'; 
// import {assignStringsOnReady} from 'public/buttonBlockModule.js'; 
// import {btnblkToggleBTN_click} from 'public/buttonBlockModule.js'; 
// import {btnblkDoBTN_click} from 'public/buttonBlockModule.js'; 
// • </import from> 'public/buttonBlockModule.js'
// • <import from> 'public/utilityModule.js'
// import {getWeekId} from 'public/utilityModule.js'; 
// import {courseKeyHuman} from 'public/utilityModule.js'; 
// import {getSourcedJSON_byKey} from 'public/utilityModule.js'; 
// import {getCurrentMemberObject} from 'public/utilityModule.js'; 
// import {stringToLinesDistrib} from 'public/utilityModule.js'; 
// • </import from> 'public/utilityModule.js'
// • <import from> 'public/inventoryDocDbJSON.js'
// import {datestampinventoryDocDbJSON} from 'public/inventoryDocDbJSON.js'
// import {getInventoryResponse} from 'public/inventoryDocDbJSON.js'
import {locationGetByRegionKey} from 'public/inventoryDocDbJSON.js'
// import {weeksGetByTermId} from 'public/inventoryDocDbJSON.js'
// import {gradeLevelGetCurrent} from 'public/inventoryDocDbJSON.js'
// • </import from> 'public/inventoryDocDbJSON.js'
// • <import from> 'public/timeCrunchModule.js'
// import {tempusFugit} from 'public/timeCrunchModule.js'
// import {timeCrunch} from 'public/timeCrunchModule.js'
// import {jsDaysOfWeekArrayToString} from 'public/timeCrunchModule.js'
// import {getEndDateFromSchedule_Start_Weeks_DaysOfWeek} from 'public/timeCrunchModule.js'
// • </import from> 'public/timeCrunchModule.js'
// • <import from> 'public/courseCatalogModule.js'
// import {sectionObjectEscapedJSON} from 'public/courseCatalogModule.js'
// import {fetchCoursesByTermIdRegionKey} from 'public/courseCatalogModule.js'
import {monadCourseEnrollmentStateUpSertByDrupalChanged} from 'public/courseCatalogModule.js'
// • </import from> 'public/courseCatalogModule.js'
// • <import from> 'public/apiObjectPrepModule.js'
// import {apiObjectPrep} from 'public/apiObjectPrepModule.js';
// import {CONSTRUCT_apiObject_POSTbyKind} from 'public/apiObjectPrepModule.js';
// import {utilityDirectParseDataIntoTemplate} from 'public/apiObjectPrepModule.js';
// • </import from> 'public/apiObjectPrepModule.js'
// import {adminDispatch} from 'public/adminDispatch.js';
import {getNatoPhoneticArrayObjectItem} from 'public/natoPhoneticTestData.js';
// • </import from> 'public/'
// • <import from> 'backend/'
import {getDrupalURI} from 'backend/apiDrupalModule.jsw';
// import {getDrupalNode} from 'backend/apiDrupalModule.jsw';
// import {postDrupalNode} from 'backend/apiDrupalModule.jsw';
// import {patchDrupalNode} from 'backend/apiDrupalModule.jsw';
// • </import from> 'backend/'
// ø </Putative IMPORTS>

$w.onReady(function () {
	doxKLUDGE(['reset'], true)
	wixWindow.scrollTo(100, 100);
});

export function datestampPublicFileName(yyyy = 2022, mm = 1, dd = 27) {
	let dateStamp = yyyy * 10000 + mm * 100 + dd;
    let returnstring = `This is a simple test of the Public File, 'Public File Name' by rendering the Date Stamp of it's deployment\n`
    returnstring += `Deployment occurred on the 27th day of January in the year 2022\n`
    returnstring += `Thus the calculated Date-Stamp is: ${dateStamp}\n`
    returnstring += `Note: you are free to 'mess' with the result by supplying non-default parameters`
}

// The following code demonstrates how to call the add
// function from your site's page code or site code.
/*
import {datestampPublicFileName} from 'public/publicFilesDOX.js'
// $w.onReady(function () {
//     datestampPublicFileNameOnReady()
// });
export function  datestampPublicFileNameOnReady() {
    console.groupCollapsed(`'Public File Name' date-stamp function DEMO`)
    let datestampStringResult = datestampPublicFileName();
    console.log(datestampStringResult);
    console.log(`groupEnd: 'Public File Name' date-stamp function DEMO`);
    console.groupEnd()
}
*/

//The following code demonstrates how to call the add
//function in one of your site's backend files.
/*
import {add} from 'public/publicFilesDOX.js'
export function usingFunctionFromPublic(a, b) {
	return add(a,b);
}
*/


/**
 * GENERAL DOX NOT JUST PUBLICK PAGES DEFAULT
 */
// ø QUICK_LIST: [all lists at top]
// ø CREATE_NEW_COURSE
// ø FILTER_COURSES
// ø EDIT_COURSES

// ø QUICK_LIST:
// ø CREATE_NEW_COURSE
// ø CREATE_NEW_COURSE_00_Click_PreviewBTN
// ø CREATE_NEW_COURSE_01_ValidateFormData
// ø CREATE_NEW_COURSE_02
// ø CREATE_NEW_COURSE_02_collectAndCalculateData [CREATE_NEW_COURSE_02_catchAndDisplayError]
// ø CREATE_NEW_COURSE_03_composeAndDisplayPreview
// ø CREATE_NEW_COURSE_04_Click_PostBTN
// ø CREATE_NEW_COURSE_05_newCourseDrupalPOST
// ø 

//==========================================================================================
//==================================================              <OnReady Called Functions>
// ø <Putative OnReady Functions> as of 20222-01-07T06:59:00
/**
 * 
    tempusFugitNextObject = tempusFugit()
    codeKludgeFirstOnReady()
    setUpOnReady()
    fetchRepeaterDataOnReady(true)
	instantiateRepeaterDataOnReady()
	// /buttonBlockModule/ assignStringsOnReady([2,3],[2,3])
	// /LIVE/wixUserPermissionsOnReady()
    /DEP_of_wixUserPermissions/ adminShowOnReady()
    // ø <UI-UX>
	wixWindow.scrollTo(100,125);
	wixStorageDisplayOnReady()	
    // ø </UI-UX>
    cleanUpOnReady()
    codeKludgeLastOnReady()
 * 
 */
// ø </Putative OnReady Functions>
//==================================================             </OnReady Called Functions>
//==========================================================================================

//====================================================================================================
//============================================================                         <ON_DECK Block>
//====================================================================================================

//==========================================================================================
//==================================================           <ON_DECK courseCatalogModule>

// ø <---------- <singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {})> ---------->
export async function singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {}){
    let drupalKeys = Object.keys(drupalCourse)
    if(drupalKeys.length === 0){
        let errorResponseObject = {}
        return errorResponseObject
    }
    let wixKeys = Object.keys(wixCourse)
    let wixCourseKind = 'UPDATE'
    if(wixKeys.length === 0){
        wixCourseKind = 'INSERT'
        // let wixCourseJsonINSERT = `{"sectionCount":1,"enrollExcptn":"NNULL","courseOptions":"DDEFAULT","enrollmentCount":0,"waitlistCount":0,"enrollmentCountAm":0,"enrollmentCountPm":0,"title":"DDEFAULT","nid":7777777,"termId":777777,"regionKey":"DLH","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"maxAm":0,"countFromFullAm":0,"reachedFullAm":false,"maxPm":0,"countFromFullPm":0,"reachedFullPm":false,"coutFromFull":777,"coutFromBlock":777}`
        // source: steamdaWixLocal/steamdaWix/courseCatalog_WiX/courseEnrollmentState/logs/2022-02-09T07:47:01_MIN_overrideCourseEnrollmentStateForINSERT.json
        let wixCourseJsonINSERT = `{"sectionCount":1,"enrollExcptn":"NNULL","courseOptions":"DDEFAULT","courseKey":"DDEFAULT","enrollmentCount":0,"waitlistCount":0,"enrollmentCountAm":0,"enrollmentCountPm":0,"title":"DDEFAULT","nid":7777777,"termId":777777,"regionKey":"DLH","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"maxAm":0,"countFromFullAm":0,"reachedFullAm":false,"maxPm":0,"countFromFullPm":0,"reachedFullPm":false,"coutFromFull":777,"coutFromBlock":777}`
        // source: steamdaWixLocal/steamdaWix/courseCatalog_WiX/courseEnrollmentState/logs/2022-02-09T10:44:01_MIN_overrideCourseEnrollmentStateForINSERT.json
        wixCourse = JSON.parse(wixCourseJsonINSERT)
        console.log(`wixCourse: JUST-PARSED: [object below]`)
        console.dir(wixCourse)
    }
    console.group(`singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {})`)
    await consoleLogProgress(drupalCourse, wixCourse, 'PARAM', wixCourseKind)
    // console.groupCollapsed(`singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {})`)
    // console.log(`wixCourse: ${wixCourseKind}: [object below]`)
    // console.dir(wixCourse)
    // console.log(`drupalCourse: PARAM [object below]`)
    // console.dir(drupalCourse)

    wixCourse.sectionCount = Number(drupalCourse.sectionCount)
    wixCourse.courseOptions = drupalCourse.courseOptions
    wixCourse.nid = Number(drupalCourse._id)
    wixCourse.termId = Number(drupalCourse.termId)
    wixCourse.regionKey = drupalCourse.courseRegionKey
    wixCourse.title = drupalCourse.courseNameDisplay
    wixCourse.courseKey = drupalCourse.courseKey
    // ø ø <TRY Non-UUID _id>
    wixCourse._id = drupalCourse._id + '_courseNid'
    // ø ø </TRY Non-UUID _id>
    // ø </TRANSFORM wixCourse by drupalCourse>
    // wixCourse.courseOptions = 'FD PM AM'

    const minK = 4
    const maxK = 12
    const waitListK = 10
    const maxBlockK = maxK + waitListK
    const maxAbsoluteK = 22
    let evalutateCourseOptions = "PENDING: courseOptions: AM-PM Stuff"
    let maxAmByCourseOption = (wixCourse.courseOptions).includes('AM') && (wixCourse.courseOptions).includes('FD') ? 2 : 0
    let maxPmByCourseOption = (wixCourse.courseOptions).includes('PM') && (wixCourse.courseOptions).includes('FD') ? 2 : 0
    const maxAmK = maxAmByCourseOption
    const maxPmK = maxPmByCourseOption

    let evalutateErnollExceptions = "PENDING: enrollExcptn"
    let doTheMath = "SectionCount as Multiplier => values of enrollExcptn OR Ks => assign Values Here"
    let evaluateExceptionThis = 'EEMPTY => until enrollExcptn has valid data'
    console.log(`evaluateExceptionThis: EEMPTY ≈186≈: ${evaluateExceptionThis}`)
    let supportedEnrollExcptnKeyArray = ['max','min','waitList','maxBlock','maxAbsolute','maxAm','maxPm']
    let enrollExcptnRAW = drupalCourse.enrollExcptn.toString()
    let enrollExcptnArrayOfKVP = enrollExcptnRAW.split(',')
    for (let indexExcptn = 0; indexExcptn < enrollExcptnArrayOfKVP.length; indexExcptn++) {
        const isOptionHalfDayAM = false//regex 'FD' then 'AM
        const isOptionHalfDayPM = false//regex 'FD' then 'PM
        const kvp = enrollExcptnArrayOfKVP[indexExcptn];
        const pair = kvp.split('=')
        if(pair.length === 2){
            if(supportedEnrollExcptnKeyArray.includes(pair[0])){
                let nonNegativeIntegerValue = Number(pair[1])
                console.log(`nonNegativeIntegerValue = Number(pair[1]): ${nonNegativeIntegerValue}`)
                nonNegativeIntegerValue = Math.floor(nonNegativeIntegerValue) === nonNegativeIntegerValue ? nonNegativeIntegerValue : -1
                nonNegativeIntegerValue = Math.abs(nonNegativeIntegerValue) === nonNegativeIntegerValue ? nonNegativeIntegerValue : -1
                if(nonNegativeIntegerValue !== -1){
                    evaluateExceptionThis = 'probably eval() a string => ELSE -1 below(or above)'
                }
            }
        }
        
    }
    console.log(`evaluateExceptionThis: if NOT still EEMPTY LOGIC PENDING ≈208≈:  ${evaluateExceptionThis}`)
    console.log(`drupalCourse.courseOptions: LOGIC PENDING ≈209≈: ${drupalCourse.courseOptions}`)

    // ø <DO_THE_MATH wixCourse by enrollExcptn and K-values>

    wixCourse.min = minK * wixCourse.sectionCount
    wixCourse.max = maxK * wixCourse.sectionCount
    wixCourse.waitList = waitListK * wixCourse.sectionCount
    wixCourse.maxBlock = (maxK + waitListK) * 1 // each component already multiplied 
    wixCourse.maxAbsolute = maxAbsoluteK * wixCourse.sectionCount
    wixCourse.maxAm = maxAmK * wixCourse.sectionCount
    wixCourse.maxPm = maxPmK * wixCourse.sectionCount
/*
    "enrollmentCount": 0,
    "waitlistCount": 0,
    "enrollmentCountAm": 0,
    "enrollmentCountPm": 0,

*/
/*    "countFromMin": 0,
    "countFromFull": 0,
    "countFromBlock": 0,
    "countFromAbsolute": 0,
    "countFromFullAm": 0,
    "countFromFullPm": 0,
*/
    // ø <Evaluate Cout-Froms>
    wixCourse.countFromMin = wixCourse.min - wixCourse.enrollmentCount > 0 ? wixCourse.min - wixCourse.enrollmentCount : 0
    wixCourse.countFromFull = wixCourse.max - wixCourse.enrollmentCount > 0 ? wixCourse.max - wixCourse.enrollmentCount : 0
    wixCourse.countFromBlock = wixCourse.maxBlock - (wixCourse.enrollmentCount + wixCourse.waitlistCount) > 0 ? wixCourse.maxBlock - (wixCourse.enrollmentCount + wixCourse.waitlistCount) : 0
    wixCourse.countFromAbsolute = wixCourse.maxAbsolute - (wixCourse.enrollmentCount + wixCourse.waitlistCount) > 0 ? wixCourse.maxAbsolute - (wixCourse.enrollmentCount + wixCourse.waitlistCount) : 0
    wixCourse.countFromFullAm = wixCourse.maxAm - wixCourse.enrollmentCountAm > 0 ? wixCourse.maxAm - wixCourse.enrollmentCountAm : 0
    wixCourse.countFromFullPm = wixCourse.maxPm - wixCourse.enrollmentCountPm > 0 ? wixCourse.maxPm - wixCourse.enrollmentCountPm : 0
    // ø </Evaluate Cout-Froms>
/*
    "reachedMin": false,
    "reachedFull": false,
    "reachedMaxBlocked": false,
    "reachedMaxAbsolute": false,
    "reachedFullAm": false,
    "reachedFullPm": false,
*/
    // ø <Evaluate Booleans>
    wixCourse.reachedMin = wixCourse.countFromMin === 0 ? true : false
    wixCourse.reachedFull = wixCourse.countFromFull === 0 ? true : false
    wixCourse.reachedMaxBlocked = wixCourse.countFromBlock === 0 ? true : false
    wixCourse.reachedMaxAbsolute = wixCourse.countFromAbsolute === 0 ? true : false
    wixCourse.reachedFullAm = wixCourse.countFromFullAm === 0 ? true : false
    wixCourse.reachedFullPm = wixCourse.countFromFullPm === 0 ? true : false
    // ø </Evaluate Booleans>

    await consoleLogProgress(drupalCourse, wixCourse, 'after MATH', 'after MATH')
    // ø </DO_THE_MATH wixCourse by enrollExcptn and K-values>


    // memory.setItem('memoryPrimaryResponseKLUDGE',JSON.stringify(wixCourse,undefined,4))
    // memory.setItem('memorySecondaryResponseKLUDGE',JSON.stringify(drupalCourse,undefined,4))
    let wixCourseJSON = JSON.stringify(wixCourse,undefined,4)   
    let drupalCourseJSON = JSON.stringify(drupalCourse,undefined,4)   
    memory.setItem('memoryPrimaryResponseKLUDGE',wixCourseJSON)
    memory.setItem('memorySecondaryResponseKLUDGE',drupalCourseJSON)


    console.log(`groupEnd: singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {})`)
    console.groupEnd()
}
// ø <---------- </singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {})> ---------->
// ø <---------- <courseEnrollmentStateIncrementByKVP_ON_DECK(key = 'STRING', value = 'STRING')> ---------->
function courseEnrollmentStateIncrementByKVP_ON_DECK(key = 'STRING', value = 'STRING'){
    let supportedPrimaryLikeKeyValueArray = ['nid','courseKey','_id']
    if(!supportedPrimaryLikeKeyValueArray.includes(key)){
        let errorObject = {}
        errorObject.errorBoolean = true
        errorObject.status = 'ERROR'
        errorObject.statusDescr = `Invalid key`
        errorObject.conditionFailureCode = `!supportedPrimaryLikeKeyValueArray.includes(key): !${supportedPrimaryLikeKeyValueArray}.includes(${key}): ${!supportedPrimaryLikeKeyValueArray.includes(key)}`
        // ø more?...
        return errorObject
    }
    let nidToNumber = key === 'nid' ? Number(value) : 77777777
    let courseEnrollmentStateRecord = {}
    courseEnrollmentStateRecord.descr  = 'HOLDER: for actual key-value single found Record'

    let TRY_courseEnrollmentState = courseEnrollmentStateIncrementByRecordObjectPassThru_ON_DECK(courseEnrollmentStateRecord.descr)
    let CATCH_noAction = typeof TRY_courseEnrollmentState.errorBoolean === 'boolean' && TRY_courseEnrollmentState.errorBoolean === true ? true : false
    if(CATCH_noAction){
        let noActionObject = {}
        noActionObject.noactionBoolean = true
        noActionObject.errorObject = TRY_courseEnrollmentState
        return noActionObject
    }
    return TRY_courseEnrollmentState
}
// ø <---------- </courseEnrollmentStateIncrementByKVP_ON_DECK(key = 'STRING', value = 'STRING')> ---------->
// ø <---------- <courseEnrollmentStateIncrementByRecordObject_ON_DECK(courseEnrollmentStateRecord = {})> ---------->
function courseEnrollmentStateIncrementByRecordObjectPassThru_ON_DECK(wixCourse = {}){
    // <NOTE>: change 'enrollmentCourseOption'=>STRING to an 'enrollmentParamObject'=>OBJECT as soon as another parameter emerges
    // let courseOption = enrollmentParamObject.courseOptions
    // </NOTE>: change 'enrollmentCourseOption'=>STRING to an 'enrollmentParamObject'=>OBJECT as soon as another parameter emerges
    // <NOTE>: Better: evaluate courseOption by wixCourse.courseOptions
    let courseOption = 'NA'
    courseOption = (wixCourse.courseOptions).includes('FD') ? 'FD' : courseOption
    courseOption = courseOption === 'FD' && (wixCourse.courseOptions).includes('AM') ? 'AM' : courseOption
    courseOption = courseOption === 'NA' && (wixCourse.courseOptions).includes('AM') ? 'AzM' : courseOption
    courseOption = courseOption === 'FD' && (wixCourse.courseOptions).includes('PM') ? 'PM' : courseOption
    courseOption = courseOption === 'NA' && (wixCourse.courseOptions).includes('PM') ? 'PzM' : courseOption
    // </NOTE>: Better: evaluate courseOption by wixCourse.courseOptions
    let supportedCourseOptionValueArray = ['FD','AM','PM','AzM','PzM']
    // ø NOTE: 'FD' and 'AzM' and 'PzM' are Logically Equivalent: Valid - Enrollment/Wait-List Increment Only - No Half-Day as Option Increments
    if(!supportedCourseOptionValueArray.includes(courseOption)){
        let errorObject = {}
        errorObject.errorBoolean = true
        errorObject.status = 'ERROR'
        errorObject.statusDescr = `Invalid courseOption`
        errorObject.conditionFailureCode = `!supportedCourseOptionValueArray.includes(courseOption): !${supportedCourseOptionValueArray}.includes(${courseOption}): ${!supportedCourseOptionValueArray.includes(courseOption)}`
        // ø more?...
        return errorObject
    }
    let enrollmentIncrement = 0
    let enrollmentIncrementAm = 0
    let enrollmentIncrementPm = 0
    let waitlistIncrement = 0
    if(wixCourse.reachedMaxAbsolute){
        let errorObject = {}
        errorObject.errorBoolean = true
        errorObject.status = 'ERROR'
        errorObject.statusDescr = `Reached Max Absolute`
        errorObject.conditionFailureCode = `wixCourse.reachedMaxAbsolute: ${wixCourse.reachedMaxAbsolute}`
        // ø more?...
        return errorObject
    }
    // ø REMEMBER => would be returned already if above
    if(wixCourse.reachedMaxBlocked){
        let errorObject = {}
        errorObject.errorBoolean = true
        errorObject.status = 'ERROR'
        errorObject.statusDescr = `Reached Max Blocked`
        errorObject.conditionFailureCode = `wixCourse.reachedMaxBlocked: ${wixCourse.reachedMaxBlocked}`
        // ø more?...
        return errorObject
    }
    // ø REMEMBER => would be returned already if above
    if(courseOption === 'AM' && wixCourse.reachedFullAm === true ){
        let errorObject = {}
        errorObject.errorBoolean = true
        errorObject.status = 'ERROR'
        errorObject.statusDescr = `Half-Day AM Option and Reached Full AM`
        errorObject.conditionFailureCode = `courseOption === 'AM' && wixCourse.reachedFullAm === true: ${courseOption} === 'AM' && ${wixCourse.reachedFullAm} === true`
        // ø more?...
        return errorObject
    }
    // ø REMEMBER => would be returned already if above
    if(courseOption === 'PM' && wixCourse.reachedFullPm === true ){
        let errorObject = {}
        errorObject.errorBoolean = true
        errorObject.status = 'ERROR'
        errorObject.statusDescr = `Half-Day PM Option and Reached Full PM`
        errorObject.conditionFailureCode = `courseOption === 'PM' && wixCourse.reachedFullPm === true: ${courseOption} === 'PM' && ${wixCourse.reachedFullPm} === true`
        // ø more?...
        return errorObject
    }
    // ø REMEMBER => would be returned already if above
    enrollmentIncrement = 1
    waitlistIncrement = 0
    if(wixCourse.reachedFull){
        enrollmentIncrement = 0
        waitlistIncrement = 1
    }
    if(courseOption === 'AM'){
        enrollmentIncrementAm = 1
    }
    if(courseOption === 'PM'){
        enrollmentIncrementPm = 1
    }
    // ø <Increment Arithmetic>
    wixCourse.enrollmentCount += enrollmentIncrement
    wixCourse.wixCourse.waitlistCount += waitlistIncrement
    wixCourse.enrollmentCountAm += enrollmentIncrementAm
    wixCourse.enrollmentCountPm += enrollmentIncrementPm
    // ø </Increment Arithmetic>
    // ø <Evaluate Cout-Froms>
    wixCourse.countFromMin = wixCourse.min - wixCourse.enrollmentCount > 0 ? wixCourse.min - wixCourse.enrollmentCount : 0
    wixCourse.countFromFull = wixCourse.max - wixCourse.enrollmentCount > 0 ? wixCourse.max - wixCourse.enrollmentCount : 0
    wixCourse.countFromBlock = wixCourse.maxBlock - (wixCourse.enrollmentCount + wixCourse.waitlistCount) > 0 ? wixCourse.maxBlock - (wixCourse.enrollmentCount + wixCourse.waitlistCount) : 0
    wixCourse.countFromAbsolute = wixCourse.maxAbsolute - (wixCourse.enrollmentCount + wixCourse.waitlistCount) > 0 ? wixCourse.maxAbsolute - (wixCourse.enrollmentCount + wixCourse.waitlistCount) : 0
    wixCourse.countFromFullAm = wixCourse.maxAm - wixCourse.enrollmentCountAm > 0 ? wixCourse.maxAm - wixCourse.enrollmentCountAm : 0
    wixCourse.countFromFullPm = wixCourse.maxPm - wixCourse.enrollmentCountPm > 0 ? wixCourse.maxPm - wixCourse.enrollmentCountPm : 0
    // ø </Evaluate Cout-Froms>
    // ø <Evaluate Booleans>
    wixCourse.reachedMin = wixCourse.countFromMin === 0 ? true : false
    wixCourse.reachedFull = wixCourse.countFromFull === 0 ? true : false
    wixCourse.reachedMaxBlocked = wixCourse.countFromBlock === 0 ? true : false
    wixCourse.reachedMaxAbsolute = wixCourse.countFromAbsolute === 0 ? true : false
    wixCourse.reachedFullAm = wixCourse.countFromFullAm === 0 ? true : false
    wixCourse.reachedFullPm = wixCourse.countFromFullPm === 0 ? true : false
    // ø </Evaluate Booleans>

}
// ø <---------- </courseEnrollmentStateIncrementByRecordObject_ON_DECK(courseEnrollmentStateRecord = {})> ---------->
async function consoleLogProgress(drupalCourse = {}, wixCourse = {}, drupalCourseTag = 'TAG', wixCourseTag = 'TAG'){
    console.log(`wixCourse: ${wixCourseTag}: [object below]`)
    console.dir(wixCourse)
    console.log(`drupalCourse: ${drupalCourseTag}: [object below]`)
    console.dir(drupalCourse)

}

//==================================================          </ON_DECK courseCatalogModule>
//==========================================================================================

//====================================================================================================
//============================================================                        </ON_DECK Block>
//====================================================================================================

//==========================================================================================
//============================================================                    <doKLUDGE>
//==========================================================================================

//==========================================================================================
//==================================================                  <KLUDGE Buttons Steps>
export function doKludgeBTTN_click_COPY_TO_NEW_EVENT_HANDLER(event) {
    let paramObject = {}
    let kludgeBooleanRADIO = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
    paramObject.kludgeBooleanRADIO = kludgeBooleanRADIO
    paramObject.whichKludgeDRPDWN = $w('#whichKludgeDRPDWN').value
    paramObject.developerResponseTXTBX = $w('#developerResponseTXTBX').value
    paramObject.developerDoxTXTBX = $w('#developerDoxTXTBX').value
    paramObject.developerSecondaryResponseTXTBX = $w('#developerSecondaryResponseTXTBX').value

	doKLUDGE(paramObject)
}
// KLUDGE BUTTON AS STEPS:
function doxKLUDGE(descrArray = [], resetForm = false) {

    
    if(resetForm){
        let isChecked = $w("#resetByDrpDwnSWTCH").checked;  // true
        // let which = 'API_DRUPAL_BACKEND_VIEW'//default
        // let which = 'MONAD_COURSE_ENROLLMENT'//default
        // let which = 'GET_DRUPAL_COURSES'//default
        let which = 'SAVE_WIX_COURSE'//default
        which = isChecked ? $w('#whichKludgeDRPDWN').value : which
        let paramsByTOPandBOTTOMotionsArray = []
        let responseIndex = -777
        let doxIndex = -776
        let doxString = ''
        switch (which) {
            case 'MONAD_COURSE_ENROLLMENT':
                $w("#resetByDrpDwnSWTCH").checked = false
                $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = 'MONAD_COURSE_ENROLLMENT'
                $w('#developerResponseTXTBX').value = '202123'
                $w('#developerDoxTXTBX').value = 'Check whether Course Enrollment Refresh is indicated for TermId & RegionKey'
                $w('#developerSecondaryResponseTXTBX').value = 'CHO'
                $w('#developerStepINPT').value = ''
                break;
            case 'RESET_MAX_CHANGED_RECORD':
                $w("#resetByDrpDwnSWTCH").checked = false
                $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = 'RESET_MAX_CHANGED_RECORD'
                $w('#developerResponseTXTBX').value = '202123'
                $w('#developerDoxTXTBX').value = `Toggle MaxChanged Record for TermId & RegionKey by 'Find' then 'Save'`
                $w('#developerSecondaryResponseTXTBX').value = 'CHO'
                $w('#developerStepINPT').value = 'BEGIN'
                break;
            case 'MANAGE_COURSE_STATE_DB':
                $w("#resetByDrpDwnSWTCH").checked = false
                $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = 'MANAGE_COURSE_STATE_DB'
                $w('#developerResponseTXTBX').value = '202123'
                $w('#developerDoxTXTBX').value = `Development of courseEnrollmentState Records Management Code`
                $w('#developerSecondaryResponseTXTBX').value = 'CHO'
                $w('#developerStepINPT').value = 'BEGIN'
                break;
            case 'GET_DRUPAL_COURSES':
                $w("#resetByDrpDwnSWTCH").checked = false
                $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = 'GET_DRUPAL_COURSES'
                $w('#developerResponseTXTBX').value = '202123'
                $w('#developerDoxTXTBX').value = `Use getDrupalURI(uri, false)`
                $w('#developerSecondaryResponseTXTBX').value = 'CHO'
                $w('#developerStepINPT').value = 'BEGIN'
                break;
            case 'SAVE_WIX_COURSE':
                $w("#resetByDrpDwnSWTCH").checked = false
                $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = 'SAVE_WIX_COURSE'
                $w('#developerResponseTXTBX').value = 'NNULL'
                doxString = 'Test: singletonCourseDrupalToWixUpsert_ON_DECK()'
                doxString += '\n' + `primaryResponseAsParam set to wixCourse JSON`
                doxString += '\n' + `↪ or 'NNULL' or <empty> for INSERT option`
                doxString += '\n' + `secondaryResponseAsParam set to drupalCourse 'nid'`
                doxString += '\n' + `click 'doKLUDGE' to Instantiate *actual* parameters`
                $w('#developerDoxTXTBX').value = doxString
                $w('#developerSecondaryResponseTXTBX').value = '3608'
                $w('#developerStepTXTBX').value = `BEGIN|click 'doKLUDGE' to Instantiate *actual* parameters`
                $w('#developerStepINPT').value = `BEGIN`
                break;
            default:
                $w("#resetByDrpDwnSWTCH").checked = false
                $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = ''
                $w('#developerResponseTXTBX').value = ''
                $w('#developerDoxTXTBX').value = ''
                $w('#developerSecondaryResponseTXTBX').value = ''
                $w('#developerStepINPT').value = ''
                break;
        }
        return
    }
    const doxWID = '#developerDoxTXTBX'
    let step = descrArray.shift()
    let KLUDGE = step + ':'
    descrArray.forEach(descrThis => {
        KLUDGE += '\n  - ' + descrThis
    });
    $w(doxWID).value = KLUDGE
}
export async function doKLUDGE(paramObject = {}) {
    const primaryResponseWID = '#developerResponseTXTBX'
    const secondaryResponseWID = '#developerSecondaryResponseTXTBX'
    const stepWID = '#developerStepINPT'
    const stepDescrWID = '#developerStepTXTBX'
    const stepAsParam = $w('#developerStepINPT').value
    const stepDescrAsParam = $w('#developerStepTXTBX').value
    const primaryResponseAsParam = $w('#developerResponseTXTBX').value
    const doxAsParam = $w('#developerDoxTXTBX').value
    const secondaryResponseAsParam = $w('#developerSecondaryResponseTXTBX').value
    let primaryResponse = null
    let secondaryResponse = null
    let KLUDGE = ''
    let step = KLUDGE
    let iso = '2022-01-07T10:21:00'
    let descrArray = []
    let keepMemoryKLUDGE = false
    if(paramObject.whichKludgeDRPDWN === 'PARAM_OBJECT'){
        {
            {
                KLUDGE = 'Form Values as paramObject'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-01-07T10:31:00'
                KLUDGE = 'for Developer to confirm that the Form values as paramObject are accurate'
                descrArray.push(KLUDGE)
                KLUDGE = `IS currently working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            $w(primaryResponseWID).value = JSON.stringify(paramObject,undefined,4)
            let locationResponse = locationGetByRegionKey('CHO')
            $w(secondaryResponseWID).value = JSON.stringify(locationResponse,undefined,4)
            primaryResponse = paramObject
            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'PARAM_OBJECT')
    if(paramObject.whichKludgeDRPDWN === 'MONAD_COURSE_ENROLLMENT'){
        {
            {
                KLUDGE = 'Development of monadCourseEnrollment'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-01-07T10:31:00'
                KLUDGE = 'for Developer to confirm that the Form values as paramObject are accurate'
                descrArray.push(KLUDGE)
                KLUDGE = `IS currently working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            primaryResponse = await monadCourseEnrollmentStateUpSertByDrupalChanged( primaryResponseAsParam , secondaryResponseAsParam)
            $w(primaryResponseWID).value = JSON.stringify(primaryResponse,undefined,4)
            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'MONAD_COURSE_ENROLLMENT')
    if(paramObject.whichKludgeDRPDWN === 'PROMISE_HELL'){
        {
            {
                KLUDGE = 'Promise HELL!'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-02-07T07:58:00'
                KLUDGE = `Promise HELL by 'Find' then 'Save'`
                descrArray.push(KLUDGE)
                KLUDGE = `is NOT currently working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            let primaryResponseRaw = wixData.query("courseMaxChangedTermIdRegionKey")
                .eq("termId", primaryResponseAsParam)
                .eq("courseRegionKey", secondaryResponseAsParam)
                .find()
                .then( (results) => {
                    // return results
                    if(results.items.length > 0) {
                        return results//results.items[0]; //see item below
                    } else {
                        return results//{"title":"Zero Found","message":"No matching courseMaxChangedTermIdRegionKey record found"}
                    }
                } )
                .catch( (err) => {
                    let errorMsg = err;
                } );

            console.log(`primaryResponseRaw: [object below]`)
            console.dir(primaryResponseRaw)
            let wixCourseMaxChangedRecord = await wixData.query("courseMaxChangedTermIdRegionKey")
                .eq("courseRegionKey", "CHO")
                .eq("termId", 202123)
                .find()
            console.log(`wixCourseMaxChangedRecord: [object below]`)
            console.dir(wixCourseMaxChangedRecord)


            primaryResponse = {"title":"Zero Found","message":"No matching courseMaxChangedTermIdRegionKey record found"}


            $w(primaryResponseWID).value = JSON.stringify(primaryResponse,undefined,4)

            let DOX = `let primaryResponseRaw = wixData.query("courseMaxChangedTermIdRegionKey")
                .eq("termId", ${primaryResponseAsParam})
                .eq("regionKey", ${secondaryResponseAsParam})
                .find()
                .then( (results) => {
                    return results
                    if(results.items.length > 0) {
                        return results.items[0]; //see item below
                    } else {
                        return {"title":"Zero Found","message":"No matching courseMaxChangedTermIdRegionKey record found"}
                    }
                } )
                .catch( (err) => {
                    let errorMsg = err;
                } );`

            $w(secondaryResponseWID).value = DOX

            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'PROMISE_HELL')
    if(paramObject.whichKludgeDRPDWN === 'RESET_MAX_CHANGED_RECORD'){
        {
            {
                KLUDGE = 'Development of MaxChanged Record Update'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-02-07T07:06:00'
                KLUDGE = `Toggle MaxChanged Record for TermId & RegionKey by 'Find' then 'Save'`
                descrArray.push(KLUDGE)
                KLUDGE = `IS currently working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            let collectionName = 'courseMaxChangedTermIdRegionKey'
            let innerStep = 'BEGIN'
            innerStep = stepAsParam.substr(0,6) === 'TOGGLE' ? 'TOGGLE' : innerStep
            innerStep = stepAsParam.substr(0,5) === 'AGAIN' ? 'AGAIN' : innerStep
            console.log(`innerStep: ${innerStep}`)
            primaryResponse = null
            let nextStep = `NNULL`
            if(innerStep === 'BEGIN') {
                let wixCourseMaxChangedResponse = await wixData.query(collectionName)
                    .eq("courseRegionKey", secondaryResponseAsParam)
                    .eq("termId", Number(primaryResponseAsParam))
                    .find()
                let wixCourseMaxChangedRecord = wixCourseMaxChangedResponse.items[0]
                console.log(`wixCourseMaxChangedRecord: [object below]`)
                console.dir(wixCourseMaxChangedRecord)


                primaryResponse = wixCourseMaxChangedResponse.items[0]

                nextStep = `TOGGLE|click 'doKLUDGE' again to Toggle ${primaryResponse.title}`
            }
            if(innerStep === 'TOGGLE') {
                let primaryResponseObject = JSON.parse(primaryResponseAsParam)
                let toggleOriginal = `{"termId":202123,"_id":"9c7e47a3-1052-4057-8325-cd8bded4d761","_owner":"523205d7-b40b-4478-90b5-8345dbe9e920","_createdDate":"2022-02-07T01:33:07.648Z","_updatedDate":"2022-02-07T01:34:03.713Z","isoLastUpdate":"2008-01-20T12:00:00+0000","courseRegionKey":"CHO","title":"KLUDGE202123CHO","courseKey":"BINARY","nid":1}`
                let toggleAlternate = `{"termId":202123,"_id":"9c7e47a3-1052-4057-8325-cd8bded4d761","_owner":"523205d7-b40b-4478-90b5-8345dbe9e920","_createdDate":"2022-02-07T01:33:07.648Z","_updatedDate":"2022-02-07T01:34:03.713Z","isoLastUpdate":"2008-01-20T12:00:00+0000","courseRegionKey":"CHO","title":"Toggled-202123CHO","courseKey":"RANDOM","nid":1}`
                let recordUpdateWhich = primaryResponseObject.title === "KLUDGE202123CHO" ? 'ALTERNATE' : 'ORIGINAL'
                let recordUpdateTo = primaryResponseObject.title === "KLUDGE202123CHO" ? JSON.parse(toggleAlternate) : JSON.parse(toggleOriginal)
                if(recordUpdateWhich === 'ALTERNATE'){
                    let natoPhoneticObjectItem = getNatoPhoneticArrayObjectItem()
                    console.log(`natoPhoneticObjectItem: [object below]]`)
                    console.dir(natoPhoneticObjectItem)
                    recordUpdateTo = JSON.parse(toggleAlternate)
                    recordUpdateTo.title = natoPhoneticObjectItem.perryMasonCase
                    recordUpdateTo.courseKey = natoPhoneticObjectItem.word
                    recordUpdateTo.isoLastUpdate = (new Date()).toISOString().substr(0,19) + '+0000'
                }
                if(recordUpdateWhich === 'ORIGINAL'){
                    recordUpdateTo = JSON.parse(toggleOriginal)
                }
                console.log(`primaryResponseObject.title: ${primaryResponseObject.title}`)
                console.log(`recordUpdateWhich: ${recordUpdateWhich}`)
                console.log(`recordUpdateTo: [object below]]`)
                console.dir(recordUpdateTo)

                wixData.save(collectionName, recordUpdateTo)

                let primaryResponseJSON = `{"title":"TOGGLE is Pending","message":"The Toggle Step of this Multi-Step-KLUDGE is still Pending"}`
                // primaryResponse = JSON.parse(primaryResponseJSON)
                primaryResponse = recordUpdateTo
                nextStep = `AGAIN?|click 'doKLUDGE' again to repeat this Multi-Step Toggle Sequence`
            }
            if(innerStep === 'AGAIN') {
                $w("#resetByDrpDwnSWTCH").checked = true
                // $w('#kludgeBooleanRADIO').value === 'false'
                $w('#whichKludgeDRPDWN').value = 'RESET_MAX_CHANGED_RECORD'
                // $w('#developerResponseTXTBX').value = '202123'
                // $w('#developerDoxTXTBX').value = `Toggle MaxChanged Record for TermId & RegionKey by 'Find' then 'Save'`
                // $w('#developerSecondaryResponseTXTBX').value = 'CHO'
                // nextStep = `AGAIN?|click 'doKLUDGE' again to repeat this Multi-Step Toggle Sequence`
                doxKLUDGE(['reset for AGAIN'], true)
                return
            }


            $w(primaryResponseWID).value = JSON.stringify(primaryResponse,undefined,4)


            $w(stepWID).value = nextStep //@ToDo stepTXTBX


            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'RESET_MAX_CHANGED_RECORD')
    if(paramObject.whichKludgeDRPDWN === 'MANAGE_COURSE_STATE_DB'){
        {
            {
                KLUDGE = 'Development of courseEnrollmentState Records Management Code'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-02-07T07:06:00'
                KLUDGE = `Manage CourseState Records for TermId & RegionKey by 'Find' then 'Save'`
                descrArray.push(KLUDGE)
                KLUDGE = `is currently NOT FULLY working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            let collectionName = 'courseEnrollmentState'
            let innerStep = 'BEGIN'
            innerStep = stepAsParam.substr(0,6) === 'TOGGLE' ? 'TOGGLE' : innerStep
            // innerStep = stepAsParam.substr(0,5) === 'AGAIN' ? 'AGAIN' : innerStep
            console.log(`innerStep: ${innerStep}`)
            primaryResponse = null
            let nextStep = `NNULL`
            if(innerStep === 'BEGIN') {
                let wixCourseEnrollmentStateResponse = await wixData.query(collectionName)
                    .limit(1000)
                    .eq("regionKey", secondaryResponseAsParam)
                    .eq("termId", Number(primaryResponseAsParam))
                    .find()
                console.log(`wixCourseEnrollmentStateResponse: [object below]`)
                console.dir(wixCourseEnrollmentStateResponse)
                // let wixCourseMaxChangedRecordArray = wixCourseMaxChangedResponse.items
                // console.log(`wixCourseMaxChangedRecordArray: [object below]`)
                // console.dir(wixCourseMaxChangedRecordArray)


                secondaryResponse = wixCourseEnrollmentStateResponse
                primaryResponse = wixCourseEnrollmentStateResponse.items

                nextStep = `TOGGLE|click 'doKLUDGE' again to Toggle primaryResponse.title`
            }
            if(innerStep === 'TOGGLE') {
                nextStep = `AGAIN?|click 'doKLUDGE' again to repeat this Multi-Step Toggle Sequence`
            }
            if(innerStep === 'AGAIN') {
                $w("#resetByDrpDwnSWTCH").checked = true
                $w('#whichKludgeDRPDWN').value = 'MANAGE_COURSE_STATE_DB'
                doxKLUDGE(['reset for AGAIN'], true)
                return
            }


            $w(primaryResponseWID).value = JSON.stringify(primaryResponse,undefined,4)
            $w(secondaryResponseWID).value = JSON.stringify(secondaryResponse,undefined,4)


            $w(stepWID).value = nextStep //@ToDo stepTXTBX

            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'MANAGE_COURSE_STATE_DB')
    if(paramObject.whichKludgeDRPDWN === 'GET_DRUPAL_COURSES'){
        {
            {
                KLUDGE = 'Development of courseEnrollmentState Records Management Code'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-02-07T07:06:00'
                KLUDGE = `Get Drupal Courses for TermId & RegionKey by 'Find' then 'Save'`
                descrArray.push(KLUDGE)
                KLUDGE = `YIKES! AM-PM in courseEnrollmentState Table!!!!!`
                descrArray.push(KLUDGE)
                KLUDGE = `is NOT currently working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            let collectionName = 'courseEnrollmentState'
            let innerStep = 'BEGIN'
            console.log(`stepAsParam.substr(0,4): ${stepAsParam}.substr(0,4): ${stepAsParam.substr(0,4)}`)
            innerStep = stepAsParam.substr(0,4) === 'PREP' ? 'PREP' : innerStep
            // innerStep = stepAsParam.substr(0,5) === 'AGAIN' ? 'AGAIN' : innerStep
            console.log(`innerStep: ${innerStep}`)
            primaryResponse = null
            let nextStep = `NNULL`
            let uri = `/wixcourses/${primaryResponseAsParam}/${secondaryResponseAsParam}`
            if(innerStep === 'BEGIN') {
                let drupalCoursesTidRkeyArray = await getDrupalURI(uri, false)
                let all202123CHO_courseNidIdArray = [3604,3605,3607,3608,3609,3546,3524,3525,3526,3527,3528,3529,3530,3545,3523,3606,361]
                let whiteList_courseNidIdArray = [3604]//[3605,3607,3608,3609,3546,3524,3525,3526,3527,3528,3529,3530,3545,3523,3606,361]
                // let whiteList_courseNidIdArray = [3604,3605,3607,3608,3609,3546]//[3524,3525,3526,3527,3528,3529,3530,3545,3523,3606,361]
                let blackList_courseNidIdArray = [3607] // has enrExcptn Values

                let limitedDrupalCoursesTidRkeyArray = []
                for (let indexAll = 0; indexAll < drupalCoursesTidRkeyArray.length; indexAll++) {
                    const course = drupalCoursesTidRkeyArray[indexAll];
                    course.nid = Number(course._id)
                    course.title = course.courseNameDisplay
                    course.regionKey = course.courseRegionKey
                    course.termId = Number(course.termId)
                    if(!blackList_courseNidIdArray.includes(course.nid)){
                        if(whiteList_courseNidIdArray.includes(course.nid)){
                            limitedDrupalCoursesTidRkeyArray.push(course)
                        }
                    }
                }
                    

                secondaryResponse = drupalCoursesTidRkeyArray

                primaryResponse = limitedDrupalCoursesTidRkeyArray

                nextStep = `PREP|click 'doKLUDGE' again to Toggle primaryResponse.title`
            }
            if(innerStep === 'PREP') {
                let drupalCourseObjectArray = JSON.parse(primaryResponseAsParam)
                console.log(`drupalCourseObjectArray: [object array below]`)
                console.dir(drupalCourseObjectArray)
                const minK = 4
                const maxK = 12
                const waitListK = 10
                const maxBlockK = maxK + waitListK
                const maxAbsoluteK = 22
                const maxAmK = 2
                const maxPmK = 2
                //steamdaWixLocal/steamdaWix/courseCatalog_WiX/courseEnrollmentState/logs/2022-02-08T12:33:00_MIN_overrideCourseEnrollmentStateForINSERT.json
                // let courseObjectJsonINSERT = `[{"sectionCount":0,"enrollmentCount":0,"waitlistCount":0,"enrollExcptn":"NNULL","nid":7777777,"termId":777777,"regionKey":"DLH","courseKey":"COURSE_KEY","title":"COURSE_NAME_DISPLAY","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"coutFromFull":7,"coutFromBlock":7}]`
                let courseObjectJsonINSERT = `{"sectionCount":0,"enrollmentCount":0,"waitlistCount":0,"enrollExcptn":"NNULL","nid":7777777,"termId":777777,"regionKey":"DLH","courseKey":"COURSE_KEY","title":"COURSE_NAME_DISPLAY","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"coutFromFull":7,"coutFromBlock":7}`
                let courseObjectINSERT = JSON.parse(courseObjectJsonINSERT)
                // console.log(`courseObjectINSERT: [object below]`)
                // console.dir(courseObjectINSERT)
                // primaryResponse = JSON.stringify(courseObjectINSERT,undefined,4)
                let courseKeysUPSERT = Object.keys(courseObjectINSERT)
                // secondaryResponse = `courseKeysUPSERT: [${courseKeysUPSERT}]`
                // console.log(`secondaryResponse: courseKeysUPSERT: ${courseKeysUPSERT}`)

                console.log('CURRENTLY: Not Checking => testing INSERT')
                for (let indexDrupalCourse = 0; indexDrupalCourse < drupalCourseObjectArray.length; indexDrupalCourse++) {
                    const drupalCourse = drupalCourseObjectArray[indexDrupalCourse];
                    console.log(`drupalCourse[${indexDrupalCourse}]: [object below]`)
                    console.dir(drupalCourse)
                    let evalutateErnollExceptions = "PENDING: enrollExcptn"
                    let evalutateCourseOptions = "PENDING: courseOptions: AM-PM Stuff"
                    let doTheMath = "SectionCount as Multiplier => values of enrollExcptn OR Ks => assign Values Here"
                    let supportedEnrollExcptnKeyArray = ['max','min','waitList','maxBlock','maxAbsolute','maxAm','maxPm']
                    let enrollExcptnRAW = drupalCourse.enrollExcptn
                    let enrollExcptnArrayOfKVP = enrollExcptnRAW.split(',')
                    for (let indexExcptn = 0; indexExcptn < enrollExcptnArrayOfKVP.length; indexExcptn++) {
                        const isOptionHalfDayAM = false//regex 'FD' then 'AM
                        const isOptionHalfDayPM = false//regex 'FD' then 'PM
                        const kvp = enrollExcptnArrayOfKVP[indexExcptn];
                        const pair = kvp.split('=')
                        if(pair.length === 2){
                            if(supportedEnrollExcptnKeyArray.includes(pair[0])){
                                let nonNegativeIntegerValue = Number(pair[1])
                                console.log(`nonNegativeIntegerValue = Number(pair[1]): ${nonNegativeIntegerValue}`)
                                nonNegativeIntegerValue = Math.floor(nonNegativeIntegerValue) === nonNegativeIntegerValue ? nonNegativeIntegerValue : -1
                                nonNegativeIntegerValue = Math.abs(nonNegativeIntegerValue) === nonNegativeIntegerValue ? nonNegativeIntegerValue : -1
                                if(nonNegativeIntegerValue !== -1){
                                    let evaluateExceptionThis = 'probably eval() a string => ELSE -1 below(or above)'
                                }
                            }
                        }
                        
                    }
                }


                nextStep = `AGAIN?|click 'doKLUDGE' again to repeat this Multi-Step Toggle Sequence`
            }
            if(innerStep === 'AGAIN') {
                $w("#resetByDrpDwnSWTCH").checked = true
                $w('#whichKludgeDRPDWN').value = 'GET_DRUPAL_COURSES'
                doxKLUDGE(['reset for AGAIN'], true)
                return
            }


            $w(primaryResponseWID).value = typeof primaryResponse === 'object' ? JSON.stringify(primaryResponse,undefined,4) : primaryResponse
            $w(secondaryResponseWID).value = typeof secondaryResponse === 'object' ? JSON.stringify(secondaryResponse,undefined,4) : secondaryResponse


            $w(stepWID).value = nextStep //@ToDo stepTXTBX

            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'GET_DRUPAL_COURSES')
    if(paramObject.whichKludgeDRPDWN === 'SAVE_WIX_COURSE'){
        {
            {
                KLUDGE = 'Development of courseEnrollmentState Records Management Code'
                step = KLUDGE
                descrArray = []
                descrArray.push(step)
                iso = '2022-02-07T07:06:00'
                KLUDGE = `Get Drupal Courses for TermId & RegionKey by 'Find' then 'Save'`
                descrArray.push(KLUDGE)
                KLUDGE = `YIKES! AM-PM in courseEnrollmentState Table!!!!!`
                descrArray.push(KLUDGE)
                KLUDGE = `is NOT currently working`
                descrArray.push(KLUDGE)
                KLUDGE = `[below always last]`
                KLUDGE = iso
                descrArray.push(KLUDGE)
                // ø <HERE - So that dox() will run regardless of Kludge-Code below>
                doxKLUDGE(descrArray)
                // ø </HERE - So that dox() will run regardless of Kludge-Code below>
            }
            let collectionName = 'courseEnrollmentState'
            let innerStep = 'BEGIN'
            console.log(`stepAsParam.substr(0,4): ${stepAsParam}.substr(0,4): ${stepAsParam.substr(0,4)}`)
            innerStep = stepAsParam.substr(0,4) === 'PREP' ? 'PREP' : innerStep
            innerStep = stepAsParam.substr(0,4) === 'SAVE' ? 'SAVE' : innerStep
            // innerStep = stepAsParam.substr(0,5) === 'AGAIN' ? 'AGAIN' : innerStep
            console.log(`innerStep: ${innerStep}`)
            primaryResponse = null
            let nextStep = `NNULL`
            let uri = `/wixcourses/${primaryResponseAsParam}/${secondaryResponseAsParam}`
            if(innerStep === 'BEGIN') {
                let uriSingleton = `/wixcoursesingleton/${secondaryResponseAsParam}`
                let nodeSingletonArray = await getDrupalURI(uriSingleton,false)
                // console.log(`≈1021≈ await getDrupalURI(uriSingleton,false): await getDrupalURI(${uriSingleton},false)`)
                // console.log(`≈1022≈ nodeSingletonArray: [object array singleton below]`)
                // console.dir(nodeSingletonArray)
                secondaryResponse = JSON.stringify(nodeSingletonArray[0],undefined,4)

                if(primaryResponseAsParam.substr(0,1) !== '{'){
                    primaryResponse = `{"_id":"INSTANTIATE","sectionCount":1,"enrollExcptn":"NNULL","courseOptions":"DDEFAULT","enrollmentCount":0,"waitlistCount":0,"enrollmentCountAm":0,"enrollmentCountPm":0,"title":"DDEFAULT","nid":7777777,"termId":777777,"regionKey":"DLH","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"maxAm":0,"countFromFullAm":0,"reachedFullAm":false,"maxPm":0,"countFromFullPm":0,"reachedFullPm":false,"coutFromFull":777,"coutFromBlock":777}`
                }

                nextStep = `PREP|click 'doKLUDGE' again execute wixData=>save() to courseEnrollState table`
            }
            if(innerStep === 'ZZZ_PREP') {
                let drupalCourseObjectArray = JSON.parse(primaryResponseAsParam)
                console.log(`drupalCourseObjectArray: [object array below]`)
                console.dir(drupalCourseObjectArray)
                const minK = 4
                const maxK = 12
                const waitListK = 10
                const maxBlockK = maxK + waitListK
                const maxAbsoluteK = 22
                const maxAmK = 2
                const maxPmK = 2
                //steamdaWixLocal/steamdaWix/courseCatalog_WiX/courseEnrollmentState/logs/2022-02-08T12:33:00_MIN_overrideCourseEnrollmentStateForINSERT.json
                // let courseObjectJsonINSERT = `[{"sectionCount":0,"enrollmentCount":0,"waitlistCount":0,"enrollExcptn":"NNULL","nid":7777777,"termId":777777,"regionKey":"DLH","courseKey":"COURSE_KEY","title":"COURSE_NAME_DISPLAY","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"coutFromFull":7,"coutFromBlock":7}]`
                let courseObjectJsonINSERT = `{"sectionCount":0,"enrollmentCount":0,"waitlistCount":0,"enrollExcptn":"NNULL","nid":7777777,"termId":777777,"regionKey":"DLH","courseKey":"COURSE_KEY","title":"COURSE_NAME_DISPLAY","min":0,"max":0,"waitList":0,"maxBlock":0,"maxAbsolute":0,"countFromMin":0,"countFromFull":0,"countFromBlock":0,"countFromAbsolute":0,"reachedMin":false,"reachedFull":false,"reachedMaxBlocked":false,"reachedMaxAbsolute":false,"coutFromFull":7,"coutFromBlock":7}`
                let courseObjectINSERT = JSON.parse(courseObjectJsonINSERT)
                // console.log(`courseObjectINSERT: [object below]`)
                // console.dir(courseObjectINSERT)
                // primaryResponse = JSON.stringify(courseObjectINSERT,undefined,4)
                let courseKeysUPSERT = Object.keys(courseObjectINSERT)
                // secondaryResponse = `courseKeysUPSERT: [${courseKeysUPSERT}]`
                // console.log(`secondaryResponse: courseKeysUPSERT: ${courseKeysUPSERT}`)

                console.log('CURRENTLY: Not Checking => testing INSERT')
                for (let indexDrupalCourse = 0; indexDrupalCourse < drupalCourseObjectArray.length; indexDrupalCourse++) {
                    const drupalCourse = drupalCourseObjectArray[indexDrupalCourse];
                    console.log(`drupalCourse[${indexDrupalCourse}]: [object below]`)
                    console.dir(drupalCourse)
                    let evalutateErnollExceptions = "PENDING: enrollExcptn"
                    let evalutateCourseOptions = "PENDING: courseOptions: AM-PM Stuff"
                    let doTheMath = "SectionCount as Multiplier => values of enrollExcptn OR Ks => assign Values Here"
                    let supportedEnrollExcptnKeyArray = ['max','min','waitList','maxBlock','maxAbsolute','maxAm','maxPm']
                    let enrollExcptnRAW = drupalCourse.enrollExcptn
                    let enrollExcptnArrayOfKVP = enrollExcptnRAW.split(',')
                    for (let indexExcptn = 0; indexExcptn < enrollExcptnArrayOfKVP.length; indexExcptn++) {
                        const isOptionHalfDayAM = false//regex 'FD' then 'AM
                        const isOptionHalfDayPM = false//regex 'FD' then 'PM
                        const kvp = enrollExcptnArrayOfKVP[indexExcptn];
                        const pair = kvp.split('=')
                        if(pair.length === 2){
                            if(supportedEnrollExcptnKeyArray.includes(pair[0])){
                                let nonNegativeIntegerValue = Number(pair[1])
                                console.log(`nonNegativeIntegerValue = Number(pair[1]): ${nonNegativeIntegerValue}`)
                                nonNegativeIntegerValue = Math.floor(nonNegativeIntegerValue) === nonNegativeIntegerValue ? nonNegativeIntegerValue : -1
                                nonNegativeIntegerValue = Math.abs(nonNegativeIntegerValue) === nonNegativeIntegerValue ? nonNegativeIntegerValue : -1
                                if(nonNegativeIntegerValue !== -1){
                                    let evaluateExceptionThis = 'probably eval() a string => ELSE -1 below(or above)'
                                }
                            }
                        }
                        
                    }
                }


                nextStep = `AGAIN?|click 'doKLUDGE' again to repeat this Multi-Step Toggle Sequence`
            }
            if(innerStep === 'PREP') {
                // let wixCourse = JSON.parse(primaryResponseAsParam)
                // console.log(`wixCourse: [object below]`)
                // console.dir(wixCourse)
                let drupalCourse = JSON.parse(secondaryResponseAsParam)
                // console.log(`drupalCourse: [object below]`)
                // console.dir(drupalCourse)
                // singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {}){
                await singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse)
                primaryResponse = memory.getItem('memoryPrimaryResponseKLUDGE')
                secondaryResponse = memory.getItem('memorySecondaryResponseKLUDGE')
                nextStep = `SAVE|click 'doKLUDGE' again to repeat this Multi-Step Toggle Sequence`
                // return
            }
            if(innerStep === 'SAVE') {
                // // let wixCourse = JSON.parse(primaryResponseAsParam)
                // // console.log(`wixCourse: [object below]`)
                // // console.dir(wixCourse)
                // let drupalCourse = JSON.parse(secondaryResponseAsParam)
                // // console.log(`drupalCourse: [object below]`)
                // // console.dir(drupalCourse)
                // // singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse = {}, wixCourse = {}){
                // await singletonCourseDrupalToWixUpsert_ON_DECK(drupalCourse)
                primaryResponse = `wixData.save(collectionName, wixCourse): wixData.save("${collectionName}", wixCourse)`
                primaryResponse += '\n' + `[wixCourse = memory.getItem('memoryPrimaryResponseKLUDGE')]`
                // secondaryResponse = `wixCourse.errorBoolean !== true && wixCourse.noactionBoolean !== true`
                // secondaryResponse = memory.getItem('memoryPrimaryResponseKLUDGE')
                // secondaryResponse = await wixData.save(collectionName, memory.getItem('memoryPrimaryResponseKLUDGE'))
                secondaryResponse = await wixData.save(collectionName, JSON.parse(memory.getItem('memoryPrimaryResponseKLUDGE')))
                nextStep = `AGAIN?|NOT Click 'Reset' to go again (at this time)`
                // return
            }
            if(innerStep === 'AGAIN') {
                $w("#resetByDrpDwnSWTCH").checked = true
                $w('#whichKludgeDRPDWN').value = 'SAVE_WIX_COURSE'
                doxKLUDGE(['reset for AGAIN'], true)
                return
            }


            $w(primaryResponseWID).value = typeof primaryResponse === 'object' ? JSON.stringify(primaryResponse,undefined,4) : primaryResponse
            $w(secondaryResponseWID).value = typeof secondaryResponse === 'object' ? JSON.stringify(secondaryResponse,undefined,4) : secondaryResponse


            $w(stepDescrWID).value = nextStep //@ToDo stepTXTBX
            $w(stepWID).value = (nextStep.split('|'))[0] //@ToDo stepTXTBX

            console.log(`primaryResponse: [object below]`)
            console.dir(primaryResponse)
            return
        }
    } // END: if(paramObject.whichKludgeDRPDWN === 'SAVE_WIX_COURSE')
    if(!keepMemoryKLUDGE){
        memory.removeItem('memoryPrimaryResponseKLUDGE')
        memory.removeItem('memorySecondaryResponseKLUDGE')
    }
    memory.removeItem('memoryResponseKLUDGE')//KLUDGE-CleanUp

}
export function doxKludgeResetBTTN_click(event) {
	doxKLUDGE(['reset'], true)
}

export function doKludgeBTTN_click(event) {
	let paramObject = {}
    let kludgeBooleanRADIO = $w('#kludgeBooleanRADIO').value === 'true' ? true : false
    paramObject.kludgeBooleanRADIO = kludgeBooleanRADIO
    paramObject.whichKludgeDRPDWN = $w('#whichKludgeDRPDWN').value
    paramObject.developerResponseTXTBX = $w('#developerResponseTXTBX').value
    paramObject.developerDoxTXTBX = $w('#developerDoxTXTBX').value
    paramObject.developerSecondaryResponseTXTBX = $w('#developerSecondaryResponseTXTBX').value

	doKLUDGE(paramObject)
}
//==================================================                 </KLUDGE Buttons Steps>
//==========================================================================================

//==========================================================================================
//============================================================                   </doKLUDGE>
//==========================================================================================

//====================================================================================================
//====================================================================================================
//============================================================                      Buttons ONLY Below
//============================================================                      (and other Events)
//====================================================================================================