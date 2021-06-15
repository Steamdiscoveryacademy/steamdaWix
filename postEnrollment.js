// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/1-hello-world
// import wixCrmBackend from 'wix-crm-backend';
// import {notifications} from 'wix-crm-backend';
// import {tasks} from 'wix-crm-backend';
// import {workflows} from 'wix-crm-backend';
import {local, session, memory} from 'wix-storage';
import wixUsers from 'wix-users';
import { steamdaGetContactFunction } from 'backend/crmModule.jsw'


$w.onReady(function () {
	// Wix.Features.isSupported(Wix.Features.Types.RESIZE_COMPONENT, function(data) {console.log(data)})
	onReadyPostEnrollment();
    doUserInterfaceCleanupCurrent()
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
        local.setItem('termId','202106');
        local.setItem('termLabelKey','custom.t202106');
        local.setItem('weekIdToLabelKeyJSON',`[['custom.w0-2021010102','0101','0102'],['custom.w1-2021060711','0607','0611'],['custom.w2-2021061418','0614','0618'],['custom.w3-2021062125','0621','0625'],['custom.w4-2021062832','0628','0702'],['custom.w5-2021071216','0712','0716'],['custom.w6-2021071923','0719','0723'],['custom.w7-2021072630','0726','0730'],['custom.w8-2021080206','0802','0806'],['custom.w9-2021080913','0809','0813']];`);
        local.setItem('termBeginMMDD','0607');
        local.setItem('termEndMMDD','0813');
    }
}


// ! ====================================================================================================
// ! ====================            <Overall Enrollment Steps Loop-Switch Code>           ==============
// ! ====================        ...for Testing, Running, (perhaps later) Debugging        ==============
// ! ====================================================================================================
export async function doPeformNextStep(){
	$w('#txtCodeLabel').text = 'doPerformNextStep';
	local.setItem('loopExitAfterStep', $w('#ddExitAfterStep').value);
	await doStepLoopSwitch();
	$w('#sessionEnrollmentJSON').value = stepsDisplayStatusAsReturnString("After Completed: " + memory.getItem('enrollmentStepCompleted'))
}
// ø <---------- <doStepLoopSwitch>  ---------->
export async function doStepLoopSwitch() {
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
                ppDatabasePrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stContact':
                stContactPrepJSON()
                console.log('Step: ' + stepKey)
                break;
            case 'PREP_stDatabase':
                stDatabasePrepJSON()
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
export function doInstantiateLoopSwitchStep(){
    let stepStampArrayObject = {};
    stepStampArrayObject.stampArray = [];
    let now = new Date();
    let yyyymm = now.getFullYear() * 100 + now.getMonth() + 1;
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
    local.setItem('uiStDobString',enrollmentObject.family.student.dobString);
    $w('#txtStudentDobString').value = local.getItem('uiStDobString');
    // let memberId = Math.random() > 0.1 ? 'INSTANTIATE' : '777888'
    let memberId = enrollmentObject.family.parent.primary.memberId
	local.setItem('staffIdentifiedFamilyId', memberId);
    local.setItem('wixWebhookId', enrollmentObject.formStack.wixWebhookId)
}
// ø <---------- </doInstantiateLoopSwitchStep> ---------->
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
        let ppPhoneIndex = -1;
		for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
			let element = enrollmentObject.family.phones[index];
			if(element.role === "Primary Parent"){
				ppPhoneIndex = index;
			}
			
		}
		ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;

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
		paramObject.phone = enrollmentObject.family.phones[ppPhoneIndex].phone;
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
        primaryParent.contactInfo.name = {};
        primaryParent.contactInfo.name.first = enrollmentObject.family.parent.primary.first;
        primaryParent.contactInfo.name.last = enrollmentObject.family.parent.primary.last;
        primaryParent.contactInfo.locale = "en-US";
        // ! </FINAL>

        // primaryParent.contactInfo.company = "Forest Associates";
        // primaryParent.contactInfo.jobTitle = "Human Resources";
        // primaryParent.contactInfo.birthdate = "1991-08-01";


        // primaryParent.contactInfo.labelKeys = [];
        // primaryParent.contactInfo.labelKeys[0] = "custom.gender-male";
        // primaryParent.contactInfo.labelKeys[1] = "custom.t202106";
        // primaryParent.contactInfo.labelKeys[2] = "custom.primary-parent";
        primaryParent.contactInfo.labelKeys = [];
        finalLabelKeyArray.forEach(element => {
            // console.log(element);
            primaryParent.contactInfo.labelKeys.push(element);
        });
        //


        primaryParent.contactInfo.emails = [];
        primaryParent.contactInfo.emails[0] = {};
        primaryParent.contactInfo.emails[0].tag = "MAIN";
        // enrollmentObject.family.emails[0].kind = "home";
        primaryParent.contactInfo.emails[0].email = enrollmentObject.family.emails[0].email;
        primaryParent.contactInfo.emails[0].primary = "true";
        // enrollmentObject.family.emails[0].role = "Primary Parent";
        // enrollmentObject.family.emails[0].who = "Shirley";
        // enrollmentObject.family.emails[0].usage = "Personal";

        // primaryParent.contactInfo.emails[1] = {};
        // primaryParent.contactInfo.emails[1].tag = "MAIN";
        // primaryParent.contactInfo.emails[1].email = "qiqgroup+eli9375@gmail.com";
        // primaryParent.contactInfo.emails[1].primary = "true";

        primaryParent.contactInfo.phones = [];
        primaryParent.contactInfo.phones[0] = {};
        primaryParent.contactInfo.phones[0].tag = "MOBILE";
        // enrollmentObject.family.phones[0].kind = "cell";
        primaryParent.contactInfo.phones[0].phone = enrollmentObject.family.phones[0].phone;
        primaryParent.contactInfo.phones[0].primary = "true";
        // enrollmentObject.family.phones[0].role = "Primary Parent";
        // enrollmentObject.family.phones[0].who = "Shirley";
        // enrollmentObject.family.phones[0].usage = "Personal";

        // primaryParent.contactInfo.phones[1] = {};
        // primaryParent.contactInfo.phones[1].tag = "HOME";
        // primaryParent.contactInfo.phones[1].phone = "(579)-264-8376";


        primaryParent.contactInfo.addresses = [];
        primaryParent.contactInfo.addresses[0] = {};
        primaryParent.contactInfo.addresses[0].tag = "HOME";
        primaryParent.contactInfo.addresses[0].address = {};
        primaryParent.contactInfo.addresses[0].address.streetAddress = {};
        primaryParent.contactInfo.addresses[0].address.streetAddress.number = enrollmentObject.family.addresses[0].address.streetAddress.number;
        primaryParent.contactInfo.addresses[0].address.streetAddress.name = enrollmentObject.family.addresses[0].address.streetAddress.name;
        // primaryParent.contactInfo.addresses[0].address.streetAddress.apt = "52";

        primaryParent.contactInfo.addresses[0].address.addressLine2 = enrollmentObject.family.addresses[0].address.streetAddress2;
        primaryParent.contactInfo.addresses[0].address.city = enrollmentObject.family.addresses[0].address.city;
        primaryParent.contactInfo.addresses[0].address.subdivision = enrollmentObject.family.addresses[0].address.subdivision;
        primaryParent.contactInfo.addresses[0].address.postalCode = enrollmentObject.family.addresses[0].address.postalCode;
        primaryParent.contactInfo.addresses[0].address.country = enrollmentObject.family.addresses[0].address.country;
        primaryParent.contactInfo.addresses[0].address.location = {};
        primaryParent.contactInfo.addresses[0].address.location.latitude = enrollmentObject.family.addresses[0].address.location.latitude;
        primaryParent.contactInfo.addresses[0].address.location.longitude = enrollmentObject.family.addresses[0].address.location.longitue;


        primaryParent.contactInfo.extendedFields = {};
        // ! <FINAL>
        primaryParent.contactInfo.extendedFields['custom.lastupdate'] = lastupdate;
        primaryParent.contactInfo.extendedFields['custom.current-region'] = currentRegion;
        primaryParent.contactInfo.extendedFields['custom.timezone-offset'] = timezoneOffest;
        // ! </FINAL>
        // primaryParent.contactInfo.extendedFields.custom['legal-first'] = "Elijah";
        // enrollmentObject.family.student.name.preferred = "Danny";

        // primaryParent.contactInfo.extendedFields.custom.seed = "b53333aa164cc0b1";

        // ø <---------- </doPrimaryParentContactInfo()> ---------->

        paramObjectThis.contactInfo = primaryParent.contactInfo;
    }
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('ppContactPrepJSON',paramJSON);
}

export function ppDatabasePrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('ppDatabasePrepJSON','ppDatabasePrepJSON' + ' PREPPED on ' + timeDateString);
}

export function stContactPrepJSON(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('stContactPrepJSON','stContactPrepJSON' + ' PREPPED on ' + timeDateString);
}

export function stDatabasePrepJSON(){
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

export function ppContactExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('ppContactExecuteUpsert','ppContactExecuteUpsert' + ' EXECUTED on ' + timeDateString);
}

export function ppDatabaseExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('ppDatabaseExecuteUpsert','ppDatabaseExecuteUpsert' + ' EXECUTED on ' + timeDateString);
}

export function stContactExecuteUpsert(){
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    memory.setItem('stContactExecuteUpsert','stContactExecuteUpsert' + ' EXECUTED on ' + timeDateString);
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
// ø <---------- </doEnrollmentCleanupCurrent> ---------->


// ø <---------- <doEnrollmentLogCurrent>  ---------->
export function doEnrollmentLogCurrent(kind = 'DDEFAULT') {
    let kindSupportedArray = ['CODE','STEPS','DATA','DDEFAULT'];
    kind = kindSupportedArray.includes(kind) ? kind : 'DDEFAULT';
    console.warn('kind: ' + kind);

    // ø <code Log for Current Enrollment> mostly for testing
    let logString = '';
    /*Not CURRENT*///logString += '\n' + "local.getItem('ondeckEnrollmentJSON'): " + local.getItem('ondeckEnrollmentJSON'); 
    // ø <DATA>
    if(kind === 'DATA' || kind === 'DDEFAULT'){
        // console.log(kind);
        logString += '\n' + "local.getItem('staffIdentifiedFamilyId'): " + local.getItem('staffIdentifiedFamilyId');
        logString += '\n' + "local.getItem('familyId'): " + local.getItem('familyId');
        logString += '\n' + "memory.getItem('ppRevision'): " + memory.getItem('ppRevision');
        logString += '\n' + "local.getItem('studentId'): " + local.getItem('studentId');
        logString += '\n' + "memory.getItem('stRevision'): " + memory.getItem('stRevision');
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
    // ø <DATA>
    if(kind === 'DATA' || kind === 'DDEFAULT'){
        console.log(kind);
        logString += '\n' + "memory.getItem('yyyymm'): " + local.getItem('yyyymm');
        logString += '\n' + "local.getItem('termId'): " + local.getItem('termId');
        logString += '\n' + "local.getItem('termLabelKey'): " + local.getItem('termLabelKey');
        // logString += '\n' + "local.getItem('termLabelKey'): " + local.getItem('termLabelKey');
        logString += '\n' + "local.getItem('wixWebhookId'): " + local.getItem('wixWebhookId');
        logString += '\n' + "local.getItem('weekIdToLabelKeyJSON'): " + '\n' + local.getItem('weekIdToLabelKeyJSON');
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    return logString;
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentLogCurrent> ---------->

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
	$w("#btnUiStudentID").label = "Student ID: " + local.getItem('studentId');
    let step = memory.getItem('enrollmentStepCompleted') === null ? false : true;
    step = memory.getItem('enrollmentStepCompleted') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCompleted') === "NNOT_AAPPLICABLE" ? false : step;
	$w("#btStepCompleted").label = step ?  memory.getItem('enrollmentStepCompleted') : '';
    step = memory.getItem('enrollmentStepCurrent') === null ? false : true;
    step = memory.getItem('enrollmentStepCurrent') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === "NNOT_AAPPLICABLE" ? false : step;
	$w("#btStepCurrent").label = step ?  memory.getItem('enrollmentStepCurrent') : '';
	$w("#txtStudentDobString").value = local.getItem('uiStDobString');

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
		$w('#sessionEnrollmentJSON').value = doEnrollmentCleanupCurrent();
		doUserInterfaceCleanupCurrent();
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
export async function btnPeformNextStep_click(event) {
	await doPeformNextStep();
	$w('#ddDisplayKind').value = 'CODE';
	$w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('CODE');
	displaySteps();
    doUserInterfaceCleanupCurrent()
}

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnSkipNextStep_click(event) {
	if($w('#radioAreYouSure').value !== 'YES'){
		$w('#sessionEnrollmentJSON').value = "'Skip Next Step' is so critical that it will only be executed if you indicate that you really want to do it.\n\nNo action taken. \nPlease try again or ask for assistance.";
	}else if(memory.getItem('enrollmentStepCurrent') === 'IINSTANTIATE'){
		$w('#sessionEnrollmentJSON').value = "You cannot use 'Skip Next Step' to skip the 'IINSTANTIATE' step. Please proceed normally to execute the 'IINSTANTIATE' step.\n\nNo action taken. \nPlease try again or ask for assistance.";
    }else{
        stepsCycleSteps();
		displaySteps();
        $w('#sessionEnrollmentJSON').value = doEnrollmentLogCurrent('STEPS');
	}
    $w("#radioAreYouSure").value = 'NO';
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

/**
 *	Adds an event handler that runs when the element is clicked.
 *	 @param {$w.MouseEvent} event
 */
export function btnUpdateStudentDOB_click(event) {
	doUpdateStudentDOB()
}