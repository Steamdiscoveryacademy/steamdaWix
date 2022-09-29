
// •  _composeWeekDocDbJSON_
// • • _validateCurrentCoursesObjectArray_
// • • _buildCardinalityLookupObject_


// ø ====================================================================================================
// ø ================================================================================     <Constant Code>
// ø ====================================================================================================
const tzOffsetK = -6

// import coursesCurrentObjectArray from /*CURRENT=>termId:202222;regionKey:RIC*/ '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/drupalCoursesJSON/weekBuilder_coursesCurrent_202222_RIC.json'
// import coursesCurrentObjectArray from /*CURRENT=>termId:202223;regionKey:CHO*/ '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/drupalCoursesJSON/weekBuilder_coursesCurrent_202223_CHO.json'
import coursesCurrentObjectArray from /*CURRENT=>termId:202235;regionKey:CHO*/ '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/drupalCoursesJSON/weekBuilder_coursesCurrent_202235_CHO.json'
// import coursesCurrentObjectArray from /*WITH_ERRORS=>termId:202235;regionKey:CHO*/ '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/wERRORS_weekBuilder_coursesCurrent.json'

import fiftyTwoWeekObjectArray from '/Users/brad/Documents/bradRepositories/vsCode/reference/fiftyTwoWeekObjectArray.json'

// ø ====================================================================================================
// ø ================================================================================    </Constant Code>
// ø ====================================================================================================

// ø ====================================================================================================
// ø ======================================================================          <Exported Functions>
// ø ====================================================================================================
export function composeDocDbJSON_byCurrentCoursesJSON(paramObject = {}){
    // ø paramObject expected to be empty, but not a bad thought
    return composeWeekDocDbJSON(paramObject)
}
// ø ====================================================================================================
// ø ======================================================================         </Exported Functions>
// ø ====================================================================================================



// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================          (overall)
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
    responseObject.buildingBlocks.lastupdateThisTermIdRegionKey = (new Date).toISOString()
    // ø </simple if Validation Passes>
    responseObject.responseObject.cardinalityLookupObject = buildCardinalityLookupObject(paramObject)
    responseObject.responseObject.lastupdateThisTermIdRegionKey = responseObject.buildingBlocks.lastupdateThisTermIdRegionKey
    
    responseObject.buildingBlocks.weekKeys = []
    let cardinalKeys = Object.keys(responseObject.responseObject.cardinalityLookupObject)
    for (const key of cardinalKeys) {
        // testString += key.toString()
        // testString += '/n'
        responseObject.responseObject[responseObject.responseObject.cardinalityLookupObject[key.toString()]] = {} 
        responseObject.buildingBlocks.weekKeys.push(responseObject.responseObject.cardinalityLookupObject[key.toString()])
    }
    // responseObject.testString = testString
    loopKeysToPopulateObjects(responseObject)
    return responseObject
}

function loopKeysToPopulateObjects(responseObject = {}){
    const keyArray = [...responseObject.buildingBlocks.weekKeys]
    responseObject.buildingBlocks.typeOfString = ''
    let simpleWeekId = 0
    for (const key of keyArray) {
        // • <used to confirm key is String>
        // • responseObject.buildingBlocks.typeOfString += typeof key
        // • </used to confirm key is String>
        const coursesByKeyArray = coursesCurrentObjectArray.filter((item) => {
            return item.weekId === key
        })
        let startDateISO = '2999-12-31T23:59:59.999Z'
        let endDateISO = '2000-01-01T00:00:01.001Z'
        let daysOfWeekNumberString = ''
        let comma = ''
        for (const object of coursesByKeyArray) {
            startDateISO = startDateISO < object.courseDateStart ? startDateISO : object.courseDateStart
            endDateISO = endDateISO > object.courseDateEnd ? endDateISO : object.courseDateEnd
            daysOfWeekNumberString += comma + object.daysOfWeek
            comma = ","
        }
        
        // responseObject.responseObject[key].toDoTop =    'HOLDER FOR BELOW ATTRIBUTES TODO'
        // responseObject.responseObject[key].toDoBottom = 'HOLDER FOR ABOVE ATTRIBUTES TODO'
        simpleWeekId = keyArray.indexOf(key) + 1
        responseObject.responseObject[key].key = simpleWeekId.toString()
        responseObject.responseObject[key].name = 'Week ' + positiveIntegerKludge(simpleWeekId, 'ucWord')
        responseObject.responseObject[key]._id = Number(key)
        responseObject.responseObject[key].dateStart = startDateISO
        responseObject.responseObject[key].dateEnd = endDateISO
        responseObject.responseObject[key].dateStartAbbrv = indicatedDateFormatting(startDateISO, 'abbrv')
        responseObject.responseObject[key].dateStartFull = indicatedDateFormatting(startDateISO, 'full')
        responseObject.responseObject[key].dateStartSlash = indicatedDateFormatting(startDateISO, 'slash')
        let daysOfWeekJSArray = parseDaysOfWeekFullListStringToNumericArray(daysOfWeekNumberString)
        responseObject.responseObject[key].daysOfWeekJSArray = daysOfWeekJSArray
        responseObject.responseObject[key].daysOfWeekString = parseDaysOfWeekJSArrayToStringArray(daysOfWeekJSArray)
        responseObject.responseObject[key].termId = Number(responseObject.buildingBlocks.termId)
        responseObject.responseObject[key].regionKey = responseObject.buildingBlocks.regionKey
        responseObject.responseObject[key].FD = timeblockFullDay_FD()
        responseObject.responseObject[key].AM = timeblockMorning_AM()
        responseObject.responseObject[key].PM = timeblockAfternoon_PM()
        responseObject.responseObject[key].nameAcronym =  'Wk' + simpleWeekId.toString()
        responseObject.responseObject[key].nameCardinal =  simpleWeekId.toString()
        responseObject.responseObject[key].nameCommon = 'Week ' + simpleWeekId.toString()
        responseObject.responseObject[key].nameFull = 'Week ' + positiveIntegerKludge(simpleWeekId, 'ucWord')
        responseObject.responseObject[key].nameOrdinal = simpleWeekId.toString() + positiveIntegerKludge(simpleWeekId, 'cardinalSuffix')

        responseObject.responseObject[key].weekId = Number(key)
        responseObject.responseObject[key].weekCardinal = simpleWeekId
        responseObject.responseObject[key].weekNotesInternal = []
        responseObject.responseObject[key].weekNotesPublic = []
        // responseObject.responseObject[key].ZcoursesCurrentObjectArray = coursesByKeyArray

    }
}

// ø ====================================================================================================
// ø ================================================================================    </Function Code>
// ø ================================================================================          (overall)
// ø ====================================================================================================

// ø ====================================================================================================
// ø ================================================================================     <Function Code>
// ø ================================================================================            (helper)
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
    // ! <regionKey is Supported>
    const supportedRegionKeyArray = [] // gather from SOMEWHERE or MANUALLY UPDATE
    if(1 === 2 && supportedRegionKeyArray.includes(regionKey) !== true){
        logThis = {}
        logThis.title = `Current Courses have an UnSupported 'regionKey' value`
        logThis.descr = `Current Courses have an UnSupported 'regionKey' value`
        logThis.logic /*As String*/ = 'if(1 === 2 && supportedRegionKeyArray.includes(regionKey) !== true)'
        errorObject.errorLog.push(logThis)
    }
    // ! </regionKey is Supported>
    responseObject.errorObject = errorObject
    return responseObject
}

function buildCardinalityLookupObject(paramObject, errorObject){
    // • <_buildCardinalityLookupObject_>
    const weekIdArrayAllUnsorted = coursesCurrentObjectArray.map((item) => {
        return item.weekId
    })
    // const weekIdArrayAll = [...weekIdArrayAllUnsorted]
    const weekIdArrayAll = weekIdArrayAllUnsorted.sort()
    const weekIdSet = new Set(weekIdArrayAll)
    // weekIdArray = [...weekIdSet]
    let cardinalityLookupObject = {}
    let cardinal = 1
    for (const weekId of weekIdSet) {
        let cardinalKey = cardinal.toString()
        cardinalityLookupObject[cardinalKey] = weekId.toString()
        cardinal++
    }
    return cardinalityLookupObject
}

function positiveIntegerKludge(simpleWeekId = 999, returnParam = 'ucWord'){
    // simpleWeekId = Number(simpleWeekId)
    let weekObject = fiftyTwoWeekObjectArray.weekObjectArray[simpleWeekId]
    return weekObject[returnParam]
    // return 'TeSt'
    
}

// • <All Indicated Date Formatting>
function indicatedDateFormatting(dateISO = "2008-01-2-T12:00:00.000Z", format = 'full'){
    format = format.toLowerCase()
    const supportedFromatArray = ['abbrv','full','slash']
    if(supportedFromatArray.includes(format) === false){
        return `UNSUPPORTED_DATE_FORMAT: ${format}`
    }
    if(format === 'abbrv'){
        return dateFormatABBRV(dateISO)
    }
    if(format === 'full'){
        return dateFormatFULL(dateISO)
    }
    if(format === 'slash'){
        return dateFormatSLASH(dateISO)
    }
    // simpleWeekId = Number(simpleWeekId)
    let weekObject = fiftyTwoWeekObjectArray.weekObjectArray[simpleWeekId]
    return weekObject[returnParam]
    // return 'TeSt'
    
}
function dateFormatABBRV(dateISO){
    if(Date.parse(dateISO) === NaN){
        return "Mon DD"
    }
    const dateObject = new Date(dateISO)
    // let dateString = 'Sep 26'
    const monthThreeAbbrvs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let dateString = ''
    dateString += monthThreeAbbrvs[dateObject.getMonth()] + ' '
    dateString += dateObject.getDate()
    return dateString
}
        
function dateFormatFULL(dateISO){
    if(Date.parse(dateISO) === NaN){
        return "Somday, Month 19, 2021"
    }
    const dateObject = new Date(dateISO)
    // let dateString = 'Monday, September 26, 2022'
    let dateString = ''
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    dateString += dayNames[dateObject.getDay()] +', '
    dateString += monthNames[dateObject.getMonth()] + ' '
    dateString += dateObject.getDate() + ', '
    dateString += dateObject.getFullYear()
    return dateString
}
                
function dateFormatSLASH(dateISO){
    if(Date.parse(dateISO) === NaN){
        return "12/19/2021"
    }
    const dateObject = new Date(dateISO)
    // let dateString = '09/26/2022'
    let dateString = ''
    dateString += dateObject.getMonth() < 9 ? '0' : ''
    dateString += (dateObject.getMonth() + 1).toString() + '/'
    dateString += dateObject.getDate() < 10 ? '0' : ''
    dateString += dateObject.getDate() + '/'
    dateString += dateObject.getFullYear()
    return dateString
}
// • </All Indicated Date Formatting>
    // • <All Indicated Days-of-Week Formatting>
    function parseDaysOfWeekFullListStringToNumericArray(daysOfWeekNumberString = 'S,T,R,I,N,G'){
        let daysOfWeekNumberStringArray = daysOfWeekNumberString.split(",").sort()
        
        let daysOfWeekNumberArray = []
        for (const element of daysOfWeekNumberStringArray) {
            if(!daysOfWeekNumberArray.includes(Number(element))){
                daysOfWeekNumberArray.push(Number(element))
            }
        }
        return daysOfWeekNumberArray
    }
    function parseDaysOfWeekJSArrayToStringArray(daysOfWeekJSArray = [], format = 'Dow'){
        const supportedFromatArray = ['Dow']
        if(supportedFromatArray.includes(format) === false){
            return `UNSUPPORTED_DAYOFWEEK_FORMAT: ${format}`
        }
        const formattedArrayOfStrings_Dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        let formattedDayOfWeekListString = ''
        let comma = ''
        for (const integer of daysOfWeekJSArray) {
            formattedDayOfWeekListString += comma
            if(format === 'Dow'){
                formattedDayOfWeekListString += formattedArrayOfStrings_Dow[integer]
            }
            comma = ','   
        }
        return formattedDayOfWeekListString
    }
    // • </All Indicated Days-of-Week Formatting>
    // ! ø <DO CONFIRM THESE EACH TERM>
    function timeblockFullDay_FD(){
        // return 'FD HOLDER FOR CONSTANT BLOCK'
        const objectLiteral = {
            timeBlockKey: 'FD',
            timeBlockName: 'Full Day',
            timeBlockStartTime: '09:00:00',
            timeBlockEndTime: '17:00:00',
            timeBlockDuration: '08:00:00',
            timeBlockStartTimeString: '9:00am',
            timeBlockEndTimeString: '5:00pm',
            timeBlockDurationString: '8 hours',
            timeBlockSpanString: '9:00am to 5:00pm',
            timeBlockSpanStringAbbrv: '9 to 5'
        }
        return objectLiteral
    }
    function timeblockMorning_AM(){
        // return 'AM HOLDER FOR CONSTANT BLOCK'
        const objectLiteral = {
            timeBlockKey: 'AM',
            timeBlockName: 'Morning',
            timeBlockStartTime: '09:00:00',
            timeBlockEndTime: '12:30:00',
            timeBlockDuration: '03:30:00',
            timeBlockStartTimeString: '9:00am',
            timeBlockEndTimeString: '12:30pm',
            timeBlockDurationString: '3.5 hours',
            timeBlockSpanString: '9:00am to 12:30pm',
            timeBlockSpanStringAbbrv: '9:00 to 12:30'
        }
        return objectLiteral
    }
    function timeblockAfternoon_PM(){
        // return 'PM HOLDER FOR CONSTANT BLOCK'
        const objectLiteral = {
            timeBlockKey: 'PM',
            timeBlockName: 'Afternoon',
            timeBlockStartTime: '13:30',
            timeBlockEndTime: '17:00:00',
            timeBlockDuration: '03:30:00',
            timeBlockStartTimeString: '1:30pm',
            timeBlockEndTimeString: '5:00pm',
            timeBlockDurationString: '3.5 hours',
            timeBlockSpanString: '1:30pm to 5:00pm',
            timeBlockSpanStringAbbrv: '1:30 to 5:00'
        }
        return objectLiteral
    }
    function timeblockEvening_EVE(){
        return 'EVE HOLDER FOR CONSTANT BLOCK'
    }
    // ! ø </DO CONFIRM THESE EACH TERM>
                        
// ø ====================================================================================================
// ø ================================================================================    </Function Code>
// ø ================================================================================            (helper)
// ø ====================================================================================================
