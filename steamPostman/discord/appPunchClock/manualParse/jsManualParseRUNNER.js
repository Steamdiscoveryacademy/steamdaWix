// import manualParseArray from '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/steamPostman/discord/appPunchClock/manualParse/logs/2022-12-08T15-05-10_manualParse.json'
import manualParseObject from '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/steamPostman/discord/appPunchClock/manualParse/manualParse.json'

import { postValidationLog,simpleStringLog,simpleStringErrorLog } from '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/steamPostman/discord/appPunchClock/manualParse/jsManualParse.js'
//•    \_ postValidationLog,simpleStringLog,simpleStringErrorLog VALIDATION-LOGGING Functions
//        • postValidationLog for Complex Logs, otherwise the Simples suffice
import { responseObjectInstantiation,instantiateStatusObject,instantiateWorkEvent } from '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/steamPostman/discord/appPunchClock/manualParse/jsManualParse.js'


// const timeclockChannelIdArray = [1004446796912799805]
const timeclockChannelIdArray = [1010163845593059368]
// const timeclockChannelIdArray = [1004446796912799805, 1010163845593059368]




const timeclockChannelArray = manualParseObject.channelArray.filter(channel => {
    return timeclockChannelIdArray.includes(channel.id)
})
// let Today = "12/08/2022"
// let todayReplaceString = "Today at"
// let Yesterday = "12/07/2022"
// let yesterdayReplaceString = "Yesterday at"
// ø <Obsolete>
// console.warn(`Today: ${Today}`)
// ø </Obsolete>
// ø <ResponseObject: Instantiated>
// let responseObject = responseObjectInstantiation()
// console.warn(`responseObject: Instantiated: stringified`) // stringified, pretty_stringified
// console.log(JSON.stringify(responseObject))
// console.log(JSON.stringify(responseObject,undefined,4))
// ø </ResponseObject: Instantiated>

// ø <Testing: VALIDATION-LOGGING Functions>
console.warn(`<Testing: VALIDATION-LOGGING Functions>`)
console.warn(`<Testing: INSTANTIATION [validation-logging] Functions>`)
// ø ø <postValidationLog: BARE: side-effect-Instantiation>
let responseObject = {}
const kHidden = 'HIDDEN'
if('zHIDDEN' === kHidden){
    // console.log('¡HIDDEN!')
    console.warn(`[¡${kHidden}!] – ` + `responseObject: Instantiated by postValidationLog(): pretty_stringified`) // stringified, pretty_stringified
}else{
    console.warn(`responseObject: Instantiated by postValidationLog(): pretty_stringified`) // stringified, pretty_stringified
    responseObject = postValidationLog()
    // console.log(JSON.stringify(responseObject))
    console.log(JSON.stringify(responseObject,undefined,4))
}
// ø ø </postValidationLog: BARE: side-effect-Instantiation>
// ø ø <simpleStringLog: BARE: side-effect-Instantiation>
if('HIDDEN' === kHidden){
    console.warn(`[¡${kHidden}!] – ` + `responseObject: Instantiated by simpleStringLog(): pretty_stringified`) // stringified, pretty_stringified
}else{
    responseObject = simpleStringLog()
    console.warn(`responseObject: Instantiated by simpleStringLog(): pretty_stringified`) // stringified, pretty_stringified
    // console.log(JSON.stringify(responseObject))
    console.log(JSON.stringify(responseObject,undefined,4))
}
// ø ø </simpleStringLog: BARE: side-effect-Instantiation>
// ø ø <simpleStringLog: Insantiation Log: side-effect-Instantiation>
if('HIDDEN' === kHidden){
    console.warn(`[¡${kHidden}!] – ` + `responseObject: Instantiated by simpleStringLog('responseObject Instantiation'): pretty_stringified`) // stringified, pretty_stringified
}else{
    responseObject = simpleStringLog('responseObject Instantiation')
    console.warn(`responseObject: Instantiated by simpleStringLog('responseObject Instantiation'): pretty_stringified`) // stringified, pretty_stringified
    // console.log(JSON.stringify(responseObject))
    console.log(JSON.stringify(responseObject,undefined,4))
}
// ø ø </simpleStringLog: Insantiation Log: side-effect-Instantiation
// ø ø <simpleStringErrorLog: Wrong Channel ID: side-effect-Instantiation>
if('HIDDEN' === kHidden){
    console.warn(`[¡${kHidden}!] – ` + `responseObject: Instantiated by simpleStringErrorLog('Wrong Channel ID'): pretty_stringified`) // stringified, pretty_stringified
}else{
    responseObject = simpleStringErrorLog('Wrong Channel ID')
    console.warn(`responseObject: Instantiated by simpleStringErrorLog('Wrong Channel ID'): pretty_stringified`) // stringified, pretty_stringified
    // console.log(JSON.stringify(responseObject))
    console.log(JSON.stringify(responseObject,undefined,4))
}
// ø ø </simpleStringErrorLog: Wrong Channel ID: side-effect-Instantiation
console.warn(`</Testing: INSTANTIATION [validation-logging] Functions>`)
console.warn(`<Testing: APPEND [validation-logging] Functions>`)
// ø ø <simpleStringErrorLog: Wrong Channel ID: side-effect-Instantiation>
if('zHIDDEN' === kHidden){
    console.warn(`[¡${kHidden}!] – ` + `responseObject: Instantiated by simpleStringErrorLog('Wrong Channel ID'): pretty_stringified`) // stringified, pretty_stringified
}else{
    simpleStringErrorLog('Wrong Channel ID',responseObject)
    console.warn(`responseObject: Instantiated by simpleStringErrorLog('Wrong Channel ID'): pretty_stringified`) // stringified, pretty_stringified
    // console.log(JSON.stringify(responseObject))
    console.log(JSON.stringify(responseObject,undefined,4))
}
// ø ø </simpleStringErrorLog: Wrong Channel ID: side-effect-Instantiation
console.warn(`</Testing: APPEND [validation-logging] Functions>`)
console.warn(`</Testing: VALIDATION-LOGGING Functions>`)
// ø </Testing: VALIDATION-LOGGING Functions>
const statusObject = instantiateStatusObject()
responseObject.statusObject = statusObject
// ø <ResponseObject: UNNAMED Response>
// let responseObject = responseObjectInstantiation()
console.warn(`responseObject: UNNAMED Response: pretty_stringified`) // stringified, pretty_stringified
console.log('¡HIDDEN!')
// console.log(JSON.stringify(responseObject,undefined,4))
// ø </ResponseObject: UNNAMED Response>
// ø <ResponseObject: Final Response>
// let responseObject = responseObjectInstantiation()
console.warn(`responseObject: Final Response: pretty_stringified`) // stringified, pretty_stringified
console.log('¡HIDDEN!')
// console.log(JSON.stringify(responseObject,undefined,4))
// ø </ResponseObject: Final Response>
let timeclockPostArray = []

timeclockChannelArray.forEach(channel => {
    timeclockPostArray = timeclockPostArray.concat(channel.postArray)
});

let workEventArray = []
let workEventTHIS = {}
workEventTHIS.postArray = []
let fauxEvent = {}
fauxEvent.messageArray = []
// workEventArray.push(workEventTHIS)
// let workEventTHIS = {}

timeclockChannelArray.forEach(event => {
    // workEventTHIS = instantiateWorkEvent(event,workEventTHIS,statusObject)
    // responseObject = validateInstantiation(event,workEventTHIS,statusObject)
    // workEventTHIS = evaluatePunchIn(event,workEventTHIS,statusObject)
    // workEventTHIS = evaluateOtherEvent(event,workEventTHIS,statusObject)
    // workEventTHIS = evaluatePunchOut(event,workEventTHIS,statusObject) 
    // responseObject = validateEventEvaluation(event,workEventTHIS,statusObject)
});

// function instantiateWorkEvent(event = {}, workEventTHIS = {},statusObject = {}){
//     if(!statusObject.punchIn && !statusObject.punchOut){
//         workEventTHIS = {}
//         workEventTHIS.postArray = []
//         workEventTHIS.postArray.push(event)
//         workEventTHIS.punchInObject = {}
//         workEventTHIS.punchIn = false
//         workEventTHIS.punchInCount = 0
//         workEventTHIS.punchOutObject = {}
//         workEventTHIS.punchOut = false
//         workEventTHIS.punchOutCount = 0

//         console.log(workEventTHIS)
//     }
// }
// timeclockChannelArray.forEach(event => {
//     if(!punchIn && !punchOut){
//         workEventTHIS = {}
//         workEventTHIS.postArray = []
//         workEventTHIS.postArray.push(event)
//         workEventTHIS.punchInObject = {}
//         workEventTHIS.punchIn = false
//         workEventTHIS.punchInCount = 0
//         workEventTHIS.punchOutObject = {}
//         workEventTHIS.punchOut = false
//         workEventTHIS.punchOutCount = 0

//         workEventTHIS.otherEventArray = []
//     }
//     if(workEventTHIS.postArray.messageArray.includes('PUNCH IN') ===  true){
//         punchIn = true
//         workEventTHIS.punchInObject = event
//         workEventTHIS.punchIn = true
//         workEventTHIS.punchInCount++
//     }
//     if(workEventTHIS.postArray.messageArray.includes('PUNCH IN') ===  false && workEventTHIS.postArray.messageArray.includes('PUNCH OUT') ===  false){
//         workEventTHIS.otherEventArray.push(event)
//     }
//     if(workEventTHIS.postArray.messageArray.includes('PUNCH OUT') ===  true){
//         punchOut = true
//         workEventTHIS.punchOutObject = event
//         workEventTHIS.punchOut = true
//         workEventTHIS.punchOutCount++
//         workEventArray.push(workEventTHIS)
//     }  
// });



console.warn(`manualParseObject: hidden`) // stringified, pretty_stringified
// console.log(JSON.stringify(manualParseObject))
// console.log(JSON.stringify(manualParseObject,undefined,4))
console.warn(`timeclockChannelArray: hidden`) // stringified, pretty_stringified
// console.log(JSON.stringify(timeclockChannelArray))
// console.log(JSON.stringify(timeclockChannelArray,undefined,4))
// console.log(JSON.stringify(timeclockChannelArray,undefined,4))
console.warn(`timeclockPostArray: hidden`) // stringified, pretty_stringified
// console.log(JSON.stringify(timeclockPostArray, undefined, 4))
console.warn(`workEventArray: hidden`) // stringified, pretty_stringified
// console.log(JSON.stringify(workEventArray, undefined, 4))

