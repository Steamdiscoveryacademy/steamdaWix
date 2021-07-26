// ø <---------- <mxboxPstEnrSeven_soupToNuts>  ---------->
// ø FIND pstEnrSevenCore202107 SOUP_TO_NUTS

// ø <---------- <mxboxPostEnrollmentSevenActionScripts>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT-ALL

// ø <---------- <mxboxPostEnrollmentSevenActionOnReady - [within $w.onReady(function ())]>  ---------->
// ø FIND pstEnrSevenCore202107 ACTION_SCRIPT
export async function mxboxPostEnrollmentSevenActionOnReady(anyButtonLog = '{# no button log #}'){
    let responseObject = {};
    responseObject.TEST = true;
    responseObject.logArrayUserInterface = [];
    responseObject.logArrayDeveloper = [];
    responseObject.logArrayDeveloper.push(anyButtonLog);
    responseObject.button = 'NEXT';
    responseObject.messageKey = 'primary';
    memory.setItem('msboxLastState','stateZero')
    responseObject.logArrayDeveloper.push('{# responseObject.button = NEXT #}');
    responseObject.logArrayDeveloper.push('{# memory.setItem(msboxLastState,stateZero) #}');
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
    responseObject.logArrayDeveloper.push('≈ 3761 ≈');
    responseObject.logArrayDeveloper.push(responseObject.stamp);
    responseObject.logArrayDeveloper.push('entering {% mxboxPostEnrollmentSevenAnyAction %}');

    let DOX = 'JUST FOR VISIBLE DOX IN WIX'

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
        responseObject.logArrayDeveloper.push('≈ 3786 ≈');
        responseObject.logArrayDeveloper.push('<'+responseObject.button + ' === PPENDING>');
        panelNotesKey = 'panelAfterStepNotes';
        // ! <from PERFORM CURRENT STEP>
        $w('#btnPeSevenNext').show();
        $w('#btnPeSevenCurrent').hide();
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
        responseObject.logArrayDeveloper.push('≈ 3805 ≈');
        responseObject.logArrayDeveloper.push('<'+responseObject.button + ' === NEXT>');
        panelNotesKey = 'panelBeforeStepNotes';
        // ! <from GO TO NEXT>
        responseObject.logArrayDeveloper.push('<preTrash Logs>');
        responseObject.logArrayDeveloper.push('≈ 3810 ≈');
        responseObject.logArrayDeveloper.push('{# about to call goToState(responseObject) #}');
        await goToState(responseObject);
        let lastLogDeveloper = responseObject.logArrayDeveloper[responseObject.logArrayDeveloper.length - 1];
        responseObject.logArrayDeveloper.push('∆ lastLogDeveloper: ' + lastLogDeveloper + ' ∆}');
        responseObject.logArrayDeveloper.push('</preTrash Logs>');
        $w('#btnPeSevenNext').hide();
        $w('#btnPeSevenCurrent').show();
        // ! </from GO TO NEXT>
        responseObject.logArrayDeveloper.push('≈ 3819 ≈');
        let peSevenStateCurrent = $w(memory.getItem('msboxCurrentId')).currentState;
        peSevenStateCurrentId = peSevenStateCurrent.id;
        responseObject.logArrayDeveloper.push('{¿ '+peSevenStateCurrentId+' is valid by wixStorage ?}');

        // ø <ONCE for 'stateZero'>
        if(memory.getItem('msboxLastState') === 'stateZero'){
        // ! OnRamp <Kludge>
        // ! shouldn't be _in_ OnReady, but these things are so necessary as suigeneris tasks
        // ! if (when?) it gets too involved, make an mxboxPostEnrollmentSevenOnReadyKLUDGE() function
        responseObject.logArrayDeveloper.push('≈ 3829 ≈');
        responseObject.logArrayDeveloper.push('{% onReadyKLUDGE %}}');

        let applicationObject = JSON.parse(local.getItem('ondeckEnrollmentJSON')) ;
        let staffEyeD = applicationObject.family.parent.primary.memberId;
        let secondaryExists = typeof applicationObject.family.parent.secondary === 'object' && typeof applicationObject.family.parent.secondary.first === 'string' && (applicationObject.family.parent.secondary.first).length > 0 ? true : false;
        responseObject.logArrayDeveloper.push(`secondaryExists: ${secondaryExists}`);
        let theseObjectKeys = Object.keys(applicationObject.family.parent);
        if(!secondaryExists){
            responseObject.logArrayDeveloper.push('!secondaryExists : disable buttons');
            responseObject.logArrayDeveloper.push('{¿ ONCE for `stateZero` yes?: ' + memory.getItem('msboxLastState') + ' ?}');
            $w('#btnSecondaryIdLabel').disable();
        }
        if(staffEyeD === 'INSTANTIATE' || staffEyeD === 'IINSTANTIATE'){
            responseObject.logArrayDeveloper.push('staffEyeD is IINSTANTIATE: hide-buttons');
            responseObject.logArrayDeveloper.push('{¿ ONCE for `stateZero` yes?: ' + memory.getItem('msboxLastState') + ' ?}');
            $w('#btnStaffEyeD').hide();
            $w('#btnStaffEyeDLabel').hide();
        }else{
            responseObject.logArrayDeveloper.push('staffEyeD is not IINSTANTIATE: enable-buttons');
            responseObject.logArrayDeveloper.push('{¿ ONCE for `stateZero` yes?: ' + memory.getItem('msboxLastState') + ' ?}');
            local.setItem('staffIdentifiedFamilyId',staffEyeD);
            $w("#btnStaffEyeD").label = local.getItem('staffIdentifiedFamilyId');
            $w('#btnStaffEyeD').enable();
            $w('#btnStaffEyeDLabel').enable();
        }
        // ! OnRamp </Kludge>
        }
        // ø </ONCE for 'stateZero'>
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
    // let peSeventJSON = /*[20210721114500ø]*/ `{"errorStringArray":[],"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"confirmState":"stateOnramp","allStepArray":["VALIDATE_staffEyeD"],"notes":["otherise taken care of by onReady()"],"firstStep":"VALIDATE_staffEyeD","lastStep":"VALIDATE_staffEyeD"},"wixStorageArray":["kind.key"]},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"confirmState":"stateInstantiate","allStepArray":["IINSTANTIATE"],"notes":["may need to manually confirm Staff-Eye-D Member if automatic is not conclusive"],"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE"},"wixStorageArray":["kind.key"]},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"confirmState":"stateMemberConfirm","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[],"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember"},"wixStorageArray":["kind.key"]},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"confirmState":"stateDupeDelete","allStepArray":["dedupePpStContact"],"notes":[],"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact"},"wixStorageArray":["kind.key"]},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"confirmState":"stateDatabaseForPrimaryAndStudent","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[],"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"confirmState":"stateContactForPrimaryAndStudent","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[],"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"confirmState":"stateContactAndDatabaseForSecondary","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[],"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase"},"wixStorageArray":["kind.key"]},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"confirmState":"stateResolveAndDestroy","allStepArray":["EEMPTY"],"notes":["ouside of Loop-Switch execute ¿Resolve WebHook?","ouside of Loop-Switch execute ¿Destroy? wixStorage"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp","origSteps":{"confirmState":"stateOfframp","allStepArray":["EEMPTY"],"notes":["return to ¿Process Web Hooks?"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for stateOnramp","devel":"The devel message for stateOnramp","danger":"The danger message for stateOnramp","warning":"The warning message for stateOnramp","success":"The success message for stateOnramp","info":"The info message for stateOnramp"},"stateInstantiate":{"primary":"The primary message for stateInstantiate","devel":"The devel message for stateInstantiate","danger":"The danger message for stateInstantiate","warning":"The warning message for stateInstantiate","success":"The success message for stateInstantiate","info":"The info message for stateInstantiate"},"stateMemberConfirm":{"primary":"The primary message for stateMemberConfirm","devel":"The devel message for stateMemberConfirm","danger":"The danger message for stateMemberConfirm","warning":"The warning message for stateMemberConfirm","success":"The success message for stateMemberConfirm","info":"The info message for stateMemberConfirm"},"stateDupeDelete":{"primary":"The primary message for stateDupeDelete","devel":"The devel message for stateDupeDelete","danger":"The danger message for stateDupeDelete","warning":"The warning message for stateDupeDelete","success":"The success message for stateDupeDelete","info":"The info message for stateDupeDelete"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for stateDatabaseForPrimaryAndStudent","devel":"The devel message for stateDatabaseForPrimaryAndStudent","danger":"The danger message for stateDatabaseForPrimaryAndStudent","warning":"The warning message for stateDatabaseForPrimaryAndStudent","success":"The success message for stateDatabaseForPrimaryAndStudent","info":"The info message for stateDatabaseForPrimaryAndStudent"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for stateContactForPrimaryAndStudent","devel":"The devel message for stateContactForPrimaryAndStudent","danger":"The danger message for stateContactForPrimaryAndStudent","warning":"The warning message for stateContactForPrimaryAndStudent","success":"The success message for stateContactForPrimaryAndStudent","info":"The info message for stateContactForPrimaryAndStudent"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for stateContactAndDatabaseForSecondary","devel":"The devel message for stateContactAndDatabaseForSecondary","danger":"The danger message for stateContactAndDatabaseForSecondary","warning":"The warning message for stateContactAndDatabaseForSecondary","success":"The success message for stateContactAndDatabaseForSecondary","info":"The info message for stateContactAndDatabaseForSecondary"},"stateResolveAndDestroy":{"primary":"The primary message for stateResolveAndDestroy","devel":"The devel message for stateResolveAndDestroy","danger":"The danger message for stateResolveAndDestroy","warning":"The warning message for stateResolveAndDestroy","success":"The success message for stateResolveAndDestroy","info":"The info message for stateResolveAndDestroy"},"stateOfframp":{"primary":"The primary message for stateOfframp","devel":"The devel message for stateOfframp","danger":"The danger message for stateOfframp","warning":"The warning message for stateOfframp","success":"The success message for stateOfframp","info":"The info message for stateOfframp"}}}`;
    let peSeventJSON = /*[20210721131500◊]*/ `{"errorStringArray":[],"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"confirmState":"stateOnramp","allStepArray":["VALIDATE_staffEyeD"],"notes":["otherise taken care of by onReady()"],"panelBeforeStepNotes":["Tell them what you are going to do","including about Staff-Eye-D"],"panelAfterStepNotes":["Tell them you did it","messaging about Staff-Eye-D results"],"firstStep":"VALIDATE_staffEyeD","lastStep":"VALIDATE_staffEyeD"},"wixStorageArray":["kind.key"]},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"confirmState":"stateInstantiate","allStepArray":["IINSTANTIATE"],"notes":["may need to manually confirm Staff-Eye-D Member if automatic is not conclusive"],"panelBeforeStepNotes":["Tell them what you are going to do","IFF Staff-Eye-D Confirmation Input"],"panelAfterStepNotes":["Tell them you did it","superEnrollmentStatus","ppAction","stAction","spAction"],"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE"},"wixStorageArray":["kind.key"]},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"confirmState":"stateMemberConfirm","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember"},"wixStorageArray":["kind.key"]},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"confirmState":"stateDupeDelete","allStepArray":["dedupePpStContact"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact"},"wixStorageArray":["kind.key"]},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"confirmState":"stateDatabaseForPrimaryAndStudent","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"confirmState":"stateContactForPrimaryAndStudent","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase"},"wixStorageArray":["kind.key"]},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"confirmState":"stateContactAndDatabaseForSecondary","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase"},"wixStorageArray":["kind.key"]},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"confirmState":"stateResolveAndDestroy","allStepArray":["EEMPTY"],"notes":["ouside of Loop-Switch execute ¿Resolve WebHook?","ouside of Loop-Switch execute ¿Destroy? wixStorage"],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp","origSteps":{"confirmState":"stateOfframp","allStepArray":["EEMPTY"],"notes":["return to ¿Process Web Hooks?"],"panelBeforeStepNotes":["Tell them what you are going to do"],"panelAfterStepNotes":["Tell them you did it"],"firstStep":"EEMPTY","lastStep":"EEMPTY"},"wixStorageArray":["kind.key"]}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for stateOnramp","devel":"The devel message for stateOnramp","danger":"The danger message for stateOnramp","warning":"The warning message for stateOnramp","success":"The success message for stateOnramp","info":"The info message for stateOnramp"},"stateInstantiate":{"primary":"The primary message for stateInstantiate","devel":"The devel message for stateInstantiate","danger":"The danger message for stateInstantiate","warning":"The warning message for stateInstantiate","success":"The success message for stateInstantiate","info":"The info message for stateInstantiate"},"stateMemberConfirm":{"primary":"The primary message for stateMemberConfirm","devel":"The devel message for stateMemberConfirm","danger":"The danger message for stateMemberConfirm","warning":"The warning message for stateMemberConfirm","success":"The success message for stateMemberConfirm","info":"The info message for stateMemberConfirm"},"stateDupeDelete":{"primary":"The primary message for stateDupeDelete","devel":"The devel message for stateDupeDelete","danger":"The danger message for stateDupeDelete","warning":"The warning message for stateDupeDelete","success":"The success message for stateDupeDelete","info":"The info message for stateDupeDelete"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for stateDatabaseForPrimaryAndStudent","devel":"The devel message for stateDatabaseForPrimaryAndStudent","danger":"The danger message for stateDatabaseForPrimaryAndStudent","warning":"The warning message for stateDatabaseForPrimaryAndStudent","success":"The success message for stateDatabaseForPrimaryAndStudent","info":"The info message for stateDatabaseForPrimaryAndStudent"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for stateContactForPrimaryAndStudent","devel":"The devel message for stateContactForPrimaryAndStudent","danger":"The danger message for stateContactForPrimaryAndStudent","warning":"The warning message for stateContactForPrimaryAndStudent","success":"The success message for stateContactForPrimaryAndStudent","info":"The info message for stateContactForPrimaryAndStudent"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for stateContactAndDatabaseForSecondary","devel":"The devel message for stateContactAndDatabaseForSecondary","danger":"The danger message for stateContactAndDatabaseForSecondary","warning":"The warning message for stateContactAndDatabaseForSecondary","success":"The success message for stateContactAndDatabaseForSecondary","info":"The info message for stateContactAndDatabaseForSecondary"},"stateResolveAndDestroy":{"primary":"The primary message for stateResolveAndDestroy","devel":"The devel message for stateResolveAndDestroy","danger":"The danger message for stateResolveAndDestroy","warning":"The warning message for stateResolveAndDestroy","success":"The success message for stateResolveAndDestroy","info":"The info message for stateResolveAndDestroy"},"stateOfframp":{"primary":"The primary message for stateOfframp","devel":"The devel message for stateOfframp","danger":"The danger message for stateOfframp","warning":"The warning message for stateOfframp","success":"The success message for stateOfframp","info":"The info message for stateOfframp"}}}`;
    // PENDING /*[20210721HHII00◊]*/
    // ø FIND pstEnrSevenCore202107 JSON-PARSE
    let peSeventObject = JSON.parse(peSeventJSON);
    $w('#preTrashLog').value = JSON.stringify(peSeventObject,undefined,4);
    // ø </original from $w("#mxboxPostEnrollmentSeven").onChange>

    $w('#ppMemberResponseJSON').value = responseObject.button + '\n' + peSevenStateCurrentId;
    // ø <original from $w("#mxboxPostEnrollmentSeven").onChange>
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
    
    responseObject.logArrayDeveloper.push('≈ 3918 ≈');
    responseObject.logArrayDeveloper.push(memory.getItem('msboxLastState') + ' === ' + peSevenStateCurrentId);
    let lastClicked = memory.getItem('msboxLastState') === peSevenStateCurrentId ? 'PERFORM_STEP' : 'NEXT_STATE';
    responseObject.logArrayDeveloper.push('∆ ' + lastClicked + ' ∆');
    
    messageKey = 'primary';
    let messageThis = currentStepMessagingObject[messageKey];
    html = doBootstrapMessage(messageKey,messageThis);
    $w('#txtBootstrapPrimary').html = html;

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
    // ! <Call 'PERFORM' Sequence>
    if(lastClicked === 'PERFORM_STEP'){
        responseObject.logArrayDeveloper.push('◊ lastClicked === PERFORM_STEP ◊');
        responseObject.currentStepOriginalStepsArray = currentStepOrigStepsObject.allStepArray;
        await mxboxPostEnrollmentSevenPerformStepUI(responseObject);
    }
    // ! </Call 'PERFORM' Sequence>
    // ! <Call 'NEXT' Sequence>
    if(lastClicked === 'NEXT_STATE'){
        responseObject.logArrayDeveloper.push('◊ lastClicked === NEXT_STATE ◊');
        await mxboxPostEnrollmentSevenNextStateUI(responseObject);
    }
    // ! </Call 'NEXT' Sequence>
    // ! <NUTS! This really is the End of the Sequence>
    responseObject.logArrayDeveloper.push('≈ 3986 ≈');
    responseObject.logArrayDeveloper.push('{# Back to ANY before posting this Log #}');
    DOX = JSON.stringify(responseObject.logArrayDeveloper,undefined,4);
    $w('#ppDatabaseResponseJSON').value = DOX;
    local.setItem('logString',DOX);
    DOX = "DON'T FORGET: local.getItem(lastErrorString)";
    DOX += '\n' + "DON'T FORGET: memory.getItem(msboxLastState)";
    DOX += '\n' + "REMOVE: memory.getItem(msboxCurrentId)";
    local.setItem('lastErrorString',DOX);
}
// ! </NUTS! This really is the End of the Sequence>
// ø FIND pstEnrSevenCore202107 END-ANY-ACTION
// ø <---------- </mxboxPostEnrollmentSevenAnyAction> ---------->


// ø <---------- <mxboxPostEnrollmentSevenNextStateUI>  ---------->
// ø FIND pstEnrSevenCore202107 NEXT_STATE_UI
export async function mxboxPostEnrollmentSevenNextStateUI(responseObject = {}){
    let DOX = 'So I can read these comments in WiX-Editor';
    DOX = 'OKAY: maybe redundant since NextState is kida all-about UI, but better separate _before_ it gets hairy than after';

    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenNextStateUI %}');
    // ø <Before DO-Script Called>
    // ø </Before DO-Script Called>
    mxboxPostEnrollmentSevenNextStateDO(responseObject);
    // ø <After DO-Script Called>
    // ø </After DO-Script Called>
}
// ø FIND pstEnrSevenCore202107 NEXT_STATE_UI_END
// ø <---------- </mxboxPostEnrollmentSevenNextStateUI> ---------->

// ø <---------- <mxboxPostEnrollmentSevenPerformStepUI>  ---------->
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_UI
export async function mxboxPostEnrollmentSevenPerformStepUI(responseObject = {}){
    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenPerformStepUI %}');
    // ø <Before DO-Script Called>
    // ø </Before DO-Script Called>
    mxboxPostEnrollmentSevenPerformStepDO(responseObject);
    // ø <After DO-Script Called>
    // ø </After DO-Script Called>
}
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_UI_END
// ø <---------- </mxboxPostEnrollmentSevenPerformStepUI> ---------->


// ø <---------- <mxboxPostEnrollmentSevenNextStateDO>  ---------->
// ø FIND pstEnrSevenCore202107 NEXT_STATE_DO
export async function mxboxPostEnrollmentSevenNextStateDO(responseObject = {}){
    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenNextStateDO %}');
    responseObject.logArrayDeveloper.push('memory.getItem(msboxLastState) === ' + memory.getItem('msboxLastState'));
    responseObject.logArrayDeveloper.push('memory.getItem(msboxCurrentId) === ' + memory.getItem('msboxCurrentId'));
}
// ø FIND pstEnrSevenCore202107 NEXT_STATE_DO_END
// ø <---------- </mxboxPostEnrollmentSevenNextStateDO> ---------->

// ø <---------- <mxboxPostEnrollmentSevenPerformStepDO>  ---------->
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_DO
export async function mxboxPostEnrollmentSevenPerformStepDO(responseObject = {}){
    responseObject.logArrayDeveloper.push('{% mxboxPostEnrollmentSevenPerformStepDO %}');
    responseObject.logArrayDeveloper.push('memory.getItem(msboxLastState) === ' + memory.getItem('msboxLastState'));
    responseObject.logArrayDeveloper.push('memory.getItem(msboxCurrentId) === ' + memory.getItem('msboxCurrentId'));
    instantiateLoopSwitchEnrollmentSteps(responseObject.currentStepOriginalStepsArray);
    displaySteps();
// ø FIND pstEnrSevenCore202107 PERFORM_STEP_DO_END
}
// ø <---------- </mxboxPostEnrollmentSevenPerformStepDO> ---------->

// ø <---------- </mxboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->

// ø FIND pstEnrSevenCore202107 SOUP_TO_NUTS-END
// ø <---------- </mxboxPstEnrSeven_soupToNuts> ---------->