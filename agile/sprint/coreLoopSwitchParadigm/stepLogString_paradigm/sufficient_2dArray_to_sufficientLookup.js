let sufficient_2dArray = [["EMERGENCY","danger"],["CRITICAL","danger"],["ERROR","danger"],["danger","ERROR"],["ALERT","warning"],["WARNING","warning"],["NOTICE","warning"],["success","INFO"],["primary","INFO"],["info","INFO"],["secondary","INFO"],["devel","DEBUG"],["DEBUG","devel"]];

// console.warn('sufficient_2dArray: ');
// console.warn(JSON.stringify(sufficient_2dArray,undefined,4));


let sufficientLookupObject = {};
let elementObjectKey = 'UPPER_CASE_STRING';
let elementObject = {};
let kind = 'UNKNOWN';
sufficient_2dArray.forEach(elementArray => {
    // console.log(elementArray);
    kind = elementArray[0] === (elementArray[0]).toUpperCase() ? 'WATCHDOG' : kind;
    kind = elementArray[0] === (elementArray[0]).toLowerCase() ? 'BOOTSTRAP' : kind;
    elementObjectKey = (elementArray[0]).toUpperCase();
    elementObject = {};
    if(kind === 'WATCHDOG'){
        elementObject.bootstrap = (elementArray[1]).toUpperCase()
        elementObject.watchdog = (elementArray[0]).toUpperCase()
    }
    if(kind === 'BOOTSTRAP'){
        elementObject.bootstrap = (elementArray[0]).toUpperCase()
        elementObject.watchdog = (elementArray[1]).toUpperCase()
    }
    sufficientLookupObject[elementObjectKey] = elementObject;
});

console.warn('sufficientLookupObject: ');
console.warn(sufficientLookupObject);
console.warn(JSON.stringify(sufficientLookupObject,undefined,4));