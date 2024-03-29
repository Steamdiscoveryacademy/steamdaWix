// ø ==========================================================================================
// ø <---------- <extrapolateSeverityNumberSeverityWordBootstrapWordFromAny GROUP>  ---------->
// ø ==========================================================================================
export function getSeverityBootstrapObject_fromUniqueWord(word) {
    let uniqueKeyArray = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING", "NOTICE", "primary", "success", "info", "secondary", "DEBUG", "devel"];

    if (typeof word !== 'string') { return {}; }
    if (!uniqueKeyArray.includes(word)) { return {}; }

    return extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(word);
}
 
export function getSeverityBootstrapObject_fromBothWord(watchdogWord,bootstrapWord) {
    let uniqueKeyArray = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING", "NOTICE", "primary", "success", "info", "secondary", "DEBUG", "devel"];
    let word = 'FFALSE';
    word = uniqueKeyArray.includes(watchdogWord) ? watchdogWord : word;
    word = uniqueKeyArray.includes(bootstrapWord) ? bootstrapWord : word;

    if (word === 'FFALSE') { return {}; }
    return extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(word);
}
 
export function extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(key = 'STRING') {
    // let watchdogLookupJSON = `{"si0":{"severityIndex":0,"severityWord":"EMERGENCY","boostrapWord":"danger"},"swEMERGENCY":{"severityIndex":0,"severityWord":"EMERGENCY","boostrapWord":"danger"},"bwDANGER":{"severityIndex":3,"severityWord":"ERROR","boostrapWord":"danger"},"si1":{"severityIndex":1,"severityWord":"ALERT","boostrapWord":"danger"},"swALERT":{"severityIndex":1,"severityWord":"ALERT","boostrapWord":"danger"},"si2":{"severityIndex":2,"severityWord":"CRITICAL","boostrapWord":"danger"},"swCRITICAL":{"severityIndex":2,"severityWord":"CRITICAL","boostrapWord":"danger"},"si3":{"severityIndex":3,"severityWord":"ERROR","boostrapWord":"danger"},"swERROR":{"severityIndex":3,"severityWord":"ERROR","boostrapWord":"danger"},"si4":{"severityIndex":4,"severityWord":"WARNING","boostrapWord":"warning"},"swWARNING":{"severityIndex":4,"severityWord":"WARNING","boostrapWord":"warning"},"bwWARNING":{"severityIndex":4,"severityWord":"WARNING","boostrapWord":"warning"},"si5":{"severityIndex":5,"severityWord":"NOTICE","boostrapWord":"info"},"swNOTICE":{"severityIndex":5,"severityWord":"NOTICE","boostrapWord":"info"},"bwINFO":{"severityIndex":6,"severityWord":"INFO","boostrapWord":"info"},"si6":{"severityIndex":6,"severityWord":"INFO","boostrapWord":"info"},"swINFO":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"si7":{"severityIndex":7,"severityWord":"INFO","boostrapWord":"secondary"},"bwSECONDARY":{"severityIndex":7,"severityWord":"INFO","boostrapWord":"secondary"},"si8":{"severityIndex":8,"severityWord":"INFO","boostrapWord":"primary"},"bwPRIMARY":{"severityIndex":8,"severityWord":"INFO","boostrapWord":"primary"},"si9":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"bwSUCCESS":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"si10":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"},"swDEBUG":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"},"bwDEVEL":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"}}`;
    let watchdogLookupJSON = `{"EMERGENCY":{"severityIndex":0,"severityWord":"EMERGENCY","boostrapWord":"danger"},"si0":{"severityIndex":0,"severityWord":"EMERGENCY","boostrapWord":"danger"},"swEMERGENCY":{"severityIndex":0,"severityWord":"EMERGENCY","boostrapWord":"danger"},"bwDANGER":{"severityIndex":2,"severityWord":"CRITICAL","boostrapWord":"danger"},"ALERT":{"severityIndex":1,"severityWord":"ALERT","boostrapWord":"danger"},"si1":{"severityIndex":1,"severityWord":"ALERT","boostrapWord":"danger"},"swALERT":{"severityIndex":1,"severityWord":"ALERT","boostrapWord":"danger"},"CRITICAL":{"severityIndex":2,"severityWord":"CRITICAL","boostrapWord":"danger"},"si2":{"severityIndex":2,"severityWord":"CRITICAL","boostrapWord":"danger"},"swCRITICAL":{"severityIndex":2,"severityWord":"CRITICAL","boostrapWord":"danger"},"ERROR":{"severityIndex":3,"severityWord":"ERROR","boostrapWord":"warning"},"si3":{"severityIndex":3,"severityWord":"ERROR","boostrapWord":"warning"},"swERROR":{"severityIndex":3,"severityWord":"ERROR","boostrapWord":"warning"},"bwWARNING":{"severityIndex":5,"severityWord":"NOTICE","boostrapWord":"warning"},"WARNING":{"severityIndex":4,"severityWord":"WARNING","boostrapWord":"warning"},"si4":{"severityIndex":4,"severityWord":"WARNING","boostrapWord":"warning"},"swWARNING":{"severityIndex":4,"severityWord":"WARNING","boostrapWord":"warning"},"NOTICE":{"severityIndex":5,"severityWord":"NOTICE","boostrapWord":"warning"},"si5":{"severityIndex":5,"severityWord":"NOTICE","boostrapWord":"warning"},"swNOTICE":{"severityIndex":5,"severityWord":"NOTICE","boostrapWord":"warning"},"INFO":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"si6":{"severityIndex":6,"severityWord":"INFO","boostrapWord":"info"},"swINFO":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"bwINFO":{"severityIndex":6,"severityWord":"INFO","boostrapWord":"info"},"si7":{"severityIndex":7,"severityWord":"INFO","boostrapWord":"secondary"},"bwSECONDARY":{"severityIndex":7,"severityWord":"INFO","boostrapWord":"secondary"},"si8":{"severityIndex":8,"severityWord":"INFO","boostrapWord":"primary"},"bwPRIMARY":{"severityIndex":8,"severityWord":"INFO","boostrapWord":"primary"},"si9":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"bwSUCCESS":{"severityIndex":9,"severityWord":"INFO","boostrapWord":"success"},"DEBUG":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"},"si10":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"},"swDEBUG":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"},"bwDEVEL":{"severityIndex":10,"severityWord":"DEBUG","boostrapWord":"devel"}}`;
    let watchdogLookupObject = JSON.parse(watchdogLookupJSON);
    
    // console.warn(`BEFORE: watchdogLookupObject[${key}]: `);
    // console.warn(watchdogLookupObject[key]);
    
    let responseObject = {};
    if (typeof watchdogLookupObject[key] !== 'object') {
        return responseObject;
    }
    console.warn(`AFTER: watchdogLookupObject[${key}]: `);
    console.warn(watchdogLookupObject[key]);
    responseObject = watchdogLookupObject[key];
    return responseObject;
}
// ø ==========================================================================================
// ø <---------- </extrapolateSeverityNumberSeverityWordBootstrapWordFromAny GROUP> ---------->
// ø ==========================================================================================

// ø ===============================================================================================
// ø <---------- <extrapolateSeverityNumberSeverityWordBootstrapWordFromAny DEPRECATED>  ---------->
// ø ===============================================================================================
export function getSeverityBootstrapObject_fromSeverityIndex(index) {
    // ø ¿¡ DEPRECATED !? : cannot think of a time where I will have the index but not both other words
    if (typeof index === 'number') { index = 'si' + index; }
    if (typeof index !== 'string') { return {}; }
    if (index.substr(0, 2) !== 'si') { index = 'si' + index; }
    return extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(index);
}

export function getSeverityBootstrapObject_fromSeverityWord(word) {
    // ø ¿¡ DEPRECATED !? : sincde severityWord is not conculsive, and since there is the '_fromBothWord' function...
    if (typeof word !== 'string') { return {}; }
    if (word.substr(0, 2) !== 'sw') { word = 'sw' + word; }
    return extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(word);
}
 
// ø ===============================================================================================
// ø <---------- </extrapolateSeverityNumberSeverityWordBootstrapWordFromAny DEPRECATED> ---------->
// ø ===============================================================================================
let uiUniqueKeyArray = ["EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING", "NOTICE", "primary", "success", "info", "secondary", "DEBUG", "devel"];
let uiAmbiguousKeyArray = [];

let indexUniqueDirect = 0;
let indexUniqueRandom = Math.floor(Math.random() + uiUniqueKeyArray.length)
let indexAmbiguousDirect = 0;
let indexAmbiguousRandom = Math.floor(Math.random() + uiUniqueKeyArray.length)

let wordUniqueDirect = uiUniqueKeyArray[indexUniqueDirect];
let wordUniqueRandom = uiUniqueKeyArray[indexUniqueRandom];
let wordAmbiguousDirect = uiUniqueKeyArray[indexAmbiguousDirect];
let wordAmbiguousRandom = uiUniqueKeyArray[indexAmbiguousRandom];



let extrapolateSeverityBootstrapObject = extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(word)
let uniqueSeverityBootstrapObject = getSeverityBootstrapObject_fromUniqueWord(word);
// let severityWordSeverityBootstrapObject = getSeverityBootstrapObject_fromSeverityIndex(index);
// let severityIndexSeverityBootstrapObject = getSeverityBootstrapObject_fromSeverityWord(word);

console.warn(`extrapolateSeverityBootstrapObject: extrapolateSeverityNumberSeverityWordBootstrapWordFromAny(${word}): `);
console.warn(extrapolateSeverityBootstrapObject);

console.warn(`uniqueSeverityBootstrapObject: getSeverityBootstrapObject_fromUniqueWord(${word}): `);
console.warn(uniqueSeverityBootstrapObject);
