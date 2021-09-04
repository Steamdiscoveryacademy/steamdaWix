let responseObjectDEVEL = {};
let paramStepLogString = "PENDING";
paramStepLogString /*onRamp*/ = "primary=Primary Override within onRampZERO()==FFALSE=stateOnramp=ZERO|warning=Override Base Success with Different Warning within onRampZERO(1)==FFALSE=stateOnramp=ZERO|danger=Override Base Success with Different Danger within onRampZERO(1)==FFALSE=stateOnramp=ZERO|info=Override Base Info with Different Info within onRampZERO()==FFALSE=stateOnramp=ZERO|primary=Override ZERO Script Primary with Different Primary UI==FFALSE=stateOnramp=ZERO|success=Override Base Success with Different Success UI==FFALSE=stateOnramp=ZERO|danger=danger zero core force==FFALSE=stateOnramp=ZERO|danger=danger in end of ui force==FFALSE=stateOnramp=ZERO|";
// paramStepLogString /*instantiate*/ = "info=The 'IINSTANTIATE' Step has an Info Override UI==FFALSE=stateInstantiate=IINSTANTIATE|danger=danger in end of ui force==FFALSE=stateInstantiate=IINSTANTIATE|";
responseObjectDEVEL.ppEQ = paramStepLogString;


salsDoMessagingReponsesApply(responseObjectDEVEL);

responseObjectDEVEL.doxObject = {};
responseObjectDEVEL.messageObjectArraysByKey = [];

console.log('paramStepLogString: ');
let paramStepLogStringArray = (responseObjectDEVEL.ppEQ).split('|');
let paramStepLogStringDisplay = '';
paramStepLogStringArray.forEach(element => {
    // console.log(element);
    paramStepLogStringDisplay += element + '|\n';
});
console.log(paramStepLogStringDisplay);

// console.log('messageObjectArraysByKey: ');
// console.log(responseObjectDEVEL.messageObjectArraysByKey);

// console.log('doxObject: ');
// console.log(responseObjectDEVEL.doxObject);


// ! <Live at Stamp>
// ø <---------- <parsePPEQ_toObjectArraysByKey UTILITY>  ---------->
function parsePPEQ_toObjectArraysByKey(ppeqString = 'STRING'){
    // pstEnrSeven202108UTILITY SHORT
    // pstEnrSeven20210822_MESSAGING
    let accordingToSufficientBootstrapWatchdog = "not Necessary, parses to ObjectArrayByKey (objects), with bootstrap-watchdog of 'NA' if no match";
    // let sufficientObjectLookup = { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY' },CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL' },ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR' },DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR' },ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT' },WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING' },NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE' },SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO' },PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO' },INFO: { bootstrap: 'INFO', watchdog: 'INFO' },SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO' },DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG' },DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG' } };
    // let sufficientObjectLookup = { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY', uiPlacement: 'RESPONSE' }, CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL', uiPlacement: 'RESPONSE' }, ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT', uiPlacement: 'RESPONSE' }, WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING', uiPlacement: 'RESPONSE' }, NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE', uiPlacement: 'RESPONSE' }, SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO', uiPlacement: 'INFO' }, PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO', uiPlacement: 'PRIMARY' }, INFO: { bootstrap: 'INFO', watchdog: 'INFO', uiPlacement: 'INFO' }, SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO', uiPlacement: 'SECONDARY' }, DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' }, DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' } };
    // let sufficientObjectLookup /*MANUAL UPDATE succes-placement 20210822091400*/= { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY', uiPlacement: 'RESPONSE' }, CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL', uiPlacement: 'RESPONSE' }, ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT', uiPlacement: 'RESPONSE' }, WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING', uiPlacement: 'RESPONSE' }, NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE', uiPlacement: 'RESPONSE' }, SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO', uiPlacement: 'RESPONSE' }, PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO', uiPlacement: 'PRIMARY' }, INFO: { bootstrap: 'INFO', watchdog: 'INFO', uiPlacement: 'INFO' }, SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO', uiPlacement: 'SECONDARY' }, DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' }, DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' } };
    let sufficientObjectLookup /*GOLD .js Update 20210822091500*/ = { EMERGENCY: { bootstrap: 'DANGER', watchdog: 'EMERGENCY', uiPlacement: 'RESPONSE' }, CRITICAL: { bootstrap: 'DANGER', watchdog: 'CRITICAL', uiPlacement: 'RESPONSE' }, ERROR: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, DANGER: { bootstrap: 'DANGER', watchdog: 'ERROR', uiPlacement: 'RESPONSE' }, ALERT: { bootstrap: 'WARNING', watchdog: 'ALERT', uiPlacement: 'RESPONSE' }, WARNING: { bootstrap: 'WARNING', watchdog: 'WARNING', uiPlacement: 'RESPONSE' }, NOTICE: { bootstrap: 'WARNING', watchdog: 'NOTICE', uiPlacement: 'RESPONSE' }, SUCCESS: { bootstrap: 'SUCCESS', watchdog: 'INFO', uiPlacement: 'RESPONSE' }, PRIMARY: { bootstrap: 'PRIMARY', watchdog: 'INFO', uiPlacement: 'PRIMARY' }, INFO: { bootstrap: 'INFO', watchdog: 'INFO', uiPlacement: 'INFO' }, SECONDARY: { bootstrap: 'SECONDARY', watchdog: 'INFO', uiPlacement: 'SECONDARY' }, DEVEL: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' }, DEBUG: { bootstrap: 'DEVEL', watchdog: 'DEBUG', uiPlacement: 'DEVEL' } };
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
        elementObject.message = typeof elementArray[1] === 'undefined' ? '' : elementArray[1];
        elementObject.key = key;
        holder = typeof elementArray[2] === 'string' ? elementArray[2] : '';
        elementObject.line = elementArray[2];
        elementObject.bootstrap = lookupObject.bootstrap;
        elementObject.watchdog = lookupObject.watchdog;
        elementObject.uiPlacement = lookupObject.uiPlacement;
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
// ! </Live at Stamp>

// ø <---------- <salsDoMessagingReponsesApply UI>  ---------->
function salsDoMessagingReponsesApply(responseObject = {}, paramObject = {}) {
    let DOX = 'JUST FOR VISIBLE DOX IN WIX';
    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING ==> Begin Messaging';
    // local.setItem('logString', local.getItem('logString') + ',' + DOX);
    //pstEnrSeven20210822_MESSAGING

    /**
     * A FEW PARADIGMS AT WORK:
     * • faux{BOOTSTRAP_WORD}
     * • 'DEFAULT' Alias
     * ø ¿ Other Aliases ?
     * ø  ¡stepLogSting Paradigm !
     * ø ¡¿ logSting Paradigm ?! - so early, could be obviated
     * ø ¡¿ responseObject/paramObject.logArrayDeveloper Paradigm ?! - so early, could be obviated
     * ø ¡¿ responseObject/paramObject.paramObject.logArrayUserInterface Paradigm ?! - so early, could be obviated
     */
    if(DOX === `Source Object for memory.get('stepLogString') Paradigm`){
        let sourceObjectThis = {};
        sourceObjectThis.site = 'Brad Lowry Mac';
        sourceObjectThis.title = 'stepLogSting_paradigm.yml';
        sourceObjectThis.subTitle = 'How to parse memory.getItem(stepLogString) for Messaging';
        sourceObjectThis.author = 'Brad Lowry';
        sourceObjectThis.authorContact = 'brad@steamda.com';
        sourceObjectThis.url = '/Users/brad/Documents/bradRepositories/vsCode/steamdaWixLocal/steamdaWix/agile/sprint/coreLoopSwitchParadigm/stepLogString_paradigm/stepLogSting_paradigm.yml'
        sourceObjectThis.notes = ['new 20210819 but pretty good, lots of history with zPIPEz zEQz strings as data in the past',
                                'also works as blood-brain-barrier with other methods'];
    }
    // let messageObjectArraysByKey = parsePPEQ_toObjectArraysByKey(memory.getItem('stepLogString'));
    let messageObjectArraysByKey = parsePPEQ_toObjectArraysByKey(responseObject.ppEQ);
    // console.warn('messageObjectArraysByKey: ');
    // console.warn(messageObjectArraysByKey);
    responseObject.messageObjectArraysByKey = messageObjectArraysByKey;
    return;
    // $w('#stMemberResponseJSON').value = JSON.stringify(messageObjectArraysByKey,undefined,4);
    // pstEnrSeven202108UTILITY BEGIN
    // pstEnrSeven202108SALSDoMessaging BEGIN


    // let primaryMessageObjectArray = [];
    // let secondaryMessageObjectArray = [];
    // let responseMessageObjectArray = [];
    // let infoMessageObjectArray = [];
     
    let primaryMessageObjectArray = [ { message: 'HOLDER message to make object valid', bootstrap: 'HOLDER' } ];
    let secondaryMessageObjectArray = [ { message: 'HOLDER message to make object valid', bootstrap: 'HOLDER' } ];
    let responseMessageObjectArray = [ { message: 'HOLDER message to make object valid', bootstrap: 'HOLDER' } ];
    let infoMessageObjectArray = [ { message: 'HOLDER message to make object valid', bootstrap: 'HOLDER' } ];
     

    let messageObjectArrayKeys = Object.keys(messageObjectArraysByKey);
    let objectArray = [];
    messageObjectArrayKeys.forEach(objectKey => {
       objectArray = messageObjectArraysByKey[objectKey];
            objectArray.forEach(messageObject => {
                if(messageObject.uiPlacement === 'PRIMARY'){primaryMessageObjectArray.unshift(messageObject);}
                if(messageObject.uiPlacement === 'SECONDARY'){secondaryMessageObjectArray.unshift(messageObject);}
                if(messageObject.uiPlacement === 'RESPONSE'){responseMessageObjectArray.unshift(messageObject);}
                if(messageObject.uiPlacement === 'INFO'){infoMessageObjectArray.unshift(messageObject);}
            });
       });         
    // });
// ø <Just for DOX>
let doxObject = {};
doxObject.primary = primaryMessageObjectArray;
doxObject.secondary = secondaryMessageObjectArray;
doxObject.response = responseMessageObjectArray;
doxObject.info = infoMessageObjectArray;
// $w('#sessionEnrollmentJSON').value = JSON.stringify(doxObject,undefined,4);
// $w('#txtStateObjectCurrentSeven').value = JSON.stringify(doxObject,undefined,4);
// local.setItem('stepMessagingJSON', JSON.stringify(doxObject));
responseObject.doxObject = doxObject;
// ø </Just for DOX>

let countPrimaryMessage = primaryMessageObjectArray.length - 1;
let countSecondaryMessage = secondaryMessageObjectArray.length - 1;
let countResponseMessage = responseMessageObjectArray.length - 1;
let countInfoMessage = infoMessageObjectArray.length - 1;

let responseOneFromMany = [];
// let thisMessagingObjectReturnArray = [];
// let thisMessagingMessage = 'HOLDER';
// let thisMessagingKey = 'HOLDER';

let zeroPrimaryMessage = `There were No Primary Overload Messages for this State-Step`;
let onePrimaryMessage = primaryMessageObjectArray[0].message;
let manyPrimaryMessage = `There were Many (${countPrimaryMessage})  Primary Overload Messages for this State-Step`;
if(countPrimaryMessage > 1){manyPrimaryMessage = primaryMessageObjectArray[0].message;}
/*As per 'Cascading' of CSS, the most recent takes prioruty*/

 
let zeroSecondaryMessage = `There were No Secondary Overload Messages for this State-Step`;
let oneSecondaryMessage = `There was One Secondary Overload Messages for this State-Step`;
let manySecondaryMessage = `There were Many (${countSecondaryMessage})  Secondary Overload Messages for this State-Step`;
// if(countSecondaryMessage > 1){manySecondaryMessage = ppeqOneMessageFromMany(secondaryMessageObjectArray);}
 
let responseBootstrap = countResponseMessage === 0 ? 'success' : responseMessageObjectArray[0].bootstrap;
let zeroResponseMessage = responseObject.currentMessagingObject.success;
// let oneResponseMessage = `There was One Response Overload Messages for this State-Step`;
let oneResponseMessage = responseMessageObjectArray[0].message;
let manyResponseMessage = `There were Many (${countResponseMessage})  Response Overload Messages for this State-Step`;
if(countResponseMessage > 1){responseOneFromMany = ppeqOneMessageFromMany(responseMessageObjectArray); responseBootstrap = responseOneFromMany[0]; manyResponseMessage = responseOneFromMany[1];}
 
let zeroInfoMessage = responseObject.currentMessagingObject.info;
let oneInfoMessage = infoMessageObjectArray[0].message;
let manyInfoMessage = `There were Many (${countInfoMessage})  Info Overload Messages for this State-Step`;
// if(countInfoMessage > 1){manyInfoMessage = ppeqOneMessageFromMany(infoMessageObjectArray);}
if(countInfoMessage > 1){manyInfoMessage = infoMessageObjectArray[0].message;}
/*As per 'Cascading' of CSS, the most recent takes prioruty*/
 
let messagePrimary = countPrimaryMessage === 0 ? zeroPrimaryMessage : manyPrimaryMessage;
messagePrimary = countPrimaryMessage === 1 ? onePrimaryMessage : messagePrimary;
 
let messageSecondary = countSecondaryMessage === 0 ? zeroSecondaryMessage : manySecondaryMessage;
messageSecondary = countSecondaryMessage === 1 ? oneSecondaryMessage : messageSecondary;
 
// let responseBootstrap = 'success';
let messageResponse = countResponseMessage === 0 ? zeroResponseMessage : manyResponseMessage;
messageResponse = countResponseMessage === 1 ? oneResponseMessage : messageResponse;
 
let messageInfo = countInfoMessage === 0 ? zeroInfoMessage : manyInfoMessage;
messageInfo = countInfoMessage === 1 ? oneInfoMessage : messageInfo;

if(countPrimaryMessage > 0){$w('#txtBootstrapPrimary').html = doBootstrapMessage('primary', messagePrimary, [[-1, 36], [50, 28]]);}
if(countInfoMessage > -1 && messageInfo !== 'EEMPTY'){$w('#txtBootstrapInfo').html = doBootstrapMessage('info', messageInfo, [[-1, 36], [50, 28]]); $w('#txtBootstrapInfo').expand();}
if(countResponseMessage > -1){$w('#txtBootstrapResponse').html = doBootstrapMessage(responseBootstrap, messageResponse, [[-1, 36], [50, 28]]);$w('#txtBootstrapResponse').expand();}





    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING ==> DISABLED_nonPPEQ_20210821 ≈Z4808≈ thru ≈Z4895≈';
    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING ==> Return from Messaging ==> pstEnrSeven202108STEP_P_04MESSAGING_RETURN';
    // local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// ø <---------- </salsDoMessagingReponsesApply UI>  ---------->
