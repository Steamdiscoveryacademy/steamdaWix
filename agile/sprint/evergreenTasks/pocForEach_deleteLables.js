// ! <TESTING>
let paramObjectThis = {};
paramObjectThis.doLog = true;
// paramObjectThis.doCleanup = true;
paramObjectThis.doInstantiate = true;
// paramObjectThis.doInstantiateValueArray = ["PPENDING","0","0","0","0"];
paramObjectThis.doInstantiateValueArray = "KoNsTaNt";
let logStringResult = wixStorageCleanupLog(paramObjectThis);
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

// ø <---------- <wixStorageCleanupLog() POC for Overall>  ---------->
export function wixStorageCleanupLog(paramObject = {}) {
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
    let storageType = '';
    let storageKey = '';
    let getString = '';
    let setStringValue = '';
    let setString = '';
    let cleanupString = 'EEMPTY';
    let index = 0;
    keyArray.forEach(key => {

        storageType = key.split('.')[0];
        storageKey = key.split('.')[1];
        setStringValue = 'EEROR';
        setStringValue = doInstantiate ? doInstantiateValueArray[index] : setStringValue;
        setStringValue = doCleanup ? cleanupString : setStringValue;

        getString = `${storageType}.getItem('${storageKey}')`;
        setString = `${storageType}.setItem('${storageKey}','${setStringValue}')`;

        // console.warn('getString: ' + getString);
        logString += doLog ? '\n' + getString :'';
        logString += doLog ? '\n' + setString :'';
        index++;
    });

    return /*TEST ONLY*/ logString;
}
// ø <---------- </wixStorageCleanupLog() POC for Overall> ---------->


// ! ====================================================================================================
// ! ==========================      </Overall forEach Delete Labels>                ====================
// ! ====================    ...as Proof-of-Concept for all manner of wixStorageLogic     ===============
// ! ====================================================================================================
