// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { local, session, memory } from 'wix-storage';
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
import { multiplyFor_familyPersonsObject } from 'backend/familyPersonsObject.jsw';
import { getFamilyPersonsObject } from 'backend/familyPersonsObject.jsw';
import { nowISO } from 'backend/utility.jsw'
import wixData from 'wix-data';
import wixWindow from 'wix-window';



/**
 * ! QUICK-FIND UniqueID's for Blocks
 * ! ===============================
 // ø YIKES = something that needs attention do keep here even if none (well one, this) at atthis time
 // ø PRE_TRASH OR PRETRASH_tobeDISABLEDandEventuallyREMOVED: pstEnrSeven202108SALSDoMessaging = maybe short-lived, just for Messaging Function
 // ø pstEnrSeven202108 =  for ALL (prefix of all below)
 // ø pstEnrSeven202108UTILITY = Utilities for work surrounding pstEnrSeven
 // ø pstEnrSeven202108ACTION = Actions OnReady | Next | Perform 
 // ø pstEnrSeven202108ANY = Actions OnReady | Next | Perform 
 // ø pstEnrSeven202108UI = UI Code for  Next && Perform
 // ø pstEnrSeven202108DO = DO Code  for  Next && Perform
 // ø pstEnrSeven202108SALS = Do subset of Enrollment Step Loop-Switch (SALS)
 // ø pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH = Step through ORIG and RETOOL TO individual pstEnrSeven
 // ø pstEnrSeven202108STEP_SALS_LOOP || // pstEnrSeven202108STEP_SALS_SWITCH || 
 // ø pstEnrSeven202108STEP_CORE_SWITCH || // pstEnrSeven202108STEP_UI_SWITCH
 // ø ≈NNN≈ UnResolve Line Numbers - an indication that that area is fast-moving
 // ø QUICK-FIND Step-Thru ==> Starts with OnReadyAction ==> pstEnrSeven202108STEP_R_01
 // ø pstEnrSeven20210825_ActionValueEvaluation  TODAY
 // ø pstEnrSeven20210822_MESSAGING  TODAY
 // ø pstEnrSeven202108getContactByEmailAndNotIdFunction  TODAY
 // ø pstEnrSeven202108ppStContactDedupe  TODAY
 // ø 202109ResolveAndDestroy  TODAY
 // ø 202109_UserInterface  TODAY
 // ø 202109_ActionValueRepeaters  || 202109_ActionValues TODAY
 // ø 202109_DeDupeRepeaters  || 202109_DeDupeCode TODAY
 // ø 202109_processALIASES TODAY
 // ø 202109_Developer TODAY
 // ø 202109_alphaTimeKey
 // ø currentBUG_wixUsers.register
 // ø 202110_Enhanced_BackEnd_ActionValueEvaluation-START
 // ø 202110_instantiateEnrollmentObject
 */


$w.onReady(function () {
    console.groupCollapsed(`$w.onReady(function ()`)
    // ø <UI Disable PP, ST & SP Buttons>
    // ø </UI Disable PP, ST & SP Buttons>
    onReadyPostEnrollment();
    // ø <KLUDGE Applying Back-End>
    // ø <Simple Demogrfx Assignment to local-Storage AFTER onReadyEnrollment>
    // ø ø Make its own onReadyFUNCTION() if it gets munch more involved
    $w('#ppNameBTN').label = local.getItem('ppLast') + ',\n' + local.getItem('ppFirst')
    $w('#stNameBTN').label = local.getItem('stLast') + ',\n' + local.getItem('stFirst')
    $w('#spNameBTN').label = local.getItem('spLast') + ',\n' + local.getItem('spFirst')
    // ø </Simple Demogrfx Assignment to local-Storage AFTER onReadyEnrollment>
    // ø </KLUDGE Applying Back-End>

    // doUserInterfaceCleanupCurrent();// DISABLED 20210906
    memory.setItem('msboxCurrentId', '#mxboxPostEnrollmentSeven');
    let uniqueWatchdogBootstrapKeyArray = ["EMERGENCY","CRITICAL","ERROR","ALERT","WARNING","NOTICE","success","primary","info","secondary","devel"];
    let uniqueWatchdogBootstrapKeyArrayString = '';
    let sufficientWatchdogBootstrapKeyArray = ["EMERGENCY","CRITICAL","ERROR","danger","ALERT","WARNING","NOTICE","success","primary","info","secondary","devel","DEBUG"];
    let sufficientWatchdogBootstrapKeyArrayString = '';
    let comma = '';
    uniqueWatchdogBootstrapKeyArray.forEach(element => {
        uniqueWatchdogBootstrapKeyArrayString += comma + element.toUpperCase();
        comma = ',';
    });
    comma = '';
    sufficientWatchdogBootstrapKeyArray.forEach(element => {
        sufficientWatchdogBootstrapKeyArrayString += comma + element.toUpperCase();
        comma = ',';
    });
    // <EVENTUALLY: local.removeItem() one of them>
    local.setItem('uniqueWatchdogBootstrapKeyArray',uniqueWatchdogBootstrapKeyArrayString);
    local.setItem('sufficientWatchdogBootstrapKeyArray',sufficientWatchdogBootstrapKeyArrayString);
    // </EVENTUALLY: local.removeItem() one of them>

    // console.log('All States Array: ')
    let allStates = $w(memory.getItem('msboxCurrentId')).states;
    let allStatesArray = allStates.map(state => {
        return state.id
    });
    // console.log(allStatesArray);
    memory.setItem('msboxAllStatesList', allStatesArray.toString());
    // console.log(`memory.getItem('msboxAllStatesList')`);
    // console.log(memory.getItem('msboxAllStatesList'));
    memory.setItem('DateDOTgetDate', '0');
    // goToState()
    // console.log('[ready]Next');
    let initLog = 'TTRUE $w.onReady() NEXT';
    console.log(`about to call: msboxPostEnrollmentSevenActionOnReady(${initLog})`)
    msboxPostEnrollmentSevenActionOnReady(initLog)
    console.log(`about to call: wixUsersOnReady()`)
    wixUsersOnReady()
    console.groupEnd()
});


export function onReadyPostEnrollment() {
    console.groupCollapsed(`onReadyPostEnrollment()`)
    let now = new Date();
    let ISO = now.getFullYear() + ("00" + (now.getMonth() + 1)).substr(-2) + ("00" + now.getDate()).substr(-2) + ("00" + now.getHours()).substr(-2) + ("00" + now.getMinutes()).substr(-2) + ("00" + now.getSeconds()).substr(-2);
    if (Number(ISO) < Number("20211015235959")) {
        local.setItem('timezoneOffset', -4);
        local.setItem('tzAbbrv', 'EDT');
        local.setItem('termId', '202106');
        local.setItem('termLabelKey', 'custom.t202106');
        let weekIdToLabelKeyArray = [['custom.w0-2021010102', '0101', '0102'], ['custom.w1-2021060711', '0607', '0611'], ['custom.w2-2021061418', '0614', '0618'], ['custom.w3-2021062125', '0621', '0625'], ['custom.w4-2021062832', '0628', '0702'], ['custom.w5-2021071216', '0712', '0716'], ['custom.w6-2021071923', '0719', '0723'], ['custom.w7-2021072630', '0726', '0730'], ['custom.w8-2021080206', '0802', '0806'], ['custom.w9-2021080913', '0809', '0813']];
        let weekIdToLabelKeyJSON = JSON.stringify(weekIdToLabelKeyArray);
        local.setItem('weekIdToLabelKeyJSON', weekIdToLabelKeyJSON);
        local.setItem('termBeginMMDD', '0607');
        local.setItem('termEndMMDD', '0930');
        local.setItem('termEndYYYYMMDD', '20211031');
        local.setItem('kAppendString', '\n\nNo Action taken.\nPlease try again, or ask for assistance.');
    }
    console.log(`${Number(ISO)} < Number("20211015235959")`)
    console.groupEnd()
}

export function wixUsersOnReady(){
	const user = wixUsers.currentUser;
	const adminShowArray = ['#btnDeveloperOnly'];
	const mgrShowArray = ['#btnSafeUnloadRoles'];
	if(user.loggedIn){
		user.getRoles()
		.then( (roles) => {
			console.log(roles);
			if (roles.some(r => r.name === "Admin")){
				for (var i = 0; i < adminShowArray.length; i++) {
					$w(adminShowArray[i]).show();
				}
			}
			if (roles.some(r => r.name === "Manager" || r.name === "Admin")){
				for (var i = 0; i < mgrShowArray.length; i++) {
					$w(mgrShowArray[i]).show();
				}
			}
		});
	}
}

// ! ====================================================================================================
// ! ====================                <pstEnrSeven doLoop && switchOnly>                ==============
// ! ====================                                ...20210816                       ==============
// ! ====================================================================================================
export async function pstErnSevenStepsArraySwitchLoop(paramObject = { logArrayDeveloper: [] }) {
    // NOTE: using responseObject 'paradigm' but paramObject as 'Blood-Brain-Barrier'
    // pstZEnrSeven202108STEP_SALS_LOOP FUNCTION BEGIN
    // pstZEnrSeven202108STEP_SALS_LOOP  ==> OR Step-byStep ==> pstEnrSeven202108STEP_SALS_01
    // pstZEnrSeven202108STEP_SALS_LOOP  ==> OR Step-byStep ==> pstZEnrSeven202108STEP_SALS_1BY1
    // <replecate doInstantiateExitAfter() with literal 'memory.setItem()' calls>
    let DOX = 'pstEnrSeven202108STEP_SALS_LOOP FUNCTION BEGIN [continue to while()]';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    DOX = 'pstEnrSeven202108STEP_SALS_LOOP  ==> OR Step-byStep ==> pstEnrSeven202108STEP_SALS_1BY1';
    
    DOX = '≈Z110≈ aramObject.currentStepObject AT pstEnrSeven202108STEP_SALS_1BY1 BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);



    let exitAfter = paramObject.currentStepObject.origSteps.lastStep;
    let exitNow = 'FFALSE';
    memory.setItem('loopExitAfterStep', exitAfter);
    memory.setItem('loopExitNow', exitNow);
    //  \_ eventually cleanup with literals, but just fine if never changed
    // </replecate doInstantiateExitAfter() with literal 'memory.setItem()' calls>

    // instantiateLoopSwitchEnrollmentSteps(paramObject.currentStepObject.origSteps.allStepArray);
    // DOX = '≈≈Z118≈ MAYBE MOOT instantiateLoopSwitchEnrollmentSteps(allStepArray)';
    // local.setItem('logString', local.getItem('logString') + ',' + DOX);

    // pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH END
    // pstEnrSeven202108SALS BEGIN
    let validateCCOMPLETE = 'INVALID';
    paramObject.testNumber = (new Date()).getSeconds();
    // ø <KLUDGE: but harmless>
    if((paramObject.currentStepObject.origSteps.allStepArray).length < 2){
        paramObject.currentStepObject.origSteps.allStepArray.push('CCOMPLETE');
    }
    // ø </KLUDGE: but harmless>
    if ((paramObject.currentStepObject.origSteps.allStepArray).length > 1) {
        validateCCOMPLETE = paramObject.currentStepObject.origSteps.allStepArray.pop();
    }
    // ø <ELSE>
    if(validateCCOMPLETE !== 'CCOMPLETE'){
    // if ((validateCCOMPLETE !== 'CCOMPLETE' || paramObject.currentStepObject.origSteps.allStepArray).length === 1) {
        paramObject.messaging.danger = `This Step's Task-Array is InValid`;
        paramObject.logArrayDeveloper.push(`SALS: Invalid validateCCOMPLETE: ${validateCCOMPLETE}`)
        paramObject.messaging.danger = `FORCE ERROR: This Step's Task-Array is InValid`;
        paramObject.logArrayDeveloper.push(`SALS: FORCE ERROR: ${validateCCOMPLETE}`)
        paramObject.logArrayUserInterface.push(`Lorem Ipsum longer Description of the Error.`)
        DOX = `validateCCOMPLETE !== 'CCOMPLETE': SALS RETURN`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        return;
    }
    DOX = '≈Z152≈ paramObject.currentStepObject JUST AFTER validateCCOMPLETE pop()-ed off the final step';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    // ø </ELSE>
    // paramObject.messaging.success = 'Success SALS: Thu 8/13 Afternoon seconds: ' + paramObject.testNumber;
    paramObject.messaging.success = (paramObject.currentStepObject.origSteps.allStepArray).toString() + ': Thu 8/13 Afternoon seconds: ' + paramObject.testNumber;
    



    
    
    // let stepKey = 'DEVEL';
    // doStepSwitch(stepKey);






    if(DOX === 'CHECK FOR WatchdogBootstrap in logString'){
        // let responseString = local.getItem('logString');
        let responseString = local.getItem('logString');
        responseString = responseString.replace(/\n/g, ",");
        // let cowCatcherIndex = 0;
        // let lineFeed = '\\n';
        // while(responseString.indexOf(lineFeed) >= 0 && cowCatcherIndex < 1000){
        //     responseString.replace(lineFeed,',');
        //     cowCatcherIndex++;
        // }
        let responseArray = responseString.split(',');

        let bootstrap2dArray = [];
        let bootstrapList = local.getItem('uniqueWatchdogBootstrapKeyArray');
        let isBootstrap = false;
        let bootstapArray = [];
        let keyBootstrap = 'HOLDER';
        responseArray.forEach(element => {
            isBootstrap = element.indexOf('|') >= 0 ? true : false;
            if(isBootstrap){
                bootstapArray = element.split('|');
                keyBootstrap = (bootstapArray[0]).toUpperCase();
                isBootstrap = bootstrapList.indexOf(keyBootstrap) >= 0 ? true : false;
                if(isBootstrap){
                    bootstrap2dArray.push(bootstapArray);
                }
            }
        });
        // bootstrap2dArray.push(cowCatcherIndex);
    } //END if(DOX === 'CHECK FOR WatchdogBootstrap in logString')
    
    // return;

    // pstZEnrSeven202108STEP_SALS_01 BEGIN
    // let stepsArray = paramObject.stepsArray;

    //<TESTING ONE-BY-ONE>
    DOX = 'pstEnrSeven202108STEP_SALS_1BY1: while (<TESTING ONE-BY-ONE>)';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    
    let stepsArray = paramObject.currentStepObject.origSteps.allStepArray;
    // DOX = `≈≈Z211≈ stepsArray.toString(): ${stepsArray.toString()}`;
    DOX = '≈Z214≈ ';// + 'Is-Good: stepsArray within pstEnrSeven202108STEP_SALS_1BY1 [confirm in Student-Member code-block]';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // let stepsArray = [];
    let testIndex = 0;
    let testBreakIndex = 1;
    let testElement = ''
    // while (testIndex < testBreakIndex) {
    //     testElement = paramObject.stepsArray[testIndex];
    //     local.setItem('logString', local.getItem('logString') + ', STEP: ' + testElement);
    //     stepsArray.push(testElement);
    //     testIndex++;
    // }
    //<TESTING ONE-BY-ONE>
    DOX = 'pstEnrSeven202108STEP_SALS_1BY1: 228';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    // ø <ELSE>
    if (Array.isArray(stepsArray) === false || stepsArray.length < 1) {
        paramObject.logArrayDeveloper.push('{¡ paramObjects.stepsArray INVALID: Not Array or Empty !}');
        DOX = `≈Z220≈ pstEnrSeven202108STEP_SALS_1BY1: if (Array.isArray(stepsArray) === false || stepsArray.length < 1)`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        return;
    }
    if ((stepsArray[0]).length < 1) {
        paramObject.logArrayDeveloper.push('{¡ paramObjects.stepsArray[0] INVALID: length < 1 !}');
        DOX = `≈Z226≈ pstEnrSeven202108STEP_SALS_1BY1: if ((stepsArray[0]).length < 1) [stepsArray[0]: ${stepsArray[0]}]`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        return;
    }
    if (stepsArray[0] === 'COMPLETE') {
        paramObject.logArrayDeveloper.push(`{¡ First Step 'COMPLETE' [¿likely purposeful?] !}`);
        DOX = `≈Z232≈ pstEnrSeven202108STEP_SALS_1BY1: if (stepsArray[0] === 'COMPLETE') [stepsArray[0]: ${stepsArray[0]}]`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        return;
    }
    // ø </ELSE>
    // ! <NEW -- rewrite of below>
    DOX = 'pstEnrSeven202108STEP_SALS_1BY1: <NEW -- rewrite of below>';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    let stepThis = 'PPENDING';
    let stepsArrayCompleted = [];
    DOX = `≈Z234≈ `;// + `pstEnrSeven202108STEP_SALS_1BY1: while (${stepsArray[0]} !== 'CCOMPLETE')`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);


    testIndex = 0;
    testBreakIndex = 777;//leave this here at 777 in order to Backward-DeBug
    let doStepSwitchSupportedStepArray = local.getItem('enrollmentStepListAll').split(',');
    let previouslyCompleted = 0;


    memory.setItem('stepLogString','');// Will Catch All Messages in a pstEnrSeven Group, but can back-up later
    memory.setItem('stepLogStringSecondary','');// Will Catch All Messages in a pstEnrSeven Group, but can back-up later
    memory.setItem('stepResponseBootstrapKey','');// Will Catch All Messages in a pstEnrSeven Group, but can back-up later
    while (stepsArray.length > 0 && testIndex < testBreakIndex) {
        // pstZEnrSeven202108STEP_SALS_LOOP BEGIN ==> pstZEnrSeven202108STEP_SALS_SWITCH
        // pstZEnrSeven202108STEP_SALS_1BY1 LOOP BEGIN
        DOX = 'pstEnrSeven202108STEP_SALS_LOOP BEGIN ==> Jump To ==> pstEnrSeven202108STEP_SALS_SWITCH';
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        DOX = 'pstEnrSeven202108STEP_SALS_1BY1 LOOP BEGIN';
        stepThis = stepsArray.shift();
        memory.setItem('stepThis',stepThis);
        let paramObjectStep = {};
        paramObjectStep.stepKey = stepThis;

        DOX = `≈Z262≈ `;// + `stepsArray.toString(): ${stepsArray.toString()}`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);

        DOX = `≈Z265≈ `;// + `stepsArrayCompleted.toString(): ${stepsArrayCompleted.toString()}`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);


        previouslyCompleted = Math.sign((local.getItem('enrollmentStepCompletedListAll')).indexOf(stepThis) + 1);
        console.log(`≈Z313≈ (${local.getItem('enrollmentStepCompletedListAll')}).indexOf(${stepThis}): ` + (local.getItem('enrollmentStepCompletedListAll')).indexOf(stepThis));
        console.log(`≈Z314≈ previouslyCompleted: ${previouslyCompleted}`);
        paramObjectStep.previouslyCompleted = previouslyCompleted === 1 ? true : false;
        // pstZEnrSeven202108STEP_SALS_SWITCH ==> Begin SWITCH
        // pstZEnrSeven202108STEP_SALS_1BY1 SWITCH BEGIN
        DOX = `pstEnrSeven202108STEP_SALS_SWITCH ==> Begin SWITCH`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        DOX = `pstEnrSeven202108STEP_SALS_1BY1 SWITCH BEGIN`;
        switch (stepThis) {
            case 'ZERO':
                //NON_CORE_Step
                DOX = previouslyCompleted ? `≈NNN≈ previouslyCompleted: ${stepThis}` : `≈NNN≈ ≈i${testIndex}≈ case '${stepThis}': RAW: case-handled thisStep ZERO as Null`;
                local.setItem('logString', local.getItem('logString') + ',' + DOX);
                onRampZERO(paramObject);
                await doStepUserInterfaceSwitch(stepThis,paramObjectStep);
                break;
        
            case 'ResolveAndDestroy':
                // 202109ResolveAndDestroy
                //NON_CORE_Step
                DOX = previouslyCompleted ? `≈NNN≈ previouslyCompleted: ${stepThis}` : `≈NNN≈ ≈i${testIndex}≈ case '${stepThis}': RAW: case-handled thisStep ResolveAndDestroy as CleanUp`;
                local.setItem('logString', local.getItem('logString') + ',' + DOX);
                await doResolveAndDestroy();
                await doStepUserInterfaceSwitch(stepThis,paramObjectStep);
                break;
        
            case 'OffRamp':
                //NON_CORE_Step
                DOX = previouslyCompleted ? `≈NNN≈ previouslyCompleted: ${stepThis}` : `≈NNN≈ ≈i${testIndex}≈ case '${stepThis}': RAW: case-handled thisStep OffRamp as Special [link to 'Process Web Hooks' will make 'Go To Next Step' Moot]`;
                local.setItem('logString', local.getItem('logString') + ',' + DOX);
                await doStepUserInterfaceSwitch(stepThis,paramObjectStep);
                break;
        
            default:
                if (previouslyCompleted) {
                    await doStepUserInterfaceSwitch(stepThis,paramObjectStep);
                    DOX = `≈NNN≈ previouslyCompleted: ${stepThis}`;
                    paramObject.messaging.info = DOX;
                    local.setItem('logString', local.getItem('logString') + ',' + DOX);
                }else if(doStepSwitchSupportedStepArray.includes(stepThis)){
                    DOX = `≈NNN≈ ≈i${testIndex}≈ doStepSwitch('${stepThis}'): RAW: will be handled by doStepSwitch(stepThis);`;
                    paramObject.messaging.info = DOX;
                    local.setItem('logString', local.getItem('logString') + ',' + DOX);
                    // DOX = `pstEnrSeven202108STEP_SALS_SWITCH ==> Actual Orig SWITCH ==> pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH`;
                    DOX = `pstEnrSeven202108STEP_SALS_SWITCH ==> Actual Orig SWITCH ==> pstEnrSeven202108STEP_SALS_EXE_SWITCH`;
                    local.setItem('logString', local.getItem('logString') + ',' + DOX);
                    await doStepSwitch(stepThis);
                    await doStepUserInterfaceSwitch(stepThis,paramObjectStep);
                    DOX = `pstEnrSeven202108STEP_SALS_SWITCH ==> Actual Orig SWITCH ==> pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH`;
                    local.setItem('logString', local.getItem('logString') + ',' + DOX);
                }else{
                    DOX = `≈NNN≈ ≈i${testIndex}≈ TODO stepThis === '${stepThis}': RAW: un-handled TBD`;
                    paramObject.messaging.info = DOX;
                    local.setItem('logString', local.getItem('logString') + ',' + DOX);
                }
                break;
        }
        // pstZEnrSeven202108STEP_SALS_1BY1 SWITCH END
        // pstZEnrSeven202108STEP_SALS_SWITCH ==> End SWITCH ==> pstZEnrSeven202108STEP_SALS_LOOP
        DOX = 'pstEnrSeven202108STEP_SALS_1BY1 SWITCH END';
        DOX = 'pstEnrSeven202108STEP_SALS_SWITCH ==> End SWITCH ==> Continue with LOOP ==> pstEnrSeven202108STEP_SALS_LOOP';
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        
        if(previouslyCompleted === 0){
            stepsArrayCompleted.push(stepThis);
            local.setItem('enrollmentStepCompletedListAll', local.getItem('enrollmentStepCompletedListAll') + ',' + stepThis );
        }




        // let stepKey = 'DEVEL';



    


        testIndex++;
        // pstZEnrSeven202108STEP_SALS_LOOP END
        DOX = 'pstEnrSeven202108STEP_SALS_LOOP ==> LOOP END ==> Continue with FUNCTION';
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
    }
    // ! </NEW -- rewrite of below>
    // ! <MIGHT BE FINE -- rewrite above anyway>
    let key = 'PPENDING';
    let exitLoopHere = false;
    // exitLoopHere = stepsArray[0] === 'CCOMPLETE' ? true : exitLoopHere;
    // exitLoopHere = stepsArray[0] === 'ZERO' ? true : exitLoopHere;
    let indexCowCatcher = 999;
    DOX = 'pstEnrSeven202108STEP_SALS_1BY1 ==> FUNCTION END ==> Return to pstEnrSeven ==> pstEnrSeven202108STEP_P_04RETURN';
    DOX = 'pstEnrSeven202108STEP_SALS_LOOP ==> FUNCTION END ==> Return to pstEnrSeven ==> pstEnrSeven202108STEP_P_04RETURN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
    // ø <onRamp-ZERO-ResolveAndDestroy-offRamp>
    /**
     *  and any other Miscellaneous Code NOT part of the Code
     *  aka NON_CORE_Step
     */
    // ø <---------- <onReadyToOnRamp NON_CORE_Step> ---------->
    export async function onReadyToOnRamp(responseObject = {}){
        if(typeof responseObject.logArrayDeveloper === 'undefined'){
            let DOX = `≈451≈ onReadyToOnRamp: responseObject.logArrayDeveloper was undefined`;
            local.setItem('logString', local.getItem('logString') + ',' + DOX);
            responseObject.logArrayDeveloper = [];
        }
        let DOX = `≈NNN≈ onReadyToOnRamp: RAW: script for thisStep onReady as Null`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        DOX = 'Primary Override within onReadyToOnRamp()';
        await appendStepLogPPEQ('primary', DOX);
        // ø <OnReady UI for Secondary and Staff-Eye-D>
        let applicationObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
        let staffEyeD = applicationObject.family.parent.primary.memberId;
        let secondaryExists = typeof applicationObject.family.parent.secondary === 'object' && typeof applicationObject.family.parent.secondary.first === 'string' && (applicationObject.family.parent.secondary.first).length > 0 ? true : false;
        responseObject.logArrayDeveloper.push(`secondaryExists: ${secondaryExists}`);
        let theseObjectKeys = Object.keys(applicationObject.family.parent);
        if (!secondaryExists) {
            responseObject.logArrayDeveloper.push('!secondaryExists : disable buttons');
            responseObject.logArrayDeveloper.push('{¿ ONCE for `stateZero` yes?: ' + memory.getItem('msboxLastState') + ' ?}');
            $w('#btnSecondaryIdLabel').disable();
        }
        if (staffEyeD === 'INSTANTIATE' || staffEyeD === 'IINSTANTIATE') {
            responseObject.logArrayDeveloper.push('staffEyeD is IINSTANTIATE: hide-buttons');
            responseObject.logArrayDeveloper.push('{¿ ONCE for `stateZero` yes?: ' + memory.getItem('msboxLastState') + ' ?}');
        } else {
            responseObject.logArrayDeveloper.push('staffEyeD is not IINSTANTIATE: enable-buttons');
            responseObject.logArrayDeveloper.push('{¿ ONCE for `stateZero` yes?: ' + memory.getItem('msboxLastState') + ' ?}');
            local.setItem('staffIdentifiedFamilyId', staffEyeD);
            $w("#btnStaffEyeD").label = local.getItem('staffIdentifiedFamilyId');
        }
        // ø <OnReady UI for Secondary and Staff-Eye-D>
        await salsDoMessagingReponsesApply(responseObject);
    }
    // ø <---------- </onReadyToOnRamp NON_CORE_Step> ---------->
    // ø <---------- <onRampZERO NON_CORE_Step> ---------->
    export function onRampZERO(paramObject = {}){
        let DOX = `≈NNN≈ onRampZERO: RAW: script for thisStep ZERO as Null`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
    }
    // ø <---------- </onRampZERO NON_CORE_Step> ---------->
 
    // ø <---------- <doResolveAndDestroy NON_CORE_Step>  ---------->
    export async function doResolveAndDestroy(){
        // 202109ResolveAndDestroy
        // 202109ResolveAndDestroy_RESOLVE
        await appendSessionEnrollmentLogs()
        let resolve = true;
        let destroy = true;
        if (resolve) {
            // RESOLVE:
            // let statusThis = $w('#ddCurrentStatusUpdate').value;
            // let statusThis = $w('#ddCurrentStatusUpdate').value;
            let statusThis = 'RESOLVED';
            await doUpdateThisWebhookPayload(statusThis);
            await updateStatusWebhookPayloadThis(true);
            // local.setItem('logString', local.getItem('logString') + '[~528]completed doUpdateThisWebhookPayload(RESOLVED)');
            // local.setItem('logString', local.getItem('logString') + '[~530]completed updateStatusWebhookPayloadThis(true)');
            // console.log('[`3215] RESOLVE: Yes')
        }

        if (destroy) {
            // DESTROY:
            // memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
            local.setItem('logString', local.getItem('logString') + '[~535]entering btCleanUpAllIncludingnrJSON_click:YES');
            let responseCleanupCurrentState = doEnrollmentCleanupByKind('ALL_INCLUDING_ENROLLMENT');//HINT: backdoor: MURDERREDRUM
            local.setItem('logString', local.getItem('logString') + '\n[~537]exiting btCleanUpAllIncludingnrJSON_click:YES');
        }
        $w('#sessionEnrollmentJSON').value = local.getItem(('logString'));//FOR NOW

    }
    // ø <---------- </doResolveAndDestroy NON_CORE_Step> ---------->
    // ø <---------- <appendSessionEnrollmentIdsBeforeResolveAndDestroy NON_CORE_NonStep> ---------->
    export async function appendSessionEnrollmentLogs(){
        // 202109_alphaTimeKey
        let logElement = {}
        logElement._id = alphaTimeKey()
        // logElement._id = 'ZXZ'
        logElement.familyId = local.getItem('familyId')
        logElement.studentId = local.getItem('studentId')
        logElement.secondaryId = typeof local.getItem('secondaryId') !== 'string' || local.getItem('secondaryId').length < 20 ? 'NA' : local.getItem('secondaryId')
        session.setItem('postedEnrollmentLastKey',logElement._id)
        session.setItem('postedEnrollmentLastElement', JSON.stringify(logElement))
        let isValid = typeof session.getItem('postedEnrollmentElementArray') !== 'string' || session.getItem('postedEnrollmentElementArray').length < 2 ? false : true;
        let postedEnrollmentElementArrayObject = isValid ? JSON.parse(session.getItem('postedEnrollmentElementArray')) : [];
        postedEnrollmentElementArrayObject.push(logElement);
        session.setItem('postedEnrollmentElementArray',JSON.stringify(postedEnrollmentElementArrayObject))
    }
    // ø <---------- </appendSessionEnrollmentIdsBeforeResolveAndDestroy NON_CORE_NonStep> ---------->
 
    // ø </onRamp-ZERO-ResolveAndDestroy-offRamp>


// ! ====================================================================================================
// ! ====================                </pstEnrSeven doLoop && switchOnly>               ==============
// ! ====================                                ...20210816                       ==============
// ! ====================================================================================================
// ! ====================================================================================================
// ! ====================            <Overall Enrollment Steps Loop-Switch Code>           ==============
// ! ====================        ...for Testing, Running, (perhaps later) Debugging        ==============
// ! ====================================================================================================

export async function doPeformNextStep() {
    local.setItem('logString', local.getItem('logString') + '\n[~Z50]entering: ' + 'doPeformNextStep()')
    local.setItem('loopExitAfterStep', $w('#ddExitAfterStep').value);
    await doStepLoopSwitch();
    local.setItem('logString', local.getItem('logString') + '\n[~Z58]After Completed: ' + memory.getItem('enrollmentStepCompleted'))
}



// ø <---------- <doStepSwitch>  ---------->
// pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH
export async function doStepSwitch(stepKey = 'PPENDING') {
    let DOX = `≈Z450≈ pstEnrSeven202108STEP_SALS_EXE_SWITCH BEGIN`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // pstEnrSeven202108STEP_CORE_SWITCH
    let errorString = '';
    switch (stepKey) {
        // ø <stateSteps> BEGIN
        case 'IINSTANTIATE':
            // ø <stateInstantiate>
            memory.setItem('stepResponseBootstrapKey','success');//assumption
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await doInstantiateLoopSwitchStep();
            }
            // pstEnrSeven202108STEP_CORE_SWITCH
            console.log('Step: ' + stepKey)
            break;
            // ø </stateInstantiate>
        case 'PREP_ppMember':
            // ø <stateMemberConfirm>
            memory.setItem('stepResponseBootstrapKey','success');//assumption
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppMemberPrepJSON()
            }
            // pstEnrSeven202108STEP_CORE_SWITCH
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppMember':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppMemberExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stMember':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await stMemberPrepJSON()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stMember':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await stMemberExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
            // ø </stateMemberConfirm>


        case 'dedupePpStContact':
            // 202109_DeDupeCode
            // ø <stateDupeDelete>
            memory.setItem('stepResponseBootstrapKey','success');//assumption
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppStContactDedupe()
            }
            console.log('Step: ' + stepKey)
            break;
            // ø </stateDupeDelete>



        case 'PREP_ppContact':
            // ø <stateDatabaseForPrimaryAndStudent>
            memory.setItem('stepResponseBootstrapKey','success');//assumption
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppContactPrepJSON()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_ppDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppDatabasePrepJSON()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stContact':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await stContactPrepJSON()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await stDatabasePrepJSON()
            }
            console.log('Step: ' + stepKey)
            break;
            // ø </stateDatabaseForPrimaryAndStudent>
        case 'PREP_spContact':
            // ø <stateDatabaseForPrimaryAndStudent>
            memory.setItem('stepResponseBootstrapKey','success');//assumption
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await spContactPrepJSON()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_spDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                // /*await spDatabasePrepJSON()*/
                await spDatabaseExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~Z116]Function-Swapped to ppDatabaseExecuteUpsert()')
            break;
        case 'EXECUTE_ppContact':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppContactExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await ppDatabaseExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stContact':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await stContactExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await stDatabaseExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
            // ø </stateDatabaseForPrimaryAndStudent>
        case 'EXECUTE_spContact':
            // ø <stateContactAndDatabaseForSecondary>
            memory.setItem('stepResponseBootstrapKey','success');//assumption
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                await spContactExecuteUpsert()
            }
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_spDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'success'){
                // /*spDatabaseExecuteUpsert()*/
                await spDatabasePrepJSON()
            }
            local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~Z133]Function-Swapped to await spDatabasePrepJSON()')
            console.log('Step: ' + stepKey)
            break;
            // ø </stateContactAndDatabaseForSecondary>
        case 'CCOMPLETE':
            console.log('Step: ' + stepKey)
            break;

        default:
            errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
            break;
    }
    DOX = `≈Z602≈ ==> pstEnrSeven202108STEP_SALS_EXE_SWITCH ==> Return to pstEnrSeven SWITCH ==> pstEnrSeven202108STEP_SALS_SWITCH`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH
// ø <---------- </doStepSwitch> ---------->

// ! ====================================================================================================
// ! ====================                          <USER-INTERFACT>                        ==============
// ! ====================================================================================================
// ! ====================                    <doStepUserInterfaceSwitch>                   ==============
// ! ====================              ...core to the 202109_UserInterface BEGIN           ==============
// ! ====================================================================================================

// ø <---------- <doStepUserInterfaceSwitch>  ---------->
export async function doStepUserInterfaceSwitch(stepKey = 'PPENDING',paramObjectStep = {}) {
    // pstEnrSeven202108STEP_UI_SWITCH
    // 202109_UserInterface
    let DOX = `≈Z450≈ pstEnrSeven202108STEPUI BEGIN`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    let errorString = '';
    // ø <For All Steps>
    let nonSuccessResponseKeyArray = ['warning','danger'];//just use TRUE Bootstrap lowercase keys, and catch in Secondary if every a problem
    let ppeqDefaultIndicated = false
    ppeqDefaultIndicated = nonSuccessResponseKeyArray.includes(memory.getItem('stepResponseBootstrapKey'));
    ppeqDefaultIndicated = (memory.getItem('stepLogString')).indexOf(memory.getItem('stepResponseBootstrapKey')) >= 0 ? false : ppeqDefaultIndicated;
    if(ppeqDefaultIndicated){
        await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
    }
    // ø </For All Steps>
    let responseKey = 'unknown';
    let responseMessage = 'DEFAULT';
    switch (stepKey) {
        // ø <NON-CORE Steps for UserInterface Only>
        // ø <stateSteps> BEGIN
        case 'ZERO':
            // ø <stateOnramp>
            // ø <assign UI Demografx>
            // $w('#btnPrimaryName').label = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
            // $w('#btnPrimaryName').enable();
            // $w('#btnStudentName').label = local.getItem('stFirst') + ' ' + local.getItem('stLast');
            // $w('#btnStudentName').enable();
            // let spName = (local.getItem('spFirst') + ' ' + local.getItem('spLast')).trim();
            // if(spName.length > 0){
            //     $w('#btnSecondaryName').label = spName;
            //     $w('#btnSecondaryName').enable();
            //     $w('#btnSecondaryIdLabel').enable();
            // }
            // ø </assign UI Demografx>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            // ø <Singleton - NO - Catch of >
            let switchIndex = Math.floor(Math.random() * 4);
            switchIndex = 4;
            switch (switchIndex) {
                case 1:
                    await appendStepLogPPEQ('warning', 'Override Base Success with Different Warning within onRampZERO(1)');
                    await appendStepLogPPEQ('danger', 'Override Base Success with Different Danger within onRampZERO(1)');
                    break;
                case 2:
                    await appendStepLogPPEQ('warning', 'Override Base Success with Different Warning within onRampZERO(2)');
                    // await appendStepLogPPEQ('danger', 'Override Base Success with Different Danger within onRampZERO(2)');
                    break;
                case 3:
                    // await appendStepLogPPEQ('warning', 'Override Base Success with Different Warning within onRampZERO(3)');
                    await appendStepLogPPEQ('danger', 'Override Base Success with Different Danger within onRampZERO(3)');
                    break;
            
                default:
                    //NEITHER
                    break;
            }
        
            console.log('UI Non-Core-Step: ' + stepKey)
            break;
            // ø </stateOnramp>
        case 'ResolveAndDestroy':
            // ø <stateResolveAndDestroy>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            $w('#btnEnrollmentLandngPage').expand();
            $w('#btnPeSevenNext').collapse();
            console.log('UI Non-Core-Step: ' + stepKey)
            break;
            // ø </stateResolveAndDestroy>
        case 'OffRamp':
            // ø <stateOfframp>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Non-Core-Step: ' + stepKey)
            break;
            // ø </stateOfframp>
        // ø </NON-CORE Steps for UserInterface Only>
        case 'IINSTANTIATE':
            // ø <stateInstantiate>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }

            // 202109_ActionValueRepeaters
            let actionValueRepeatersParamObject = {};
            actionValueRepeatersParamObject.prepKey = 'stateInstantiate';
            await loadActionValueRepeatersWithJSON(actionValueRepeatersParamObject);

            // ø <KLUDGE memory => session>
            session.setItem('ppAction',memory.getItem('ppAction'))
            session.setItem('stAction',memory.getItem('stAction'))
            session.setItem('spAction',memory.getItem('spAction'))
            // ø ø <Duplicates for DEVEL during Transition to Robust Action-Value-Evaluation>
            // ø ø ø NOTE: considered using 'memory.getItem('ppAction') [and so on...]
            // memory.setItem('ppAction202109', ppAction);
            // memory.setItem('stAction202109', stAction);
            // memory.setItem('spAction202109', spAction);
            // ø ø </Duplicates for DEVEL during Transition to Robust Action-Value-Evaluation>
            // ø </KLUDGE memory => session>
            // ø <KLUDGE New Back-End UI>
            populateOriginalActionValueButtons()
            populateNewActionValueButtons()
            // ø </KLUDGE New Back-End UI>
            console.log('UI Step: ' + stepKey)
            // $w('#txtActionValueGridDescr').hide();
            // $w('#boxActionValueGrid').show();
            break;
            // ø </stateInstantiate>
        case 'PREP_ppMember':
            // ø <stateMemberConfirm>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            // if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            // }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_ppMember':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'PREP_stMember':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_stMember':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            // $w('#btnFamilyId').label = local.getItem('familyId');
            // $w('#btnFamilyId').enable();
            // $w('#btnStudentId').label = local.getItem('studentId');
            // † Names
            // † Emails
            responseKey =  memory.getItem('stepResponseBootstrapKey').toLowerCase();
            // $w('#btnStudentId').enable();
            // await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${responseKey.toUpperCase()} in UI`);
            // $w('#btnStudentId').enable();
            break;
            // ø </stateMemberConfirm>
        case 'dedupePpStContact':
            // ø <stateDupeDelete>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey);
            // responseKey =  memory.getItem('stepResponseBootstrapKey').toLowerCase();
            console.log('UI responseKey: ' + responseKey);

            // responseMessage = memory.getItem('stepResponseBootstrapKey').toLowerCase() === 'success' ? 'DEFAULT';
            // responseMessage = memory.getItem('stepResponseBootstrapKey').toLowerCase() === 'success' ? 'The Anomaly was Not Present [ui]' : responseMessage;
            // responseMessage = memory.getItem('stepResponseBootstrapKey').toLowerCase() === 'warning' ? 'The Anamaly was Present and Dealt With Successfully [ui]' : responseMessage;
            // responseMessage = memory.getItem('stepResponseBootstrapKey').toLowerCase() === 'danger' ? 'The Anomaly was Present and the Developer Needs to be Consulted [ui]' : responseMessage;
            // await appendStepLogPPEQ(responseKey, `Response Message for Key ${responseKey.toUpperCase()} in UI`);
            break;
            // ø </stateDupeDelete>
        case 'PREP_ppContact':
            // ø <stateDatabaseForPrimaryAndStudent>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'PREP_ppDatabase':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'PREP_stContact':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'PREP_stDatabase':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
            // ø </stateDatabaseForPrimaryAndStudent>
        case 'PREP_spContact':
            // ø <stateContactForPrimaryAndStudent>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'PREP_spDatabase':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_ppContact':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_ppDatabase':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_stContact':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_stDatabase':
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
            // ø </stateContactForPrimaryAndStudent>
        case 'EXECUTE_spContact':
            // ø <stateContactAndDatabaseForSecondary>
            // if(memory.getItem('stepResponseBootstrapKey') !== 'success' && memory.getItem('stepResponseBootstrapKey') !== 'secondary'){
            //     await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Response Message for Key ${(memory.getItem('stepResponseBootstrapKey')).toUpperCase()} in UI`);
            //     memory.setItem('stepResponseBootstrapKey','secondary');//for remainder of stateStep
            // }
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
        case 'EXECUTE_spDatabase':
            if(memory.getItem('stepResponseBootstrapKey') === 'secondary'){
                await appendStepLogPPEQ(memory.getItem('stepResponseBootstrapKey'), `${stepKey} Secondary Message in UI`);
            }
            console.log('UI Step: ' + stepKey)
            break;
            // ø </stateContactAndDatabaseForSecondary>
        // ø </stateSteps> END
        case 'CCOMPLETE':
            console.log('UI Step: ' + stepKey)
            break;

        default:
            errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
            break;
    }
    if(paramObjectStep.previouslyCompleted){
        await appendStepLogPPEQ('info', `The '${stepKey}' Step has already been completed, the UI indicates this`);
    }

}
// ø <---------- </doStepUserInterfaceSwitch> ---------->
// ! ====================================================================================================
// ! ====================         </doStepUserInterfaceSwitch> 202109_UserInterface        ==============
// ! ====================================================================================================


// ! ====================================================================================================
// ! ====================                 <loadActionValueRepeatersWithJSON>               ==============
// ! ====================             ...core to the Enrollment Testing Process            ==============
// ! ====================================================================================================
// ø <---------- <loadActionValueRepeatersWithJSON>  ---------->
 export async function loadActionValueRepeatersWithJSON(paramObject = {}) {
     // 202109_UserInterface
    //  202109_ActionValueRepeaters
    let prepKey = typeof paramObject.prepKey !== 'string' ? 'MISSING' : paramObject.prepKey;
    paramObject.prepKey = prepKey;
    let actionValuesJSON/*take_20_FAUX*/ = `{"headerRepeater":{"headerRepeaterArray":[{"title":"Who","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_6755546f08b24ed9861b1f629e17cabb~mv2.png","doxColumn":"header_who","_id":"1"},{"title":"Member","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_760601a9aeca428aadcc29d99a6558ec~mv2.png","doxColumn":"header_member","_id":"2"},{"title":"Contact","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5274995693c04d1ab87b61ab8b23c94e~mv2.png","doxColumn":"header_contact","_id":"3"},{"title":"Data-Base","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5104d8acb3d2450c8b23ef9c4cb0d362~mv2.png","doxColumn":"header_database","_id":"4"}]},"primaryRepeater":{"primaryRepeaterArray":[{"title":"Primary","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_6755546f08b24ed9861b1f629e17cabb~mv2.png","doxColumn":"who","_id":"1"},{"title":"ppMMBR","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_760601a9aeca428aadcc29d99a6558ec~mv2.png","doxColumn":"member","_id":"2"},{"title":"ppCTCT","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5274995693c04d1ab87b61ab8b23c94e~mv2.png","doxColumn":"contact","_id":"3"},{"title":"ppDB","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5104d8acb3d2450c8b23ef9c4cb0d362~mv2.png","doxColumn":"database","_id":"4"}]},"studentRepeater":{"studentRepeaterArray":[{"title":"Student","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_6755546f08b24ed9861b1f629e17cabb~mv2.png","doxColumn":"Who","_id":"1"},{"title":"stMMBR","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_760601a9aeca428aadcc29d99a6558ec~mv2.png","doxColumn":"member","_id":"2"},{"title":"stCTCT","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5274995693c04d1ab87b61ab8b23c94e~mv2.png","doxColumn":"contact","_id":"3"},{"title":"stDB","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5104d8acb3d2450c8b23ef9c4cb0d362~mv2.png","doxColumn":"database","_id":"4"}]},"secondaryRepeater":{"secondaryRepeaterArray":[{"title":"Secondary","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_6755546f08b24ed9861b1f629e17cabb~mv2.png","doxColumn":"Who","_id":"1"},{"title":"spMMBR","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_760601a9aeca428aadcc29d99a6558ec~mv2.png","doxColumn":"member","_id":"2"},{"title":"spCTCT","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5274995693c04d1ab87b61ab8b23c94e~mv2.png","doxColumn":"contact","_id":"3"},{"title":"spDB","titleSub":"","boxColor":"https://static.wixstatic.com/media/523205_5104d8acb3d2450c8b23ef9c4cb0d362~mv2.png","doxColumn":"database","_id":"4"}]}}`;
    // let actionValueRepeatersObject = JSON.parse($w('#txtbxActionValuesJSON').value)
    let actionValueRepeatersObject = JSON.parse(actionValuesJSON)
    console.dir(actionValueRepeatersObject);
	// ø <Header>
	let headerId = 'rptrHeader';
	let headerRepeaterArray = actionValueRepeatersObject.headerRepeater.headerRepeaterArray;
    paramObject.repeaterId = headerId;
    paramObject.repeaterArray = headerRepeaterArray;
	// headerRepeaterArray = await prepRepeaterArray(headerId,headerRepeaterArray);
	headerRepeaterArray = await prepRepeaterArray(paramObject);

	await loadRepeaterWithArray(headerId,headerRepeaterArray);
	// ø </Header>
	
	// // ø <Pimary>
	let primaryId = 'rptrPrimary';
	let primaryRepeaterArray = actionValueRepeatersObject.primaryRepeater.primaryRepeaterArray;
    paramObject.repeaterId = primaryId;
    paramObject.repeaterArray = primaryRepeaterArray;
	// primaryRepeaterArray = await prepRepeaterArray(primaryId,primaryRepeaterArray);
	primaryRepeaterArray = await prepRepeaterArray(paramObject);
    
	await loadRepeaterWithArray(primaryId,primaryRepeaterArray);
	// // ø </Primary>
	
	// // ø <Student>
	let studentId = 'rptrStudent';
	let studentRepeaterArray = actionValueRepeatersObject.studentRepeater.studentRepeaterArray;
     
    paramObject.repeaterId = studentId;
    paramObject.repeaterArray = studentRepeaterArray;
	// studentRepeaterArray = await prepRepeaterArray(studentId,studentRepeaterArray);
	headerRepeaterArray = await prepRepeaterArray(paramObject);
 

	await loadRepeaterWithArray(studentId,studentRepeaterArray);
	// // ø </Student>
	
	// // ø <Secondary>
	let secondaryId = 'rptrSecondary';
	let secondaryRepeaterArray = actionValueRepeatersObject.secondaryRepeater.secondaryRepeaterArray;
     
    paramObject.repeaterId = secondaryId;
    paramObject.repeaterArray = secondaryRepeaterArray;
	// secondaryRepeaterArray = await prepRepeaterArray(secondaryId,secondaryRepeaterArray);
	headerRepeaterArray = await prepRepeaterArray(paramObject);
 

	await loadRepeaterWithArray(secondaryId,secondaryRepeaterArray);
	// // ø </Secondary>

}
// ø <---------- </loadActionValueRepeatersWithJSON> ---------->

// ø <---------- <prepRepeaterArray>   ---------->
export async function prepRepeaterArray(paramObject = {}){
    // 202109_UserInterface
    // 202109_ActionValueRepeaters
    console.groupCollapsed('prepRepeaterArray()');
    let nullActionString = '–';
    let repeaterId = paramObject.repeaterId;
    let repeaterArray = paramObject.repeaterArray;
    console.log(`repeaterId: ${repeaterId}`);
	let prepKind = 'PENDING';
	prepKind = repeaterId.indexOf('Header') >= 0 ? 'header' : prepKind;
	prepKind = repeaterId.indexOf('Primary') >= 0 ? 'primary' : prepKind;
	prepKind = repeaterId.indexOf('Student') >= 0 ? 'student' : prepKind;
	prepKind = repeaterId.indexOf('Secondary') >= 0 ? 'secondary' : prepKind;

    console.log(`prepKind: ${prepKind}`);
	let noPrepRequiredPrepKindArray = ['header'];
	if(noPrepRequiredPrepKindArray.includes(prepKind)){
        console.log('return: repeaterArray Unchanged');
        console.groupEnd();
		return repeaterArray;
	}
    let actionArrayString = 'error|error|error';
    let actionArray = [];
    // let prepKey = paramObject.prepKey; NO USE local-Storage
    let prepKey = local.getItem('superEnrollmentStatus');
    let index = -1;
    switch (prepKey) {
        case 'CONTINUE':
            actionArrayString = prepKind === 'primary' ? memory.getItem('ppAction') : actionArrayString;
            actionArrayString = prepKind === 'student' ? memory.getItem('stAction') : actionArrayString;
            actionArrayString = prepKind === 'secondary' ? memory.getItem('spAction') : actionArrayString;
            actionArray = actionArrayString.split('|');
            console.log(`actionArrayString: ${actionArrayString}`);
            nullActionString = 'CONT'
            repeaterArray.forEach(elementObject => {
                if(index >= 0){
                    elementObject.title = actionArray[index];
                }
                index++;
            });
            break;
        case 'PENDING':
            // nullActionString = 'PEND'
            repeaterArray.forEach(elementObject => {
                if(index >= 0){
                    elementObject.title = nullActionString;
                }
                index++;
            });
            break;
    
        default:
            repeaterArray.forEach(elementObject => {
                if(index >= 0){
                    nullActionString = '{% alert %}';// OR WHATEVER
                    elementObject.title = nullActionString;
                }
                index++;
            });
            break;
    }
    console.groupEnd();

	return repeaterArray;
}
// ø <---------- </prepRepeaterArray>  ---------->

// ø <---------- <loadRepeaterWithArray>  ---------->
export async function loadRepeaterWithArray(repeaterId, preppedCourseRepeaterArray = []){
    // 202109_UserInterface
    // 202109_ActionValueRepeaters
	if(repeaterId.substr(0,1) !== '#'){
		repeaterId = '#' + repeaterId;
	}
	// ø <ELSE>
	if($w(repeaterId).rendered === false){
		return;
	}
	// ø </ELSE>

	let prepKind = 'PENDING';
	prepKind = repeaterId.indexOf('Header') ? 'header' : prepKind;
	prepKind = repeaterId.indexOf('Primary') ? 'primary' : prepKind;


	$w(repeaterId).data = preppedCourseRepeaterArray;
	let titleId = 'PENDING';
	let titleSubId = 'PENDING';
	let boxId = 'PENDING';
	titleId = repeaterId === '#rptrHeader' ? '#txtHdrTitle' : titleId;
	titleId = repeaterId === '#rptrPrimary' ? '#txtPrimaryTitle' : titleId;
	titleId = repeaterId === '#rptrStudent' ? '#txtStudentTitle' : titleId;
	titleId = repeaterId === '#rptrSecondary' ? '#txtSecondaryTitle' : titleId;

	// titleSubId = repeaterId === '#rptrHeader' ? 'NA' : titleSubId;
	titleSubId = repeaterId === '#rptrPrimary' ? '#txtPrimaryTitleSub' : titleSubId;
	titleSubId = repeaterId === '#rptrStudent' ? '#txtStudentTitleSub' : titleSubId;
	titleSubId = repeaterId === '#rptrSecondary' ? '#txtSecondaryTitleSub' : titleSubId;

	boxId = repeaterId === '#rptrHeader' ? '#boxHdr' : boxId;
	boxId = repeaterId === '#rptrPrimary' ? '#boxPrimary' : boxId;
	boxId = repeaterId === '#rptrStudent' ? '#boxStudent' : boxId;
	boxId = repeaterId === '#rptrSecondary' ? '#boxSecondary' : boxId;
	
	console.groupCollapsed('repeaterIds')
	console.log(`titleId: ${titleId}`)
	console.log(`titleSubId: ${titleSubId}`)
	console.log(`boxId: ${boxId}`)
	console.groupEnd();

	$w(repeaterId).onItemReady( ($element, elementData,index) => {

		$element(titleId).text = elementData.title;
		if(prepKind !== 'header'){
			$element(titleSubId).text = elementData.titleSub;
		}

		// $element(boxId).background.src = "https://static.wixstatic.com/media/523205_50b6cfa021dc4057a41b55112ff2db85~mv2.png";
		$element(boxId).background.src = elementData.boxColor;

	});
}
// ø <---------- </loadRepeaterWithArray> ---------->



// ! ====================================================================================================
// ! ====================                   </loadActionValueRepeatersWithJSON>            ==============
// ! ====================================================================================================
// ! ====================                          </USER-INTERFACT>                       ==============
// ! ====================================================================================================


// ø <---------- <doStepLoopSwitch>  ---------->
export async function doStepLoopSwitch() {
    local.setItem('logString', local.getItem('logString') + '\n[~Z62]entering: ' + 'doStepLoopSwitch()')
    let stepKey = 'PPENDING';
    let stepArray = memory.getItem('enrollmentStepList').split(',');
    for (let stepArrayIndex = 0; stepArrayIndex < stepArray.length; stepArrayIndex++) {
        stepKey = stepArray[stepArrayIndex];
        console.warn('stepKey[' + stepArrayIndex + ']:' + stepKey);
        let errorString = '';
        switch (stepKey) {
            case 'IINSTANTIATE':
                await doInstantiateLoopSwitchStep();
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_ppMember':
                await ppMemberPrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_ppMember':
                await ppMemberExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_stMember':
                await stMemberPrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_stMember':
                await stMemberExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;

            case 'dedupePpStContact':
                await ppStContactDedupe()
                console.log('Orig Step: ' + stepKey)
                break;



            case 'PREP_ppContact':
                await ppContactPrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_ppDatabase':
                await ppDatabasePrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_stContact':
                await stContactPrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_stDatabase':
                await stDatabasePrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_spContact':
                await spContactPrepJSON()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'PREP_spDatabase':
                // await spDatabasePrepJSON()
                await spDatabaseExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~Z116]Function-Swapped to ppDatabaseExecuteUpsert()')
                break;
            case 'EXECUTE_ppContact':
                await ppContactExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_ppDatabase':
                await ppDatabaseExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_stContact':
                await stContactExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_stDatabase':
                await stDatabaseExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_spContact':
                await spContactExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'EXECUTE_spDatabase':
                await spDatabasePrepJSON()
                local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~Z133]Function-Swapped to await spDatabasePrepJSON()')
                // spDatabaseExecuteUpsert()
                console.log('Orig Step: ' + stepKey)
                break;
            case 'CCOMPLETE':
                console.log('Orig Step: ' + stepKey)
                break;

            default:
                errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
                break;
        }
        stepsCycleSteps();
        // ø <ExitAfter Switch Check>
        doCheckExitAfter();
        if (memory.getItem('loopExitNow') !== 'FFALSE') {
            local.setItem('logString', local.getItem('logString') + '\n[~Z150]exiting (Break Loop is Exit): ' + 'doStepLoopSwitch()')
            break;//(Break Loop is Exit)
        }
        // ø </ExitAfter Switch Check>
    }
}
// ø <---------- </doStepLoopSwitch> ---------->

// ø <---------- <doIfElseThen_forCurrentStep>  ---------->
export function doIfElseThen_forCurrentStep(stepItemKey = 'iiStepKey') {
    let actionKey = stepItemKey.substr(0, 2) + 'Action';
    let stepItemIndex = stepItemKey.indexOf('Member') > 0 ? 0 : 777;
    stepItemIndex = stepItemKey.indexOf('Contact') > 0 ? 1 : stepItemIndex;
    stepItemIndex = stepItemKey.indexOf('Database') > 0 ? 2 : stepItemIndex;

    // only two THEN response values: 'CONTINUE' or 'RETURN' 
    // only ELSE response value: 'ALERT' 
    let logString = '';
    let stepArray = memory.getItem('enrollmentStepList').split(',');
    let stepItemKeyArray = ['ppMemberPrepJSON', 'ppMemberExecuteUpsert', 'stMemberPrepJSON', 'stMemberExecuteUpsert', 'ppContactPrepJSON', 'ppDatabasePrepJSON', 'stContactPrepJSON', 'stDatabasePrepJSON', 'spContactPrepJSON', 'spDatabaseExecuteUpsert', 'ppContactExecuteUpsert', 'ppDatabaseExecuteUpsert', 'stContactExecuteUpsert', 'stDatabaseExecuteUpsert', 'spContactExecuteUpsert', 'spDatabasePrepJSON'];

    let whichAction = stepItemIndex === 0 ? 'Member' : 'ERROR';
    whichAction = stepItemIndex === 1 ? 'Contact' : whichAction;
    whichAction = stepItemIndex === 2 ? 'Dbase' : whichAction;
    // CRAZY: but due to the order in which the code changed, IIABDFI

    // ø <thisELSE>
    if (stepItemKeyArray.includes(stepItemKey) === false) {
        //since there is no place to 'PUT' this ELSE then just return
        local.setItem('lastErrorString', `'ELSE_ALERT': IfElseThen stepItemKey: ${stepItemKey}`)
        return 'ELSE_ALERT';
    }
    if (actionKey === 'iiAction') {
        memory.setItem(stepItemKey, `'ELSE_ALERT': IfElseThen actionKey: ${actionKey}`);
        return 'ELSE_ALERT';
    }
    if (whichAction === 'ERROR') {
        memory.setItem(stepItemKey, `'ELSE_ALERT': IfElseThen actionKeyIndex: ${stepItemIndex} [${whichAction}]`);
        return 'ELSE_ALERT';
    }
    // ø </thisELSE>


    // ø <ELSE>
    /**
     * ! use stepItemKeyArray to make below more precise
     */
    let responseKey = 'CONTINUE';
    let thisAction = memory.getItem(actionKey).split('|')[stepItemIndex];
    logString += '\n' + `[~Z200] memory.getItem('${actionKey}').split('|')[${stepItemIndex}]: '${thisAction}'` + '\n';
    if (thisAction === 'SKIP') {
        logString = "based on action, '" + thisAction + "', no further action in this Step-Function";
        memory.setItem(stepItemKey, logString);
        logString = `memory.setItem(${stepItemKey}): ${logString}`;
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        responseKey = 'RETURN';
        return responseKey;
    }
    if (thisAction === 'NA') {
        logString = "based on action, '" + thisAction + "', no further action in this Step-Function";
        memory.setItem(stepItemKey, logString);
        logString = `memory.setItem(${stepItemKey}): ${logString}`;
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        responseKey = 'RETURN';
        return responseKey;
    }
    if (thisAction !== 'INSERT' && thisAction !== 'UPDATE') {
        logString = "because the action, '" + thisAction + "', is NOT supported this is an error";
        memory.setItem(stepItemKey, logString);
        logString = `memory.setItem(${stepItemKey}): ${logString}`;
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('superEnrollmentStatus', 'ALERT');
        responseKey = 'RETURN';
        return responseKey;
    }
    // ø </ELSE> 
    return responseKey;
}
export function demoLoop_doIfElseThen() {
    let stepItemKeyArray = ['ppMemberPrepJSON', 'ppMemberExecuteUpsert', 'stMemberPrepJSON', 'stMemberExecuteUpsert', 'ppContactPrepJSON', 'ppDatabasePrepJSON', 'stContactPrepJSON', 'stDatabasePrepJSON', 'spContactPrepJSON', 'spDatabaseExecuteUpsert', 'ppContactExecuteUpsert', 'ppDatabaseExecuteUpsert', 'stContactExecuteUpsert', 'stDatabaseExecuteUpsert', 'spContactExecuteUpsert', 'spDatabasePrepJSON'];
    let testWho = 'II';
    let testWhich = 999;
    let testActionKeyIndex = 0;
    let testActionKey = 'iiAction';
    let responseThis = 'TEST_PENDING';
    let responseThisArray = [];
    let testResponseArray = [];
    stepItemKeyArray.forEach(stepItemKey => {
        testActionKey = stepItemKey.substr(0, 2) + 'Action';
        testWho = stepItemKey.substr(0, 2).toLocaleUpperCase();
        testWhich = stepItemKey.indexOf('Member') > 0 ? 0 : 777;
        testWhich = stepItemKey.indexOf('Contact') > 0 ? 1 : testWhich;
        testWhich = stepItemKey.indexOf('Database') > 0 ? 2 : testWhich;
        testActionKeyIndex = testWhich;
        responseThis = doIfElseThen_forCurrentStep(testActionKey, testActionKeyIndex, stepItemKey);
        responseThisArray = [testActionKey, testActionKeyIndex, stepItemKey, responseThis];
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
    console.log('[~Z170]paramObjectThis:')
    console.log(paramObjectThis)

    let wixContact = await streamdaUpdateContactFunction(paramObjectThis);
    console.log('[~Z174]wixContact: ');
    console.log(wixContact);
}
// ø <----------- </doUpdateContact() Front-End> ----------->

// ø <----------- <doSecondaryParentCreateContact Front-End>  ----------->
export async function doSecondaryParentCreateContact() {
    local.setItem('logString', local.getItem('logString') + '\n[~Z197]entering: ' + 'doSecondaryParentCreateContact()');

    let paramObjectThis = JSON.parse(memory.getItem('spContactPrepJSON'));
    console.log("[~Z200]paramObjectThis.contactInfo: ")
    let wixContact = await steamdaCreateContactFunction(paramObjectThis);
    if (typeof wixContact._id === 'string') {
        local.setItem('secondaryId', wixContact._id)
        console.log('[~Z204]wixContact: ');
        console.log(wixContact);
        memory.setItem('spContactExecuteUpsert', JSON.stringify(wixContact));
    } else {
        memory.setItem('spContactExecuteUpsert', 'doSecondaryParentCreateContact() FAIL');
        local.setItem('logString', local.getItem('logString') + '\n[~Z217]exiting: ' + 'doSecondaryParentCreateContact() FAIL');
    }
    local.setItem('logString', local.getItem('logString') + '\n[~Z216]exiting: ' + 'doSecondaryParentCreateContact()');
}
// ø <----------- </doSecondaryParentCreateContact Front-End> ----------->
// ø <---------- <getContactByEmail Front-End>  ---------->
export async function getContactByEmail(emailToFind) {
    let queryRresults = await steamdaGetContactByEmailFunction(emailToFind);
    return queryRresults;
    let results = `the Query of Contacts for \nPrimary Email: '${emailToFind}' \nReturned:\n`;
    results += `BEGIN queryRresults:\n`;
    results += JSON.stringify(queryRresults, undefined, 4);
    results += `\nEND queryRresults`;
}
// ø <---------- </getContactByEmail Front-End> ---------->

// ø <---------- <getContactByEmailAndNotIdFunction Front-End>  ---------->
export async function getContactByEmailAndNotIdFunction(paramObject = { diagnosticOnly: false, collectHumanLog: false }) {
    // pstEnrSeven202108getContactByEmailAndNotIdFunction
    let emailToFind = paramObject.emailToFind;
    let notIdToFind = paramObject.notIdToFind;
    let diagnosticOnly = typeof paramObject.diagnosticOnly === 'boolean' && paramObject.diagnosticOnly === true ? true : false;
    let collectHumanLog = typeof paramObject.collectHumanLog === 'boolean' && paramObject.collectHumanLog === true ? true : false;
    let isValid = emailToFind.indexOf('@') > 0 ? true : false;
    isValid = notIdToFind.length !== 36 ? false : isValid;
    let logString = '';
    logString += `\nemailToFind: ${emailToFind}`;
    logString += `\nnotIdToFind: ${notIdToFind}`;
    if (!isValid) {
        logString = 'One of the two following Parameter Values is InValid:' + logString;

        paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
        return; 
    }
    logString = 'For the following Parameters:' + logString;

    let queryResults = await steamdaGetContactByEmailAndNotIdFunction(emailToFind, notIdToFind);
    let count = queryResults.resultsCount;
    paramObject.results = {};
    paramObject.results.queryResults = queryResults;
    paramObject.results.tobeDeletedCount = queryResults.resultsCount;
    paramObject.results.actuallyDeletedCount = 0;
    paramObject.results.descr = 'PENDING: just a holder';
    
    logString += `\nthe Query of Contacts for \nPrimary Email Equal to: '${emailToFind}' \nAND Contact Primary Email Not-Equal to: ${notIdToFind}`;
    logString += `\nReturned:\n`;
    logString += `BEGIN queryResults:\n`;
    // logString += JSON.stringify(queryResults, undefined, 4);
    logString += `DEPRECATED: see local.getItem('lastResponseObject')`;
    logString += `\nEND queryResults\n`;
    if (count > 1) {
        paramObject.results.descr = 'GREATER_THAN_ONE: Alert, No Action';
        // local.setItem('superEnrollmentStatus', 'ALERT');
        paramObject.results.superEnrollmentStatus = 'ALERT';
        logString += `\nThe Count is More Than One [${count}] this is a Serious Probelem, for this reason the 'superEnrollmentStatus' has been set to 'ALERT' and no further Action taken.`;
        paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
        return; 
    }
    if (count === 0) {
        paramObject.results.descr = 'ZERO: Expected, No Action';
        logString += `\nThe Count is Zero, this is the No BUG (expected) result. No further Action taken.`;
        paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
        return; 
    }
    let idToDelete = queryResults.results._items[0]._id;
    paramObject.results.idToDelete = queryResults.results._items[0]._id;
    
    if (count === 1) {
        // ø 'if (count === 1)' ABOVE is Technically Redundant
        logString += `\nThe Count is One, this is the BUG exist in the form of the Contact with ID: ${idToDelete}`;
        logString += `\ndiagnosticOnly: ${diagnosticOnly}: Meaning the found Contact will `;
        logString += diagnosticOnly ? 'NOT ' : '';
        logString += `be Deleted at this time`;
        if (diagnosticOnly) {
            paramObject.results.descr = 'ONE: Diagnostic Only, No Action';
            paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';
            return; 
        }
    }
    
    // ø <Delete the BUG Contact>
    paramObject.results.descr = 'ONE: Delete the Bug (contact)';
    logString += `\n\nThe code to actually Delete Contact[${idToDelete}] would look like this:`;
    logString += `\nlet deleteResults = await steamdaDeleteContactById('${idToDelete}'')`;
    let deleteResults = await steamdaDeleteContactById(idToDelete);
    paramObject.results.deleteResults = deleteResults;
    paramObject.results.actuallyDeletedCount = 1;// † Validate deleteResuls

    logString += `\n\ndeleteResults:\n==============\n`;
    logString += deleteResults;
    // ø </Delete the BUG Contact>
    paramObject.logString = collectHumanLog ? logString : 'Human Log Not Collected';

    return; 
}
// ø <---------- </getContactByEmailAndNotIdFunction Front-End> ---------->

// ! ====================================================================================================
// ! ====================                 </Front-End Code Calling Back-End Code>          ==============
// ! ====================================================================================================


// ø <---------- <steamdaMemberRegistration Front-End (no backend)>  ---------->
export async function steamdaMemberRegistration(paramObjectParam = {}) {
    console.groupCollapsed(`export async function steamdaMemberRegistration(paramObjectParam = {})`)
    console.log(`paramObjectParam:`)
    console.dir(paramObjectParam)
    // ø <expected that paramObject will be gathered from memory.getItem(JSON)>
    let paramObject = {};
    if (typeof paramObjectParam.memoryKey === 'string') {
        paramObject = JSON.parse(memory.getItem(paramObjectParam.memoryKey))
        console.log('[~Z152] paramObject: ');
        console.log(paramObject);
    } else {
        // ø <BUT still allows for Direct paramObject>
        paramObject = paramObjectParam;
    }
    console.log(`paramObject:`)
    console.dir(paramObject)
    // ø </expected that paramObject will be gathered from memory.getItem(JSON)>
    let email = paramObject.email;// the user's email addresses
    let password = paramObject.password;// the user's password
    let firstName = paramObject.firstName;// the user's first name
    let lastName = paramObject.lastName;// the user's last name
    let phone = paramObject.phone;// the user's phone number

    console.log(`about to call: let memberResponse = await wixUsers.register(${email}, ${password}, {`)
    // try {
        
    // } catch (error) {
        
    // }
    // currentBUG_wixUsers.register
    let memberResponse = await wixUsers.register(email, password, {
        contactInfo: {
            "firstName": firstName,
            "lastName": lastName,
            "phones": [phone]
        }
    })
    console.log(`memberResponse:`)
    console.dir(memberResponse)
    console.groupEnd()
    return memberResponse;
}
// ø <---------- </steamdaMemberRegistration Front-End (no backend)> ---------->
// ø <---------- <steamdaMemberUpdate Front-End>  ---------->
// ø <PRETTY CLOSE> - no need to uncomment before all the rest has been tested
//export async function steamdaMemberUpdate(paramObjectParam = {let memberResponse = await updateUserFields(userId, firstName, lastName, email, phone)}) {PRETRASH}
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
export function ppMemberBuildOnDeckJSONZZZ() {
    let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));
    let familyId = enrollmentObject.family.parent.primary.memberId;
    local.setItem("familyId", familyId);
    if (familyId === "INSTANTIATE") {
        let ppPhoneIndex = -1;
        for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
            let element = enrollmentObject.family.phones[index];
            if (element.role === "Primary Parent") {
                ppPhoneIndex = index;
            }

        }
        ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;

        let ppEmailIndex = -1;
        for (let index = 0; index < enrollmentObject.family.emails.length; index++) {
            let element = enrollmentObject.family.emails[index];
            if (element.role === "Primary Parent") {
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
export async function doInstantiateLoopSwitchStep() {
    await doInstantiateLoopSwitchStepORIG()
}
// ø <---------- </doInstantiateLoopSwitchStep>  ---------->
// ø <---------- <doInstantiateLoopSwitchStepORIG>  ---------->
export async function doInstantiateLoopSwitchStepORIG() {
    console.groupCollapsed('≈1589≈ doInstantiateLoopSwitchStepORIG')
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z319]entering: ' + 'doInstantiateLoopSwitchStepORIG() at ' + memory.getItem('lastStamp'))
    console.log(`memory.getItem('lastStamp'): ${memory.getItem('lastStamp')}`)

    local.setItem('superEnrollmentStatus', 'CONTINUE');

    let stepStampArrayObject = {};
    stepStampArrayObject.stampArray = [];

    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    // ø <---------- <cowCatcher, delete after 20210709 if desired>  ---------->
    local.setItem('familyEmail', local.getItem(('familyEmail')).toLowerCase());
    local.setItem('studentEmail', local.getItem(('studentEmail')).toLowerCase());
    local.setItem('secondaryEmail', local.getItem(('secondaryEmail')).toLowerCase());
    // ø <---------- </cowCatcher, delete after 20210709 if desired> ---------->


    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let memberId = enrollmentObject.family.parent.primary.memberId
    local.setItem('staffIdentifiedFamilyId', memberId);

    // ø <20210911_nowRedundant>
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
        if (spLast.length === 0 && spFirst.length > 0) {
            spLast = local.getItem('ppLast');
        }
    }
    local.setItem('spFirst', spFirst);
    local.setItem('spLast', spLast);
    // ø </20210911_nowRedundant>

    let tempStamp = await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv'));
    local.setItem('logString', local.getItem('logString') + '\n[~Z322]about to call: ' + 'actionValueEvaluation() at ' + tempStamp);
    await actionValueEvaluation();
    console.log('≈1640≈ await actionValueEvaluation(); RETURNED')
    console.groupEnd()
    tempStamp = await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv'));
    local.setItem('logString', local.getItem('logString') + '\n[~1148]just called: ' + 'actionValueEvaluation() at ' + tempStamp);
    local.setItem('logString', local.getItem('logString') + '\nppAction: ' + memory.getItem('ppAction'))
    local.setItem('logString', local.getItem('logString') + '\nstAction: ' + memory.getItem('stAction'))
    local.setItem('logString', local.getItem('logString') + '\nspAction: ' + memory.getItem('spAction'))

    let comboName = local.getItem('stLast') === local.getItem('ppLast') ? '' : ' ' + local.getItem('ppLast');
    comboName = local.getItem('stPreferredFirst').trim() + ' ' + local.getItem('stLast').trim() + ' (' + local.getItem('ppFirst') + comboName + ')';
    local.setItem('comboName', comboName);
    local.setItem('uiStDobString', enrollmentObject.family.student.dobString);
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
    local.setItem('logString', local.getItem('logString') + '\n[~Z334]exiting: ' + 'doInstantiateLoopSwitchStepORIG()');
    let stepResponseBootstrapKey = local.getItem('superEnrollmentStatus') !== 'CONTINUE' ? 'warning' : 'success';
    stepResponseBootstrapKey = local.getItem('superEnrollmentStatus') === 'ALERT' ? 'danger' : stepResponseBootstrapKey;
    // stepResponseBootstrapKey = 'warning'
    // stepResponseBootstrapKey = 'danger'
    memory.setItem('stepResponseBootstrapKey',stepResponseBootstrapKey);
}
// ø <---------- </doInstantiateLoopSwitchStepORIG> ---------->

// ø <---------- <actionValueEvaluation of IINSTANTIATE>  ---------->
export async function actionValueEvaluation() {
    // local.setItem('superEnrollmentStatus', 'CONTINUE'); ALREADY SET
    // 202109_ActionValues
    let DOX = 'To Make It Visible';
    console.groupCollapsed('export async function actionValueEvaluation()');
    console.log('≈1771≈ actionValueEvaluation(); ENTERED');

    /**
     * ø Notes:
     * ø   - Trust Staff-Eye-D
     * ø   - by Extension, Trust doSimpleDemogrfxAssignment()
     * ø   - by Extension, Trust local.getItem() values
     * ø   - action values by Defaults (below in orig)
     */
    let actionValueObject = {}
    actionValueObject.primary = {}
    actionValueObject.student = {}
    actionValueObject.secondary = {}
    // ø <----- <member> ----->
    actionValueObject.primary.member = {}
    actionValueObject.student.member = {}
    actionValueObject.secondary.member = {}
    actionValueObject.primary.member.final = false
    actionValueObject.student.member.final = false
    actionValueObject.secondary.member.final = true
    actionValueObject.primary.member.action = 'INSERT'
    actionValueObject.student.member.action = 'INSERT'
    actionValueObject.secondary.member.action = 'NA'
    // ø <----- </member> ----->
    // ø <----- <contact> ----->
    actionValueObject.primary.contact = {}
    actionValueObject.student.contact = {}
    actionValueObject.secondary.contact = {}
    actionValueObject.primary.contact.final = false
    actionValueObject.student.contact.final = false
    actionValueObject.secondary.contact.final = false
    actionValueObject.primary.contact.action = 'UPDATE'
    actionValueObject.student.contact.action = 'UPDATE'
    actionValueObject.secondary.contact.action = 'INSERT'
    // ø <----- </contact> ----->
    // ø <----- <dataBase> ----->
    actionValueObject.primary.dataBase = {}
    actionValueObject.student.dataBase = {}
    actionValueObject.secondary.dataBase = {}
    actionValueObject.primary.dataBase.final = false
    actionValueObject.student.dataBase.final = false
    actionValueObject.secondary.dataBase.final = false
    actionValueObject.primary.dataBase.action = 'INSERT'
    actionValueObject.student.dataBase.action = 'INSERT'
    actionValueObject.secondary.dataBase.action = 'INSERT'
    // ø <----- </dataBase> ----->
    actionValueObject.primary.contactId = local.getItem('familyId')
    actionValueObject.student.contactId = local.getItem('studentId')
    actionValueObject.secondary.contactId = local.getItem('secondaryId')
    actionValueObject.primary.email = local.getItem('familyEmail')
    actionValueObject.student.email = local.getItem('studentEmail')
    actionValueObject.secondary.email = local.getItem('secondaryEmail')
    actionValueObject.primary.first = local.getItem('ppFirst')
    actionValueObject.student.first = local.getItem('stFirst')//this is Legal
    actionValueObject.secondary.first = local.getItem('spFirst')
    actionValueObject.primary.last = local.getItem('ppLast')
    actionValueObject.student.last = local.getItem('stLast')
    actionValueObject.secondary.last = local.getItem('spLast')
    console.log(`actionValueObject:`)
    console.dir(actionValueObject)


    // pstEnrSeven20210825_ActionValueEvaluation
    let tempStamp = await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv'));
    local.setItem('logString', local.getItem('logString') + '\nLAUNCH\n[~Z484] Entering actionValueEvaluation() at ' + tempStamp);
    // <defaults>
    let ppAction = "INSERT|UPDATE|INSERT";
    let stAction = "INSERT|UPDATE|INSERT";
    let spAction = "NA|INSERT|INSERT";
    // </defaults>

    let staffMatch = local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE' ? false : true;
    console.log(`≈1687≈ staffMatch; ${staffMatch}`);
    if (staffMatch) {
        let staffMatchId = local.getItem('staffIdentifiedFamilyId');
        let contact = await steamdaGetContactFunction(staffMatchId);
        console.dir(contact);
        if (contact._id !== staffMatchId) {
            local.setItem('superEnrollmentStatus', 'ALERT');
            memory.setItem('stepResponseBootstrapKey','danger');
            await appendStepLogPPEQ('danger', `'Staff Eye-D' does not match actual 'Contact ID': '${contact._id}'`);
            local.setItem('logString', local.getItem('logString') + '\n[~1189]Staff-Eye-D Does NOT Match Contact Found ID (probably none). AbortForNow');
            console.log(`≈1694≈ staffMatch; local.getItem('superEnrollmentStatus'): ${local.getItem('superEnrollmentStatus')}`);
            return;
        }
        console.log(`≈1697≈ staffMatch; local.getItem('superEnrollmentStatus'): ${local.getItem('superEnrollmentStatus')}`);
        if (DOX !== 'YES -  But the whole If-Clause should always be run, the Manual Confirmation is a thing of the past') {
            console.log(`≈1700≈ contact.source.sourceType: could be MOOT but 'MEMBER' or 'IMPORT' supported now`);
            let sourceType = contact.source.sourceType.toUpperCase();
            let supportedSourceTypeArray = ['MEMBER','IMPORT','ADMIN','WIX_STORES','WIX_SITE_MEMBERS','zOTHER']
            if (supportedSourceTypeArray.includes(sourceType) === false) {
                local.setItem('superEnrollmentStatus', 'ALERT');
                memory.setItem('stepResponseBootstrapKey','danger');
                await appendStepLogPPEQ('danger', `'Staff Eye-D' Contact is of unsupported Source Type: '${sourceType}'`);
                local.setItem('logString', `[~1194] ABORT: StaffEyeD Contact does not contain 'MEMBER' in sourceType`);
                console.log(`≈1703≈ ABORT: StaffEyeD Contact does not contain 'MEMBER' in sourceType`);
                return;
            }
        console.log(`≈1706≈ contact.source.sourceType.toUpperCase().indexOf('MEMBER'): ${contact.source.sourceType.toUpperCase().indexOf('MEMBER')}`);
        console.log(`≈1707≈ contact.source.sourceType.toUpperCase().indexOf('INDEX'): ${contact.source.sourceType.toUpperCase().indexOf('IMPORT')}`);
        }
        local.setItem('familyId', staffMatchId);
        console.log(`≈1710≈ local.getItem('familyId'): ${local.getItem('familyId')}`);
        local.setItem('familyEmail', contact.primaryInfo.email);
        local.setItem('logString', local.getItem('logString') + '\n[~Z547]staffMatchFoundContact: ' + JSON.stringify(contact, undefined, 4));
        ppAction = "SKIP|UPDATE|INSERT";
    }
    local.setItem('logString', local.getItem('logString') + '\n[~Z583]staffMatch: ' + staffMatch);

    let familyId = local.getItem('staffIdentifiedFamilyId');
    let termId = Number(local.getItem('termId'));
    let studentLegalFirst = local.getItem('stFirst');

    // ø <ppAction>
    // ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    if (staffMatch) {
        let ppExistsCount = await wixData.query("person")
            .eq("personId", familyId)
            .eq("termId", termId)
            .count();
        ppAction = ppExistsCount > 0 ? "SKIP|SKIP|SKIP" : ppAction;
        console.log(`existing PP for this Term: usually additional children|ppExistsCount > 0 ? "SKIP|SKIP|SKIP"`);
        local.setItem('logString', local.getItem('logString') + '\n[~Z508]ppExistsCount: ' + ppExistsCount);
    }
    // ø </ppAction>

    // ø <stAction>
    if (staffMatch) {
        if(202106 < Number(local.getItem('termId'))){
                stAction = "ALERT|ALERT|ALERT";
                local.setItem('superEnrollmentStatus', 'ALERT');
                memory.setItem('stepResponseBootstrapKey','danger');
                await appendStepLogPPEQ('danger', `Logic Required: Check for Same Student Previous Term`);
                local.setItem('logString', local.getItem('logString') + '\n[~1817] Logic Required: Check for Same Student Previous Term');
                console.log(`Logic Required: Check for Same Student Previous Term`);
        }
        let stExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();
        if(stExistsCount > 0){
            stAction = "ALERT|ALERT|ALERT";
            local.setItem('superEnrollmentStatus', 'ALERT');
            memory.setItem('stepResponseBootstrapKey','danger');
            await appendStepLogPPEQ('danger', `Unaccepatable Anomaly: Student Already Exist for the Current Term`);
            local.setItem('logString', local.getItem('logString') + '\n[~Z523]stExistsCount: ' + stExistsCount);
            console.log(`Unaccepatable Anomaly: Student Already Exist for the Current Term`);
        }
    }
    // ø </stAction>

    // ø <spAction>
    console.groupCollapsed('<spAction>')
    console.log(`init: spAction: ${spAction}`)
    let checkSecondaryParent = (local.getItem('spFirst')).length === 0 && (local.getItem('spLast')).length === 0 ? false : true;
    let logSecondaryParentReason = '';
    logSecondaryParentReason = checkSecondaryParent === false ? 'Secondary Parent was not filled in in the form' : logSecondaryParentReason;
    console.log(`[~Z532] If ppAction has 'SKIP' does NOT mean that spAction should be Skipped (added 20210714190800 upon Barak Obama/Joe Biden BUG)`)
    logSecondaryParentReason = checkSecondaryParent === false && logSecondaryParentReason.length === 0 ? 'SKIP because Primary Parent SKIP-ped' : logSecondaryParentReason;
    logSecondaryParentReason = logSecondaryParentReason.length === 0 ? '[continue]' : logSecondaryParentReason;

    local.setItem('logString', local.getItem('logString') + '\n[~Z536]logSecondaryParentReason: ' + logSecondaryParentReason);
    local.setItem('logString', local.getItem('logString') + '\n[~Z537]checkSecondaryParent: ' + checkSecondaryParent);
    spAction = !checkSecondaryParent ? "NA|SKIP|SKIP" : spAction;
    console.log(`!checkSecondaryParent[!${checkSecondaryParent}]: spAction: ${spAction}`)
    console.log(`spAction: by Secondary in Application: ${spAction}`);
    if (staffMatch) {
        if(202106 < Number(local.getItem('termId'))){
                spAction = "ALERT|ALERT|ALERT";
                local.setItem('superEnrollmentStatus', 'ALERT');
                memory.setItem('stepResponseBootstrapKey','danger');
                await appendStepLogPPEQ('danger', `Logic Required: Check for Same Secondary Parent Previous Term`);
                local.setItem('logString', local.getItem('logString') + '\n[~1817] Logic Required: Check for Same Secondary Parent Previous Term');
                console.log(`Logic Required: Check for Same Secondary Parent Previous Term`);
        }
        if (checkSecondaryParent) {
            let spExistsCount = await wixData.query("person")
                .eq("familyId", familyId)
                .eq("role", 'Secondary')
                .eq("termId", termId)
                .count();
            spAction = spExistsCount > 0 ? "NA|SKIP|SKIP" : spAction;
            if (spExistsCount > 0) {
                let spPerson = await wixData.query("person")
                    .eq("familyId", familyId)
                    .eq("role", 'Secondary')
                    .eq("termId", termId)
                    .find();
                // console.log('spPerson')                
                // console.dir(spPerson) 
                let secondaryId = spPerson.items[0].personId    
                // console.log(`secondaryId: ${secondaryId}`)
                local.setItem('secondaryId',secondaryId)           
                console.log(`local.getItem('secondaryId'): ${local.getItem('secondaryId')}`)
            }
            console.log(`spAction: by Exist in Database: ${spAction}`);
            local.setItem('logString', local.getItem('logString') + '\n[~Z550]spExistsCount: ' + spExistsCount);
        }
    }
    console.groupEnd()
    // ø </spAction>

    let now = new Date();
    let yyyymmdd = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    local.setItem('logString', local.getItem('logString') + '\n[~Z557]yyyymmdd: ' + yyyymmdd);

    if (yyyymmdd > Number(local.getItem('termEndYYYYMMDD'))) {
        ppAction = "ALERT|ALERT|ALERT";
        stAction = "ALERT|ALERT|ALERT";
        spAction = "ALERT|ALERT|ALERT";
        local.setItem('superEnrollmentStatus', 'ALERT');
        memory.setItem('stepResponseBootstrapKey','danger');
        await appendStepLogPPEQ('danger', `Today is Past the End of the Current Term`);
        console.log(`Today is Past the End of the Current Term: ${memory.getItem('stepResponseBootstrapKey')}`);
    }

    memory.setItem('ppAction', ppAction);
    memory.setItem('stAction', stAction);
    memory.setItem('spAction', spAction);
     
    let allActionStrings = memory.getItem('ppAction') + memory.getItem('stAction') + memory.getItem('spAction');
    let superEnrollmentStatus = local.getItem('superEnrollmentStatus');
    superEnrollmentStatus = allActionStrings.indexOf('ALERT') >= 0 ? 'ALERT' : superEnrollmentStatus;
    local.setItem('logString', local.getItem('logString') + '\n[~Z576]superEnrollmentStatus: ' + superEnrollmentStatus);
    local.setItem('superEnrollmentStatus', superEnrollmentStatus);
    local.setItem('logString', local.getItem('logString') + '\n[~Z578]Exiting: ' + 'actionValueEvaluation()');
    console.log(`superEnrollmentStatus: ${superEnrollmentStatus}')}`);
    console.log(`local.getItem('superEnrollmentStatus'): ${local.getItem('superEnrollmentStatus')}')}`);
    console.groupEnd();
}
// ø <---------- </actionValueEvaluation of IINSTANTIATE> ---------->
 
// ø <---------- <NEW> ---------->
// ø <-------------------- <instantiateEnrollmentObject>  -------------------->
// ø 202110_instantiateEnrollmentObject-START
export async function instantiateEnrollmentObject(familyId = 'STRING') {
    console.groupCollapsed(`instantiateEnrollmentObject(familyId)`)
    console.log(`FULL DECLARATION: export async function instantiateEnrollmentObject(${familyId} = 'STRING')`)
    let DOX = 'so that it can be viewed in the Online Editor'
    let develObject = {}
    develObject.paramObject = {}
    develObject.responseObject = {}
    develObject.responseObject.notes = []
    DOX = `instantiateEnrollmentObject(familyId = 'STRING')`
    develObject.responseObject.notes.push(DOX)
    DOX = `these notes will parallel 'enroll.notes = []`
    develObject.responseObject.notes.push(DOX)
    develObject.paramObject.familyId = familyId
    let pendingString = 'PENDING'
    let unconfirmedString = 'UNCONFIRMED'
    let enroll = {}
    enroll.notes = []
     
    /*doxNOTE*/DOX = `instantiateSimpleDemogfxObject(${familyId}) INTO enroll.application = {}`
    /*doxNOTE*/enroll.notes.push(DOX)
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
     
    /*doxNOTE*/DOX = `ALL response into holder $w('#TXAREA') elements are being removed, rather use wixStorage instead`
    /*doxNOTE*/enroll.notes.push(DOX)
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)

    
    if(typeof familyId !== 'string'){
        // ø <CODE for Below>
        let contactId_PARAM = 'ZXZ'
        let emailToFind_PARAM = 'ZXZ'
        let contactById = await steamdaGetContactFunction(contactId_PARAM);
        let contactByEmail = await steamdaGetContactByEmailFunction(emailToFind_PARAM);
        // ø </CODE for Below>
    }


    enroll.action = {}
    enroll.action.superEnrollmentStatus = 'CONTINUE';//local.getItem('superEnrollmentStatus')
    enroll.action.superEnrollmentString = 'INSTANTIATE';//local.getItem('superEnrollmentStatus')

    enroll.familyId = 'PENDING'
    enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D'// inferred by Data, precision here not necessary
    enroll.maxPreviousFamilyTermId = 201506
    enroll.maxPreviousStudentTermId = 201506
    enroll.wixWebhookId = local.getItem('wixWebhookId')
    // ø <demogrfx-application-processed>
    enroll.application = {}
    enroll.application.termId = local.getItem('termId')
    enroll.application.staffIdentifiedFamilyId = local.getItem('staffIdentifiedFamilyId')
    enroll.application.familySeed = local.getItem('familySeed')
    enroll.application.primary = {}
    enroll.application.primary.familyId = local.getItem('familyId')
    enroll.application.primary.familyEmail = local.getItem('familyEmail')
    enroll.application.primary.ppFirst = local.getItem('ppFirst')
    enroll.application.primary.ppLast = local.getItem('ppLast')
    enroll.application.student = {}
    enroll.application.student.studentId = local.getItem('studentId')
    enroll.application.student.studentEmail = local.getItem('studentEmail')
    enroll.application.student.stFirst = local.getItem('stFirst')
    enroll.application.student.stPreferredFirst = local.getItem('stPreferredFirst')
    enroll.application.student.stLast = local.getItem('stLast')
    enroll.application.secondary = {}
    enroll.application.secondary.secondaryId = local.getItem('secondaryId')
    enroll.application.secondary.secondaryEmail = local.getItem('secondaryEmail')
    enroll.application.secondary.spFirst = local.getItem('spFirst')
    enroll.application.secondary.spLast = local.getItem('spLast')
    // // ø </demogrfx-application-processed>
    
     
    /*doxNOTE*/DOX = `enroll = {} instantiated`
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    /*doxNOTE*/DOX = `enroll.appliocation = {} instantiated)`
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    develObject.responseObject.enrollSOFAR = enroll
      
    // ø <familyPersonsObjectFRONTEND>
    // let familyPersonsObjectFRONTEND = await getFamilyPersonsObject_NotBackend(familyId)
      
    // /*doxNOTE*/DOX = `getFamilyPersonsObject_NotBackend(familyId)`
    // /*doxNOTE*/develObject.responseObject.notes.push(DOX)
    
    // /*doxNOTE*/DOX = `familyId,enroll.application.termId: ${typeof enroll.application.termId}: ${enroll.application.termId}`
    // /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    // develObject.responseObject.familyPersonsObjectFRONTEND = familyPersonsObjectFRONTEND
    // ø </familyPersonsObjectFRONTEND>
      
    // ø <familyPersonsObjectBACKEND>
    let familyPersonsObject = await getFamilyPersonsObject(familyId,Number(enroll.application.termId))
      
    /*doxNOTE*/DOX = `getFamilyPersonsObject(familyId,enroll.application.termId)`
    /*doxNOTE*/develObject.responseObject.notes.push(DOX)
      
    develObject.responseObject.familyPersonsObjectBACKEND = familyPersonsObject
    // ø </familyPersonsObjectBACKEND>
     
    // console.log(`develObject:`)
    // console.dir(develObject)
    // console.groupEnd()
    // // return_develObject
    // return develObject

    local.setItem('familyPersonsObjectJSON', JSON.stringify(familyPersonsObject))
    // $w('#secondaryResponseTXTBX').value = JSON.stringify(familyPersonsObject,undefined,4)

    // await validateFamilyPersonsObject_NotBackend(familyPersonsObject)
    console.warn('≈308≈ validateFamilyPerson: COMMENTED OUT: OKAY: inside main getFamilyPersonsObject_NotBackend() ')
    DOX = '<MOVED TO JUST BELOW familyPersonObject RENDERED>'
    DOX = '¡WHICH is where it was origially before all the intervening code was placed between!'
    DOX = '¡SO this is, essentially, placing it back where it was originally!'
    console.log(`familyPersonsObject:`)
    console.dir(familyPersonsObject)
    enroll.action.superEnrollmentStatus = familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? enroll.action.superEnrollmentStatus : 'ABORT'
    enroll.action.superEnrollmentString += familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? '|allDangerBooleansAreValid' : '|allDangerBooleansAre_NOT_Valid'

    // ø <current-evaluation-personDbase-personData-wixWebhookId>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousTermIdFamily = 201506
    // enroll.maxPreviousTermIdStudent = 201506
    let holderErrorBOOLEAN = true
    let holderIdErrorString = `HOLDER`
    enroll.personData = {}
    enroll.confirmed = {}
    enroll.confirmed.familyId = familyPersonsObject.primaryPersonCount === 1 ? familyPersonsObject.familyId : unconfirmedString
    holderErrorBOOLEAN = enroll.confirmed.familyId === unconfirmedString ? true : false
    holderIdErrorString = `Family-ID Error`
    enroll.confirmed.familyEmail = holderErrorBOOLEAN ? holderIdErrorString : familyPersonsObject.primaryMemberObjectsById[enroll.confirmed.familyId]['personContactEmail']
    enroll.confirmed.familyMaxTermId = familyPersonsObject.primaryTermIdMax
    enroll.confirmed.familyUpToDate = familyPersonsObject.primaryIsUpToDate
    enroll.confirmed.studentId = unconfirmedString
    enroll.confirmed.studentEmail = unconfirmedString
    enroll.confirmed.studentMaxTermId = 201506
    enroll.confirmed.studentUpToDate = false
    enroll.confirmed.secondaryId = familyPersonsObject.secondaryPersonCount === 1 ? familyPersonsObject.secondaryId : unconfirmedString
    holderErrorBOOLEAN = enroll.confirmed.secondaryId === unconfirmedString ? true : false
    holderIdErrorString = `Secondary-ID Error`
    enroll.confirmed.secondaryEmail = holderErrorBOOLEAN ? holderIdErrorString : familyPersonsObject.secondaryMemberObjectsById[enroll.confirmed.secondaryId]['personContactEmail']
    enroll.confirmed.secondaryMaxTermId = familyPersonsObject.secondaryTermIdMax
    enroll.confirmed.secondaryUpToDate = familyPersonsObject.secondaryIsUpToDate
    enroll.personData.primary = {}
    enroll.personData.primary.familyId = 'FROM_familyDataObject'
    enroll.personData.primary.maxTermId = 'FROM_familyDataObject'
    enroll.personData.student = {}
    enroll.personData.student.studentId = 'FROM_familyDataObject'
    enroll.personData.student.maxTermId = 'FROM_familyDataObject'
    enroll.personData.secondary = {}
    enroll.personData.secondary.secondaryId = 'FROM_familyDataObject'
    enroll.personData.secondary.maxTermId = 'FROM_familyDataObject'
    // ø </current-evaluation-personDbase-personData-wixWebhookId>
    DOX = '</MOVED TO JUST BELOW familyPersonObject RENDERED>'
    
    let doQueryPrimaryApplicationEmail = false
    let doGatherStudentFromFamilyPersonObject = false
    let doQueryStudentEmail = false
    let doQueryStudentEmailKludge = false
    /*doxNOTE*/DOX = `<do-Booleans>`
    /*doxNOTE*/enroll.notes.push(DOX)
    
    doQueryPrimaryApplicationEmail = familyPersonsObject.primaryId.length < 30 ? true: false
    /*doxNOTE*/DOX = `familyPersonsObject.primaryId.length['${familyPersonsObject.primaryId.length}'] < 30 => doQueryPrimaryApplicationEmail = ${doQueryPrimaryApplicationEmail}`
    /*doxNOTE*/enroll.notes.push(DOX)

    doGatherStudentFromFamilyPersonObject = familyPersonsObject.studentFirstArray.includes(enroll.application.student.stFirst) ? true : false 
    doGatherStudentFromFamilyPersonObject = /*OOAAOC*/ familyPersonsObject.studentFirstArray.includes(enroll.application.student.stPreferredFirst) ? true : doGatherStudentFromFamilyPersonObject 
    /*doxNOTE*/DOX = `familyPersonsObject.studentFirstArray.includes(enroll.application.student.stFirst) => ['${familyPersonsObject.studentFirstArray}']-includes('${enroll.application.student.stFirst}') => doGatherStudentFromFamilyPersonObject = ${doGatherStudentFromFamilyPersonObject}`
    /*doxNOTE*/enroll.notes.push(DOX)


    doQueryStudentEmail = !doGatherStudentFromFamilyPersonObject
    /*doxNOTE*/DOX = `doQueryStudentEmail = !doGatherStudentFromFamilyPersonObject => doQueryStudentEmail = ${doQueryStudentEmail}`
    /*doxNOTE*/enroll.notes.push(DOX)
    doQueryStudentEmailKludge = doQueryStudentEmail
    /*doxNOTE*/DOX = `doQueryStudentEmailKludge = doQueryStudentEmail => doQueryStudentEmailKludge = ${doQueryStudentEmailKludge}`
    /*doxNOTE*/enroll.notes.push(DOX)
    /*doxNOTE*/DOX = `</do-Booleans>`
    /*doxNOTE*/enroll.notes.push(DOX)
    let doProcess_primaryParentByEmail = false
    let doProcess_studentByEmail = false
    let primaryParentByEmail = {}
    if(doQueryPrimaryApplicationEmail){
        // /*doxNOTE*/DOX = `Query Primary-Application-Email IS PENDING => doQueryPrimaryApplicationEmail = ${doQueryPrimaryApplicationEmail}`
        // /*doxNOTE*/enroll.notes.push(DOX)
        primaryParentByEmail = await steamdaGetContactByEmailFunction(local.getItem('familyEmail'))
        if(primaryParentByEmail.resultsCount > 1){
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            return
        }
        if(primaryParentByEmail.resultsCount === 1){
            doProcess_primaryParentByEmail = true
            console.groupCollapsed(`doQueryPrimaryApplicationEmail === 1:`)
            console.dir(primaryParentByEmail)
            console.groupEnd()
            /*doxNOTE*/DOX = `SEE console.log() => primaryParentByEmail.resultsCount === ${primaryParentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
            $w('#tertiaryResponseTXTBX').value = JSON.stringify(primaryParentByEmail,undefined,4)
        }else{
            /*doxNOTE*/DOX = `primaryParentByEmail.resultsCount === ${primaryParentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
        }
    }
 
    if(doGatherStudentFromFamilyPersonObject){
        //     enroll.application.student.stFirst = local.getItem('stFirst')
        // enroll.application.student.stPreferredFirst = local.getItem('stPreferredFirst')

        let elementArray = []
        let doGatherMaxTermId = 'PENDING';
        let doGatherPersonId = 'PENDING';
        for (let index = 0; index < familyPersonsObject.studentFirstTermId2dArray.length; index++) {
            elementArray = familyPersonsObject.studentFirstTermId2dArray[index];
            if(enroll.application.student.stFirst === elementArray[0] || enroll.application.student.stPreferredFirst === elementArray[0]){
                doGatherMaxTermId = elementArray[1];
                doGatherPersonId = elementArray[2];
            }
            
        }
        if (doGatherMaxTermId === 'PENDING' || doGatherPersonId === 'PENDING') {
            /*doxNOTE*/DOX = `Gather Student from familyPersonObject FAILED => familyPersonsObject.studentFirstTermId2dArray[i][0] did NOT include ${enroll.application.student.stFirst}`
            /*doxNOTE*/enroll.notes.push(DOX)
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject FAILED [studentFirstTermId2dArray]'
            doGatherStudentFromFamilyPersonObject = false
        }
 
        if(doGatherStudentFromFamilyPersonObject){
            if (typeof familyPersonsObject.studentMemberObjectsById[doGatherPersonId] !== 'object' || doGatherPersonId !== familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['contactId']) {
                // ø <SHOULD BE IMPOSSIBLE>
                /*doxNOTE*/DOX = `Gather Student from familyPersonObject FAILED => doGatherPersonId ['${doGatherPersonId}'] does NOT match familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['contactId']`
                /*doxNOTE*/enroll.notes.push(DOX)
                enroll.action.superEnrollmentStatus = 'ABORT'
                enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject FAILED [doGatherPersonId MisMatch]'
                doGatherStudentFromFamilyPersonObject = false
                // ø </SHOULD BE IMPOSSIBLE>
            }
        }
 
        if(doGatherStudentFromFamilyPersonObject){
            // /*doxNOTE*/DOX = `Gather Student from familyPersonObject IS PENDING => doGatherStudentFromFamilyPersonObject = ${doGatherStudentFromFamilyPersonObject}`
            // /*doxNOTE*/enroll.notes.push(DOX)
            // enroll.action.superEnrollmentStatus = 'ABORT'
            // enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            enroll.confirmed.studentId = familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['contactId']
            enroll.confirmed.studentEmail = familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['personContactEmail']
            enroll.confirmed.studentMaxTermId = familyPersonsObject.studentMemberObjectsById[doGatherPersonId]['termIdMax']
            enroll.confirmed.studentUpToDate = enroll.confirmed.studentMaxTermId === Number(local.getItem('termId')) ? true : enroll.confirmed.studentUpToDate

        }

    }
 
    let studentEmail = local.getItem('studentEmail')
    let studentByEmail = {}
    if(doQueryStudentEmail){
        // /*doxNOTE*/DOX = `Query Student-Auto-Email IS PENDING => doQueryStudentEmail = ${doQueryStudentEmail}`
        // /*doxNOTE*/enroll.notes.push(DOX)
    
        /*doxNOTE*/DOX = `steamdaGetContactByEmailFunction(${studentEmail})`
        /*doxNOTE*/enroll.notes.push(DOX)
        studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
        if(studentByEmail.resultsCount > 1){
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            return
        }
        if(studentByEmail.resultsCount === 1){
            doProcess_studentByEmail = true
            doQueryStudentEmailKludge = false
            /*doxNOTE*/DOX = `SEE console.log() => studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
            /*doxNOTE*/DOX = `studentByEmail.resultsCount === ${studentByEmail.resultsCount} => doQueryStudentEmailKludge = ${doQueryStudentEmailKludge}`
            /*doxNOTE*/enroll.notes.push(DOX)
            $w('#quaternaryResponseTXTBX').value = JSON.stringify(studentByEmail,undefined,4)
        }else{
            /*doxNOTE*/DOX = `studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
        }
    }
 
    if(doQueryStudentEmailKludge){
        // /*doxNOTE*/DOX = `Query Student-Auto-Email-KLUDGE IS PENDING => doQueryStudentEmailKludge = ${doQueryStudentEmailKludge}`
        // /*doxNOTE*/enroll.notes.push(DOX)

        DOX = (enroll.application.familySeed).substr(0,4) + '@'
        studentEmail = studentEmail.replace(DOX,'eemp@')
        /*doxNOTE*/DOX = `steamdaGetContactByEmailFunction(${studentEmail})`
        /*doxNOTE*/enroll.notes.push(DOX)
        studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
        if(studentByEmail.resultsCount > 1){
            enroll.action.superEnrollmentStatus = 'ABORT'
            enroll.action.superEnrollmentString += '|Gather Student from familyPersonObject IS PENDING'
            return
        }
        if(studentByEmail.resultsCount === 1){
            doProcess_studentByEmail = true
            console.groupCollapsed(`doQueryStudentEmailKludge === 1:`)
            console.dir(studentByEmail)
            console.groupEnd()
            /*doxNOTE*/DOX = `SEE console.log() => [KLUDGE] studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
            $w('#quaternaryResponseTXTBX').value = JSON.stringify(studentByEmail,undefined,4)
        }else{
            /*doxNOTE*/DOX = `[KLUDGE] studentByEmail.resultsCount === ${studentByEmail.resultsCount}`
            /*doxNOTE*/enroll.notes.push(DOX)
        }
    }
 
    if(doProcess_primaryParentByEmail){
        /*doxNOTE*/DOX = `Process Primary-Parent-By-Email IS PENDING: doProcess_primaryParentByEmail === ${doProcess_primaryParentByEmail}`
        /*doxNOTE*/enroll.notes.push(DOX)
        
        enroll.confirmed.familyId = primaryParentByEmail.results._items[0]._id
        enroll.confirmed.familyEmail = primaryParentByEmail.results._items[0].primaryInfo.email
 
    }
    if(doProcess_studentByEmail){
        /*doxNOTE*/DOX = `doProcess_studentByEmail IS PENDING: doProcess_studentByEmail === ${doProcess_studentByEmail}`
        /*doxNOTE*/enroll.notes.push(DOX)
        
        enroll.confirmed.studentId = studentByEmail.results._items[0]._id
        enroll.confirmed.studentEmail = studentByEmail.results._items[0].primaryInfo.email
 
    }


    // ø <>
    // ø <Ecapsulated Queries>
    // ø <ENCAPSULATED QUERIES>
 
    // DOX = 'PrimaryParent:\n---\nById:\n---\n'
    // let primaryParentId = local.getItem('staffIdentifiedFamilyId')
    // let primaryParentById = await steamdaGetContactFunction(primaryParentId)
    // $w('#tertiaryResponseTXTBX').value = JSON.stringify(primaryParentById,undefined,4)
 
    // DOX = 'PrimaryParent:\n---\nByEmail:\n---\n'
    // let primaryParentEmail = local.getItem('familyEmail')
    // let primaryParentByEmail = await steamdaGetContactByEmailFunction(primaryParentEmail)
    // $w('#quaternaryResponseTXTBX').value = JSON.stringify(primaryParentByEmail,undefined,4)
 
 
    // DOX = 'Student:\n---\nById:\n---\n'
    // let studentId = 'c90f23aa-2838-4e4e-9135-3995d25c5eb3'
    // let studentById = await steamdaGetContactFunction(studentId)
    // DOX += JSON.stringify(studentById,undefined,4)
    // $w('#tertiaryResponseTXTBX').value = DOX
  
    // let studentEmail = local.getItem('studentEmail')
    // DOX = `Student:\n---\nByEmail:\nsteamdaGetContactByEmailFunction(${studentEmail})\n---\n`
    // let studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
    // DOX += JSON.stringify(studentByEmail,undefined,4)
    // $w('#tertiaryResponseTXTBX').value = DOX
 
    // DOX = familyId.substr(0,4) + '@'
    // studentEmail = studentEmail.replace(DOX,'eemp@')
    // DOX = `Student:\n---\nByEmailKludge:\nsteamdaGetContactByEmailFunction(${studentEmail})\n---\n`
    // studentByEmail = await steamdaGetContactByEmailFunction(studentEmail)
    // DOX += JSON.stringify(studentByEmail,undefined,4)
    // $w('#quaternaryResponseTXTBX').value = DOX
 
    // ø </ENCAPSULATED QUERIES>
    // ø </Ecapsulated Queries>
    // ø </>

    DOX = '<MOVED TO JUST BELOW familyPersonObject RENDERED>'
    // console.log(`familyPersonsObject:`)
    // console.dir(familyPersonsObject)
    // enroll.action.superEnrollmentStatus = familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? enroll.action.superEnrollmentStatus : 'ABORT'
    // enroll.action.superEnrollmentString += familyPersonsObject.validationObject.allDangerBooleansAreValid === true ? '|allDangerBooleansAreValid' : '|allDangerBooleansAre_NOT_Valid'

    // // ø <current-evaluation-personDbase-personData-wixWebhookId>
    // // enroll.familyId = PENDING
    // // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // // enroll.maxPreviousTermIdFamily = 201506
    // // enroll.maxPreviousTermIdStudent = 201506
    // enroll.personData = {}
    // enroll.confirmed = {}
    // enroll.confirmed.familyId = familyPersonsObject.primaryPersonCount === 1 ? familyPersonsObject.familyId : unconfirmedString
    // enroll.confirmed.familyEmail = unconfirmedString
    // enroll.confirmed.familyMaxTermId = 201506
    // enroll.confirmed.familyUpToDate = familyPersonsObject.primaryPersonCount === 1 ? true : false
    // enroll.confirmed.studentId = unconfirmedString
    // enroll.confirmed.studentEmail = unconfirmedString
    // enroll.confirmed.studentMaxTermId = 201506
    // enroll.confirmed.studentUpToDate = false
    // enroll.confirmed.studentId = unconfirmedString
    // enroll.confirmed.studentEmail = unconfirmedString
    // enroll.confirmed.studentMaxTermId = unconfirmedString
    // enroll.confirmed.studentUpToDate = false
    // enroll.personData.primary = {}
    // enroll.personData.primary.familyId = 'FROM_familyDataObject'
    // enroll.personData.primary.maxTermId = 'FROM_familyDataObject'
    // enroll.personData.student = {}
    // enroll.personData.student.studentId = 'FROM_familyDataObject'
    // enroll.personData.student.maxTermId = 'FROM_familyDataObject'
    // enroll.personData.secondary = {}
    // enroll.personData.secondary.secondaryId = 'FROM_familyDataObject'
    // enroll.personData.secondary.maxTermId = 'FROM_familyDataObject'
    // ø </current-evaluation-personDbase-personData-wixWebhookId>
    DOX = '</MOVED TO JUST BELOW familyPersonObject RENDERED>'
    
    // ø <contacts-directQuery-emailQuery-emailQueryWithKludge>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    DOX = '</ this Block ¿IS MOOT?: enroll.emailQuery = {}>'
    enroll.emailQuery = {}
    // enroll.emailQuery.primary.familyId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.familyId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // enroll.emailQuery.student.studentId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.studentId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // enroll.emailQuery.secondary.secondaryId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    enroll.emailQuery.secondaryId = 'FROM_familyDataObject_OR_FROM_emailQuery'
    // ø <DATA FOR THE QUERY(IES)>
    // enroll.emailQuery.primary.familyEmail = enroll.application.familyEmail
    enroll.emailQuery.familyEmail = enroll.application.familyEmail
    // enroll.emailQuery.student.studentEmail = enroll.application.studentEmail
    enroll.emailQuery.studentEmail = enroll.application.studentEmail
    // let studentEmailKludge = enroll.application.student.studentEmail
    // console.log(`studentEmailKludge: ${studentEmailKludge}`)
    console.log(`replaceBlock: indexOf ${(enroll.application.student.studentEmail).indexOf('@')}`)
    console.log(`replaceBlock: substr(START: ${(enroll.application.student.studentEmail).indexOf('@')-4}`)
    let replaceBlock = (enroll.application.student.studentEmail).substr((enroll.application.student.studentEmail).indexOf('@') - 4,5)
    console.log(`replaceBlock: replaceBlock: ${replaceBlock}`)
    // enroll.emailQuery.student.studentEmailKludge = (enroll.application.studentEmail).replace(replaceBlock, 'eemp@')
    enroll.emailQuery.studentEmailKludge = (enroll.application.student.studentEmail).replace(replaceBlock, 'eemp@')
    console.log(`enroll.emailQuery.studentEmailKludge: ${enroll.emailQuery.studentEmailKludge}`)
    // ø </DATA FOR THE QUERY(IES)>
    DOX = '< this Block ¿IS MOOT?: enroll.emailQuery = {}>'
    // ø </contacts-directQuery-emailQuery-emailQueryWithKludge>
    
    // ø <action-actionEvaluation-final>
    // enroll.familyId = PENDING
    // enroll.familyIdStatus = 'PENDING'//'Staff-Eye-D' inferred by Data, precision here not necessary
    // enroll.maxPreviousTermIdFamily = 201506
    // enroll.maxPreviousTermIdStudent = 201506

    // ø <enroll.action AT TOP for superEnrollmentStatsu>
    // ø enroll.action = {}
    // ø enroll.action.superEnrollmentStatus = 'PENDING';//local.getItem('superEnrollmentStatus')
    // ø </enroll.action AT TOP for superEnrollmentStatsu>
    
    // memory.getItem('ppAction'): null
    // memory.getItem('stAction'): null
    // memory.getItem('spAction'): null
    
    enroll.action.primary = {}
    enroll.action.primary.member = 'PENDING_LOGIC'
    enroll.action.primary.contact = 'PENDING_LOGIC'
    enroll.action.primary.dataBase = 'PENDING_LOGIC'
    enroll.action.primary.ppAction = 'PENDING|PENDING|PENDING'
    // enroll.emailQuery.primary.familyId = 'DANGER'
    // enroll.action.primary.familyId = enroll.application.familyId
    enroll.action.student = {}
    enroll.action.student.member = 'PENDING_LOGIC'
    enroll.action.student.contact = 'PENDING_LOGIC'
    enroll.action.student.dataBase = 'PENDING_LOGIC'
    enroll.action.student.stAction = 'PENDING|PENDING|PENDING'
    // enroll.action.student.studentId = enroll.application.studentId
    // enroll.emailQuery.student.studentId = 'DANGER'
    enroll.action.secondary = {}
    enroll.action.secondary.member = 'PENDING_LOGIC_but_NA'
    enroll.action.secondary.contact = 'PENDING_LOGIC'
    enroll.action.secondary.dataBase = 'PENDING_LOGIC'
    enroll.action.secondary.spAction = 'PENDING|PENDING|PENDING'
    // enroll.emailQuery.secondary.secondaryId = 'DANGER'
    // enroll.action.secondary.secondaryId = enroll.application.secondaryId
    // ø <SAME AS APPLICATION: update if different>
    // ø <>
    console.groupEnd()

    DOX = '<FINAL: enroll.action By Confirmed>'
    // enroll.action.primary = {}
    enroll.action.primary.member = (enroll.confirmed.familyId).length > 30 ? 'SKIP' : 'INSERT'
    enroll.action.primary.contact = enroll.confirmed.familyUpToDate ? 'SKIP' : 'UPDATE'
    enroll.action.primary.dataBase = enroll.confirmed.familyUpToDate ? 'SKIP' : 'INSERT'
    enroll.action.primary.ppAction = enroll.action.primary.member + '|' + enroll.action.primary.contact + '|' + enroll.action.primary.dataBase
    enroll.action.primary.ppAction = enroll.action.superEnrollmentStatus !== 'CONTINUE' ? enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus: enroll.action.primary.ppAction

    // enroll.action.student = {}
    enroll.action.student.member = (enroll.confirmed.studentId).length > 30 ? 'SKIP' : 'INSERT'
    enroll.action.student.contact = enroll.confirmed.studentUpToDate ? 'SKIP' : 'UPDATE'
    enroll.action.student.dataBase = enroll.confirmed.studentUpToDate ? 'SKIP' : 'INSERT'
    enroll.action.student.stAction = enroll.action.student.member + '|' + enroll.action.student.contact + '|' + enroll.action.student.dataBase
    enroll.action.student.stAction = enroll.action.superEnrollmentStatus !== 'CONTINUE' ? enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus: enroll.action.student.stAction

    // enroll.action.secondary = {}
    let possibleNULLvalueArray = ['NULL', 'EMPTY', 'PENDING', 'NA', 'UNCONFIRMED', 'NNULL', 'EEMPTY', 'PPENDING', 'NNA', 'UUNCONFIRMED']
    let secondaryFirstIsValid = !possibleNULLvalueArray.includes((enroll.application.secondary.spFirst).toUpperCase())
    secondaryFirstIsValid = secondaryFirstIsValid && (enroll.application.secondary.spFirst).length > 0
    let secondaryIsPerson = (enroll.confirmed.secondaryId).length > 30 ? true : false
    let secondaryIsUpToDate = enroll.confirmed.secondaryUpToDate
    enroll.action.secondary.member = 'NA' // ALWAYS 'NA'
    enroll.action.secondary.contact = secondaryFirstIsValid ? 'UPSERT' : 'PENDING'
    enroll.action.secondary.contact = secondaryIsPerson ? 'UPDATE' : enroll.action.secondary.contact
    enroll.action.secondary.contact = secondaryIsUpToDate ? 'SKIP' : enroll.action.secondary.contact
    enroll.action.secondary.contact = enroll.action.secondary.contact === 'UPSERT' ? 'INSERT' : enroll.action.secondary.contact
    enroll.action.secondary.contact = enroll.action.secondary.contact === 'PENDING' ? 'SKIP' : enroll.action.secondary.contact
    enroll.action.secondary.dataBase = enroll.action.secondary.contact === 'UPDATE' ? 'INSERT' : enroll.action.secondary.contact
    enroll.action.secondary.spAction = enroll.action.secondary.member + '|' + enroll.action.secondary.contact + '|' + enroll.action.secondary.dataBase
    enroll.action.secondary.spAction = enroll.action.superEnrollmentStatus !== 'CONTINUE' ? enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus + '|' + enroll.action.superEnrollmentStatus: enroll.action.secondary.spAction
    DOX = '</FINAL: enroll.action By Confirmed>'
    // return
    enroll.action.termId = enroll.application.termId
    enroll.action.familySeed = 'PENDING'//enroll.application.familySeed
    // enroll.action.familySeed = enroll.application.familySeed
    // enroll.action.primary = {}
    enroll.action.primary.familyEmail = enroll.application.primary.familyEmail
    enroll.action.primary.ppFirst = enroll.application.primary.ppFirst
    enroll.action.primary.ppLast = enroll.application.ppLast
    // enroll.action.student = {}
    enroll.action.student.studentEmail = enroll.application.student.studentEmail
    enroll.action.student.stFirst = enroll.application.student.stFirst
    enroll.action.student.stPreferredFirst = enroll.application.student.stPreferredFirst
    enroll.action.student.stLast = enroll.application.student.stLast
    // enroll.action.secondary = {}
    enroll.action.secondary.secondaryEmail = enroll.application.secondary.secondaryEmail
    enroll.action.secondary.spFirst = enroll.application.secondary.spFirst
    enroll.action.secondary.spLast = enroll.application.secondary.spLast
    // ø </>
    // ø </SAME AS APPLICATION: update if different>
    // ø </action-actionEvaluation-final>
    local.setItem('enrollObjectJSON', JSON.stringify(enroll))
    local.setItem('lastDevelObject', JSON.stringify(develObject))

    return enroll
}
// ø 202110_instantiateEnrollmentObject-END
// ø <-------------------- </instantiateEnrollmentObject> -------------------->
// ø <---------- </NEW> ---------->
 
// ø <---------- </manually added Step Functions> ---------->
export async function ppMemberPrepJSON() {
    let stepItemKeyThis = 'ppMemberPrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z483]entering: ' + 'ppMemberPrepJSON() at ' + memory.getItem('lastStamp'))
    let ppMemberAction = local.getItem('ppAction').split('|')[0];

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->
    let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));

    if (local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE') {
        let ppPhoneIndex = -1;
        for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
            let element = enrollmentObject.family.phones[index];
            if (element.role === "Primary Parent") {
                ppPhoneIndex = index;
            }

        }
        ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;

        let ppEmailIndex = -1;
        for (let index = 0; index < enrollmentObject.family.emails.length; index++) {
            let element = enrollmentObject.family.emails[index];
            if (element.role === "Primary Parent") {
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
    } else {
        memory.setItem('ppMemberPrepJSON', 'ppMemberPrepJSON' + ' UPDATE PREPPED on ' + memory.getItem('lastStamp'));
    }
}

export async function ppMemberExecuteUpsert() {
    let stepItemKeyThis = 'ppMemberExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z530] Entering ppMemberExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let ppActionArray = memory.getItem('ppAction').split('|');
    let ppActionMember = ppActionArray[0];
    local.setItem('logString', local.getItem('logString') + '\n[~Z546]ppActionMember: ' + ppActionMember);


    let paramObjectParam = {};
    paramObjectParam.memoryKey = "ppMemberPrepJSON";
    if (ppActionMember === 'INSERT') {
        let ppMemberResponse = await steamdaMemberRegistration(paramObjectParam);
        local.setItem('familyId', ppMemberResponse.user.id);
        let familySeed = ppMemberResponse.user.id;
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        local.setItem('familySeed', familySeed);
        memory.setItem('ppMemberExecuteUpsert', JSON.stringify(ppMemberResponse));
    }
    if (ppActionMember === 'UPDATE') {
        let paramObjectThis = JSON.parse(memory.getItem('ppMemberPrepJSON'));

        let ppMemberUpdateResponse = updateUserFields(local.getItem('staffIdentifiedFamilyId'), paramObjectThis.firstName, paramObjectThis.lastName, paramObjectThis.email, paramObjectThis.phone);
        memory.setItem('ppMemberExecuteUpsert', JSON.stringify(ppMemberUpdateResponse));
    }
    local.setItem('logString', local.getItem('logString') + '\n[~Z569] Exiting ppMemberExecuteUpsert()');
}

export async function stMemberPrepJSON() {
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z573] Entering stMemberPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let enrollmentObject = JSON.parse(local.getItem("ondeckEnrollmentJSON"));
    // ø <KLUDGE> there will need to be a more robust query
    if (memory.getItem('yyyymm') > "202108") {
        memory.setItem('stMemberPrepJSON', 'stMemberPrepJSON' + ' REQUIRES QUERY FOR EXISTING STUDENT');
        return;
    } else {
        local.setItem('studentId', 'INSTANTIATE')
    }
    // ø </KLUDGE>
    if (local.getItem('studentId') === 'INSTANTIATE') {
        // º <phone>
        // º <phone WAS same as PP>
        let ppPhoneIndex = -1;
        for (let index = 0; index < enrollmentObject.family.phones.length; index++) {
            let element = enrollmentObject.family.phones[index];
            if (element.role === "Primary Parent") {
                ppPhoneIndex = index;
            }

        }
        ppPhoneIndex = ppPhoneIndex === -1 ? 0 : ppPhoneIndex;
        // º </phone WAS same as PP>
        // º <phone NOW from familyId>
        let phone = local.getItem('familyId');
        phone = phone.replace(/[^0-9]/g, '');
        let phIndex = 0;
        let digitArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        while (phone.length < 10) {
            ppPhoneIndex++;
            phone += digitArray[Math.floor(Math.random() * digitArray.length)];
        }
        console.log('phIndex: ' + phIndex);
        console.log('phone: ' + phone);
        phone = phone.substr(0, 10);
        console.log('phone: ' + phone);
        // º </phone>

        let firstLegal = enrollmentObject.family.student.name.first;
        let firstPreferred = enrollmentObject.family.student.name.preferred;
        let email = firstLegal;
        let firstSpace = email.indexOf(' ');
        email = firstSpace > 0 ? email.substr(0, firstSpace) : email;
        email += local.getItem('familySeed').substr(0, 4);//should be identical to above, 
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
    } else {
        memory.setItem('stMemberPrepJSON', 'stMemberPrepJSON' + ' UPDATE PREPPED on ' + memory.getItem('lastStamp'));
    }
}

export async function stMemberExecuteUpsert() {
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z649] Entering stMemberExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    if (local.getItem('studentId') === 'INSTANTIATE') {
        let paramObjectParam = {};
        paramObjectParam.memoryKey = "stMemberPrepJSON";
        let stMemberResponse = await steamdaMemberRegistration(paramObjectParam);
        console.log('[~Z408] stMemberResponse: ');
        console.log(stMemberResponse);
        local.setItem('studentId', stMemberResponse.user.id);
        memory.setItem('stMemberExecuteUpsert', JSON.stringify(stMemberResponse));
    } else {
        memory.setItem('stMemberExecuteUpsert', 'stMemberExecuteUpsert' + ' UPDATE EXECUTED on ' + memory.getItem('lastStamp'));
    }
}

// ø <---------- <ppStContactDedupe>  ---------->
// ø <---------- <ppStContactDedupe>  ---------->
export async function ppStContactDedupe(paramObject = {}) {
    //pstEnrSeven202108ppStContactDedupe
    // 202109_DeDupeCode
    console.groupCollapsed('ppStContactDedupe()');
    let diagnosticOnly = typeof paramObject.diagnosticOnly === 'boolean' && paramObject.diagnosticOnly === true ? true : false;

    // ø <ELSE>
    let regexId = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;
    let regexEmail = /^\S+@\S+\.\S+$/;
    let allParametersValid = true;
    let expressionIsValid = regexId.test(local.getItem('familyId'));
    let DOX = `Is '${local.getItem('familyId')} a Valid PP ID?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    expressionIsValid = regexEmail.test(local.getItem('familyEmail'));
    DOX = `Is '${local.getItem('familyEmail')} a Valid PP Email?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    expressionIsValid = regexId.test(local.getItem('studentId'));
    DOX = `Is '${local.getItem('studentId')} a Valid ST ID?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    expressionIsValid = regexEmail.test(local.getItem('studentEmail'));
    DOX = `Is '${local.getItem('studentEmail')} a Valid ST Email?: ${expressionIsValid}`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    allParametersValid = expressionIsValid ? allParametersValid : false;
    if(typeof allParametersValid !== 'boolean' || allParametersValid !== true){
        DOX = `'danger': One or more Key Data Points for the Primary Parent and Student is Invalid.`;
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        memory.setItem('stepResponseBootstrapKey','danger');
        await appendStepLogPPEQ('danger', `One or more Key Data Points for the Primary Parent and Student is Invalid.`);
        console.log(`≈12123≈ One or more Key Data Points for the Primary Parent and Student is Invalid`);
        console.groupEnd();
        return;
    }
    DOX = `'success': All Key Data Points for the Primary Parent and Student are Valid.`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø </ELSE>
    console.groupEnd();



    // ø <pedantic at first>
    let responseObjectCombo = {};
    let tobeDeletedTotal = 0;
    let actuallyDeletedTotal = 0;
    // ø <Primary Parent DeDupe>
    let paramObjectPrimary = {};
    paramObjectPrimary.emailToFind = local.getItem('familyEmail');
    paramObjectPrimary.notIdToFind = local.getItem('familyId');
    paramObjectPrimary.diagnosticOnly = true;
    paramObjectPrimary.collectHumanLog = false;
    await getContactByEmailAndNotIdFunction(paramObjectPrimary);
    responseObjectCombo.paramObjectPrimary = paramObjectPrimary;
    DOX = 'vvvvvvvvvv ##### MANIPULATE VALUES FOR TESTING ##### vvvvvvvvvv';
    // 202109_processALIASES
    // paramObjectPrimary.results.tobeDeletedCount++;
    // paramObjectPrimary.results.actuallyDeletedCount++;
    DOX = '^^^^^^^^^^ ##### MANIPULATE VALUES FOR TESTING ##### ^^^^^^^^^^';
    tobeDeletedTotal += paramObjectPrimary.results.tobeDeletedCount;
    actuallyDeletedTotal += paramObjectPrimary.results.actuallyDeletedCount;
    let isValidPrimary = true;
    let isValidPrimaryString = 'TTRUE';
    isValidPrimary        = paramObjectPrimary.emailToFind === local.getItem('familyEmail') ? isValidPrimary : false;
    isValidPrimaryString  = paramObjectPrimary.emailToFind === local.getItem('familyEmail') ? isValidPrimaryString : '_EMAIL';
    isValidPrimary        = paramObjectPrimary.notIdToFind === local.getItem('familyId') ? isValidPrimary : false;
    isValidPrimaryString += paramObjectPrimary.notIdToFind === local.getItem('familyId') ? '' : '_PPID';
    paramObjectPrimary.isValidPrimary = isValidPrimary;
    // ø </Primary Parent DeDupe>
    // ø <Student DeDupe>
    let paramObjectStudent = {};
    paramObjectStudent.emailToFind = local.getItem('studentEmail');
    paramObjectStudent.notIdToFind = local.getItem('studentId');
    paramObjectStudent.diagnosticOnly = true;
    paramObjectStudent.collectHumanLog = false;
    await getContactByEmailAndNotIdFunction(paramObjectStudent);
    responseObjectCombo.paramObjectStudent = paramObjectStudent;
    DOX = 'vvvvvvvvvv ##### MANIPULATE VALUES FOR TESTING ##### vvvvvvvvvv';
    // 202109_processALIASES
    // paramObjectStudent.results.tobeDeletedCount++;
    // paramObjectStudent.results.actuallyDeletedCount++;
    DOX = '^^^^^^^^^^ ##### MANIPULATE VALUES FOR TESTING ##### ^^^^^^^^^^';
    tobeDeletedTotal += paramObjectStudent.results.tobeDeletedCount;
    actuallyDeletedTotal += paramObjectStudent.results.actuallyDeletedCount;
    let isValidStudent = true;
    let isValidStudentString = 'TTRUE';
    isValidStudent        = paramObjectStudent.emailToFind === local.getItem('studentEmail') ? isValidStudent : false;
    isValidStudentString  = paramObjectStudent.emailToFind === local.getItem('studentEmail') ? isValidStudentString : '_EMAIL';
    isValidStudent        = paramObjectStudent.notIdToFind === local.getItem('studentId') ? isValidStudent : false;
    isValidStudentString += paramObjectStudent.notIdToFind === local.getItem('studentId') ? '' : '_STID';
    paramObjectStudent.isValidStudent = isValidStudent;
    // ø </Student DeDupe>
    let stepResponseBootstrapKey = 'success';
    if(tobeDeletedTotal > 0){
        stepResponseBootstrapKey = 'warning';
        DOX = 'DUPLICATE_EXISTS';
        DOX += paramObjectPrimary.results.tobeDeletedCount > 0 ? '_PRIMARY' : '';
        DOX += paramObjectStudent.results.tobeDeletedCount > 0 ? '_STUDENT' : '';

    }
    if(tobeDeletedTotal - actuallyDeletedTotal !== 0){
        stepResponseBootstrapKey = 'danger';
        DOX = 'DUPLICATE_UNDELETED';
        DOX += paramObjectPrimary.results.tobeDeletedCount - paramObjectPrimary.results.actuallyDeletedCount !== 0 ? '_PRIMARY' : '';
        DOX += paramObjectStudent.results.tobeDeletedCount - paramObjectStudent.results.actuallyDeletedCount !== 0 ? '_STUDENT' : '';

    }
    if(isValidPrimary === false){
        stepResponseBootstrapKey = 'danger';
        DOX = 'INVALID_PRIMARY' + isValidPrimaryString;

    }
    if(isValidStudent === false){
        stepResponseBootstrapKey = 'danger';
        DOX = 'INVALID_STUDENT' + isValidStudentString;

    }
    
    if(stepResponseBootstrapKey !== 'success'){
        memory.setItem('stepResponseBootstrapKey',stepResponseBootstrapKey);
        await appendStepLogPPEQ(stepResponseBootstrapKey, DOX);
        console.log(`≈2208≈ DeDupe: stepResponseBootstrapKey: ${DOX}`);
    }
    memory.setItem('stepResponseBootstrapKey',stepResponseBootstrapKey);
    // memory.setItem('stepResponseBootstrapKey','Algonquin');
    responseObjectCombo.stepResponseBootstrapKey = memory.getItem('stepResponseBootstrapKey');
    $w('#sessionEnrollmentJSON').value = JSON.stringify(responseObjectCombo,undefined,4)
    // ø </pedantic at first>
 }
// ø <---------- </ppStContactDedupe> ---------->
// ø <---------- </ppStContactDedupe> ---------->

// ø <---------- <ppContactPrepJSON AS Step-Function>  ---------->
export async function ppContactPrepJSON() {
    let stepItemKeyThis = 'ppContactPrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z680] Entering ppContactPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->
    let ppContactAction = (memory.getItem('ppAction').split('|'))[1];
    if (ppContactAction === 'SKIP') {
        memory.setItem('ppContactPrepJSON', `ppContactAction === 'SKIP'`);
        local.setItem('logString', local.getItem('logString') + `\n[~Z807] 'SKIP' ppContactPrepJSON()`);
        return;
    }

    let contact = await steamdaGetContactFunction(local.getItem('familyId'));
    if (typeof contact.revision === 'number' && contact.revision > 0) {
        memory.setItem('ppRevision', (contact.revision).toString());
    } else {
        local.setItem('logString', local.getItem('logString') + "\n[703] Failure of `steamdaGetContactFunction(local.getItem('familyId'))'");
        return;
    }

    let paramObjectThis = {};
    paramObjectThis.contactIdentifiers = {};
    if (contact._id === local.getItem('familyId')) {
        paramObjectThis.contactIdentifiers.contactId = contact._id;
        paramObjectThis.contactIdentifiers.revision = contact.revision;
    } else {
        paramObjectThis.contactIdentifiers.contactId = "EERROR";
        paramObjectThis.contactIdentifiers.errorContactId = contact._id;
        paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        paramObjectThis.errorString = "Member ID !== Contact ID";
    }
    if (paramObjectThis.contactIdentifiers.contactId !== 'EERROR') {
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


        let weekIdToLabelKeyJSON = [['custom.w0-2021010102', '0101', '0102'], ['custom.w1-2021060711', '0607', '0611'], ['custom.w2-2021061418', '0614', '0618'], ['custom.w3-2021062125', '0621', '0625'], ['custom.w4-2021062832', '0628', '0702'], ['custom.w5-2021071216', '0712', '0716'], ['custom.w6-2021071923', '0719', '0723'], ['custom.w7-2021072630', '0726', '0730'], ['custom.w8-2021080206', '0802', '0806'], ['custom.w9-2021080913', '0809', '0813']];
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            let labelKeyRow = weekIdToLabelKeyJSON[element.weekId];
            console.log('[' + element.weekId + ']labelKeyRow:');
            console.log(labelKeyRow);
            if (!finalLabelKeyArray.includes(labelKeyRow[0])) {
                finalLabelKeyArray.push(labelKeyRow[0]);
            }
            beginBDAY = labelKeyRow[1];
            endBDAY = labelKeyRow[2];
            wkBDAY = studentBDAY < beginBDAY ? false : true;
            wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
            wkBDAY = finalLabelKeyArray.includes(labelKeyRow[0] + 'bday') ? false : wkBDAY;
            if (wkBDAY) {
                finalLabelKeyArray.push(labelKeyRow[0] + 'bday');
            }
        }
        finalLabelKeyArray.push(local.getItem('termLabelKey'));

        if (tBDAY) {
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
        if (assignLocation) {
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
    memory.setItem('ppContactPrepJSON', paramJSON);
    local.setItem('logString', local.getItem('logString') + '\n[~Z907] Exiting ppContactPrepJSON()');
}
// ø <---------- </ppContactPrepJSON AS Step-Function> ---------->

// ø <---------- <ppDatabasePrepJSON AS Step-Function>  ---------->
export async function ppDatabasePrepJSON() {
    let stepItemKeyThis = 'ppDatabasePrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z907] Entering ppDatabasePrepJSON() at ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let ppActionArray = memory.getItem('ppAction').split('|');
    let ppActionDbase = ppActionArray[2];
    local.setItem('logString', local.getItem('logString') + '\n[~Z890]ppActionDbase: ' + ppActionDbase);

    let logString = '';
    if (ppActionDbase === 'SKIP') {
        logString = "based on action'" + ppActionDbase + "' no further action in this Step-Function";
        memory.setItem('ppDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: ppDatabasePrepJSON()');
        return;
    }
    if (ppActionDbase !== 'INSERT') {
        logString = "this ppActionDbase, '" + ppActionDbase + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('ppDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + ppActionDbase + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "ppActionDbase, '" + ppActionDbase + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: ppDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus', 'ALERT');
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
    let ppInsertResult = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->

    memory.setItem('ppDatabasePrepJSON', JSON.stringify(ppInsertResult));
    local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: ppDatabasePrepJSON() [see results at memory.getItem(ppDatabasePrepJSON)]');
    return;
}
// ø <---------- </ppDatabasePrepJSON AS Step-Function> ---------->

export function ppDatabasePrepJSON_DEP() {
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- timeDEPDateString ---------->

}

// ø <---------- <stContactPrepJSON AS Step>  ---------->
export async function stContactPrepJSON() {
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1021] Entering stContactPrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let contact = await steamdaGetContactFunction(local.getItem('studentId'));
    memory.setItem('stRevision', (contact.revision).toString());
    let stEmail = contact.info.emails[0].email;
    let stPhone = contact.info.phones[0].phone;

    let paramObjectThis = {};
    paramObjectThis.contactIdentifiers = {};
    if (contact._id === local.getItem('studentId')) {
        paramObjectThis.contactIdentifiers.contactId = contact._id;
        paramObjectThis.contactIdentifiers.revision = contact.revision;
    } else {
        paramObjectThis.contactIdentifiers.contactId = "EERROR";
        paramObjectThis.contactIdentifiers.errorContactId = contact._id;
        paramObjectThis.contactIdentifiers.errorMemberId = local.getItem('familyId');
        paramObjectThis.contactIdentifiers.revision = contact.revision;
        paramObjectThis.errorString = "Member ID !== Contact ID";
    }
    if (paramObjectThis.contactIdentifiers.contactId !== 'EERROR') {
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
        let maleOptionArray = ['masculine', 'men', 'he', 'man', 'male', 'gentleman', 'boy', 'guy', 'fellow', 'gent', 'bloke', 'chap', 'lad'];
        let femaleOptionArray = ['woman', 'female', 'lady', 'girl', 'lass', 'lassie', 'bird'];
        assignedGenderKey = maleOptionArray.includes(declaredGender) ? 'male' : assignedGenderKey;
        assignedGenderKey = femaleOptionArray.includes(declaredGender) ? 'female' : assignedGenderKey;
        assignedGenderKey = assignedGenderKey === 'unreported' && declaredGender.length > 0 ? 'alternative' : assignedGenderKey;
        let genderLabelKey = 'custom.gender-' + assignedGenderKey;

        let weekIdToLabelKeyJSON = [['custom.w0-2021010102', '0101', '0102'], ['custom.w1-2021060711', '0607', '0611'], ['custom.w2-2021061418', '0614', '0618'], ['custom.w3-2021062125', '0621', '0625'], ['custom.w4-2021062832', '0628', '0702'], ['custom.w5-2021071216', '0712', '0716'], ['custom.w6-2021071923', '0719', '0723'], ['custom.w7-2021072630', '0726', '0730'], ['custom.w8-2021080206', '0802', '0806'], ['custom.w9-2021080913', '0809', '0813']];
        let courseArray = enrollmentObject.courses_array;
        let finalLabelKeyArray = [];
        let beginBDAY = "";
        let endBDAY = "";
        let wkBDAY = false;
        for (let index = 0; index < courseArray.length; index++) {
            let element = courseArray[index];
            let labelKeyRow = weekIdToLabelKeyJSON[element.weekId];
            console.log('[' + element.weekId + ']labelKeyRow:');
            console.log(labelKeyRow);
            if (!finalLabelKeyArray.includes(labelKeyRow[0])) {
                finalLabelKeyArray.push(labelKeyRow[0]);
            }
            beginBDAY = labelKeyRow[1];
            endBDAY = labelKeyRow[2];
            wkBDAY = studentBDAY < beginBDAY ? false : true;
            wkBDAY = studentBDAY > endBDAY ? false : wkBDAY;
            wkBDAY = finalLabelKeyArray.includes(labelKeyRow[0] + 'bday') ? false : wkBDAY;
            if (wkBDAY) {
                finalLabelKeyArray.push(labelKeyRow[0] + 'bday');
            }
        }
        finalLabelKeyArray.push(local.getItem('termLabelKey'));

        if (tBDAY) {
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
        if (assignLocation) {
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
    console.log('[~Z966]paramObjectThis:');
    console.log(paramObjectThis);
    let paramJSON = JSON.stringify(paramObjectThis);
    memory.setItem('stContactPrepJSON', paramJSON);
}
// ø <---------- </stContactPrepJSON AS Step> ---------->
// ø <---------- <stDatabasePrepJSON AS Step-Function>  ---------->
export async function stDatabasePrepJSON() {
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1265] Entering stDatabasePrepJSON() at ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    local.setItem('logString', local.getItem('logString') + '\n[~Z1242]entering: ' + 'stDatabasePrepJSON()');
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");
    let stActionArray = memory.getItem('stAction').split('|');
    let stActionDbase = stActionArray[2];
    local.setItem('logString', local.getItem('logString') + '\n[~Z1246]stActionDbase: ' + stActionDbase);

    let logString = '';
    if (stActionDbase === 'SKIP') {
        logString = "based on action'" + stActionDbase + "' no further action in this Step-Function";
        memory.setItem('ppDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~Z1253]exiting: ppDatabasePrepJSON()');
        return;
    }
    if (stActionDbase !== 'INSERT') {
        logString = "this stActionDbase, '" + stActionDbase + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('ppDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + stActionDbase + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "stActionDbase, '" + stActionDbase + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z1262]exiting: ppDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus', 'ALERT');
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
    let stInsertResult = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->

    memory.setItem('stDatabasePrepJSON', JSON.stringify(stInsertResult));
    return;

}
// ø <---------- </stDatabasePrepJSON AS Step-Function> ---------->
export async function stDatabasePrepJSON_DEP() {
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1369] Entering stDatabasePrepJSON() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepDEPStampArray ---------->

    memory.setItem('stDatabasePrepJSON', 'stDatabasePrepJSON' + ' PREPPED on ' + memory.getItem('lastStamp'));
}

// ø <---------- <spContactPrepJSON AS Step-Function>  ---------->
export async function spContactPrepJSON() {
    let stepItemKeyThis = 'spContactPrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));

    local.setItem('logString', local.getItem('logString') + '\n[~Z1398] Entering spContactPrepJSON() at ' + memory.getItem('lastStamp'));

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
    if (spActionContact === 'SKIP') {
        logString = "based on action'" + spActionContact + "' no further action in this Step-Function";
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~Z1419]exiting: spDatabasePrepJSON()');
        paramObjectThis.spActionContact = spActionContact;
        paramObjectThis.log = 'NO ACTION INDICATED';
        memory.setItem('spContactPrepJSON', JSON.stringify(paramObjectThis));
        return;
    }
    if (spActionContact !== 'INSERT') {
        logString = "this spActionContact, '" + spActionContact + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + spActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "spActionDbase, '" + spActionContact + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z1431]exiting: spDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus', 'ALERT');
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
    local.setItem('logString', local.getItem('logString') + '\n[~Z1559]exiting: spDatabasePrepJSON()');
}
// ø <---------- </spContactPrepJSON AS Step-Function> ---------->

// ø <---------- <spDatabasePrepJSON AS Step-Function>  ---------->
export async function spDatabasePrepJSON() {
    let stepItemKeyThis = 'spDatabasePrepJSON';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z907] Entering spDatabasePrepJSON() at ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + "\n    \\_ is acually 'INSERT' (or 'SKIP') as the code is so direct");

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let spActionArray = memory.getItem('spAction').split('|');
    let spActionDbase = spActionArray[2];

    let logString = '';
    // ø <CATCH Else (decoupling) Actions>
    if (spActionDbase === 'SKIP') {
        logString = "based on action'" + spActionDbase + "' no further action in this Step-Function";
        memory.setItem('spDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: spDatabasePrepJSON()');
        return;
    }
    if (spActionDbase !== 'INSERT') {
        logString = "this spActionDbase, '" + spActionDbase + "', is NOT suzzorted and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('spDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + spActionDbase + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "spActionDbase, '" + spActionDbase + "', is NOT suzzorted. Only 'INSERT' and 'SKIP' are suzzorted. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: spDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus', 'ALERT');
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
    let spInsertResult = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->

    memory.setItem('spDatabasePrepJSON', JSON.stringify(spInsertResult));
    local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: spDatabasePrepJSON() [see results at memory.getItem(spDatabasePrepJSON)]');
    return;

}
// ø <---------- </spDatabasePrepJSON AS Step-Function> ---------->

export async function ppContactExecuteUpsert() {
    let stepItemKeyThis = 'ppContactExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1415] Entering ppContactExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let ppActionArray = memory.getItem('ppAction').split('|');
    let ppActionContact = ppActionArray[1];
    local.setItem('logString', local.getItem('logString') + '\n[~Z890]ppActionContact: ' + ppActionContact);
    if (ppActionContact !== 'UPDATE') {
        let logString = "this ppActionContact, '" + ppActionContact + "', is NOT suzzorted and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('spDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + ppActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "ppActionContact, '" + ppActionContact + "', is NOT suzzorted. Only 'INSERT' and 'SKIP' are suzzorted. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z1688]exiting: ppContactExecuteUpsert()');
        local.setItem('superEnrollmentStatus', 'ALERT');
        return;
    }

    memory.setItem('ppContactExecuteUpsert', 'ppContactExecuteUpsert' + ' EXECUTED on ' + memory.getItem('lastStamp'));

    let ppContactParamObject = JSON.parse(memory.getItem('ppContactPrepJSON'));
    let response = await doUpdateContact(ppContactParamObject);
    local.setItem('logString', local.getItem('logString') + '\n[~Z1736]exiting: ppContactExecuteUpsert() after UPDATE:\n' + JSON.stringify(response));
}

export async function ppDatabaseExecuteUpsert() {
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->
    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1435] Entering ppDatabaseExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    memory.setItem('ppDatabaseExecuteUpsert', 'ppDatabaseExecuteUpsert: Upsert Executed in Prep' + '[separation of PREP & EXECUTE seems overkill, but this separation exist for reconsideration later]' + ' EXECUTED on ' + memory.getItem('lastStamp'));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1752] ppDatabaseExecuteUpsert: Upsert Executed in Prep');
}

export async function stContactExecuteUpsert() {
    let stepItemKeyThis = 'stContactExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1450] Entering stContactExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let stActionArray = memory.getItem('stAction').split('|');
    let stActionContact = stActionArray[1];
    local.setItem('logString', local.getItem('logString') + '\n[~Z1733]stActionContact: ' + stActionContact);
    if (stActionContact !== 'UPDATE') {
        let logString = "this stActionContact, '" + stActionContact + "', is NOT suzzorted and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('spDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + stActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "ppActionContact, '" + stActionContact + "', is NOT suzzorted. Only 'INSERT' and 'SKIP' are suzzorted. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z1739]exiting: stContactExecuteUpsert()');
        local.setItem('superEnrollmentStatus', 'ALERT');
        return;
    }

    memory.setItem('stContactExecuteUpsert', 'stContactExecuteUpsert' + ' EXECUTED on ' + memory.getItem('lastStamp'));

    console.log("[~Z990]memory.getItem('stContactPrepJSON'):");
    console.log(memory.getItem('stContactPrepJSON'));
    let stContactParamObject = JSON.parse(memory.getItem('stContactPrepJSON'));
    console.log('[~Z993]stContactParamObject:');
    console.log(stContactParamObject);
    await doUpdateContact(stContactParamObject);
    local.setItem('logString', local.getItem('logString') + '\n[~Z1752]exiting: stContactExecuteUpsert() after UPDATE');
}

export async function stDatabaseExecuteUpsert() {
    // ! although it would be fine, doIfElseThen_forCurrentStep() is NOT indicated for this Step
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->


    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1472] Entering stDatabaseExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    memory.setItem('stDatabaseExecuteUpsert', 'stDatabaseExecuteUpsert: Upsert Executed in Prep' + '[separation of PREP & EXECUTE seems overkill, but this separation exist for reconsideration later]' + ' EXECUTED on ' + memory.getItem('lastStamp'));
}

export async function spContactExecuteUpsert() {
    let stepItemKeyThis = 'spContactExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1565] Entering spContactExecuteUpsert() Base-Step at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    let spActionArray = memory.getItem('spAction').split('|');
    let spActionContact = spActionArray[1];
    let logString = '';
    if (spActionContact === 'SKIP') {
        logString = "based on action'" + spActionContact + "' no further action in this Step-Function";
        memory.setItem('ppDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + '\n[~Z1757]exiting: ppDatabasePrepJSON()');
        return;
    }
    if (spActionContact !== 'INSERT') {
        logString = "this ppActionDbase, '" + spActionContact + "', is NOT supported and is an error [see local.getItem('lastErrorString')]";
        memory.setItem('ppDatabasePrepJSON', logString);
        local.setItem('logString', local.getItem('logString') + "\n" + logString);
        local.setItem('logString', local.getItem('logString') + "\nbased on action'" + spActionContact + "' no further action in this Step-Function");
        local.setItem('lastErrorString', "ppActionDbase, '" + spActionContact + "', is NOT supported. Only 'INSERT' and 'SKIP' are supported. Please convey this message to the Developer Immediately");
        local.setItem('logString', local.getItem('logString') + '\n[~Z896]exiting: ppDatabasePrepJSON()');
        local.setItem('superEnrollmentStatus', 'ALERT');
        return;
    }

    memory.setItem('spContactExecuteUpsert', 'spContactExecuteUpsert' + ' EXECUTED on ' + memory.getItem('lastStamp'));

    await doSecondaryParentCreateContact();
    local.setItem('logString', local.getItem('logString') + '\n[~Z1583]exiting: ' + 'spContactExecuteUpsert() after INSERT');
}

export async function spDatabaseExecuteUpsert() {
    let stepItemKeyThis = 'spDatabaseExecuteUpsert';
    let ifContinue = doIfElseThen_forCurrentStep(stepItemKeyThis);
    if (ifContinue === 'RETURN') {
        return;
    }
    // ø <---------- <doIfElseThen_forCurrentStep> ---------->    

    memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~Z1509] Entering spDatabaseExecuteUpsert() at ' + memory.getItem('lastStamp'));

    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = memory.getItem('lastStamp');
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray', JSON.stringify(stepStampArrayObject));
    // ø <---------- stepStampArray ---------->

    memory.setItem('spDatabaseExecuteUpsert', 'spDatabaseExecuteUpsert: Upsert Executed in Prep' + '[separation of PREP & EXECUTE seems overkill, but this separation exist for reconsideration later]' + ' EXECUTED on ' + memory.getItem('lastStamp'));
}
// ø <---------- </all the Step Functions> ---------->


//<---------- <simpleCycleStepsZZZ>  ---------->
export function cycleStepsZZZ() {
    if (typeof memory.getItem('enrollmentStepList') !== 'string') {
        return;
    }
    if (memory.getItem('enrollmentStepList').indexOf(',') < 0) {
        return;
    }
    let list = memory.getItem('enrollmentStepList');
    let cycleThis = memory.getItem('enrollmentStepList').substr(0, memory.getItem('enrollmentStepList').indexOf(','));
    let newList = memory.getItem('enrollmentStepList').substr(memory.getItem('enrollmentStepList').indexOf(',') + 1);
    newList += ',' + cycleThis;
    memory.setItem('enrollmentStepList', newList);
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
export function instantiateLoopSwitchEnrollmentSteps(stepArrayParam = ['ORIG']) {
    // let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    // let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','dedupePpStContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    console.log('[1898]stepArrayParam: ');
    console.log(stepArrayParam);
    if (stepArrayParam.length === 0) {
        stepArrayParam.push('EEMPTY');
    }
    let stepArrayOrig = stepArrayParam;
    let stepArrayCheck = ['IINSTANTIATE', 'PREP_ppMember', 'EXECUTE_ppMember', 'PREP_stMember', 'EXECUTE_stMember', 'dedupePpStContact', 'PREP_ppContact', 'PREP_ppDatabase', 'PREP_stContact', 'PREP_stDatabase', 'PREP_spContact', 'PREP_spDatabase', 'EXECUTE_ppContact', 'EXECUTE_ppDatabase', 'EXECUTE_stContact', 'EXECUTE_stDatabase', 'EXECUTE_spContact', 'EXECUTE_spDatabase', 'CCOMPLETE'];
    if (stepArrayParam.length === 1 && stepArrayParam[0] === 'ORIG') {
        stepArrayOrig = ['IINSTANTIATE', 'PREP_ppMember', 'EXECUTE_ppMember', 'PREP_stMember', 'EXECUTE_stMember', 'dedupePpStContact', 'PREP_ppContact', 'PREP_ppDatabase', 'PREP_stContact', 'PREP_stDatabase', 'PREP_spContact', 'PREP_spDatabase', 'EXECUTE_ppContact', 'EXECUTE_ppDatabase', 'EXECUTE_stContact', 'EXECUTE_stDatabase', 'EXECUTE_spContact', 'EXECUTE_spDatabase', 'CCOMPLETE'];
    }
    if (stepArrayOrig.length === 1 || stepArrayOrig[stepArrayOrig.length - 1] !== 'CCOMPLETE') {
        stepArrayOrig.push('CCOMPLETE');
    }
    console.log('[1904]stepArrayOrig: ');
    console.log(stepArrayOrig);
    let stepList = stepArrayOrig.toString();
    memory.setItem('enrollmentStepList', stepList);
    memory.setItem('enrollmentStepCompleted', 'NNOT_AAPPLICABLE');
    let isArray = Array.isArray(stepArrayOrig);
    memory.setItem('enrollmentStepCurrent', stepArrayOrig[0]);
    memory.setItem('enrollmentStepNext', stepArrayOrig[1]);
}
// ø <---------- </instantiateLoopSwitchEnrollmentSteps> ---------->


// ø <---------- <stepsDisplayStatusAsReturnString>  ---------->
export function stepsDisplayStatusAsReturnString(tag = 'unknown tag') {
    let returnString = '========================================';
    returnString += '\n' + '==========      <' + tag + '>     ==========';
    returnString += '\n' + 'memItemCOMPLETED: ' + memory.getItem('enrollmentStepCompleted');
    returnString += '\n' + 'memItemCURRENT: ' + memory.getItem('enrollmentStepCurrent');
    returnString += '\n' + 'memItemNEXT: ' + memory.getItem('enrollmentStepNext');
    returnString += '\n' + 'memItemLIST: ';
    let List = memory.getItem('enrollmentStepList');
    List = List.replace('CCOMPLETE,', 'CCOMPLETE,\n')
    returnString += '\n' + List;
    returnString += '\n' + '==========      </' + tag + '>    ==========';
    returnString += '\n' + '========================================';
    return returnString;
}
// ø <---------- </stepsDisplayStatusAsReturnString> ---------->

// ø <---------- <stepsDisplayStatusAsConsoleWarn>  ---------->
export function stepsDisplayStatusAsConsoleWarn(tag = 'unknown tag') {

    console.warn('========================================')
    console.warn('==========      <' + tag + '>     ==========')
    console.warn('memItemCURRENT: ' + memory.getItem('enrollmentStepCurrent'))
    console.warn('memItemNEXT: ' + memory.getItem('enrollmentStepNext'))
    console.warn('memItemLIST: ')
    let List = memory.getItem('enrollmentStepList');
    List = List.replace('CCOMPLETE,', 'CCOMPLETE,\n')
    console.warn(List)
    console.warn('==========      </' + tag + '>    ==========')
    console.warn('========================================')
}
// ø <---------- </stepsDisplayStatusAsConsoleWarn> ---------->

// ø <---------- <stepsCycleSteps>  ---------->
export function stepsCycleSteps() {
    let funcStepArray = memory.getItem('enrollmentStepList').split(',');
    memory.setItem('enrollmentStepCompleted', funcStepArray[0]);
    memory.setItem('enrollmentStepCurrent', funcStepArray[1]);
    memory.setItem('enrollmentStepNext', funcStepArray[2]);
    let cycleElement = funcStepArray.shift();
    funcStepArray.push(cycleElement);
    memory.setItem('enrollmentStepList', funcStepArray.toString());
}
// ø <---------- </stepsCycleSteps> ---------->

// ø <---------- <doInstantiateExitAfter>  ---------->
export function doInstantiateExitAfter(exitAfter = 'TTRUE_FUCNTION_DEFAULT') {
    let exitNow = 'FFALSE';
    exitNow = exitAfter === 'ALL' ? 'TTRUE_ALL' : exitNow;
    memory.setItem('loopExitAfterStep', exitAfter);
    memory.setItem('loopExitNow', exitNow);
}
// ø <---------- </doInstantiateExitAfter> ---------->

// ø <---------- <doCheckExitAfter> ---------->
export function doCheckExitAfter() {
    // ø <ExitAfter Switch Check>
    let exitNow = memory.getItem('loopExitNow')
    let exitAfter = memory.getItem('loopExitAfterStep')
    exitNow = exitAfter === memory.getItem('enrollmentStepCurrent') ? 'EXIT_AFTER_MATCH' : exitNow;
    exitNow = memory.getItem('enrollmentStepCurrent') === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;
    memory.setItem('loopExitNow', exitNow);
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



export function clearByElementIdArray(elementIdArray) {
    // BACKED_UP
    if (!Array.isArray(elementIdArray)) {
        return;
    }
    elementIdArray.forEach(elementId => {
        elementId = elementId.substr(0, 1) === '#' ? elementId : '#' + elementId;
        $w(elementId).value = '';
        $w(elementId).resetValidityIndication();
    })

}

//ø <---------- <simpleComplexPass()>  ---------->
export function simpleComplexPass() {

    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let numeric = "0123456789";
    let start = Math.floor(Math.random() * alpha.length);
    let password = alpha.substr(start, 1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start, 1).toUpperCase();
    start = Math.floor(Math.random() * numeric.length);
    password += numeric.substr(start, 1);
    alpha = alpha + alpha.toLocaleUpperCase() + numeric;
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start, 1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start, 1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start, 1);
    start = Math.floor(Math.random() * alpha.length);
    password += alpha.substr(start, 1);

    return password;
}
//ø <---------- </simpleComplexPass()> ---------->

//ø <---------- <displaySteps>  ---------->
export function displaySteps() {
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
    doUserInterfaceCleanupCurrent();
}
//ø <---------- </displaySteps> ---------->

// ø <---------- <doEnrollmentLogCurrent>  ---------->
// ø <---------- <doEnrollmentLogCurrent_byKind.js filename>  ---------->
export function doEnrollmentLogCurrent(kind = 'DDEFAULT') {
    let kindSupportedArray = ['CODE', 'STEPS', 'DATA', 'CORE', 'NONPERSISTENT', 'LOG', 'ERROR', 'UNACCOUNTED_FOR', 'STATE', 'DDEFAULT'];
    kind = kindSupportedArray.includes(kind) ? kind : 'DDEFAULT';
    console.warn('kind: ' + kind);

    // ø <code Log for Current Enrollment> mostly for testing
    let logString = '';
    // ø <DATA>
    if (kind === 'DATA' || kind === 'DDEFAULT') {
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
        logString += '\n' + "local.getItem('stLast'): " + local.getItem('spLast');
        logString += '\n' + "local.getItem('spFirst'): " + local.getItem('spFirst');
        logString += '\n' + "local.getItem('spLast'): " + local.getItem('stLast');
        logString += '\n' + "local.getItem('comboName'): " + local.getItem('comboName');
        logString += '\n' + "[CORE]local.getItem('termId'): " + local.getItem('termId');
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <CODE>
    if (kind === 'CODE' || kind === 'DDEFAULT') {
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
    if (kind === 'STEPS' || kind === 'DDEFAULT') {
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
    if (kind === 'CORE' || kind === 'DDEFAULT') {
        logString += '\n' + "local.getItem('timezoneOffset'): " + local.getItem('timezoneOffset');
        logString += '\n' + "local.getItem('tzAbbrv'): " + local.getItem('tzAbbrv');
        logString += '\n' + "local.getItem('yyyymm'): " + local.getItem('yyyymm');
        logString += '\n' + "local.getItem('termId'): " + local.getItem('termId');
        logString += '\n' + "local.getItem('termBeginMMDD')" + local.getItem('termBeginMMDD');
        logString += '\n' + "local.getItem('termEndMMDD')" + local.getItem('termEndMMDD');
        logString += '\n' + "local.getItem('termEndYYYYMMDD')" + local.getItem('termEndYYYYMMDD');
        logString += '\n' + "local.getItem('termLabelKey'): " + local.getItem('termLabelKey');
        logString += '\n' + "local.getItem('wixWebhookId'): " + local.getItem('wixWebhookId');
        logString += '\n' + "local.getItem('wixWebhookStatus'): " + local.getItem('wixWebhookStatus');
        logString += '\n' + "local.getItem('weekIdToLabelKeyJSON'): " + '\n' + local.getItem('weekIdToLabelKeyJSON');
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </CORE>
    // ø <UNACCOUNTED_FOR>
    if (kind === 'UNACCOUNTED_FOR' || kind === 'DDEFAULT') {
        if (kind !== 'UNACCOUNTED_FOR') {
            logString += '\n' + "local.getItem('ondeckEnrollmentJSON')" + local.getItem('ondeckEnrollmentJSON');
        }
        logString += '\n' + "memory.getItem('loopExitNow') ['memory' Dupe?]" + memory.getItem('loopExitNow');
        logString += '\n' + "memory.getItem('ppMemberOnDeckJSON') [Dupe with 'PREP'?" + memory.getItem('ppMemberOnDeckJSON');
        logString += '\n' + "memory.getItem('HHOLDER') [well...]" + memory.getItem('HHOLDER');
        logString += '\n' + "memory.getItem('loopExitAfterStep') ['memory' Dupe?]" + memory.getItem('loopExitAfterStep');
        logString += '\n' + "local.getItem('yyyymm') [where,how used?]" + local.getItem('yyyymm');
    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </UNACCOUNTED_FOR>
    // ø <STATE>
    if (kind === 'STATE' || kind === 'ZZZ_DDEFAULT') {
        // below depends upon memory.getItem(msboxLastState)
        // memory.getItem('msboxLastState');
        logString += '\n' + "memory.getItem('msboxCurrentId'): " + memory.getItem('msboxCurrentId');
        logString += '\n' + "memory.getItem('msboxLastState'): " + memory.getItem('msboxLastState');

    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </STATE>
    // ø <---------- <Alias Options>  ---------->
    // ø <NONPERSISTENT>
    if (kind === 'NONPERSISTENT') {
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
    if (kind === 'LOG' || kind === 'DDEFAULT') {
        logString += '\n' + "local.getItem('logString'): " + local.getItem('logString');
        logString += '\n' + "memory.getItem('lastStamp'): " + memory.getItem('lastStamp');
    }
    // ø </LOG>
    // ø <ERROR>
    if (kind === 'ERROR' || kind === 'DDEFAULT') {
        logString += '\n' + "local.getItem('lastErrorString'): " + local.getItem('lastErrorString');
    }
    // ø </ERROR>
    if (kind === 'MAN_IN_THE_HIGH_CASTLE' || kind === 'DDEFAULT') {
        logString += '\n' + "kind || kind [~Z1501]";
    }
    // ø <---------- </Alias Options> ---------->
    logString += '\n' + "RETURN LOG STRING [~Z2392]";
    return logString;
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentLogCurrent> ---------->

// ø <---------- <doEnrollmentCleanupByKind>  ---------->
export function doEnrollmentCleanupByKind(kindKey = 'DDEFAULT') {
    // ø <DO NOT REMOVE>
    let dogBiscuit = 'WOOF';
    dogBiscuit = local.getItem('logString');
    // ! well, unless really final
    // ! do assign either true or false
    local.setItem('logString', local.getItem('logString') + '\n[~Z2019]entering: ' + 'doEnrollmentCleanupByKind() at ' + memory.getItem('lastStamp'))
    local.setItem('logString', local.getItem('logString') + '\nkindKey: ' + kindKey)

    let develTest = false;
    // ø </DO NOT REMOVE>
    let cleanupString = 'EEMPTY';//override where appropriate
    let kindKeySupportedArray = ['CURRENT', 'CODE', 'STEPS', 'DATA', 'CORE', 'OTHER', 'MEMORY_ALL', 'LOCAL_TEMP', 'ALL_EXCEPT_ENROLLMENT', 'ALL_INCLUDING_ENROLLMENT', 'ABORT', 'LOG', 'EEROR'];
    let kindSupportedArray = ['CODE', 'STEPS', 'DATA', 'CORE', 'OTHER', 'NEXT_ENROLLMENT'];
    kindKey = kindKeySupportedArray.includes(kindKey) ? kindKey : 'DDEFUALT';
    console.warn('kindKey: ' + kindKey);
    let kindArray = [];
    kindArray = kindKey === 'ABORT' ? /*kindSupportedArray*/['ZZZ'] : kindArray;
    kindArray = kindKey === 'ALL_INCLUDING_ENROLLMENT' ? ['CODE', 'STEPS', 'DATA', 'LOCAL_DATA', 'NEXT_ENROLLMENT', 'UI'] : kindArray;
    kindArray = kindKey === 'ALL_EXCEPT_ENROLLMENT' ? ['CODE', 'STEPS', 'DATA', 'LOCAL_DATA', 'UI'] : kindArray;
    kindArray = kindKey === 'CODE' ? ['CODE'] : kindArray
    kindArray = kindKey === 'STEPS' ? ['STEPS'] : kindArray
    kindArray = kindKey === 'DATA' ? ['DATA', 'NOT_LOCAL_DATA'] : kindArray
    kindArray = kindKey === 'CORE' ? ['NOT_CORE'] : kindArray
    kindArray = kindKey === 'OTHER' ? ['NOT_UNACCOUNTED_FOR'] : kindArray
    kindArray = kindKey === 'MEMORY_ALL' ? ['MEMORY_ALL'] : kindArray
    kindArray = kindKey === 'LOCAL_TEMP' ? ['LOCAL_TEMP'] : kindArray
    // ø <Deprecated Use kindKey = 'CURRENT'>
    kindArray = kindKey === 'CURRENT' ? ['DATA', 'CODE', 'STEPS', 'UI'] : kindArray;
    // ø </Deprecated Use kindKey = 'CURRENT'>

    // ø <VALIDATION HERE>
    let abort = false;
    if (kindArray.length === 0) {
        local.setItem('logString', local.getItem('logString') + '\n[~Z2051]: ' + "The function 'doEnrollmentCleanupByKind()' with the parameter '" + kindKey + "' is not vallid.")
        abort = true;
    }
    if (kindArray.length === 1 && kindArray[0] === 'ZZZ') {
        local.setItem('logString', local.getItem('logString') + '\n[~Z2051]: ' + "The function 'doEnrollmentCleanupByKind()' with the parameter '" + kindKey + "' is not enabled at this time.")
        abort = true;
    }
    if (kindArray.includes('NEXT_ENROLLMENT')) {
        if (typeof develTest !== 'boolean' || develTest !== true) {
            if(dogBiscuit === 'BACKDOORROODKCAB'){
                if (typeof local.getItem('wixWebhookStatus') !== 'string' || local.getItem('wixWebhookStatus') !== 'RESOLVED') {
                    local.setItem('logString', local.getItem('logString') + '\n[~Z2057]: ' + "'Next Enrollment' rquires that the current Webhook Payload have a status of 'Resolved'")
                    abort = true;
                }
            }
        }
    }
    if (abort) {
        return;
    }
    local.setItem('logString', local.getItem('logString') + '\n[~Z2068]kindArray: ' + kindArray.toString())

    // ø </VALIDATION HERE>

    // ø <code Log for Current Enrollment> mostly for testing
    // ø <DATA>
    if (kindArray.includes('DATA')) {
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
    if (kindArray.includes('LOCAL_DATA')) {
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
    if (kindArray.includes('CODE')) {
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
    if (kindArray.includes('STEPS')) {
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
    if (kindArray.includes('CORE')) {
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
    if (kindArray.includes('UI')) {
        local.setItem('lastErrorString', cleanupString);
    }
    // ø </UI>
    // ø <NEXT_ENROLLMENT>
    if (kindArray.includes('NEXT_ENROLLMENT')) {
        cleanupString = develTest === true ? 'NEXT_ENROLLMENT' : cleanupString;
        if (typeof develTest === 'boolean' && develTest !== true) {
            cleanupString = develTest === true ? 'NEXT_ENROLLMENT' : cleanupString;
            local.setItem('wixWebhookId', cleanupString);
            local.setItem('wixWebhookStatus', cleanupString);
            local.setItem('ondeckEnrollmentJSON', cleanupString);
        }
    }
    // ø </NEXT_ENROLLMENT>
    // ø <UNACCOUNTED_FOR>
    if (kindArray.includes('UNACCOUNTED_FOR')) {
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

export function doUserInterfaceCleanupCurrent() {
    let label = "Family ID: ";
    label += local.getItem('familyId') !== "EEMPTY" ? local.getItem('familyId') : '';
    label += Number(memory.getItem('ppRevision')) > 0 ? ' [' + memory.getItem('ppRevision') + ']' : '';
    label = "Student ID: ";
    label += local.getItem('studentId') !== "EEMPTY" ? local.getItem('studentId') : '';
    label += Number(memory.getItem('stRevision')) > 0 ? ' [' + memory.getItem('stRevision') + ']' : '';
    label = "Secondary ID: ";
    label += local.getItem('secondaryId') !== "EEMPTY" ? local.getItem('secondaryId') : '';
    let step = memory.getItem('enrollmentStepCompleted') === null ? false : true;
    step = memory.getItem('enrollmentStepCompleted') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCompleted') === "NNOT_AAPPLICABLE" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === null ? false : true;
    step = memory.getItem('enrollmentStepCurrent') === "EEMPTY" ? false : step;
    step = memory.getItem('enrollmentStepCurrent') === "NNOT_AAPPLICABLE" ? false : step;
    let webhookId = local.getItem('wixWebhookId')
    if (typeof webhookId === 'string' && webhookId.length > 20) {
        label = 'Webhook ID: ';
        label += local.getItem('wixWebhookId');
        label += ' [' + local.getItem('wixWebhookStatus') + ']';
    } else if (typeof webhookId === 'string' && webhookId === 'EEMPTY') {
        label = 'Webhook ID: [empty]';
    } else {
        label = 'Webhook ID: [invalid]';
    }
    
    if (local.getItem('wixWebhookStatus') === 'RESOLVED') {
        // $w('#grpCleanUpAllIncludingEnrJSON').show();
        // $w('#grpWebhookResolve').hide();
    } else {
        // $w('#grpCleanUpAllIncludingEnrJSON').hide();
        // $w('#grpWebhookResolve').show();
    }
}

export async function doGetRecord(what, where) {
    let whatLower = what.toLowerCase();
    let supportedWhatValues = ['ppMember', 'ppContact', 'stMember', 'stContact'];
    let kAppend = '\n\nNo Action Taken.\nPlease try again or ask for assistance.';
    let response = "'" + what + "' is Not Supported to be 'gotten' at this time." + kAppend;
    let responseObject = {};
    let familyId = typeof local.getItem('familyId') === 'string' ? local.getItem('familyId') : 'ZZZ';
    let studentId = typeof local.getItem('studentId') === 'string' ? local.getItem('studentId') : 'ZZZ';
    let secondaryId = typeof local.getItem('secondaryId') === 'string' ? local.getItem('secondaryId') : 'ZZZ';
    let valid = true;
    valid = what.substr(0, 2) === 'pp' && familyId.length < 10 ? false : valid;
    valid = what.substr(0, 2) === 'st' && studentId.length < 10 ? false : valid;
    valid = what.substr(0, 2) === 'sp' && secondaryId.length < 10 ? false : valid;
    let thisId = what.substr(0, 2) === 'pp' && valid === true ? familyId : 'ZZnomatchZZ'
    thisId = what.substr(0, 2) === 'st' && valid === true ? studentId : thisId;
    thisId = what.substr(0, 2) === 'sp' && valid === true ? secondaryId : thisId;
    if (supportedWhatValues.includes(what)) {
        if (!valid) {
            response = "'" + what + "' is not able to be 'gotten' at this time. Primary-Parent ID (aka Family ID) is not valid.";
            response += kAppend;
        }
        if (whatLower.indexOf('member') > 0) {
            responseObject = await getUserFrontEnd(thisId);
            response = JSON.stringify(responseObject, undefined, 4);
        }
        if (whatLower.indexOf('contact') > 0) {
            responseObject = await steamdaGetContactFunction(thisId);
            response = JSON.stringify(responseObject, undefined, 4);
        }
    }
    where = where.substr(0, 1) === '#' ? where : '#' + where;
    $w(where).value = response;
}
export function doClear(clearIdArray) {
    let idArray = [];
    let inValid = true;
    if (typeof clearIdArray === 'string') {
        idArray.push(clearIdArray);
        inValid = false;
    }
    if (typeof clearIdArray === 'object' && Array.isArray(clearIdArray)) {
        idArray = clearIdArray;
        inValid = false;
    }
    if (inValid) {
        return;
    }
    idArray.forEach(elementId => {
        if (elementId.substr(0, 1) !== '#') {
            elementId = '#' + elementId;
        }
        $w(elementId).value = '';
    })

}

// ø <------------ <doUpdateThisWebhookPayload(status)>  -------------->
export async function doUpdateThisWebhookPayload(status) {
    // 202109ResolveAndDestroy_RESOLVE
    let response = "";
    let kInvalidAppend = `\nNo action taken.\nPlease try again or ask for assistnace.`;
    if (typeof local.getItem('wixWebhookId') !== 'string' || local.getItem('wixWebhookId').length < 20) {
        response = "Invalid 'WiX-Webhook-ID'" + kInvalidAppend;
        $w('#sessionEnrollmentJSON').value = response;
        return;
    }
    if (status === local.getItem('wixWebhookStatus')) {
        response = "On-deck 'Webhook-Payload' Status is the same as the Drop-Down (update) Value. No Update Indicated" + kInvalidAppend;
        $w('#sessionEnrollmentJSON').value = response;
        return;
    }
    local.setItem('wixWebhookStatus',status)
    await updateStatusWebhookPayloadThis();
    let lastResponse = JSON.parse(local.getItem('lastResponseObject'));
    if (lastResponse._id === local.getItem('webhookThisId')) {
        local.setItem('webhookThisStatus', lastResponse.currentStatus);
        if (typeof lastResponse.resolvedStatus !== 'undefined') {
            local.setItem('webhookThisResolved', lastResponse.resolvedStatus);
        }
    }

}
// ø <------------ </doUpdateThisWebhookPayload(status)> -------------->


// ø <------------ <updateStatusWebhookPayloadThis()>  -------------->
export async function updateStatusWebhookPayloadThis(getOnly = false) {
    // 202109ResolveAndDestroy_RESOLVE
    const options = {
        "suppressAuth": true,
        "suppressHooks": true
    };
    let webhookId = local.getItem('wixWebhookId');

    let updateObject = await wixData.get("webhookPayload", webhookId, options);
    let doUserInterfaceUpdate = false;
    if (getOnly) {
        local.setItem('lastResponseObject', JSON.stringify(updateObject));
        if (updateObject.currentStatus === "RESOLVED") {
            if (updateObject.resolvedStatus === "RESOLVED") {
                local.setItem('wixWebhookStatus', "RESOLVED");
                doUserInterfaceUpdate = true;
            } else {
                local.setItem('lastErrorString', "current WebhookPayload 'currentStatus' and 'resolvedStatus' are Out-Of-Sync");
            }
        }
        if (updateObject.currentStatus !== local.getItem('wixWebhookStatus')) {
            local.setItem('wixWebhookStatus', updateObject.currentStatus)
            doUserInterfaceUpdate = true;
        }
        // $w('#sessionEnrollmentJSON').value = JSON.stringify(updateObject, undefined, 4);
        // $w('#txareaDevelResponseBlock').value = JSON.stringify(updateObject, undefined, 4);
        return;
    }

    let now = new Date();
    let nowISO = now.toISOString();
    updateObject.currentStatus = local.getItem('wixWebhookStatus');
    updateObject.currentStatusStamp = now;
    if (local.getItem('wixWebhookStatus') === 'RESOLVED') {
        updateObject.resolvedStatus = local.getItem('wixWebhookStatus');
        updateObject.resolvedStatusStamp = now;
    }
    // local.setItem('lastParamObject', JSON.stringify(updateObject));
    let response = await wixData.update("webhookPayload", updateObject)
    $w('#sessionEnrollmentJSON').value = JSON.stringify(response, undefined, 4);

}
// ø <------------ </updateStatusWebhookPayloadThis()> -------------->

// ! ====================================================================================================
// ! ====================                    </Only UI Support Functiions>                   ==============
// ! ====================================================================================================

// ! ====================================================================================================
// ! ====================.        <Only BUTTON_click Functiions Below Here>          ====================
// ! ====================================================================================================

export function btnDisplayCurrentState_click(event) {
    let kind = $w('#ddDisplayKind').value;
    let responseString = doEnrollmentLogCurrent(kind);
    $w('#sessionEnrollmentJSON').value = responseString;
    // ø <IIABDFI>
    let responseBlockId = '#txareaDevelResponseBlock';
    $w(responseBlockId).value = responseString;
    wixWindow.copyToClipboard(responseString)
    // ø </IIABDFI>
}


export function toggleBoxState() {
    if ($w("#boxUImultiState").currentState.id === "Main") {
        $w("#boxUImultiState").changeState("Original");
    } else {
        $w("#boxUImultiState").changeState("Main");
    }
}

export function btnToggleBoxState_click(event) {
    toggleBoxState();
}

export function btnToggleBoxStateToo_click(event) {
    toggleBoxState();
}

export function btnWebhookResolve_click(event) {
    // 202109ResolveAndDestroy
    // 202109ResolveAndDestroy_RESOLVE
        let statusThis = $w('#ddCurrentStatusUpdate').value;
        doUpdateThisWebhookPayload(statusThis);
        updateStatusWebhookPayloadThis(true);
        console.log('[`3215] RESOLVE: Yes')
    console.log('[`3221] EXIT: btnWebhookResolve_click(event)')
}

export async function btnCleanUpByKindTEST_click(event) {
        memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv')));
        local.setItem('logString', '[~Z2817]entering btnCleanUpByKindTEST_click:YES');
        local.setItem('logString', local.getItem('logString') + '\nddCleanupByKind: ' + $w('#ddCleanupByKind').value);
        local.setItem('logString', local.getItem('logString') + '\nTest of Clean Tags BEGIN Man in the High Castle<clean>');
        let kindKey = $w('#ddCleanupByKind').value;
        doEnrollmentCleanupByKind(kindKey);
        local.setItem('logString', local.getItem('logString') + '\n</clean>Marvelous Mrs. Maisel END Test of Clean Tags');
        local.setItem('logString', local.getItem('logString') + '\nexiting btnCleanUpByKindTEST_click');
        $w('#sessionEnrollmentJSON').value = local.getItem('logString');
    let logStringClean = local.getItem('logString');
    if (logStringClean.indexOf('</clean>') >= 0) {
        logStringClean = logStringClean.substr(0, logStringClean.indexOf('</clean>'));
    }
    if (logStringClean.indexOf('<clean>') >= 0) {
        console.log('logStringClean.indexOf(<clean>):' + logStringClean.indexOf('<clean>'))
        logStringClean = logStringClean.substr(logStringClean.indexOf('<clean>') + 7);
    }
    memory.setItem('logStringClean', logStringClean);
    $w('#sessionEnrollmentJSON').value = local.getItem('logString');
    $w('#sessionEnrollmentJSON').value += '\n\n---\n\n[Proof of Concept]\n(line-feeds are tricky)\nCLEAN VERSION OF ABOVE\n======================\n';
    $w('#sessionEnrollmentJSON').value += memory.getItem('logStringClean');
}

// ! ====================================================================================================
// ! ====================                       <PRETRASH DB TESTING>                      ==============
// ! ====================================================================================================

export async function pretrashFindFamilyIdTermId() {
    let logString = '';
    let exceptionLogArray = [];

    let termId = Number(999);

    logString += '\n' + "local.getItem('familyId'): " + familyId;
    logString += '\n' + "local.getItem('termId'): " + termId;


    let ppExistsCount = await wixData.query("person")
        .eq("personId", familyId)
        .eq("termId", termId)
        .count();

    if (ppExistsCount > 0) {
        exceptionLogArray.push("primaryParent person exists for this term");
    }


    logString += '\n' + "ppExistsCount: " + ppExistsCount;

    let exceptionLogBlock = '';
    exceptionLogArray.forEach(exceptionLog => {
        if (exceptionLogBlock.length === 0) {
            exceptionLogBlock = `
EXCEPTION LOG BLOCK:
====================`;
        }
        exceptionLogBlock += '\n' + exceptionLog;
    });
    logString += exceptionLogBlock;



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
    logString = JSON.stringify(toInsert, undefined, 4);
    logString += "==========";


    // ø <---------- <INSERT>  ---------->
    let ppInsertResult = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->
    logString += JSON.stringify(toInsert, undefined, 4);;

    return;

}// END function pretrashFindFamilyIdTermId()

export async function pretrashFindStByFamilyIdLegalFirst() {
    let logString = '';
    let exceptionLogArray = [];

    let termId = Number(999);



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


    logString += '\n' + "stExistsCount: " + stExistsCount;

    let exceptionLogBlock = '';
    exceptionLogArray.forEach(exceptionLog => {
        if (exceptionLogBlock.length === 0) {
            exceptionLogBlock = `
EXCEPTION LOG BLOCK:
====================`;
        }
        exceptionLogBlock += '\n' + exceptionLog;
    });
    logString += exceptionLogBlock;



    if (exceptionLogBlock.length > 0) {
        logString += '\n' + 'RETURN NO INSERT';
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.role = 'Student';
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = local.getItem('stFirst');
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('stLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
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
    logString = JSON.stringify(toInsert, undefined, 4);
    logString += "==========";
    logString += '\n' + 'INSERT INDICATED (SKIPPED)';
    // return;


    // ø <---------- <INSERT>  ---------->
    let stInsertResult = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->
    logString += JSON.stringify(toInsert, undefined, 4);;

    return;

}// END function pretrashFindStByFamilyIdLegalFirst()

export async function pretrashActionEvaluationTest() {
    local.setItem('staffIdentifiedFamilyId', 'ZXZ');
    memory.setItem('familyId_HOLDER', local.getItem('familyId'));
    local.setItem('termId', Number(999));
    local.setItem('spFirst', 'ZXZ');
    local.setItem('spLast', 'ZXZ');
    let now = new Date();
    let yyyymmddhhiiss = now.getFullYear() * 10000000000 + (now.getMonth() + 1) * 100000000 + now.getDate() * 1000000 + now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds() * 1;


    await actionValueEvaluation();

    local.setItem('familyId', memory.getItem('familyId_HOLDER'));

}// END function pretrashActionEvaluationTest()

export function doPreTrashLogUI() {
    let now = new Date();
    let yyyymmddhhiiss = now.getFullYear() * 10000000000 + (now.getMonth() + 1) * 100000000 + now.getDate() * 1000000 + now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds() * 1;
    let logString = '';
    logString += '================================================================';
    logString += '\n===========     <LOG of PRE_TRASH User Interface>    ===========';
    logString += '\n========      (no current data unless loade by UI)      ========';
    logString += '\n================================================================\n';



    logString += '\n\n================================================================';
    logString += '\n===========              ' + yyyymmddhhiiss + '               ==========';
    logString += '\n===========    </LOG of PRE_TRASH User Interface>    ===========';
    logString += '\n================================================================';

}//END function doPreTrashLogUI()

export async function doPreTrashThreeQueries() {
    let now = new Date();
    let yyyymmddhhiiss = now.getFullYear() * 10000000000 + (now.getMonth() + 1) * 100000000 + now.getDate() * 1000000 + now.getHours() * 10000 + now.getMinutes() * 100 + now.getSeconds() * 1;

    let staffIdentifiedFamilyId = 'ZXZ';
    let termId = Number(999);
    let studentLegalFirst = '';

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
    if (!staffMatch3Q) {

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

export function uiCopyTextElementThis(elementId = '') {
    if (elementId.length === 0) {
        local.setItem('lastErrorString', "Invalid 'elementId' for uiCopyTextElementThis() function");
        return;
    }
    elementId = elementId.substr(0, 1) === '#' ? elementId : '#' + elementId;
    wixWindow.copyToClipboard($w(elementId).value)
        .then(() => {
            // handle case where text was copied
        })
        .catch((err) => {
            // handle case where an error occurred
        });
}
// ! ====================================================================================================
// ! ====================                      </PRETRASH DB TESTING>                      ==============
// ! ====================================================================================================

export async function doQueryContactById(idValueOrKey = 'NONE') {
    let altKeyString = $w('#radioContactFindBy').value;
    let kind = idValueOrKey.length < 30 ? 'KEY' : 'LITERAL';
    kind = idValueOrKey.indexOf('@') > 0 ? 'LITERAL' : kind;
    let key = 'PENDING KEY';
    let ppAliasArray = ['PP', 'PRIMARY', 'PRIMARYID', 'PRIMARYPARENT', 'PRIMARY PARENT', 'FAMILYID'];
    key = ppAliasArray.includes(idValueOrKey.toLocaleUpperCase()) ? 'PRIMARY' : key;
    let stAliasArray = ['ST', 'STUDENT', 'STUDENTID'];
    key = stAliasArray.includes(idValueOrKey.toLocaleUpperCase()) ? 'STUDENT' : key;
    let spAliasArray = ['SP', 'SECONDARY', 'SECONDARYID', 'SECONDARYPARENT', 'SECONDARY PARENT'];
    key = spAliasArray.includes(idValueOrKey.toLocaleUpperCase()) ? 'SECONDARY' : key;

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
        logString += '\n\n<---------- <Invalid ID Parameter> ---------->\n\n';
        logString += 'Query Aborted';
        logString += local.getItem('kAppendString');
        local.setItem('logString', logString);
        $w('#txareaDevelResponseBlock').value = logString;
        return;
    }

    if (altKeyString === 'EMAIL' && !isValidEmail) {
        logString += '\n\n<---------- <Invalid EMAIL Parameter> ---------->\n\n';
        logString += 'Query Aborted';
        logString += local.getItem('kAppendString');
        local.setItem('logString', logString);
        $w('#txareaDevelResponseBlock').value = logString;
        return;
    }


    if (altKeyString === 'ID') {

        let contact = await steamdaGetContactFunction(contactId);
        logString += '\n\n<---------- <queryResponse> ---------->\n\n';
        logString += JSON.stringify(contact, undefined, 4);
        local.setItem('logString', logString);
        $w('#txareaDevelResponseBlock').value = logString;
        return;
    }

    if (altKeyString === 'EMAIL') {

        let contact = await getContactByEmail(contactEmail);
        logString += '\n\n<---------- <queryResponse> ---------->\n\n';
        logString += `the Query of Contacts for \nPrimary Email: '${contactEmail}' \nReturned:\n`;
        logString += `BEGIN queryResults:\n`;
        logString += JSON.stringify(contact, undefined, 4);
        logString += `\nEND queryResults`;
        local.setItem('logString', logString);
        $w('#txareaDevelResponseBlock').value = logString;

        return;
    }

    logString += '\n\n<---------- <Force Abort for Testing> ---------->\n\n';
    $w('#txareaDevelResponseBlock').value = logString;
    return;
}

export function btnPPGetContact_click(event) {
    let paramIdOrKey = 'Marais'
    let ppAliasArray = ['PP', 'PRIMARYID', 'PRIMARYPARENT', 'PRIMARY PARENT', 'FAMILYID'];//'PRIMARY',
    paramIdOrKey = ppAliasArray[Math.floor(Math.random() * ppAliasArray.length)]
    doQueryContactById(paramIdOrKey);
}

export function btnSTGetContact_click(event) {
    let paramIdOrKey = 'Marais'
    let stAliasArray = ['ST', 'STUDENTID'];//'STUDENT',
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

export async function btnExtraContactPrimary_click(event) {
    // pstEnrSeven202108getContactByEmailAndNotIdFunction
    // 202109_dd02_COMPLEX
    let paramObjectPrimary = {};
    paramObjectPrimary.emailToFind = local.getItem('familyEmail');
    paramObjectPrimary.notIdToFind = local.getItem('familyId');
    paramObjectPrimary.diagnosticOnly = true;
    paramObjectPrimary.collectHumanLog = true;
        // paramObjectPrimary.diagnosticOnly = false;
    await getContactByEmailAndNotIdFunction(paramObjectPrimary);
    $w('#sessionEnrollmentJSON').value = paramObjectPrimary.logString;
    uiCopyTextElementThis('sessionEnrollmentJSON');
    delete paramObjectPrimary.logString;
    local.setItem('lastResponseObject',JSON.stringify(paramObjectPrimary));
}

export async function btnExtraContactStudent_click(event) {
    // pstEnrSeven202108getContactByEmailAndNotIdFunction
    // 202109_dd02_COMPLEX
    let paramObjectStudent = {};
    paramObjectStudent.emailToFind = local.getItem('studentEmail');
    paramObjectStudent.notIdToFind = local.getItem('studentId');
    paramObjectStudent.diagnosticOnly = true;
    paramObjectStudent.collectHumanLog = true;
    // paramObjectStudent.diagnosticOnly = false;
    await getContactByEmailAndNotIdFunction(paramObjectStudent);
    $w('#sessionEnrollmentJSON').value = paramObjectStudent.logString;
    uiCopyTextElementThis('sessionEnrollmentJSON');
    delete paramObjectStudent.logString;
    local.setItem('lastResponseObject',JSON.stringify(paramObjectStudent));
}


// ! =========================================================================================================================
// ! ==================================          <SEVENT-SUPER-STEPS with MultiStateBox>          ============================
// ! ==================================                     FIND pstEnrSeven202108                    ============================
// ! =========================================================================================================================

// ø <---------- <msboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->
// ø <----------         <'mxbox' typo of 'msbox' (multi-state-box)>        ---------->
// ø <----------                 <refactor or live with it>                 ---------->

// ø <---------- <mxboxPstEnrSeven_soupToNuts>  ---------->
// ø FIND pstEnrSeven202108 SOUP_TO_NUTS

// ø <---------- <msboxPostEnrollmentSevenAnyAction>  ---------->
export async function msboxPostEnrollmentSevenAnyAction(responseObject = {}) {
    console.groupCollapsed(`msboxPostEnrollmentSevenAnyAction(responseObject = {})`)
    console.log(`responseObject:`)
    console.dir(responseObject)
    // pstEnrSeven202108ANY BEGIN
    // pstZEnrSeven202108STEP_RN_02 ==> OnReadty-To-Next ==> pstZEnrSeven202108STEP_N_02
    let DOX = 'pstEnrSeven202108STEP_RN_02 ==> OnReadty-To-Next ==> pstEnrSeven202108STEP_N_02';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // pstzEnrSeven202108STEP_N_02 ANY-BEFORE BEGIN
    // pstzEnrSeven202108STEP_P_02 ANY-BEFORE BEGIN
    DOX = responseObject.button === 'NEXT' ? 'pstEnrSeven202108STEP_N_02 ANY-BEFORE BEGIN' : 'FFALSE';
    DOX = responseObject.button === 'CURRENT' ? 'pstEnrSeven202108STEP_P_02 ANY-BEFORE BEGIN': DOX;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    DOX = 'JUST FOR VISIBLE DOX IN WIX';
    responseObject.logArrayDeveloper.push(`≈Z3718≈ {% entering: msboxPostEnrollmentSevenAnyAction() %}`);
    responseObject.logArrayDeveloper.push(`{% memory.getItem('stepMessaging').length === ${memory.getItem('stepMessaging').length} %}`);
    responseObject.logArrayDeveloper.push(`{% memory.getItem('stepObjects').length === ${memory.getItem('stepObjects').length} %}`);

    DOX = '≈Z3729≈ {<ANY: but used later>}';
    // ø <StatesArray from memory., Current State LIVE, memoryCurrentStateId, memoryNextStateId >
    // ø just setting to memory-wixStorage
    let statesArray = memory.getItem('msboxAllStatesList').split(',');
    let targetState = ($w(memory.getItem('msboxCurrentId')).currentState).id;
    memory.setItem('msboxCurrentStateId', targetState)
    let nextIndex = statesArray.indexOf(targetState) + 1;
    targetState = statesArray[nextIndex];
    memory.setItem('msboxNextStateId', targetState)
    responseObject.logArrayDeveloper.push(`≈Z3740≈ {% memory.getItem('msboxCurrentStateId'): ${memory.getItem('msboxCurrentStateId')} %}`);
    responseObject.logArrayDeveloper.push(`≈Z3741≈ {% memory.getItem('msboxNextStateId'): ${memory.getItem('msboxNextStateId')} %}`);
    responseObject.logArrayDeveloper.push(`≈Z3742≈ {% memory.getItem('msboxLastState'): ${memory.getItem('msboxLastState')} %}`);
    // ø </StatesArray from memory., Current State LIVE, memoryCurrentStateId, memoryNextStateId >
    DOX = '{<POPULATE: responseObject .messagingObject, .stepObject by Above>}';
    let tempObject = {};
    let tempObjectJSON = '';
    let tempKey = 'PPENDING';
    // tempObjectJSON = memory.getItem('stepObjects');
    tempKey = responseObject.button === 'NEXT' ? memory.getItem('msboxNextStateId') : memory.getItem('msboxCurrentStateId');
    console.log(`memory.getItem('msboxNextStateId') => tempKey:${tempKey}`)
    tempObject = JSON.parse(memory.getItem('stepObjects'));
    console.log(`memory.getItem('stepObjects') => tempObject:$`)
    console.dir(tempObject)
    // console.dir(responseObject)
    console.groupEnd()
    responseObject.currentStepObject = tempObject[tempKey];
    tempObject = JSON.parse(memory.getItem('stepMessaging'));
    responseObject.currentMessagingObject = tempObject[tempKey];
    responseObject.logArrayDeveloper.push(`≈Z3754≈ {% (responseObject.currentStepObject).length === ${(JSON.stringify(responseObject.currentStepObject)).length} %}`);
    responseObject.logArrayDeveloper.push(`≈Z3755≈ {% (responseObject.currentMessagingObject).length === ${(JSON.stringify(responseObject.currentMessagingObject)).length} %}`);

    // responseObject.messagingObject = memory.getItem('stepMessaging')[memory.getItem('msboxCurrentStateId')];
    DOX = '{</POPULATE: responseObject .messagingObject, .stepObject by Above>}';
    DOX = '{</ANY: but used later>}';

    // ø <ELSE>
    DOX = '<YES_ANY_ACTION>'
    let messageKey = responseObject.messageKey;
    if (responseObject.button !== 'CURRENT' && responseObject.button !== 'NEXT') {
        // try it purposefully
        return;
    }
    // ø </ELSE>
    // ø FIND pstEnrSeven202108 YES_ANY_ACTION if it's HERE it belongs in Any Action
    DOX = '</YES_ANY_ACTION>'

    // ! <Call 'PERFORM' Sequence>
    responseObject.logArrayDeveloper.push(`≈Z3953≈ ◊ responseObject.button === ${responseObject.button} ◊`);
    if (responseObject.button === 'CURRENT') {
        responseObject.logArrayDeveloper.push('≈Z3955≈ ◊ responseObject.button === CURRENT ◊');
        responseObject.logArrayDeveloper.push('≈Z3955≈ ◊ PREV: lastClicked === PERFORM_STEP ◊');
        // responseObject.currentStepOriginalStepsArray = currentStepOrigStepsObject.allStepArray;
        // pstZEnrSeven202108STEP_P_02 ==> Call: PERFORM-UI ==> pstZEnrSeven202108STEP_P_03
        DOX = 'pstEnrSeven202108STEP_P_02 ==> Call: PERFORM-UI ==> pstEnrSeven202108STEP_P_03';
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        await msboxPostEnrollmentSevenPerformStepUI(responseObject);
    }
    // ! </Call 'PERFORM' Sequence>
    // ! <Call 'NEXT' Sequence>
    if (responseObject.button === 'NEXT') {
        responseObject.logArrayDeveloper.push('≈Z3963≈ ◊ responseObject.button === NEXT ◊');
        responseObject.logArrayDeveloper.push('≈Z3963≈ ◊ PREV: lastClicked === NEXT_STATE ◊');
        // pstZEnrSeven202108STEP_N_02 ==> Call: NEXT-UI ==> pstZEnrSeven202108STEP_N_03
        DOX = 'pstEnrSeven202108STEP_N_02 ==> Call: NEXT-UI ==> pstEnrSeven202108STEP_N_03';
        local.setItem('logString', local.getItem('logString') + ',' + DOX);
        await msboxPostEnrollmentSevenNextStateUI(responseObject);
        responseObject.logArrayDeveloper.push(`≈Z3782≈ {% AFTER-NEXT: memory.getItem('msboxLastState'): ${memory.getItem('msboxLastState')} %}`);

    }
    // ! </Call 'NEXT' Sequence>

    // pstZEnrSeven202108STEP_N_06 ANY-AFTER BEGIN
    // pstZEnrSeven202108STEP_P_06 ANY-AFTER BEGIN
    DOX = responseObject.button === 'NEXT' ? 'pstEnrSeven202108STEP_N_06 ANY-AFTER BEGIN' : 'FFALSE';
    DOX = responseObject.button === 'CURRENT' ? 'pstEnrSeven202108STEP_P_06 ANY-AFTER BEGIN' : DOX;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø <LOG STEP IN UI>
    let DOXobject = {};
    let DOXobjectKey = memory.getItem('msboxLastState') + '_' + responseObject.action;
    DOXobject[DOXobjectKey] = {};
    DOXobject[DOXobjectKey]['logArrayDeveloper'] = responseObject.logArrayDeveloper;
    delete responseObject.logArrayDeveloper;
    DOXobject[DOXobjectKey]['responseObject'] = responseObject;
    DOX += JSON.stringify(DOXobject, undefined, 4);






    // ø </LOG STEP IN UI>
    // ! <NUTS! This really is the End of the Sequence>
    // pstZEnrSeven202108STEP_N_06 ==> Complete: ANY-DONE ==> NEXT CLICK ==> pstZEnrSeven202108STEP_P_01
    // pstZEnrSeven202108STEP_P_06 ==> Complete: ANY-DONE ==> NEXT CLICK ==> pstZEnrSeven202108STEP_N_01
    DOX = responseObject.button === 'NEXT' ? 'pstEnrSeven202108STEP_P_06 ==> Complete: ANY-DONE ==> NEXT CLICK ==> pstEnrSeven202108STEP_N_01' : 'FFALSE';
    DOX = responseObject.button === 'CURRENT' ? 'pstEnrSeven202108STEP_N_06 ==> Complete: ANY-DONE ==> NEXT CLICK ==> pstEnrSeven202108STEP_P_01' : DOX;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    let responseString = local.getItem('logString');
    responseString = responseString.replace(/\n/g, ",");
    let responseArray = responseString.split(',');
    let comma = ',';
    // pstEnrSeven202108ANY END

}
// ø <---------- </msboxPostEnrollmentSevenAnyAction> ---------->

// ø <---------- <msboxPostEnrollmentSevenNextStateUI>  ---------->
export async function msboxPostEnrollmentSevenNextStateUI(responseObject = {}) {
    // pstEnrSeven202108UI NEXT-UI BEGIN
    // pstZEnrSeven202108STEP_N_03 NEXT-UI-BEFORE BEGIN
    let DOX = 'pstEnrSeven202108STEP_N_03 NEXT-UI-BEFORE BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    DOX = 'So I can read these comments in WiX-Editor';
    DOX = 'OKAY: maybe redundant since NextState is kida all-about UI, but better separate _before_ it gets hairy than after';

    responseObject.logArrayDeveloper.push('{% msboxPostEnrollmentSevenNextStateUI %}');
    responseObject.logArrayDeveloper.push('{# NEXT_STATE_UI is, other than calling DO, is INERT #}');
    // ø <Before DO-Script Called>
    // ø </Before DO-Script Called>
    // pstZEnrSeven202108STEP_N_03 ==> Call: NEXT-DO ==> pstZEnrSeven202108STEP_N_04
    DOX = 'pstEnrSeven202108STEP_N_03 ==> Call: NEXT-DO ==> pstEnrSeven202108STEP_N_04';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    msboxPostEnrollmentSevenNextStateDO(responseObject);
    // pstZEnrSeven202108STEP_N_05 NEXT-UI-AFTER BEGIN
    DOX = 'pstEnrSeven202108STEP_N_05 NEXT-UI-AFTER BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø <After DO-Script Called>
    DOX = `After DO-Next - Within UI-Next: show btnCurrent/hide btnNext`;
    responseObject.logArrayDeveloper.push(`{% ${DOX} %}`);
    // $w('#txtPeSevenTitle').text = responseObject.currentStepObject.title;
    let textId = '#' + memory.getItem('msboxNextStateId') + 'Title';
    console.log(`textId: Title: ${textId}`)
    $w(textId).text = responseObject.currentStepObject.title;
    textId = '#' + memory.getItem('msboxNextStateId') + 'TitleSub';
    console.log(`textId: TitleSub ${textId}`)
    $w(textId).text = responseObject.currentStepObject.titleSub;
    textId = '#' + memory.getItem('msboxNextStateId') + 'Descr';
    console.log(`textId: Descr ${textId}`)
    $w(textId).text = typeof responseObject.currentStepObject.descr === 'string' ? responseObject.currentStepObject.descr : '';
    responseObject.logArrayDeveloper.push(`≈Z3835≈ {% POC stepObject: responseObject.currentStepObject.title: ${responseObject.currentStepObject.title} %}`);
    $w('#txtBootstrapPrimary').html = doBootstrapMessage('primary', responseObject.currentMessagingObject.primary, [[-1, 36], [50, 28]]);
    if(responseObject.currentMessagingObject.info !== 'EEMPTY'){$w('#txtBootstrapInfo').html = doBootstrapMessage('info', responseObject.currentMessagingObject.info, [[-1, 36], [50, 28]]); $w('#txtBootstrapInfo').expand();}
    responseObject.logArrayDeveloper.push(`≈Z3837≈ {% POC messageObject: responseObject.currentMessagingObject.primary: ${responseObject.currentMessagingObject.primary} %}`);
    instantiateLoopSwitchEnrollmentSteps(responseObject.currentStepObject.origSteps.allStepArray);
    displaySteps();
    console.log('Next UI: After DO:  Perform.expand(),  Next.collapse()')
    $w('#btnPeSevenCurrent').expand();
    $w('#btnPeSevenNext').collapse();
    DOX = '≈Z4307≈ Show-Current & Hide-Next';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø </After DO-Script Called>
    // pstZEnrSeven202108STEP_N_05 ==> ReturnTo: ANY-AFTER ==> pstZEnrSeven202108STEP_N_06
    DOX = 'pstEnrSeven202108STEP_N_05 ==> ReturnTo: ANY-AFTER ==> pstEnrSeven202108STEP_N_06';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// ø <---------- </msboxPostEnrollmentSevenNextStateUI> ---------->

// ø <---------- <msboxPostEnrollmentSevenNextStateDO>  ---------->
export async function msboxPostEnrollmentSevenNextStateDO(responseObject = {}) {
    // pstEnrSeven202108DO
    // pstZEnrSeven202108STEP_N_04 NEXT-DO BEGIN
    let DOX = 'pstEnrSeven202108STEP_N_04 NEXT-DO BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    responseObject.logArrayDeveloper.push('{% msboxPostEnrollmentSevenNextStateDO %}');
    // $w(memory.getItem('msboxCurrentId')).changeState(targetState);
    $w(memory.getItem('msboxCurrentId')).changeState(memory.getItem('msboxNextStateId'));
    $w('#txtBootstrapResponse').collapse()
    $w('#txtBootstrapInfo').collapse()
    memory.setItem('msboxLastState', memory.getItem('msboxNextStateId'));
    responseObject.logArrayDeveloper.push(`{∆ msboxNextStateId: ${memory.getItem('msboxNextStateId')} ∆}`);
    responseObject.logArrayDeveloper.push(`{∆ msboxLastState: ${memory.getItem('msboxLastState')} ∆}`);
    // pstZEnrSeven202108STEP_N_04 ==> Return-To: NEXT-UI ==> pstZEnrSeven202108STEP_N_05
    DOX = 'pstEnrSeven202108STEP_N_04 ==> Return-To: NEXT-UI ==> pstEnrSeven202108STEP_N_05';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// ø </toNUTS>
// ø <---------- </msboxPostEnrollmentSevenNextStateDO> ---------->


// ø <---------- <msboxPostEnrollmentSevenPerformStepUI>  ---------->
export async function msboxPostEnrollmentSevenPerformStepUI(responseObject = {}) {
    // pstEnrSeven202108UI PERFORM-UI BEGIN
    // pstZEnrSeven202108STEP_P_03 PERFORM-UI-BEFORE BEGIN
    let DOX = 'pstEnrSeven202108STEP_P_03 PERFORM-UI-BEFORE BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    responseObject.logArrayDeveloper.push('{% msboxPostEnrollmentSevenPerformStepUI %}');
    responseObject.logArrayDeveloper.push('{# PERFORM_STEP_UI is, other than calling DO, is INERT #}');
    // ø <Before DO-Script Called>
    // ø </Before DO-Script Called>
    // pstZEnrSeven202108STEP_P_03 ==> Call: PERFORM-DO ==> pstZEnrSeven202108STEP_P_04
    DOX = 'pstEnrSeven202108STEP_P_03 ==> Call: PERFORM-DO ==> pstEnrSeven202108STEP_P_04';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    await msboxPostEnrollmentSevenPerformStepDO(responseObject);
    // pstZEnrSeven202108STEP_P_05 PERFORM-UI-AFTER BEGIN
    DOX = 'pstEnrSeven202108STEP_P_05 PERFORM-UI-AFTER BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø <After DO-Script Called>
    DOX = `After DO-Perform - Within UI-Perform: hide btnCurrent/show btnNext`;
    responseObject.logArrayDeveloper.push(`{% ${DOX} %}`);
    console.log('Perform UI: After DO:  Perform.collapse(),  Next.expand()')
    $w('#btnPeSevenCurrent').collapse();
    $w('#btnPeSevenNext').expand();
    if(memory.getItem('msboxLastState') === 'stateResolveAndDestroy'){
        $w('#btnPeSevenNext').collapse();
        // memory.getItem('msboxLastState'): null;
        // memory.getItem('msboxNextStateId'): null
    }
    // ø </After DO-Script Called>
    // pstZEnrSeven202108STEP_P_05 ==> ReturnTo: ANY-AFTER ==> pstZEnrSeven202108STEP_P_06
    DOX = 'pstEnrSeven202108STEP_P_05 ==> ReturnTo: ANY-AFTER ==> pstEnrSeven202108STEP_P_06';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    
    // ø <FINAL> Remove Buttons if anyDanger
    let anyDangerHide = false;
    anyDangerHide = memory.getItem('stepResponseBootstrapKey') === 'danger' ? true : anyDangerHide;
    anyDangerHide = (memory.getItem('stepLogString')).indexOf('danger') >= 0 ? true : anyDangerHide;
    console.log('≈4912≈ anyDangerHide: ' + anyDangerHide);
    if(anyDangerHide){
        console.log('Any Danger:  Perform.collapse(),  Next.collapse()')
        $w('#btnPeSevenNext').collapse();
        $w('#btnPeSevenCurrent').collapse();
        $w('#btnAnyDanger').expand();
        
    }
    // ø </FINAL> Remove Buttons if anyDanger
}
// ø <---------- </msboxPostEnrollmentSevenPerformStepUI> ---------->

// ø <---------- <msboxPostEnrollmentSevenPerformStepDO>  ---------->
export async function msboxPostEnrollmentSevenPerformStepDO(responseObject = {}) {
    // pstEnrSeven202108DO PERFORM-DO BEGIN
    // pstZEnrSeven202108STEP_P_04 PERFORM-DO BEGIN
    let DOX = 'pstEnrSeven202108STEP_P_04 PERFORM-DO BEGIN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    DOX = 'So I can read these comments in WiX-Editor';
    responseObject.logArrayDeveloper.push('{% msboxPostEnrollmentSevenPerformStepDO %}');


    let paramObject = {};
    paramObject.currentStepObject = responseObject.currentStepObject;
    // paramObject.logArray = [];
    paramObject.logArrayUserInterface = [];

    paramObject.testNumber = (new Date()).getSeconds();
    paramObject.logArrayUserInterface = [];//logArrayUserInterface
    paramObject.logArrayDeveloper = [];
    paramObject.logArrayDeveloper.push('just prior to Call');
    paramObject.messaging = {};
    paramObject.messaging.primary = 'primaryFAUX';
    paramObject.messaging.success = 'successFAUX';
    paramObject.messaging.danger = 'dangerFAUX';
    paramObject.messaging.warning = 'warningFAUX';
    paramObject.messaging.info = 'infoFAUX';
    paramObject.messaging.devel = 'develFAUX';
    paramObject.messaging.primaryDo = false;
    paramObject.messaging.responseDo = 'FALSE';
    paramObject.messaging.infoDo = false;
    paramObject.messaging.develDo = false;

    DOX = '≈Z4303≈ Is-Good: paramObject.currentStepObject.origSteps.allStepArray [confirm in Student-Member code-block]';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);



    // pstEnrSeven202108SALS CALL
    DOX = 'pstEnrSeven202108STEP_P_04 ==> Pefrom Array Steps Loop-Switch ==> pstEnrSeven202108STEP_SALS_LOOP';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    await pstErnSevenStepsArraySwitchLoop(paramObject);

    DOX = 'pstEnrSeven202108STEP_P_04RETURN #return from SALS';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    responseObject.logArrayDeveloper.push('{# PERFORM_STEP_DO just performed instantiateSteps and Display #}');

    // pstEnrSeven202108SALSDoMessaging CALL
    DOX = 'pstEnrSeven202108STEP_P_04RETURN ==> Do Messaging {#extra-clicks#} ==> pstEnrSeven202108STEP_P_04MESSAGING';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    await salsDoMessagingReponsesApply(responseObject, paramObject);
    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING_RETURN ==> Return from Messaging';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // Array.prototype.push.apply(responseObject.logArrayDeveloper,paramObject.logArrayDeveloper);

    // ø <APPEND paramObject.logArrayDeveloper ONTO responseObject.logArrayDeveloper>
    // THIS: Did Not Work: Array.prototype.push.apply(responseObject.logArrayUserInterface,paramObject.logArrayUserInterface);
    let element = '';
    let index = 777;
    for (index = 0; index < paramObject.logArrayDeveloper.length; index++) {
        element = paramObject.logArrayDeveloper[index];
        responseObject.logArrayDeveloper.push(element);
    }
    // ø </APPEND paramObject.logArrayDeveloper ONTO responseObject.logArrayDeveloper>

    // ø <APPEND paramObject.logArrayUserInterface ONTO responseObject.logArrayUserInterface>
    index = 777;
    for (index = 0; index < paramObject.logArrayUserInterface.length; index++) {
        element = paramObject.logArrayUserInterface[index];
        responseObject.logArrayUserInterface.push(element);
    }
    // ø </APPEND paramObject.logArrayUserInterface ONTO responseObject.logArrayUserInterface>

    // console.log(`≈≈Z4040≈ {% logArrayDeveloper ==> index: ${index} %}`)
    // console.log(`≈≈Z4047≈ {% logArrayUserInterface ==> index: ${index} %}`)
    // pstZEnrSeven202108STEP_P_04RETURN #return from esl
    // pstZEnrSeven202108STEP_P_04RETURN ==> Return-To: PERFORM-UI ==> pstZEnrSeven202108STEP_P_05
    DOX = 'pstEnrSeven202108STEP_P_04RETURN ==> Return-To: PERFORM-UI ==> pstEnrSeven202108STEP_P_05';
    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING_RETURN ==> Return-To: PERFORM-UI ==> pstEnrSeven202108STEP_P_05';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// ø <---------- </msboxPostEnrollmentSevenPerformStepDO> ---------->

// ø <---------- </msboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->

// ø <---------- <msboxPostEnrollmentSevenActionScripts>  ---------->
// pstEnrSeven202108ACTION ACTION_SCRIPT-ALL

// ø <---------- <msboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]>  ---------->
export async function msboxPostEnrollmentSevenActionOnReady(anyButtonLog = '{# no button log #}') {
    console.groupCollapsed(`msboxPostEnrollmentSevenActionOnReady(anyButtonLog = '{# no button log #}')`)
    // pstEnrSeven202108ACTION
    // pstZEnrSeven202108STEP_R_01 BEGIN (CLICK DURING DEV)
    // 202109_UserInterface
    // <init>
    local.setItem('superEnrollmentStatus','PENDING');
    // </init>
    let DOX = (new Date).toISOString();
    local.setItem('logString',DOX);
    DOX = 'pstEnrSeven202108STEP_R_01 BEGIN (CLICK DURING DEV)';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    // <OBVIATE: instantiateLoopSwitchEnrollmentSteps()>
    // VIA: 'Really Do It' ==> Reset Steps [button]
    let stepArrayOrig = ['IINSTANTIATE', 'PREP_ppMember', 'EXECUTE_ppMember', 'PREP_stMember', 'EXECUTE_stMember', 'dedupePpStContact', 'PREP_ppContact', 'PREP_ppDatabase', 'PREP_stContact', 'PREP_stDatabase', 'PREP_spContact', 'PREP_spDatabase', 'EXECUTE_ppContact', 'EXECUTE_ppDatabase', 'EXECUTE_stContact', 'EXECUTE_stDatabase', 'EXECUTE_spContact', 'EXECUTE_spDatabase', 'CCOMPLETE'];
    let stepList = stepArrayOrig.toString();
    local.setItem('enrollmentStepListAll', stepList);
    let doReset = (local.getItem('enrollmentStepCompletedListAll')).length === 0 ? true : false;
    // doReset = (local.getItem('enrollmentStepCompletedListAll')).lastIndexOf('ResolveAndDestroy') > 0 ? true : false;
    //lastIndexOf(searchValue)
    doReset = $w('#radioOnReadyFullReset').value === 'FULL_RESET' ? true : doReset;
    if(doReset){
        local.setItem('enrollmentStepCompletedListAll','OnReadyReset')
        $w('#radioOnReadyFullReset').value = '';
    }else{
        local.setItem('enrollmentStepCompletedListAll', local.getItem('enrollmentStepCompletedListAll') + ',' + 'OnReadyResetContinue')
    }
    // </OBVIATE: instantiateLoopSwitchEnrollmentSteps()>




    let responseObject = {};
    responseObject.action = 'ONREADY';
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    responseObject.messageKey = 'primary';
    memory.setItem('msboxLastState', 'stateZero')
    responseObject.logArrayDeveloper.push('{# responseObject.button = NEXT #}');
    responseObject.logArrayDeveloper.push('{# memory.setItem(msboxLastState,stateZero) #}');
    console.log(`responseObject = {instantiated}`)

    // <202108100800> 
    let key = "pstEnrBootstrap";
    let jsonDataJSON = await getSourcedJSON_byKey(key);
    let jsonDataObject = JSON.parse(jsonDataJSON);


    memory.setItem('stepObjects', JSON.stringify(jsonDataObject.stepObjects));
    memory.setItem('stepMessaging', JSON.stringify(jsonDataObject.stepMessaging));
    // pstZEnrSeven202108STEP_R_01 ==> GoTo: AnyAction ==> pstZEnrSeven202108STEP_RN_02
    DOX = 'pstEnrSeven202108STEP_R_01 ==> GoTo: AnyAction ==> pstEnrSeven202108STEP_RN_02';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø <CleanUp B4 things Start>
    // ? anything else
    memory.setItem('stepLogString','');
    local.setItem('stepMessagingJSON','');
    // ø </CleanUp B4 things Start>
    await doSimpleDemogrfxAssignment()

    // ø <assign UI Demografx>
    $w('#btnPrimaryName').label = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    $w('#btnPrimaryName').enable();
    $w('#btnStudentName').label = local.getItem('stFirst') + ' ' + local.getItem('stLast');
    $w('#btnStudentName').enable();
    let spName = (local.getItem('spFirst') + ' ' + local.getItem('spLast')).trim();
    if(spName.length > 0){
        $w('#btnSecondaryName').label = spName;
        $w('#btnSecondaryName').enable();
        $w('#btnSecondaryIdLabel').enable();
    }
    // ø </assign UI Demografx>
    console.log(`doSimpleDemogrfxAssignment() +> <assign UI Demografx> seems to be working`)

    // 202109_ActionValueRepeaters
    let actionValueRepeatersParamObject = {};
    actionValueRepeatersParamObject.prepKey = 'OnReady';
    await loadActionValueRepeatersWithJSON(actionValueRepeatersParamObject);
    console.log(`await loadActionValueRepeatersWithJSON(actionValueRepeatersParamObject); seems to be working`)

    console.log(`about to call: await msboxPostEnrollmentSevenAnyAction(responseObject);`)
    console.dir(responseObject)
    await msboxPostEnrollmentSevenAnyAction(responseObject);
    console.log(`about to call: await onReadyToOnRamp(responseObject);`)
    console.dir(responseObject)
    await onReadyToOnRamp(responseObject);
    console.log(`GROUP-END; msboxPostEnrollmentSevenActionOnReady(anyButtonLog = '{# no button log #}')`)
    console.dir(responseObject)
    console.groupEnd()
    // </202108100800> 
}
// ø <---------- </msboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]> ---------->
// ø <---------- <msboxPostEnrollmentSevenActionNext - NEXT_STATE>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function msboxPostEnrollmentSevenActionNext(anyButtonLog = '{# no button log #}') {
    //  pstEnrSeven202108ACTION
    // pstZEnrSeven202108STEP_N_01 ACTION-NEXT BEGIN-CLICK
    let DOX = (new Date).toISOString();
    local.setItem('logString',DOX);
    DOX = 'pstEnrSeven202108STEP_N_01 ACTION-NEXT BEGIN-CLICK';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    let responseObject = {};
    responseObject.action = 'NEXT';
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    DOX = '<more rigorous and belongs where PRIMARY Happens>'
    // responseObject.messageKey = 'primary';
    // responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    // responseObject.messageResponse = false;
    DOX = '</more rigorous and belongs where PRIMARY Happens>'
    // pstZEnrSeven202108STEP_N_01 ==> Call: ANY-ACTION ==> pstZEnrSeven202108STEP_N_02
    DOX = 'pstEnrSeven202108STEP_N_01 ==> Call: ANY-ACTION ==> pstEnrSeven202108STEP_N_02';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    msboxPostEnrollmentSevenAnyAction(responseObject);

}
// ø <---------- </msboxPostEnrollmentSevenActionNext - NEXT_STATE> ---------->

// ø <---------- <msboxPostEnrollmentSevenActionPerform - PERFORM_STATE_SCRIPTS>  ---------->
export async function msboxPostEnrollmentSevenActionPerform(anyButtonLog = '{# no button log #}') {
    // pstEnrSeven202108ACTION
    // pstZEnrSeven202108STEP_P_01 ACTION-PERFORM BEGIN-CLICK
    let DOX = (new Date).toISOString();
    local.setItem('logString',DOX);
    DOX = 'pstEnrSeven202108STEP_P_01 ACTION-PERFORM BEGIN-CLICK';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    let responseObject = {};
    responseObject.action = 'PERFROM';
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'CURRENT';
     DOX = '<more rigorous and belongs where RESPONSE Happens>'
    // let messageKeyArray = ["success", "success", "warning", "danger"];
    // responseObject.messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    // responseObject.messageRandomInfo = Math.random() * 100 > 66 ? true : false;
    // responseObject.messageResponse = true;
    // pstZEnrSeven202108STEP_P_01 ==> Call: ANY-ACTION ==> pstZEnrSeven202108STEP_P_02
    DOX = 'pstEnrSeven202108STEP_P_01 ==> Call: ANY-ACTION ==> pstEnrSeven202108STEP_P_02';
    local.setItem('logString', local.getItem('logString') + '\n ' + DOX)
    DOX = '</more rigorous and belongs where RESPONSE Happens>'
    await msboxPostEnrollmentSevenAnyAction(responseObject);
}
// ø <---------- </msboxPostEnrollmentSevenActionPerform - PERFORM_STATE_SCRIPTS> ---------->

// ø <---------- <doSimpleDemogrfxAssignment - ON_READY> ---------->
export async function doSimpleDemogrfxAssignment(){
    // ø <--->
    // ø <added 20210909>
    // ø <Simple Demogrfx Assignment to local-Storage upon OnRamp>
        // ø updated 20210926
    // ø   - familySeed,studentEmail
    // ø updated 20210927
    // ø   - actionValueEvaluation dependent values set to 'EEMPTY' so no null-fuss
    // let actionValueNonNullLocalKeyArray_FULL = ['staffIdentifiedFamilyId','familySeed','familyId','studentId','secondaryId','familyEmail','studentEmail','secondaryEmail','ppFirst','ppLast','stFirst','stPreferredFirst','stLast','spFirst','spLast','ppRevision','stRevision'];
    let actionValueNonNullLocalKeyArray /*SUFFICIENT*/ = ['familyId','studentId','secondaryId','studentEmail','secondaryEmail'];
    let actionValueNonNullMemoryKeyArray /*SUFFICIENT*/ = ['ppRevision','stRevision'];
    let actionValueNonNullAllKeyArray /*SUFFICIENT*/ = actionValueNonNullLocalKeyArray.concat(actionValueNonNullMemoryKeyArray)
    let tempBoolean = false
    actionValueNonNullAllKeyArray.forEach(key => {
        // console.log(key);
        if(actionValueNonNullLocalKeyArray.includes(key)){
            tempBoolean = local.getItem(key) == null ? true : false;
            if (tempBoolean) {
                local.setItem(key,'EEMPTY')
            }
        }
        if(actionValueNonNullMemoryKeyArray.includes(key)){
            tempBoolean = memory.getItem(key) == null ? true : false;
            if (tempBoolean) {
                memory.setItem(key,'EEMPTY')
            }
        }

    });

    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    // local.setItem('superEnrollmentStatus', enrollmentObject.descr);
    local.setItem('staffIdentifiedFamilyId', enrollmentObject.family.parent.primary.memberId);
    // ø <same code as below>
        let familySeed = enrollmentObject.family.parent.primary.memberId;
    // in stMemberPrepJSON()
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        familySeed = familySeed.replace('-', '');
        local.setItem('familySeed', familySeed);
    // ø </same code as below>
    // local.setItem('familySeed', enrollmentObject.descr);
    // local.setItem('familyId', enrollmentObject.descr);
    // local.setItem('studentId', enrollmentObject.descr);
    // local.setItem('secondaryId', enrollmentObject.descr);
    local.setItem('familyEmail', enrollmentObject.family.emails[0].email);
    // local.setItem('studentEmail', enrollmentObject.descr);
    // local.setItem('secondaryEmail', enrollmentObject.descr);
    local.setItem('ppFirst', enrollmentObject.family.parent.primary.first);
    local.setItem('ppLast', enrollmentObject.family.parent.primary.last);
    local.setItem('stFirst', enrollmentObject.family.student.name.first);
    local.setItem('stPreferredFirst', enrollmentObject.family.student.name.preferred);
    local.setItem('stLast', enrollmentObject.family.student.name.last);
    // ø <same code as below>
    // in stMemberPrepJSON()
        let email = enrollmentObject.family.student.name.first;
        let firstSpace = email.indexOf(' ');
        email = firstSpace > 0 ? email.substr(0, firstSpace) : email;
        email += local.getItem('familySeed').substr(0, 4);//should be identical to above, 
        email = 'steamdiscoveryacademy' + '+' + email + '@gmail.com';
        email = email.toLowerCase();
        local.setItem('studentEmail', email);
    // ø </same code as below>
    let spFirst = "";
    let spLast = "";
    let spAny = typeof enrollmentObject.family.parent.secondary === 'undefined' ? false : true;
    if (spAny) {
        spFirst = typeof enrollmentObject.family.parent.secondary.first === 'string' ? enrollmentObject.family.parent.secondary.first : "";
        spLast = typeof enrollmentObject.family.parent.secondary.last === 'string' ? enrollmentObject.family.parent.secondary.last : "";
        if (spLast.length === 0 && spFirst.length > 0) {
            spLast = local.getItem('ppLast');
        }
    }
    local.setItem('spFirst', spFirst);
    local.setItem('spLast', spLast);
    local.setItem('comboName', enrollmentObject.family.student.name.studentParentCombo);
    // ø </Simple Demogrfx Assignment to local-Storage upon OnRamp>
    // ø </added 20210909>
    // ø </...>
}
// ø <---------- </doSimpleDemogrfxAssignment - ON_READY> ---------->


// pstEnrSeven202108ACTION ACTION_SCRIPT-ALL_END
// ø <---------- </msboxPostEnrollmentSevenActionScripts> ---------->


// ø FIND pstEnrSeven202108 SOUP_TO_NUTS-END
// ø <---------- </mxboxPstEnrSeven_soupToNuts> ---------->

// "stateOnramp"
// "stateInstantiate"
// "stateMemberConfirm"
// "stateDupeDelete"
// "stateDatabaseForPrimaryAndStudent"
// "stateContactForPrimaryAndStudent"
// "stateContactAndDatabaseForSecondary"
// "stateResolveAndDestroy"
// "stateOfframp"

export function goToStateById(id) {
    // id = id.substr(0,1) === '#' ? id : '#' + id;
    console.log('id: ' + id);
    $w("#mxboxPostEnrollmentSeven").changeState(id);
}

// ø <---------- <goToState>  ---------->
// ø <---------- <goToState>  ---------->
export async function goToState(responseObject, direction = 'NEXT') {
    // pstEnrSeven202108UTILITY BEGIN
    responseObject.logArrayDeveloper.push(`{% goToState(responseObject, ${direction}) %}`);
    direction = direction.toUpperCase();
    let supportedAliasesForPREV = ['PREVIOUS', 'PREV'];
    direction = supportedAliasesForPREV.indexOf(direction) >= 0 ? 'PREV' : 'NEXT';
    responseObject.logArrayDeveloper.push(`{% resolved direction: ${direction}) %}`);
    //PREV is NOT SUPPORTED AT THIS TIME
    // ø <NEXT or PREVIOUS>
    let TTHIS = 'holder';
    // ø <good jucture to be Explicit>
    let peSevenStates = $w("#mxboxPostEnrollmentSeven").states;
    let peSevenStatesIdArray = peSevenStates.map(a => a.id);
    let peSevenStateCurrent = $w("#mxboxPostEnrollmentSeven").currentState;
    let peSevenStateCurrentId = peSevenStateCurrent.id;
    // ø </good jucture to be Explicit>
    let length = peSevenStatesIdArray.length;
    let currentIndex = peSevenStatesIdArray.indexOf(peSevenStateCurrentId);
    responseObject.logArrayDeveloper.push(`{% state-index ${currentIndex} of ${length}: ${peSevenStateCurrentId}) %}`);
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
        responseObject.logArrayDeveloper.push(`{% goToStateById(${targetId}) %}`);
        goToStateById(targetId);
    } else {
        responseObject.logArrayDeveloper.push(`{% invalid targetId: ${targetId}) %}`);
    }
    // pstEnrSeven202108UTILITY END
}
// ø <---------- </goToState> ---------->
// ø <---------- </goToState> ---------->


// ø <---------- <doBootstrapMessage UI>  ---------->
// ! NOTE: consider,INSTEAD, using 'backend/utility.jsw:renderBootstrapMarkdownString'
// !           this is where all enhancements will be place
// ! 20210723171500=>    at this time it _exists_ out there and hasn't broken anything
// ! I WILL TRY TO KEEP UP, BUT CHECK THE FILE ITSELF, and/or git to be certain
export function doBootstrapMessage(key, messageThis = 'DEFAULT', responsiveByLengthToFontSize2dArray = [], txtColor = '#007bff', bgColor = '#FFFFFF') {
    // pstEnrSeven202108UTILITY BEGIN
    // console.log("[fnc]key: " + key)
    key = key.toLowerCase();
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
    if (responsiveByLengthToFontSize2dArray.length > 0) {
        /**
         * see separate DOX file 
         * here: steamdaWixLocal/steamdaWix/agile/sprint/SevenSuperSteps/doBootstrapMessage_byHtml_UI_DOX.js
         • force to 18: [[-1,18]]
         • Breakpoint at 50: [[-1,36],[50,28]]
         */

        let length = -1;
        let fontSize = pixelsByBreakPoint;
        responsiveByLengthToFontSize2dArray.forEach(pair => {
            // console.log(pair);
            length = pair[0];
            fontSize = pair[1];
            if (messageThis.length > length) {
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
    // pstEnrSeven202108UTILITY END
}
// ø <---------- </doBootstrapMessage UI> ---------->

// ø <---------- <salsDoMessagingReponsesApply UI>  ---------->
export async function salsDoMessagingReponsesApply(responseObject = {}, paramObject = {}) {
    let DOX = 'JUST FOR VISIBLE DOX IN WIX';
    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING ==> Begin Messaging';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
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
    console.groupCollapsed('ppEQ_toMessageObject');
    DOX = (memory.getItem('stepLogString')).length > 0 ? memory.getItem('stepLogString') : 'stepLogString is EMPTY'
    console.log(DOX);
    let messageObjectArraysByKey = await parsePPEQ_toObjectArraysByKey(memory.getItem('stepLogString'));
    console.dir(JSON.stringify(messageObjectArraysByKey));
    console.groupEnd();
    // local.setItem('lastResponseObject', JSON.stringify(messageObjectArraysByKey,undefined,4));
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
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø ==================================================================================================================================
    // ø ====================  \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/  ====================
    // ø ==================== <DISABLE ALL: Logic for Messaging other than PPEQ from memory.getItem('stepLogString')>  ====================
    // ø ====================               DISABLED on August 21, 2021 marked DISABLED_nonPPEQ_20210821               ====================
    // ø ====================  /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\  ====================
    // ø ==================================================================================================================================
    // ø ==================== <DISABLED_nonPPEQ_20210821>  ====================
    // let holderKey = 'FAUX';
    // let response = 'EEMPTY';

    // let DOXkey = 'success'
    // let DOXkeyDo = DOXkey + 'Do'
    // ø ==================== </DISABLED_nonPPEQ_20210821> ====================
    // DOX = `${DOXkey.toUpperCase()} VALUES:\n============`;
    // DOX += '\n\n ORIGINAL:';
    // DOX += '\n' + `paramObject.messaging.${DOXkey}: ${paramObject.messaging[DOXkey]}`;
    // DOX += '\n' + `paramObject.messaging.${DOXkeyDo}: ${paramObject.messaging[DOXkeyDo]}`;
    // DOX += '\n' + `responseObject.currentMessagingObject.${DOXkey}: ${responseObject.currentMessagingObject[DOXkey]}`;
    // in decreasing eggregiousness so most eggregious is 'TAKEN'

    // ø ==================== <DISABLED_nonPPEQ_20210821>  ====================
    // <APPLY DEFAULTS>
    //POdanger = POdanger === "DEFAULT" ? ROdanger : POdanger
    // paramObject.messaging.primary = paramObject.messaging.primary === "DEFAULT" ? responseObject.currentMessagingObject.primary : paramObject.messaging.primary;
    // paramObject.messaging.info = paramObject.messaging.info === "DEFAULT" ? responseObject.currentMessagingObject.info : paramObject.messaging.info;
    // paramObject.messaging.devel = paramObject.messaging.devel === "DEFAULT" ? responseObject.currentMessagingObject.devel : paramObject.messaging.devel;
    // paramObject.messaging.success = paramObject.messaging.success === "DEFAULT" ? responseObject.currentMessagingObject.success : paramObject.messaging.success;
    // paramObject.messaging.warning = paramObject.messaging.warning === "DEFAULT" ? responseObject.currentMessagingObject.warning : paramObject.messaging.warning;
    // paramObject.messaging.danger = paramObject.messaging.danger === "DEFAULT" ? responseObject.currentMessagingObject.danger : paramObject.messaging.danger;
    // DOX += '\n\n AFTER DEFAULT CHECK:';
    // DOX += '\n' + `paramObject.messaging.${DOXkey}: ${paramObject.messaging[DOXkey]}`;
    // DOX += '\n' + `paramObject.messaging.${DOXkeyDo}: ${paramObject.messaging[DOXkeyDo]}`;
    // DOX += '\n' + `responseObject.currentMessagingObject.${DOXkey}: ${responseObject.currentMessagingObject[DOXkey]}`;
    // </APPLY DEFAULTS>
    // ø ==================== </DISABLED_nonPPEQ_20210821> ====================

    // ø ==================== <DISABLED_nonPPEQ_20210821>  ====================
    // holderKey = paramObject.messaging.danger !== 'dangerFAUX' ? 'danger' : holderKey;
    // holderKey = paramObject.messaging.warning !== 'warningFAUX' && holderKey === 'FAUX' ? 'warning' : holderKey;
    // holderKey = paramObject.messaging.success !== 'successFAUX' && holderKey === 'FAUX' ? 'success' : holderKey;
    // response = paramObject.messaging.success === 'successFAUX' ? paramObject.messaging.responseDo : 'success';
    // response = holderKey === 'FAUX' ? 'EEMPTY' : paramObject.messaging[holderKey];
    // responseObject.currentMessagingObject.responseKey = holderKey;
    // responseObject.currentMessagingObject.response = response;
    // // ø <APPLY paramObject IFF>
    // holderKey = 'FAUX';
    // holderKey = paramObject.messaging.primary === 'primaryFAUX' ? holderKey : 'primaryFAUX';
    // paramObject.messaging.primaryDo = paramObject.messaging.primary === 'primaryFAUX' ? false : true;
    // responseObject.currentMessagingObject.primary = holderKey === 'FAUX' ? responseObject.currentMessagingObject.primary : paramObject.messaging.primary;
    // holderKey = 'FAUX';
    // holderKey = paramObject.messaging.info === 'infoFAUX' ? holderKey : 'infoFAUX';
    // paramObject.messaging.infoDo = paramObject.messaging.info === 'infoFAUX' ? false : true;
    // responseObject.currentMessagingObject.info = holderKey === 'FAUX' ? responseObject.currentMessagingObject.info : paramObject.messaging.info;
    // holderKey = 'FAUX';
    // holderKey = paramObject.messaging.devel === 'develFAUX' ? holderKey : 'develFAUX';
    // responseObject.currentMessagingObject.devel = holderKey === 'FAUX' ? responseObject.currentMessagingObject.devel : paramObject.messaging.devel;
    // ø ==================== </DISABLED_nonPPEQ_20210821> ====================
    // DOX += '\n\n APPLY PARAM_OBJECT:';
    // DOX += '\n' + `paramObject.messaging.${DOXkey}: ${paramObject.messaging[DOXkey]}`;
    // DOX += '\n' + `paramObject.messaging.${DOXkeyDo}: ${paramObject.messaging[DOXkeyDo]}`;
    // DOX += '\n' + `responseObject.currentMessagingObject.${DOXkey}: ${responseObject.currentMessagingObject[DOXkey]}`;
    // ø </APPLY paramObject IFF>


    // ø <FINAL VALUES>
    // ø ==================== <DISABLED_nonPPEQ_20210821>  ====================
    // if (paramObject.messaging.primaryDo) { $w('#txtBootstrapPrimary').html = doBootstrapMessage('primary', paramObject.messaging.primary, [[-1, 36], [50, 28]]) }
    // if (paramObject.messaging.infoDo) { $w('#txtBootstrapInfo').html = doBootstrapMessage('info', paramObject.messaging.info, [[-1, 36], [50, 28]]); $w('#txtBootstrapInfo').expand(); }
    // if (responseObject.currentMessagingObject.response !== 'EEMPTY') { $w('#txtBootstrapResponse').html = doBootstrapMessage(responseObject.currentMessagingObject.responseKey, responseObject.currentMessagingObject.response, [[-1, 36], [50, 28]]); $w('#txtBootstrapResponse').expand(); }
    // ø ==================== </DISABLED_nonPPEQ_20210821> ====================
    // DOX += '\n\n FINAL VALUES:';
    // DOX += '\n' + `paramObject.messaging.${DOXkey}: ${paramObject.messaging[DOXkey]}`;
    // DOX += '\n' + `paramObject.messaging.${DOXkeyDo}: ${paramObject.messaging[DOXkeyDo]}`;
    // DOX += '\n' + `responseObject.currentMessagingObject.${DOXkey}: ${responseObject.currentMessagingObject[DOXkey]}`;
    // DOX += '\n' + `rresponseObject.currentMessagingObject.responseKey: ${responseObject.currentMessagingObject.responseKey}`;
    // DOX += '\n' + `rresponseObject.currentMessagingObject.response: ${responseObject.currentMessagingObject.response}`;
    // ø </FINAL VALUES>

    // ø ==================================================================================================================================
    // ø ====================  \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/  ====================
    // ø ==================== </DISABLE ALL: Logic for Messaging other than PPEQ from memory.getItem('stepLogString')> ====================
    // ø ====================  /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\  ====================
    // ø ==================================================================================================================================

    // pstEnrSeven20210822_MESSAGING END
    // pstEnrSeven202108UTILITY END
    // pstEnrSeven202108SALSDoMessaging END
    DOX = 'pstEnrSeven202108STEP_P_04MESSAGING ==> Return from Messaging ==> pstEnrSeven202108STEP_P_04MESSAGING_RETURN';
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// ø <---------- </salsDoMessagingReponsesApply UI> ---------->

// ø <---------- <getSourcedJSON_byKey UTILITY>  ---------->
export async function getSourcedJSON_byKey(key) {
    // pstEnrSeven202108UTILITY SHORT
    let now = new Date();
    let nowISO = now.toISOString();
    let recordSourcedJSON = await wixData.query("sourcedJSON")
        .eq("key", key)
        .lt("versionStampTxt", nowISO)
        .descending("versionStampTxt")
        .limit(1)
        .find();
    return JSON.stringify(recordSourcedJSON.items[0].jsonData);
}
// ø <---------- </getSourcedJSON_byKey UTILITY> ---------->

// ø <---------- <parsePPEQ_toObjectArraysByKey UTILITY>  ---------->
export async function parsePPEQ_toObjectArraysByKey(ppeqString = 'STRING'){
    local.setItem('lastParamObject', ppeqString);
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
    let message = 'STRING';
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
        message = typeof elementArray[1] === 'undefined' ? '' : elementArray[1];
        // ø
        // ø <>//#endregion
        // ø <Process Aliases>
        // 202109_processALIASES
        // ø <DeDupe Aliases>
        message = message === 'DUPLICATE_EXISTS_PRIMARY' ? `The 'Duplicate Anomaly' exists for Primary Parent` : message;
        message = message === 'DUPLICATE_EXISTS_STUDENT' ? `The 'Duplicate Anomaly' exists for Student` : message;
        message = message === 'DUPLICATE_EXISTS_PRIMARY_STUDENT' ? `The 'Duplicate Anomaly' exists for both Primary Parent and Student` : message;
        message = message === 'DUPLICATE_UNDELETED_PRIMARY' ? `An Undeleted 'Duplicate Anomaly' exists for Primary Parent` : message;
        message = message === 'DUPLICATE_UNDELETED_STUDENT' ? `An Undeleted 'Duplicate Anomaly' exists for Student` : message;
        message = message === 'DUPLICATE_UNDELETED_PRIMARY_STUDENT' ? `An Undeleted 'Duplicate Anomaly' exists for both Primary Parent and Student` : message;
        // ø <INVALID PRIMARY || INVALID STUDENT>
        // ø INVALID PRIMARY || INVALID STUDENT are unlikely that the aliases will wait
        // ø </INVALID PRIMARY || INVALID STUDENT>
        // ø </DeDupe Aliases>
        // ø </Process Aliases>
        // ø </>
        // ø
        elementObject = {};
        elementObject.message = message;
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
    local.setItem('lastResponseObject', JSON.stringify(responseObjectArraysByKey));
    return responseObjectArraysByKey;
}
// ø <---------- </parsePPEQ_toObjectArraysByKey UTILITY> ---------->

// ø <---------- <ppeqPostToWatchdogLog UTILITY>  ---------->
export function ppeqPostToWatchdogLog(doPostLogObject = {}){
    let response = `Holder for Eventual Watchdog-Log Logging Response`;
    return response;
}
// ø <---------- </ppeqPostToWatchdogLog UTILITY> ---------->

// ø <---------- <ppeqOneMessageFromMany UTILITY>  ---------->
export function ppeqOneMessageFromMany(uiPlacementObjectArray = []){
    // pstEnrSeven202108UTILITY SHORT
    // pstEnrSeven20210822_MESSAGING
    /**
     * NOTES:
     *   - there seems no practical reason to count the objects past one, but it could be done
     *   - there seems no practical reason to append finalObject uiPlacementObjectArray, but I did
     */
    let count = uiPlacementObjectArray.length -1;
    let firstSuccessObject = {};
    let countSuccessObject = 0;
    let firstWarningObject = {};
    let countWarningObject = 0;
    let firstDangerObject = {};
    let countDangerObject = 0;
    let finalObject = {};
    
    uiPlacementObjectArray.forEach(elementObject => {
        // console.log(elementObject);
        if(elementObject.bootstrap === 'SUCCESS' && countSuccessObject === 0){
            firstSuccessObject = elementObject;
            countSuccessObject++;
        }
        if(elementObject.bootstrap === 'WARNING' && countWarningObject === 0){
            firstWarningObject = elementObject;
            countWarningObject++;
        }
        if(elementObject.bootstrap === 'DANGER' && countDangerObject === 0){
            firstDangerObject = elementObject;
            countDangerObject++;
        }
    });


    finalObject = countSuccessObject > 0 ? firstSuccessObject : finalObject;
    finalObject = countWarningObject > 0 ? firstWarningObject : finalObject;
    finalObject = countDangerObject > 0 ? firstDangerObject : finalObject;
    // let uiPlacement = 'PENDING';// gather from param ¿or add param?
    // let uiPlacement = uiPlacementObjectArray[0].message;// should be the same for all objects in the array, by design
    // finalObject.bootstrap = `danger`;
    // finalObject.message = `One [Holder] Message from Many [${count}] for ${uiPlacement}`;
    let arrayBootstrapMessage = [];
    arrayBootstrapMessage.push(finalObject.bootstrap);
    arrayBootstrapMessage.push(finalObject.message);

    uiPlacementObjectArray.final = [];    
    uiPlacementObjectArray.final.push(finalObject);

    return arrayBootstrapMessage;	
}
// ø <---------- </ppeqOneMessageFromMany UTILITY> ---------->

// ø <---------- <appendStepLogPPEQ UTILITY>  ---------->
export async function appendStepLogPPEQ(key = 'STRING', message = 'STRING', lineNumber = 'STRING', postLog){
    // pstEnrSeven202108UTILITY SHORT
    // pstEnrSeven20210822_MESSAGING
    lineNumber = lineNumber === 'STRING' ? '' : lineNumber.toString();
    
    // console.warn('orig: postLog: ' + postLog);
    postLog = typeof postLog === 'boolean' && postLog === true ? 'TTRUE' : postLog;
    // console.warn('boolean true: postLog: ' + postLog);
    postLog = typeof postLog === 'string' && postLog.toLowerCase() === 'true' ? 'TTRUE' : postLog;
    // console.warn('string true: postLog: ' + postLog);
    postLog = postLog === 'TTRUE' ? 'TTRUE' : 'FFALSE';
    // console.warn('final: postLog: ' + postLog);
    
    // postLog = typeof postLog === 'boolean' && postLog === true ? 'TTRUE' : postLog;
    // postLog = typeof postLog === 'string' && postLog === true ? 'TTRUE' : 'FFALSE';

    let msboxLastState= memory.getItem('msboxLastState');
    let stepThis = memory.getItem('stepThis');

    let stepStringLog = key + '=';
    stepStringLog += message + '=';
    stepStringLog += lineNumber + '=';
    stepStringLog += postLog + '=';
    stepStringLog += msboxLastState + '=';
    stepStringLog += stepThis + '|';
    memory.setItem('stepLogStringSecondary', memory.getItem('stepLogStringSecondary') + stepStringLog )
    if(key.toLocaleLowerCase() !== 'secondary'){
        memory.setItem('stepLogString', memory.getItem('stepLogString') + stepStringLog )
    }
    
    return stepStringLog    
}
// ø <---------- </appendStepLogPPEQ UTILITY> ---------->

// ø <---------- <alphaTimeKey GROUP>  ---------->
// 202109_alphaTimeKey
// pstEnrSeven202108UTILITY SHORT

// ø <---------- <alphaTimeKey>  ---------->
export function alphaTimeKey(jsDate = new Date()){
    // pstEnrSeven202108UTILITY SHORT
    let yyyyChunkParam = jsDate.getFullYear() % 100
    let mmChunkParam = jsDate.getMonth() + 1
    let ddChunkParam = jsDate.getDate()
    var d = new Date(jsDate);
    var timeChunkParam = Math.floor(Number(jsDate - d.setHours(0,0,0,0))/1000);
    let msChunkParam = jsDate.getMilliseconds();
    let yyyyChunk = alphaChunk(yyyyChunkParam)
    let mmChunk = alphaChunk(mmChunkParam)
    let timeChunk = alphaChunk(timeChunkParam)
    let alphaTimeKeyFinal = yyyyChunk + mmChunk + ('00' + ddChunkParam.toString()).substr(-2) + timeChunk + ('000' + msChunkParam.toString()).substr(-3);
    return alphaTimeKeyFinal;
}
// ø <---------- </alphaTimeKey> ---------->

// ø <---------- <alphaChunk>  ---------->
export function alphaChunk(chunk = 777){
    // pstEnrSeven202108UTILITY SHORT
    let alphabetTransposer /*base 26*/ = { a1: 'A', a2: 'B', a3: 'C', a4: 'D', a5: 'E', a6: 'F', a7: 'G', a8: 'H', a9: 'I', a0: 'J', a: 'K', b: 'L', c: 'M', d: 'N', e: 'O', f: 'P', g: 'Q', h: 'R', i: 'S', j: 'T', k: 'U', l: 'V', m: 'W', n: 'X', o: 'Y', p: 'Z' };
    let chunkArray = (chunk.toString(26)).split("");
    let alphaChunkString = '';
    let transChar = '';
    let alphaChar = '';
    let alphaCharArray = [];
    chunkArray.forEach(char => {
        transChar = Number(char) > 0 ? 'a' + char : char;
        transChar = transChar === '0' ? 'a0' : transChar;
        alphaChar = alphabetTransposer[transChar];
        alphaCharArray.push(alphaChar);
        alphaChunkString += alphaChar;
    });
    return alphaChunkString
}
// ø <---------- </alphaChunk> ---------->
// ø <---------- </alphaTimeKey GROUP> ---------->

// ! =========================================================================================================================
// ! ==================================          </SEVENT-SUPER-STEPS with MultiStateBox>         ============================
// ! ==================================                     FIND pstEnrSeven202108 pstEnrSeven202108UTILITY                ============================
// ! =========================================================================================================================


export function btnStateOnramp_click(event) {
    let id = 'stateOnramp';
    goToStateById(id);
}

export function btnStateOfframp_click(event) {
    let id = 'stateOfframp';
    goToStateById(id);
}

export function btnPeSevenNext_click(event) {
    let initLog = 'btnPeSevenNext_click NEXT';
    msboxPostEnrollmentSevenActionNext(initLog);
}

export async function btnPeSevenCurrent_click(event) {
    console.log('Perform-Click:  Perform.collapse(),  (Next.collapse() already): no buttons until complete')
    $w('#btnPeSevenCurrent').collapse();
    let initLog = 'btnPeSevenCurrent_click PERFORM';
    await msboxPostEnrollmentSevenActionPerform(initLog);
}

export function btnGetStatesArray_click(event) {
    let superSevenStates = $w("#mxboxPostEnrollmentSeven").states;
    $w('#txareaDevelResponseBlock').value = JSON.stringify(superSevenStates, undefined, 4)
    let statesArray = $w("#mxboxPostEnrollmentSeven").states.map(state => state.id);
}

export function btnCopySevenBelow_click(event) {
    uiCopyTextElementThis('WHERE IS THIS BUTTON ZXZ');
}

export async function isoKLUDGE() {
    let isoStampStringRaw = await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv'));
    let isoStampStringCHOP = isoStampStringRaw;
    let isoStampStringNEW = 'HOLDER';
    isoStampStringCHOP = isoStampStringRaw.indexOf('-') < 0 ? isoStampStringCHOP : '20201231235959.599 [EDT]';
    isoStampStringCHOP = isoStampStringCHOP.substr(0, 14);
    isoStampStringNEW = isoStampStringCHOP.substr(0, 4) + '-';
    isoStampStringNEW += isoStampStringCHOP.substr(4, 2) + '-';
    isoStampStringNEW += isoStampStringCHOP.substr(6, 2) + 'T';
    isoStampStringNEW += ('00' + (Number(isoStampStringCHOP.substr(8, 2)) - 1)).substr(-2); //Central
    isoStampStringNEW += ':';
    isoStampStringNEW += isoStampStringCHOP.substr(10, 2) + ':';
    isoStampStringNEW += isoStampStringCHOP.substr(12, 2);
    return isoStampStringNEW;
}

export function btnPeSevenFauxOnReady_click(event) {
    let initLog = 'FAUX $w.onReady() NEXT';
    msboxPostEnrollmentSevenActionOnReady(initLog);
    $w('#btnPeSevenFauxOnReady').hide();
}

// ! ========================================================================================================================
// ! ==============================               <DEVELOPER ONLY MultiStateBox>               ==============================
// ! ==============================                    FIND 202109_Developer                   ==============================
// ! ========================================================================================================================
// ! =========================================================== DOX ========================================================
/**
 * 
 */
// ! ========================================================================================================================

// ! ========================================================================================================================
// ! ===================================               <Button Clicks Only>               ===================================
// ! ========================================================================================================================

export async function btnMultButtonDD01_click(event) {
    // 202109_Developer
    overallManyButtonsByManyDropDowns();
}

export function btnDeveloperOnly_click(event) {
    // 202109_Developer
    let developerStateBoxID = '#DeveloperStateBox'
    let currentState = $w(developerStateBoxID).currentState;//"GET IT"
    let stateArray = $w(developerStateBoxID).states;;//['GET THEM']
	let currentIndex = stateArray.indexOf(currentState)
    let nextIndex = currentIndex + 1 >= stateArray.length ? 0 : currentIndex + 1;
    let nextState = stateArray[nextIndex]
    $w(developerStateBoxID).changeState(nextState);
}

export function btnSafeUnloadRoles_click(event) {
	console.groupCollapsed('btnSafeUnloadRoles_click')
    let developerStateBoxID = '#DeveloperStateBox'
    let supportedStateArray = ['stateInvisible','safeUnload'];
    console.log(`supportedStateArray`)
    console.dir(supportedStateArray)
    
    // ø <ELSE>
    let currentState = $w(developerStateBoxID).currentState;//"GET IT"
    // console.log(`currentState`)
    // console.dir(currentState)
    if(!supportedStateArray.includes(currentState.id)){
        console.log(`!supportedStateArray.includes(currentState)`)
        console.groupEnd()
        return;
    }
    let stateArray = $w(developerStateBoxID).states;//['GET THEM']
    // console.log(`stateArray`)
    // console.dir(stateArray)
    if(supportedStateArray[0] !== stateArray[0].id){
        console.log(`supportedStateArray[0] !== stateArray[0]`)
        console.groupEnd()
        return;
    }
    if(supportedStateArray[1] !== stateArray[stateArray.length - 1].id){
        console.log(`supportedStateArray[1] !== stateArray[stateArray.length - 1]`)
        console.groupEnd()
        return;
    }
    // ø </ELSE>

    // ø <THEN>
    console.log(`Successful Arrivale, ready to travel`)
    let targetIndex = supportedStateArray[0] === currentState.id ? 1 : 0;
    console.log(`supportedStateArray[${targetIndex}]: ${supportedStateArray[targetIndex]}`)

    // $w(developerStateBoxID).changeState(supportedStateArray[1]);
    $w(developerStateBoxID).changeState(supportedStateArray[targetIndex]);
    // ø </THEN>

    // let currentIndex = stateArray.indexOf(currentState)
    // let nextIndex = currentIndex + 1 >= stateArray.length ? 0 : currentIndex + 1;
    // let nextState = stateArray[nextIndex]
    // $w(developerStateBoxID).changeState(nextState);
    console.groupEnd()
}
export function btnDoSafeUnload_click(event) {
	// ø <UNLOAD>
    let DOX = ''
    doEnrollmentCleanupByKind('ALL_EXCEPT_ENROLLMENT')
    local.setItem("ondeckEnrollmentJSON",DOX);
    local.setItem('wixWebhookId',DOX);
    local.setItem('wixWebhookStatus',DOX);
    // responseString = `Enrollment has been Unloaded Safely, with no change to the Application Webbook
    // ...you may return to Process this Application again (or any other)`;
    // done = true;
    // paramObject.done = done;
    // paramObject.response.string = responseString;
	// ø </UNLOAD>

	// ø <GoTo LANDING PAGE>
    wixLocation.to("/blank-4");
	// ø </GoTo LANDING PAGE>
}

export async function btnMultButtonClearDD01_click(event) {
    // 202109_Developer
	let paramObject = {ddValue: "CLEAR",response: {string:'STRING'},done: false, messaging: {}}
    await overallManyButtonsByManyDropDowns(paramObject);
}

export async function btnMultButtonParseJSON_click(event) {
    // 202109_Developer
	let paramObject = {ddValue: "PARSE_JSON",response: {string:'STRING'},done: false, messaging: {}}
    await overallManyButtonsByManyDropDowns(paramObject);
}
// ! ========================================================================================================================
// ! ===================================               </Button Clicks Only>              ===================================
// ! ========================================================================================================================

// ! ======================================================================================================================================
// ! ======================================== <Enhanced Back-End Action-Value-Evaluation TESTING>  ========================================
// ! ======================================================================================================================================
// ø 202110_Enhanced_BackEnd_ActionValueEvaluation-START
// ! ===================================               <Harvested from contactDevel.js>              ===================================

export function populateOriginalActionValueButtons(){
    console.groupCollapsed(`populateOriginalActionValueButtons()`)
    console.log(`export function populateOriginalActionValueButtons()`)

    let responseString = `session.getItem('ppAction'): ${session.getItem('ppAction')}\n`;
    responseString += `session.getItem('stAction'): ${session.getItem('stAction')}\n`;
    responseString += `session.getItem('spAction'): ${session.getItem('spAction')}`;
    // $w('#secondaryResponseTXTBX').value = responseString


    let origIdArray = ['#OppMemberBTN','#OppContactBTN','#OppDbaseBTN','#OstMemberBTN','#OstContactBTN','#OstDbaseBTN','#OspMemberBTN','#OspContactBTN','#OspDbaseBTN']
    console.log(`origIdArray:`)
    console.dir(origIdArray)
    let origValuePipedArray = session.getItem('ppAction') + '|' + session.getItem('stAction') + '|' + session.getItem('spAction')
    console.log(`origValuePipedArray: ${origValuePipedArray}`)
    let origValueArray = origValuePipedArray.split('|')
    console.log(`origValueArray:`)
    console.dir(origValueArray)
    let buttonId = '';
    for (let index = 0; index < origIdArray.length; index++) {
        buttonId = origIdArray[index];
        if (typeof origValueArray[index] === 'string' && origValueArray[index] !== 'null') {
            console.log(`$w(${buttonId}).label = origValueArray[${index}] =>`)
            console.log(`${$w(buttonId).label} = ${origValueArray[index]}`)
            $w(buttonId).label = origValueArray[index]
        }
    }
}

export function populateNewActionValueButtons(action = {}){
    console.groupCollapsed(`populateNewActionValueButtons()`)
    console.log(`export function populateNewActionValueButtons()`)
    // ø <APPLY TEST OBJECT>
    let actionObjectBottianiGraysonTEST = {
    "superEnrollmentStatus": "CONTINUE",
    "superEnrollmentString": "INSTANTIATE|allDangerBooleansAreValid",
    "primary": {
        "member": "SKIP",
        "contact": "UPDATE",
        "dataBase": "INSERT",
        "ppAction": "SKIP|UPDATE|INSERT",
        "familyEmail": "jessikazmuda@gmail.com",
        "ppFirst": "Jessika"
    },
    "student": {
        "member": "SKIP",
        "contact": "UPDATE",
        "dataBase": "INSERT",
        "stAction": "SKIP|UPDATE|INSERT",
        "studentEmail": "steamdiscoveryacademy+grayson2297@gmail.com",
        "stFirst": "Grayson",
        "stPreferredFirst": "Grayson",
        "stLast": "Bottiani"
    },
    "secondary": {
        "member": "NA",
        "contact": "INSERT",
        "dataBase": "INSERT",
        "spAction": "NA|INSERT|INSERT",
        "secondaryEmail": "eempty",
        "spFirst": "James",
        "spLast": "Wilkinson"
    },
    "termId": "202106",
    "familySeed": "PENDING"
}
// action = actionObjectBottianiGraysonTEST
    // ø </APPLY TEST OBJECT>

    // let responseString = `session.getItem('ppAction'): ${session.getItem('ppAction')}\n`;
    // responseString += `session.getItem('stAction'): ${session.getItem('stAction')}\n`;
    // responseString += `session.getItem('spAction'): ${session.getItem('spAction')}`;
    // $w('#secondaryResponseTXTBX').value = responseString


    // let origIdArray = ['#OppMemberBTN','#OppContactBTN','#OppDbaseBTN','#OstMemberBTN','#OstContactBTN','#OstDbaseBTN','#OspMemberBTN','#OspContactBTN','#OspDbaseBTN']
    let newIdArray = ['#NppMemberBTN','#NppContactBTN','#NppDbaseBTN','#NstMemberBTN','#NstContactBTN','#NstDbaseBTN','#NspMemberBTN','#NspContactBTN','#NspDbaseBTN']

    console.log(`newIdArray:`)
    console.dir(newIdArray)
    let newValuePipedArray = action.primary.ppAction + '|' + action.student.stAction + '|' + action.secondary.spAction
    console.log(`newValuePipedArray: ${newValuePipedArray}`)
    let newValueArray = newValuePipedArray.split('|')
    console.log(`newValueArray:`)
    console.dir(newValueArray)
    let buttonId = '';
    for (let index = 0; index < newIdArray.length; index++) {
        buttonId = newIdArray[index];
        if (typeof newValueArray[index] === 'string' && newValueArray[index] !== 'null') {
            console.log(`$w(${buttonId}).label = origValueArray[${index}] =>`)
            console.log(`${$w(buttonId).label} = ${newValueArray[index]}`)
            $w(buttonId).label = newValueArray[index]
        }
    }
}
// ! ===================================               </Harvested from contactDevel.js>               ===================================

// ø 202110_Enhanced_BackEnd_ActionValueEvaluation-END
// ! ======================================================================================================================================
// ! ======================================== </Enhanced Back-End Action-Value-Evaluation TESTING> ========================================
// ! ======================================================================================================================================

export async function overallManyButtonsByManyDropDowns(paramObject = {ddValue: "NNULL",response: {string:'STRING'},done: false, messaging: {}}){
     // 202109_Developer
     console.groupCollapsed('overallManyButtonsByManyDropDowns')
     let responseBlockId = '#txareaDevelResponseBlock';
     paramObject.response.blockId = responseBlockId;
    // ø <Overall On-Ramp>
    if(paramObject.ddValue === 'CLEAR'){
        console.dir(paramObject);
        doClear(responseBlockId);
        paramObject.done = true;
        paramObject.response.string = '';
    }
    if(paramObject.ddValue === 'PARSE_JSON'){
        console.dir(paramObject);
        let responseObject = JSON.parse($w(responseBlockId).value);
        let responseJSON = JSON.stringify(responseObject,undefined,4);
        // $w(responseBlockId).value = responseJSON;
        // wixWindow.copyToClipboard(responseJSON)
        paramObject.done = true;
        paramObject.response.string = responseJSON;
    }
    // ø </Overall On-Ramp>
    // ø <ManyButtonsByManyDropDowns>
    if (!paramObject.done) {
        await manyButtonsDropDownO1(paramObject);
    }
    if (!paramObject.done) {
        await manyButtonsDropDownO2(paramObject);
    }
    if (!paramObject.done) {
        await manyButtonsDropDownO3(paramObject);
    }
    // ø </ManyButtonsByManyDropDowns>

    // ø <Overall Off-Ramp>
    if (!paramObject.done) {
        paramObject.messaging.danger = `Un-Caught Drop-Down Value: '${paramObject.ddValue}'`
        paramObject.response.string = `Un-Caught Drop-Down Value: '${paramObject.ddValue}'`
    }
    $w(responseBlockId).value = paramObject.response.string;
    wixWindow.copyToClipboard(paramObject.response.string)
        .then(() => {
            // handle case where text was copied
        })
        .catch((err) => {
            // handle case where an error occurred
        });
    // ø </Overall Off-Ramp>
    console.groupEnd();
    return;//MOOT, but for clarity
}
export async function manyButtonsDropDownO1(paramObject = {ddValue: "NNULL",response: {string:'STRING'},done: false, messaging: {}}){
    // 202109_Developer
    console.dir(paramObject);
    console.groupCollapsed('manyButtonsDropDownO1')
    let DOX = 'engenderingProximateDevelButtons'
    let thisDropDownElementId = '#ddManyButtons01';
    paramObject.ddValue = $w(thisDropDownElementId).value
    console.log(`paramObject.ddValue: ${paramObject.ddValue}`)
    let thisDropDownOptionArray = $w(thisDropDownElementId).options;
    // $w("#myDropdown").options = [
    //     {"label": "Who's on first!", "value": "first"},
    //     {"label": "What's on second", "value": "second"},
    //     {"label": "I Don't Know is on third", "value": "third"}
    // ];

    let thisDropDownValueArray = thisDropDownOptionArray.map(element => element.value);;
    console.dir(thisDropDownValueArray)
    // thisDropDownValueArray = ['enrollmentStepCompletedListAll','TGGL_CMPLTD_STEPS','stepLogString','stepResponseBootstrapKey','stepMessagingJSON','LAST_NEXT_STATES','STEP_LOGS_TOGGLE'];
    if(thisDropDownValueArray.includes(paramObject.ddValue) === false){
        console.groupEnd()
        return;
    }
    // ø <ManyButtonDropDow-ProcessValue>
    let value = paramObject.ddValue
    console.log(`value: ${value}`)
    let done = false;
    let responseString = 'NNULL'
    let tempMatchArray = [];

    if(!done){
    // ø ø <localStorage SimpleAssignment>
    tempMatchArray = ['enrollmentStepCompletedListAll','stepMessagingJSON']
    if(tempMatchArray.includes(value)){
        value = value.substr(0,6) === 'local.' ? value.substr(6) : value;
        responseString = local.getItem(value);
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    // ø ø </localStorage SimpleAssignment>
    }
        
    if(!done){}
    // ø ø <sessionStorage SimpleAssignment>
    // ø ø </sessionStorage SimpleAssignment>
    if(!done){
        // ø ø <memoryStorage SimpleAssignment>
        tempMatchArray = ['stepLogString','stepResponseBootstrapKey']
        if(tempMatchArray.includes(value)){
            value = value.substr(0,7) === 'memory.' ? value.substr(7) : value;
            responseString = memory.getItem(value);
            done = true;
            paramObject.done = done;
            paramObject.response.string = responseString;
        }
        // ø ø </memoryStorage SimpleAssignment>
    }
    if(!done){
        // ø ø <Ternary SimpleAssignment>
        responseString = value === 'ZXZ' ? 'ZXZ' : responseString;
        responseString = value === 'LAST_NEXT_STATES' ? `memory.getItem('msboxLastState'): ${memory.getItem('msboxLastState')};\nmemory.getItem('msboxNextStateId'): ${memory.getItem('msboxNextStateId')}` : responseString;
        done = responseString === 'NNULL' ? done : true;
        if(done){
            paramObject.done = done;
            paramObject.response.string = responseString;
        }
        // ø ø </Ternary SimpleAssignment>
    }
    if(!done){}
    // ø ø <COMPLEX Logic Blocks>
    if (value === 'ZXZ') {
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'STEP_LOGS_TOGGLE') {
        let current = ($w(paramObject.response.blockId).value).length === 0 ? 'stepLogStringToggle is EMPTY' : $w(paramObject.response.blockId).value;
        let stepLogString = memory.getItem('stepLogString') === null || (memory.getItem('stepLogString')).length === 0 ? 'stepLogString is EMPTY' : memory.getItem('stepLogString'); 
        let stepLogStringSecondary = memory.getItem('stepLogStringSecondary') === null || (memory.getItem('stepLogStringSecondary')).length === 0 ? 'stepLogStringSecondary is EMPTY' : memory.getItem('stepLogStringSecondary');
        // let next = current === stepLogStringSecondary ? 'stepLogString' : 'stepLogStringSecondary';
        let next = current === stepLogStringSecondary ? 'A' : 'B';
        // next = current === stepLogString ? 'stepLogStringSecondary' : next;
        next = current === stepLogString ? 'B' : next;
        next = next === 'A' ? stepLogString : stepLogStringSecondary;

        responseString = next;
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'TGGL_CMPLTD_STEPS') {
        let current = local.getItem('enrollmentStepCompletedListAll');
        let tempLastCompleted_b4DeDupe = 'OnReadyReset,ZERO,IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember'; 
        let tempLastCompleted_b4PpStContactsAndDatabase = 'OnReadyReset,ZERO,IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,OnReadyResetContinue,dedupePpStContact'; 
        let tempLastCompleted_b4DeDupe_ActiveOnly = 'PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,OnReadyResetContinue'; 
        // ø <Logic for First and Continuing>
        let next = 'tempLastCompleted_b4DeDupe';
        next = current === tempLastCompleted_b4DeDupe ? 'tempLastCompleted_b4PpStContactsAndDatabase' : next;
        next = current === tempLastCompleted_b4PpStContactsAndDatabase ? 'tempLastCompleted_b4DeDupe_ActiveOnly' : next;
        // ø </Logic for First and Continuing>
        let tempLastCompleted = eval(next);
        local.setItem('enrollmentStepCompletedListAll',tempLastCompleted);
        responseString = local.getItem('enrollmentStepCompletedListAll');
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    // ø ø </COMPLEX Logic Blocks>
    // ø </ManyButtonDropDow-ProcessValue>
    console.groupEnd()
}
export async function manyButtonsDropDownO2(paramObject = {ddValue: "NNULL",response: {string:'STRING'},done: false, messaging: {}}){
    // 202109_Developer
    console.dir(paramObject);
    console.groupCollapsed('manyButtonsDropDownO2')
    let DOX = 'engenderingProximateDevelButtons'
    let thisDropDownElementId = '#ddManyButtons02';
    paramObject.ddValue = $w(thisDropDownElementId).value
    console.log(`paramObject.ddValue: ${paramObject.ddValue}`)
    let thisDropDownOptionArray = $w(thisDropDownElementId).options;

    let thisDropDownValueArray = thisDropDownOptionArray.map(element => element.value);;
    console.dir(thisDropDownValueArray)
    // thisDropDownValueArray = ['enrollmentStepCompletedListAll','TGGL_CMPLTD_STEPS','stepLogString','stepResponseBootstrapKey','stepMessagingJSON','LAST_NEXT_STATES','STEP_LOGS_TOGGLE'];
    if(thisDropDownValueArray.includes(paramObject.ddValue) === false){
        console.groupEnd()
        return;
    }
    // ø <ManyButtonDropDow-ProcessValue>
    let value = paramObject.ddValue
    console.log(`value: ${value}`)
    let done = false;
    let responseString = 'NNULL'
    let tempMatchArray = [];

    if(!done){
    // ø ø <localStorage SimpleAssignment>
    tempMatchArray = ['local.lastParamObject','local.lastResponseObject']
    if(tempMatchArray.includes(value)){
        let DOX = '<TESTING>'; 
        DOX = 'lastParamObject_20210916';
        local.setItem('lastParamObject', DOX) 
        DOX = 'lastResponseObject_20210916';
        local.setItem('lastResponseObject', DOX) 
        DOX = '</TESTING>'; 
        value = value.substr(0,6) === 'local.' ? value.substr(6) : value;
        responseString = local.getItem(value);
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    // ø ø </localStorage SimpleAssignment>
    }
        
    if(!done){}
    // ø ø <sessionStorage SimpleAssignment>
    // ø ø </sessionStorage SimpleAssignment>
    if(!done){
        // ø ø <memoryStorage SimpleAssignment>
        tempMatchArray = ['ZZZstepLogString','ZZZstepResponseBootstrapKey']
        if(tempMatchArray.includes(value)){
            value = value.substr(0,7) === 'memory.' ? value.substr(7) : value;
            responseString = memory.getItem(value);
            done = true;
            paramObject.done = done;
            paramObject.response.string = responseString;
        }
        // ø ø </memoryStorage SimpleAssignment>
    }
    if(!done){
        // ø ø <Ternary SimpleAssignment>
        responseString = value === 'ZXZ' ? 'ZXZ' : responseString;
        responseString = value === 'ZZZLAST_NEXT_STATES' ? `memory.getItem('msboxLastState'): ${memory.getItem('msboxLastState')};\nmemory.getItem('msboxNextStateId'): ${memory.getItem('msboxNextStateId')}` : responseString;
        done = responseString === 'NNULL' ? done : true;
        if(done){
            paramObject.done = done;
            paramObject.response.string = responseString;
        }
        // ø ø </Ternary SimpleAssignment>
    }
    if(!done){}
    // ø ø <COMPLEX Logic Blocks>
    // 202109_dd02_COMPLEX
    if (value === 'ZXZ') {
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'doUserInterfaceCleanupCurrent') {
        doUserInterfaceCleanupCurrent()
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'ExtraContactPrimary') {
        let paramObjectPrimary = {};
        paramObjectPrimary.emailToFind = local.getItem('familyEmail');
        paramObjectPrimary.notIdToFind = local.getItem('familyId');
        paramObjectPrimary.diagnosticOnly = true;
        paramObjectPrimary.collectHumanLog = true;
        await getContactByEmailAndNotIdFunction(paramObjectPrimary);
        // ø <Maybe Later> but... too-clever-by-half
        // $w('#sessionEnrollmentJSON').value = paramObjectPrimary.logString;
        // uiCopyTextElementThis('sessionEnrollmentJSON');
        // delete paramObjectPrimary.logString;
        // local.setItem('lastResponseObject',JSON.stringify(paramObjectPrimary));
        // ø </Maybe Later>
        responseString = JSON.stringify(paramObjectPrimary);
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'ExtraContactStudent') {
        let paramObjectStudent = {};
        paramObjectStudent.emailToFind = local.getItem('studentEmail');
        paramObjectStudent.notIdToFind = local.getItem('studentId');
        paramObjectStudent.diagnosticOnly = true;
        paramObjectStudent.collectHumanLog = true;
        await getContactByEmailAndNotIdFunction(paramObjectStudent);
        // ø <Maybe Later> but... too-clever-by-half
        // $w('#sessionEnrollmentJSON').value = paramObjectStudent.logString;
        // uiCopyTextElementThis('sessionEnrollmentJSON');
        // delete paramObjectStudent.logString;
        // local.setItem('lastResponseObject',JSON.stringify(paramObjectStudent));
        // ø </Maybe Later>
        done = true;
        responseString = JSON.stringify(paramObjectStudent);
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    // ø ø </COMPLEX Logic Blocks>
    // ø </ManyButtonDropDow-ProcessValue>
    console.groupEnd()
}
export async function manyButtonsDropDownO3(paramObject = {ddValue: "NNULL",response: {string:'STRING'},done: false, messaging: {}}){
    // 202109_Developer
    console.dir(paramObject);
    console.groupCollapsed('manyButtonsDropDownO3')
    let DOX = 'engenderingProximateDevelButtons'
    let thisDropDownElementId = '#ddManyButtons03';
    paramObject.ddValue = $w(thisDropDownElementId).value
    console.log(`paramObject.ddValue: ${paramObject.ddValue}`)
    let thisDropDownOptionArray = $w(thisDropDownElementId).options;

    let thisDropDownValueArray = thisDropDownOptionArray.map(element => element.value);;
    console.dir(thisDropDownValueArray)
    // thisDropDownValueArray = ['enrollmentStepCompletedListAll','TGGL_CMPLTD_STEPS','stepLogString','stepResponseBootstrapKey','stepMessagingJSON','LAST_NEXT_STATES','STEP_LOGS_TOGGLE'];
    if(thisDropDownValueArray.includes(paramObject.ddValue) === false){
        console.groupEnd()
        return;
    }
    // ø <ManyButtonDropDow-ProcessValue>
    let value = paramObject.ddValue
    console.log(`value: ${value}`)
    let done = false;
    let responseString = 'NNULL'
    let tempMatchArray = [];

    if(!done){
    // ø ø <localStorage SimpleAssignment>
    tempMatchArray = ['local.ondeckEnrollmentJSON']
    if(tempMatchArray.includes(value)){
        value = value.substr(0,6) === 'local.' ? value.substr(6) : value;
        responseString = local.getItem(value);
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    // ø ø </localStorage SimpleAssignment>
    }
        
    if(!done){}
    // ø ø <sessionStorage SimpleAssignment>
    // ø ø </sessionStorage SimpleAssignment>
    if(!done){
        // ø ø <memoryStorage SimpleAssignment>
        tempMatchArray = ['ZZZstepLogString','ZZZstepResponseBootstrapKey']
        if(tempMatchArray.includes(value)){
            value = value.substr(0,7) === 'memory.' ? value.substr(7) : value;
            responseString = memory.getItem(value);
            done = true;
            paramObject.done = done;
            paramObject.response.string = responseString;
        }
        // ø ø </memoryStorage SimpleAssignment>
    }
    if(!done){
        // ø ø <Ternary SimpleAssignment>
        responseString = value === 'ZXZ' ? 'ZXZ' : responseString;
        responseString = value === 'ZZZLAST_NEXT_STATES' ? `memory.getItem('msboxLastState'): ${memory.getItem('msboxLastState')};\nmemory.getItem('msboxNextStateId'): ${memory.getItem('msboxNextStateId')}` : responseString;
        done = responseString === 'NNULL' ? done : true;
        if(done){
            paramObject.done = done;
            paramObject.response.string = responseString;
        }
        // ø ø </Ternary SimpleAssignment>
    }
    if(!done){}
    // ø ø <COMPLEX Logic Blocks>
    if (value === 'ZXZ') {
        responseString = 'HOLDER FOR: ZXZ';
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }    
    if (value === 'doCleanUpAllExceptEnrJSON') {
        responseString = 'HOLDER FOR: doCleanUpAllExceptEnrJSON';
        local.setItem('logString','')
        let responseCleanupCurrentState = doEnrollmentCleanupByKind('ALL_EXCEPT_ENROLLMENT');
        responseString = local.getItem(('logString'));

        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }    
    if (value === 'doCleanUpAllIncludingnrJSON') {
        responseString = 'HOLDER FOR: doCleanUpAllIncludingnrJSON';
        responseString = "'Next Enrollment' rquires that the current Webhook Payload have a status of 'Resolved'";
        local.setItem('logString','')
        if($w(paramObject.response.blockId).value === 'BACKDOORROODKCAB'){
            local.setItem('logString','BACKDOORROODKCAB')
            let responseCleanupCurrentState = doEnrollmentCleanupByKind('ALL_INCLUDING_ENROLLMENT');//HINT: backdoor: MURDERREDRUM
            responseString = local.getItem(('logString'));;
        }

        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }    
    if (value === 'doPpStContactDedupeDiagnosis') {
        responseString = 'HOLDER FOR: doPpStContactDedupeDiagnosis';
        local.setItem('logString','PP ST Contact De-Dupe DDiagnosis')
        let paramObjectThis = {};
        paramObjectThis.diagnosticOnly = true;
        ppStContactDedupe(paramObjectThis);
        let log = local.getItem('logString');
        let cowCatcherIndex = 0;
        while (log.indexOf(',') >= 0 && cowCatcherIndex < 1000) {
            log = log.replace(',','|\n');
            cowCatcherIndex++;
        }
        // $w('#sessionEnrollmentJSON').value = log + '\n\n' + cowCatcherIndex.toString();
        responseString = log + '\n\n' + cowCatcherIndex.toString();

        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }    
    if (value === 'doGetWebhookPayload') {
        updateStatusWebhookPayloadThis(true);
        if((local.getItem('lastResponseObject')).length === 0){
            local.setItem('lastResponseObject',`wixWebhookStatus: ${local.getItem('wixWebhookStatus')}`); 
        }
        // $w('#txareaDevelResponseBlock').value = local.getItem('lastResponseObject'); 
        responseString = local.getItem('lastResponseObject');
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'doGetWebhookStatuses') {
        let responseObject = {};
        let wixWebhookStatus = typeof local.getItem('wixWebhookStatus') === 'string' ? local.getItem('wixWebhookStatus') : 'NNULL';
        let webhookThisStatus = typeof local.getItem('webhookThisStatus') === 'string' ? local.getItem('webhookThisStatus') : 'NNULL';;
        let webhookThisResolved = typeof local.getItem('webhookThisResolved') === 'string' ? local.getItem('webhookThisResolved') : 'NNULL';;
        responseObject.wixWebhookStatus = wixWebhookStatus;
        responseObject.webhookThisStatus = webhookThisStatus;
        responseObject.webhookThisResolved = webhookThisResolved;
        // $w('#sessionEnrollmentJSON').value = JSON.stringify(responseObject,undefined,4)
        responseString = JSON.stringify(responseObject);
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'SESSION_ACTION_VALUES') {
        // let DOX = ''
        // local.setItem("ondeckEnrollmentJSON",DOX);
        // local.setItem('wixWebhookId',DOX);
        // local.setItem('wixWebhookStatus',DOX);
        responseString = `session.getItem('ppAction'): ${session.getItem('ppAction')}\n`;
        responseString += `session.getItem('stAction'): ${session.getItem('stAction')}\n`;
        responseString += `session.getItem('spAction'): ${session.getItem('spAction')}`;
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    if (value === 'doUnloadSafelyDD03') {
        let DOX = ''
        local.setItem("ondeckEnrollmentJSON",DOX);
        local.setItem('wixWebhookId',DOX);
        local.setItem('wixWebhookStatus',DOX);
        responseString = `Enrollment has been Unloaded Safely, with no change to the Application Webbook
        ...you may return to Process this Application again (or any other)`;
        done = true;
        paramObject.done = done;
        paramObject.response.string = responseString;
    }
    // ø ø </COMPLEX Logic Blocks>
    // ø </ManyButtonDropDow-ProcessValue>
    console.groupEnd()
}
// ! ========================================================================================================================
// ! ==============================               </DEVELOPER ONLY MultiStateBox>              ==============================
// ! ========================================================================================================================

// ø <=================================================================================================>
// ø <======================================== <Just Buttons>  ========================================>
// ø <============ WiX Editor places thenm here • Should only be Calling-UI-Input Non-Code ============>
// ø <====================         Standard BTN Handling as of October 2021        ====================>
// ø <=================================================================================================>
export async function multiplyFamilyPersonObjectBTN_click(event) {
	// $w('#multiplyResponseTXAREA').value = `Multiply for familyPersonObject.jsw`
	// $w('#multiplyResponseTXAREA').value = `Multiply for familyPersonObject.jsw: '${$w("#operand1").value} x ${$w("#operand2").value}'`
    // return
    let uniquePipedString = await multiplyFor_familyPersonsObject($w("#operand1").value, $w("#operand2").value)
	let responseStringArray = uniquePipedString.split('|')
	// let product = await multiply($w("#operand1").value, $w("#operand2").value)
	let product = responseStringArray[1]
	$w("#product").value = product;
	let responseStringFinal = typeof session.getItem('lastMultiplyJSON') !== 'string' || (session.getItem('lastMultiplyJSON')).length < 10 ? `Invalid session.getItem('lastMultiplyJSON')` : session.getItem('lastMultiplyJSON');
	responseStringFinal = `\n==========\n` + responseStringFinal
	responseStringFinal = responseStringArray[0] + responseStringFinal
	$w("#multiplyResponseTXAREA").value = responseStringFinal
}

// ø <=================================================================================================>
// ø <======================================== </Just Buttons> ========================================>
// ø <=================================================================================================>

