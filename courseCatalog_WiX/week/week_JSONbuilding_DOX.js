
import { composeDocDbJSON_byCurrentCoursesJSON } from '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/week_JSONbuilding.js'

// let doConsoleLogCurrentCourses = true
let doConsoleLogCurrentCourses = false
if(doConsoleLogCurrentCourses === true){
    await currentCoursesObjectArrayLog()
}

// ø ====================================================================================================
// ø ================================================================================         <Call Code>
// ø ================================================================================   [Current Courses]
// ø ====================================================================================================

let which = 'ONE_OF_THESE'
// which = 'YEAR'
// which = 'TERM'
which = 'CURRENT_COURSES_JSON'
let resultObject = {}

if(which === 'CURRENT_COURSES_JSON'){
    // ø <CURRENT_COURSES_JSON>
    // let YYYY = (new Date()).getFullYear()
    // console.log(`DOX => YYYY: [${typeof YYYY}] ${YYYY}`)
    resultObject = composeDocDbJSON_byCurrentCoursesJSON()
    // ø </CURRENT_COURSES_JSON>
}

console.log(`DOX => resultObject: [${typeof resultObject}]`)
console.log(resultObject)
console.log(JSON.stringify(resultObject.responseObject))
// console.log(JSON.stringify(resultObject.responseObject.cardinalityLookupObject,undefined,4))
// console.log(JSON.stringify(resultObject,undefined,4))

// ø ====================================================================================================
// ø ================================================================================        </Call Code>
// ø ================================================================================  [/Current Courses]
// ø ====================================================================================================
