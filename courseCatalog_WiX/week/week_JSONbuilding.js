
// ø ====================================================================================================
// ø ================================================================================         <Call Code>
// ø ================================================================================          (constant)
// ø ====================================================================================================
// let YYYY = (new Date()).getFullYear
// let weekDocDbJSON = composeDocDbJSON_byYear(YYYY)

// ø ====================================================================================================
// ø ================================================================================        </Call Code>
// ø ====================================================================================================

// ø ====================================================================================================
// ø ======================================================================          <Override Functions>
// ø ================================================================================          (constant)
// ø ====================================================================================================
export function composeDocDbJSON_byYear(year, tzOffset = -6){
    // let StartDate = (new Date(year, 0, 1,0 + tzOffset,0,1))
    let StartDate = (new Date(year, 0, 1,0 + tzOffset,0,1)).toISOString()
    console.log(`composeDocDbJSON_byYear => StartDate: ${StartDate}`)
    let EndDate = (new Date(year, 11, 31,23 + tzOffset,59,59)).toISOString()
    console.log(`composeDocDbJSON_byYear => EndDate: ${EndDate}`)

    return composeDocDbJSON_byTerm(StartDate,EndDate)
}
export function composeDocDbJSON_byTerm(StartDate,EndDate){
    let paramObject = {}
    // paramObject.startDate = StartDate.toISOString()
    // paramObject.endDate = EndDate.toISOString()
    paramObject.startDate = StartDate
    paramObject.endDate = EndDate
    console.log(`composeDocDbJSON_byTerm => paramObject:`)
    console.log(JSON.stringify(paramObject,undefined,4))
    
    return composeWeekDocDbJSON(paramObject)
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
    console.log(`composeWeekDocDbJSON => paramObject:`)
    // console.log(paramObject)
    console.log(JSON.stringify(paramObject,undefined,4))
    let responseObject = {}
    responseObject.responseObject = {}
    responseObject.paramObject = paramObject
    return responseObject
/**'
 * NOTES:
 * • Will respond with all days of included weeks, but where 'dayInSpan' === 0 if need-be
 * • that is, maybe some pre-days for a Year and maybe some post-days for a Year
 * • there will (probably) NOT be an override where 'termId' is a parameter
 * • • this is because this code _calculates_ termId and does not _consume_ termId
 * EVENTUALLY:
 * • there will be a check for a Holidy in each Month, it can be marked as Not-Observed
 * • • this is to confirm that the Holiday-DocDbJSON is valid
 * • • a Holiday Element is a specific Day, but 'Days Off' can be a range of days
 * • • • Xmas might be 3 days either side of the Day
 * • • • July 4th was OBSERVED as July 5th in 2021
 * • • Thanksgiving is was November 25th 2021 but often you will want to 'take-off' Wed, Thu & Fri
 * • • Also, since programming can happen on Weekends, 'take-off' is more complicated:
 * • • • again, with Thanksgiving: you wouldn't want to schedule for the Sat or Sun after as well
 * • • • in particular STEAMDA has July 4th extend for the entire week
 * • • • couter-intuitively, STEAMDA may hold programs _on_ a holiday:
 * • • • • as quasi-day-care for a Holidy here or there that the school observes, but industry does not
 * ATTRIBUTES:
 * • weekId: YYYYWW
 * • termId: YYYYww of start date
 * • cardinalWeek: 1,2,3... of whatever span
 * • First Date of Week
 * • Last Date of Week
 * • Days of Week (probably [0,1,2,3,4,5,6], but maybe it is different)
 */
}
// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================          (constant)
// ø ============================================================     from file:weekId_YYYY_weekNumISO.js
// ø ==============================   path: /vsCode/snippets/javaScriptSnippets/weekId_YYYY_weekNumISO.js
// ø ====================================================================================================

function getWeekId(dateParam) {
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

// ø ====================================================================================================
// ø ================================================================================    </Function Code>
// ø ====================================================================================================
