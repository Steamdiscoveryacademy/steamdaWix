
// ø ====================================================================================================
// ø ================================================================================         <Call Code>
// ø ================================================================================          (constant)
// ø ====================================================================================================
 
// ø ====================================================================================================
// ø ================================================================================        </Call Code>
// ø ====================================================================================================
let YYYY = (new Date()).getFullYear
let weekDocDbJSON = composeWeekDocDbJSION(YYYY)
// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================          (constant)
// ø ====================================================================================================
// ø ====================================================================================================
function composeWeekDocDbJSION(year){
    // DO USE Variable Names based on Date-Finess Masking ('01' string vs 1 number etc)
    let dayCheck = -6 // ¿week will include day 1?
    let dateStartCheck = new Date(year,month,day)
    let weekIdCheck = getWeekId(dateStart)
    let dayStart = 1 
    let dateStartStart = new Date(year,month,day)
    let weekIdStart = getWeekId(dateStart)
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
