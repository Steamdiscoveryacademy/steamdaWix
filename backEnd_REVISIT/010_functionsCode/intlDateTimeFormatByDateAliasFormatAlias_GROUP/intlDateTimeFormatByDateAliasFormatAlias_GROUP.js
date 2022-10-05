// ø <####################################################################################################>
// ø <########################################  <TESTING BLOCK>   ########################################>
// ø <####################################################################################################>

let test = 'now'
test = 'contact_createdDate'

let responseObjectThis = {};
let responseDateString = 'STRING'; 
switch (test) {
    case 'contact_createdDate':
        // responseDateString = 'Chester & Marais'; 
        let wixContactContact_createdDate = "2021-03-16T18:10:57.830Z"
        // let responseObjectThis = {};
        // responseObject.dateObject = new Date()
        responseObjectThis.dateObject = new Date(wixContactContact_createdDate)
        // console.groupCollapsed(`Just Before: intlDateTimeFormatByDateAliasFormatAlias: responseObjectThis: `)
        // console.dir(responseObjectThis)
        responseDateString = intlDateTimeFormatByDateAliasFormatAlias('na','iso', responseObjectThis); 
        break;
        
        default:
        // console.groupCollapsed(`Just Before: intlDateTimeFormatByDateAliasFormatAlias: responseObjectThis: `)
        // console.dir(responseObjectThis)
        responseDateString = intlDateTimeFormatByDateAliasFormatAlias('now','iso', responseObjectThis); 
        break;
}
// ø <wixContactContact_createdDate>
// let wixContactContact_createdDate = "2021-03-16T18:10:57.830Z"
// let responseObjectThis = {};
// responseObject.dateObject = new Date()
// responseObject.dateObject = new Date(wixContactContact_createdDate)
// let responseDateString = intlDateTimeFormatByDateAliasFormatAlias('na','iso', responseObjectThis); 
// ø </wixContactContact_createdDate>
// let responseDateString = intlDateTimeFormatByDateAliasFormatAlias('now','iso'); 

// ø <'now'>
// let responseObjectThis = {};
// let responseDateString = intlDateTimeFormatByDateAliasFormatAlias('now','iso', responseObjectThis); 
// ø </'now'>

console.groupCollapsed('responseObjectThis: : ');
console.warn(`responseDateString: : ${responseDateString}`);
console.warn('responseObjectThis: ');
// console.warn(JSON.stringify(responseObjectThis,undefined,4));
console.dir(responseObjectThis);
console.groupEnd();
// ø <####################################################################################################>
// ø <########################################  </TESTING BLOCK>  ########################################>
// ø <####################################################################################################>

// ø <====================================================================================================>
// ø <==================== <Formatted String by intlDateTimeFormat() Function Group>  ====================>
// ø <==================== <version: Intl.DateTimeFormat_toISO_v3_1_1>                ====================>
// ø <==================== <on: 2021-09-26T07:36:00>                                  ====================>
// ø <====================================================================================================>

// ø<---------- <intlDateTimeFormatByDateAliasFormatAlias>  ---------->
export function intlDateTimeFormatByDateAliasFormatAlias (dateAlias = 'na', formatAlias = 'na', responseObject = {}){
    dateAlias = dateAlias.toLowerCase();
    responseObject.dateAliasResolved = false
    if(dateAlias !== 'na'){
        buildDateObjectByAlias(dateAlias, responseObject); 
    }
    //ELSE date object of responseObjectShouldBeSet
    
    responseObject.formatAliasResolved = false;
    if(formatAlias !== 'na'){
        buildFormatObjectByAlias(formatAlias, responseObject); 
    }
    //ELSE format object of responseObjectShouldBeSet
    
    // console.groupCollapsed(`Just Before: returnDateStringByResponseObject: responseObject: `)
    // console.dir(responseObject)
    return returnDateStringByResponseObject(responseObject);
    
}
// ø<---------- </intlDateTimeFormatByDateAliasFormatAlias> ---------->


// ø<---------- <buildDateObjectByAlias>  ---------->
export function buildDateObjectByAlias(dateAlias, responseObject){
    dateAlias = dateAlias.toLowerCase();
    let supportedDateAliasArray = ['now'];
    if(!supportedDateAliasArray.includes(dateAlias)){
        //date object of responseObject (or lack thereof) will be used
        return;
    }
    let aliasResolved = false;
    if(dateAlias === 'now'){
        responseObject.dateObject = new Date();
        aliasResolved = true;
    }
    responseObject.dateAliasResolved = aliasResolved
}
// ø<---------- </buildDateObjectByAlias> ---------->

// ø<---------- <buildFormatObjectByAlias>  ---------->
export function buildFormatObjectByAlias(formatAlias, responseObject){
    formatAlias = formatAlias.toLowerCase();
    let supportedFormatAliasArray = ['iso'];
    if(!supportedFormatAliasArray.includes(formatAlias)){
        //format object of responseObject (or lack thereof) will be used
        return;
    }
    let aliasResolved = false;
    if(formatAlias === 'iso'){
        let formatObject = {};
        formatObject.options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3,
            timeZoneName: 'short'
        };
        let optionsOverideObjectArray = [];
        let optionsOverideObjectThis = {};
        optionsOverideObjectThis.index = 5;
        optionsOverideObjectThis.value = 'T';
        optionsOverideObjectArray.push(optionsOverideObjectThis);
        // responseObject.optionsOverideObjectArray = optionsOverideObjectArray;
        aliasResolved = true;
        // let formatObject = {};
        //([locales[, options]])
        formatObject.locales = 'en-ca';
        formatObject.optionsOverideObjectArray = optionsOverideObjectArray;
        responseObject.formatObject = formatObject;
        responseObject.formatAliasResolved = aliasResolved;
        
    }
}
// ø<---------- </buildFormatObjectByAlias> ---------->

// ø<---------- <returnDateStringByResponseObject>  ---------->
export function returnDateStringByResponseObject(responseObject = {}){
    let formatToPartsDate = new Intl.DateTimeFormat(responseObject.formatObject.locales, responseObject.formatObject.options).formatToParts(responseObject.dateObject);
    responseObject.formatObject.optionsOverideObjectArray.forEach(elementObject => {
        // console.log(elementObject);
        formatToPartsDate[elementObject.index].value = elementObject.value;
    });
    
    let formatToPartsDateString = '';
    formatToPartsDate.forEach(elementObject => {
        // console.log(elementObject);
        formatToPartsDateString += elementObject.value;
    });
    responseObject.dateString = formatToPartsDateString;
    // responseObjectThis.dateObject = new Date(wixContactContact_createdDate)
    responseObjectThis.dateParts = {}
    responseObjectThis.dateParts.getFullYear = responseObjectThis.dateObject.getFullYear()
    responseObjectThis.dateParts.getMonth = responseObjectThis.dateObject.getMonth()
    responseObjectThis.dateParts.humanMonth = responseObjectThis.dateObject.getMonth() + 1
    responseObjectThis.dateParts.getDate = responseObjectThis.dateObject.getDate()
    responseObjectThis.dateParts.getHours = responseObjectThis.dateObject.getHours()
    responseObjectThis.dateParts.getMinutes = responseObjectThis.dateObject.getMinutes()
    responseObjectThis.dateParts.getSeconds = responseObjectThis.dateObject.getSeconds()
    responseObjectThis.dateParts.getMilliseconds = responseObjectThis.dateObject.getMilliseconds()
    responseObjectThis.dateParts.getTimezoneOffset = responseObjectThis.dateObject.getTimezoneOffset()
    responseObjectThis.dateParts.hoursTimeZoneOffset = responseObjectThis.dateObject.getTimezoneOffset() / 60       
    responseObjectThis.dateParts.notes = [
        `"get" prefixed parts connote a corollary function`,
        `for example, "dateParts.getMonth" was gotten by way of the "getMonth()" function`,
        `however, "dateParts.humanMonth" was gotten by way of the "getMonth() + 1" manual calculation`,
        `similary, "dateParts.getTimezoneOffset" was gotten by way of the "getTimezoneOffset()" function`,
        `yet, "dateParts.hoursTimeZoneOffset" was gotten by way of the "getTimezoneOffset() / 60" manual calculation`
    ]
    return formatToPartsDateString;
}
// ø<---------- </returnDateStringByResponseObject> ---------->

// ø <====================================================================================================>
// ø <==================== </Formatted String by intlDateTimeFormat() Function Group> ====================>
// ø <====================================================================================================>