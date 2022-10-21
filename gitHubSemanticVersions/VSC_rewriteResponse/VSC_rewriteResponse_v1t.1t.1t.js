// ¡ VCS_rewriteRespons.js TEMPLATE from: GET_Courses_Update_daysOfWeekBin_and_CourseKey_by_TEST
// ¡ Major Version: 1t
// ¡ Minor Version: 1t (use case)
// ¡ Patch Version: 1t

import currentRestExport from '/Users/brad/Documents/bradRepositories/vsCode/Postman/STEAM_Drupal/20211109_SteamDA/GOLD_rigorous/Courses/GET_Courses_Update_daysOfWeekBin_and_CourseKey_by_TEST/source/currentRestExport.json'
import maxLastChangedObject from '/Users/brad/Documents/bradRepositories/vsCode/Postman/STEAM_Drupal/20211109_SteamDA/GOLD_rigorous/Courses/GET_Courses_Update_daysOfWeekBin_and_CourseKey_by_TEST/source/currentMaxLastChange.json'

// • ==========================================================================================
// • ============================================================        <SET & RUNNER PORTION>
const maxLastChanged = maxLastChangedObject[0].changed
const alphabetArray = 'zero,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',')

console.warn(`maxLastChanged: ${maxLastChanged}`)

let subsetOfArrayIndexArray = []
let subsetOfArray = false
if (subsetOfArray === true) {
    subsetOfArrayIndexArray = [0, 1, 2]
} else {
    console.warn(`currentRestExport[0]:`)
    console.warn(currentRestExport[0])
}

let currentRestExportInvalidChanged = currentRestExport.filter((elementObject) => {
    // maxLastChanged
    // elementObject.changed
    return maxLastChanged < elementObject.changed
})
console.warn(`currentRestExportInvalidChanged.length: ${currentRestExportInvalidChanged.length}`)
if (currentRestExportInvalidChanged.length > 0) {
    console.warn(`currentRestExportInvalidChanged: [array of objects below]`)
    console.log(currentRestExportInvalidChanged)
    throw new Error('currentRestExportInvalidChanged.length > 0')
}
let currentRestExportSubSet = []
if (subsetOfArray === true) {
    let index = 0
    currentRestExportSubSet = currentRestExport.filter((elementObject) => {
        let selected = subsetOfArrayIndexArray.includes(index)
        index++
        return selected
    })
}


if (subsetOfArray !== true) {
    currentRestExportSubSet = currentRestExport.filter((elementObject) => {
        return true
    })
}
console.warn(`currentRestExportSubSet[${currentRestExportSubSet.length}]:`)
console.warn(currentRestExportSubSet)
// throw new Error('¿Working To Here?')
let kontinue = true
// kontinue = false
// • ============================================================       </SET & RUNNER PORTION>
// • ==========================================================================================

// ø ==========================================================================================
// ø ============================================================          <MAIN LOGIC PORTION>
let elementResponseObjectArray = []
if (kontinue) {
    elementResponseObjectArray = currentRestExportSubSet.map((elementObject) => {
        const elementResponseObject = {}
        elementResponseObject.nid = elementObject.nid
        elementResponseObject.courseKey = elementObject.courseKey
        elementResponseObject.daysOfWeek = elementObject.daysOfWeek
        elementResponseObject.daysOfWeekBinary = Number(getDaysOfWeekBinary(elementObject.daysOfWeek))
        elementResponseObject.gradeLevelKey = elementObject.gradeLevelKey
        elementResponseObject.locationKey = elementObject.locationKey
        elementResponseObject.termId = elementObject.termId
        elementResponseObject.courseRegionKey = elementObject.courseRegionKey
        elementResponseObject.type = elementObject.type

        elementResponseObject.pretrashCourseKey = elementObject.courseKey // ! Different: preTrash
        elementResponseObject.originalCourseKey = elementObject.curriculumKey
        elementResponseObject.rebuiltCourseKey = elementObject.curriculumKey

        elementResponseObject.originalCourseKey += getCurriculumKeyDelimiter('original')
        elementResponseObject.rebuiltCourseKey += getCurriculumKeyDelimiter('new')

        elementResponseObject.originalCourseKey += alphabetArray[Math.floor((Number(elementObject.termId) % 10000) / 100)]
        elementResponseObject.rebuiltCourseKey += alphabetArray[Math.floor((Number(elementObject.termId) % 10000) / 100)]
        elementResponseObject.originalCourseKey += elementObject.termId.slice(-2)
        elementResponseObject.rebuiltCourseKey += elementObject.termId.slice(-2)
        elementResponseObject.originalCourseKey += (elementObject.weekId % 100)
        elementResponseObject.rebuiltCourseKey += (elementObject.weekId % 100)

        elementResponseObject.originalCourseKey += getGradeLevelLetters(elementObject.gradeLevelKey, 'original')
        elementResponseObject.rebuiltCourseKey += getGradeLevelLetters(elementObject.gradeLevelKey, 'new')

        elementResponseObject.originalCourseKey += elementObject.locationKey
        elementResponseObject.rebuiltCourseKey += elementObject.locationKey

        elementResponseObject.originalCourseKey += ''// ! Different: original doesn't have 'daysOfWeekBinary'
        elementResponseObject.rebuiltCourseKey += getDaysOfWeekBinary(elementObject.daysOfWeek)

        elementResponseObject.updatedCourseKey = elementResponseObject.originalCourseKey + elementResponseObject.daysOfWeekBinary.toString()
        return elementResponseObject
    })
    console.warn(`elementResponseObjectArray[${elementResponseObjectArray.length}]`)
    console.warn(elementResponseObjectArray)
    const finalPostmanDataObjectArray = elementResponseObjectArray.map((elementObject) => {
        const finalPostmanElementObject = {}
        finalPostmanElementObject.nid = elementObject.nid
        finalPostmanElementObject.field_coursekey = elementObject.rebuiltCourseKey
        finalPostmanElementObject.field_daysofweekbinary = elementObject.daysOfWeekBinary
        finalPostmanElementObject.type = elementObject.type
        return finalPostmanElementObject
    })

    console.warn(`finalPostmanDataObjectArray[${finalPostmanDataObjectArray.length}]`)
    console.warn(finalPostmanDataObjectArray)
    console.log(JSON.stringify(finalPostmanDataObjectArray)) // ø for clean JSON harvesting
}

// ø ============================================================         </MAIN LOGIC PORTION>
// ø ==========================================================================================



// • ==========================================================================================
// • ============================================================            <HELPER FUNCTIONS>

function getDaysOfWeekBinary(daysOfWeek = 'STRING') {
    let daysOfWeekBinary = 0
    let daysOfWeekArray = daysOfWeek.split(',')
    daysOfWeekArray.forEach(element => {
        daysOfWeekBinary += Math.pow(2, Number(element))
    });
    let daysOfWeekBinaryString = ('00' + daysOfWeekBinary.toString()).slice(-2)
    return daysOfWeekBinaryString
}

function getCurriculumKeyDelimiter(version = 'new') {
    version = ['original', 'orig', 'old'].includes(version.toLowerCase()) ? 'original' : 'new'
    const delimiter = version === 'original' ? '' : 'n'
    return delimiter
}
function getGradeLevelLetters(gradeLevelString = 'STRING', version = 'new') {
    const noKVersionArray = ['original', 'orig', 'old', 'noK']
    version = noKVersionArray.includes(version) ? 'noK' : 'yesK'

    let arrayThis = []
    if (version === 'noK') {
        arrayThis = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    }
    if (version === 'yesK') {
        arrayThis = ['z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    }

    const gradeLevelArray = gradeLevelString.substring(2).split('')
    const gradeLevelStart = gradeLevelArray.length > 3 ? gradeLevelArray[0] + gradeLevelArray[1] : gradeLevelArray[0]
    let gradeLevelEnd = gradeLevelArray.length === 4 ? gradeLevelArray[2] + gradeLevelArray[3] : gradeLevelArray[1]
    gradeLevelEnd = gradeLevelArray.length === 3 ? gradeLevelEnd + gradeLevelArray[2] : gradeLevelEnd

    return arrayThis[Number(gradeLevelStart)] + arrayThis[Number(gradeLevelEnd)]
}
    // • ============================================================           </HELPER FUNCTIONS>
    // • ==========================================================================================