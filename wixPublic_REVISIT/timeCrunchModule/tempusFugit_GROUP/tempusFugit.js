export function tempusFugit(isoCheckOverload = 'STRING', isoNowOverload = 'STRING', resetStorage = false){
    let devResonseObject = {}
    devResonseObject.isoCheckOverload = isoCheckOverload 
    devResonseObject.isoNowOverload = isoNowOverload 
    devResonseObject.resetStorage = resetStorage 
    resetStorage = resetStorage === true ? true : false
    let isoZuluRegEx = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/gm
    // isoCheckOverload = 
    let nowISO = isoNowOverload.length !== 24 || isoNowOverload.match(isoZuluRegEx) === null ? (new Date()).toISOString() : isoNowOverload
    let checkISO = isoCheckOverload.length !== 24 || isoCheckOverload.match(isoZuluRegEx) === null ? '1991-10-27T23:01:00.000Z' : isoCheckOverload
    // let chunkThis = 'ii'
    devResonseObject.checkISO = checkISO 
    devResonseObject.nowISO = nowISO 
    // return devResonseObject
    return tempusFugitBoolean(checkISO,nowISO)
    let tempusFugitBoolenaObject = {}
    let obamaISO = '2008-01-20T12:00:00.000Z'
    let nullCheckObject = {}
    nullCheckObject.lastMinute = obamaISO
    // nullCheckObject.lastFiveMinutes = obamaISO
    // nullCheckObject.lastTenMinutes = obamaISO
    // nullCheckObject.lastFifteenMinutes = obamaISO
    // nullCheckObject.lastThirtyMinutes = obamaISO
    // nullCheckObject.lastHour = obamaISO
    // nullCheckObject.lastTwoHours = obamaISO
    // nullCheckObject.lastSixHours = obamaISO
    // nullCheckObject.lastTwelveHours = obamaISO
    // nullCheckObject.lastDay = obamaISO
    // nullCheckObject.lastWeek = obamaISO
    // nullCheckObject.lastMonth = obamaISO
    // nullCheckObject.lastThreeMonths = obamaISO
    // nullCheckObject.lastSixMonths = obamaISO
    nullCheckObject.lastYear = obamaISO
    let tempusFugitCheckObject = memory.getItem('memoryTempusFugitCheckObject') === null ? nullCheckObject : JSON.parse(memory.getItem('memoryTempusFugitCheckObject'))
    let develObject = {}
    let tempusFugitNextObject = {}
    {
       tempusFugitNextObject.lastMinute = nextSpan(1,12)  
    }
    develObject.now = nowISO
    develObject.tempusFugitCheckObject = tempusFugitCheckObject

    develObject.tempusFugitNextObject = tempusFugitNextObject
    // return tempusFugitNextObject
    return develObject
}
// ø <---------- <function tempusFugitBoolean(isoCheck, isoNow)>  ---------->
