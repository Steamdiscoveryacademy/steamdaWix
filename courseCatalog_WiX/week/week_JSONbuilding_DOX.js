
import { composeDocDbJSON_byYear, composeDocDbJSON_byTerm } from '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/week_JSONbuilding.js'


// ø ====================================================================================================
// ø ================================================================================         <Call Code>
// ø ================================================================================          (constant)
// ø ====================================================================================================
// let doConsoleLogCurrentCourses = true
let doConsoleLogCurrentCourses = false
if(doConsoleLogCurrentCourses === true){
    await currentCoursesObjectArrayLog()
}

let which = 'ONE_OF_THESE'
which = 'YEAR'
// which = 'TERM'
// which = 'CURRENT_COURSES_JSON'
let resultObject = {}
if(which === 'YEAR'){
    // ø <CURRENT_COURSES_JSON>
    let YYYY = (new Date()).getFullYear()
    // console.log(`DOX => YYYY: [${typeof YYYY}] ${YYYY}`)
    resultObject = composeDocDbJSON_byYear(YYYY)
    // ø </CURRENT_COURSES_JSON>
}
if(which === 'YEAR'){
    // ø <YEAR>
    let YYYY = (new Date()).getFullYear()
    console.log(`DOX => YYYY: [${typeof YYYY}] ${YYYY}`)
    resultObject = composeDocDbJSON_byYear(YYYY)
    // ø </YEAR>
}
if(which === 'TERM'){
    // ø <TERM>
    /**
     * • for 202235
     * • • Start-Date is 9/6/2022
     * • • End-Date is 12/27/2022
     */
    let YYYY = (new Date()).getFullYear()
    console.log(`DOX => YYYY: [${typeof YYYY}] ${YYYY}`)
    resultObject = composeDocDbJSON_byTerm(StartDate,EndDate)
    // ø </TERM>
}
console.log(`DOX => resultObject: [${typeof resultObject}]`)
console.log(resultObject)
// console.log(JSON.stringify(resultObject,undefined,4))
// ø ====================================================================================================
// ø ================================================================================        </Call Code>
// ø ====================================================================================================
