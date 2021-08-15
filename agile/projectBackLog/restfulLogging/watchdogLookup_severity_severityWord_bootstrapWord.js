// let schemaSeverityJSON = `[["EMERGENCY","danger"],["ALERT","danger"],["CRITICAL","danger"],["ERROR","danger"],["WARNING","warning"],["NOTICE","info"],["INFO","info"],["INFO","secondary"],["INFO","primary"],["INFO","success"],["DEBUG","devel"]]`;
let schemaSeverityJSON = `[["EMERGENCY","danger"],["ALERT","danger"],["CRITICAL","danger"],["ERROR","warning"],["WARNING","warning"],["NOTICE","warning"],["INFO","info"],["INFO","secondary"],["INFO","primary"],["INFO","success"],["DEBUG","devel"]]`;
let schemaSeverityArray = JSON.parse(schemaSeverityJSON);
let uniqueKeyArray = ["EMERGENCY","ALERT","CRITICAL","ERROR","WARNING","NOTICE","primary","success","info","secondary","DEBUG","devel"];

let element = [];
let elementObject = {};
let siKey = 'si'; 
let swKey = 'sw'; 
let bwKey = 'bw'; 
let isUnique = false;
let uniqueKey = 'PENDING';
// let overallOnject = {}; 
let watchdogLookupObject = {}; 
for (let index = 0; index < schemaSeverityArray.length; index++) {
    element = schemaSeverityArray[index];
    // console.warn('element: ');
    // console.warn(element);
    elementObject = {};
    elementObject.severityIndex = index;
    elementObject.severityWord = element[0];
    elementObject.boostrapWord = element[1];
    // console.warn('elementObject: ');
    // console.warn(elementObject);
    siKey = 'si' + index;
    swKey = 'sw' + (element[0]).toUpperCase(); 
    bwKey = 'bw' + (element[1]).toUpperCase();
    uniqueKey = 'FFALSE';
    uniqueKey = uniqueKeyArray.includes(element[0]) ? element[0] : uniqueKey;
    uniqueKey = uniqueKeyArray.includes(element[1]) ? element[0] : uniqueKey;

    if(uniqueKey !== 'FFALSE'){
        watchdogLookupObject[uniqueKey] = elementObject;
    }

    
    watchdogLookupObject[siKey] = elementObject;
    watchdogLookupObject[swKey] = elementObject;
    watchdogLookupObject[bwKey] = elementObject;





}
console.warn('//watchdogLookupObject: ');
console.warn(JSON.stringify(watchdogLookupObject));
console.warn('//Pretty: watchdogLookupObject: ');
console.warn(JSON.stringify(watchdogLookupObject,undefined,4));
