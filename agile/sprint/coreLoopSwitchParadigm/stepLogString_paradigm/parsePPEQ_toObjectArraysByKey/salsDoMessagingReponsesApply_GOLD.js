// ø <---------- <salsDoMessagingReponsesApply UI>  ---------->
export async function salsDoMessagingReponsesApply(responseObject = {}, paramObject = {}) {
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
    let messageObjectArraysByKey = parsePPEQ_toObjectArraysByKey(memory.getItem('stepLogString'));
    $w('#stMemberResponseJSON').value = JSON.stringify(messageObjectArraysByKey,undefined,4);
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
local.setItem('stepMessagingJSON', JSON.stringify(doxObject));
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
