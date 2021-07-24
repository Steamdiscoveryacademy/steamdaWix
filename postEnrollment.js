// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import {local, session, memory} from 'wix-storage';
import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import { getUser } from 'backend/userReference.jsw'
import { updateUserFields } from 'backend/userReference.jsw'
import { steamdaGetContactFunction } from 'backend/crmModule.jsw'
import { steamdaCreateContactFunction } from 'backend/contactReference.jsw'
import { streamdaUpdateContactFunction } from 'backend/contactReference.jsw'
import { steamdaGetContactByEmailFunction } from 'backend/contactReference';
import { steamdaGetContactByEmailAndNotIdFunction } from 'backend/contactReference';
import { steamdaDeleteContactById } from 'backend/contactReference';
import { nowISO } from 'backend/utility.jsw'
import wixData from 'wix-data';
import wixWindow from 'wix-window';


/**
 * ! QICK-FIND UniqueID's for Blocks
 * ! ===============================
 // ø YIKES = something that needs attention do keep here even if none (well one, this) at atthis time
 // ø pstEnrSevenCore202107 = pstEnrSeven  Core Logic of PERFORM & NEXT 
 // ø pstEnrSevenUtility202107 = work surrounding pstEnrSeven
 */


$w.onReady(function () {
    // ø <UI Disable PP, ST & SP Buttons>
    // $w('#btnStaffEyeD').disable();
    // ø </UI Disable PP, ST & SP Buttons>
	onReadyPostEnrollment();
    doUserInterfaceCleanupCurrent()
    // $w('#anchorPreTrash').scrollTo();
    $w('#anchorTestProcess').scrollTo();
    // goToState()
    console.log('[ready]Next');
    
    // ø <NEW>
    let initLog = '$w.onReady() NEW';
    mxboxPostEnrollmentSevenActionOnReady(initLog)
    // ø </NEW>
    // ø <OLD>
    // let responseObject = {};
    // // local.getItem('timezoneOffset')
    // // local.getItem('tzAbbrv')
    // responseObject.TEST = true;
    // responseObject.logArrayUserInterface = [];
    // responseObject.logArrayDeveloper = [];
    // responseObject.logArrayDeveloper.push('$w.onReady()');
    // responseObject.button = 'NEXT';
    // responseObject.messageKey = 'primary';
    // memory.setItem('msboxLastState','stateZero')
    // // let messageKeyArray= ["success","warning","danger","info","devel"];
    // // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    // mxboxPostEnrollmentSevenAnyAction(responseObject);
    // ø </OLD>
    // ø <UNIVERSAL - Devel Notes>
    let develString = `mxboxPostEnrollmentSeven 'Next-Kludge' working`;
    if (typeof develString === 'string' && develString.length > 0) {
        develString = 'develNotes:\n===========\n' + develString;
        let html = doBootstrapMessage('devel',develString,[[-1,18]]); 
        $w('#txtOnReadyDevelHMTL').html = html;
        $w('#txtOnReadyDevelHMTL').expand();
    }
    // ø </UNIVERSAL - Devel Notes>
});


export function onReadyPostEnrollment(){
    let now = new Date();
    let ISO = now.getFullYear() + ("00" +(now.getMonth() + 1)).substr(-2) + ("00" + now.getDate()).substr(-2) + ("00" + now.getHours()).substr(-2) + ("00" + now.getMinutes()).substr(-2) + ("00" + now.getSeconds()).substr(-2);
    if(Number(ISO) < Number("20210814235959")){
        local.setItem('timezoneOffset',-4);
        local.setItem('tzAbbrv', 'EDT');
        local.setItem('termId','202106');
        local.setItem('termLabelKey','custom.t202106');
        let weekIdToLabelKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        let weekIdToLabelKeyJSON = JSON.stringify(weekIdToLabelKeyArray);
        local.setItem('weekIdToLabelKeyJSON',weekIdToLabelKeyJSON);
        local.setItem('termBeginMMDD','0607');
        local.setItem('termEndMMDD','0813');
        local.setItem('kAppendString','\n\nNo Action taken.\nPlease try again, or ask for assistance.');
    }
}


// ! ====================================================================================================
// ! ====================            <Overall Enrollment Steps Loop-Switch Code>           ==============
// ! ====================        ...for Testing, Running, (perhaps later) Debugging        ==============
// ! ====================================================================================================
export async function doPeformNextStep(){
    local.setItem('logString', local.getItem('logString') + '\n[~50]entering: ' + 'doPeformNextStep()')
	$w('#txtCodeLabel').text = 'doPerformNextStep';
	local.setItem('loopExitAfterStep', $w('#ddExitAfterStep').value);
	await doStepLoopSwitch();
    local.setItem('logString', local.getItem('logString') + '\n[~58]After Completed: ' + memory.getItem('enrollmentStepCompleted'))
}
// ø <---------- <doStepLoopSwitch>  ---------->
export async function doStepLoopSwitch() {
    local.setItem('logString', local.getItem('logString') + '\n[~62]entering: ' + 'doStepLoopSwitch()')
    let stepKey = 'PPENDING';
    let stepArray = memory.getItem('enrollmentStepList').split(',');
    for (let stepArrayIndex = 0; stepArrayIndex < stepArray.length; stepArrayIndex++) {
        stepKey = stepArray[stepArrayIndex];
        console.warn('stepKey[' + stepArrayIndex + ']:' + stepKey);
        let errorString = '';
        switch (stepKey) {
            case 'IINSTANTIATE':
				await doInstantiateLoopSwitchStep();
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_ppMember':
                await ppMemberPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_ppMember':
                await ppMemberExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stMember':
                await stMemberPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_stMember':
                await stMemberExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;

            case 'dedupePpStContact':
                await ppStContactDedupe()
                console.log('Step: ' + stepKey)
                break;



            case 'PREP_ppContact':
                await ppContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_ppDatabase':
                await ppDatabasePrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stContact':
                await stContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stDatabase':
                await stDatabasePrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_spContact':
                await spContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_spDatabase':
                // await spDatabasePrepJSON()
                await spDatabaseExecuteUpsert()
                console.log('Step: ' + stepKey)
                local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~116]Function-Swapped to ppDatabaseExecuteUpsert()')
                break;
            case 'EXECUTE_ppContact':
                await ppContactExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_ppDatabase':
                await ppDatabaseExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_stContact':
                await stContactExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_stDatabase':
                await stDatabaseExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_spContact':
                await spContactExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_spDatabase':
                await spDatabasePrepJSON()
                local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~133]Function-Swapped to await spDatabasePrepJSON()')
                // spDatabaseExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'CCOMPLETE':
                console.log('Step: ' + stepKey)
                break;

            default:
                errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
                break;
        }
		stepsCycleSteps();
        // ø <ExitAfter Switch Check>
        doCheckExitAfter();
        if (memory.getItem('loopExitNow') !== 'FFALSE') {
            local.setItem('logString', local.getItem('logString') + '\n[~150]exiting (Break Loop is Exit): ' + 'doStepLoopSwitch()')
            break;//(Break Loop is Exit)
        }
        // ø </ExitAfter Switch Check>
    }
}
// ø <---------- </doStepLoopSwitch> ---------->

// ø <---------- <doIfElseThen_forCurrentStep>  ---------->
export function doIfElseThen_forCurrentStep(stepItemKey = 'iiStepKey'){
    let actionKey = stepItemKey.substr(0,2) + 'Action';
    let stepItemIndex = stepItemKey.indexOf('Member') > 0 ? 0 : 777;
    stepItemIndex = stepItemKey.indexOf('Contact') > 0 ? 1 : stepItemIndex;
    stepItemIndex = stepItemKey.indexOf('Database') > 0 ? 2 : stepItemIndex;

    // only two THEN response values: 'CONTINUE' or 'RETURN' 
    // only ELSE response value: 'ALERT' 
    let logString = '';
    let stepArray = memory.getItem('enrollmentStepList').split(',');
    let stepItemKeyArray = ['ppMemberPrepJSON','ppMemberExecuteUpsert','stMemberPrepJSON','stMemberExecuteUpsert','ppContactPrepJSON','ppDatabasePrepJSON','stContactPrepJSON','stDatabasePrepJSON','spContactPrepJSON','spDatabaseExecuteUpsert','ppContactExecuteUpsert','ppDatabaseExecuteUpsert','stContactExecuteUpsert','stDatabaseExecuteUpsert','spContactExecuteUpsert','spDatabasePrepJSON'];

    let whichAction = stepItemIndex === 0 ? 'Member' : 'ERROR';
    whichAction = stepItemIndex === 1 ? 'Contact' : whichAction;
    whichAction = stepItemIndex === 2 ? 'Dbase' : whichAction;
    // CRAZY: but due to the order in which the code changed, IIABDFI
    
    // ø <thisELSE>
    if (stepItemKeyArray.includes(stepItemKey) === false) {
        //since there is no place to 'PUT' this ELSE then just return
        local.setItem('lastErrorString',`'ELSE_ALERT': IfElseThen stepItemKey: ${stepItemKey}`)
        return 'ELSE_ALERT';
    }
    if (actionKey === 'iiAction') {
        memory.setItem(stepItemKey,`'ELSE_ALERT': IfElseThen actionKey: ${actionKey}`);
        return 'ELSE_ALERT';
    }
    if (whichAction === 'ERROR') {
        memory.setItem(stepItemKey,`'ELSE_ALERT': IfElseThen actionKeyIndex: ${stepItemIndex} [${whichAction}]`);
        return 'ELSE_ALERT';
    }
    // ø </thisELSE>
    
    
    // ø <ELSE>
    /**
     * ! use stepItemKeyArray to make below more precise
     */
    let responseKey = 'CONTINUE';
    let thisAction = memory.getItem(actionKey).split('|')[stepItemIndex]; 
    logString += '\n' + `[~200] memory.getItem('${actionKey}').split('|')[${stepItemIndex}]: '${thisAction}'` + '\n';
    if(thisAction === 'SKIP'){
        logString = "based on action, '" + thisAction + "', no further action in this Step-Function";
        memory.setItem(stepItemKey,logString);
        logString = `memory.setItem(${stepItemKey}): ${logString}`;
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        responseKey = 'RETURN';
        return responseKey;
    }
    if(thisAction === 'NA'){
        logString = "based on action, '" + thisAction + "', no further action in this Step-Function";
        memory.setItem(stepItemKey,logString);
        logString = `memory.setItem(${stepItemKey}): ${logString}`;
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        responseKey = 'RETURN';
        return responseKey;
    }
    if(thisAction !== 'INSERT' && thisAction !== 'UPDATE'){
        logString = "because the action, '" + thisAction + "', is NOT supported this is an error";
        memory.setItem(stepItemKey,logString);
        logString = `memory.setItem(${stepItemKey}): ${logString}`;
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('superEnrollmentStatus','ALERT');
        responseKey = 'RETURN';
        return responseKey;
    }
    // ø </ELSE> 
    return responseKey;
}
export function demoLoop_doIfElseThen(){
    let stepItemKeyArray = ['ppMemberPrepJSON','ppMemberExecuteUpsert','stMemberPrepJSON','stMemberExecuteUpsert','ppContactPrepJSON','ppDatabasePrepJSON','stContactPrepJSON','stDatabasePrepJSON','spContactPrepJSON','spDatabaseExecuteUpsert','ppContactExecuteUpsert','ppDatabaseExecuteUpsert','stContactExecuteUpsert','stDatabaseExecuteUpsert','spContactExecuteUpsert','spDatabasePrepJSON'];
    let testWho = 'II';
    let testWhich = 999;
    let testActionKeyIndex = 0;
    let testActionKey = 'iiAction';
    let responseThis = 'TEST_PENDING';
    let responseThisArray = [];
    let testResponseArray = [];
    stepItemKeyArray.forEach(stepItemKey => {
        testActionKey = stepItemKey.substr(0,2) + 'Action';
        testWho = stepItemKey.substr(0,2).toLocaleUpperCase();
        testWhich = stepItemKey.indexOf('Member') > 0 ? 0 : 777;
        testWhich = stepItemKey.indexOf('Contact') > 0 ? 1 : testWhich;
        testWhich = stepItemKey.indexOf('Database') > 0 ? 2 : testWhich;
        testActionKeyIndex = testWhich;
        responseThis = doIfElseThen_forCurrentStep(testActionKey,testActionKeyIndex,stepItemKey);
        responseThisArray = [testActionKey,testActionKeyIndex,stepItemKey,responseThis];
        testResponseArray.push(responseThisArray);
    });
    return testResponseArray;
}
// ø <---------- </doIfElseThen_forCurrentStep> ---------->

// ! ====================================================================================================
// ! ====================            </Overall Enrollment Steps Loop-Switch Code>          ==============
// ! ====================================================================================================

// ! ====================================================================================================
// ! ====================                 <Front-End Code Calling Back-End Code>           ==============
// ! ====================             ...core to the Final Enrollment Process              ==============
// ! ====================================================================================================

// ø <---------- <getUserFrontEnd Front-End>  ---------->
export async function getUserFrontEnd(memberId) {
	let thisUserData = await getUser(memberId); 
	console.log('thisUserData: ');
	console.log(thisUserData);
    return thisUserData;
}
// ø <---------- </getUserFrontEnd Front-End> ---------->


// ø <----------- <doUpdateContact Front-End>  ----------->
export async function doUpdateContact(paramObjectThis) {
	console.log('[~170]paramObjectThis:')
	console.log(paramObjectThis)
    
	let wixContact = await streamdaUpdateContactFunction(paramObjectThis);
	console.log('[~LINE 174]wixContact: ');
	console.log(wixContact);
	$w('#ppContactResponseJSON').value = JSON.stringify(wixContact,undefined,4);
}
// ø <----------- </doUpdateContact() Front-End> ----------->

// ø <----------- <doSecondaryParentCreateContact Front-End>  ----------->
export async function doSecondaryParentCreateContact() {
    local.setItem('logString', local.getItem('logString') + '\n[~197]entering: ' + 'doSecondaryParentCreateContact()');

    let paramObjectThis = JSON.parse(memory.getItem('spContactPrepJSON'));
	console.log("[~LINE 200]paramObjectThis.contactInfo: ")
	let wixContact = await steamdaCreateContactFunction(paramObjectThis);
    if(typeof wixContact._id === 'string'){
        local.setItem('secondaryId',wixContact._id)
        console.log('[~LINE 204]wixContact: ');
        console.log(wixContact);
        memory.setItem('spContactExecuteUpsert',JSON.stringify(wixContact));
    }else{
        memory.setItem('spContactExecuteUpsert','doSecondaryParentCreateContact() FAIL');
        local.setItem('logString', local.getItem('logString') + '\n[~217]exiting: ' + 'doSecondaryParentCreateContact() FAIL');
    }
    local.setItem('logString', local.getItem('logString') + '\n[~216]exiting: ' + 'doSecondaryParentCreateContact()');
}
// ø <----------- </doSecondaryParentCreateContact Front-End> ----------->
// ø <---------- <getContactByEmail Front-End>  ---------->
export async function getContactByEmail(emailToFind) {
	let queryRresults = await steamdaGetContactByEmailFunction(emailToFind);
    return queryRresults;
	let results = `the Query of Contacts for \nPrimary Email: '${emailToFind}' \nReturned:\n`;
	results += `BEGIN queryRresults:\n`;
	results += JSON.stringify(queryRresults,undefined,4);
	results += `\nEND queryRresults`;
}
// ø <---------- </getContactByEmail Front-End> ---------->

// ø <---------- <getContactByEmailAndNotIdFunction Front-End>  ---------->
export async function getContactByEmailAndNotIdFunction(emailToFind = 'invalid Email',notIdToFind = 'invalid Id', diagnosticOnly = false) {
    let isValid = emailToFind.indexOf('@') > 0 ? true : false;
    isValid = notIdToFind.length !== 36 ? false : isValid;
    let logString = '';
    logString += `\nemailToFind: ${emailToFind}`;
    logString += `\nnotIdToFind: ${notIdToFind}`;
    if (!isValid) {
        logString = 'One of the two following Parameter Values is InValid:' + logString;
        
        local.setItem('logString', logString);
        return;
    }
    logString = 'For the following Parameters:' + logString;
    
	let queryRresults = await steamdaGetContactByEmailAndNotIdFunction(emailToFind,notIdToFind);
    let count = queryRresults.resultsCount;
    
    logString += `\nthe Query of Contacts for \nPrimary Email Equal to: '${emailToFind}' \nAND Contact Primary Email Not-Equal to: ${notIdToFind}`;
    logString += `\nReturned:\n`;
    logString += `BEGIN queryRresults:\n`;
    logString += JSON.stringify(queryRresults,undefined,4);
    logString += `\nEND queryRresults\n`;
    if (count > 1) {
        local.setItem('superEnrollmentStatus','ALERT');
        logString += `\nThe Count is More Than One [${count}] this is a Serious Probelem, for this reason the 'superEnrollmentStatus' has been set to 'ALERT' and no further Action taken.`;
        local.setItem('logString', logString);
        return;
    }
    if (count === 0) {
        logString += `\nThe Count is Zero, this is the No BUG (expected) result. No further Action taken.`;
        local.setItem('logString', logString);
        return;
    }
    let idToDelete = queryRresults.results._items[0]._id
    //verificatio:   queryRresults.results._items[0]._id
    if (count === 1) {
        logString += `\nThe Count is One, this is the BUG exist in the form of the Contact with ID: ${idToDelete}`;
        logString += `\ndiagnosticOnly: ${diagnosticOnly}: Meaning the found Contact will `;
        logString += diagnosticOnly ? 'NOT ' : '';
        logString += `be Deleted at this time`;
        if(diagnosticOnly){
            local.setItem('logString', logString);
            return;
        }
    }
    
    // ø <Delete the BUG Contact>
    logString += `\n\nThe code to actually Delete Contact[${idToDelete}] would look like this:`;
    logString += `\nlet deleteResults = await steamdaDeleteContactById('${idToDelete}'')`;
    let deleteResults = await steamdaDeleteContactById(idToDelete)
    logString += `\n\ndeleteResults:\n==============\n`;
    logString += deleteResults;
    // ø </Delete the BUG Contact>
    local.setItem('logString', logString);
    
    return;
}
// ø <---------- </getContactByEmailAndNotIdFunction Front-End> ---------->

// ! ====================================================================================================
// ! ====================                 </Front-End Code Calling Back-End Code>          ==============
// ! ====================================================================================================


// ø <---------- <steamdaMemberRegistration Front-End (no backend)>  ---------->
export async function steamdaMemberRegistration(paramObjectParam = {}) {
    // ø <expected that paramObject will be gathered from memory.getItem(JSON)>
	let paramObject = {};
    if(typeof paramObjectParam.memoryKey === 'string'){
		paramObject = JSON.parse(memory.getItem(paramObjectParam.memoryKey))
        console.log('[~Line 152] paramObject: ');
        console.log(paramObject);
	}else{
    // ø <BUT still allows for Direct paramObject>
        paramObject = paramObjectParam;
    }
    // ø </expected that paramObject will be gathered from memory.getItem(JSON)>
    let email = paramObject.email;// the user's email addresses
    let password = paramObject.password;// the user's password
    let firstName = paramObject.firstName;// the user's first name
    let lastName = paramObject.lastName;// the user's last name
    let phone = paramObject.phone;// the user's phone number

    let memberResponse = await wixUsers.register(email, password, {
        contactInfo: {
            "firstName": firstName,
            "lastName": lastName,
            "phones": [phone]
        }
    })
    return memberResponse;
}
// ø <---------- </steamdaMemberRegistration Front-End (no backend)> ---------->
// ø <---------- <steamdaMemberUpdate Front-End>  ---------->
// ø <PRETTY CLOSE> - no need to uncomment before all the rest has been tested
//export async function steamdaMemberUpdate(paramObjectParam = {let memberResponse = await updateUserFields(userId, firstName, lastName, email, phone)}) {}
// ø </PRETTY CLOSE>
// ø <---------- </steamdaMemberUpdate Front-End> ---------->

// ! ====================================================================================================
// ! ====================                 <Front-End Code Calling Back-End Code>           ==============
// ! ====================================================================================================


// ! ====================================================================================================
// ! ====================                      <LoopSwitch Step Functiions>                ==============
// ! ====================             ...core to the Enrollment Testing Process            ==============
// ! ====================================================================================================

//<---------- <ppMemberBuildOnDeckJSONZZZ>  ---------->
export function ppMemberBuildOnDeckJSONZZZ(){
	let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));
	let familyId = enrollmentObject.family.parent.primary.memberId;
	local.setItem("familyId", familyId);
	if(familyId === "INSTANTIATE"){
		let ppPhoneIndex = -1;
		for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
			let element = enrollmentObject.family.phones[index];
			if(element.role === "Primary Parent"){
				ppPhoneIndex = index;
			}
			
		}
		ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;

		let ppEmailIndex = -1;
		for (let index = 0; index < enrollmentObject.family.emails.length; index++) {
			let element = enrollmentObject.family.emails[index];
			if(element.role === "Primary Parent"){
				ppEmailIndex = index;
			}
			
		}
		ppEmailIndex = ppEmailIndex === -1 ? 0 : ppEmailIndex;

		let paramObject = {};
		paramObject.email = enrollmentObject.family.emails[ppEmailIndex].email;
		paramObject.password = simpleComplexPass();//"fMcM777";
		paramObject.firstName = enrollmentObject.family.parent.primary.first;
		paramObject.lastName = enrollmentObject.family.parent.primary.last;
		memory.setItem("ppMemberOnDeckJSON", JSON.stringify(paramObject));    
	}
}
//<---------- </ppMemberBuildOnDeckJSONZZZ> ---------->


// ø <---------- <all the Step Functions>  ---------->
// ø <---------- <manually added Step Functions>  ---------->
// ø <---------- <doInstantiateLoopSwitchStep>  ---------->
export async function doInstantiateLoopSwitchStep(){
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~319]entering: ' + 'doInstantiateLoopSwitchStep() at ' + memory.getItem('lastStamp'))

    local.setItem('superEnrollmentStatus','CONTINUE');
    
    let stepStampArrayObject = {};
    stepStampArrayObject.stampArray = [];
    
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    // ø <---------- <cowCatcher, delete after 20210709 if desired>  ---------->
    local.setItem('familyEmail',local.getItem(('familyEmail')).toLowerCase());
    local.setItem('studentEmail',local.getItem(('studentEmail')).toLowerCase());
    local.setItem('secondaryEmail',local.getItem(('secondaryEmail')).toLowerCase());
    // ø <---------- </cowCatcher, delete after 20210709 if desired> ---------->


	let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let memberId = enrollmentObject.family.parent.primary.memberId
	local.setItem('staffIdentifiedFamilyId', memberId);


    local.setItem('ppFirst', enrollmentObject.family.parent.primary.first);
    local.setItem('ppLast', enrollmentObject.family.parent.primary.last);
    local.setItem('stFirst', enrollmentObject.family.student.name.first);
    local.setItem('stPreferredFirst', enrollmentObject.family.student.name.preferred);
    local.setItem('stLast', enrollmentObject.family.student.name.last);
    let spFirst = "";
    let spLast = "";
    let spAny = typeof enrollmentObject.family.parent.secondary === 'undefined' ? false : true;
    if (spAny) {
        spFirst = typeof enrollmentObject.family.parent.secondary.first === 'string' ? enrollmentObject.family.parent.secondary.first : "";
        spLast = typeof enrollmentObject.family.parent.secondary.last === 'string' ? enrollmentObject.family.parent.secondary.last : "";
        if(spLast.length === 0 && spFirst.length > 0){
            spLast = local.getItem('ppLast');
        }
    }
    local.setItem('spFirst', spFirst);
    local.setItem('spLast', spLast);

    let tempStamp = await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')); 
    local.setItem('logString', local.getItem('logString') + '\n[~322]about to call: ' + 'actionValueEvaluation() at ' + tempStamp);
    await actionValueEvaluation();
    tempStamp = await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')); 
    local.setItem('logString', local.getItem('logString') + '\n[~324]just called: ' + 'actionValueEvaluation() at ' + tempStamp);
    local.setItem('logString', local.getItem('logString') + '\nppAction: ' + memory.getItem('ppAction'))
    local.setItem('logString', local.getItem('logString') + '\nstAction: ' + memory.getItem('stAction'))
    local.setItem('logString', local.getItem('logString') + '\nspAction: ' + memory.getItem('spAction'))

    let comboName = local.getItem('stLast') === local.getItem('ppLast') ? '' : ' ' + local.getItem('ppLast'); 
    comboName = local.getItem('stPreferredFirst').trim() + ' ' + local.getItem('stLast').trim() + ' (' + local.getItem('ppFirst') + comboName + ')';
    local.setItem('comboName', comboName);
    $w('#txtNamesList').text = '• ' + local.getItem('comboName') + '\n• ' + local.getItem('ppLast') + ', ' + local.getItem('ppFirst') + '\n• ' + local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst') + '\n• ' + local.getItem('spLast') + ', ' + local.getItem('spFirst');
    local.setItem('uiStDobString',enrollmentObject.family.student.dobString);
    $w('#txtStudentDobString').value = local.getItem('uiStDobString');
    // let memberId = Math.random() > 0.1 ? 'INSTANTIATE' : '777888'
    local.setItem('wixWebhookId', enrollmentObject.formStack.wixWebhookId);
    const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = local.getItem('wixWebhookId');

    let result = await wixData.get("webhookPayload", webhookId, options);
    local.setItem('wixWebhookStatus', result.currentStatus);
    local.setItem('logString', local.getItem('logString') + '\nwixWebhookStatus: ' + local.getItem('wixWebhookStatus'))
    local.setItem('logString', local.getItem('logString') + '\n[~334]exiting: ' + 'doInstantiateLoopSwitchStep()')
}
// ø <---------- </doInstantiateLoopSwitchStep> ---------->

// ø <---------- <actionValueEvaluation of IINSTANTIATE>  ---------->
export async function actionValueEvaluation(){
    let tempStamp = await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')); 
    local.setItem('logString', local.getItem('logString') + '\nLAUNCH\n[~484] Entering actionValueEvaluation() at ' + tempStamp);
    let ppAction = "INSERT|UPDATE|INSERT";
    let stAction = "INSERT|UPDATE|INSERT";
    let spAction = "NA|INSERT|INSERT";
    
    let staffMatch = local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE' ? false : true;
        if (staffMatch) {
            let staffMatchId = local.getItem('staffIdentifiedFamilyId');
            let contact = await steamdaGetContactFunction(staffMatchId);
            if(contact._id !== staffMatchId){
                local.setItem('superEnrollmentStatus','ALERT');
                local.setItem('logString', local.getItem('logString') + '\n[~548]Staff-Eye-D Does NOT Match Contact Found ID (probably none). AbortForNow');
                return;
            }
            if($w('#radioConfirmStaffEyeD').value !== 'YES'){
                if(contact.source.sourceType.toUpperCase().indexOf('MEMBER') < 0){
                    local.setItem('logString',`ABORT: StaffEyeD Contact does not contain 'MEMBER' in sourceType`);
                    return;
                }
            }
            local.setItem('familyId',staffMatchId);
            local.setItem('familyEmail',contact.primaryInfo.email);
            local.setItem('logString', local.getItem('logString') + '\n[~547]staffMatchFoundContact: ' + JSON.stringify(contact,undefined,4));
            ppAction = "SKIP|UPDATE|INSERT";
        }
    local.setItem('logString', local.getItem('logString') + '\n[~583]staffMatch: ' + staffMatch);

    let familyId = local.getItem('staffIdentifiedFamilyId');
    let termId = Number(local.getItem('termId'));
    let studentLegalFirst = local.getItem('stFirst');
    
    // ø <ppAction>
    // ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    if(staffMatch){
        let ppExistsCount = await wixData.query("person")
            .eq("personId", familyId)
            .eq("termId", termId)
            .count();
        ppAction = ppExistsCount > 0 ? "SKIP|SKIP|SKIP" : ppAction;
        local.setItem('logString', local.getItem('logString') + '\n[~508]ppExistsCount: ' + ppExistsCount);
    }
    // ø </ppAction>
    
    // ø <stAction>
    if(staffMatch){
        let stExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();
        stAction = stExistsCount > 0 ? "ALERT|ALERT|ALERT" : stAction;
        local.setItem('logString', local.getItem('logString') + '\n[~523]stExistsCount: ' + stExistsCount);
    }
    // ø </stAction>
    
    // ø <spAction>
    let checkSecondaryParent = (local.getItem('spFirst')).length === 0 && (local.getItem('spLast')).length === 0 ? false : true;
    let logSecondaryParentReason = '';
    logSecondaryParentReason = checkSecondaryParent === false ? 'Secondary Parent was not filled in in the form' : logSecondaryParentReason;
    console.log(`[~532] If ppAction has 'SKIP' does NOT mean that spAction should be Skipped (added 20210714190800 upon Barak Obama/Joe Biden BUG)`)
    logSecondaryParentReason = checkSecondaryParent === false && logSecondaryParentReason.length === 0 ? 'SKIP because Primary Parent SKIP-ped' : logSecondaryParentReason;
    logSecondaryParentReason = logSecondaryParentReason.length === 0 ? '[continue]' : logSecondaryParentReason;

    local.setItem('logString', local.getItem('logString') + '\n[~536]logSecondaryParentReason: ' + logSecondaryParentReason);
    local.setItem('logString', local.getItem('logString') + '\n[~537]checkSecondaryParent: ' + checkSecondaryParent);
    spAction = !checkSecondaryParent ? "NA|SKIP|SKIP" : spAction;
    if(staffMatch){
        if (checkSecondaryParent) {
            let spExistsCount = await wixData.query("person")
                .eq("familyId", familyId)
                .eq("role", 'Secondary')
                .eq("termId", termId)
                .count();
            spAction = spExistsCount > 0 ? "NA|SKIP|SKIP" : spAction;
            local.setItem('logString', local.getItem('logString') + '\n[~550]spExistsCount: ' + spExistsCount);
        }
    }
    // ø </spAction>
    
    let now = new Date();
    let yyyymmdd = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    local.setItem('logString', local.getItem('logString') + '\n[~557]yyyymmdd: ' + yyyymmdd);
    
    if(yyyymmdd > 20210815){
        ppAction = "ALERT|ALERT|ALERT";
        stAction = "ALERT|ALERT|ALERT";
        spAction = "ALERT|ALERT|ALERT";
    }

    memory.setItem('ppAction', ppAction);
    memory.setItem('stAction', stAction);
    memory.setItem('spAction', spAction);

    let allActionStrings = memory.getItem('ppAction') + memory.getItem('stAction') + memory.getItem('spAction');
    let superEnrollmentStatus = local.getItem('superEnrollmentStatus');
    superEnrollmentStatus = allActionStrings.indexOf('ALERT') >= 0 ? 'ALERT' : superEnrollmentStatus;    
    local.setItem('logString', local.getItem('logString') + '\n[~576]superEnrollmentStatus: ' + superEnrollmentStatus);
    local.setItem('superEnrollmentStatus',superEnrollmentStatus);
    local.setItem('logString', local.getItem('logString') + '\n[~578]Exiting: ' + 'actionValueEvaluation()');
}
// ø <---------- </actionValueEvaluation of IINSTANTIATE> ---------->

// ø <---------- </manually added Step Functions> ---------->
export async function ppMemberPrepJSON(){
    let stepItemKeyThis = 'ppMemberPrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~483]entering: ' + 'ppMemberPrepJSON() at ' + memory.getItem('lastStamp'))
    let ppMemberAction = local.getItem('ppAction').split('|')[0];

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->
    let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));

    if(local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE'){
        	let ppPhoneIndex = -1;
		for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
			let element = enrollmentObject.family.phones[index];
			if(element.role === "Primary Parent"){
				ppPhoneIndex = index;
			}
			
		}
		ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;

		let ppEmailIndex = -1;
		for (let index = 0; index < enrollmentObject.family.emails.length; index++) {
			let element = enrollmentObject.family.emails[index];
			if(element.role === "Primary Parent"){
				ppEmailIndex = index;
			}
			
		}
		ppEmailIndex = ppEmailIndex === -1 ? 0 : ppEmailIndex;

		let paramObject = {};
		 let email = enrollmentObject.family.emails[ppEmailIndex].email;
		 email = email.toLowerCase();
		paramObject.email = email;
        local.setItem('familyEmail', paramObject.email);
		paramObject.password = simpleComplexPass();//"fMcM777";
		paramObject.firstName = enrollmentObject.family.parent.primary.first;
		paramObject.lastName = enrollmentObject.family.parent.primary.last;
		paramObject.phone = enrollmentObject.family.phones[ppPhoneIndex].phone;
		memory.setItem("ppMemberPrepJSON", JSON.stringify(paramObject));    
    }else{
        memory.setItem('ppMemberPrepJSON','ppMemberPrepJSON' + ' UPDATE PREPPED on ' + memory.getItem('lastStamp'));
    }
}

export async function ppMemberExecuteUpsert(){
    let stepItemKeyThis = 'ppMemberExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~530] Entering ppMemberExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let ppActionArray = memory.getItem('ppAction').split('|');
    let ppActionMember = ppActionArray[0];
    local.setItem('logString', local.getItem('logString') + '\n[~546]ppActionMember: ' + ppActionMember);


    let paramObjectParam = {};
    paramObjectParam.memoryKey = "ppMemberPrepJSON";
    if(ppActionMember === 'INSERT'){
        let ppMemberResponse = await steamdaMemberRegistration(paramObjectParam);
        local.setItem('familyId',ppMemberResponse.user.id);
        let familySeed = ppMemberResponse.user.id;
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        local.setItem('familySeed',familySeed);
        memory.setItem('ppMemberExecuteUpsert', JSON.stringify(ppMemberResponse));
    }
    if(ppActionMember === 'UPDATE'){
        let paramObjectThis = JSON.parse(memory.getItem('ppMemberPrepJSON'));

        let ppMemberUpdateResponse = updateUserFields(local.getItem('staffIdentifiedFamilyId'), paramObjectThis.firstName, paramObjectThis.lastName, paramObjectThis.email, paramObjectThis.phone);
        memory.setItem('ppMemberExecuteUpsert',JSON.stringify(ppMemberUpdateResponse));
    }
    local.setItem('logString', local.getItem('logString') + '\n[~569] Exiting ppMemberExecuteUpsert()');
}

export async function stMemberPrepJSON(){
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~573] Entering stMemberPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));
    // ø <KLUDGE> there will need to be a more robust query
    if(memory.getItem('yyyymm') > "202108"){
        memory.setItem('stMemberPrepJSON','stMemberPrepJSON' + ' REQUIRES QUERY FOR EXISTING STUDENT');
        return;
    }else{
       local.setItem('studentId','INSTANTIATE') 
    }
    // ø </KLUDGE>
    if(local.getItem('studentId') === 'INSTANTIATE'){
        // º <phone>
        // º <phone WAS same as PP>
        let ppPhoneIndex = -1;
		for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
			let element = enrollmentObject.family.phones[index];
			if(element.role === "Primary Parent"){
				ppPhoneIndex = index;
			}
			
		}
		ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;
        // º </phone WAS same as PP>
        // º <phone NOW from familyId>
        let phone = local.getItem('familyId');
        phone = phone.replace(/[^0-9]/g,'');
        let phIndex = 0;
        let digitArray = ['1','2','3','4','5','6','7','8','9','0']
        while (phone.length < 10) {
            ppPhoneIndex++;
            phone += digitArray[Math.floor(Math.random() * digitArray.length)];
        }
        console.log('phIndex: ' + phIndex);
        console.log('phone: ' + phone);
        phone = phone.substr(0,10);
        console.log('phone: ' + phone);
        // º </phone>

        let firstLegal = enrollmentObject.family.student.name.first;
        let firstPreferred = enrollmentObject.family.student.name.preferred;
        let email = firstLegal;
        let firstSpace = email.indexOf(' ');
        email = firstSpace > 0 ? email.substr(0,firstSpace) : email;
        email += local.getItem('familySeed').substr(0,4);//should be identical to above, 
        email = 'steamdiscoveryacademy' + '+' + email + '@gmail.com';
        email = email.toLowerCase();
        local.setItem('studentEmail', email);

		let paramObject = {};
		paramObject.email = email;
		paramObject.password = simpleComplexPass();//"fMcM777";
		paramObject.firstName = firstPreferred;
		paramObject.lastName = enrollmentObject.family.student.name.last;
		paramObject.phone = phone;
		memory.setItem("stMemberPrepJSON", JSON.stringify(paramObject));    
    }else{
        memory.setItem('stMemberPrepJSON','stMemberPrepJSON' + ' UPDATE PREPPED on ' + memory.getItem('lastStamp'));
    }
}

export async function stMemberExecuteUpsert(){
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~649] Entering stMemberExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    if(local.getItem('studentId') === 'INSTANTIATE'){
        let paramObjectParam = {};
        paramObjectParam.memoryKey = "stMemberPrepJSON";
        let stMemberResponse = await steamdaMemberRegistration(paramObjectParam);
        console.log('[~LINE 408] stMemberResponse: ');
        console.log(stMemberResponse);
        local.setItem('studentId',stMemberResponse.user.id);
        memory.setItem('stMemberExecuteUpsert', JSON.stringify(stMemberResponse));
    }else{
        memory.setItem('stMemberExecuteUpsert','stMemberExecuteUpsert' + ' UPDATE EXECUTED on ' + memory.getItem('lastStamp'));
    }
}

// ø <---------- <ppStContactDedupe>  ---------->
export async function ppStContactDedupe(){}
// ø <---------- </ppStContactDedupe> ---------->

// ø <---------- <ppContactPrepJSON AS Step-Function>  ---------->
export async function ppContactPrepJSON(){
    let stepItemKeyThis = 'ppContactPrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~680] Entering ppContactPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->
    let ppContactAction = (memory.getItem('ppAction').split('|'))[1];
    if (ppContactAction === 'SKIP') {
        memory.setItem('ppContactPrepJSON',`ppContactAction === 'SKIP'`);
        local.setItem('logString', local.getItem('logString') + `\n[~807] 'SKIP' ppContactPrepJSON()`);
        return;
    }

    let contact = await steamdaGetContactFunction(local.getItem('familyId'));
    $w('#ppContactResponseJSON').value = JSON.stringify(contact,undefined,4);
    if (typeof contact.revision === 'number' && contact.revision > 0) {
        memory.setItem('ppRevision',(contact.revision).toString());
    }else{
        local.setItem('logString', local.getItem('logString') + "\n[703] Failure of `steamdaGetContactFunction(local.getItem('familyId'))'");
        return;   
    }

    let paramObjectThis = {};
	paramObjectThis.contactIdentifiers = {};
    if(contact._id === local.getItem('familyId')){
        paramObjectThis.contactIdentifiers.contactId = contact._id;
        paramObjectThis.contactIdentifiers.revision = contact.revision;
    }else{
        paramObjectThis.contactIdentifiers.contactId = "EERROR";
        paramObjectThis.contactIdentifiers.errorContactId = contact._id;
        paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        paramObjectThis.errorString = "Member ID !== Contact ID";
    }
    if(paramObjectThis.contactIdentifiers.contactId !== 'EERROR'){
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

        // ø <---------- <doPrimaryParentContactInfo()>  ---------->
        // ø if messy this could become its own function
        // ø @path: steamdaWixLocal/steamdaWix/agile/sprint/objectToExpressionStringArray_Examples/primaryParentContactInfo_fromEnrollmentApplication.js

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";

        let studentBDAY = ("00" + enrollmentObject.family.student.dob.month).substr(-2) + ("00" + enrollmentObject.family.student.dob.day).substr(-2);

        console.log("studentBDAY: " + studentBDAY);
        console.log("termBeginMMDD: " + local.getItem('termBeginMMDD'));
        console.log("termEndMMDD: " + local.getItem('termEndMMDD'));

        let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
        tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;
        console.log('tBDAY: ' + tBDAY);


        let roleLabelKey = 'custom.primary-parent';
        let memberLabelKey = 'custom.member-active';


        let weekIdToLabelKeyJSON = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            let labelKeyRow = weekIdToLabelKeyJSON[element.weekId];
            console.log('['+element.weekId+']labelKeyRow:');
            console.log(labelKeyRow);
            if(!finalLabelKeyArray.includes(labelKeyRow[0])){
                finalLabelKeyArray.push(labelKeyRow[0]);
            }
            beginBDAY = labelKeyRow[1];
            endBDAY = labelKeyRow[2];
            wkBDAY = studentBDAY < beginBDAY ? false : true;
            wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
            wkBDAY = finalLabelKeyArray.includes(labelKeyRow[0] + 'bday') ? false : wkBDAY;
            if(wkBDAY){
                finalLabelKeyArray.push(labelKeyRow[0] + 'bday');
            }
        }
        finalLabelKeyArray.push(local.getItem('termLabelKey'));

        if(tBDAY){
            finalLabelKeyArray.push(local.getItem('termLabelKey') + 'bday')
        }
        finalLabelKeyArray.push(roleLabelKey);
        finalLabelKeyArray.push(memberLabelKey);
        // ! </FINAL>


        //Final Code: 
        // ! <FINAL>
        let primaryParent = {};
        primaryParent.contactInfo = {};
        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.name = {};
        primaryParent.contactInfo.name.first = enrollmentObject.family.parent.primary.first;
        primaryParent.contactInfo.name.last = enrollmentObject.family.parent.primary.last;
        primaryParent.contactInfo.locale = "en-US";
        // ø </ZXZ-TTESTING DISABLED>
        // ! </FINAL>

        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            primaryParent.contactInfo.labelKeys.push(element);
        });
        // ø </ZXZ-TTESTING DISABLED>
        


        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.emails = [];
        primaryParent.contactInfo.emails[0] = {};
        primaryParent.contactInfo.emails[0].tag = "MAIN";
        // ø </ZXZ-TTESTING DISABLED>
        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.emails[0].email = enrollmentObject.family.emails[0].email;
        primaryParent.contactInfo.emails[0].primary = "true";
        // ø </ZXZ-TTESTING DISABLED>

        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.phones = [];
        primaryParent.contactInfo.phones[0] = {};
        primaryParent.contactInfo.phones[0].tag = "MOBILE";
        // // ø </ZXZ-TTESTING DISABLED>
        // // enrollmentObject.family.phones[0].kind = "cell";
        // // ø </ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.phones[0].phone = enrollmentObject.family.phones[0].phone;
        primaryParent.contactInfo.phones[0].primary = "true";
        // ø <ZXZ-TTESTING DISABLED>

        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.addresses = [];
        primaryParent.contactInfo.addresses[0] = {};
        primaryParent.contactInfo.addresses[0].tag = "HOME";
        primaryParent.contactInfo.addresses[0].address = {};
        primaryParent.contactInfo.addresses[0].address.streetAddress = {};
        primaryParent.contactInfo.addresses[0].address.streetAddress.number = enrollmentObject.family.addresses[0].address.streetAddress.number;
        primaryParent.contactInfo.addresses[0].address.streetAddress.name = enrollmentObject.family.addresses[0].address.streetAddress.name;

        primaryParent.contactInfo.addresses[0].address.addressLine2 = enrollmentObject.family.addresses[0].address.streetAddress2;
        primaryParent.contactInfo.addresses[0].address.city = enrollmentObject.family.addresses[0].address.city;
        primaryParent.contactInfo.addresses[0].address.subdivision = enrollmentObject.family.addresses[0].address.subdivision;
        primaryParent.contactInfo.addresses[0].address.postalCode = enrollmentObject.family.addresses[0].address.postalCode;
        primaryParent.contactInfo.addresses[0].address.country = enrollmentObject.family.addresses[0].address.country;
        let assignLocation = true;
        assignLocation = enrollmentObject.family.addresses[0].address.location.latitude === null ? false : assignLocation;
        assignLocation = enrollmentObject.family.addresses[0].address.location.longitue === null ? false : assignLocation;
        if(assignLocation){
            primaryParent.contactInfo.addresses[0].address.location = {};
            primaryParent.contactInfo.addresses[0].address.location.latitude = enrollmentObject.family.addresses[0].address.location.latitude;
            primaryParent.contactInfo.addresses[0].address.location.longitude = enrollmentObject.family.addresses[0].address.location.longitue;
        }
        // ø </ZXZ-TTESTING DISABLED>


        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.extendedFields = {};
        // ! <FINAL>
        primaryParent.contactInfo.extendedFields['custom.last-update'] = lastupdate;
        primaryParent.contactInfo.extendedFields['custom.current-region'] = currentRegion;
        primaryParent.contactInfo.extendedFields['custom.timezone-offset'] = timezoneOffest;
        // ! </FINAL>
        // ø </ZXZ-TTESTING DISABLED>

        // ø <---------- </doPrimaryParentContactInfo()> ---------->

        paramObjectThis.contactInfo = primaryParent.contactInfo;
    }
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('ppContactPrepJSON',paramJSON);
    local.setItem('logString', local.getItem('logString') + '\n[~907] Exiting ppContactPrepJSON()');
}
// ø <---------- </ppContactPrepJSON AS Step-Function> ---------->

// ø <---------- <ppDatabasePrepJSON AS Step-Function>  ---------->
export async function ppDatabasePrepJSON(){
    let stepItemKeyThis = 'ppDatabasePrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~907] Entering ppDatabasePrepJSON() at ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let ppActionArray = memory.getItem('ppAction').split('|');
    let ppActionDbase = ppActionArray[2];
    local.setItem('logString', local.getItem('logString') + '\n[~890]ppActionDbase: ' + ppActionDbase);

    let logString = '';
    if(ppActionDbase === 'SKIP'){
        logString = "based on action'" + ppActionDbase + "' no further action in this Step-Function";
        memory.setItem('ppDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
        return;
    }
    if(ppActionDbase !== 'INSERT'){
        logString = "this ppActionDbase, '" + ppActionDbase + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('ppDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + ppActionDbase + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"ppActionDbase, '" + ppActionDbase + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus','ALERT');
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('ppLast') + ', ' + local.getItem('ppFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = local.getItem('familyId');
    toInsert.familyId = local.getItem('familyId');
    toInsert.role = 'Primary';
    toInsert.first = local.getItem('ppFirst');
    toInsert.last = local.getItem('ppLast');
    toInsert.firstLegal = 'NA';
    toInsert.fullName = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = local.getItem('familyId');
    toInsert.idBL = local.getItem('familyId');
    toInsert.altPersonId = local.getItem('familyId');
    toInsert.termId = Number(local.getItem('termId'));
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    toInsert.objectData = JSON.stringify(enrollmentObject.family);
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->

    // ø <---------- <INSERT>  ---------->
    let ppInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->

    memory.setItem('ppDatabasePrepJSON',JSON.stringify(ppInsertResult));
    local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON() [see results at memory.getItem(ppDatabasePrepJSON)]');
    return;
}
// ø <---------- </ppDatabasePrepJSON AS Step-Function> ---------->

export function ppDatabasePrepJSON_DEP(){
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDEPDateString ---------->

}

// ø <---------- <stContactPrepJSON AS Step>  ---------->
export async function stContactPrepJSON(){
        // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1021] Entering stContactPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let contact = await steamdaGetContactFunction(local.getItem('studentId'));
    $w('#stContactResponseJSON').value = JSON.stringify(contact,undefined,4);
    memory.setItem('stRevision',(contact.revision).toString());
    let stEmail = contact.info.emails[0].email;
    let stPhone = contact.info.phones[0].phone;

    let paramObjectThis = {};
	paramObjectThis.contactIdentifiers = {};
    if(contact._id === local.getItem('studentId')){
        paramObjectThis.contactIdentifiers.contactId = contact._id;
        paramObjectThis.contactIdentifiers.revision = contact.revision;
    }else{
        paramObjectThis.contactIdentifiers.contactId = "EERROR";
        paramObjectThis.contactIdentifiers.errorContactId = contact._id;
        paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        paramObjectThis.errorString = "Member ID !== Contact ID";
    }
    if(paramObjectThis.contactIdentifiers.contactId !== 'EERROR'){
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

        // ø <---------- <dostudentContactInfo()>  ---------->
        // ø if messy this could become its own function
        // ø @path: steamdaWixLocal/steamdaWix/agile/sprint/objectToExpressionStringArray_Examples/studentContactInfo_fromEnrollmentApplication.js

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";
        
        let studentBDAY = ("00" + enrollmentObject.family.student.dob.month).substr(-2) + ("00" + enrollmentObject.family.student.dob.day).substr(-2);
        
        console.log("studentBDAY: " + studentBDAY);
        console.log("termBeginMMDD: " + local.getItem('termBeginMMDD'));
        console.log("termEndMMDD: " + local.getItem('termEndMMDD'));
        
        let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
        tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;
        console.log('tBDAY: ' + tBDAY);
        
        let roleLabelKey = 'custom.student';
        let memberLabelKey = 'custom.member-faux';

        let declaredGender = enrollmentObject.family.student.declaredGender.trim().toLowerCase();
        let assignedGenderKey = 'unreported'
        let maleOptionArray = ['masculine','men','he','man','male','gentleman','boy','guy','fellow','gent','bloke','chap','lad'];
        let femaleOptionArray = ['woman','female','lady','girl','lass','lassie','bird'];
        assignedGenderKey = maleOptionArray.includes(declaredGender) ? 'male' : assignedGenderKey;
        assignedGenderKey = femaleOptionArray.includes(declaredGender) ? 'female' : assignedGenderKey;
        assignedGenderKey = assignedGenderKey === 'unreported' && declaredGender.length > 0 ? 'alternative' : assignedGenderKey;
        let genderLabelKey = 'custom.gender-' + assignedGenderKey;

        let weekIdToLabelKeyJSON = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            let labelKeyRow = weekIdToLabelKeyJSON[element.weekId];
            console.log('['+element.weekId+']labelKeyRow:');
            console.log(labelKeyRow);
            if(!finalLabelKeyArray.includes(labelKeyRow[0])){
                finalLabelKeyArray.push(labelKeyRow[0]);
            }
            beginBDAY = labelKeyRow[1];
            endBDAY = labelKeyRow[2];
            wkBDAY = studentBDAY < beginBDAY ? false : true;
            wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
            wkBDAY = finalLabelKeyArray.includes(labelKeyRow[0] + 'bday') ? false : wkBDAY;
            if(wkBDAY){
                finalLabelKeyArray.push(labelKeyRow[0] + 'bday');
            }
        }
        finalLabelKeyArray.push(local.getItem('termLabelKey'));

        if(tBDAY){
            finalLabelKeyArray.push(local.getItem('termLabelKey') + 'bday')
        }
        finalLabelKeyArray.push(roleLabelKey);
        finalLabelKeyArray.push(memberLabelKey);
        finalLabelKeyArray.push(genderLabelKey);
        // ! </FINAL>


        //Final Code: 
        // ! <FINAL>
        let student = {};
        student.contactInfo = {};
        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.name = {};
        student.contactInfo.name.first = enrollmentObject.family.student.name.preferred;
        student.contactInfo.name.last = enrollmentObject.family.student.name.last;
        student.contactInfo.locale = "en-US";
        // ø </ZXZ-TTESTING DISABLED>
        // ! </FINAL>

        student.contactInfo.company = enrollmentObject.family.student.currentSchool;
        student.contactInfo.jobTitle = enrollmentObject.family.student.currentGradeString;

        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            student.contactInfo.labelKeys.push(element);
        });
        // ø </ZXZ-TTESTING DISABLED>

        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.emails = [];
        student.contactInfo.emails[0] = {};
        student.contactInfo.emails[0].tag = "MAIN";
        // ø </ZXZ-TTESTING DISABLED>
        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.emails[0].email = stEmail;
        student.contactInfo.emails[0].primary = "true";
        // ø </ZXZ-TTESTING DISABLED>

        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.phones = [];
        student.contactInfo.phones[0] = {};
        student.contactInfo.phones[0].tag = "MOBILE";

        student.contactInfo.phones[0].phone = stPhone;
        student.contactInfo.phones[0].primary = "true";
        // ø <ZXZ-TTESTING DISABLED>

        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.addresses = [];
        student.contactInfo.addresses[0] = {};
        student.contactInfo.addresses[0].tag = "HOME";
        student.contactInfo.addresses[0].address = {};
        student.contactInfo.addresses[0].address.streetAddress = {};
        student.contactInfo.addresses[0].address.streetAddress.number = enrollmentObject.family.addresses[0].address.streetAddress.number;
        student.contactInfo.addresses[0].address.streetAddress.name = enrollmentObject.family.addresses[0].address.streetAddress.name;

        student.contactInfo.addresses[0].address.addressLine2 = enrollmentObject.family.addresses[0].address.streetAddress2;
        student.contactInfo.addresses[0].address.city = enrollmentObject.family.addresses[0].address.city;
        student.contactInfo.addresses[0].address.subdivision = enrollmentObject.family.addresses[0].address.subdivision;
        student.contactInfo.addresses[0].address.postalCode = enrollmentObject.family.addresses[0].address.postalCode;
        student.contactInfo.addresses[0].address.country = enrollmentObject.family.addresses[0].address.country;
        let assignLocation = true;
        assignLocation = enrollmentObject.family.addresses[0].address.location.latitude === null ? false : assignLocation;
        assignLocation = enrollmentObject.family.addresses[0].address.location.longitue === null ? false : assignLocation;
        if(assignLocation){
            student.contactInfo.addresses[0].address.location = {};
            student.contactInfo.addresses[0].address.location.latitude = enrollmentObject.family.addresses[0].address.location.latitude;
            student.contactInfo.addresses[0].address.location.longitude = enrollmentObject.family.addresses[0].address.location.longitue;
        }
        // ø </ZXZ-TTESTING DISABLED>


        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.extendedFields = {};
        // ! <FINAL>
        student.contactInfo.extendedFields['custom.last-update'] = lastupdate;
        student.contactInfo.extendedFields['custom.current-region'] = currentRegion;
        student.contactInfo.extendedFields['custom.timezone-offset'] = timezoneOffest;
        student.contactInfo.extendedFields['custom.legal-first'] = enrollmentObject.family.student.name.first;
        // ! </FINAL>
        // ø </ZXZ-TTESTING DISABLED>

        // ø <---------- </dostudentContactInfo()> ---------->

        paramObjectThis.contactInfo = student.contactInfo;
    }
    console.log('[~966]paramObjectThis:');
    console.log(paramObjectThis);
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('stContactPrepJSON',paramJSON);
}
// ø <---------- </stContactPrepJSON AS Step> ---------->
// ø <---------- <stDatabasePrepJSON AS Step-Function>  ---------->
export async function stDatabasePrepJSON(){
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1265] Entering stDatabasePrepJSON() at ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    local.setItem('logString', local.getItem('logString') + '\n[~1242]entering: ' + 'stDatabasePrepJSON()');
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");
    let stActionArray = memory.getItem('stAction').split('|');
    let stActionDbase = stActionArray[2];
    local.setItem('logString', local.getItem('logString') + '\n[~1246]stActionDbase: ' + stActionDbase);

    let logString = '';
    if(stActionDbase === 'SKIP'){
        logString = "based on action'" + stActionDbase + "' no further action in this Step-Function";
        memory.setItem('ppDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~1253]exiting: ppDatabasePrepJSON()');
        return;
    }
    if(stActionDbase !== 'INSERT'){
        logString = "this stActionDbase, '" + stActionDbase + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('ppDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + stActionDbase + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"stActionDbase, '" + stActionDbase + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~1262]exiting: ppDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus','ALERT');
        return;
    }

    // ø <CHECK FOR EXISTING>
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = local.getItem('studentId');
    toInsert.familyId = local.getItem('familyId');
    toInsert.role = 'Student';
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = local.getItem('stFirst');
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('stLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = local.getItem('familyId');
    toInsert.idBL = local.getItem('familyId');
    toInsert.altPersonId = local.getItem('studentId');
    toInsert.termId = Number(local.getItem('termId'));
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    toInsert.objectData = local.getItem('ondeckEnrollmentJSON');
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->

    // ø <---------- <INSERT>  ---------->
    let stInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->
   
    memory.setItem('stDatabasePrepJSON',JSON.stringify(stInsertResult));
    return;

}
// ø <---------- </stDatabasePrepJSON AS Step-Function> ---------->
export async function stDatabasePrepJSON_DEP(){
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1369] Entering stDatabasePrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepDEPStampArray ---------->

    memory.setItem('stDatabasePrepJSON','stDatabasePrepJSON' + ' PREPPED on ' + memory.getItem('lastStamp'));
}

// ø <---------- <spContactPrepJSON AS Step-Function>  ---------->
export async function spContactPrepJSON() {
    let stepItemKeyThis = 'spContactPrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));

    local.setItem('logString', local.getItem('logString') + '\n[~1398] Entering spContactPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->
    
    let spActionArray = memory.getItem('spAction').split('|');
    let spActionContact = spActionArray[1];
    let paramObjectThis = {};
   
    // ø <CATCH Else (decoupling) Actions>
    let logString = '';
    if(spActionContact === 'SKIP'){
        logString = "based on action'" + spActionContact + "' no further action in this Step-Function";
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~1419]exiting: spDatabasePrepJSON()');
        paramObjectThis.spActionContact = spActionContact;
        paramObjectThis.log = 'NO ACTION INDICATED';
        memory.setItem('spContactPrepJSON', JSON.stringify(paramObjectThis));
        return;
    }
    if(spActionContact !== 'INSERT'){
        logString = "this spActionContact, '" + spActionContact + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + spActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"spActionDbase, '" + spActionContact + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~1431]exiting: spDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus','ALERT');
        paramObjectThis.spActionContact = spActionContact;
        paramObjectThis.log = 'NO ACTION INDICATED';
        memory.setItem('spContactPrepJSON', JSON.stringify(paramObjectThis));
        return;
    }
    // ø </CATCH Else (decoupling) Actions>

    // ø <DO THEN (upsert)  Actions>

    if (spActionContact === 'INSERT') {
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";

        let roleLabelKey = 'custom.secondary-parent';

        let finalLabelKeyArray = [];
        finalLabelKeyArray.push(roleLabelKey);
        // ! </FINAL>


        //Final Code: 
        // ! <FINAL>
        let secondaryParent = {};
        secondaryParent.contactInfo = {};
        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.name = {};
        secondaryParent.contactInfo.name.first = enrollmentObject.family.parent.secondary.first;
        secondaryParent.contactInfo.name.last = enrollmentObject.family.parent.secondary.last;
        secondaryParent.contactInfo.locale = "en-US";
        // ø </ZXZ-TTESTING DISABLED>
        // ! </FINAL>

        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            secondaryParent.contactInfo.labelKeys.push(element);
        });
        // ø </ZXZ-TTESTING DISABLED>



        // ø <ZXZ-TTESTING DISABLED>
        // ø </ZXZ-TTESTING DISABLED>
        local.setItem('secondaryEmail', 'spContactPrepJSON@todo.io');

        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.phones = [];
        secondaryParent.contactInfo.phones[0] = {};
        secondaryParent.contactInfo.phones[0].tag = "MOBILE";
        secondaryParent.contactInfo.phones[0].phone = enrollmentObject.family.phones[0].phone;
        secondaryParent.contactInfo.phones[0].primary = "true";
        // ø <ZXZ-TTESTING DISABLED>

        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.addresses = [];
        secondaryParent.contactInfo.addresses[0] = {};
        secondaryParent.contactInfo.addresses[0].tag = "HOME";
        secondaryParent.contactInfo.addresses[0].address = {};
        secondaryParent.contactInfo.addresses[0].address.streetAddress = {};
        secondaryParent.contactInfo.addresses[0].address.streetAddress.number = enrollmentObject.family.addresses[0].address.streetAddress.number;
        secondaryParent.contactInfo.addresses[0].address.streetAddress.name = enrollmentObject.family.addresses[0].address.streetAddress.name;

        secondaryParent.contactInfo.addresses[0].address.addressLine2 = enrollmentObject.family.addresses[0].address.streetAddress2;
        secondaryParent.contactInfo.addresses[0].address.city = enrollmentObject.family.addresses[0].address.city;
        secondaryParent.contactInfo.addresses[0].address.subdivision = enrollmentObject.family.addresses[0].address.subdivision;
        secondaryParent.contactInfo.addresses[0].address.postalCode = enrollmentObject.family.addresses[0].address.postalCode;
        secondaryParent.contactInfo.addresses[0].address.country = enrollmentObject.family.addresses[0].address.country;
        let assignLocation = true;
        assignLocation = enrollmentObject.family.addresses[0].address.location.latitude === null ? false : assignLocation;
        assignLocation = enrollmentObject.family.addresses[0].address.location.longitue === null ? false : assignLocation;
        if (assignLocation) {
            secondaryParent.contactInfo.addresses[0].address.location = {};
            secondaryParent.contactInfo.addresses[0].address.location.latitude = enrollmentObject.family.addresses[0].address.location.latitude;
            secondaryParent.contactInfo.addresses[0].address.location.longitude = enrollmentObject.family.addresses[0].address.location.longitue;
        }
        // ø </ZXZ-TTESTING DISABLED>


        // ø <ZXZ-TTESTING DISABLED>
        secondaryParent.contactInfo.extendedFields = {};
        // ! <FINAL>
        secondaryParent.contactInfo.extendedFields['custom.last-update'] = lastupdate;
        secondaryParent.contactInfo.extendedFields['custom.current-region'] = currentRegion;
        secondaryParent.contactInfo.extendedFields['custom.timezone-offset'] = timezoneOffest;
        // ! </FINAL>
        // ø </ZXZ-TTESTING DISABLED>

        // ø <---------- </doPrimaryParentContactInfo()> ---------->

        paramObjectThis.contactInfo = secondaryParent.contactInfo;
    }//END if (spActionContact === 'INSERT')
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('spContactPrepJSON', paramJSON);
    local.setItem('logString', local.getItem('logString') + '\n[~1559]exiting: spDatabasePrepJSON()');
}
// ø <---------- </spContactPrepJSON AS Step-Function> ---------->

// ø <---------- <spDatabasePrepJSON AS Step-Function>  ---------->
export async function spDatabasePrepJSON(){
    let stepItemKeyThis = 'spDatabasePrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~907] Entering spDatabasePrepJSON() at ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let spActionArray = memory.getItem('spAction').split('|');
    let spActionDbase = spActionArray[2];

    let logString = '';
    // ø <CATCH Else (decoupling) Actions>
    if(spActionDbase === 'SKIP'){
        logString = "based on action'" + spActionDbase + "' no further action in this Step-Function";
        memory.setItem('spDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: spDatabasePrepJSON()');
        return;
    }
    if(spActionDbase !== 'INSERT'){
        logString = "this spActionDbase, '" + spActionDbase + "', is NOT suzzorted and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('spDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + spActionDbase + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"spActionDbase, '" + spActionDbase + "', is NOT suzzorted. Only 'INSERT' and 'SKIP' are suzzorted. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: spDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus','ALERT');
        return;
    }
    // ø </CATCH Else (decoupling) Actions>

    // ø <DO THEN (upsert)  Actions>
    // ! ONLY 'INSERT' for Database for the foreseeable future

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('spLast') + ', ' + local.getItem('spFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = local.getItem('secondaryId');
    toInsert.familyId = local.getItem('familyId');
    toInsert.role = 'Secondary';
    toInsert.first = local.getItem('spFirst');
    toInsert.last = local.getItem('spLast');
    toInsert.firstLegal = 'NA';
    toInsert.fullName = local.getItem('spFirst') + ' ' + local.getItem('spLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = local.getItem('familyId');
    toInsert.idBL = local.getItem('familyId');
    toInsert.altPersonId = local.getItem('secondaryId');
    toInsert.termId = Number(local.getItem('termId'));
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->

    // ø <---------- <INSERT>  ---------->
    let spInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->

    memory.setItem('spDatabasePrepJSON',JSON.stringify(spInsertResult));
    local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: spDatabasePrepJSON() [see results at memory.getItem(spDatabasePrepJSON)]');
    return;

}
// ø <---------- </spDatabasePrepJSON AS Step-Function> ---------->

export async function ppContactExecuteUpsert(){
    let stepItemKeyThis = 'ppContactExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1415] Entering ppContactExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let ppActionArray = memory.getItem('ppAction').split('|');
    let ppActionContact = ppActionArray[1];
    local.setItem('logString', local.getItem('logString') + '\n[~890]ppActionContact: ' + ppActionContact);
    if(ppActionContact !== 'UPDATE'){
        let logString = "this ppActionContact, '" + ppActionContact + "', is NOT suzzorted and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('spDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + ppActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"ppActionContact, '" + ppActionContact + "', is NOT suzzorted. Only 'INSERT' and 'SKIP' are suzzorted. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~1688]exiting: ppContactExecuteUpsert()');
        local.setItem('superEnrollmentStatus','ALERT');
        return;
    }

    memory.setItem('ppContactExecuteUpsert','ppContactExecuteUpsert' + ' EXECUTED on ' + memory.getItem('lastStamp'));

    let ppContactParamObject = JSON.parse(memory.getItem('ppContactPrepJSON'));
    let response = await doUpdateContact(ppContactParamObject);
    local.setItem('logString', local.getItem('logString') + '\n[~1736]exiting: ppContactExecuteUpsert() after UPDATE:\n' + JSON.stringify(response));
}

export async function ppDatabaseExecuteUpsert(){
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1435] Entering ppDatabaseExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    memory.setItem('ppDatabaseExecuteUpsert','ppDatabaseExecuteUpsert: Upsert Executed in Prep' + '[separation of PREP & EXECUTE seems overkill, but this separation exist for reconsideration later]' + ' EXECUTED on ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + '\n[~1752] ppDatabaseExecuteUpsert: Upsert Executed in Prep');
}

export async function stContactExecuteUpsert(){
    let stepItemKeyThis = 'stContactExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1450] Entering stContactExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    let stActionArray = memory.getItem('stAction').split('|');
    let stActionContact = stActionArray[1];
    local.setItem('logString', local.getItem('logString') + '\n[~1733]stActionContact: ' + stActionContact);
    if(stActionContact !== 'UPDATE'){
        let logString = "this stActionContact, '" + stActionContact + "', is NOT suzzorted and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('spDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + stActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"ppActionContact, '" + stActionContact + "', is NOT suzzorted. Only 'INSERT' and 'SKIP' are suzzorted. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~1739]exiting: stContactExecuteUpsert()');
        local.setItem('superEnrollmentStatus','ALERT');
        return;
    }

    memory.setItem('stContactExecuteUpsert','stContactExecuteUpsert' + ' EXECUTED on ' + memory.getItem('lastStamp'));

    console.log("[~990]memory.getItem('stContactPrepJSON'):");
    console.log(memory.getItem('stContactPrepJSON'));
    let stContactParamObject = JSON.parse(memory.getItem('stContactPrepJSON'));
    console.log('[~993]stContactParamObject:');
    console.log(stContactParamObject);
    await doUpdateContact(stContactParamObject);
    local.setItem('logString', local.getItem('logString') + '\n[~1752]exiting: stContactExecuteUpsert() after UPDATE');
}

export async function stDatabaseExecuteUpsert(){
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
   
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1472] Entering stDatabaseExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    memory.setItem('stDatabaseExecuteUpsert','stDatabaseExecuteUpsert: Upsert Executed in Prep' + '[separation of PREP & EXECUTE seems overkill, but this separation exist for reconsideration later]' + ' EXECUTED on ' + memory.getItem('lastStamp'));
}

export async function spContactExecuteUpsert(){
    let stepItemKeyThis = 'spContactExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1565] Entering spContactExecuteUpsert() Base-Step at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->
    
    let spActionArray = memory.getItem('spAction').split('|');
    let spActionContact = spActionArray[1];
        let logString = '';
    if(spActionContact === 'SKIP'){
        logString = "based on action'" + spActionContact + "' no further action in this Step-Function";
        memory.setItem('ppDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~1757]exiting: ppDatabasePrepJSON()');
        return;
    }
    if(spActionContact !== 'INSERT'){
        logString = "this ppActionDbase, '" + spActionContact + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('ppDatabasePrepJSON',logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + spActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString',"ppActionDbase, '" + spActionContact + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~896]exiting: ppDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus','ALERT');
        return;
    }

    memory.setItem('spContactExecuteUpsert','spContactExecuteUpsert' + ' EXECUTED on ' + memory.getItem('lastStamp'));

    await doSecondaryParentCreateContact();
    local.setItem('logString', local.getItem('logString') + '\n[~1583]exiting: ' + 'spContactExecuteUpsert() after INSERT');
}

export async function spDatabaseExecuteUpsert(){
    let stepItemKeyThis = 'spDatabaseExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;       
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    
    
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~1509] Entering spDatabaseExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- stepStampArray ---------->

    memory.setItem('spDatabaseExecuteUpsert','spDatabaseExecuteUpsert: Upsert Executed in Prep' + '[separation of PREP & EXECUTE seems overkill, but this separation exist for reconsideration later]' + ' EXECUTED on ' + memory.getItem('lastStamp'));
}
// ø <---------- </all the Step Functions> ---------->


//<---------- <simpleCycleStepsZZZ>  ---------->
export function cycleStepsZZZ(){
	if(typeof memory.getItem('enrollmentStepList') !== 'string'){
		return;
	}
	if(memory.getItem('enrollmentStepList').indexOf(',') < 0){
		return;
	}
	let list = memory.getItem('enrollmentStepList');
	let cycleThis = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));
	let newList = memory.getItem('enrollmentStepList').substr(memory.getItem('enrollmentStepList').indexOf(',') + 1);
	newList += ',' + cycleThis;
	memory.setItem('enrollmentStepList',newList);
}
//<---------- </simpleCycleStepsZZZ> ---------->
// ! ====================================================================================================
// ! ====================                      </LoopSwitch Step Functiions>               ==============
// ! ====================================================================================================


// ! ====================================================================================================
// ! ====================                     <LoopSwitch Suppor Functiions>               ==============
// ! ====================             ...core to the Enrollment Testing Process            ==============
// ! ====================================================================================================


// ø <---------- <instantiateLoopSwitchEnrollmentSteps>  ---------->
export function instantiateLoopSwitchEnrollmentSteps(stepArrayParam = ['ORIG']){
    // let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    // let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','dedupePpStContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    console.log('[1898]stepArrayParam: ');
    console.log(stepArrayParam);
    if(stepArrayParam.length === 0){
        stepArrayParam.push('EEMPTY');
    }
    let stepArrayOrig = stepArrayParam;
    let stepArrayCheck = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','dedupePpStContact','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    if(stepArrayParam.length === 1 && stepArrayParam[0] === 'ORIG'){
        stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','dedupePpStContact','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    }
    if(stepArrayOrig.length === 1 || stepArrayOrig[stepArrayOrig.length - 1] !== 'CCOMPLETE'){
        stepArrayOrig.push('CCOMPLETE');
    }
    console.log('[1904]stepArrayOrig: ');
    console.log(stepArrayOrig);
    let stepList = stepArrayOrig.toString();
	memory.setItem('enrollmentStepList',stepList);
	memory.setItem('enrollmentStepCompleted','NNOT_AAPPLICABLE');
    let isArray = Array.isArray(stepArrayOrig);
	memory.setItem('enrollmentStepCurrent',stepArrayOrig[0]);
	memory.setItem('enrollmentStepNext',stepArrayOrig[1]);
    $w('#boxConfirmStaffEyeD').show();
}
// ø <---------- </instantiateLoopSwitchEnrollmentSteps> ---------->


// ø <---------- <stepsDisplayStatusAsReturnString>  ---------->
export function stepsDisplayStatusAsReturnString(tag = 'unknown tag'){
	let returnString = '========================================';
    returnString += '\n' + '==========      <'+tag+'>     ==========';
    returnString += '\n' + 'memItemCOMPLETED: ' + memory.getItem('enrollmentStepCompleted');
    returnString += '\n' + 'memItemCURRENT: ' + memory.getItem('enrollmentStepCurrent');
    returnString += '\n' + 'memItemNEXT: ' + memory.getItem('enrollmentStepNext');
    returnString += '\n' + 'memItemLIST: ';
    let List = memory.getItem('enrollmentStepList'); 
	List = List.replace('CCOMPLETE,', 'CCOMPLETE,\n')
    returnString += '\n' + List;
    returnString += '\n' + '==========      </'+tag+'>    ==========';
    returnString += '\n' + '========================================';
	return returnString;
}
// ø <---------- </stepsDisplayStatusAsReturnString> ---------->

// ø <---------- <stepsDisplayStatusAsConsoleWarn>  ---------->
export function stepsDisplayStatusAsConsoleWarn(tag = 'unknown tag'){

    console.warn('========================================')
    console.warn('==========      <'+tag+'>     ==========')
    console.warn('memItemCURRENT: ' + memory.getItem('enrollmentStepCurrent'))
    console.warn('memItemNEXT: ' + memory.getItem('enrollmentStepNext'))
    console.warn('memItemLIST: ')
    let List = memory.getItem('enrollmentStepList'); 
	List = List.replace('CCOMPLETE,', 'CCOMPLETE,\n')
    console.warn(List)
    console.warn('==========      </'+tag+'>    ==========')
    console.warn('========================================')
}
// ø <---------- </stepsDisplayStatusAsConsoleWarn> ---------->

// ø <---------- <stepsCycleSteps>  ---------->
export function stepsCycleSteps(){
    let funcStepArray = memory.getItem('enrollmentStepList').split(',');
    memory.setItem('enrollmentStepCompleted',funcStepArray[0]);
    memory.setItem('enrollmentStepCurrent',funcStepArray[1]);
    memory.setItem('enrollmentStepNext',funcStepArray[2]);
    let cycleElement = funcStepArray.shift();
    funcStepArray.push(cycleElement);
    memory.setItem('enrollmentStepList',funcStepArray.toString());
}
// ø <---------- </stepsCycleSteps> ---------->

// ø <---------- <doInstantiateExitAfter>  ---------->
export function doInstantiateExitAfter(exitAfter = 'TTRUE_FUCNTION_DEFAULT'){
    let exitNow = 'FFALSE';
    exitNow = exitAfter === 'ALL' ? 'TTRUE_ALL' : exitNow;
    memory.setItem('loopExitAfterStep',exitAfter);
    memory.setItem('loopExitNow',exitNow);
}
// ø <---------- </doInstantiateExitAfter> ---------->

// ø <---------- <doCheckExitAfter> ---------->
export function doCheckExitAfter(){
// ø <ExitAfter Switch Check>
    let exitNow = memory.getItem('loopExitNow')
    let exitAfter = memory.getItem('loopExitAfterStep')
    exitNow = exitAfter === memory.getItem('enrollmentStepCurrent') ? 'EXIT_AFTER_MATCH' : exitNow;
    exitNow = memory.getItem('enrollmentStepCurrent') === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;
    memory.setItem('loopExitNow',exitNow);
// ø </ExitAfter Switch Check>
}
// ø <---------- <doCheckExitAfter> ---------->

// ! ====================================================================================================
// ! ====================                     </LoopSwitch Suppor Functiions>              ==============
// ! ====================================================================================================


// ! ====================================================================================================
// ! ====================                    <Only UI Support Functiions>                   ==============
// ! ====================             ...nothing core to the Enrollment Process            ==============
// ! ====================================================================================================

export function switchGetMemoryKey (action){
	let who = $w('#radioWho').value;
	let code = $w('#radioCode').value;
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
	let codeLabel = 'CODE LABLE DEFAULT' + timeDateString;
	let memoryKey = who.toLowerCase() + code + 'OnDeckJSON';
	let buildObject = {};
	buildObject.memoryKey = memoryKey;

	switch (action) {
		case 'BUILD':
			if($w('#radioAreYouSure').value !== 'YES'){
				$w('#sessionEnrollmentJSON').value = "'BUILD'  is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
				action = 'GET';
				break;
			}
			console.log('memoryKey: ' + memoryKey);
			codeLabel = "BUILT: memory.setItem(" + memoryKey + ", {codeString})";
			code = 'PPENDING';
			code = memoryKey.substr(0,2) === 'sp' ? 'DDYNAMIC_NNOT_AAPPLICABLE' : code;
			code = memoryKey === 'spMemberOnDeckJSON' ? 'NNEVER_AAPPLICABLE' : code;
			if(memoryKey === 'ppMemberOnDeckJSON'){
				ppMemberBuildOnDeckJSONZZZ();
			}else{
				buildObject.status = code;
				code = JSON.stringify(buildObject);
				memory.setItem(memoryKey, code);
			}
			$w("#radioAreYouSure").value = 'NO';
			break;
		case 'CLEAR':
			if($w('#radioAreYouSure').value !== 'YES'){
				$w('#sessionEnrollmentJSON').value = `'` + action + `'  is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.`;
				action = 'GET';
				break;
			}
			codeLabel = "CLEARED: memory.setItem(" + memoryKey + ", {clearString})";
			code = 'EEMPTY';
			code = memoryKey === 'spMemberOnDeckJSON' ? 'NNOT_AAPPLICABLE' : code;
			memory.setItem(memoryKey, code);
			$w("#radioAreYouSure").value = 'NO';
			break;
	
		case 'GET':
			if(action === 'GET'){
			    let logString = '';
				if(who === 'PP' && code === 'Member'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('ppMemberPrepJSON'): \n" + memory.getItem('ppMemberPrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('ppMemberExecuteUpsert'): \n" + memory.getItem('ppMemberExecuteUpsert');
				}else if(who === 'PP' && code === 'Contact'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('ppContactPrepJSON'): \n" + memory.getItem('ppContactPrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('ppContactExecuteUpsert'): \n" + memory.getItem('ppContactExecuteUpsert');
				}else if(who === 'PP' && code === 'Database'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('ppDatabasePrepJSON'): \n" + memory.getItem('ppDatabasePrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('ppDatabaseExecuteUpsert'): \n" + memory.getItem('ppDatabaseExecuteUpsert');
				}else if(who === 'ST' && code === 'Member'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('stMemberPrepJSON'): \n" + memory.getItem('stMemberPrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('stMemberExecuteUpsert'): \n" + memory.getItem('stMemberExecuteUpsert');
				}else if(who === 'ST' && code === 'Contact'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('stContactPrepJSON'): \n" + memory.getItem('stContactPrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('stContactExecuteUpsert'): \n" + memory.getItem('stContactExecuteUpsert');
				}else if(who === 'ST' && code === 'Database'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('stDatabasePrepJSON'): \n" + memory.getItem('stDatabasePrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('stDatabaseExecuteUpsert'): \n" + memory.getItem('stDatabaseExecuteUpsert');
				}else if(who === 'SP' && code === 'Member'){
					logString += '' + "'Secordary Parent Member' is Not Applicable to the SteamDA Workflow";
				}else if(who === 'SP' && code === 'Contact'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('spContactPrepJSON'): \n" + memory.getItem('spContactPrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('spContactExecuteUpsert'): \n" + memory.getItem('spContactExecuteUpsert');
				}else if(who === 'SP' && code === 'Database'){
				    logString += '' + "Prep:";
				    logString += '\n' + "memory.getItem('stDatabasePrepJSON'): \n" + memory.getItem('stDatabasePrepJSON');
				    logString += '\n\n' + "Execute:";
					logString += '\n' + "memory.getItem('stDatabaseExecuteUpsert'): \n" + memory.getItem('stDatabaseExecuteUpsert');
				}else{
				    logString += '' + "DEFAULT_Prep:";
				    logString += '\n' + "memory.getItem('ppMemberPrepJSON'): \n" + memory.getItem('ppMemberPrepJSON');
				    logString += '\n\n' + "DEFAULT_Execute:";
					logString += '\n' + "memory.getItem('ppMemberExecuteUpsert'): \n" + memory.getItem('ppMemberExecuteUpsert');
				}
				action.toUpperCase();
				$w('#sessionEnrollmentJSON').value = logString;				
			}else{
				codeLabel = "GOTTEN: memory.getItem(" + memoryKey + ")";
				action = typeof memory.getItem(memoryKey) === 'string' ? 'MAYBE' : action;	
				action = action === 'MAYBE' && (memory.getItem(memoryKey)).length > 0  ? 'GETTABLE' : action;
				action = action === 'MAYBE' ? "The value of memory.getItem('" + memoryKey+ "') exists and is an Empty String" : action;
				action = action === 'GET' ? "The value of memory.getItem('" + memoryKey+ "') is not a string (almost certainly 'undefined')" : action;
				if(action !== 'GETTABLE'){
					codeLabel = "MISBEGOTTEN: memory.getItem(" + memoryKey + ")";
					$w('#sessionEnrollmentJSON').value = action;
					action = 'GET';
				}
			}
			break;
	
		default:
			console.log("DO NOTHING - all action end with GET")
			break;
	}
	$w('#txtCodeLabel').text = codeLabel;
	if(action !== 'GET'){
		$w('#sessionEnrollmentJSON').value = memory.getItem(memoryKey);
	}
}

export function clearByElementIdArray(elementIdArray){
	if(!Array.isArray(elementIdArray)){
		return;
	}
	elementIdArray.forEach(elementId => {
		elementId = elementId.substr(0,1) === '#' ? elementId : '#' + elementId;
		$w(elementId).value = '';
		$w(elementId).resetValidityIndication();
	})

}

//ø <---------- <simpleComplexPass()>  ---------->
export function simpleComplexPass(){

    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let numeric = "0123456789";
    let start = Math.floor(Math.random() * alpha.length);
    let password = alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1).toUpperCase();
    start = Math.floor(Math.random() * numeric.length);
    password += numeric.substr(start,1);
    alpha = alpha + alpha.toLocaleUpperCase() + numeric;
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start,1);
    
 return password;   
}
//ø <---------- </simpleComplexPass()> ---------->

//ø <---------- <displaySteps>  ---------->
export function displaySteps(){
	let status = typeof memory.getItem('enrollmentStepList') === 'string' ? 'string' : 'undefined';
	status = status === 'string' && memory.getItem('enrollmentStepList').length < 1 ? 'empty' : status;
	let result = 'GET';
	result = status === 'undefined' ? "memory.getItem\n('enrollmentStepList') \nis undefined at this time" : result;
	result = status === 'empty' ? "memory.getItem\n('enrollmentStepList') \nis an empty string at this time" : result;
	let resultArray = status === 'string' ? memory.getItem('enrollmentStepList').split(',') : [];
	let resultString = "";
	let newLine = " • ";
	resultArray.forEach(element => {
		resultString += newLine + element;
		newLine = "\n • ";
	})
	result = status === 'string' ? resultString : result;
	$w('#txtStepsList').text = result;
	$w('#txtStepsListSeven').text = result;
	doUserInterfaceCleanupCurrent();
}
//ø <---------- </displaySteps> ---------->


// ø <---------- <doEnrollmentCleanupCurrent>  ---------->
// ø <DEPRECATED for 'doEnrollmentCleanupByKind' two below>
export function doEnrollmentCleanupCurrent() {
    local.setItem('logString', '[~1859]entering: ' + 'doEnrollmentCleanupCurrent()')
    local.setItem('logString', local.getItem('logString') + '\n' + "DEPRECATED for 'doEnrollmentCleanupByKind'")
    // ø <code Cleanup for Current Enrollment> mostly for testing
    memory.setItem('ppRevision',"EEMPTY")
    memory.setItem('stRevision',"EEMPTY")
    memory.setItem('ppMemberPrepJSON', 'EEMPTY');
    memory.setItem('ppMemberExecuteUpsert', 'EEMPTY');
    memory.setItem('stMemberPrepJSON', 'EEMPTY');
    memory.setItem('stMemberExecuteUpsert', 'EEMPTY');
    memory.setItem('ppContactPrepJSON', 'EEMPTY');
    memory.setItem('ppDatabasePrepJSON', 'EEMPTY');
    memory.setItem('stContactPrepJSON', 'EEMPTY');
    memory.setItem('stDatabasePrepJSON', 'EEMPTY');
    memory.setItem('spContactPrepJSON', 'EEMPTY');
    memory.setItem('spDatabasePrepJSON', 'EEMPTY');
    memory.setItem('ppContactExecuteUpsert', 'EEMPTY');
    memory.setItem('ppDatabaseExecuteUpsert', 'EEMPTY');
    memory.setItem('stContactExecuteUpsert', 'EEMPTY');
    memory.setItem('stDatabaseExecuteUpsert', 'EEMPTY');
    memory.setItem('spContactExecuteUpsert', 'EEMPTY');
    memory.setItem('spDatabaseExecuteUpsert', 'EEMPTY');
    memory.setItem('enrollmentStepList', 'EEMPTY');
    memory.setItem('enrollmentStepCompleted', 'EEMPTY');
    memory.setItem('enrollmentStepCurrent', 'EEMPTY');
    memory.setItem('enrollmentStepNext', 'EEMPTY');
    local.setItem('loopExitAfterStep', 'EEMPTY');
    local.setItem('loopExitNow', 'TTRUE_DEFUALT');
    memory.setItem('stepStampArray', 'EEMPTY_AARRAY');
    memory.setItem('yyyymm', 'EEMPTY');

    // ø </code Cleanup for Current Enrollment>
    return "The Current Enrollment Data has been Reset to 'EEMPTY', Clean-Up Successful.";
}
// ø </DEPRECATED for 'doEnrollmentCleanupByKind' two below>
// ø <---------- </doEnrollmentCleanupCurrent> ---------->


// ø <---------- <doEnrollmentLogCurrent>  ---------->
// ø <---------- <doEnrollmentLogCurrent_byKind.js filename>  ---------->
export function doEnrollmentLogCurrent(kind = 'DDEFAULT') {
    let kindSupportedArray = ['CODE','STEPS','DATA','CORE','NONPERSISTENT','LOG','ERROR','UNACCOUNTED_FOR','DDEFAULT'];
    kind = kindSupportedArray.includes(kind) ? kind : 'DDEFAULT';
    console.warn('kind: ' + kind);

    // ø <code Log for Current Enrollment> mostly for testing
    let logString = '';
    // ø <DATA>
    if(kind === 'DATA' || kind === 'DDEFAULT'){
        logString += '\n' + "local.getItem('superEnrollmentStatus'): " + local.getItem('superEnrollmentStatus');
        logString += '\n' + "memory.getItem('ppAction'): " + memory.getItem('ppAction');
        logString += '\n' + "memory.getItem('stAction'): " + memory.getItem('stAction');
        logString += '\n' + "memory.getItem('spAction'): " + memory.getItem('spAction');
        logString += '\n' + "local.getItem('staffIdentifiedFamilyId'): " + local.getItem('staffIdentifiedFamilyId');
        logString += '\n' + "local.getItem('familySeed'): " + local.getItem('familySeed');
        logString += '\n' + "local.getItem('familyId'): " + local.getItem('familyId');
        logString += '\n' + "local.getItem('studentId'): " + local.getItem('studentId');
        logString += '\n' + "local.getItem('secondaryId'): " + local.getItem('secondaryId');
        logString += '\n' + "memory.getItem('ppRevision'): " + memory.getItem('ppRevision');
        logString += '\n' + "memory.getItem('stRevision'): " + memory.getItem('stRevision');
        logString += '\n' + "local.getItem('familyEmail'): " + local.getItem('familyEmail');
        logString += '\n' + "local.getItem('studentEmail'): " + local.getItem('studentEmail');
        logString += '\n' + "local.getItem('secondaryEmail'): " + local.getItem('secondaryEmail');
        logString += '\n' + "local.getItem('ppFirst'): " + local.getItem('ppFirst');
        logString += '\n' + "local.getItem('ppLast'): " + local.getItem('ppLast');
        logString += '\n' + "local.getItem('stFirst'): " + local.getItem('stFirst');
        logString += '\n' + "local.getItem('stPreferredFirst'): " + local.getItem('stPreferredFirst');
        logString += '\n' + "local.getItem('stLast'): " + local.getItem('stLast');
        logString += '\n' + "local.getItem('spFirst'): " + local.getItem('stFirst');
        logString += '\n' + "local.getItem('spLast'): " + local.getItem('stLast');
        logString += '\n' + "local.getItem('comboName'): " + local.getItem('comboName');
        logString += '\n' + "[CORE]local.getItem('termId'): " + local.getItem('termId');
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <CODE>
    if(kind === 'CODE' || kind === 'DDEFAULT'){
        // ø <plus some DATA>
        logString += '\n' + '[DATA]' + "local.getItem('superEnrollmentStatus'): " + local.getItem('superEnrollmentStatus');
        logString += '\n' + '[DATA]' + "memory.getItem('ppAction'): " + memory.getItem('ppAction');
        logString += '\n' + '[DATA]' + "memory.getItem('stAction'): " + memory.getItem('stAction');
        logString += '\n' + '[DATA]' + "memory.getItem('spAction'): " + memory.getItem('spAction');
        logString += '\n' + '[DATA]' + "local.getItem('staffIdentifiedFamilyId'): " + local.getItem('staffIdentifiedFamilyId');
        logString += '\n' + '[DATA]' + "local.getItem('familyId'): " + local.getItem('familyId');
        logString += '\n' + '[DATA]' + "local.getItem('studentId'): " + local.getItem('studentId');
        logString += '\n' + '[DATA]' + "local.getItem('secondaryId'): " + local.getItem('secondaryId');
        logString += '\n' + '[DATA]' + "local.getItem('familyEmail'): " + local.getItem('familyEmail');
        logString += '\n' + '[DATA]' + "local.getItem('studentEmail'): " + local.getItem('studentEmail');
        logString += '\n' + '[DATA]' + "local.getItem('secondaryEmail'): " + local.getItem('secondaryEmail');
        // ø </plus some DATA>
        logString += '\n' + "memory.getItem('ppMemberPrepJSON'): " + memory.getItem('ppMemberPrepJSON');
        logString += '\n' + "memory.getItem('ppMemberExecuteUpsert'): " + memory.getItem('ppMemberExecuteUpsert');
        logString += '\n' + "memory.getItem('stMemberPrepJSON'): " + memory.getItem('stMemberPrepJSON');
        logString += '\n' + "memory.getItem('stMemberExecuteUpsert'): " + memory.getItem('stMemberExecuteUpsert');
        logString += '\n' + "memory.getItem('ppContactPrepJSON'): " + memory.getItem('ppContactPrepJSON');
        logString += '\n' + "memory.getItem('ppDatabasePrepJSON'): " + memory.getItem('ppDatabasePrepJSON');
        logString += '\n' + "memory.getItem('stContactPrepJSON'): " + memory.getItem('stContactPrepJSON');
        logString += '\n' + "memory.getItem('stDatabasePrepJSON'): " + memory.getItem('stDatabasePrepJSON');
        logString += '\n' + "memory.getItem('spContactPrepJSON'): " + memory.getItem('spContactPrepJSON');
        logString += '\n' + "memory.getItem('spDatabaseExecuteUpsert'): SWAP: " + memory.getItem('spDatabaseExecuteUpsert');
        logString += '\n' + "memory.getItem('ppContactExecuteUpsert'): " + memory.getItem('ppContactExecuteUpsert');
        logString += '\n' + "memory.getItem('ppDatabaseExecuteUpsert'): " + memory.getItem('ppDatabaseExecuteUpsert');
        logString += '\n' + "memory.getItem('stContactExecuteUpsert'): " + memory.getItem('stContactExecuteUpsert');
        logString += '\n' + "memory.getItem('stDatabaseExecuteUpsert'): " + memory.getItem('stDatabaseExecuteUpsert');
        logString += '\n' + "memory.getItem('spContactExecuteUpsert'): " + memory.getItem('spContactExecuteUpsert');
        logString += '\n' + "memory.getItem('spDatabasePrepJSON'): SWAP: " + memory.getItem('spDatabasePrepJSON');
    }//END if(kind === 'CODE' || kind === 'DDEFAULT')
    // ø </CODE>
    // ø <STEPS>
    if(kind === 'STEPS' || kind === 'DDEFAULT'){
        logString += '\n' + "memory.getItem('enrollmentStepList'): " + memory.getItem('enrollmentStepList');
        logString += '\n' + "memory.getItem('enrollmentStepCompleted'): " + memory.getItem('enrollmentStepCompleted');
        logString += '\n' + "memory.getItem('enrollmentStepCurrent'): " + memory.getItem('enrollmentStepCurrent');
        logString += '\n' + "memory.getItem('enrollmentStepNext'): " + memory.getItem('enrollmentStepNext');
        logString += '\n' + "local.getItem('loopExitAfterStep'): " + local.getItem('loopExitAfterStep');
        logString += '\n' + "local.getItem('loopExitNow'): " + local.getItem('loopExitNow');
        logString += '\n' + "memory.getItem('stepStampArray'): " + memory.getItem('stepStampArray');
    }//END if(kind === 'STEPS' || kind === 'DDEFAULT')
    // ø </STEPS>
    // ø <CORE>
    if(kind === 'CORE' || kind === 'DDEFAULT'){
        logString += '\n' + "local.getItem('timezoneOffset'): " + local.getItem('timezoneOffset');
        logString += '\n' + "local.getItem('tzAbbrv'): " + local.getItem('tzAbbrv');
        logString += '\n' + "local.getItem('yyyymm'): " + local.getItem('yyyymm');
        logString += '\n' + "local.getItem('termId'): " + local.getItem('termId');
        logString += '\n' + "local.getItem('termBeginMMDD')" + local.getItem('termBeginMMDD');
        logString += '\n' + "local.getItem('termEndMMDD')" + local.getItem('termEndMMDD');
        logString += '\n' + "local.getItem('termLabelKey'): " + local.getItem('termLabelKey');
        logString += '\n' + "local.getItem('wixWebhookId'): " + local.getItem('wixWebhookId');
        logString += '\n' + "local.getItem('wixWebhookStatus'): " + local.getItem('wixWebhookStatus');
        logString += '\n' + "local.getItem('weekIdToLabelKeyJSON'): " + '\n' + local.getItem('weekIdToLabelKeyJSON');
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </CORE>
    // ø <UNACCOUNTED_FOR>
    if(kind === 'UNACCOUNTED_FOR' || kind === 'DDEFAULT'){
        if(kind !== 'UNACCOUNTED_FOR'){
            logString += '\n' + "local.getItem('ondeckEnrollmentJSON')" + local.getItem('ondeckEnrollmentJSON');
        }
        logString += '\n' + "memory.getItem('loopExitNow') ['memory' Dupe?]" + memory.getItem('loopExitNow');
        logString += '\n' + "memory.getItem('ppMemberOnDeckJSON') [Dupe with 'PREP'?" + memory.getItem('ppMemberOnDeckJSON');
        logString += '\n' + "memory.getItem('HHOLDER') [well...]" + memory.getItem('HHOLDER');
        logString += '\n' + "memory.getItem('loopExitAfterStep') ['memory' Dupe?]" + memory.getItem('loopExitAfterStep');
        logString += '\n' + "local.getItem('yyyymm') [where,how used?]" + local.getItem('yyyymm');
    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </UNACCOUNTED_FOR>
    // ø <NONPERSISTENT>
    if(kind === 'NONPERSISTENT'){
        // Not '|| DDEFAULT' because it's purposely redundant

        logString += '\n' + "local.getItem('superEnrollmentStatus'): " + local.getItem('superEnrollmentStatus');
        logString += '\n' + "memory.getItem('ppAction'): " + memory.getItem('ppAction');
        logString += '\n' + "memory.getItem('stAction'): " + memory.getItem('stAction');
        logString += '\n' + "memory.getItem('spAction'): " + memory.getItem('spAction');
        logString += '\n' + "local.getItem('staffIdentifiedFamilyId'): " + local.getItem('staffIdentifiedFamilyId');
        logString += '\n' + "local.getItem('familyId'): " + local.getItem('familyId');
        logString += '\n' + "memory.getItem('ppRevision'): " + memory.getItem('ppRevision');
        logString += '\n' + "local.getItem('studentId'): " + local.getItem('studentId');
        logString += '\n' + "local.getItem('secondaryId'): " + local.getItem('secondaryId');
        logString += '\n' + "memory.getItem('stRevision'): " + memory.getItem('stRevision');
        logString += '\n' + "local.getItem('ppFirst'): " + local.getItem('ppFirst');
        logString += '\n' + "local.getItem('ppLast'): " + local.getItem('ppLast');
        logString += '\n' + "local.getItem('stFirst'): " + local.getItem('stFirst');
        logString += '\n' + "local.getItem('stPreferredFirst'): " + local.getItem('stPreferredFirst');
        logString += '\n' + "local.getItem('stLast'): " + local.getItem('stLast');
        logString += '\n' + "local.getItem('spFirst'): " + local.getItem('stFirst');
        logString += '\n' + "local.getItem('spLast'): " + local.getItem('stLast');
        logString += '\n' + "local.getItem('comboName'): " + local.getItem('comboName');
        logString += '\n' + "<---------->";
        
        logString += '\n' + "local.getItem('wixWebhookId'): " + local.getItem('wixWebhookId');
        logString += '\n' + "local.getItem('wixWebhookStatus'): " + local.getItem('wixWebhookStatus');
        logString += '\n' + "<---------->";
        logString += '\n' + "local.getItem('ondeckEnrollmentJSON').length === " + local.getItem('ondeckEnrollmentJSON').length;
    }
    // ø </NONPERSISTENT>
    // ø <LOG>
    if(kind === 'LOG' || kind === 'DDEFAULT'){
        logString += '\n' + "local.getItem('logString'): " + local.getItem('logString');
        logString += '\n' + "memory.getItem('lastStamp'): " + memory.getItem('lastStamp');
    }
    // ø </LOG>
    // ø <ERROR>
    if(kind === 'ERROR' || kind === 'DDEFAULT'){
        logString += '\n' + "local.getItem('lastErrorString'): " + local.getItem('lastErrorString');
    }
    // ø </ERROR>
    if(kind === 'MAN_IN_THE_HIGH_CASTLE' || kind === 'DDEFAULT'){
        logString += '\n' + "kind || kind [~1501]";
    }
    logString += '\n' + "RETURN LOG STRING [~1503]";
    return logString;
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentLogCurrent> ---------->

// ø <---------- <doEnrollmentCleanupByKind>  ---------->
export function doEnrollmentCleanupByKind(kindKey = 'DDEFAULT') {
    // ø <DO NOT REMOVE>
    // ! well, unless really final
    // ! do assign either true or false
    local.setItem('logString', local.getItem('logString') + '\n[~2019]entering: ' + 'doEnrollmentCleanupByKind() at ' + memory.getItem('lastStamp'))
    local.setItem('logString', local.getItem('logString') + '\nkindKey: ' + kindKey)

    let develTest = false;
    // ø </DO NOT REMOVE>
    let cleanupString = 'EEMPTY';//override where appropriate
    let kindKeySupportedArray = ['CURRENT','CODE','STEPS','DATA','CORE','OTHER','MEMORY_ALL','LOCAL_TEMP','ALL_EXCEPT_ENROLLMENT','ALL_INCLUDING_ENROLLMENT','ABORT','LOG','EEROR'];
    let kindSupportedArray = ['CODE','STEPS','DATA','CORE','OTHER','NEXT_ENROLLMENT'];
    kindKey = kindKeySupportedArray.includes(kindKey) ? kindKey : 'DDEFUALT';
    console.warn('kindKey: ' + kindKey);
    let kindArray = [];
    kindArray = kindKey === 'ABORT' ? /*kindSupportedArray*/['ZZZ'] : kindArray;
    kindArray = kindKey === 'ALL_INCLUDING_ENROLLMENT' ? ['CODE','STEPS','DATA','LOCAL_DATA','NEXT_ENROLLMENT','UI'] : kindArray;
    kindArray = kindKey === 'ALL_EXCEPT_ENROLLMENT' ? ['CODE','STEPS','DATA','LOCAL_DATA','UI'] : kindArray;
    kindArray = kindKey === 'CODE' ? ['CODE'] : kindArray
    kindArray = kindKey === 'STEPS' ? ['STEPS'] : kindArray
    kindArray = kindKey === 'DATA' ? ['DATA','NOT_LOCAL_DATA'] : kindArray
    kindArray = kindKey === 'CORE' ? ['NOT_CORE'] : kindArray
    kindArray = kindKey === 'OTHER' ? ['NOT_UNACCOUNTED_FOR'] : kindArray
    kindArray = kindKey === 'MEMORY_ALL' ? ['MEMORY_ALL'] : kindArray
    kindArray = kindKey === 'LOCAL_TEMP' ? ['LOCAL_TEMP'] : kindArray
    // ø <Deprecated Use kindKey = 'CURRENT'>
    kindArray = kindKey === 'CURRENT' ? ['DATA','CODE','STEPS','UI'] : kindArray;
    // ø </Deprecated Use kindKey = 'CURRENT'>
    
    // ø <VALIDATION HERE>
    let abort = false;
    if(kindArray.length === 0){
        local.setItem('logString', local.getItem('logString') + '\n[~2051]: ' + "The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not vallid.")
        abort = true;
    }
    if(kindArray.length === 1 && kindArray[0] === 'ZZZ'){
        local.setItem('logString', local.getItem('logString') + '\n[~2051]: ' + "The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not enabled at this time.")
        abort = true;
    }
    if(kindArray.includes('NEXT_ENROLLMENT')){
        if(typeof develTest !== 'boolean' || develTest !== true){
            if ($w('#sessionEnrollmentJSON').value !== 'BACKDOORROODKCAB') {
                if(typeof local.getItem('wixWebhookStatus') !== 'string' || local.getItem('wixWebhookStatus') !== 'RESOLVED'){
                    local.setItem('logString', local.getItem('logString') + '\n[~2057]: ' + "'Next Enrollment' rquires that the current Webhook Payload have a status of 'Resolved'")
                    abort = true;

                }
            }
        }
    }
    if (abort) {
        return;        
    }
    local.setItem('logString', local.getItem('logString') + '\n[~2068]kindArray: ' + kindArray.toString())

    // ø </VALIDATION HERE>
    
    // ø <code Log for Current Enrollment> mostly for testing
    // ø <DATA>
    if(kindArray.includes('DATA')){
        cleanupString = develTest === true ? 'DATA' : cleanupString;
        local.setItem('superEnrollmentStatus', cleanupString);
        memory.setItem('ppAction', cleanupString);
        memory.setItem('stAction', cleanupString);
        memory.setItem('spAction', cleanupString);
        memory.setItem('ppRevision', cleanupString);
        memory.setItem('stRevision', cleanupString);
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <LOCAL_DATA>
    if(kindArray.includes('LOCAL_DATA')){
        cleanupString = develTest === true ? 'LOCAL_DATA' : cleanupString;
        local.setItem('staffIdentifiedFamilyId', cleanupString);
        local.setItem('familySeed', cleanupString);
        local.setItem('familyId', cleanupString);
        local.setItem('studentId', cleanupString);
        local.setItem('secondaryId', cleanupString);
        local.setItem('familyEmail', cleanupString);
        local.setItem('studentEmail', cleanupString);
        local.setItem('secondaryEmail', cleanupString);
        local.setItem('ppFirst', cleanupString);
        local.setItem('ppLast', cleanupString);
        local.setItem('stFirst', cleanupString);
        local.setItem('stPreferredFirst', cleanupString);
        local.setItem('stLast', cleanupString);
        local.setItem('spFirst', cleanupString);
        local.setItem('spLast', cleanupString);
        local.setItem('comboName', cleanupString);
    }//END if(kind === 'LOCAL_DATA' || kind === 'DDEFAULT')
    // ø </LOCAL_DATA>
    // ø <CODE>
    if(kindArray.includes('CODE')){
        cleanupString = develTest === true ? 'CODE' : cleanupString;
        memory.setItem('ppMemberPrepJSON', cleanupString);
        memory.setItem('ppMemberExecuteUpsert', cleanupString);
        memory.setItem('stMemberPrepJSON', cleanupString);
        memory.setItem('stMemberExecuteUpsert', cleanupString);
        memory.setItem('ppContactPrepJSON', cleanupString);
        memory.setItem('ppDatabasePrepJSON', cleanupString);
        memory.setItem('stContactPrepJSON', cleanupString);
        memory.setItem('stDatabasePrepJSON', cleanupString);
        memory.setItem('spContactPrepJSON', cleanupString);
        memory.setItem('spDatabasePrepJSON', cleanupString);
        memory.setItem('ppContactExecuteUpsert', cleanupString);
        memory.setItem('ppDatabaseExecuteUpsert', cleanupString);
        memory.setItem('stContactExecuteUpsert', cleanupString);
        memory.setItem('stDatabaseExecuteUpsert', cleanupString);
        memory.setItem('spContactExecuteUpsert', cleanupString);
        memory.setItem('spDatabaseExecuteUpsert', cleanupString);
    }//END if(kind === 'CODE' || kind === 'DDEFAULT')
    // ø </CODE>
    // ø <STEPS>
    if(kindArray.includes('STEPS')){
        cleanupString = develTest === true ? 'STEPS' : cleanupString;
        memory.setItem('enrollmentStepList', cleanupString);
        memory.setItem('enrollmentStepCompleted', cleanupString);
        memory.setItem('enrollmentStepCurrent', cleanupString);
        memory.setItem('enrollmentStepNext', cleanupString);
        local.setItem('loopExitAfterStep', cleanupString);
        local.setItem('loopExitNow', cleanupString);
        memory.setItem('stepStampArray', cleanupString);
    }//END if(kind === 'STEPS' || kind === 'DDEFAULT')
    // ø </STEPS>
    // ø <CORE>
    if(kindArray.includes('CORE')){
        cleanupString = develTest === true ? 'CORE' : cleanupString;
        local.setItem('yyyymm', cleanupString);//was included in Deprecated version
        local.setItem('timezoneOffset', cleanupString);
        local.setItem('tzAbbrv', cleanupString);
        local.setItem('termId', cleanupString);
        local.setItem('termBeginMMDD', cleanupString);
        local.setItem('termEndMMDD', cleanupString);
        local.setItem('termLabelKey', cleanupString);
        local.setItem('weekIdToLabelKeyJSON', cleanupString);
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </CORE>
    // ø <UI>
    if(kindArray.includes('UI')){
        local.setItem('lastErrorString', cleanupString);
    }
    // ø </UI>
    // ø <NEXT_ENROLLMENT>
    if(kindArray.includes('NEXT_ENROLLMENT')){
        cleanupString = develTest === true ? 'NEXT_ENROLLMENT' : cleanupString;
        if(typeof develTest === 'boolean' && develTest !== true){
            cleanupString = develTest === true ? 'NEXT_ENROLLMENT' : cleanupString;
            local.setItem('wixWebhookId', cleanupString);
            local.setItem('wixWebhookStatus', cleanupString);
            local.setItem('ondeckEnrollmentJSON', cleanupString);
        }
    }
    // ø </NEXT_ENROLLMENT>
    // ø <UNACCOUNTED_FOR>
    if(kindArray.includes('UNACCOUNTED_FOR')){
        cleanupString = develTest === true ? 'UNACCOUNTED_FOR' : cleanupString;
        memory.setItem('loopExitNow', cleanupString);
        memory.setItem('ppMemberOnDeckJSON', cleanupString);
        memory.setItem('HHOLDER', cleanupString);
        memory.setItem('loopExitAfterStep', cleanupString);
    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </UNACCOUNTED_FOR>
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentCleanupByKind> ---------->

export function doUserInterfaceCleanupCurrent(){
	$w("#btnUiPpId").label = "Staff ID PP: " + local.getItem('staffIdentifiedFamilyId');
    let label = "Family ID: ";
    label += local.getItem('familyId') !== "EEMPTY" ? local.getItem('familyId') : '';
    label += Number(memory.getItem('ppRevision')) > 0 ? ' [' + memory.getItem('ppRevision') + ']' : ''; 
	$w("#btnUiFamilyID").label = label;
    label = "Student ID: ";
    label += local.getItem('studentId') !== "EEMPTY" ? local.getItem('studentId') : '';
    label += Number(memory.getItem('stRevision')) > 0 ? ' [' + memory.getItem('stRevision') + ']' : ''; 
	$w("#btnUiStudentID").label = label;
    label = "Secondary ID: ";
    label += local.getItem('secondaryId') !== "EEMPTY" ? local.getItem('secondaryId') : '';
	$w("#btnUiSecondaryID").label = label;
    let step = memory.getItem('enrollmentStepCompleted') === null ? false : true;
    step = memory.getItem('enrollmentStepCompleted') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCompleted') === "NNOT_AAPPLICABLE" ? false : step;
	$w("#btStepCompleted").label = step ?  memory.getItem('enrollmentStepCompleted') : '';
	$w("#btStepCompletedSeven").label = step ?  memory.getItem('enrollmentStepCompleted') : '';
    step = memory.getItem('enrollmentStepCurrent') === null ? false : true;
    step = memory.getItem('enrollmentStepCurrent') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === "NNOT_AAPPLICABLE" ? false : step;
	$w("#btStepCurrent").label = step ?  memory.getItem('enrollmentStepCurrent') : '';
	$w("#btStepCurrentSeven").label = step ?  memory.getItem('enrollmentStepCurrent') : '';
	$w("#txtStudentDobString").value = local.getItem('uiStDobString');
    let webhookId = local.getItem('wixWebhookId')
    if(typeof webhookId === 'string' && webhookId.length > 20){
        label = 'Webhook ID: ';
        label += local.getItem('wixWebhookId');
        label += ' [' + local.getItem('wixWebhookStatus') + ']';
    }else if(typeof webhookId === 'string' && webhookId === 'EEMPTY'){
        label = 'Webhook ID: [empty]';
    }else{
        label = 'Webhook ID: [invalid]';
    }
    $w('#btnWebhookData').label = label;
    if(local.getItem('wixWebhookStatus') === 'RESOLVED'){
        // $w('#grpCleanUpAllIncludingEnrJSON').show();
        // $w('#grpWebhookResolve').hide();
    }else{
        // $w('#grpCleanUpAllIncludingEnrJSON').hide();
        $w('#grpWebhookResolve').show();
    }
}
export function doUpdateStudentDOB(){
    let resultString = '';
    if($w("#txtStudentDobString").value === local.getItem('uiStDobString')){
        resultString = 'There is No Change in the Student Date-of-Birth to Update.'
        resultString += "\n\nNo action taken. \nPlease try again or ask for assistance.";
        $w("#sessionEnrollmentJSON").value = resultString;
        return;
    }
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

    let dob = new Date($w("#txtStudentDobString").value);
    let dobString = ('00' + (dob.getMonth() + 1).toString()).substr(-2) + '/' + ('00' + dob.getDate().toString()).substr(-2) + '/' + dob.getFullYear().toString();
    local.setItem('uiStDobString',dobString);
    enrollmentObject.family.student.dobString = dobString;
    enrollmentObject.family.student.dob.date = dob.toISOString();
    enrollmentObject.family.student.dob.month = dob.getMonth() + 1;
    enrollmentObject.family.student.dob.day = dob.getDate();
    enrollmentObject.family.student.dob.year = dob.getFullYear();
    local.setItem('ondeckEnrollmentJSON',JSON.stringify(enrollmentObject));
    local.setItem('ondeckEnrollmentJSON',JSON.stringify(enrollmentObject));
    $w("#txtStudentDobString").value = dobString;
    resultString = "The logic to allow 'Student Date-of-Birth to Update' was successfully executed."
    resultString += "\n\nNo further action taken. \nPlease click 'Show Enrollment JSON' to check the result.";
    $w("#sessionEnrollmentJSON").value = resultString;
}

export async function doGetRecord(what,where){
    let whatLower = what.toLowerCase();
    let supportedWhatValues = ['ppMember','ppContact','stMember','stContact'];
    let kAppend = '\n\nNo Action Taken.\nPlease try again or ask for assistance.';
    let response = "'"+what+"' is Not Supported to be 'gotten' at this time." + kAppend;
    let responseObject = {};
    let familyId = typeof local.getItem('familyId') === 'string' ? local.getItem('familyId') : 'ZZZ';
    let studentId = typeof local.getItem('studentId') === 'string' ? local.getItem('studentId') : 'ZZZ';
    let secondaryId = typeof local.getItem('secondaryId') === 'string' ? local.getItem('secondaryId') : 'ZZZ';
    let valid = true;
    valid = what.substr(0,2) === 'pp' && familyId.length < 10 ? false : valid;
    valid = what.substr(0,2) === 'st' && studentId.length < 10 ? false : valid;
    valid = what.substr(0,2) === 'sp' && secondaryId.length < 10 ? false : valid;
    let thisId = what.substr(0,2) === 'pp' && valid === true ? familyId : 'ZZnomatchZZ'
    thisId = what.substr(0,2) === 'st' && valid === true ? studentId : thisId;
    thisId = what.substr(0,2) === 'sp' && valid === true ? secondaryId : thisId;
    if(supportedWhatValues.includes(what)){
        if(!valid){
            response = "'"+what+"' is not able to be 'gotten' at this time. Primary-Parent ID (aka Family ID) is not valid.";
            response += kAppend;
        }
        if(whatLower.indexOf('member') > 0){
            responseObject = await getUserFrontEnd(thisId);
            response = JSON.stringify(responseObject,undefined,4);
        }
        if(whatLower.indexOf('contact') > 0){
            responseObject = await steamdaGetContactFunction(thisId);
            response = JSON.stringify(responseObject,undefined,4);
        }
    }
    where = where.substr(0,1) === '#' ? where : '#' + where;
    $w(where).value = response;
}
export function doClear(clearIdArray){
    let idArray = [];
    let inValid = true;
    if(typeof clearIdArray === 'string'){
        idArray.push(clearIdArray);
        inValid = false;
    }
    if(typeof clearIdArray === 'object' && Array.isArray(clearIdArray)){
        idArray = clearIdArray;
        inValid = false;
    }
    if(inValid){
        return;
    }
    idArray.forEach(elementId => {
        if(elementId.substr(0,1) !== '#'){
            elementId = '#' + elementId;
        }
        $w(elementId).value = '';
    })

}

// ø <------------ <doUpdateThisWebhookPayload(status)>  -------------->
export async function doUpdateThisWebhookPayload(status) {
	let response = "";
	let kInvalidAppend = `\nNo action taken.\nPlease try again or ask for assistnace.`;
	if(typeof local.getItem('wixWebhookId') !== 'string' || local.getItem('wixWebhookId').length < 20){
		response = "Invalid 'WiX-Webhook-ID'" + kInvalidAppend;
		$w('#sessionEnrollmentJSON').value = response;
		return;
	}
	if($w('#ddCurrentStatusUpdate').value === local.getItem('wixWebhookStatus')){
		response = "On-deck 'Webhook-Payload' Status is the same as the Drop-Down (update) Value. No Update Indicated" + kInvalidAppend;
		$w('#sessionEnrollmentJSON').value = response;
		return;
	}
	await updateStatusWebhookPayloadThis();
	let lastResponse = JSON.parse(local.getItem('lastResponseObject'));
	if(lastResponse._id === local.getItem('webhookThisId')){
		local.setItem('webhookThisStatus',lastResponse.currentStatus);
		if(typeof lastResponse.resolvedStatus !== 'undefined'){
			local.setItem('webhookThisResolved',lastResponse.resolvedStatus);
		}
	}

}
// ø <------------ </doUpdateThisWebhookPayload(status)> -------------->


// ø <------------ <updateStatusWebhookPayloadThis()>  -------------->
export async function updateStatusWebhookPayloadThis(getOnly = false){
	   const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = local.getItem('wixWebhookId');

    let updateObject = await wixData.get("webhookPayload", webhookId, options);
    let doUserInterfaceUpdate = false;
    if(getOnly){
      	local.setItem('lastResponseObject', JSON.stringify(updateObject));
        if(updateObject.currentStatus === "RESOLVED"){
            if(updateObject.resolvedStatus === "RESOLVED"){
                local.setItem('wixWebhookStatus',"RESOLVED");
                doUserInterfaceUpdate = true;
            }else{
                local.setItem('lastErrorString',"current WebhookPayload 'currentStatus' and 'resolvedStatus' are Out-Of-Sync");
            }
        }
        if(updateObject.currentStatus !== local.getItem('wixWebhookStatus')){
            local.setItem('wixWebhookStatus',updateObject.currentStatus)
            doUserInterfaceUpdate = true;
        }
        $w('#sessionEnrollmentJSON').value = JSON.stringify(updateObject,undefined,4);
        return;
    }

	let now = new Date();
	let nowISO = now.toISOString();
	updateObject.currentStatus = $w('#ddCurrentStatusUpdate').value;
	updateObject.currentStatusStamp = now;
	if($w('#ddCurrentStatusUpdate').value === 'RESOLVED'){
		updateObject.resolvedStatus = $w('#ddCurrentStatusUpdate').value;
		updateObject.resolvedStatusStamp = now;
	}
	local.setItem('lastParamObject', JSON.stringify(updateObject));
	let response = await wixData.update("webhookPayload", updateObject)
	local.setItem('lastResponseObject', JSON.stringify(response));
	$w('#sessionEnrollmentJSON').value = JSON.stringify(response,undefined,4);

}
// ø <------------ </updateStatusWebhookPayloadThis()> -------------->

// ! ====================================================================================================
// ! ====================                    </Only UI Support Functiions>                   ==============
// ! ====================================================================================================

// ! ====================================================================================================
// ! ====================.        <Only BUTTON_click Functiions Below Here>          ====================
// ! ====================================================================================================
export function btnGetEnrollmentJSON_click(event) {
    if(local.getItem('ondeckEnrollmentJSON').length < 20){
        $w('#sessionEnrollmentJSON').value = "'local.getItem('ondeckEnrollmentJSON')' seems not to be actively set to an Enrollment Application to Post.\n\nYou may travel to 'Process Webhooks' to process any remaining Appliations.";

    }else{
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'))
        $w('#sessionEnrollmentJSON').value = JSON.stringify(enrollmentObject,undefined,4);
    }
}

export function btnGetCode_click(event) {
	switchGetMemoryKey ('GET');
}

export function btnClearCode_click(event) {
	switchGetMemoryKey ('CLEAR');
}

export function btnBuildCode_click(event) {
	switchGetMemoryKey ('BUILD');
}

export function btnClearPreviewCode_click(event) {
	let elementIdArray = [];
	elementIdArray.push("sessionEnrollmentJSON")
	clearByElementIdArray(elementIdArray);
}

export function btnGetFamilyID_click(event) {
	let status = typeof local.getItem('familyId') === 'string' ? 'string' : 'undefined';
	status = status === 'string' && local.getItem('familyId').length < 1 ? 'empty' : status;
	let result = 'GET';
	result = status === 'undefined' ? "local.getItem('familyId') is undefined at this time" : result;
	result = status === 'empty' ? "local.getItem('familyId') is an empty string at this time" : result;
	result = status === 'string' ? "the current value of local.getItem('familyId') is: " + local.getItem('familyId') : result;
	console.log('local.getItem("ondeckEnrollmentJSON"): ');
    console.log(result);
	$w('#sessionEnrollmentJSON').value = result;
}

export function btnGetStudentID_click(event) {
	let status = typeof local.getItem('studentId') === 'string' ? 'string' : 'undefined';
	status = status === 'string' && local.getItem('studentId').length < 1 ? 'empty' : status;
	let result = 'GET';
	result = status === 'undefined' ? "local.getItem('studentId') is undefined at this time" : result;
	result = status === 'empty' ? "local.getItem('studentId') is an empty string at this time" : result;
	result = status === 'string' ? "the current value of local.getItem('studentId') is: " + local.getItem('studentId') : result;
	$w('#sessionEnrollmentJSON').value = result;
}

export function btnResetSteps_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
		instantiateLoopSwitchEnrollmentSteps();
		$w('#sessionEnrollmentJSON').value = stepsDisplayStatusAsReturnString('init');
		displaySteps();
	}else{
		$w('#sessionEnrollmentJSON').value = "'Reset Steps' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
}

export function btnDisplayCurrentState_click(event) {
    let kind = $w('#ddDisplayKind').value;
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent(kind);
}

export async function btnCleanupCurrentState_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
        memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
        local.setItem('logString','enter btnCleanupCurrentState_click(event): YES');
		local.setItem('logString', local.getItem('logString') + '\nTest of Clean Tags BEGIN Man in the High Castle<clean>');
		doEnrollmentCleanupByKind('CURRENT')
		doUserInterfaceCleanupCurrent();
	}else{
        local.setItem('logString','enter btnCleanupCurrentState_click(event): NO');
		local.setItem('logString', local.getItem('logString') + '\nTest of Clean Tags BEGIN The Plot Against America<clean>');
        memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
		local.setItem('logString', local.getItem('logString') + '\n' + "'Clean Up' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.");
	}
	$w("#radioAreYouSure").value = 'NO';
    local.setItem('logString', local.getItem('logString') + '\n</clean>Marvelous Mrs. Maisel END Test of Clean Tags');
    local.setItem('logString', local.getItem('logString') + '\n[~2534]exit btnCleanupCurrentState_click(event) nowISO: ' + memory.getItem('lastStamp'));
	$w('#sessionEnrollmentJSON').value = local.getItem('logString');
}

export async function btnPeformNextStep_click(event) {
    local.setItem('logString','enter btnPeformNextStep_click(event)');
    local.setItem('logString', local.getItem('logString') + '\n[~2444]Next (current) Step: ' + memory.getItem('enrollmentStepCurrent'))
	await doPeformNextStep();
	$w('#ddDisplayKind').value = 'ALL';
	displaySteps();
    doUserInterfaceCleanupCurrent()
    local.setItem('logString', local.getItem('logString') + '\n[~2450]exit btnPeformNextStep_click(event) nowISO: ' + memory.getItem('lastStamp'));
	$w('#sessionEnrollmentJSON').value = local.getItem('logString');
    $w('#boxConfirmStaffEyeD').hide();
}

export async function btnSkipNextStep_click(event) {
    local.setItem('logString','enter btnSkipNextStep_click(event)');
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
	if($w('#radioAreYouSure').value !== 'YES'){
		local.setItem('logString', local.getItem('logString') + '\n[~2293]: ' + "'Skip Next Step' is so critical that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.");
	}else if(memory.getItem('enrollmentStepCurrent') === 'IINSTANTIATE'){
		local.setItem('logString', local.getItem('logString') + '\n[~2296]: ' + "You cannot use 'Skip Next Step' to skip the 'IINSTANTIATE' step. Please proceed normally to execute the 'IINSTANTIATE' step.\n\nNo action taken. \nPlease try again or ask for assistance.");
    }else{
        stepsCycleSteps();
		displaySteps();
        local.setItem('logString', local.getItem('logString') + '\n[~2301]stepSkipped: ' + memory.getItem('enrollmentStepCompleted'));
	}
    $w("#radioAreYouSure").value = 'NO';
    local.setItem('logString', local.getItem('logString') + '\n[~2304]exit btnSkipNextStep_click(event) nowISO: ' + memory.getItem('lastStamp'));
    $w('#sessionEnrollmentJSON').value = local.getItem('logString');
}

export function toggleBoxState(){
    if($w("#boxUImultiState").currentState.id === "Main"){
        $w("#boxUImultiState").changeState("Original");
    }else{
        $w("#boxUImultiState").changeState("Main");
    }
}

export function btnToggleBoxState_click(event) {
	toggleBoxState();
}

export function btnToggleBoxStateToo_click(event) {
	toggleBoxState(); 
}

export async function btCleanUpAllExceptEnrJSON_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
        memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
        local.setItem('logString','[~2595]entering btCleanUpAllExceptEnrJSON_click:YES');
        let responseCleanupCurrentState = doEnrollmentCleanupByKind('ALL_EXCEPT_ENROLLMENT');
        local.setItem('logString',local.getItem('logString') + '\n[~2601]exiting btCleanUpAllExceptEnrJSON_click:YES');
		$w('#sessionEnrollmentJSON').value = local.getItem(('logString'));
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up All - Except Enrollment JSON' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
}

export async function btCleanUpAllIncludingnrJSON_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
        memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
        local.setItem('logString','[~2595]entering btCleanUpAllIncludingnrJSON_click:YES');
        let responseCleanupCurrentState = doEnrollmentCleanupByKind('ALL_INCLUDING_ENROLLMENT');
        local.setItem('logString',local.getItem('logString') + '\n[~2621]exiting btCleanUpAllIncludingnrJSON_click:YES');
		$w('#sessionEnrollmentJSON').value = local.getItem(('logString'));
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up All - Including Enrollment JSON' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
}

export function btnUpdateStudentDOB_click(event) {
	doUpdateStudentDOB()
}

export function btnGetPpMember_click(event) {
	doGetRecord('ppMember','ppMemberResponseJSON');
}

export function btnGetPpCpntact_click(event) {
	doGetRecord('ppContact','ppContactResponseJSON');
}

export function btnGetPpDbase_click(event) {
	doGetRecord('ppDbase','ppDatabaseResponseJSON');
}

export function btnClearPpMember_click(event) {
	doClear('ppMemberResponseJSON')
}

export function btnClearPpContact_click(event) {
	doClear('#ppContactResponseJSON')
}

export function btnClearPpDbase_click(event) {
    let clearArray = ['#ppDatabaseResponseJSON'];
	 doClear(clearArray);
}

export function btnKludgeClearPpStSpIDs_click(event) {
    doUserInterfaceCleanupCurrent();
    $w('#sessionEnrollmentJSON').value = 'DEPRECATED: Kludge-Clear has removed all Primary-Parent, Student, and Secondary-Parent ID Values from Storage.'
}

export function btnGetStMember_click(event) {
	doGetRecord('stMember','stMemberResponseJSON');
}

export function btnGetStCpntact_click(event) {
	doGetRecord('stContact','stContactResponseJSON');
}

export function btnGetStDbase_click(event) {
	doGetRecord('stDbase','stDatabaseResponseJSON');
}

export function btnClearStMember_click(event) {
	doClear('stMemberResponseJSON')
}

export function btnClearStContact_click(event) {
	doClear('stContactResponseJSON')
}

export function btnClearStDbase_click(event) {
	doClear('stDatabaseResponseJSON')
}

export function btnGetSpMember_click(event) {
	doGetRecord('spMember','spMemberResponseJSON');
}

export function btnGetSpCpntact_click(event) {
	doGetRecord('spContact','spContactResponseJSON');
}

export function btnGetSpDbase_click(event) {
	doGetRecord('spDbase','spDatabaseResponseJSON');
}

export function btnClearSpMember_click(event) {
	doClear('spMemberResponseJSON')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function btnClearSpContact_click(event) {
	doClear('spContactResponseJSON')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function btnClearSpDbase_click(event) {
	doClear('spDatabaseResponseJSON')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

export function btnWebhookResolve_click(event) {
    if($w('#radioAreYouSure').value === 'YES'){
        let statusThis = $w('#ddCurrentStatusUpdate').value;
        doUpdateThisWebhookPayload(statusThis);
        updateStatusWebhookPayloadThis(true);
        console.log('[`3215] RESOLVE: Yes')
	}else{
		$w('#sessionEnrollmentJSON').value = "'Resolve Webhook' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
    console.log('[`3221] EXIT: btnWebhookResolve_click(event)')
}

export function btnCleanUpDEP_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
		$w('#sessionEnrollmentJSON').value = doEnrollmentCleanupCurrent();
		doUserInterfaceCleanupCurrent();
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
}

export async function btnCleanUpByKindTEST_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
        memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
        local.setItem('logString','[~2817]entering btnCleanUpByKindTEST_click:YES');
        local.setItem('logString',local.getItem('logString') + '\nddCleanupByKind: ' + $w('#ddCleanupByKind').value);
        local.setItem('logString', local.getItem('logString') + '\nTest of Clean Tags BEGIN Man in the High Castle<clean>');
        let kindKey = $w('#ddCleanupByKind').value;
        doEnrollmentCleanupByKind(kindKey);
        local.setItem('logString', local.getItem('logString') + '\n</clean>Marvelous Mrs. Maisel END Test of Clean Tags');
        local.setItem('logString',local.getItem('logString') + '\nexiting btnCleanUpByKindTEST_click');
        $w('#sessionEnrollmentJSON').value = local.getItem('logString');
	}else{
        local.setItem('logString',"'Clean Up by zKind' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.");
	}
	$w("#radioAreYouSure").value = 'NO';
    let logStringClean = local.getItem('logString');
    if(logStringClean.indexOf('</clean>') >= 0){
        logStringClean = logStringClean.substr(0,logStringClean.indexOf('</clean>'));
    }
    if(logStringClean.indexOf('<clean>') >= 0){
        console.log('logStringClean.indexOf(<clean>):' + logStringClean.indexOf('<clean>'))
        logStringClean = logStringClean.substr(logStringClean.indexOf('<clean>') + 7);
    }
    memory.setItem('logStringClean',logStringClean);
	$w('#sessionEnrollmentJSON').value = local.getItem('logString');
	$w('#sessionEnrollmentJSON').value += '\n\n---\n\n[Proof of Concept]\n(line-feeds are tricky)\nCLEAN VERSION OF ABOVE\n======================\n';
	$w('#sessionEnrollmentJSON').value += memory.getItem('logStringClean');
}

export function btnGetWebhookPayload_click(event) {
	updateStatusWebhookPayloadThis(true); 
}


// ! ====================================================================================================
// ! ====================                       <PRETRASH DB TESTING>                      ==============
// ! ====================================================================================================

export async function pretrashFindFamilyIdTermId(){
    let logString = '';
    let exceptionLogArray = [];
    
    let familyId = $w('#txtFamilyId').value;
    let termId = Number($w('#txtTermId').value);

    logString += '\n' + "local.getItem('familyId'): " + familyId;
    logString += '\n' + "local.getItem('termId'): " + termId;


    let ppExistsCount = await wixData.query("person")
        .eq("personId", familyId)
        .eq("termId", termId)
        .count();

    if (ppExistsCount > 0) {
        exceptionLogArray.push("primaryParent person exists for this term");
    }


    logString +='\n' + "ppExistsCount: " + ppExistsCount;

    let exceptionLogBlock = '';
    exceptionLogArray.forEach(exceptionLog => {
        if(exceptionLogBlock.length === 0){
            exceptionLogBlock = `
EXCEPTION LOG BLOCK:
====================`;
        }
        exceptionLogBlock += '\n' + exceptionLog;
    });
    logString += exceptionLogBlock;



    if(exceptionLogBlock.length > 0){
        $w('#preTrashLog').value = logString;
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('ppLast') + ', ' + local.getItem('ppFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = familyId;
    toInsert.familyId = familyId;
    toInsert.role = 'Primary';
    toInsert.first = local.getItem('ppFirst');
    toInsert.last = local.getItem('ppLast');
    toInsert.firstLegal = local.getItem('ppFirst');
    toInsert.fullName = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = familyId;
    toInsert.idBL = familyId;
    toInsert.altPersonId = familyId;
    toInsert.termId = termId;
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    let testObjectData = {};
    testObjectData.family = "family data";
    let testObjectCorollary = {};
    testObjectCorollary.corollary = "course data";
    toInsert.objectData = local.getItem('ondeckEnrollmentJSON');
    toInsert.objectCorollary = JSON.stringify(testObjectCorollary);
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->
    logString = JSON.stringify(toInsert,undefined,4);
    logString += "==========";
    $w('#stDatabaseResponseJSON').value = logString;


    // ø <---------- <INSERT>  ---------->
    let ppInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->
    logString += JSON.stringify(toInsert,undefined,4);;
  
    $w('#preTrashLog').value = JSON.stringify(ppInsertResult,undefined,4);
    return;

}// END function pretrashFindFamilyIdTermId()

export async function pretrashFindStByFamilyIdLegalFirst(){
    let logString = '';
    let exceptionLogArray = [];
    
    let familyId = $w('#txtFamilyId').value;
    let termId = Number($w('#txtTermId').value);

    let studentId = $w('#txStudentId').value;

    let studentLegalFirst = $w('#txStudentLegalFirst').value;

    logString += '\n' + "local.getItem('familyId'): " + familyId;
    logString += '\n' + "local.getItem('termId'): " + termId;


    let stExistsCount = await wixData.query("person")
        .eq("familyId", familyId)
        .eq("firstLegal", studentLegalFirst)
        .eq("termId", termId)
        .count();

    if (stExistsCount > 0) {
        exceptionLogArray.push("Student person exists for this familyId, legalFirstName and term");
    }


    logString +='\n' + "stExistsCount: " + stExistsCount;

    let exceptionLogBlock = '';
    exceptionLogArray.forEach(exceptionLog => {
        if(exceptionLogBlock.length === 0){
            exceptionLogBlock = `
EXCEPTION LOG BLOCK:
====================`;
        }
        exceptionLogBlock += '\n' + exceptionLog;
    });
    logString += exceptionLogBlock;



    if(exceptionLogBlock.length > 0){
        logString += '\n' + 'RETURN NO INSERT';
        $w('#preTrashLog').value = logString;
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = studentId;
    toInsert.familyId = familyId;
    toInsert.role = 'Student';
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = local.getItem('stFirst');
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('stLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = familyId;
    toInsert.idBL = familyId;
    toInsert.altPersonId = studentId;
    toInsert.termId = termId;
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    let testObjectData = {};
    testObjectData.family = "family data";
    let testObjectCorollary = {};
    testObjectCorollary.corollary = "course data";
    toInsert.objectData = local.getItem('ondeckEnrollmentJSON');
    toInsert.objectCorollary = JSON.stringify(testObjectCorollary);
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->
    logString = JSON.stringify(toInsert,undefined,4);
    logString += "==========";
    logString += '\n' + 'INSERT INDICATED (SKIPPED)';
    $w('#stDatabaseResponseJSON').value = logString;
    // return;


    // ø <---------- <INSERT>  ---------->
    let stInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->
    logString += JSON.stringify(toInsert,undefined,4);;
  
    $w('#preTrashLog').value = JSON.stringify(stInsertResult,undefined,4);
    return;

}// END function pretrashFindStByFamilyIdLegalFirst()

export async function pretrashActionEvaluationTest(){
    local.setItem('staffIdentifiedFamilyId',$w('#txtStaffEyeD').value);
    memory.setItem('familyId_HOLDER', local.getItem('familyId'));
    local.setItem('familyId', $w('#txtFamilyId').value);
    local.setItem('termId', Number($w('#txtTermId').value));
    local.setItem('stFirst', $w('#txStudentLegalFirst').value);
    local.setItem('spFirst', $w('#txtSecondaryFirst').value);
    local.setItem('spLast', $w('#txtSecondaryLast').value);
    let now = new Date();
    let yyyymmddhhiiss = now.getFullYear() * 10000000000 + (now.getMonth() + 1) * 100000000 + now.getDate() * 1000000 + now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds() * 1;


    await actionValueEvaluation();
    $w('#preTrashLog').value = '============================================';
    $w('#preTrashLog').value += '\n========== <TESTING ACTION EVAL> ===========';
    $w('#preTrashLog').value += '\n======= actual data could be altered =======';
    $w('#preTrashLog').value += '\n============================================\n';
    $w('#preTrashLog').value += doEnrollmentLogCurrent('DATA');
    $w('#preTrashLog').value += '\nlocal.getItem(termId): ' + local.getItem('termId');
    $w('#preTrashLog').value += '\n\n==========\n'+local.getItem('logString')+'\n==========\n';
    $w('#preTrashLog').value += '\n============================================';
    $w('#preTrashLog').value += '\n==========     ' + yyyymmddhhiiss + '      =========';
    $w('#preTrashLog').value += '\n========== </TESTING ACTION EVAL> ==========';
    $w('#preTrashLog').value += '\n============================================';

    local.setItem('familyId', memory.getItem('familyId_HOLDER'));

}// END function pretrashActionEvaluationTest()

export function doPreTrashLogUI(){
    let now = new Date();
    let yyyymmddhhiiss = now.getFullYear() * 10000000000 + (now.getMonth() + 1) * 100000000 + now.getDate() * 1000000 + now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds() * 1;
    let logString = '';
    logString += '================================================================';
    logString += '\n===========     <LOG of Pre-Trash User Interface>    ===========';
    logString += '\n========      (no current data unless loade by UI)      ========';
    logString += '\n================================================================\n';


    logString += '\n' + "$w('#txtFamilyId').value: " + $w('#txtFamilyId').value;
    logString += '\n' + "$w('#txStudentId').value: " + $w('#txStudentId').value;
    logString += '\n' + "$w('#txStudentLegalFirst').value: " + $w('#txStudentLegalFirst').value;
    logString += '\n' + "$w('#txtTermId').value: " + $w('#txtTermId').value;
    logString += '\n' + "$w('#txtStaffEyeD').value: " + $w('#txtStaffEyeD').value;
    logString += '\n' + "$w('#txtSecondaryFirst').value: " + $w('#txtSecondaryFirst').value;
    logString += '\n' + "$w('#txtSecondaryLast').value: " + $w('#txtSecondaryLast').value;

    logString += '\n\n================================================================';
    logString += '\n===========              ' + yyyymmddhhiiss + '               ==========';
    logString += '\n===========    </LOG of Pre-Trash User Interface>    ===========';
    logString += '\n================================================================';

    $w('#preTrashLog').value = logString;
}//END function doPreTrashLogUI()

export async function doPreTrashThreeQueries(){
    let now = new Date();
    let yyyymmddhhiiss = now.getFullYear() * 10000000000 + (now.getMonth() + 1) * 100000000 + now.getDate() * 1000000 + now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds() * 1;
    
    let staffIdentifiedFamilyId = $w('#txtStaffEyeD').value;
    let termId = Number($w('#txtTermId').value);
    let studentLegalFirst = $w('#txStudentLegalFirst').value;

    let logBeginString = '';
    let logString = '';
    let logEndString = ''
    
    logBeginString += '================================================================';
    logBeginString += '\n===========     <LOG of Action-Eval Three Queries>   ===========';
    logBeginString += '\n========      (no current data unless loaded by UI)     ========';
    logBeginString += '\n================================================================\n';
    
    logEndString += '\n\n================================================================';
    logEndString += '\n===========              ' + yyyymmddhhiiss + '               ==========';
    logEndString += '\n===========    </LOG of Action-Eval Three Queries>   ===========';
    logEndString += '\n================================================================';

    let staffMatch3Q = staffIdentifiedFamilyId === 'INSTANTIATE' ? false : true;
    console.log('staffMatch3Q: ' + staffMatch3Q);
    if(!staffMatch3Q){

        logString = "\nBecause there was no Staff Identified Primary Parent Member Match (that is, familyId = 'INSTANTIATE'), \nthe Three Queries are Moot.";
        logString = logBeginString + logString + logEndString;
        return logString;
    }
    logString = `
    let ppExistsCount = await wixData.query("person")
        .eq("personId", '` + staffIdentifiedFamilyId + `')
        .eq("termId", ` + termId + `)
        .count();`;
    
    let ppExistsCount = await wixData.query("person")
        .eq("personId", staffIdentifiedFamilyId)
        .eq("termId", termId)
        .count();
    
    logString += "\n\nppExistsCount === " + ppExistsCount;
    logString += "\n\n---\n"
    
    logString += `
    let stExistsCount = await wixData.query("person")
            .eq("familyId", '` + staffIdentifiedFamilyId + `')
            .eq("firstLegal", '` + studentLegalFirst + `')
            .eq("termId", ` + termId + `)
            .count();`;

    let stExistsCount = await wixData.query("person")
            .eq("familyId", staffIdentifiedFamilyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();            
    
    logString += "\n\stExistsCount === " + stExistsCount;
    logString += "\n\n---\n"

    logString += `
    let spExistsCount = await wixData.query("person")
            .eq("familyId", '` + staffIdentifiedFamilyId + `')
            .eq("role", 'Secondary')
            .eq("termId", ` + termId + `)
            .count();`;
    let spExistsCount = await wixData.query("person")
            .eq("familyId", staffIdentifiedFamilyId)
            .eq("role", 'Secondary')
            .eq("termId", termId)
            .count();
    
    logString += "\n\spExistsCount === " + spExistsCount;


    logString = logBeginString + logString + logEndString;


    return logString;
}//END function doPreTrashThreeQueries()

export function uiCopyTextElementThis(elementId = ''){
    if(elementId.length === 0){
        local.setItem('lastErrorString', "Invalid 'elementId' for uiCopyTextElementThis() function");
        return;
    }
    elementId = elementId.substr(0,1) === '#' ? elementId : '#' + elementId;
    wixWindow.copyToClipboard($w(elementId).value)
    .then( () => {
        // handle case where text was copied
    } )
    .catch( (err) => {
        // handle case where an error occurred
    } );
}
// ! ====================================================================================================
// ! ====================                      </PRETRASH DB TESTING>                      ==============
// ! ====================================================================================================


export async function btnPreTrashDo_click(event) {
	// pretrashFindFamilyIdTermId();
    await ppDatabasePrepJSON();
    $w('#preTrashLog').value = memory.getItem('ppDatabasePrepJSON');
}

export function btnPreTrashClear_click(event) {
		doClear('preTrashLog')
}

export function btnGetFamilyId_click(event) {
	$w('#txtFamilyId').value = local.getItem('familyId');
}


export async function btnPreTrashDoST_click(event) {
	// pretrashFindStByFamilyIdLegalFirst();
    await stDatabasePrepJSON();
    $w('#preTrashLog').value = memory.getItem('stDatabasePrepJSON');
}

export function btnGetTermID_click(event) {
   $w('#txtTermId').value = local.getItem('termId');
}

export function btnGetStudentId_click(event) {
   $w('#txStudentId').value = local.getItem('studentId');
}

export function btnGetStudentLegalFirst_click(event) {
   $w('#txStudentLegalFirst').value = local.getItem('stFirst');
}

export function btnPretrashGetStaffEyeD_click(event) {
    if($w('#txtStaffEyeD').value === $w('#txtFamilyId').value){
        $w('#txtStaffEyeD').value = 'INSTANTIATE';
    }else{
        $w('#txtStaffEyeD').value = $w('#txtFamilyId').value;
    }
}

export async function btnPreTrashActEval_click(event) {
	await pretrashActionEvaluationTest();
}

export function btnGetSecondaryFirstLast_click(event) {
	$w('#txtSecondaryFirst').value = local.getItem('spFirst');
	$w('#txtSecondaryLast').value = local.getItem('spLast');
}

export function btnPreTrashLogUI_click(event) {
	doPreTrashLogUI();
}

export async function btnPreTrashThreeQueries_click(event) {
	$w('#preTrashLog').value = await doPreTrashThreeQueries(); 
}

export function btnCopyPreTrashLog_click(event) {
	uiCopyTextElementThis('preTrashLog');
}

export function btnCopySessionEnrollmentJSON_click(event) {
	uiCopyTextElementThis('sessionEnrollmentJSON');
}

export function btnLocalLastError_click(event) {
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('ERROR');
}

export function btnLocalLogString_click(event) {
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('LOG');
}

export function btnAppendToPreTrashLog_click(event) {
	$w('#preTrashLog').value += '\n\n---\n\n'; 
	$w('#preTrashLog').value += $w('#sessionEnrollmentJSON').value; 
}

export function btnKludgeClearPpStSpIDs_click_1(event) {
    $w('#sessionEnrollmentJSON').value = 'DISABLED: Kludge-Clear has disabled.\n\nNo actiontake.\nPlease try again or ask for assistance.'
}

export function btnUIrefresh_click(event) {
	doUserInterfaceCleanupCurrent();
}

export async function doQueryContactById(idValueOrKey = 'NONE'){
    let altKeyString = $w('#radioContactFindBy').value;
    let kind = idValueOrKey.length < 30 ? 'KEY' : 'LITERAL';
    kind = idValueOrKey.indexOf('@') > 0 ? 'LITERAL' : kind;
    let key = 'PENDING KEY';
    let ppAliasArray = ['PP','PRIMARY','PRIMARYID','PRIMARYPARENT','PRIMARY PARENT','FAMILYID'];
    key =  ppAliasArray.includes(idValueOrKey.toLocaleUpperCase()) ? 'PRIMARY' : key;
    let stAliasArray = ['ST','STUDENT','STUDENTID'];
    key =  stAliasArray.includes(idValueOrKey.toLocaleUpperCase()) ? 'STUDENT' : key;
    let spAliasArray = ['SP','SECONDARY','SECONDARYID','SECONDARYPARENT','SECONDARY PARENT'];
    key =  spAliasArray.includes(idValueOrKey.toLocaleUpperCase()) ? 'SECONDARY' : key;

    let contactId = kind === 'LITERAL' ? idValueOrKey : 'NOIDYET';
    contactId = key === 'PRIMARY' ? local.getItem('familyId') : contactId;
    contactId = key === 'STUDENT' ? local.getItem('studentId') : contactId;
    contactId = key === 'SECONDARY' ? local.getItem('secondaryId') : contactId;

    let isValidId = contactId.length > 30 ? true : false;//minimal, but...//also replaced when original edited to isValidEmail

    let contactEmail = kind === 'LITERAL' ? idValueOrKey : 'NOEMAILYET';
    contactEmail = key === 'PRIMARY' ? local.getItem('familyEmail') : contactEmail;
    contactEmail = key === 'STUDENT' ? local.getItem('studentEmail') : contactEmail;
    contactEmail = key === 'SECONDARY' ? local.getItem('secondaryEmail') : contactEmail;
    contactEmail = contactEmail.toLowerCase();//cowCatcher, delete after 20210709 if desired

    let isValidEmail = contactEmail.indexOf('@') > 0 ? true : false;//minimal, but...

    let logString = `PRETTY STRING about to execute:`;
    logString += '\n' + `Including: memory.getItem('activeModifierKeys'): ` + memory.getItem('activeModifierKeys');
    logString += '\n' + `For: '${altKeyString}'`;
    logString += '\n' + `steamdaGetContactFunction('${idValueOrKey}')`;
    if (altKeyString === 'ID') {
        logString += '\n' + `RESOLVED AS steamdaGetContactFunction('${key}')`;
        logString += '\n' + `RESOLVED AS steamdaGetContactFunction('${contactId}')`;
    }

    if (altKeyString === 'EMAIL') {
        logString += '\n' + `RESOLVED AS steamdaGetContactFunction('${contactEmail}')`;
        // logString += '\n' + `RESOLVED AS steamdaGetContactFunction('${contactId}')`;
    }

    if (altKeyString === 'ID' && !isValidId) {
        logString +=  '\n\n<---------- <Invalid ID Parameter> ---------->\n\n';       
        logString +=  'Query Aborted';       
        logString +=  local.getItem('kAppendString'); 
        local.setItem('logString',logString); 
        $w('#sessionEnrollmentJSON').value = logString;
        return;    
    }

    if (altKeyString === 'EMAIL' && !isValidEmail) {
        logString +=  '\n\n<---------- <Invalid EMAIL Parameter> ---------->\n\n';       
        logString +=  'Query Aborted';       
        logString +=  local.getItem('kAppendString');       
        local.setItem('logString',logString);     
        $w('#sessionEnrollmentJSON').value = logString;
        return;    
    }


    if (altKeyString === 'ID') {

        let contact = await steamdaGetContactFunction(contactId);
        logString += '\n\n<---------- <queryResponse> ---------->\n\n';
        logString += JSON.stringify(contact,undefined,4);
        local.setItem('logString',logString);     
        $w('#sessionEnrollmentJSON').value = logString;
        return;
    }

    if (altKeyString === 'EMAIL') {

        let contact = await getContactByEmail(contactEmail);
        logString += '\n\n<---------- <queryResponse> ---------->\n\n';
        logString += `the Query of Contacts for \nPrimary Email: '${contactEmail}' \nReturned:\n`;
        logString += `BEGIN queryResults:\n`;
        logString += JSON.stringify(contact,undefined,4);
        logString += `\nEND queryResults`;
        local.setItem('logString',logString);     
        $w('#sessionEnrollmentJSON').value = logString;

        return;
    }

    logString +=  '\n\n<---------- <Force Abort for Testing> ---------->\n\n';       
    $w('#sessionEnrollmentJSON').value = logString;
    return;
}

export function btnPPGetContact_click(event) {
    let paramIdOrKey = 'Marais'
    let ppAliasArray = ['PP','PRIMARYID','PRIMARYPARENT','PRIMARY PARENT','FAMILYID'];//'PRIMARY',
    paramIdOrKey = ppAliasArray[Math.floor(Math.random() * ppAliasArray.length)]
	doQueryContactById(paramIdOrKey); 
}

export function btnSTGetContact_click(event) {
    let paramIdOrKey = 'Marais'
    let stAliasArray = ['ST','STUDENTID'];//'STUDENT',
    paramIdOrKey = stAliasArray[Math.floor(Math.random() * stAliasArray.length)]
	doQueryContactById(paramIdOrKey); 
}

export function btnSPGetContact_click(event) {
    let paramIdOrKey = $w('#txtGetContactLiteral').value;
    paramIdOrKey = paramIdOrKey.trim();
	doQueryContactById(paramIdOrKey); 
}
export function btnLITGetContact_click(event) {
    let paramIdOrKey = $w('#txtGetContactLiteral').value;
    paramIdOrKey = paramIdOrKey.trim();
	doQueryContactById(paramIdOrKey); 
    $w('#txtGetContactLiteral').value = '';
}

export function btnGetContactByParam_click(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}
export function btnStepAppend_click(event) {
    $w('#preTrashLog').value += '\n\n---\n\n'; 
	$w('#preTrashLog').value += $w('#sessionEnrollmentJSON').value; 
}

export function btnStepLogAll_click(event) {
	// $w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('ALL');
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('CODE');
}

export function btnStepCopy_click(event) {
	uiCopyTextElementThis('sessionEnrollmentJSON');
}

export async function btnExtraContactPrimary_click(event) {
    let diagnosticOnlyThis = true;
    if($w('#radioAreYouSure').value === 'YES'){
        diagnosticOnlyThis = false;
    }
	await getContactByEmailAndNotIdFunction(local.getItem('familyEmail'),local.getItem('familyId'),diagnosticOnlyThis);
	$w('#sessionEnrollmentJSON').value = local.getItem('logString');
    $w('#radioAreYouSure').value = 'NO';
}

export async function btnExtraContactStudent_click(event) {
    let diagnosticOnlyThis = true;
    if($w('#radioAreYouSure').value === 'YES'){
        diagnosticOnlyThis = false;
    }
	await getContactByEmailAndNotIdFunction(local.getItem('studentEmail'),local.getItem('studentId'),diagnosticOnlyThis);
	$w('#sessionEnrollmentJSON').value = local.getItem('logString');
    $w('#radioAreYouSure').value = 'NO';
}

export function btnDemoIfElseThen_click(event) {
    let beforeString = `entering 'btnDemoIfElseThen_click'\n`;
    beforeString += '\n' + "local.getItem('superEnrollmentStatus'): " + local.getItem('superEnrollmentStatus');
    beforeString += '\n' + "[At Line: ~670]: WAS superEnrollmentStatus to SKIP if Any, that was removed 7/15/2021";
    beforeString += '\n' + "memory.getItem('ppAction'): " + memory.getItem('ppAction');
    beforeString += '\n' + "memory.getItem('stAction'): " + memory.getItem('stAction');
    beforeString += '\n' + "memory.getItem('spAction'): " + memory.getItem('spAction');
    beforeString += '\n\n==========\n';

	$w('#preTrashLog').value = beforeString;
    let demoResponse = demoLoop_doIfElseThen(); 
    let demoResponseToString = '[';
    demoResponse.forEach(responseRow => {
        demoResponseToString += '\n[' + responseRow.toString() + ']';
    })
    demoResponseToString += '\n]\n==========\n';
    let afterString = `\nexiting 'btnDemoIfElseThen_click'`;
    demoResponseToString = beforeString + demoResponseToString + afterString;
    demoResponseToString += doEnrollmentLogCurrent('CODE');
    demoResponseToString += afterString;

	$w('#preTrashLog').value = demoResponseToString;
}

// ! =========================================================================================================================
// ! ==================================          <SEVENT-SUPER-STEPS with MultiStateBox>          ============================
// ! ==================================                     FIND pstEnrSevenCore202107                    ============================
// ! =========================================================================================================================

// ø <---------- <mxboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->
// ø <----------         <'mxbox' typo of 'msbox' (multi-state-box)>        ---------->
// ø <----------                 <refactor or live with it>                 ---------->

// ø <---------- <mxboxPostEnrollmentSevenActionScripts>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT-ALL

// ø <---------- <mxboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionOnReady(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    // local.getItem('timezoneOffset')
    // local.getItem('tzAbbrv')
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    responseObject.messageKey = 'primary';
    memory.setItem('msboxLastState','stateZero')
    // let messageKeyArray= ["success","warning","danger","info","devel"];
    // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    mxboxPostEnrollmentSevenAnyAction(responseObject);
}
// ø <---------- </mxboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]> ---------->
// ø <---------- <mxboxPostEnrollmentSevenActionNext - NEXT_STATE>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionNext(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    responseObject.messageKey = 'primary';
    responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    responseObject.messageResponse = false;
    // let messageKeyArray= ["success","warning","danger","info","devel"];
    // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    mxboxPostEnrollmentSevenAnyAction(responseObject);
    
}
// ø <---------- </mxboxPostEnrollmentSevenActionNext - NEXT_STATE> ---------->

// ø <---------- <mxboxPostEnrollmentSevenActionPerform - PERFORM_STATE_SCRIPTS>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionPerform(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'CURRENT';
    let messageKeyArray= ["success","success","warning","danger"];
    responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    responseObject.messageResponse = true;
    mxboxPostEnrollmentSevenAnyAction(responseObject);
}
// ø <---------- </mxboxPostEnrollmentSevenActionPerform - PERFORM_STATE_SCRIPTS> ---------->

// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT-ALL_END
// ø <---------- </mxboxPostEnrollmentSevenActionScripts> ---------->

// ø <---------- <mxboxPostEnrollmentSevenAnyAction>  ---------->
// ø FIND pstEnrSevenCore202107 ANY-ACTION
export async function mxboxPostEnrollmentSevenAnyAction(responseObject = {}){
    console.log('[fnc]mxboxPostEnrollmentSevenAnyAction');
    memory.setItem('msboxCurrentId','#mxboxPostEnrollmentSeven');
    responseObject.stamp = await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv'));
    responseObject.logArrayDeveloper.push('≈ 3678 ≈');
    responseObject.logArrayDeveloper.push(responseObject.stamp);
    responseObject.logArrayDeveloper.push('entering {% mxboxPostEnrollmentSevenAnyAction %}');

    let DOX = 'JUST FOR VISIBLE DOX IN WIX'


    // $w('#spDatabaseResponseJSON').value = JSON.stringify(responseObject,undefined,4);

    // responseObject.button = 'NEXT';
    // responseObject.messageKey = 'primary';

    // ! <Pre-Trash> - even testing should come from the calling script/button
    // let messageKey = 'primary';
    // let messageKeyArray= ["success","warning","danger","info","devel"];
    // messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    // ! </Pre-Trash>
    // ø <ELSE>
    DOX = '<YES_ANY_ACTION>'
    let messageKey = responseObject.messageKey;
    if(responseObject.button !== 'CURRENT' && responseObject.button !== 'NEXT'){
        // try it purposefully
        return;
    }
    // ø </ELSE>
// ø FIND pstEnrSevenCore202107 YES_ANY_ACTION if it's HERE it belongs in Any Action
    DOX = '</YES_ANY_ACTION>'

    // ø <Pre-Trash but innocuous>
    let peSevenStateCurrent = {};
    let peSevenStateCurrentId = ''; // "state1"
    let panelNotesKey = 'PPENDING';
    // ø </Pre-Trash but innocuous>
    if(responseObject.button === 'CURRENT'){
        DOX = '<MAYBE_CURRENT_ACTION>'
    // ø FIND pstEnrSevenCore202107 MAYBE_CURRENT_ACTION if it's BELOW it belongs in NEXT subScript
        responseObject.logArrayDeveloper.push('≈ 3702 ≈');
        responseObject.logArrayDeveloper.push('<'+responseObject.button + ' === PPENDING>');
        panelNotesKey = 'panelAfterStepNotes';
        // ! <from PERFORM CURRENT STEP>
        $w('#btnPeSevenNext').show();
        $w('#btnPeSevenCurrent').hide();
        // let id = 'abc';
        peSevenStateCurrent = $w("#mxboxPostEnrollmentSeven").currentState;
        peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
        if (peSevenStateCurrentId === 'stateOfframp') {
            wixLocation.to("/blank-3");
            return;
        }
        responseObject.logArrayDeveloper.push('</'+responseObject.button + ' === PPENDING>');
        // ! </from PERFORM CURRENT STEP>
        DOX = '</MAYBE_CURRENT_ACTION>'
    }
    if(responseObject.button === 'NEXT'){
        DOX = '<MAYBE_NEXT_ACTION>'
    // ø FIND pstEnrSevenCore202107 MAYBE_NEXT_ACTION if it's BELOW it belongs in NEXT subScript
        responseObject.logArrayDeveloper.push('≈ 3719 ≈');
        responseObject.logArrayDeveloper.push('<'+responseObject.button + ' === NEXT>');
        panelNotesKey = 'panelBeforeStepNotes';
        // ! <from GO TO NEXT>
        responseObject.logArrayDeveloper.push('<preTrash Logs>');
        responseObject.logArrayDeveloper.push('≈ 3738 ≈');
        responseObject.logArrayDeveloper.push('{# about to call goToState(responseObject) #}');
        await goToState(responseObject);
        let lastLogDeveloper = responseObject.logArrayDeveloper[responseObject.logArrayDeveloper.length - 1];
        responseObject.logArrayDeveloper.push('∆ lastLogDeveloper: ' + lastLogDeveloper + ' ∆}');
        responseObject.logArrayDeveloper.push('</preTrash Logs>');
        $w('#btnPeSevenNext').hide();
        $w('#btnPeSevenCurrent').show();
        // ! </from GO TO NEXT>
        // $w('#txtPeSevenTitle').text = 'Abort after NEXT goToState()'
        // return;
        responseObject.logArrayDeveloper.push('≈ 3744 ≈');
        let peSevenStateCurrent = $w(memory.getItem('msboxCurrentId')).currentState;
        // peSevenStateCurrent = $w('#mxboxPostEnrollmentSeven').currentState;
        peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
        responseObject.logArrayDeveloper.push('{¿ '+peSevenStateCurrentId+' is valid by wixStorage ?}');
        // peSevenStateCurrentId = memory.getItem('msboxLastState');

        // ! OnRamp <Kludge>
        // ! shouldn't be _in_ OnReady, but these things are so necessary as suigeneris tasks
        // ! if (when?) it gets too involved, make an mxboxPostEnrollmentSevenOnReadyKLUDGE() function
        responseObject.logArrayDeveloper.push('≈ 3730 ≈');
        responseObject.logArrayDeveloper.push('{% onReadyKLUDGE %}}');

        let applicationObject = JSON.parse(local.getItem('ondeckEnrollmentJSON')) ;
        let staffEyeD = applicationObject.family.parent.primary.memberId;
        let secondaryExists = typeof applicationObject.family.parent.secondary === 'object' && typeof applicationObject.family.parent.secondary.first === 'string' && (applicationObject.family.parent.secondary.first).length > 0 ? true : false;
        responseObject.logArrayDeveloper.push(`secondaryExists: ${secondaryExists}`);
        let theseObjectKeys = Object.keys(applicationObject.family.parent);
        // if(theseObjectKeys.includes('secondary')){
        //     theseObjectKeys = Object.keys(applicationObject.family.parent.secondary);
        //         if(theseObjectKeys.includes('first') && (applicationObject.family.parent.secondary.first).length > 0){
        //             secondaryExists = true;
        //         }
        //     }
        // }
        if(!secondaryExists){
            //btnSecondaryIdLabel
            // $w('#btnSecondaryIdLabel').enable();
            $w('#btnSecondaryIdLabel').disable();

            //btnSecondaryId
        }
        if(staffEyeD === 'INSTANTIATE' || staffEyeD === 'IINSTANTIATE'){
            responseObject.logArrayDeveloper.push('staffEyeD is IINSTANTIATE: hide-button');
            $w('#btnStaffEyeD').hide();
            $w('#btnStaffEyeDLabel').hide();
        }else{
            responseObject.logArrayDeveloper.push('staffEyeD is not IINSTANTIATE: enable-button');
            local.setItem('staffIdentifiedFamilyId',staffEyeD);
            $w("#btnStaffEyeD").label = local.getItem('staffIdentifiedFamilyId');
            $w('#btnStaffEyeD').enable();
            $w('#btnStaffEyeDLabel').enable();
        }
        // ! OnRamp </Kludge>
        let statesArray = $w("#mxboxPostEnrollmentSeven").states.map(state => state.id);
        let nextIndex = statesArray.indexOf(peSevenStateCurrentId) + 1;
        peSevenStateCurrentId = statesArray[nextIndex];
        memory.setItem('msboxLastState',peSevenStateCurrentId);
        // ! OK </Kludge Next State>
        responseObject.logArrayDeveloper.push('</'+responseObject.button + ' === NEXT>');
        DOX = '</MAYBE_NEXT_ACTION>'
    }
    //parameters will mostly be wixStorage, but responseObject can be something
    // ø <original from $w("#mxboxPostEnrollmentSeven").onChange>
    // let peSeventJSON = `{"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"JSON WORKING! Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"firstStep":"ZERO","lastStep":"ZERO","allStepArray":["ZERO"],"notes":[]}},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE","allStepArray":["IINSTANTIATE"],"notes":["Reset Steps need to be manually applied (or does it?)"]}},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[]}},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact","allStepArray":["dedupePpStContact"],"notes":[]}},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[]}},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[]}},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[]}},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"firstStep":"CCOMPLETE","lastStep":"CCOMPLETE","allStepArray":["CCOMPLETE"],"notes":["ouside of Loop-Switch execute 'Resolve WebHook'","ouside of Loop-Switch execute 'Destroy' wixStorage"]}},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp"}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for 'stateOnramp'","devel":"The devel message for 'stateOnramp'","danger":"The danger message for 'stateOnramp'","warning":"The warning message for 'stateOnramp'","success":"The success message for 'stateOnramp'","info":"The info message for 'stateOnramp'"},"stateInstantiate":{"primary":"The primary message for 'stateInstantiate'","devel":"The devel message for 'stateInstantiate'","danger":"The danger message for 'stateInstantiate'","warning":"The warning message for 'stateInstantiate'","success":"The success message for 'stateInstantiate'","info":"The info message for 'stateInstantiate'"},"stateMemberConfirm":{"primary":"The primary message for 'stateMemberConfirm'","devel":"The devel message for 'stateMemberConfirm'","danger":"The danger message for 'stateMemberConfirm'","warning":"The warning message for 'stateMemberConfirm'","success":"The success message for 'stateMemberConfirm'","info":"The info message for 'stateMemberConfirm'"},"stateDupeDelete":{"primary":"The primary message for 'stateDupeDelete'","devel":"The devel message for 'stateDupeDelete'","danger":"The danger message for 'stateDupeDelete'","warning":"The warning message for 'stateDupeDelete'","success":"The success message for 'stateDupeDelete'","info":"The info message for 'stateDupeDelete'"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for 'stateDatabaseForPrimaryAndStudent'","devel":"The devel message for 'stateDatabaseForPrimaryAndStudent'","danger":"The danger message for 'stateDatabaseForPrimaryAndStudent'","warning":"The warning message for 'stateDatabaseForPrimaryAndStudent'","success":"The success message for 'stateDatabaseForPrimaryAndStudent'","info":"The info message for 'stateDatabaseForPrimaryAndStudent'"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for 'stateContactForPrimaryAndStudent'","devel":"The devel message for 'stateContactForPrimaryAndStudent'","danger":"The danger message for 'stateContactForPrimaryAndStudent'","warning":"The warning message for 'stateContactForPrimaryAndStudent'","success":"The success message for 'stateContactForPrimaryAndStudent'","info":"The info message for 'stateContactForPrimaryAndStudent'"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for 'stateContactAndDatabaseForSecondary'","devel":"The devel message for 'stateContactAndDatabaseForSecondary'","danger":"The danger message for 'stateContactAndDatabaseForSecondary'","warning":"The warning message for 'stateContactAndDatabaseForSecondary'","success":"The success message for 'stateContactAndDatabaseForSecondary'","info":"The info message for 'stateContactAndDatabaseForSecondary'"},"stateResolveAndDestroy":{"primary":"The primary message for 'stateResolveAndDestroy'","devel":"The devel message for 'stateResolveAndDestroy'","danger":"The danger message for 'stateResolveAndDestroy'","warning":"The warning message for 'stateResolveAndDestroy'","success":"The success message for 'stateResolveAndDestroy'","info":"The info message for 'stateResolveAndDestroy'"},"stateOfframp":{"primary":"The primary message for 'stateOfframp'","devel":"The devel message for 'stateOfframp'","danger":"The danger message for 'stateOfframp'","warning":"The warning message for 'stateOfframp'","success":"The success message for 'stateOfframp'","info":"The info message for 'stateOfframp'"}}}`;
    // let peSeventJSON = /*[20210721102400•]*/ `{"errorStringArray":[],"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"confirmState":"stateOnramp","allStepArray":["ZERO"],"notes":["taken care of by onReady()"],"firstStep":"ZERO","lastStep":"ZERO"},"wixStorageArray":["kind.key"]},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"confirmState":"stateInstantiate","allStepArray":["IINSTANTIATE"],"notes":[],"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE"},"wixStorageArray":["kind.key"]},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"confirmState":"stateMemberConfirm","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[],"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember"},"wixStorageArray":["kind.key"]},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"confirmState":"stateDupeDelete","allStepArray":["dedupePpStContact"],"notes":[],"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact"},"wixStorageArray":["kind.key"]},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"confirmState":"stateDatabaseForPrimaryAndStudent","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[],"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"confirmState":"stateContactForPrimaryAndStudent","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[],"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"confirmState":"stateContactAndDatabaseForSecondary","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[],"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase"},"wixStorageArray":["kind.key"]},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"confirmState":"stateResolveAndDestroy","allStepArray":["EEMPTY"],"notes":["ouside of Loop-Switch execute ¿Resolve WebHook?","ouside of Loop-Switch execute ¿Destroy? wixStorage"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp","origSteps":{"confirmState":"stateOfframp","allStepArray":["EEMPTY"],"notes":["return to ¿Process Web Hooks?"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for stateOnramp","devel":"The devel message for stateOnramp","danger":"The danger message for stateOnramp","warning":"The warning message for stateOnramp","success":"The success message for stateOnramp","info":"The info message for stateOnramp"},"stateInstantiate":{"primary":"The primary message for stateInstantiate","devel":"The devel message for stateInstantiate","danger":"The danger message for stateInstantiate","warning":"The warning message for stateInstantiate","success":"The success message for stateInstantiate","info":"The info message for stateInstantiate"},"stateMemberConfirm":{"primary":"The primary message for stateMemberConfirm","devel":"The devel message for stateMemberConfirm","danger":"The danger message for stateMemberConfirm","warning":"The warning message for stateMemberConfirm","success":"The success message for stateMemberConfirm","info":"The info message for stateMemberConfirm"},"stateDupeDelete":{"primary":"The primary message for stateDupeDelete","devel":"The devel message for stateDupeDelete","danger":"The danger message for stateDupeDelete","warning":"The warning message for stateDupeDelete","success":"The success message for stateDupeDelete","info":"The info message for stateDupeDelete"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for stateDatabaseForPrimaryAndStudent","devel":"The devel message for stateDatabaseForPrimaryAndStudent","danger":"The danger message for stateDatabaseForPrimaryAndStudent","warning":"The warning message for stateDatabaseForPrimaryAndStudent","success":"The success message for stateDatabaseForPrimaryAndStudent","info":"The info message for stateDatabaseForPrimaryAndStudent"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for stateContactForPrimaryAndStudent","devel":"The devel message for stateContactForPrimaryAndStudent","danger":"The danger message for stateContactForPrimaryAndStudent","warning":"The warning message for stateContactForPrimaryAndStudent","success":"The success message for stateContactForPrimaryAndStudent","info":"The info message for stateContactForPrimaryAndStudent"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for stateContactAndDatabaseForSecondary","devel":"The devel message for stateContactAndDatabaseForSecondary","danger":"The danger message for stateContactAndDatabaseForSecondary","warning":"The warning message for stateContactAndDatabaseForSecondary","success":"The success message for stateContactAndDatabaseForSecondary","info":"The info message for stateContactAndDatabaseForSecondary"},"stateResolveAndDestroy":{"primary":"The primary message for stateResolveAndDestroy","devel":"The devel message for stateResolveAndDestroy","danger":"The danger message for stateResolveAndDestroy","warning":"The warning message for stateResolveAndDestroy","success":"The success message for stateResolveAndDestroy","info":"The info message for stateResolveAndDestroy"},"stateOfframp":{"primary":"The primary message for stateOfframp","devel":"The devel message for stateOfframp","danger":"The danger message for stateOfframp","warning":"The warning message for stateOfframp","success":"The success message for stateOfframp","info":"The info message for stateOfframp"}}}`;
    // let peSeventJSON = /*[20210721111100•]*/ `{"errorStringArray":[],"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"confirmState":"stateOnramp","allStepArray":["ZERO"],"notes":["taken care of by onReady()"],"firstStep":"ZERO","lastStep":"ZERO"},"wixStorageArray":["kind.key"]},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"confirmState":"stateInstantiate","allStepArray":["IINSTANTIATE"],"notes":["may need to manually confirm Staff-Eye-D Member if automatic is not conclusive"],"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE"},"wixStorageArray":["kind.key"]},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"confirmState":"stateMemberConfirm","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[],"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember"},"wixStorageArray":["kind.key"]},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"confirmState":"stateDupeDelete","allStepArray":["dedupePpStContact"],"notes":[],"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact"},"wixStorageArray":["kind.key"]},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"confirmState":"stateDatabaseForPrimaryAndStudent","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[],"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"confirmState":"stateContactForPrimaryAndStudent","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[],"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"confirmState":"stateContactAndDatabaseForSecondary","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[],"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase"},"wixStorageArray":["kind.key"]},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"confirmState":"stateResolveAndDestroy","allStepArray":["EEMPTY"],"notes":["ouside of Loop-Switch execute ¿Resolve WebHook?","ouside of Loop-Switch execute ¿Destroy? wixStorage"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp","origSteps":{"confirmState":"stateOfframp","allStepArray":["EEMPTY"],"notes":["return to ¿Process Web Hooks?"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for stateOnramp","devel":"The devel message for stateOnramp","danger":"The danger message for stateOnramp","warning":"The warning message for stateOnramp","success":"The success message for stateOnramp","info":"The info message for stateOnramp"},"stateInstantiate":{"primary":"The primary message for stateInstantiate","devel":"The devel message for stateInstantiate","danger":"The danger message for stateInstantiate","warning":"The warning message for stateInstantiate","success":"The success message for stateInstantiate","info":"The info message for stateInstantiate"},"stateMemberConfirm":{"primary":"The primary message for stateMemberConfirm","devel":"The devel message for stateMemberConfirm","danger":"The danger message for stateMemberConfirm","warning":"The warning message for stateMemberConfirm","success":"The success message for stateMemberConfirm","info":"The info message for stateMemberConfirm"},"stateDupeDelete":{"primary":"The primary message for stateDupeDelete","devel":"The devel message for stateDupeDelete","danger":"The danger message for stateDupeDelete","warning":"The warning message for stateDupeDelete","success":"The success message for stateDupeDelete","info":"The info message for stateDupeDelete"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for stateDatabaseForPrimaryAndStudent","devel":"The devel message for stateDatabaseForPrimaryAndStudent","danger":"The danger message for stateDatabaseForPrimaryAndStudent","warning":"The warning message for stateDatabaseForPrimaryAndStudent","success":"The success message for stateDatabaseForPrimaryAndStudent","info":"The info message for stateDatabaseForPrimaryAndStudent"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for stateContactForPrimaryAndStudent","devel":"The devel message for stateContactForPrimaryAndStudent","danger":"The danger message for stateContactForPrimaryAndStudent","warning":"The warning message for stateContactForPrimaryAndStudent","success":"The success message for stateContactForPrimaryAndStudent","info":"The info message for stateContactForPrimaryAndStudent"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for stateContactAndDatabaseForSecondary","devel":"The devel message for stateContactAndDatabaseForSecondary","danger":"The danger message for stateContactAndDatabaseForSecondary","warning":"The warning message for stateContactAndDatabaseForSecondary","success":"The success message for stateContactAndDatabaseForSecondary","info":"The info message for stateContactAndDatabaseForSecondary"},"stateResolveAndDestroy":{"primary":"The primary message for stateResolveAndDestroy","devel":"The devel message for stateResolveAndDestroy","danger":"The danger message for stateResolveAndDestroy","warning":"The warning message for stateResolveAndDestroy","success":"The success message for stateResolveAndDestroy","info":"The info message for stateResolveAndDestroy"},"stateOfframp":{"primary":"The primary message for stateOfframp","devel":"The devel message for stateOfframp","danger":"The danger message for stateOfframp","warning":"The warning message for stateOfframp","success":"The success message for stateOfframp","info":"The info message for stateOfframp"}}}`;
    // let peSeventJSON = /*[20210721114500ø]*/ `{"errorStringArray":[],"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"confirmState":"stateOnramp","allStepArray":["VALIDATE_staffEyeD"],"notes":["otherise taken care of by onReady()"],"firstStep":"VALIDATE_staffEyeD","lastStep":"VALIDATE_staffEyeD"},"wixStorageArray":["kind.key"]},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"confirmState":"stateInstantiate","allStepArray":["IINSTANTIATE"],"notes":["may need to manually confirm Staff-Eye-D Member if automatic is not conclusive"],"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE"},"wixStorageArray":["kind.key"]},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"confirmState":"stateMemberConfirm","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[],"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember"},"wixStorageArray":["kind.key"]},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"confirmState":"stateDupeDelete","allStepArray":["dedupePpStContact"],"notes":[],"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact"},"wixStorageArray":["kind.key"]},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"confirmState":"stateDatabaseForPrimaryAndStudent","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[],"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"confirmState":"stateContactForPrimaryAndStudent","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[],"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"confirmState":"stateContactAndDatabaseForSecondary","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[],"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase"},"wixStorageArray":["kind.key"]},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"confirmState":"stateResolveAndDestroy","allStepArray":["EEMPTY"],"notes":["ouside of Loop-Switch execute ¿Resolve WebHook?","ouside of Loop-Switch execute ¿Destroy? wixStorage"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp","origSteps":{"confirmState":"stateOfframp","allStepArray":["EEMPTY"],"notes":["return to ¿Process Web Hooks?"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for stateOnramp","devel":"The devel message for stateOnramp","danger":"The danger message for stateOnramp","warning":"The warning message for stateOnramp","success":"The success message for stateOnramp","info":"The info message for stateOnramp"},"stateInstantiate":{"primary":"The primary message for stateInstantiate","devel":"The devel message for stateInstantiate","danger":"The danger message for stateInstantiate","warning":"The warning message for stateInstantiate","success":"The success message for stateInstantiate","info":"The info message for stateInstantiate"},"stateMemberConfirm":{"primary":"The primary message for stateMemberConfirm","devel":"The devel message for stateMemberConfirm","danger":"The danger message for stateMemberConfirm","warning":"The warning message for stateMemberConfirm","success":"The success message for stateMemberConfirm","info":"The info message for stateMemberConfirm"},"stateDupeDelete":{"primary":"The primary message for stateDupeDelete","devel":"The devel message for stateDupeDelete","danger":"The danger message for stateDupeDelete","warning":"The warning message for stateDupeDelete","success":"The success message for stateDupeDelete","info":"The info message for stateDupeDelete"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for stateDatabaseForPrimaryAndStudent","devel":"The devel message for stateDatabaseForPrimaryAndStudent","danger":"The danger message for stateDatabaseForPrimaryAndStudent","warning":"The warning message for stateDatabaseForPrimaryAndStudent","success":"The success message for stateDatabaseForPrimaryAndStudent","info":"The info message for stateDatabaseForPrimaryAndStudent"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for stateContactForPrimaryAndStudent","devel":"The devel message for stateContactForPrimaryAndStudent","danger":"The danger message for stateContactForPrimaryAndStudent","warning":"The warning message for stateContactForPrimaryAndStudent","success":"The success message for stateContactForPrimaryAndStudent","info":"The info message for stateContactForPrimaryAndStudent"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for stateContactAndDatabaseForSecondary","devel":"The devel message for stateContactAndDatabaseForSecondary","danger":"The danger message for stateContactAndDatabaseForSecondary","warning":"The warning message for stateContactAndDatabaseForSecondary","success":"The success message for stateContactAndDatabaseForSecondary","info":"The info message for stateContactAndDatabaseForSecondary"},"stateResolveAndDestroy":{"primary":"The primary message for stateResolveAndDestroy","devel":"The devel message for stateResolveAndDestroy","danger":"The danger message for stateResolveAndDestroy","warning":"The warning message for stateResolveAndDestroy","success":"The success message for stateResolveAndDestroy","info":"The info message for stateResolveAndDestroy"},"stateOfframp":{"primary":"The primary message for stateOfframp","devel":"The devel message for stateOfframp","danger":"The danger message for stateOfframp","warning":"The warning message for stateOfframp","success":"The success message for stateOfframp","info":"The info message for stateOfframp"}}}`;
    let peSeventJSON = /*[20210721131500◊]*/ `{"errorStringArray":[],"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"confirmState":"stateOnramp","allStepArray":["VALIDATE_staffEyeD"],"notes":["otherise taken care of by onReady()"],"panelBeforeStepNotes":["Tell them what you are going to do","including about Staff-Eye-D"],"panelAfterStepNotes":["Tell them you did it","messaging about Staff-Eye-D results"],"firstStep":"VALIDATE_staffEyeD","lastStep":"VALIDATE_staffEyeD"},"wixStorageArray":["kind.key"]},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"confirmState":"stateInstantiate","allStepArray":["IINSTANTIATE"],"notes":["may need to manually confirm Staff-Eye-D Member if automatic is not conclusive"],"panelBeforeStepNotes":["Tell them what you are going to do","IFF Staff-Eye-D Confirmation Input"],"panelAfterStepNotes":["Tell them you did it","superEnrollmentStatus","ppAction","stAction","spAction"],"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE"},"wixStorageArray":["kind.key"]},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"confirmState":"stateMemberConfirm","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember"},"wixStorageArray":["kind.key"]},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"confirmState":"stateDupeDelete","allStepArray":["dedupePpStContact"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact"},"wixStorageArray":["kind.key"]},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"confirmState":"stateDatabaseForPrimaryAndStudent","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"confirmState":"stateContactForPrimaryAndStudent","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"confirmState":"stateContactAndDatabaseForSecondary","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase"},"wixStorageArray":["kind.key"]},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"confirmState":"stateResolveAndDestroy","allStepArray":["EEMPTY"],"notes":["ouside of Loop-Switch execute ¿Resolve WebHook?","ouside of Loop-Switch execute ¿Destroy? wixStorage"],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp","origSteps":{"confirmState":"stateOfframp","allStepArray":["EEMPTY"],"notes":["return to ¿Process Web Hooks?"],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for stateOnramp","devel":"The devel message for stateOnramp","danger":"The danger message for stateOnramp","warning":"The warning message for stateOnramp","success":"The success message for stateOnramp","info":"The info message for stateOnramp"},"stateInstantiate":{"primary":"The primary message for stateInstantiate","devel":"The devel message for stateInstantiate","danger":"The danger message for stateInstantiate","warning":"The warning message for stateInstantiate","success":"The success message for stateInstantiate","info":"The info message for stateInstantiate"},"stateMemberConfirm":{"primary":"The primary message for stateMemberConfirm","devel":"The devel message for stateMemberConfirm","danger":"The danger message for stateMemberConfirm","warning":"The warning message for stateMemberConfirm","success":"The success message for stateMemberConfirm","info":"The info message for stateMemberConfirm"},"stateDupeDelete":{"primary":"The primary message for stateDupeDelete","devel":"The devel message for stateDupeDelete","danger":"The danger message for stateDupeDelete","warning":"The warning message for stateDupeDelete","success":"The success message for stateDupeDelete","info":"The info message for stateDupeDelete"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for stateDatabaseForPrimaryAndStudent","devel":"The devel message for stateDatabaseForPrimaryAndStudent","danger":"The danger message for stateDatabaseForPrimaryAndStudent","warning":"The warning message for stateDatabaseForPrimaryAndStudent","success":"The success message for stateDatabaseForPrimaryAndStudent","info":"The info message for stateDatabaseForPrimaryAndStudent"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for stateContactForPrimaryAndStudent","devel":"The devel message for stateContactForPrimaryAndStudent","danger":"The danger message for stateContactForPrimaryAndStudent","warning":"The warning message for stateContactForPrimaryAndStudent","success":"The success message for stateContactForPrimaryAndStudent","info":"The info message for stateContactForPrimaryAndStudent"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for stateContactAndDatabaseForSecondary","devel":"The devel message for stateContactAndDatabaseForSecondary","danger":"The danger message for stateContactAndDatabaseForSecondary","warning":"The warning message for stateContactAndDatabaseForSecondary","success":"The success message for stateContactAndDatabaseForSecondary","info":"The info message for stateContactAndDatabaseForSecondary"},"stateResolveAndDestroy":{"primary":"The primary message for stateResolveAndDestroy","devel":"The devel message for stateResolveAndDestroy","danger":"The danger message for stateResolveAndDestroy","warning":"The warning message for stateResolveAndDestroy","success":"The success message for stateResolveAndDestroy","info":"The info message for stateResolveAndDestroy"},"stateOfframp":{"primary":"The primary message for stateOfframp","devel":"The devel message for stateOfframp","danger":"The danger message for stateOfframp","warning":"The warning message for stateOfframp","success":"The success message for stateOfframp","info":"The info message for stateOfframp"}}}`;
    // PENDING /*[20210721HHII00◊]*/
    // ø FIND pstEnrSevenCore202107 JSON-PARSE
    let peSeventObject = JSON.parse(peSeventJSON);
    $w('#preTrashLog').value = JSON.stringify(peSeventObject,undefined,4);
    // ! <'event.' dependent>
    // let currentState = event.target.currentState.id; // "state2"
    // ! </'event.' dependent>
    // ø </original from $w("#mxboxPostEnrollmentSeven").onChange>

    // ø <moved to msBox-OnChange> 20210720
    // memory.setItem('msboxCurrentId','#mxboxPostEnrollmentSeven');
    // $w('#stMemberResponseJSON').value = memory.getItem('msboxCurrentId');

    // let peSevenStateCurrent = $w(memory.getItem('msboxCurrentId')).currentState;
    // let peSevenStateCurrent = $w('#mxboxPostEnrollmentSeven').currentState;
    // let peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
    // let peSevenStateCurrentId = memory.getItem('msboxLastState');
    // ø </moved to msBox-OnChange>
    // $w('#stContactResponseJSON').value = JSON.stringify(peSevenStateCurrent,undefined,4);
    $w('#ppMemberResponseJSON').value = responseObject.button + '\n' + peSevenStateCurrentId;
    // ø <original from $w("#mxboxPostEnrollmentSeven").onChange>
    // let currentStepObject = peSeventObject.stepObjects[currentState];
    let currentStepObject = peSeventObject.stepObjects[peSevenStateCurrentId];
    $w('#stContactResponseJSON').value = JSON.stringify(currentStepObject,undefined,4);
    let currentStepMessagingObject = peSeventObject.stepMessaging[peSevenStateCurrentId];
    $w('#spMemberResponseJSON').value = JSON.stringify(currentStepMessagingObject,undefined,4);
    let currentStepOrigStepsObject = currentStepObject.origSteps;
    $w('#stMemberResponseJSON').value = JSON.stringify(currentStepOrigStepsObject,undefined,4);
    let currentStepPanelNotes = currentStepObject.origSteps[panelNotesKey];
    let currentStepPanelNotesString = panelNotesKey.indexOf('Before') > 0 ? 'BEFORE' : panelNotesKey;
    currentStepPanelNotesString = panelNotesKey.indexOf('After') > 0 ? 'AFTER' : currentStepPanelNotesString;//else PPENDING
    currentStepPanelNotesString = 'Panel Notes:\n' + currentStepPanelNotesString + ' => \n' + peSevenStateCurrentId + '\n==========\n•';
    currentStepPanelNotesString += currentStepPanelNotes.toString();
    let cowCatherIndex = 0;
    while(cowCatherIndex < 25 && currentStepPanelNotesString.indexOf(',') > 0){
        currentStepPanelNotesString = currentStepPanelNotesString.replace(',','\n• ');
        cowCatherIndex++;
    }

    $w('#spContactResponseJSON').value = currentStepPanelNotesString;

    let originalStepsString = (currentStepOrigStepsObject.notes).toString();
    if(originalStepsString.trim().length > 0){
        originalStepsString = '<br>notes:<br>==========<br>• ' + originalStepsString;
    }
    originalStepsString = (currentStepOrigStepsObject.allStepArray).toString() + originalStepsString;
    originalStepsString = 'origSteps:<br>==========<br>• ' + originalStepsString;
    cowCatherIndex = 0;
    while(cowCatherIndex < 10 && originalStepsString.indexOf(',') > 0){
        originalStepsString = originalStepsString.replace(',','<br>• ');
        cowCatherIndex++;
    }
    let html = doBootstrapMessage('devel',originalStepsString,[[-1,18]]);
    $w('#txtOriginalStepsList').html = html;
    let isValidTitle = typeof currentStepObject === 'object' ? true : false;
    isValidTitle = isValidTitle && typeof currentStepObject.longString === 'string' ? true : isValidTitle;
    let title = !isValidTitle ? 'currentStepObject.longTitle is not a String' : currentStepObject.longTitle;
    // let title = longTitleJSON;
    title = title.substr(0,66);
    $w('#txtPeSevenTitle').text = title;
    // ø </original from $w("#mxboxPostEnrollmentSeven").onChange>
    
    responseObject.logArrayDeveloper.push('≈ 3847 ≈');
    responseObject.logArrayDeveloper.push(memory.getItem('msboxLastState') + ' === ' + peSevenStateCurrentId);
    let lastClicked = memory.getItem('msboxLastState') === peSevenStateCurrentId ? 'PERFORM_STEP' : 'NEXT_STATE';
    responseObject.logArrayDeveloper.push('∆ ' + lastClicked + ' ∆');
    // memory.setItem('msboxLastState',peSevenStateCurrentId);
    // let messageThis = 'Test of messageThis Parameter';
    
    messageKey = 'primary';
    let messageThis = currentStepMessagingObject[messageKey];
    html = doBootstrapMessage(messageKey,messageThis);
    $w('#txtBootstrapPrimary').html = html;
    // $w('#txtBootstrapPrimary').expand();

    if(responseObject.messageResponse === true){
        messageKey = responseObject.messageKey;
        let messageThis = currentStepMessagingObject[messageKey];
        let html = doBootstrapMessage(messageKey,messageThis);
        $w('#txtBootstrapResponse').html = html;
        $w('#txtBootstrapResponse').expand();
    }else{
        $w('#txtBootstrapResponse').collapse();
    }

    if(responseObject.messageRandomInfo === true){
        messageKey = 'info';
        // ø <backward compatible for Single 'info' message>
        if(responseObject.button === 'NEXT'){
            let isValidPreStepInfo = currentStepMessagingObject.preStepInfo == null ? false : true;
            isValidPreStepInfo = isValidPreStepInfo && typeof currentStepMessagingObject.preStepInfo === 'string' ? true : false;
            if( isValidPreStepInfo){
                messageKey = 'preStepInfo';
            }
        }
        if(responseObject.button === 'CURRENT'){
            let isValidPostStepInfo = currentStepMessagingObject.postStepInfo == null ? false : true;
            isValidPostStepInfo = isValidPostStepInfo && typeof currentStepMessagingObject.postStepInfo === 'string' ? true : false;
            if( isValidPostStepInfo){
                messageKey = 'postStepInfo';
            }
        }
        // ø </backward compatible for Single 'info' message>
        if(responseObject.button === 'CURRENT'){}
        // ø </backward compatible for Single 'info' message>

        // messageKey = responseObject.messageKey;
        messageThis = currentStepMessagingObject[messageKey];
        if(messageThis.length > 0){
            let html = doBootstrapMessage(messageKey,messageThis);
            $w('#txtBootstrapInfo').html = html;
            $w('#txtBootstrapInfo').expand();
        }else{
            $w('#txtBootstrapInfo').collapse();
        }
    }else{
        $w('#txtBootstrapInfo').collapse();
    }

    $w('#spDatabaseResponseJSON').value = JSON.stringify(responseObject,undefined,4);

    if(lastClicked === 'PERFORM_STEP'){
        responseObject.logArrayDeveloper.push('◊ lastClicked === PERFORM_STEP ◊');
        responseObject.currentStepOriginalStepsArray = currentStepOrigStepsObject.allStepArray;
        await mxboxPostEnrollmentSevenPerformStepDO(responseObject);
    }
    if(lastClicked === 'NEXT_STATE'){
        responseObject.logArrayDeveloper.push('◊ lastClicked === NEXT_STATE ◊');
        mxboxPostEnrollmentSevenNextStateDO(responseObject);
    }
}
// ø FIND pstEnrSevenCore202107 END-ANY-ACTION
// ø <---------- </mxboxPostEnrollmentSevenAnyAction> ---------->


// ø <---------- <mxboxPostEnrollmentSevenNextStateUI>  ---------->
// ø FIND pstEnrSevenCore202107 NEXT_STATE_UI
export async function mxboxPostEnrollmentSevenNextStateUI(responseObject = {}){
    // Display bootstrap-Primary 
let DOX = 'So I can read these comments in WiX-Editor';
DOX = 'OKAY: maybe redundant since NextState is kida all-about UI, but better separate _before_ it gets hairy than after';

    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenNextStateUI %}');
    // ø <Before DO-Script Called>
    // ø </Before DO-Script Called>
    mxboxPostEnrollmentSevenNextStateDO(responseObject);
    // ø <After DO-Script Called>
    $w('#ppDatabaseResponseJSON').value = JSON.stringify(responseObject.logArrayDeveloper,undefined,4);
    // ø </After DO-Script Called>
}
// ø FIND pstEnrSevenCore202107 NEXT_STATE_UI_END
// ø <---------- </mxboxPostEnrollmentSevenNextStateUI> ---------->

// ø <---------- <mxboxPostEnrollmentSevenPerformStepUI>  ---------->
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_UI
export async function mxboxPostEnrollmentSevenPerformStepUI(responseObject = {}){
    // Deal with Response
    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenPerformStepUI %}');
    // ø <Before DO-Script Called>
    // ø </Before DO-Script Called>
    // ø <After DO-Script Called>
    instantiateLoopSwitchEnrollmentSteps(responseObject.currentStepOriginalStepsArray);
    displaySteps();
    $w('#ppDatabaseResponseJSON').value = JSON.stringify(responseObject.logArrayDeveloper,undefined,4);
    // ø </After DO-Script Called>
}
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_UI_END
// ø <---------- </mxboxPostEnrollmentSevenPerformStepUI> ---------->


// ø <---------- <mxboxPostEnrollmentSevenNextStateDO>  ---------->
// ø FIND pstEnrSevenCore202107 NEXT_STATE_DO
export async function mxboxPostEnrollmentSevenNextStateDO(responseObject = {}){
    // Display bootstrap-Primary 
    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenNextStateDO %}');
    $w('#ppDatabaseResponseJSON').value = JSON.stringify(responseObject.logArrayDeveloper,undefined,4);
}
// ø FIND pstEnrSevenCore202107 NEXT_STATE_DO_END
// ø <---------- </mxboxPostEnrollmentSevenNextStateDO> ---------->

// ø <---------- <mxboxPostEnrollmentSevenPerformStepDO>  ---------->
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_DO
export async function mxboxPostEnrollmentSevenPerformStepDO(responseObject = {}){
    // Deal with Response
    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenPerformStepDO %}');
    instantiateLoopSwitchEnrollmentSteps(responseObject.currentStepOriginalStepsArray);
    displaySteps();
    $w('#ppDatabaseResponseJSON').value = JSON.stringify(responseObject.logArrayDeveloper,undefined,4);
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_DO_END
}
// ø <---------- </mxboxPostEnrollmentSevenPerformStepDO> ---------->

// ø <---------- </mxboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->

// "stateOnramp"
// "stateInstantiate"
// "stateMemberConfirm"
// "stateDupeDelete"
// "stateDatabaseForPrimaryAndStudent"
// "stateContactForPrimaryAndStudent"
// "stateContactAndDatabaseForSecondary"
// "stateResolveAndDestroy"
// "stateOfframp"

export function goToStateById(id){
	// id = id.substr(0,1) === '#' ? id : '#' + id;
	console.log('id: ' + id);
	$w("#mxboxPostEnrollmentSeven").changeState(id);
}

// ø <---------- <oToState>  ---------->
// ø FIND pstEnrSevenUtility202107
export async function goToState(responseObject, direction = 'NEXT'){
    responseObject.logArrayDeveloper.push('{% goToState(responseObject, direction = NEXT) %}');
    direction = direction.toUpperCase();
    let supportedAliasesForPREV = ['PREVIOUS','PREV'];
    direction = supportedAliasesForPREV.indexOf(direction) >= 0 ? 'PREV' : 'NEXT';
    //PREV is NOT SUPPORTED AT THIS TIME
    // ø <NEXT or PREVIOUS>
    let TTHIS = 'holder';
    let peSevenStates = $w("#mxboxPostEnrollmentSeven").states;
    // $w('#preTrashLog').value = JSON.stringify(peSevenStates,undefined,4);
    // $w('#preTrashLog').value += `\n\n<==========>\n\n`;
    let peSevenStatesIdArray = peSevenStates.map(a => a.id);
    $w('#stDatabaseResponseJSON').value = peSevenStatesIdArray.toString();
    let peSevenStateCurrent = $w("#mxboxPostEnrollmentSeven").currentState;
    let peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
    console.log('peSevenStates : ');
    console.log(peSevenStates);
    console.log('peSevenStatesIdArray : ');
    console.log(peSevenStatesIdArray);
    console.log('peSevenStateCurrent :' + peSevenStateCurrent);
    console.log('peSevenStateCurrentId :' + peSevenStateCurrentId);
    let length = peSevenStatesIdArray.length;
    let currentIndex = peSevenStatesIdArray.indexOf(peSevenStateCurrentId);
    console.log('length :' + length);
    console.log('currentIndex :' + currentIndex);
    // ø </NEXT or PREVIOUS>
    // ø <NEXT Only>
    let nextIndex = currentIndex + 1;
    let nextId = nextIndex >= length ? 'AFTER_LAST' : peSevenStatesIdArray[nextIndex];
    console.log('nextIndex :' + nextIndex);
    console.log('nextId :' + nextId);
    // ø </NEXT Only>
    // ø <PREV Only>
    let prevIndex = currentIndex - 1;
    let prevId = prevIndex <= 0 ? 'BEFORE_FIRST' : peSevenStatesIdArray[prevIndex];
    console.log('prevIndex :' + prevIndex);
    console.log('prevId :' + prevId);
    // ø </PREV Only>
    let targetId = direction === 'NEXT' ? nextId : prevId;
    if (targetId !== 'AFTER_LAST' && targetId !== 'BEFORE_FIRST') {
        goToStateById(targetId);
    }
    //<Nope>
    // else{
    //     $w('#btnPeSevenNext').hide();
    //     $w('#btnPeSevenCurrent').hide(); 
    // }
    //</Nope>
}
// ø <---------- </oToState> ---------->


// ø <---------- <doBootstrapMessage UI>  ---------->
// ø FIND pstEnrSevenUtility202107 BOOTSTRAP-MESSAGE
// ! NOTE: consider,INSTEAD, using 'backend/utility.jsw:renderBootstrapMarkdownString'
// !           this is where all enhancements will be place
// ! 20210723171500=>    at this time it _exists_ out there and hasn't broken anything
// ! I WILL TRY TO KEEP UP, BUT CHECK THE FILE ITSELF, and/or git to be certain
export function doBootstrapMessage(key,messageThis = 'DEFAULT', responsiveByLengthToFontSize2dArray = [],txtColor = '#007bff',bgColor = '#FFFFFF'){
// console.log("[fnc]key: " + key)
	let messages = [];
	let messageMatchKey = {};
	messageMatchKey.primary = "0";
	messageMatchKey.success = "1";
	messageMatchKey.warning = "2";
	messageMatchKey.danger = "3";
	messageMatchKey.info = "4";
	messageMatchKey.devel = "5";
	messageMatchKey['key0'] = "primary";
	messageMatchKey['key0'] = "primary";
	messageMatchKey['key1'] = "success";
	messageMatchKey['key2'] = "warning";
	messageMatchKey['key3'] = "danger";
	messageMatchKey['key4'] = "info";
	messageMatchKey['key5'] = "devel";
	messages.push('This is the Primary test message.');
	messages.push('This is the Success test message.');
	messages.push('This is the Waarning test message.');
	messages.push('This is the Danger test message.');
	messages.push('This is the Info test message.');
	messages.push('This is the Devel test message.');
	
	txtColor = key === 'primary' ? '#007bff' : txtColor;
	txtColor = key === 'success' ? '#ffffff' : txtColor;
	bgColor = key === 'success' ? '#28a745' : bgColor;
	// ! <only txtColor setting at this time>
	// txtColor = key === 'warning' ? '#ffc107' : txtColor;
	// bgColor = key === 'warning' ? '#000000' : bgColor;
	// ! OR
	txtColor = key === 'warning' ? '#000000' : txtColor;
	bgColor = key === 'warning' ? '#ffc107' : bgColor;
	// ! </only txtColor setting at this time>
    // ! <could apply to all, but especially the two negative respoinses>
	// txtColor = key === 'danger' ? '#dc3545' : txtColor;
	// bgColor = key === 'danger' ? '#FFFFFF' : bgColor;
	// ! OR
	txtColor = key === 'danger' ? '#FFFFFF' : txtColor;
	bgColor = key === 'danger' ? '#dc3545' : bgColor;
	// ! </could apply to all, but especially the two negative respoinses>
	txtColor = key === 'info' ? '#17a2b8' : txtColor;
	txtColor = key === 'devel' ? '#6610f2' : txtColor;

	let indexThis = Number(messageMatchKey[key]);
	messageThis = messageThis === 'DEFAULT' ? messages[indexThis] : messageThis;
	
	let length = messageThis.length;
    let pixelsByBreakPoint = '36';//just a good value for the original use-case
	if(responsiveByLengthToFontSize2dArray.length > 0){
		/**
		 * see separate DOX file 
		 * here: steamdaWixLocal/steamdaWix/agile/sprint/SevenSuperSteps/doBootstrapMessage_byHtml_UI_DOX.js
		 */

		let length = -1;
		let fontSize = pixelsByBreakPoint;
		 responsiveByLengthToFontSize2dArray.forEach(pair => {
			// console.log(pair);
			length = pair[0];
			fontSize = pair[1];
			if(messageThis.length > length){
				pixelsByBreakPoint = fontSize;
			}
		});
	}
	
    // ø <render STYLE>
	let style = `font-size: ${pixelsByBreakPoint}px;font-family: Avenir, Arial, Helvetica, sans-serif;background-color:${bgColor};color:${txtColor};text-align:center;`
    // ø </render STYLE>

    // ø <render HTML>
	let html = `<p style="${style}">` + messageThis + `</p>`;
    // ø </render HTML>
    return html;
}
// ø <---------- </doBootstrapMessage UI> ---------->

// ! =========================================================================================================================
// ! ==================================          </SEVENT-SUPER-STEPS with MultiStateBox>         ============================
// ! ==================================                     FIND pstEnrSevenCore202107  pstEnrSevenUtility202107                ============================
// ! =========================================================================================================================


export function btnStateOnramp_click(event) {
    let id = 'stateOnramp';
    goToStateById(id);
}

export function btnStateOfframp_click(event) {
    let id = 'stateOfframp';
    goToStateById(id);
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnPeSevenNext_click(event) {
    // ø pstEnrSevenCore202107 CLICK CURRENT
    // console.log('[btn]Next');
    // ø <NEW>
    let initLog = 'btnPeSevenNext_click NEW';
    mxboxPostEnrollmentSevenActionNext(initLog);
    // ø </NEW>
    // // ø <OLD>
    // let responseObject = {};
    // responseObject.TEST = true;
    // responseObject.logArrayUserInterface = [];
    // responseObject.logArrayDeveloper = ['btnPeSevenNext_click'];
    // responseObject.button = 'NEXT';
    // responseObject.messageKey = 'primary';
    // responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    // responseObject.messageResponse = false;
    // // ø </OLD>
    // // let messageKeyArray= ["success","warning","danger","info","devel"];
    // // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    // mxboxPostEnrollmentSevenAnyAction(responseObject);
	// // goToState();
    // // $w('#btnPeSevenNext').hide();
	// // $w('#btnPeSevenCurrent').show();
}

export function btnPeSevenPrev_click(event) {
    let responseObject = {};
    responseObject.logArrayDeveloper = [];
    goToState(responseObject,'PREV');
}

export function btnPeSevenCurrent_click(event) {
    // ø pstEnrSevenCore202107 CLICK CURRENT
    //"Perform Current Step"
    // console.log('[btn]PerformCurrentStep');
    // ø <NEW>
    let initLog = 'btnPeSevenCurrent_click NEW';
    mxboxPostEnrollmentSevenActionPerform(initLog);
    // ø </NEW>
    // ø <OLD>
    // let responseObject = {};
    // responseObject.TEST = true;
    // responseObject.logArrayUserInterface = [];
    // responseObject.logArrayDeveloper = ['btnPeSevenCurrent_click'];
    // responseObject.button = 'CURRENT';
    // let messageKeyArray= ["success","success","warning","danger"];
    // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    // responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    // responseObject.messageResponse = true;
    // mxboxPostEnrollmentSevenAnyAction(responseObject);
    // // ø </OLD>
	// // $w('#btnPeSevenNext').show();
	// // $w('#btnPeSevenCurrent').hide();
    // // // let id = 'abc';
    // // let peSevenStateCurrent = $w("#mxboxPostEnrollmentSeven").currentState;
    // // let peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
    // // if (peSevenStateCurrentId === 'stateOfframp') {
    // //      wixLocation.to("/blank-3");
    // }
}

export function btnGetStatesArray_click(event) {
    // ø pstEnrSevenUtility202107 CLICK DEV UTILITY
	 let superSevenStates = $w("#mxboxPostEnrollmentSeven").states;
     $w('#spMemberResponseJSON').value = JSON.stringify(superSevenStates,undefined,4)
    //  let statesArray = superSevenStates.map(state => {return state.id});
    //  let statesArray = $w("#mxboxPostEnrollmentSeven").states.map(state => {return state.id});
     let statesArray = $w("#mxboxPostEnrollmentSeven").states.map(state => state.id);
    //  $w('#spContactResponseJSON').value = JSON.stringify(statesArray);
}