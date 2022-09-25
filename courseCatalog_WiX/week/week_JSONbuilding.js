// • QUICK_FIND
// •  _composeWeekDocDbJSON_
// • • _validateCurrentCoursesObjectArray_
// • • _buildCardinalityLookupObject_


// ø ====================================================================================================
// ø ================================================================================         <Call Code>
// ø ================================================================================          (constant)
// ø ====================================================================================================
const tzOffsetK = -6

import coursesCurrentObjectArray from /*CURRENT=>termId:202235;regionKey:CHO*/ '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/weekBuilder_coursesCurrent.json'
// import coursesCurrentObjectArray from /*WITH_ERRORS=>termId:202235;regionKey:CHO*/ '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/wERRORS_weekBuilder_coursesCurrent.json'

// export async function currentCoursesObjectArrayLog(){
//     console.warn(`coursesCurrentObjectArray:`)
//     console.warn(coursesCurrentObjectArray)
// }
// ø ====================================================================================================
// ø ================================================================================        </Call Code>
// ø ====================================================================================================

// ø ====================================================================================================
// ø ======================================================================          <Override Functions>
// ø ================================================================================          (constant)
// ø ====================================================================================================
export function composeDocDbJSON_byCurrentCoursesJSON(paramObject = {}){
    // ø paramObject expected to be empty, but not a bad thought
    return composeWeekDocDbJSON(paramObject)
}
export function composeDocDbJSON_byYear(year, tzOffset = tzOffsetK){
    // let StartDate = (new Date(year, 0, 1,0 + tzOffset,0,1))
    let StartDate = (new Date(year, 0, 1,0 + tzOffset,0,1))
    let StartDateISO = StartDate.toISOString()
    console.log(`composeDocDbJSON_byYear => StartDateISO: ${StartDateISO}`)
    let EndDate = (new Date(year, 11, 31,23 + tzOffset,59,59))
    let EndDateISO = EndDate.toISOString()
    console.log(`composeDocDbJSON_byYear => EndDateISO: ${EndDateISO}`)

    return composeDocDbJSON_byTerm(StartDate,EndDate)
}
export function composeDocDbJSON_byTerm(StartDate,EndDate){
    let paramObject = {}
    // paramObject.startDate = StartDate.toISOString()
    // paramObject.endDate = EndDate.toISOString()
    paramObject.startDate = StartDate
    paramObject.endDate = EndDate
    paramObject.startDateISO = StartDate.toISOString()
    paramObject.endDateISO = EndDate.toISOString()
    console.log(`composeDocDbJSON_byTerm => paramObject:`)
    console.log(JSON.stringify(paramObject,undefined,4))
    
    return composeWeekDocDbJSON_byParams(paramObject)
}
// ø ====================================================================================================
// ø ======================================================================         </Override Functions>
// ø ====================================================================================================

// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================          (constant)
// ø ====================================================================================================
// ø ====================================================================================================
function composeWeekDocDbJSON(paramObject = {}){
    // • <_composeWeekDocDbJSON_>
    console.log(`composeWeekDocDbJSON_byParams => paramObject:`)
    // console.log(paramObject)
    // console.log(JSON.stringify(paramObject,undefined,4))

    let responseObject = validateCurrentCoursesObjectArray(paramObject)
    if(responseObject.errorObject.errorLog.length > 0){
        return responseObject
    }
    // responseObject.responseObject = {}
    // responseObject.paramObject = paramObject
    responseObject.buildingBlocks = {}
    // ø <simple if Validation Passes>
    responseObject.buildingBlocks.termId = coursesCurrentObjectArray[0].termId
    responseObject.buildingBlocks.regionKey = coursesCurrentObjectArray[0].courseRegionKey
    // ø </simple if Validation Passes>
    responseObject.responseObject.cardinalityLookupObject = buildCardinalityLookupObject(paramObject)

    return responseObject
/**'
 * NOTES:
 * ? Will respond with all days of included weeks, but where 'dayInSpan' === 0 if need-be
 * ? that is, maybe some pre-days for a Year and maybe some post-days for a Year
 * ? there will (probably) NOT be an override where 'termId' is a parameter
 * ? • this is because this code _calculates_ termId and does not _consume_ termId
 * EVENTUALLY:
 * ? there will be a check for a Holidy in each Month, it can be marked as Not-Observed
 * ? • this is to confirm that the Holiday-DocDbJSON is valid
 * ? • a Holiday Element is a specific Day, but 'Days Off' can be a range of days
 * ? • • Xmas might be 3 days either side of the Day
 * ? • • July 4th was OBSERVED as July 5th in 2021
 * ? • Thanksgiving is was November 25th 2021 but often you will want to 'take-off' Wed, Thu & Fri
 * ? • Also, since programming can happen on Weekends, 'take-off' is more complicated:
 * ? • • again, with Thanksgiving: you wouldn't want to schedule for the Sat or Sun after as well
 * ? • • in particular STEAMDA has July 4th extend for the entire week
 * ? • • couter-intuitively, STEAMDA may hold programs _on_ a holiday:
 * ? • • • as quasi-day-care for a Holidy here or there that the school observes, but industry does not
 * ATTRIBUTES:
 * ? weekId: YYYYWW
 * ? termId: YYYYww of start date
 * ? cardinalWeek: 1,2,3... of whatever span
 * ? First Date of Week
 * ? Last Date of Week
 * ? Days of Week (probably [0,1,2,3,4,5,6], but maybe it is different)
 */
}


// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================          (constant)
// ø ============================================================     from file:weekId_YYYY_weekNumISO.js
// ø ==============================   path: /vsCode/snippets/javaScriptSnippets/weekId_YYYY_weekNumISO.js
// ø ====================================================================================================

function validateCurrentCoursesObjectArray(paramObject = {}){
    // • <_validateCurrentCoursesObjectArray_>
    let responseObject = {}
    responseObject.responseObject = {}
    responseObject.paramObject = paramObject
    responseObject.buildingBlocks = {}
    let errorObject = {}
    errorObject.errorLog = []
    errorObject.warningLog = []
    let logThis = {}
    // ø <termId is Valid>
    let termId = coursesCurrentObjectArray[0].termId
    const termIdEvery = coursesCurrentObjectArray.every((item) => {
        return item.termId === termId
    })
    
    // const termIdEvery = true
    if(termIdEvery !== true){
        logThis = {}
        logThis.title = `Current Courses have more than one 'termId' value`
        logThis.descr = `Current Courses have more than one 'termId' value`
        logThis.logic /*As String*/ = 'if(termIdEvery !== true)'
        errorObject.errorLog.push(logThis)
    }
    // ø </termId is Valid>
    // ø <regionKey is Valid>
    let regionKey = coursesCurrentObjectArray[0].courseRegionKey
    const regionKeyEvery = coursesCurrentObjectArray.every((item) => {
        return item.courseRegionKey === regionKey
    })
    
    // const regionKeyEvery = true
    if(regionKeyEvery !== true){
        logThis = {}
        logThis.title = `Current Courses have more than one 'regionKey' value`
        logThis.descr = `Current Courses have more than one 'regionKey' value`
        logThis.logic /*As String*/ = 'if(regionKeyEvery !== true)'
        errorObject.errorLog.push(logThis)
    }
    // ø </regionKey is Valid>
    // ø <regionKey is Supported>
    const supportedRegionKeyArray = [] // gather from SOMEWHERE or MANUALLY UPDATE
    if(1 === 2 && supportedRegionKeyArray.includes(regionKey) !== true){
        logThis = {}
        logThis.title = `Current Courses have an UnSupported 'regionKey' value`
        logThis.descr = `Current Courses have an UnSupported 'regionKey' value`
        logThis.logic /*As String*/ = 'if(1 === 2 && supportedRegionKeyArray.includes(regionKey) !== true)'
        errorObject.errorLog.push(logThis)
    }
    // ø </regionKey is Supported>
    responseObject.errorObject = errorObject
    return responseObject
}

function buildCardinalityLookupObject(paramObject, errorObject){
    // • <_buildCardinalityLookupObject_>

}


















// ø ====================================================================================================
// ø ================================================================================      <¿deprecated?>
function getTermId(startDate) {
    console.warn(`getTermId(startDate): getTermId(${startDate})`)
    return getWeekId(startDate)
}
function getWeekId(dateParam) {
    console.warn(`getWeekId(dateParam): getWeekId(${dateParam})`)
    // Copy date so don't modify original
    let dateResponse = new Date(Date.UTC(dateParam.getFullYear(), dateParam.getMonth(), dateParam.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    dateResponse.setUTCDate(dateResponse.getUTCDate() + 4 - (dateResponse.getUTCDay() || 7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(dateResponse.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil((((dateResponse - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    // return [dateResponse.getUTCFullYear(), weekNo];
    return dateResponse.getUTCFullYear() * 100 + weekNo;
}
// ø ================================================================================     </¿deprecated?>
// ø ====================================================================================================

// ø ====================================================================================================
// ø ================================================================================    </Function Code>
// ø ====================================================================================================


// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================       (¿deprecated?)
// ø ============================================================     from file:weekId_YYYY_weekNumISO.js
// ø ==============================   path: /vsCode/snippets/javaScriptSnippets/weekId_YYYY_weekNumISO.js
// ø ====================================================================================================
function composeWeekDocDbJSON_byParams(paramObject = {}){
    console.log(`composeWeekDocDbJSON_byParams => paramObject:`)
    // console.log(paramObject)
    // console.log(JSON.stringify(paramObject,undefined,4))
    let responseObject = {}
    responseObject.responseObject = {}
    responseObject.paramObject = paramObject
    responseObject.buildingBlocks = {}
    responseObject.buildingBlocks.termId = getTermId(paramObject.startDate)

    return responseObject
/**'
 * NOTES:
 * ! Will respond with all days of included weeks, but where 'dayInSpan' === 0 if need-be
 * ! that is, maybe some pre-days for a Year and maybe some post-days for a Year
 * ! there will (probably) NOT be an override where 'termId' is a parameter
 * ! • this is because this code _calculates_ termId and does not _consume_ termId
 * EVENTUALLY:
 * ! there will be a check for a Holidy in each Month, it can be marked as Not-Observed
 * ! • this is to confirm that the Holiday-DocDbJSON is valid
 * ! • a Holiday Element is a specific Day, but 'Days Off' can be a range of days
 * ! • • Xmas might be 3 days either side of the Day
 * ! • • July 4th was OBSERVED as July 5th in 2021
 * ! • Thanksgiving is was November 25th 2021 but often you will want to 'take-off' Wed, Thu & Fri
 * ! • Also, since programming can happen on Weekends, 'take-off' is more complicated:
 * ! • • again, with Thanksgiving: you wouldn't want to schedule for the Sat or Sun after as well
 * ! • • in particular STEAMDA has July 4th extend for the entire week
 * ! • • couter-intuitively, STEAMDA may hold programs _on_ a holiday:
 * ! • • • as quasi-day-care for a Holidy here or there that the school observes, but industry does not
 * ATTRIBUTES:
 * ! weekId: YYYYWW
 * ! termId: YYYYww of start date
 * ! cardinalWeek: 1,2,3... of whatever span
 * ! First Date of Week
 * ! Last Date of Week
 * ! Days of Week (probably [0,1,2,3,4,5,6], but maybe it is different)
 */
}
// ø ====================================================================================================
// ø ================================================================================    </Function Code>
// ø ================================================================================       (¿deprecated?)
// ø ====================================================================================================
