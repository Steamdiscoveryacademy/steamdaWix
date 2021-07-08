// ! <TESTING>
let paramObjectThis = {};
paramObjectThis.doLog = true;
// paramObjectThis.doCleanup = true;
paramObjectThis.doInstantiate = true;
// paramObjectThis.doInstantiateValueArray = ["PPENDING","0","0","0","0"];
// ø <first Three> from: 20210702113700_toDelete_LabelKeys.json
paramObjectThis.doInstantiateValueArray = [`[{"_createdDate":"2021-04-16T01:03:47.000Z","displayName":"Adventure STEAM","key":"custom.adventure-steam","labelType":"USER_DEFINED","namespace":"custom","_updatedDate":"2021-04-16T01:03:47.000Z"},{"_createdDate":"2021-04-02T19:15:21.000Z","displayName":"Spring Break Camp - April 6","key":"custom.spring-break-camp-april-6","labelType":"USER_DEFINED","namespace":"custom","_updatedDate":"2021-04-02T19:15:21.000Z"},{"_createdDate":"2021-04-02T18:16:15.000Z","displayName":"Spring Break Camp - April 5","key":"custom.spring-break-camp-april-5","labelType":"USER_DEFINED","namespace":"custom","_updatedDate":"2021-04-02T18:16:15.000Z"}]`,"0","0","0","0"];
// ø </first Three>
// paramObjectThis.doInstantiateValueArray = "KoNsTaNt";
let logStringResult = wixStorageManager(paramObjectThis);
console.warn('logStringResult: ' + logStringResult);
console.warn('paramObjectThis: ');
console.warn(paramObjectThis);
// ! </TESTING>





// ! ====================================================================================================
// ! ==========================      <Overall forEach Delete Labels>                 ====================
// ! ====================    ...as Proof-of-Concept for all manner of wixStorageLogic     ===============
// ! ====================================================================================================
// ø <---------- <>  ---------->
// ø <---------- </> ---------->

// ø <---------- <wixStorageManager() POC for Overall>  ---------->
export function wixStorageManager(paramObject = {}) {
    let keyArray = [
        'local.forEachArraySource',
        'local.forEachNextIndex',
        'local.forEachArrayLimit',
        'local.forEachArrayPageOffset',
        'local.forEachArrayPage'
    ];
    let kInstantiateValueArray = ["PPENDING","0","0","0","0"];
    let doInstantiateValueArray = typeof paramObjectThis.doInstantiateValueArray === 'string' 
                                    && paramObjectThis.doInstantiateValueArray.toUpperCase().indexOf('ONSTANT') >= 0 
                                    ? kInstantiateValueArray : paramObjectThis.doInstantiateValueArray;
    //either constant or konstant
    let doLog = typeof paramObject.doLog === 'boolean' && paramObject.doLog === false ? false : true;
    let doCleanup = typeof paramObject.doCleanup === 'boolean' && paramObject.doCleanup === true ? true : false;
    let doInstantiate = typeof paramObject.doInstantiate === 'boolean' && paramObject.doLog === true ? true : false;
    doInstantiate = typeof doInstantiateValueArray === 'object' && Array.isArray(doInstantiateValueArray) ? doInstantiate : false;
    doInstantiate = doInstantiateValueArray.length === keyArray.length ? doInstantiate : false;
    doInstantiateValueArray = doInstantiate ? doInstantiateValueArray : [];
    console.warn('doInstantiateValueArray: ' + doInstantiateValueArray);

    let logString = '';
    if (doCleanup && doInstantiate) {
        // 
        doCleanup = false;
        doInstantiate = false;
        let logString = `Both 'doCleanup' and 'doInstantiate' were set to 'true'. As this is invalid, out of an abundance of caution, both were set to 'false' and process aborted.`;
        return /*TEST ONLY*/ logString;
    }
    let nextIndexByAlgorithm = "999";
    let storageType = '';
    let storageKey = '';
    let getString = '';
    let setStringValue = '';
    let setString = '';
    let cleanupString = 'EEMPTY';
    let index = 0;
    let doInstantiateThis = doInstantiate;
    paramObject.develLog ='';
    keyArray.forEach(key => {
        
        storageType = key.split('.')[0];
        storageKey = key.split('.')[1];
        setStringValue = 'EEROR';
        setStringValue = doInstantiate ? doInstantiateValueArray[index] : setStringValue;
        setStringValue = doCleanup ? cleanupString : setStringValue;
        doInstantiateThis = setStringValue === 'SELF' ? false : doInstantiate;
        getString = `${storageType}.getItem('${storageKey}')`;
        setString = `${storageType}.setItem('${storageKey}','${setStringValue}')`;
        
        if(doCleanup || doInstantiateThis){eval(setString)}

        // console.warn('getString: ' + getString);
        logString += doLog ? '\n' + eval(getString) :'';
        paramObject.develLog += '\n' + setString
        paramObject.develLog += '\n' + getString
        // logString += doLog ? '\n' + setString :'';
        index++;
    });

    return /*TEST ONLY*/ logString;
}
// ø <---------- </wixStorageManager() POC for Overall> ---------->


// ! ====================================================================================================
// ! ==========================      </Overall forEach Delete Labels>                ====================
// ! ====================    ...as Proof-of-Concept for all manner of wixStorageLogic     ===============
// ! ====================================================================================================
