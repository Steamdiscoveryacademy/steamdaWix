// ø <---------- <parsePPEQ_toObjectArraysByKey UTILITY>  ---------->
export function parsePPEQ_toObjectArraysByKey(ppeqString = 'STRING'){
    // pstEnrSeven202108UTILITY SHORT
    let accordingToSufficientBootstrapWatchdog = "not Necessary, parses to ObjectArrayByKey (objects), with bootstrap-watchdog of 'NA' if no match";
    // let sufficientObjectLookup = { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY' },CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL' },ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR' },DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR' },ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT' },WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING' },NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE' },SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO' },PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO' },INFO: { bootstrap: 'INFO', watchdog: 'INFO' },SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO' },DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG' },DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG' } };
    // let sufficientObjectLookup = { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY', uiPlacement: 'RESPONSE' }, CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL', uiPlacement: 'RESPONSE' }, ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT', uiPlacement: 'RESPONSE' }, WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING', uiPlacement: 'RESPONSE' }, NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE', uiPlacement: 'RESPONSE' }, SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO', uiPlacement: 'INFO' }, PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO', uiPlacement: 'PRIMARY' }, INFO: { bootstrap: 'INFO', watchdog: 'INFO', uiPlacement: 'INFO' }, SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO', uiPlacement: 'SECONDARY' }, DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' }, DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' } };
    let sufficientObjectLookup /*MANUAL UPDATE succes-placement 20210822*/= { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY', uiPlacement: 'RESPONSE' }, CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL', uiPlacement: 'RESPONSE' }, ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT', uiPlacement: 'RESPONSE' }, WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING', uiPlacement: 'RESPONSE' }, NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE', uiPlacement: 'RESPONSE' }, SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO', uiPlacement: 'RESPONSE' }, PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO', uiPlacement: 'PRIMARY' }, INFO: { bootstrap: 'INFO', watchdog: 'INFO', uiPlacement: 'INFO' }, SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO', uiPlacement: 'SECONDARY' }, DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' }, DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' } };
    let sufficientKeyArray = Object.keys(sufficientObjectLookup);
    let responseObjectArraysByKey = {};
    let elementArray = {};
    let elementObject = {};
    let lookupObject = {};
    let key = 'STRING';
    let holder = 'STRING';
    let index = 0;
    
    ppeqString = ppeqString.substr(0, ppeqString.length - 1);
    
    let ppeqElementArray = ppeqString.split('|');
    ppeqElementArray.forEach(elementString => {
        elementArray = elementString.split('=');
        key = elementArray[0];
        key = key.toUpperCase();
        if(!Object.keys(responseObjectArraysByKey).includes(key)){
            responseObjectArraysByKey[key] = [];
        }
        if(sufficientKeyArray.includes(key)){
            lookupObject = sufficientObjectLookup[key];
        }else{
            lookupObject = { bootstrap: 'NA', watchdog: 'NA' }
        }
        elementObject = {};
        elementObject.message = elementArray[1];
        elementObject.key = key;
        holder = typeof elementArray[2] === 'string' ? elementArray[2] : '';
        elementObject.line = elementArray[2];
        elementObject.bootstrap = lookupObject.bootstrap;
        elementObject.watchdog = lookupObject.watchdog;
        holder = typeof elementArray[4] === 'string' ? elementArray[4] : '';
        elementObject.postLogString = holder;
        elementObject.postLog = elementObject.postLogString === 'TTRUE' ? true : false;
        elementObject.index = index;
        elementObject._id = index.toString();
        responseObjectArraysByKey[key].push(elementObject);
        index++;
    });  
    return responseObjectArraysByKey;
}
// ø <---------- </parsePPEQ_toObjectArraysByKey UTILITY> ---------->