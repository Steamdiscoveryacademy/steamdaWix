
// ¡ ====================================================================================================
// ¡ ======================================================================        <Overall Code and DOX>
// ¡ ===== • this task is broken into anonymous brack-blocks for variable scoping                        
// ¡ ===== • one ƒ (file) as it is so direct and straight-forward                                        
// ¡ ===== • _reasonable_ to break into core and DOX files                                               
// ¡ ====================================================================================================

// ø ====================================================================================================
// ø ==================================================       <would be included in DOX - all else Code>
let weeksAll_superObject = {}
let anyErrorWhatSoEver = false
// ø ==================================================      </would be included in DOX - all else Code>
// ø ====================================================================================================

// ø ====================================================================================================
// ø ============================================================         <termId: 202222 regionKey: RIC>
{   
    const paramObject = {
        termId: 202222,
        regionKey: 'RIC'
    }
    validationObject = validateParamObject(paramObject)
    const {anyError} = validationObject
    console.warn(`validationObject.anyError ${anyError}`)
    if(anyError === true){
        const consoleObject = {}
        consoleObject.paramObject = paramObject
        consoleObject.validationObject = validationObject
        console.warn(consoleObject)
        anyErrorWhatSoEver = true
    }
    // import objectFromJSON from
    // `/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`
    
    if(anyError !== true){
        const { termId,regionKey } = paramObject
        console.warn(`const { ${termId},${regionKey} } = paramObject`)
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
// ø ============================================================        </termId: 202222 regionKey: RIC>
// ø ====================================================================================================
// ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// ø ====================================================================================================
// ø ============================================================         <termId: 202223 regionKey: CHO>
{   
    const paramObject = {
        termId: 202223,
        regionKey: 'CHO'
    }
    validationObject = validateParamObject(paramObject)
    const {anyError} = validationObject
    console.warn(`validationObject.anyError ${anyError}`)
    if(anyError === true){
        const consoleObject = {}
        consoleObject.paramObject = paramObject
        consoleObject.validationObject = validationObject
        console.warn(consoleObject)
        anyErrorWhatSoEver = true
    }
    // import objectFromJSON from
    // `/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`
    
    if(anyError !== true){
        const { termId,regionKey } = paramObject
        console.warn(`const { ${termId},${regionKey} } = paramObject`)
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
    console.warn(`validationObject.anyError ${anyError}`)
    if(anyError === true){
        const consoleObject = {}
        consoleObject.paramObject = paramObject
        consoleObject.validationObject = validationObject
        console.warn(consoleObject)
        anyErrorWhatSoEver = true
    }
    // import objectFromJSON from
    // `/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/courseCatalog_WiX/week/assets/result_jsonDocDb/weeksAll_${termId}_${regionKey}.json`
    
    if(anyError !== true){
        const { termId,regionKey } = paramObject
        console.warn(`const { ${termId},${regionKey} } = paramObject`)
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


// ø ====================================================================================================
// ø ==================================================       <would be included in DOX - all else Code>
if(anyErrorWhatSoEver !== true){
    console.log(JSON.stringify(weeksAll_superObject))
}
// ø ==================================================      </would be included in DOX - all else Code>
// ø ====================================================================================================

// ¡ ====================================================================================================
// ¡ ======================================================================       </Overall Code and DOX>
// ¡ ====================================================================================================


// ø ====================================================================================================
// ø ======================================================================            <helper functions>
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
    const supportedRegionKeyArray = ['CHO','RIC'] // gather from SOMEWHERE or MANUALLY UPDATE
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
    const supportedTermIdArray = [202222,202223,202235] // gather from SOMEWHERE or MANUALLY UPDATE
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
// ø ======================================================================           </helper functions>
// ø ====================================================================================================