// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
// import wixCrmBackend from 'wix-crm-backend';
// import {notifications} from 'wix-crm-backend';
// import {tasks} from 'wix-crm-backend';
// import {workflows} from 'wix-crm-backend';
import {local, session, memory} from 'wix-storage';
import wixUsers from 'wix-users';
import { getUser } from 'backend/userReference.jsw'
import { steamdaGetContactFunction } from 'backend/crmModule.jsw'
import { streamdaUpdateContactFunction } from 'backend/contactReference.jsw'
import { nowISO } from 'backend/utility.jsw'
import wixData from 'wix-data';
import wixWindow from 'wix-window';


$w.onReady(function () {
	// Wix.Features.isSupported(Wix.Features.Types.RESIZE_COMPONENT, function(data) {console.log(data)})
	onReadyPostEnrollment();
    doUserInterfaceCleanupCurrent()
    // $w('#anchorPreTrash').scrollTo();
});

export function onReadyPostEnrollment(){
	// $w('#sessionEnrollmentJSON').value = local.getItem("ondeckEnrollmentJSON");
	// $w('#anchorEnrollmentJSON').scrollTo()
    let now = new Date();
    let ISO = now.getFullYear() + ("00" +(now.getMonth() + 1)).substr(-2) + ("00" + now.getDate()).substr(-2) + ("00" + now.getHours()).substr(-2) + ("00" + now.getMinutes()).substr(-2) + ("00" + now.getSeconds()).substr(-2);
    // console.log(ISO + ' < "20210814235959"');
    // let beforeEndOfSummer2021 = Number(ISO) < Number("20210814235959");
    // console.log('beforeEndOfSummer2021: ' + beforeEndOfSummer2021);
    if(Number(ISO) < Number("20210814235959")){
        local.setItem('timezoneOffset',-4);
        local.setItem('tzAbbrv', 'EDT');
        local.setItem('termId','202106');
        local.setItem('termLabelKey','custom.t202106');
        let weekIdToLabelKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        let weekIdToLabelKeyJSON = JSON.stringify(weekIdToLabelKeyArray);
        // local.setItem('weekIdToLabelKeyJSON',`[['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];`);
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
	// /*PRETTIER*/$w('#sessionEnrollmentJSON').value = stepsDisplayStatusAsReturnString("After Completed: " + memory.getItem('enrollmentStepCompleted'))
    local.setItem('logString', local.getItem('logString') + '\n[~55]After Completed: ' + memory.getItem('enrollmentStepCompleted'))
}
// ø <---------- <doStepLoopSwitch>  ---------->
export async function doStepLoopSwitch() {
    local.setItem('logString', local.getItem('logString') + '\n[~59]entering: ' + 'doStepLoopSwitch()')
    let stepKey = 'PPENDING';
    let stepArray = memory.getItem('enrollmentStepList').split(',');
    for (let stepArrayIndex = 0; stepArrayIndex < stepArray.length; stepArrayIndex++) {
        stepKey = stepArray[stepArrayIndex];
        console.warn('stepKey[' + stepArrayIndex + ']:' + stepKey);
        let errorString = '';
        switch (stepKey) {
            case 'IINSTANTIATE':
				doInstantiateLoopSwitchStep();
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_ppMember':
                ppMemberPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_ppMember':
                await ppMemberExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stMember':
                stMemberPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_stMember':
                await stMemberExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_ppContact':
                ppContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_ppDatabase':
                await ppDatabasePrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stContact':
                stContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stDatabase':
                await stDatabasePrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_spContact':
                spContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_spDatabase':
                spDatabasePrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_ppContact':
                ppContactExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_ppDatabase':
                ppDatabaseExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_stContact':
                stContactExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_stDatabase':
                stDatabaseExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_spContact':
                spContactExecuteUpsert()
                console.log('Step: ' + stepKey)
                break;
            case 'EXECUTE_spDatabase':
                spDatabaseExecuteUpsert()
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
            local.setItem('logString', local.getItem('logString') + '\n[~59]exiting (Break Loop is Exit): ' + 'doStepLoopSwitch()')
            break;//(Break Loop is Exit)
        }
        // ø </ExitAfter Switch Check>
    }
}
// ø <---------- </doStepLoopSwitch> ---------->

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
	// $w('#gotContact').value = JSON.stringify(thisUserData,undefined,4);
	// $w('#gotContact').value = JSON.stringify(thisUserData.undefined,4);
}
// ø <---------- </getUserFrontEnd Front-End> ---------->


// ø <----------- <doUpdateContact Front-End>  ----------->
export async function doUpdateContact(paramObjectThis) {
	console.log('[~170]paramObjectThis:')
	console.log(paramObjectThis)
    
	let wixContact = await streamdaUpdateContactFunction(paramObjectThis);
	console.log('[~LINE 174]wixContact: ');
	console.log(wixContact);
	// $w('#crmContactId').value = wixContact._id;
	// memory.setItem('ppRevision',wixContact.revision);
	$w('#ppContactResponseJSON').value = JSON.stringify(wixContact,undefined,4);
}
// ø <----------- </doUpdateContact() Front-End> ----------->

// ! ====================================================================================================
// ! ====================                 </Front-End Code Calling Back-End Code>          ==============
// ! ====================================================================================================





// ø <---------- <steamdaMemberRegistration>  ---------->
export async function steamdaMemberRegistration(paramObjectParam = {}) {
    // ø <expected that paramObject will be gathered from memory.getItem(JSON)>
	let paramObject = {};
    if(typeof paramObjectParam.memoryKey === 'string'){
		paramObject = JSON.parse(memory.getItem(paramObjectParam.memoryKey))
        console.log('[~Line 152] paramObject: ');
        console.log(paramObject);
        // return "Default"
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
        // .then((result) => {
        //     let resultStatus = result.status;
        // });
    
    return memberResponse;
}
// ø <---------- </steamdaMemberRegistration> ---------->

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
    local.setItem('logString', local.getItem('logString') + '\n[~286]entering: ' + 'doInstantiateLoopSwitchStep()')
    local.setItem('superEnrollmentStatus','CONTINUE');
    let stepStampArrayObject = {};
    stepStampArrayObject.stampArray = [];
    let now = new Date();
    let yyyymm = now.getFullYear() * 100 + now.getMonth() + 1;
    let yyyymmddhhiiss = now.getFullYear().toString() + (now.getMonth() + 1).toString;
    memory.setItem('yyyymm',yyyymm.toString());
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));
    // ø <---------- timeDateString ---------->

	let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let memberId = enrollmentObject.family.parent.primary.memberId
	local.setItem('staffIdentifiedFamilyId', memberId);


    local.setItem('ppFirst', enrollmentObject.family.parent.primary.first);
    local.setItem('ppLast', enrollmentObject.family.parent.primary.last);
    local.setItem('stFirst', enrollmentObject.family.student.name.first);
    local.setItem('stPreferredFirst', enrollmentObject.family.student.name.preferred);
    local.setItem('stLast', enrollmentObject.family.student.name.last);
    local.setItem('spFirst', enrollmentObject.family.parent.secondary.first);
    local.setItem('spLast', enrollmentObject.family.parent.secondary.last);
    if((local.getItem('spLast')).length === 0 && (local.getItem('spFirst')).length > 0){
        local.setItem('spLast',local.getItem('ppLast'));
    }
    //preferredFirst Last (parentFirst {parentLastIfDifferent})
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
    local.setItem('logString', local.getItem('logString') + '\n[~334]exiting: ' + 'doInstantiateLoopSwitchStep()')
}
// ø <---------- </doInstantiateLoopSwitchStep> ---------->

// ø <---------- <actionValueEvaluation of IINSTANTIATE>  ---------->
export async function actionValueEvaluation(){
    local.setItem('logString', local.getItem('logString') + 'LAUNCH\n[~332] Entering actionValueEvaluation()');
    let ppAction = "INSERT|UPDATE|INSERT";
    let stAction = "INSERT|UPDATE|INSERT";
    let spAction = "NA|INSERT|INSERT";
    
    let staffMatch = local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE' ? false : true;
    local.setItem('logString', local.getItem('logString') + '\n[~338]staffMatch: ' + staffMatch);

    let familyId = local.getItem('staffIdentifiedFamilyId');
    // local.setItem('logString', local.getItem('logString') + '\n[~341]staffIdentifiedFamilyId: ' + familyId);
    let termId = Number(local.getItem('termId'));
    let studentLegalFirst = local.getItem('stFirst');
    
    // ø <ppAction>
    ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    // ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    if(staffMatch){
        // let ppCount = Number(memory.setItem('SQL','SELECT count from person
        // where personId = familyId AND termId = 202106'));
        let ppExistsCount = await wixData.query("person")
            .eq("personId", familyId)
            .eq("termId", termId)
            .count();
        ppAction = ppExistsCount > 0 ? "SKIP|SKIP|SKIP" : ppAction;
        local.setItem('logString', local.getItem('logString') + '\n[~355]ppExistsCount: ' + ppExistsCount);
    }
    // ø </ppAction>
    
    // ø <stAction>
    if(staffMatch){
        // let stCount = Number(memory.setItem('SQL','SELECT count from person
        // where familyId = familyId AND termId = 202106 AND legalFirst =
        // stFirst'));
        let stExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();
        stAction = stExistsCount > 0 ? "ALERT|ALERT|ALERT" : stAction;
        local.setItem('logString', local.getItem('logString') + '\n[~371]stExistsCount: ' + stExistsCount);
    }
    // ø </stAction>
    
    // ø <spAction>
    let checkSecondaryParent = (local.getItem('spFirst')).length === 0 && (local.getItem('spLast')).length === 0 ? false : true;
    let logSecondaryParentReason = '';
    logSecondaryParentReason = checkSecondaryParent === false ? 'Secondary Parent was not filled in in the form' : logSecondaryParentReason;
    checkSecondaryParent = ppAction.indexOf('SKIP') >= 0 ? false : checkSecondaryParent;
    logSecondaryParentReason = checkSecondaryParent === false && logSecondaryParentReason.length === 0 ? 'SKIP because Primary Parent SKIP-ped' : logSecondaryParentReason;
    logSecondaryParentReason = logSecondaryParentReason.length === 0 ? '[continue]' : logSecondaryParentReason;

    local.setItem('logString', local.getItem('logString') + '\n[~384]logSecondaryParentReason: ' + logSecondaryParentReason);
    local.setItem('logString', local.getItem('logString') + '\n[~385]checkSecondaryParent: ' + checkSecondaryParent);
    spAction = !checkSecondaryParent ? "NA|SKIP|SKIP" : spAction;
    if(staffMatch){
        // let spCount = Number(memory.setItem('SQL','SELECT count from person
        // where familyId = familyId AND termId = 202106 AND role =
        // Secondary'));
        if (checkSecondaryParent) {
            let spExistsCount = await wixData.query("person")
                .eq("familyId", familyId)
                .eq("role", 'Secondary')
                .eq("termId", termId)
                .count();
            spAction = spExistsCount > 0 ? "NA|SKIP|SKIP" : spAction;
            local.setItem('logString', local.getItem('logString') + '\n[~389]spExistsCount: ' + spExistsCount);
        }
    }
    // ø </spAction>
    
    let now = new Date();
    let yyyymmdd = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    local.setItem('logString', local.getItem('logString') + '\n[~396]yyyymmdd: ' + yyyymmdd);
    
    if(yyyymmdd > 20210815){
        ppAction = "ALERT|ALERT|ALERT";
        stAction = "ALERT|ALERT|ALERT";
        spAction = "ALERT|ALERT|ALERT";
    }

    // local.setItem('ppAction', '');
    // local.setItem('stAction', '');
    // local.setItem('spAction', '');
    memory.setItem('ppAction', ppAction);
    memory.setItem('stAction', stAction);
    memory.setItem('spAction', spAction);

    let allActionStrings = memory.getItem('ppAction') + memory.getItem('stAction') + memory.getItem('spAction');
    let superEnrollmentStatus = local.getItem('superEnrollmentStatus');
    superEnrollmentStatus = allActionStrings.indexOf('SKIP') >= 0 && allActionStrings.indexOf('SKIP') < 12 ? 'SKIP' : superEnrollmentStatus;
    superEnrollmentStatus = allActionStrings.indexOf('ALERT') >= 0 ? 'ALERT' : superEnrollmentStatus;    
    local.setItem('logString', local.getItem('logString') + '\n[~425]superEnrollmentStatus: ' + superEnrollmentStatus);
    local.setItem('superEnrollmentStatus',superEnrollmentStatus);
    local.setItem('logString', local.getItem('logString') + '\n[~427]Exiting: ' + 'actionValueEvaluation()');
}
// ø <---------- </actionValueEvaluation of IINSTANTIATE> ---------->

// ø <---------- </manually added Step Functions> ---------->
export function ppMemberPrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->
    let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));

    if(local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE'){
        // memory.setItem('ppMemberPrepJSON','ppMemberPrepJSON' + ' INSERT PREPPED on ' + timeDateString);
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
		paramObject.phone = enrollmentObject.family.phones[ppPhoneIndex].phone;
		memory.setItem("ppMemberPrepJSON", JSON.stringify(paramObject));    
    }else{
        memory.setItem('ppMemberPrepJSON','ppMemberPrepJSON' + ' UPDATE PREPPED on ' + timeDateString);
    }
}

export async function ppMemberExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->
    // memory.setItem('ppMemberExecuteUpsert','ppMemberExecuteUpsert' + ' EXECUTED on ' + timeDateString);
    if(local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE'){
        let paramObjectParam = {};
        paramObjectParam.memoryKey = "ppMemberPrepJSON";
        let ppMemberResponse = await steamdaMemberRegistration(paramObjectParam);
        local.setItem('familyId',ppMemberResponse.user.id);
        // memory.setItem('ppMemberExecuteUpsert','ppMemberExecuteUpsert' + ' INSERT EXECUTED on ' + timeDateString);
        memory.setItem('ppMemberExecuteUpsert', JSON.stringify(ppMemberResponse));
    }else{
        memory.setItem('ppMemberExecuteUpsert','ppMemberExecuteUpsert' + ' UPDATE EXECUTED on ' + timeDateString);
    }
    if(local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE'){
        // let memberResponseObject = JSON.parse(memory.getItem('ppMemberExecuteUpsert');
        memory.setItem('HHOLDER',timeDateString);
    }else{
        local.setItem('familyId',local.getItem('staffIdentifiedFamilyId'));
    }
}

export function stMemberPrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->
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

		// let ppEmailIndex = -1;
		// for (let index = 0; index < enrollmentObject.family.emails.length; index++) {
		// 	let element = enrollmentObject.family.emails[index];
		// 	if(element.role === "Primary Parent"){
		// 		ppEmailIndex = index;
		// 	}
			
		// }
		// ppEmailIndex = ppEmailIndex === -1 ? 0 : ppEmailIndex;
        let firstLegal = enrollmentObject.family.student.name.first;
        let firstPreferred = enrollmentObject.family.student.name.preferred;
        let email = firstLegal;
        email += local.getItem('familyId').substr(0,4);
        email = 'steamdiscoveryacademy' + '+' + email + '@gmail.com';

		let paramObject = {};
		paramObject.email = email;
		paramObject.password = simpleComplexPass();//"fMcM777";
		paramObject.firstName = firstPreferred;
		paramObject.lastName = enrollmentObject.family.student.name.last;
		paramObject.phone = phone;
		memory.setItem("stMemberPrepJSON", JSON.stringify(paramObject));    
    }else{
        memory.setItem('stMemberPrepJSON','stMemberPrepJSON' + ' UPDATE PREPPED on ' + timeDateString);
    }
}

export async function stMemberExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->
    // memory.setItem('stMemberExecuteUpsert','stMemberExecuteUpsert' + ' EXECUTED on ' + timeDateString);
    if(local.getItem('studentId') === 'INSTANTIATE'){
        // local.setItem('studentId','888888');
        // memory.setItem('stMemberExecuteUpsert','stMemberExecuteUpsert' + ' INSERT EXECUTED on ' + timeDateString);
        let paramObjectParam = {};
        paramObjectParam.memoryKey = "stMemberPrepJSON";
        let stMemberResponse = await steamdaMemberRegistration(paramObjectParam);
        console.log('[~LINE 408] stMemberResponse: ');
        console.log(stMemberResponse);
        local.setItem('studentId',stMemberResponse.user.id);
        // memory.setItem('ppMemberExecuteUpsert','ppMemberExecuteUpsert' + ' INSERT EXECUTED on ' + timeDateString);
        memory.setItem('stMemberExecuteUpsert', JSON.stringify(stMemberResponse));
        //stMemberExecuteUpsert

    }else{
        memory.setItem('stMemberExecuteUpsert','stMemberExecuteUpsert' + ' UPDATE EXECUTED on ' + timeDateString);
    }
}

export async function ppContactPrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->

    // let wixContactInfo = {};
    // wixContactInfo.contactInfo = {};
    // wixContactInfo.contactInfo.source = "PPENDING";

    let contact = await steamdaGetContactFunction(local.getItem('familyId'));
    $w('#ppContactResponseJSON').value = JSON.stringify(contact,undefined,4);
    memory.setItem('ppRevision',(contact.revision).toString());

    let paramObjectThis = {};
	paramObjectThis.contactIdentifiers = {};
    if(contact._id === local.getItem('familyId')){
        paramObjectThis.contactIdentifiers.contactId = contact._id;
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
    }else{
        paramObjectThis.contactIdentifiers.contactId = "EERROR";
        paramObjectThis.contactIdentifiers.errorContactId = contact._id;
        paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
        paramObjectThis.errorString = "Member ID !== Contact ID";
    }
    if(paramObjectThis.contactIdentifiers.contactId !== 'EERROR'){
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

        // let primaryParent = {};
        // primaryParent.contactInfo = {};
        // primaryParent.contactInfo.source = "PPENDING";
        // ø <---------- <doPrimaryParentContactInfo()>  ---------->
        // ø if messy this could become its own function
        // ø @path: steamdaWixLocal/steamdaWix/agile/sprint/objectToExpressionStringArray_Examples/primaryParentContactInfo_fromEnrollmentApplication.js

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";

        //enrollmentObject.
        // enrollmentObject.family.student.dob.month = 2;
        // enrollmentObject.family.student.dob.day = 7;
        let studentBDAY = ("00" + enrollmentObject.family.student.dob.month).substr(-2) + ("00" + enrollmentObject.family.student.dob.day).substr(-2);

        console.log("studentBDAY: " + studentBDAY);
        console.log("termBeginMMDD: " + local.getItem('termBeginMMDD'));
        console.log("termEndMMDD: " + local.getItem('termEndMMDD'));

        let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
        tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;
        // tBDAY = false;
        console.log('tBDAY: ' + tBDAY);


        // Member Active [custom.member-active]
        // Primary Parent [custom.primary-parent]
        let roleLabelKey = 'custom.primary-parent';
        let memberLabelKey = 'custom.member-active';


        // let idZZZToLableKeyArray = [[1,'custom.w1-2021060711'],[2,'custom.w2-2021061418'],[3,'custom.w3-2021062125'],[4,'custom.w4-2021062832'],[5,'custom.w5-2021071216'],[6,'custom.w6-2021071923'],[7,'custom.w7-2021072630'],[8,'custom.w8-2021080206'],[9,'custom.w9-2021080913'],['custom.w1-2021060711',1],['custom.w2-2021061418',2],['custom.w3-2021062125',3],['custom.w4-2021062832',4],['custom.w5-2021071216',5],['custom.w6-2021071923',6],['custom.w7-2021072630',7],['custom.w8-2021080206',8],['custom.w9-2021080913',9]];
        // let idZZZToLableKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyJSON  = local.getItem('weekIdToLabelKeyJSON');
        let weekIdToLabelKeyJSON = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyArray  = JSON.parse(weekIdToLabelKeyJSON);
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        // let labelKeyRow = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            // console.log('['+element.weekId+']element:');
            // console.log(element);
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

        // primaryParent.contactInfo.company = "Forest Associates";
        // primaryParent.contactInfo.jobTitle = "Human Resources";
        // primaryParent.contactInfo.birthdate = "1991-08-01";


        // primaryParent.contactInfo.labelKeys = [];
        // primaryParent.contactInfo.labelKeys[0] = "custom.gender-male";
        // primaryParent.contactInfo.labelKeys[1] = "custom.t202106";
        // primaryParent.contactInfo.labelKeys[2] = "custom.primary-parent";

        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            // console.log(element);
            primaryParent.contactInfo.labelKeys.push(element);
        });
        // ø </ZXZ-TTESTING DISABLED>
        


        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.emails = [];
        primaryParent.contactInfo.emails[0] = {};
        primaryParent.contactInfo.emails[0].tag = "MAIN";
        // ø </ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.emails[0].kind = "home";
        // ø <ZXZ-TTESTING DISABLED>
        primaryParent.contactInfo.emails[0].email = enrollmentObject.family.emails[0].email;
        primaryParent.contactInfo.emails[0].primary = "true";
        // ø </ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.emails[0].role = "Primary Parent";
        // enrollmentObject.family.emails[0].who = "Shirley";
        // enrollmentObject.family.emails[0].usage = "Personal";

        // primaryParent.contactInfo.emails[1] = {};
        // primaryParent.contactInfo.emails[1].tag = "MAIN";
        // primaryParent.contactInfo.emails[1].email = "qiqgroup+eli9375@gmail.com";
        // primaryParent.contactInfo.emails[1].primary = "true";

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
        // enrollmentObject.family.phones[0].role = "Primary Parent";
        // enrollmentObject.family.phones[0].who = "Shirley";
        // enrollmentObject.family.phones[0].usage = "Personal";

        // primaryParent.contactInfo.phones[1] = {};
        // primaryParent.contactInfo.phones[1].tag = "HOME";
        // primaryParent.contactInfo.phones[1].phone = "(579)-264-8376";


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
        // primaryParent.contactInfo.extendedFields.custom['legal-first'] = "Elijah";
        // enrollmentObject.family.student.name.preferred = "Danny";

        // primaryParent.contactInfo.extendedFields.custom.seed = "b53333aa164cc0b1";

        // ø <---------- </doPrimaryParentContactInfo()> ---------->

        paramObjectThis.contactInfo = primaryParent.contactInfo;
    }
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('ppContactPrepJSON',paramJSON);
}
// ø <---------- <ppDatabasePrepJSON AS Step-Function>  ---------->
export async function ppDatabasePrepJSON(){
    //ppDatabaseINSERT - actually, but renaming not worth it
    // console.log("[~734]ppDatabaseINSERT - actually, but renaming not worth it")
    
    // let familyId = local.getItem('familyId');
    let familyId = $w('#txtFamilyId').value;
    //let termId = Number(local.getItem('termId'));
    let termId = Number($w('#txtTermId').value);

    // ø <CHECK FOR EXISTING>
    let ppExistsCount = await wixData.query("person")
        .eq("personId", familyId)
        .eq("termId", termId)
        .count();

    if (ppExistsCount > 0) {
        memory.setItem('ppDatabasePrepJSON',"primaryParent person exists for this term");
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('ppLast') + ', ' + local.getItem('ppFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    // toInsert.personId = local.getItem('familyId');
    toInsert.personId = familyId;
    // toInsert.familyId = local.getItem('familyId');
    toInsert.familyId = familyId;
    toInsert.role = 'Primary';
    toInsert.first = local.getItem('ppFirst');
    toInsert.last = local.getItem('ppLast');
    toInsert.firstLegal = local.getItem('ppFirst');
    toInsert.fullName = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    // toInsert.idHH = local.getItem('familyId');
    toInsert.idHH = familyId;
    // toInsert.idBL = local.getItem('familyId');
    toInsert.idBL = familyId;
    // toInsert.altPersonId = local.getItem('familyId');
    toInsert.altPersonId = familyId;
    // toInsert.termId = local.getItem('termId');
    toInsert.termId = termId;
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
    return;

}
// ø <---------- </ppDatabasePrepJSON AS Step-Function> ---------->
export function ppDatabasePrepJSON_DEP(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->

}

// ø <---------- <stContactPrepJSON AS Step>  ---------->
export async function stContactPrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->

    // let wixContactInfo = {};
    // wixContactInfo.contactInfo = {};
    // wixContactInfo.contactInfo.source = "PPENDING";

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
        // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
    }else{
        paramObjectThis.contactIdentifiers.contactId = "EERROR";
        paramObjectThis.contactIdentifiers.errorContactId = contact._id;
        paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        // paramObjectThis.contactInfo = wixContactInfo.contactInfo;
        paramObjectThis.errorString = "Member ID !== Contact ID";
    }
    if(paramObjectThis.contactIdentifiers.contactId !== 'EERROR'){
        let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));

        // let student = {};
        // student.contactInfo = {};
        // student.contactInfo.source = "PPENDING";
        // ø <---------- <dostudentContactInfo()>  ---------->
        // ø if messy this could become its own function
        // ø @path: steamdaWixLocal/steamdaWix/agile/sprint/objectToExpressionStringArray_Examples/studentContactInfo_fromEnrollmentApplication.js

        // ! <FINAL>
        let lastupdateDATE = new Date();
        let lastupdate = lastupdateDATE.getFullYear().toString() + '-' + (lastupdateDATE.getMonth() + 1).toString() + '-' + lastupdateDATE.getDate().toString()
        let currentRegion = "Charlottesville";
        let timezoneOffest = "-4:00";
        
        //enrollmentObject.
        // enrollmentObject.family.student.dob.month = 2;
        // enrollmentObject.family.student.dob.day = 7;
        let studentBDAY = ("00" + enrollmentObject.family.student.dob.month).substr(-2) + ("00" + enrollmentObject.family.student.dob.day).substr(-2);
        
        console.log("studentBDAY: " + studentBDAY);
        console.log("termBeginMMDD: " + local.getItem('termBeginMMDD'));
        console.log("termEndMMDD: " + local.getItem('termEndMMDD'));
        
        let tBDAY = studentBDAY < local.getItem('termBeginMMDD') ? false : true;
        tBDAY = studentBDAY > local.getItem('termEndMMDD') ? false : tBDAY;
        // tBDAY = false;
        console.log('tBDAY: ' + tBDAY);
        
        
        // Member Active [custom.member-active]
        // Primary Parent [custom.primary-parent]
        let roleLabelKey = 'custom.student';
        let memberLabelKey = 'custom.member-faux';

        // let declaredGender = enrollmentObject.family.student.declaredGender.trim().toLowerCase();
        // let assignedGenderKey = 'unreported'
        // let maleOptionArray = ['masculine','men','he','man','male','gentleman','boy','guy','fellow','gent','bloke','chap','lad'];
        // let femaleOptionArray = ['woman','female','lady','girl','lass','lassie','bird'];
        // assignedGenderKey = maleOptionArray.includes(declaredGender) ? 'male' : assignedGenderKey;
        // assignedGenderKey = femaleOptionArray.includes(declaredGender) ? 'female' : assignedGenderKey;
        // assignedGenderKey = assignedGenderKey === 'unreported' && declaredGender.length > 0 ? 'alternative' : assignedGenderKey;
        // let genderLabelKey = 'custom.gender-' + assignedGenderKey;


        // let idZZZToLableKeyArray = [[1,'custom.w1-2021060711'],[2,'custom.w2-2021061418'],[3,'custom.w3-2021062125'],[4,'custom.w4-2021062832'],[5,'custom.w5-2021071216'],[6,'custom.w6-2021071923'],[7,'custom.w7-2021072630'],[8,'custom.w8-2021080206'],[9,'custom.w9-2021080913'],['custom.w1-2021060711',1],['custom.w2-2021061418',2],['custom.w3-2021062125',3],['custom.w4-2021062832',4],['custom.w5-2021071216',5],['custom.w6-2021071923',6],['custom.w7-2021072630',7],['custom.w8-2021080206',8],['custom.w9-2021080913',9]];
        // let idZZZToLableKeyArray = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyJSON  = local.getItem('weekIdToLabelKeyJSON');
        let weekIdToLabelKeyJSON = [['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];
        // let weekIdToLabelKeyArray  = JSON.parse(weekIdToLabelKeyJSON);
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        // let labelKeyRow = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            // console.log('['+element.weekId+']element:');
            // console.log(element);
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
        // finalLabelKeyArray.push(genderLabelKey);
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
        // student.contactInfo.birthdate = enrollmentObject.family.student.dob.date.substr(0,10);


        // student.contactInfo.labelKeys = [];
        // student.contactInfo.labelKeys[0] = "custom.gender-male";
        // student.contactInfo.labelKeys[1] = "custom.t202106";
        // student.contactInfo.labelKeys[2] = "custom.primary-parent";

        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            // console.log(element);
            student.contactInfo.labelKeys.push(element);
        });
        // ø </ZXZ-TTESTING DISABLED>
        


        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.emails = [];
        student.contactInfo.emails[0] = {};
        student.contactInfo.emails[0].tag = "MAIN";
        // ø </ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.emails[0].kind = "home";
        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.emails[0].email = stEmail;
        student.contactInfo.emails[0].primary = "true";
        // ø </ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.emails[0].role = "Primary Parent";
        // enrollmentObject.family.emails[0].who = "Shirley";
        // enrollmentObject.family.emails[0].usage = "Personal";

        // student.contactInfo.emails[1] = {};
        // student.contactInfo.emails[1].tag = "MAIN";
        // student.contactInfo.emails[1].email = "qiqgroup+eli9375@gmail.com";
        // student.contactInfo.emails[1].primary = "true";

        // ø <ZXZ-TTESTING DISABLED>
        student.contactInfo.phones = [];
        student.contactInfo.phones[0] = {};
        student.contactInfo.phones[0].tag = "MOBILE";
        // // ø </ZXZ-TTESTING DISABLED>
        // // enrollmentObject.family.phones[0].kind = "cell";
        // // ø </ZXZ-TTESTING DISABLED>
        student.contactInfo.phones[0].phone = stPhone;
        student.contactInfo.phones[0].primary = "true";
        // ø <ZXZ-TTESTING DISABLED>
        // enrollmentObject.family.phones[0].role = "Primary Parent";
        // enrollmentObject.family.phones[0].who = "Shirley";
        // enrollmentObject.family.phones[0].usage = "Personal";

        // student.contactInfo.phones[1] = {};
        // student.contactInfo.phones[1].tag = "HOME";
        // student.contactInfo.phones[1].phone = "(579)-264-8376";


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
        // student.contactInfo.extendedFields['custom.grade'] = enrollmentObject.family.student.currentGrade;
        // ! </FINAL>
        // ø </ZXZ-TTESTING DISABLED>
        // student.contactInfo.extendedFields.custom['legal-first'] = "Elijah";
        // enrollmentObject.family.student.name.preferred = "Danny";

        // student.contactInfo.extendedFields.custom.seed = "b53333aa164cc0b1";

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
    //stDatabaseINSERT - actually, but renaming not worth it
    // console.log("[~1054]stDatabaseINSERT - actually, but renaming not worth it")
    
    let familyId = $w('#txtFamilyId').value;
    //let familyId = local.getItem('familyId');
    let termId = Number($w('#txtTermId').value);
    //let termId = Number(local.getItem('termId'));

    // let studentId = local.getItem('studentId');
    let studentId = $w('#txStudentId').value;

    // let studentLegalFirst = local.getItem('stFirst');
    let studentLegalFirst = $w('#txStudentLegalFirst').value;

    // ø <CHECK FOR EXISTING>
    let stExistsCount = await wixData.query("person")
        .eq("familyId", familyId)
        .eq("firstLegal", studentLegalFirst)
        .eq("termId", termId)
        .count();

    if (stExistsCount > 0) {
        memory.setItem('stDatabasePrepJSON',"Student person exists for this familyId, legalFirstName and termId");
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    // toInsert.personId = local.getItem('studentId');
    toInsert.personId = studentId;
    // toInsert.familyId = local.getItem('familyId');
    toInsert.familyId = familyId;
    toInsert.role = 'Student';
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = local.getItem('stFirst');
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('stLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    // toInsert.idHH = local.getItem('familyId');
    toInsert.idHH = familyId;
    // toInsert.idBL = local.getItem('familyId');
    toInsert.idBL = familyId;
    // toInsert.altPersonId = local.getItem('studentId');
    toInsert.altPersonId = studentId;
    // toInsert.termId = local.getItem('termId');
    toInsert.termId = termId;
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
export function stDatabasePrepJSON_DEP(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('stDatabasePrepJSON','stDatabasePrepJSON' + ' PREPPED on ' + timeDateString);
}

export function spContactPrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('spContactPrepJSON','spContactPrepJSON' + ' PREPPED on ' + timeDateString);
}

export function spDatabasePrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('spDatabasePrepJSON','spDatabasePrepJSON' + ' PREPPED on ' + timeDateString);
}

export async function ppContactExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('ppContactExecuteUpsert','ppContactExecuteUpsert' + ' EXECUTED on ' + timeDateString);
    // ø <---------- timeDateString ---------->

    let ppContactParamObject = JSON.parse(memory.getItem('ppContactPrepJSON'));
    // console.log('[~971]ppContactParamObject:');
    // console.log(ppContactParamObject);
    await doUpdateContact(ppContactParamObject);
}

export function ppDatabaseExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('ppDatabaseExecuteUpsert','ppDatabaseExecuteUpsert' + ' EXECUTED on ' + timeDateString);
}

export async function stContactExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('stContactExecuteUpsert','stContactExecuteUpsert' + ' EXECUTED on ' + timeDateString);
    // ø <---------- timeDateString ---------->

    console.log("[~990]memory.getItem('stContactPrepJSON'):");
    console.log(memory.getItem('stContactPrepJSON'));
    let stContactParamObject = JSON.parse(memory.getItem('stContactPrepJSON'));
    console.log('[~993]stContactParamObject:');
    console.log(stContactParamObject);
    await doUpdateContact(stContactParamObject);
}

export function stDatabaseExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('stDatabaseExecuteUpsert','stDatabaseExecuteUpsert' + ' EXECUTED on ' + timeDateString);
}

export function spContactExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('spContactExecuteUpsert','spContactExecuteUpsert' + ' EXECUTED on ' + timeDateString);
}

export function spDatabaseExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('spDatabaseExecuteUpsert','spDatabaseExecuteUpsert' + ' EXECUTED on ' + timeDateString);
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
	// console.log('cycleThis: ' + cycleThis);
	let newList = memory.getItem('enrollmentStepList').substr(memory.getItem('enrollmentStepList').indexOf(',') + 1);
	// console.log('newList: ' + newList);
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
export function instantiateLoopSwitchEnrollmentSteps(){
    // let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    let stepList = stepArrayOrig.toString();
	memory.setItem('enrollmentStepList',stepList);
	memory.setItem('enrollmentStepCompleted','NNOT_AAPPLICABLE');
	memory.setItem('enrollmentStepCurrent',stepArrayOrig[0]);
	memory.setItem('enrollmentStepNext',stepArrayOrig[1]);
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
    //memItemLIST will be replaced with memory.getItem()
    let funcStepArray = memory.getItem('enrollmentStepList').split(',');
    memory.setItem('enrollmentStepCompleted',funcStepArray[0]);
    memory.setItem('enrollmentStepCurrent',funcStepArray[1]);
    memory.setItem('enrollmentStepNext',funcStepArray[2]);
    let cycleElement = funcStepArray.shift();
    funcStepArray.push(cycleElement);
    memory.setItem('enrollmentStepList',funcStepArray.toString());
    // let funcMemItemCurrNxtLst = funcMemItemCURRENT + '|' + funcMemItemNEXT + '|' + funcMemItemLIST;
    // return funcMemItemCurrNxtLst;
    //memItemLIST, memItemCURRENT and memItemNEXT will be replaced with memory.getItem()
    //thus, memItemCurrNxtList being returned and parsed upon return will be MOOT
}
// ø <---------- </stepsCycleSteps> ---------->

// ø <---------- <doInstantiateExitAfter>  ---------->
export function doInstantiateExitAfter(exitAfter = 'TTRUE_FUCNTION_DEFAULT'){
    let exitNow = 'FFALSE';
    //exitNow = 'TTRUE_FORCE'; //Force: until logic below is ready
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
	// let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));
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
			// $w("#radioAreYouSure").resetValidityIndication();
			break;
		case 'CLEAR':
			if($w('#radioAreYouSure').value !== 'YES'){
				$w('#sessionEnrollmentJSON').value = `'` + action + `'  is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.`;
				action = 'GET';
				break;
			}
			// console.log('memoryKey: ' + memoryKey);
			codeLabel = "CLEARED: memory.setItem(" + memoryKey + ", {clearString})";
			code = 'EEMPTY';
			code = memoryKey === 'spMemberOnDeckJSON' ? 'NNOT_AAPPLICABLE' : code;
			memory.setItem(memoryKey, code);
			$w("#radioAreYouSure").value = 'NO';
			// $w("#radioAreYouSure").resetValidityIndication();
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
				    // logString += '' + "Prep:";
				    // logString += '\n' + "memory.getItem('spContactPrepJSON'): \n" + memory.getItem('spContactPrepJSON');
				    // logString += '\n\n' + "Execute:";
					// logString += '\n' + "memory.getItem('spContactExecuteUpsert'): \n" + memory.getItem('spContactExecuteUpsert');
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
				// console.log('memoryKey: ' + memoryKey);
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
	// console.log('local.getItem("ondeckEnrollmentJSON"): ');
    // console.log(result);
	$w('#txtStepsList').text = result;
	doUserInterfaceCleanupCurrent();
}
//ø <---------- </displaySteps> ---------->


// ø <---------- <doEnrollmentCleanupCurrent>  ---------->
// ø <DEPRECATED for 'doEnrollmentCleanupByKind' two below>
export function doEnrollmentCleanupCurrent() {
    // ø <code Cleanup for Current Enrollment> mostly for testing
    /*Not CURRENT*///local.setItem('ondeckEnrollmentJSON','EEMPTY');
    // local.setItem('staffIdentifiedFamilyId', 'EEMPTY');
    // local.setItem('familyId', 'EEMPTY');
    memory.setItem('ppRevision',"EEMPTY")
    // local.setItem('studentId', 'EEMPTY');
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
export function doEnrollmentLogCurrent(kind = 'DDEFAULT') {
    let kindSupportedArray = ['CODE','STEPS','DATA','CORE','LOG','ERROR','UNACCOUNTED_FOR','DDEFAULT'];
    kind = kindSupportedArray.includes(kind) ? kind : 'DDEFAULT';
    console.warn('kind: ' + kind);

    // ø <code Log for Current Enrollment> mostly for testing
    let logString = '';
    /*Not CURRENT*///logString += '\n' + "local.getItem('ondeckEnrollmentJSON'): " + local.getItem('ondeckEnrollmentJSON'); 
    // ø <DATA>
    if(kind === 'DATA' || kind === 'DDEFAULT'){
        // console.log(kind);
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
        logString += '\n' + "[CORE]local.getItem('termId'): " + local.getItem('termId');
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <CODE>
    if(kind === 'CODE' || kind === 'DDEFAULT'){
        // console.log(kind);
        logString += '\n' + "memory.getItem('ppMemberPrepJSON'): " + memory.getItem('ppMemberPrepJSON');
        logString += '\n' + "memory.getItem('ppMemberExecuteUpsert'): " + memory.getItem('ppMemberExecuteUpsert');
        logString += '\n' + "memory.getItem('stMemberPrepJSON'): " + memory.getItem('stMemberPrepJSON');
        logString += '\n' + "memory.getItem('stMemberExecuteUpsert'): " + memory.getItem('stMemberExecuteUpsert');
        logString += '\n' + "memory.getItem('ppContactPrepJSON'): " + memory.getItem('ppContactPrepJSON');
        logString += '\n' + "memory.getItem('ppDatabasePrepJSON'): " + memory.getItem('ppDatabasePrepJSON');
        logString += '\n' + "memory.getItem('stContactPrepJSON'): " + memory.getItem('stContactPrepJSON');
        logString += '\n' + "memory.getItem('stDatabasePrepJSON'): " + memory.getItem('stDatabasePrepJSON');
        logString += '\n' + "memory.getItem('spContactPrepJSON'): " + memory.getItem('spContactPrepJSON');
        logString += '\n' + "memory.getItem('spDatabasePrepJSON'): " + memory.getItem('spDatabasePrepJSON');
        logString += '\n' + "memory.getItem('ppContactExecuteUpsert'): " + memory.getItem('ppContactExecuteUpsert');
        logString += '\n' + "memory.getItem('ppDatabaseExecuteUpsert'): " + memory.getItem('ppDatabaseExecuteUpsert');
        logString += '\n' + "memory.getItem('stContactExecuteUpsert'): " + memory.getItem('stContactExecuteUpsert');
        logString += '\n' + "memory.getItem('stDatabaseExecuteUpsert'): " + memory.getItem('stDatabaseExecuteUpsert');
        logString += '\n' + "memory.getItem('spContactExecuteUpsert'): " + memory.getItem('spContactExecuteUpsert');
        logString += '\n' + "memory.getItem('spDatabaseExecuteUpsert'): " + memory.getItem('spDatabaseExecuteUpsert');
    }//END if(kind === 'CODE' || kind === 'DDEFAULT')
    // ø </CODE>
    // ø <STEPS>
    if(kind === 'STEPS' || kind === 'DDEFAULT'){
        //console.log(kind);
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
        console.log(kind);
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
    // if(kind === 'UNACCOUNTED_FOR'){
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
    // ø <LOG>
    if(kind === 'LOG' || kind === 'DDEFAULT'){
        logString += '\n' + "local.getItem('logString'): " + local.getItem('logString');
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
    // logString += '\n' + 'nowISO: ' + nowISO;
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
    let develTest = false;
    // ø </DO NOT REMOVE>
    let errorStringArray = [];
    let cleanupString = 'EEMPTY';//override where appropriate
    let kindKeySupportedArray = ['CURRENT','CODE','STEPS','DATA','CORE','OTHER','MEMORY_ALL','LOCAL_TEMP','ALL_EXCEPT_ENROLLMENT','ALL_INCLUDING_ENROLLMENT','ABORT','LOG','EEROR'];
    // let kindKeySupportedArray = ['CODE','STEPS','DATA','NOT_LOCAL_DATA','NOT_CORE','OTHER','MEMORY_ALL','LOCAL_TEMP','ALL_EXCEPT_ENROLLMENT','ALL_INCLUDING_ENROLLMENT','ABORT'];
    let kindSupportedArray = ['CODE','STEPS','DATA','CORE','OTHER','NEXT_ENROLLMENT'];
    kindKey = kindKeySupportedArray.includes(kindKey) ? kindKey : 'DDEFUALT';
    console.warn('kindKey: ' + kindKey);
    let kindArray = [];
    kindArray = kindKey === 'ABORT' ? /*kindSupportedArray*/['ZZZ'] : kindArray;
    kindArray = kindKey === 'ALL_INCLUDING_ENROLLMENT' ? ['CODE','STEPS','DATA','NEXT_ENROLLMENT','UI'] : kindArray;
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
    if(kindArray.length === 0){
        errorStringArray.push("The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not vallid.");
    }
    if(kindArray.length === 1 && kindArray[0] === 'ZZZ'){
        errorStringArray.push("The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not enabled at this time.");
    }
    if(kindArray.includes('NEXT_ENROLLMENT')){
        if(typeof develTest !== 'boolean' || develTest !== true){
            if(typeof local.getItem('wixWebhookStatus') !== 'string' || local.getItem('wixWebhookStatus') !== 'RESOLVED'){
                errorStringArray.push("'Next Enrollment' rquires that the current Webhook Payload have a status of 'Resolved'")
            }
        }
    }
    // ø </VALIDATION HERE>
    
    // ø <VALIDATION EXIT IFF>
    let lineFeed = '';
    if(errorStringArray.length > 0){
        let errorStringLog = '';
        errorStringArray.forEach(errorString => {
            // console.log(errorString); 
            errorStringLog += lineFeed + ' • ' + errorString; 
            lineFeed = '\n';
        });
        console.warn('errorStringLog: ');
        console.warn(errorStringLog);
        return errorStringLog;
    }
    // ø </VALIDATION EXIT IFF>

    // ø <code Log for Current Enrollment> mostly for testing
    // let logString = '';
    // let memory = {};
    // let local = {};
    /*Not CURRENT*///logString += '\n' + "local.getItem('ondeckEnrollmentJSON'): " + local.setItem('ondeckEnrollmentJSON'); 
    // ø <DATA>
    if(kindArray.includes('DATA')){
        cleanupString = develTest === true ? 'DATA' : cleanupString;
        // local.setItem('staffIdentifiedFamilyId', cleanupString);
        // local.setItem('familyId', cleanupString);
        local.setItem('superEnrollmentStatus', cleanupString);
        memory.setItem('ppAction', cleanupString);
        memory.setItem('stAction', cleanupString);
        memory.setItem('spAction', cleanupString);
        memory.setItem('ppRevision', cleanupString);
        // local.setItem('studentId', cleanupString);
        memory.setItem('stRevision', cleanupString);
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <LOCAL_DATA>
    if(kindArray.includes('LOCAL_DATA')){
        cleanupString = develTest === true ? 'LOCAL_DATA' : cleanupString;
        local.setItem('staffIdentifiedFamilyId', cleanupString);
        local.setItem('familyId', cleanupString);
        // memory.setItem('ppRevision', cleanupString);
        local.setItem('studentId', cleanupString);
        local.setItem('secondaryId', cleanupString);
        // memory.setItem('stRevision', cleanupString);
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
        local.setItem('logString', cleanupString);
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
    // if(kind === 'UNACCOUNTED_FOR' || kind === 'DDEFAULT'){
        cleanupString = develTest === true ? 'UNACCOUNTED_FOR' : cleanupString;
        memory.setItem('loopExitNow', cleanupString);
        memory.setItem('ppMemberOnDeckJSON', cleanupString);
        memory.setItem('HHOLDER', cleanupString);
        memory.setItem('loopExitAfterStep', cleanupString);
    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </UNACCOUNTED_FOR>
    // return logString;
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentCleanupByKind> ---------->

export function doUserInterfaceCleanupCurrent(){
	// $w("#btnUiPpId").label = "Staff ID PP: acee678e-76a6-49b1-96c3-a467b7a1acba";
	// $w("#btnUiFamilyID").label = "Family ID: c2660053-903f-4bc5-b7b4-e4d7824a381f";
	// $w("#btnUiStudentID").label = "Student ID: 955c303e-39ac-4308-b5ee-e3786234b70e";
	$w("#btnUiPpId").label = "Staff ID PP: " + local.getItem('staffIdentifiedFamilyId');
    let label = "Family ID: ";
    label += local.getItem('familyId') !== "EEMPTY" ? local.getItem('familyId') : '';
    label += Number(memory.getItem('ppRevision')) > 0 ? ' [' + memory.getItem('ppRevision') + ']' : ''; 
	$w("#btnUiFamilyID").label = label;
	// $w("#btnUiStudentID").label = "Student ID: " + local.getItem('studentId');
    label = "Student ID: ";
    label += local.getItem('studentId') !== "EEMPTY" ? local.getItem('studentId') : '';
    label += Number(memory.getItem('stRevision')) > 0 ? ' [' + memory.getItem('stRevision') + ']' : ''; 
	// $w("#btnUiStudentID").label = "Student ID: " + local.getItem('studentId');
	$w("#btnUiStudentID").label = label;
    let step = memory.getItem('enrollmentStepCompleted') === null ? false : true;
    step = memory.getItem('enrollmentStepCompleted') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCompleted') === "NNOT_AAPPLICABLE" ? false : step;
	$w("#btStepCompleted").label = step ?  memory.getItem('enrollmentStepCompleted') : '';
    step = memory.getItem('enrollmentStepCurrent') === null ? false : true;
    step = memory.getItem('enrollmentStepCurrent') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === "NNOT_AAPPLICABLE" ? false : step;
	$w("#btStepCurrent").label = step ?  memory.getItem('enrollmentStepCurrent') : '';
	$w("#txtStudentDobString").value = local.getItem('uiStDobString');
    let webhookId = local.getItem('wixWebhookId')
    if(typeof webhookId === 'string' && webhookId.length > 20){
        label = 'Webhook ID: ';
        label += local.getItem('wixWebhookId');
        label += ' [' + local.getItem('wixWebhookStatus') + ']';
    }else{
        label = 'Webhook ID: [invalid';
    }
    $w('#btnWebhookData').label = label;
    if(local.getItem('wixWebhookStatus') === 'RESOLVED'){
        $w('#grpCleanUpAllIncludingEnrJSON').show();
        $w('#grpWebhookResolve').hide();
    }else{
        $w('#grpCleanUpAllIncludingEnrJSON').hide();
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
    // let YYYY = dob.getFullYear();
    // let MM = dob.getMonth() + 1;
    // let DD = dob.getDate();
    // let dobString = ('00' + MM).substr(-2) + '/' + ('00' + DD).substr(-2) + '/' + YYYY;
    let dobString = ('00' + (dob.getMonth() + 1).toString()).substr(-2) + '/' + ('00' + dob.getDate().toString()).substr(-2) + '/' + dob.getFullYear().toString();
    local.setItem('uiStDobString',dobString);
    enrollmentObject.family.student.dobString = dobString;
    enrollmentObject.family.student.dob.date = dob.toISOString();
    enrollmentObject.family.student.dob.month = dob.getMonth() + 1;
    enrollmentObject.family.student.dob.day = dob.getDate();
    enrollmentObject.family.student.dob.year = dob.getFullYear();
    // $w("#sessionEnrollmentJSON").value = JSON.stringify(enrollmentObject,undefined,4);
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
    // let memberID = 'ZXZ';
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
		// onReadyUserInterface();
		return;
	}
	if($w('#ddCurrentStatusUpdate').value === local.getItem('wixWebhookStatus')){
		response = "On-deck 'Webhook-Payload' Status is the same as the Drop-Down (update) Value. No Update Indicated" + kInvalidAppend;
		$w('#sessionEnrollmentJSON').value = response;
		// onReadyUserInterface();
		return;
	}
	await updateStatuWebhookPayloadThis();
	let lastResponse = JSON.parse(local.getItem('lastResponseObject'));
	if(lastResponse._id === local.getItem('webhookThisId')){
		local.setItem('webhookThisStatus',lastResponse.currentStatus);
		if(typeof lastResponse.resolvedStatus !== 'undefined'){
			local.setItem('webhookThisResolved',lastResponse.resolvedStatus);
		}
	}
	response = "UPDATE: String Pending" + kInvalidAppend;
	$w('#sessionEnrollmentJSON').value = response;
	// refreshWebhookPayloadDataSet()
	// onReadyUserInterface();

}
// ø <------------ </doUpdateThisWebhookPayload(status)> -------------->


// ø <------------ <updateStatuWebhookPayloadThis()>  -------------->
export async function updateStatuWebhookPayloadThis(getOnly = false){
	   const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = local.getItem('wixWebhookId');

    let updateObject = await wixData.get("webhookPayload", webhookId, options);
    if(getOnly){
      	local.setItem('lastResponseObject', JSON.stringify(updateObject));
        $w('#sessionEnrollmentJSON').value = JSON.stringify(updateObject,undefined,4);
        console.log("[~1686]About to Return with 'getOnly' Webhook Payload")
        return;
    }

	let now = new Date();
	let nowISO = now.toISOString();
	// let updateObject = {};
	// updateObject._id = local.getItem('webhookThisId');
	updateObject.currentStatus = $w('#ddCurrentStatusUpdate').value;
	updateObject.currentStatusStamp = now;
	if($w('#ddCurrentStatusUpdate').value === 'RESOLVED'){
		updateObject.resolvedStatus = $w('#ddCurrentStatusUpdate').value;
		updateObject.resolvedStatusStamp = now;
	}
	local.setItem('lastParamObject', JSON.stringify(updateObject));
	// $w('#txareaCodeBlock').value = JSON.stringify(updateObject,undefined,4);
	let response = await wixData.update("webhookPayload", updateObject)
	local.setItem('lastResponseObject', JSON.stringify(response));
	$w('#sessionEnrollmentJSON').value = JSON.stringify(response,undefined,4);


}
// ø <------------ </updateStatuWebhookPayloadThis()> -------------->

// ! ====================================================================================================
// ! ====================                    </Only UI Support Functiions>                   ==============
// ! ====================================================================================================

// ! ====================================================================================================
// ! ====================.        <Only BUTTON_click Functiions Below Here>          ====================
// ! ====================================================================================================
export function btnGetEnrollmentJSON_click(event) {
	// console.log('local.getItem("ondeckEnrollmentJSON"): ');
    // console.log(local.getItem("ondeckEnrollmentJSON"));
	let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'))
	// local.setItem('familyId', enrollmentObject.family.parent.primary.memberId);
	$w('#sessionEnrollmentJSON').value = JSON.stringify(enrollmentObject,undefined,4);
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
	// console.log('local.getItem("ondeckEnrollmentJSON"): ');
    // console.log(result);
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
	// $w("#radioAreYouSure").resetValidityIndication();

	// memory.setItem('enrollmentStepList','IINSTANTIATE,stepOne,stepTwo,stepThree,CCOMPLETE');
	// memory.setItem('enrollmentStepList','IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_ppContact,EXECUTE_ppContact,PREP_ppDatabase,EXECUTE_ppDatabase,PREP_stMember,EXECUTE_stMember,PREP_stContact,EXECUTE_stContact,PREP_stDatabase,EXECUTE_stDatabase,PREP_spContact,EXECUTE_spContact,PREP_spDatabase,EXECUTE_spDatabase,CCOMPLETE');
	// memory.setItem('enrollmentStepCurrent','PPENDING');
	// let stepNext = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));
	// memory.setItem('enrollmentStepNext',stepNext);
	// stepNext = "Steps: \n" + memory.getItem('enrollmentStepList');
	// stepNext += "\n\nStep Current: " + memory.getItem('enrollmentStepCurrent');
	// stepNext += "\n\nStep Next: " + memory.getItem('enrollmentStepNext');
	// $w('#sessionEnrollmentJSON').value = stepNext;
}

export function btnDisplayCurrentState_click(event) {
    let kind = $w('#ddDisplayKind').value;
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent(kind);
}

export function btnCleanupCurrentState_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
		// $w('#sessionEnrollmentJSON').value = doEnrollmentCleanupCurrent();
		$w('#sessionEnrollmentJSON').value = doEnrollmentCleanupByKind('CURRENT')
		doUserInterfaceCleanupCurrent();
		// instantiateLoopSwitchEnrollmentSteps();
		// $w('#sessionEnrollmentJSON').value = stepsDisplayStatusAsReturnString('init');
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
	// $w("#radioAreYouSure").resetValidityIndication();
}

export async function btnPeformNextStep_click(event) {
    local.setItem('logString','enter btnPeformNextStep_click(event)');
    local.setItem('logString', local.getItem('logString') + '\n[~2278]Next (current) Step: ' + memory.getItem('enrollmentStepCurrent'))
	await doPeformNextStep();
	$w('#ddDisplayKind').value = 'STEPS';
	// $w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('CODE');
	displaySteps();
    doUserInterfaceCleanupCurrent()
    local.setItem('logString', local.getItem('logString') + '\n[~2284]exit btnPeformNextStep_click(event) nowISO: ' + await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')))
	$w('#sessionEnrollmentJSON').value = local.getItem('logString');
}

export async function btnSkipNextStep_click(event) {
    local.setItem('logString','enter btnSkipNextStep_click(event)');
	if($w('#radioAreYouSure').value !== 'YES'){
		// $w('#sessionEnrollmentJSON').value = "'Skip Next Step' is so critical that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
		local.setItem('logString', local.getItem('logString') + '\n[~2293]: ' + "'Skip Next Step' is so critical that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.");
	}else if(memory.getItem('enrollmentStepCurrent') === 'IINSTANTIATE'){
		// $w('#sessionEnrollmentJSON').value = "You cannot use 'Skip Next Step' to skip the 'IINSTANTIATE' step. Please proceed normally to execute the 'IINSTANTIATE' step.\n\nNo action taken. \nPlease try again or ask for assistance.";
		local.setItem('logString', local.getItem('logString') + '\n[~2296]: ' + "You cannot use 'Skip Next Step' to skip the 'IINSTANTIATE' step. Please proceed normally to execute the 'IINSTANTIATE' step.\n\nNo action taken. \nPlease try again or ask for assistance.");
    }else{
        stepsCycleSteps();
		displaySteps();
        // $w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('STEPS');
        local.setItem('logString', local.getItem('logString') + '\n[~2301]stepSkipped: ' + memory.getItem('enrollmentStepCompleted'));
	}
    $w("#radioAreYouSure").value = 'NO';
    local.setItem('logString', local.getItem('logString') + '\n[~2304]exit btnSkipNextStep_click(event) nowISO: ' + await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')))
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

export function btCleanUpAllExceptEnrJSON_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
		$w('#sessionEnrollmentJSON').value = "'Clean Up All – Except Enrollment JSON' is NOT Enabled at this time.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up All – Except Enrollment JSON' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
	// $w("#radioAreYouSure").resetValidityIndication();
}

export function btCleanUpAllIncludingnrJSON_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
		$w('#sessionEnrollmentJSON').value = "'Clean Up All – Including Enrollment JSON' is NOT Enabled at this time.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up All – Including Enrollment JSON' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
	// $w("#radioAreYouSure").resetValidityIndication();
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
	local.setItem('familyId','EEMPTY');
    memory.setItem('ppRevision','EEMPTY');
    local.setItem('studentId','EEMPTY');
    memory.setItem('stRevision','EEMPTY');
    local.setItem('secondaryId','EEMPTY');
    memory.setItem('spRevision','EEMPTY');
    doUserInterfaceCleanupCurrent();
    $w('#sessionEnrollmentJSON').value = 'Kludge-Clear has removed all Primary-Parent, Student, and Secondary-Parent ID Values from Storage.'
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetStMember_click(event) {
	doGetRecord('stMember','stMemberResponseJSON');
}

/**
 *	 @param {$w.MouseEvent} event
 *	Adds an estnt handler that runs when the element is clicked.
 *	Adds an estnt handler that runs when the element is clicked.
 */
export function btnGetStCpntact_click(event) {
	doGetRecord('stContact','stContactResponseJSON');
}



/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetStDbase_click(event) {
	doGetRecord('stDbase','stDatabaseResponseJSON');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnClearStMember_click(event) {
	doClear('stMemberResponseJSON')
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnClearStContact_click(event) {
	doClear('stContactResponseJSON')
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnClearStDbase_click(event) {
	doClear('stDatabaseResponseJSON')
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetSpMember_click(event) {
	doGetRecord('spMember','spMemberResponseJSON');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetSpCpntact_click(event) {
	doGetRecord('spContact','spContactResponseJSON');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetSpDbase_click(event) {
	doGetRecord('spDbase','spDatabaseResponseJSON');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnClearSpMember_click(event) {
	doClear('spMemberResponseJSON')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnClearSpContact_click(event) {
	doClear('spContactResponseJSON')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnClearSpDbase_click(event) {
	doClear('spDatabaseResponseJSON')
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnWebhookResolve_click(event) {
    if($w('#radioAreYouSure').value === 'YES'){
		// $w('#sessionEnrollmentJSON').value = "'Resolve Webhook' is NOT Enabled at this time.\n\nNo action taken. \nPlease try again or ask for assistance.";
        let statusThis = $w('#ddCurrentStatusUpdate').value;
        doUpdateThisWebhookPayload(statusThis);
	}else{
		$w('#sessionEnrollmentJSON').value = "'Resolve Webhook' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
	// $w("#radioAreYouSure").resetValidityIndication();

}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnCleanUpDEP_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
		$w('#sessionEnrollmentJSON').value = doEnrollmentCleanupCurrent();
		doUserInterfaceCleanupCurrent();
        // doEnrollmentCleanupByKind(kindKey = 'DDEFAULT')
		// instantiateLoopSwitchEnrollmentSteps();
		// $w('#sessionEnrollmentJSON').value = stepsDisplayStatusAsReturnString('init');
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
	// $w("#radioAreYouSure").resetValidityIndication();
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnCleanUpByKindTEST_click(event) {
	if($w('#radioAreYouSure').value === 'YES'){
        let kindKey = $w('#ddCleanupByKind').value;
        $w('#sessionEnrollmentJSON').value = doEnrollmentCleanupByKind(kindKey);
		// doUserInterfaceCleanupCurrent();
        // $w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent()
		$w('#sessionEnrollmentJSON').value = "'Clean Up by Kind' was just executed";
	}else{
		$w('#sessionEnrollmentJSON').value = "'Clean Up by Kind' is so critical, and destructive, that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}
	$w("#radioAreYouSure").value = 'NO';
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetWebhookPayload_click(event) {
	updateStatuWebhookPayloadThis(true); 
}



// ! ====================================================================================================
// ! ====================                       <PRETRASH DB TESTING>                      ==============
// ! ====================================================================================================

export async function pretrashFindFamilyIdTermId(){
    let logString = '';
    let exceptionLogArray = [];
    
    let familyId = $w('#txtFamilyId').value;
    // familyId = local.getItem('familyId');
    // familyId = "123";
    let termId = Number($w('#txtTermId').value);
    // termId = Number(local.getItem('termId'));
    // termId = 202106;


    logString += '\n' + "local.getItem('familyId'): " + familyId;
    logString += '\n' + "local.getItem('termId'): " + termId;


    let ppExistsCount = await wixData.query("person")
        .eq("personId", familyId)
        .eq("termId", termId)
        .count();

    if (ppExistsCount > 0) {
        // stampArrayElementObject.action = "abort";
        // stampArrayElementObject.descr = "primaryParent person exists for this term";
        // stampArrayElementObject.action = "abort";
        exceptionLogArray.push("primaryParent person exists for this term");
    }


    logString +='\n' + "ppExistsCount: " + ppExistsCount;
    // logString += '\n' + "copyCode: " + JSON.stringify(copyCode,undefined,4);
    // logString += '\n';// + "count: " + count;
    // logString += '\n' + "copyCodeCount: " + copyCodeCount;
    // logString += '\n' + "copyCodeCount: " + JSON.stringify(copyCodeCount,undefined,4);
    // logString += '\n' + "result: " + JSON.stringify(result,undefined,4);
    // logString += '\n' + "count: " + count;

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
    // toInsert.personId = local.getItem('familyId');
    toInsert.personId = familyId;
    // toInsert.familyId = local.getItem('familyId');
    toInsert.familyId = familyId;
    toInsert.role = 'Primary';
    toInsert.first = local.getItem('ppFirst');
    toInsert.last = local.getItem('ppLast');
    toInsert.firstLegal = local.getItem('ppFirst');
    toInsert.fullName = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    // toInsert.idHH = local.getItem('familyId');
    toInsert.idHH = familyId;
    // toInsert.idBL = local.getItem('familyId');
    toInsert.idBL = familyId;
    // toInsert.altPersonId = local.getItem('familyId');
    toInsert.altPersonId = familyId;
    // toInsert.termId = local.getItem('termId');
    toInsert.termId = termId;
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    let testObjectData = {};
    testObjectData.family = "family data";
    let testObjectCorollary = {};
    testObjectCorollary.corollary = "course data";
    toInsert.objectData = local.getItem('ondeckEnrollmentJSON');
    // toInsert.objectData = JSON.stringify(testObjectData);
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
    // familyId = local.getItem('familyId');
    // familyId = "123";
    let termId = Number($w('#txtTermId').value);
    // termId = Number(local.getItem('termId'));
    // termId = 202106;

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
        // stampArrayElementObject.action = "abort";
        // stampArrayElementObject.descr = "primaryParent person exists for this term";
        // stampArrayElementObject.action = "abort";
        exceptionLogArray.push("Student person exists for this familyId, legalFirstName and term");
    }


    logString +='\n' + "stExistsCount: " + stExistsCount;
    // logString += '\n' + "copyCode: " + JSON.stringify(copyCode,undefined,4);
    // logString += '\n';// + "count: " + count;
    // logString += '\n' + "copyCodeCount: " + copyCodeCount;
    // logString += '\n' + "copyCodeCount: " + JSON.stringify(copyCodeCount,undefined,4);
    // logString += '\n' + "result: " + JSON.stringify(result,undefined,4);
    // logString += '\n' + "count: " + count;

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
    // toInsert.personId = local.getItem('familyId');
    toInsert.personId = studentId;
    // toInsert.familyId = local.getItem('familyId');
    toInsert.familyId = familyId;
    toInsert.role = 'Student';
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = local.getItem('stFirst');
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('stLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    // toInsert.idHH = local.getItem('familyId');
    toInsert.idHH = familyId;
    // toInsert.idBL = local.getItem('familyId');
    toInsert.idBL = familyId;
    // toInsert.altPersonId = local.getItem('familyId');
    toInsert.altPersonId = studentId;
    // toInsert.termId = local.getItem('termId');
    toInsert.termId = termId;
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    let testObjectData = {};
    testObjectData.family = "family data";
    let testObjectCorollary = {};
    testObjectCorollary.corollary = "course data";
    toInsert.objectData = local.getItem('ondeckEnrollmentJSON');
    // toInsert.objectData = JSON.stringify(testObjectData);
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
    // local.setItem('staffIdentifiedFamilyId', cleanupString);
    // local.setItem('familyId', cleanupString);
    // // memory.setItem('ppRevision', cleanupString);
    // local.setItem('studentId', cleanupString);
    // local.setItem('secondaryId', cleanupString);
    // // memory.setItem('stRevision', cleanupString);
    // local.setItem('ppFirst', cleanupString);
    // local.setItem('ppLast', cleanupString);
    // local.setItem('stFirst', cleanupString);
    // local.setItem('stPreferredFirst', cleanupString);
    // local.setItem('stLast', cleanupString);
    // local.setItem('spFirst', cleanupString);
    // local.setItem('spLast', cleanupString);
    // local.setItem('comboName', cleanupString);
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
    // let logString = 'LOG of Pre-Trash User Interface\n==============================';
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
    // logString = 'HOLDER';
    logString = `
    let ppExistsCount = await wixData.query("person")
        .eq("personId", '` + staffIdentifiedFamilyId + `')
        .eq("termId", '` + termId + `')
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
            .eq("termId", '` + termId + `')
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
            .eq("termId", '` + termId + `')
            .count();`;
    let spExistsCount = await wixData.query("person")
            .eq("familyId", staffIdentifiedFamilyId)
            .eq("role", 'Secondary')
            .eq("termId", termId)
            .count();
    
    logString += "\n\spExistsCount === " + spExistsCount;


    logString = logBeginString + logString + logEndString;


    // let familyId = local.getItem('staffIdentifiedFamilyId');
    // let termId = local.getItem('termId');
    // let studentLegalFirst = local.getItem('stFirst');
    return logString;
}//END function doPreTrashThreeQueries()

export function uiCopyTextElementThis(elementId = ''){
    if(elementId.length === 0){
        local.setItem('lastErrorString', "Invalid 'elementId' for uiCopyTextElementThis() function");
        return;
    }
    elementId = elementId.substr(0,1) === '#' ? elementId : '#' + elementId;
    // var copyText = document.getElementById("preTrashLog");
    wixWindow.copyToClipboard($w(elementId).value)
    // wixWindow.copyToClipboard($w("#preTrashLog").value)
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


/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export async function btnPreTrashDo_click(event) {
	// pretrashFindFamilyIdTermId();
    await ppDatabasePrepJSON();
    $w('#preTrashLog').value = memory.getItem('ppDatabasePrepJSON');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnPreTrashClear_click(event) {
		doClear('preTrashLog')
}

export function btnGetFamilyId_click(event) {
	$w('#txtFamilyId').value = local.getItem('familyId');
}


/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export async function btnPreTrashDoST_click(event) {
	// pretrashFindStByFamilyIdLegalFirst();
    await stDatabasePrepJSON();
    $w('#preTrashLog').value = memory.getItem('stDatabasePrepJSON');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetTermID_click(event) {
   $w('#txtTermId').value = local.getItem('termId');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetStudentId_click(event) {
   $w('#txStudentId').value = local.getItem('studentId');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetStudentLegalFirst_click(event) {
   $w('#txStudentLegalFirst').value = local.getItem('stFirst');
}



/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnPretrashGetStaffEyeD_click(event) {
    if($w('#txtStaffEyeD').value === $w('#txtFamilyId').value){
        $w('#txtStaffEyeD').value = 'INSTANTIATE';
    }else{
        $w('#txtStaffEyeD').value = $w('#txtFamilyId').value;
    }
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export async function btnPreTrashActEval_click(event) {
	await pretrashActionEvaluationTest();
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnGetSecondaryFirstLast_click(event) {
	$w('#txtSecondaryFirst').value = local.getItem('spFirst');
	$w('#txtSecondaryLast').value = local.getItem('spLast');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnPreTrashLogUI_click(event) {
	doPreTrashLogUI();
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export async function btnPreTrashThreeQueries_click(event) {
	$w('#preTrashLog').value = await doPreTrashThreeQueries(); 
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnCopyPreTrashLog_click(event) {
	uiCopyTextElementThis('preTrashLog');
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnCopySessionEnrollmentJSON_click(event) {
	uiCopyTextElementThis('sessionEnrollmentJSON');
}

export function btnLocalLastError_click(event) {
    //UI Candy (so as not to have to use Drop-Down)
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('ERROR');
}

export function btnLocalLogString_click(event) {
    //UI Candy (so as not to have to use Drop-Down)
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('LOG');
}