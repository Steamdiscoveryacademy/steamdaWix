const Today = "12/08/2022"
const todayReplaceString = "Today at"
const Yesterday = "12/07/2022"
const yesterdayReplaceString = "Yesterday at"

// const timeclockChannelIdArray = [1004446796912799805]
const timeclockChannelIdArray = [1010163845593059368]
// const timeclockChannelIdArray = [1004446796912799805, 1010163845593059368]


// !!<MOVE>
// !!<responseObjectInstantiation()>
export function responseObjectInstantiation(){
    let responseObject = {}
    responseObject.errorObject = {}
    responseObject.errorObject.errorBoolean = false
    responseObject.validationLogArray = []
    return responseObject
}
// !!</responseObjectInstantiation()>
// !!<simpleStringLog()>
export function simpleStringLog(logString = '',responseObject = {}){
    const logObject = {}
    logObject.title = logString
    return postValidationLog(logObject, responseObject)
}
// !!</simpleStringLog()>
// !!<simpleStringErrorLog()>
export function simpleStringErrorLog(logString = '',responseObject = {}){
    const logObject = {}
    logObject.title = logString
    logObject.error = true
    return postValidationLog(logObject, responseObject)
}
// !!</simpleStringLog()>
// !!<postValidationLog()>
export function postValidationLog(logObject = {}, responseObject = {}){
    const defaultTitle = 'Log has no Title'
    responseObject = responseObject.errorObject ? responseObject : responseObjectInstantiation()
    logObject.title = typeof logObject.title === 'string' ? logObject.title.trim() : defaultTitle
    logObject.title = logObject.title.length > 0 ? logObject.title : defaultTitle
    logObject.error = logObject.error === true ? true : false
    responseObject.validationLogArray.push(logObject)
    responseObject.errorObject.errorBoolean = logObject.error === true ? true : responseObject.errorObject.errorBoolean
    return responseObject
}
// !!</postValidationLog()>
// !!<instantiateStatusObject()>
export function instantiateStatusObject(){
    let statusObject = {}
    statusObject.punchInStringArray = ['PUNCH IN']
    statusObject.punchOutStringArray = ['PUNCH OUT']
    statusObject.punchIn = false
    statusObject.punchCount = 0
    statusObject.punchOut = false
    statusObject.punchOutCount = 0
    statusObject.timeclockChannelIdArray = timeclockChannelIdArray
    return statusObject
}
// !!</instantiateStatusObject()>
// !!</MOVE>

export function instantiateWorkEvent(event = {}, workEventTHIS = {},statusObject = {}){
    if(!statusObject.punchIn && !statusObject.punchOut){
        workEventTHIS = {}
        workEventTHIS.postArray = []
        workEventTHIS.postArray.push(event)
        workEventTHIS.punchInObject = {}
        workEventTHIS.punchIn = false
        workEventTHIS.punchInCount = 0
        workEventTHIS.punchOutObject = {}
        workEventTHIS.punchOut = false
        workEventTHIS.punchOutCount = 0
        
        console.log(workEventTHIS)
    }
}



