let weeksAll_superObject = {}

// ø ====================================================================================================
// ø ============================================================         <termId: 202223 regionKey: CHO>
{   
    const paramObject = {
        termId: 202223,
        regionKey: 'CHO'
    }
    validationObject = validateParamObject(paramObject)
    const {anyError} = validationObject
    // import objectFromJSON from
    // `/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`
    
    if(anyError !== true){
        const { termId,regionKey } = paramObject
        let weeksAllThese = {}
        await import(`/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`).then(weeks => {
            // console.warn(`typeof weeks: ${typeof weeks}`);
            // console.warn(weeks);
            weeksAllThese = weeks
        });
        if(typeof weeksAll_superObject[termId] === 'undefined'){
            weeksAll_superObject[termId] = {}
        }
        // weeksAll_superObject[termId][regionKey] = {}
        weeksAll_superObject[termId][regionKey] = weeksAllThese.default
    }
}
// ø ============================================================        </termId: 202223 regionKey: CHO>
// ø ====================================================================================================
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// ø ====================================================================================================
// ø ============================================================         <termId: 202235 regionKey: CHO>
{   
    const paramObject = {
        termId: 202235,
        regionKey: 'CHO'
    }
    validationObject = validateParamObject(paramObject)
    const {anyError} = validationObject
    // import objectFromJSON from
    // `/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`
    
    if(anyError !== true){
        const { termId,regionKey } = paramObject
        let weeksAllThese = {}
        await import(`/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`).then(weeks => {
            // console.warn(`typeof weeks: ${typeof weeks}`);
            // console.warn(weeks);
            weeksAllThese = weeks
        });
        if(typeof weeksAll_superObject[termId] === 'undefined'){
            weeksAll_superObject[termId] = {}
        }
        // weeksAll_superObject[termId][regionKey] = {}
        weeksAll_superObject[termId][regionKey] = weeksAllThese.default
    }
}
// ø ============================================================        </termId: 202235 regionKey: CHO>
// ø ====================================================================================================

console.log(JSON.stringify(weeksAll_superObject))

// async function gatherWeeks(termId = 200023 ,regionKey = 'BVT'){
//     console.warn(`termId: ${termId}`)
//     console.warn(`regionKey: ${regionKey}`)
//     // let validationObject = {}
//     // validationObject.errorLog = []
    
//     {
//         const supportedTermIdArray = []
//         termId = Number(termId)
//     }
    
    
    
    
    
    
//     let jsonLocation =  gender === 'MALE' ? 'dogsForDisplay_male.json' : 'NA'
//     jsonLocation  =  gender === 'FEMALE' ? 'dogsForDisplay_female.json' : jsonLocation
//     if(doImport === true) {
//         let dogsImported = {}
//         await import(`/Users/brad/Documents/bradRepositories/vsCode/proofsOfConcept/dynamicJSON_import_maleDogs_femaleDogs/source/${jsonLocation}`).then(dogs => {
//             // console.warn(`typeof dogs.default: ${typeof dogs.default}`);
//             // console.warn(dogs.default);
//             dogsImported = dogs.default
//         });
//         // console.warn(`typeof dogsImported: ${typeof dogsImported}`);
//         // console.warn(dogsImported);
//         return dogsImported
//     }else{
//         return 'NOTHING IMPORTED [doImport not True]'
//     }
// }

function validateParamObject(paramObject = {}){
    validationObject = {}
    validationObject.anyError = false
    validationObject.errorLog = []
    validationObject.anyWarning = false
    validationObject.warningLog = []
    validationObject.anyNote = false
    validationObject.noteLog = []
    // ! <regionKey is Supported>
    let { regionKey = 'BVT',termId = 199923 }  = paramObject
    termId = Number(termId)
    const supportedRegionKeyArray = ['CHO'] // gather from SOMEWHERE or MANUALLY UPDATE
    // const supportedRegionKeyArray = ['CHO','RIC','ROA'] // gather from SOMEWHERE or MANUALLY UPDATE
    if(supportedRegionKeyArray.includes(regionKey) !== true){
        logThis = {}
        logThis.title = `Current Courses have an UnSupported 'regionKey' value: ${regionKey}`
        logThis.descr = `Current Courses have an UnSupported 'regionKey' value: ${regionKey}`
        logThis.logic /*As String*/ = 'if(upportedRegionKeyArray.includes(regionKey) !== true)'
        validationObject.errorLog.push(logThis)
        validationObject.anyError = true
    }
    // ! </regionKey is Supported>
    // ! <termId is Supported>
    const supportedTermIdArray = [202235] // gather from SOMEWHERE or MANUALLY UPDATE
    // const supportedTermIdArray = ['CHO','RIC','ROA'] // gather from SOMEWHERE or MANUALLY UPDATE
    if(supportedTermIdArray.includes(termId) !== true){
        logThis = {}
        logThis.title = `Current Courses have an UnSupported 'termId' value: ${termId}`
        logThis.descr = `Current Courses have an UnSupported 'termId' value: ${termId}`
        logThis.logic /*As String*/ = 'if(supportedTermIdArray.includes(termId) !== true)'
        validationObject.errorLog.push(logThis)
        validationObject.anyError = true
    }
    // ! </termId is Supported>
    return validationObject
}