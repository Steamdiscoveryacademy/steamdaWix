export function parsePPEQ(ppeqString = 'STRING'){
    let sufficientObjectLookup = { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY' },CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL' },ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR' },DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR' },ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT' },WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING' },NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE' },SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO' },PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO' },INFO: { bootstrap: 'INFO', watchdog: 'INFO' },SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO' },DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG' },DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG' } };
    let sufficientKeyArray = Object.keys(sufficientObjectLookup);
    let responseObjectArray = {};
    responseObjectArray.objectArray = [];
    let elementArray = {};
    let elementObject = {};
    let lookupObject = {};
    let key = 'STRING';
    let holder = 'STRING';
    
    ppeqString = ppeqString.substr(0, ppeqString.length - 1);
    // console.warn('ppeqString: ');
    // console.warn(ppeqString);
    let ppeqElementArray = ppeqString.split('|');
    // console.warn('ppeqElementArray: ');
    // console.warn(ppeqElementArray);

    ppeqElementArray.forEach(elementString => {
        // console.log(elementString);
        elementArray = elementString.split('=');
        key = elementArray[0];
        key = key.toUpperCase();
        if(sufficientKeyArray.includes(key)){
            lookupObject = sufficientObjectLookup[key];
        }else{
            lookupObject = { bootstrap: 'NA', watchdog: 'NA' }
        }

        // console.warn('key: ' + key);
        // console.warn('lookupObject: ');
        // console.warn(lookupObject);



        elementObject = {};
        elementObject.message = elementArray[1];
        elementObject.key = key;
        holder = typeof elementArray[2] === 'string' ? elementArray[2] : '';
        elementObject.line = elementArray[2];
        // elementObject.bootstrap = elementArray[0];
        elementObject.bootstrap = lookupObject.bootstrap;
        // elementObject.watchdog = elementArray[0];
        elementObject.watchdog = lookupObject.watchdog;
        holder = typeof elementArray[4] === 'string' ? elementArray[4] : '';
        elementObject.postLogString = holder;
        elementObject.postLog = elementObject.postLogString === 'TTRUE' ? true : false;
        responseObjectArray.objectArray.push(elementObject);

    });
    
    
    
    
    
    
    
    
    
    
    return responseObjectArray;
}


let ppeqStringThis = "devel=The first Number=1|";

// parsePPEQ(ppeqStringThis);
let responseObjectArrayThis = parsePPEQ(ppeqStringThis);

console.warn('ppeqStringThis: ');
console.warn(ppeqStringThis);
console.warn('responseObjectArrayThis: ');
console.warn(responseObjectArrayThis);
console.warn(JSON.stringify(responseObjectArrayThis,undefined,4));