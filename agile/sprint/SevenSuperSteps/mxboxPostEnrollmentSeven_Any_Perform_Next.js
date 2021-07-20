// ø <---------- <mxboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->
// ø <----------         <'mxbox' typo of 'msbox' (multi-state-box)>        ---------->
// ø <----------                 <refactor or live with it>                 ---------->


// ø <---------- <mxboxPostEnrollmentSevenAnyAction>  ---------->
export function mxboxPostEnrollmentSevenAnyAction(responseObject = {}){
    let messageKey = responseObject.messageKey;
    // ! <Pre-Trash> - even testing should come from the calling script/button
    // let messageKey = 'primary';
    // let messageKeyArray= ["success","warning","danger","info","devel"];
    // messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
    // ! </Pre-Trash>
    // ø <ELSE>
    if(responseObject.button !== 'CURRENT' && responseObject.button !== 'NEXT'){
        // try it purposefully
    }
    // ø </ELSE>
    if(responseObject.button === 'CURRENT'){
        messageKeyArray= ["success","warning","danger","info","devel"];
        messageKey = messageKeyArray[Math.floor(Math.random() * messageKeyArray.length)];
        // ! <from PERFORM CURRENT STEP>
        $w('#btnPeSevenNext').show();
        $w('#btnPeSevenCurrent').hide();
        // let id = 'abc';
        let peSevenStateCurrent = $w("#mxboxPostEnrollmentSeven").currentState;
        let peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
        if (peSevenStateCurrentId === 'stateOfframp') {
            wixLocation.to("/blank-3");
            return;
        }
        // ! </from PERFORM CURRENT STEP>
    }
    if(responseObject.button === 'NEXT'){
        // ! <from GO TO NEXT>
        goToState();
        $w('#btnPeSevenNext').hide();
        $w('#btnPeSevenCurrent').show();
        // ! </from GO TO NEXT>
    }
    //parameters will mostly be wixStorage, but responseObject can be something
    // ø <original from $w("#mxboxPostEnrollmentSeven").onChange>
    let peSeventJSON = `{"stepObjects":{"stateOnramp":{"titleKey":"onramp","title":"On-Ramp","longTitle":"JSON WORKING! Long Title for On-Ramp","stateIdThis":"stateOnramp","origSteps":{"firstStep":"ZERO","lastStep":"ZERO","allStepArray":["ZERO"],"notes":[]}},"stateInstantiate":{"titleKey":"instantiate","title":"Instantiate","longTitle":"Instantiate Enrollment","stateIdThis":"stateInstantiate","origSteps":{"firstStep":"IINSTANTIATE","lastStep":"IINSTANTIATE","allStepArray":["IINSTANTIATE"],"notes":["Reset Steps need to be manually applied (or does it?)"]}},"stateMemberConfirm":{"titleKey":"memberConfirm","title":"Member Confirm","longTitle":"Confirm Members for Primary and Student","stateIdThis":"stateMemberConfirm","origSteps":{"firstStep":"PREP_ppMember","lastStep":"EXECUTE_stMember","allStepArray":["PREP_ppMember","EXECUTE_ppMember","PREP_stMember","EXECUTE_stMember"],"notes":[]}},"stateDupeDelete":{"titleKey":"dupeDelete","title":"Dupe Delete","longTitle":"Delete any Duplicate Contacts (known bug)","stateIdThis":"stateDupeDelete","origSteps":{"firstStep":"dedupePpStContact","lastStep":"dedupePpStContact","allStepArray":["dedupePpStContact"],"notes":[]}},"stateDatabaseForPrimaryAndStudent":{"titleKey":"databaseForPrimaryAndStudent","title":"Database for Primary and Student","longTitle":"Insert Records into the Person Database for Primary and Student","stateIdThis":"stateDatabaseForPrimaryAndStudent","origSteps":{"firstStep":"PREP_ppContact","lastStep":"PREP_stDatabase","allStepArray":["PREP_ppContact","PREP_ppDatabase","PREP_stContact","PREP_stDatabase"],"notes":[]}},"stateContactForPrimaryAndStudent":{"titleKey":"contactForPrimaryAndStudent","title":"Contact for Primary and Student","longTitle":"Update Contacts for Primary & Student with Complex Enrollment Data","stateIdThis":"stateContactForPrimaryAndStudent","origSteps":{"firstStep":"PREP_spContact","lastStep":"EXECUTE_stDatabase","allStepArray":["PREP_spContact","PREP_spDatabase","EXECUTE_ppContact","EXECUTE_ppDatabase","EXECUTE_stContact","EXECUTE_stDatabase"],"notes":[]}},"stateContactAndDatabaseForSecondary":{"titleKey":"contactAndDatabaseForSecondary","title":"Contact and Database for Secondary","longTitle":"Upsert Contact and Insert Person database Record for Secondary","stateIdThis":"stateContactAndDatabaseForSecondary","origSteps":{"firstStep":"EXECUTE_spContact","lastStep":"EXECUTE_spDatabase","allStepArray":["EXECUTE_spContact","EXECUTE_spDatabase"],"notes":[]}},"stateResolveAndDestroy":{"titleKey":"resolveAndDestroy","title":"Resolve and Destroy","longTitle":"Resolve Webhook Payload and Off-Ramp the Post Enrollment Process","stateIdThis":"stateResolveAndDestroy","origSteps":{"firstStep":"CCOMPLETE","lastStep":"CCOMPLETE","allStepArray":["CCOMPLETE"],"notes":["ouside of Loop-Switch execute 'Resolve WebHook'","ouside of Loop-Switch execute 'Destroy' wixStorage"]}},"stateOfframp":{"titleKey":"offramp","title":"Off-Ramp","longTitle":"Off-Ramp to Display Completion Data before taking Next Application","stateIdThis":"stateOfframp"}},"stateIdArray":["stateOnramp","stateInstantiate","stateMemberConfirm","stateDupeDelete","stateDatabaseForPrimaryAndStudent","stateContactForPrimaryAndStudent","stateContactAndDatabaseForSecondary","stateResolveAndDestroy","stateOfframp"],"messaging":{"hex":{"primary":"#007bff","devel":"#6610f2","danger":"#dc3545","warning":"#ffc107","success":"#28a745","info":"#17a2b8"}},"stepMessaging":{"stateOnramp":{"primary":"The primary message for 'stateOnramp'","devel":"The devel message for 'stateOnramp'","danger":"The danger message for 'stateOnramp'","warning":"The warning message for 'stateOnramp'","success":"The success message for 'stateOnramp'","info":"The info message for 'stateOnramp'"},"stateInstantiate":{"primary":"The primary message for 'stateInstantiate'","devel":"The devel message for 'stateInstantiate'","danger":"The danger message for 'stateInstantiate'","warning":"The warning message for 'stateInstantiate'","success":"The success message for 'stateInstantiate'","info":"The info message for 'stateInstantiate'"},"stateMemberConfirm":{"primary":"The primary message for 'stateMemberConfirm'","devel":"The devel message for 'stateMemberConfirm'","danger":"The danger message for 'stateMemberConfirm'","warning":"The warning message for 'stateMemberConfirm'","success":"The success message for 'stateMemberConfirm'","info":"The info message for 'stateMemberConfirm'"},"stateDupeDelete":{"primary":"The primary message for 'stateDupeDelete'","devel":"The devel message for 'stateDupeDelete'","danger":"The danger message for 'stateDupeDelete'","warning":"The warning message for 'stateDupeDelete'","success":"The success message for 'stateDupeDelete'","info":"The info message for 'stateDupeDelete'"},"stateDatabaseForPrimaryAndStudent":{"primary":"The primary message for 'stateDatabaseForPrimaryAndStudent'","devel":"The devel message for 'stateDatabaseForPrimaryAndStudent'","danger":"The danger message for 'stateDatabaseForPrimaryAndStudent'","warning":"The warning message for 'stateDatabaseForPrimaryAndStudent'","success":"The success message for 'stateDatabaseForPrimaryAndStudent'","info":"The info message for 'stateDatabaseForPrimaryAndStudent'"},"stateContactForPrimaryAndStudent":{"primary":"The primary message for 'stateContactForPrimaryAndStudent'","devel":"The devel message for 'stateContactForPrimaryAndStudent'","danger":"The danger message for 'stateContactForPrimaryAndStudent'","warning":"The warning message for 'stateContactForPrimaryAndStudent'","success":"The success message for 'stateContactForPrimaryAndStudent'","info":"The info message for 'stateContactForPrimaryAndStudent'"},"stateContactAndDatabaseForSecondary":{"primary":"The primary message for 'stateContactAndDatabaseForSecondary'","devel":"The devel message for 'stateContactAndDatabaseForSecondary'","danger":"The danger message for 'stateContactAndDatabaseForSecondary'","warning":"The warning message for 'stateContactAndDatabaseForSecondary'","success":"The success message for 'stateContactAndDatabaseForSecondary'","info":"The info message for 'stateContactAndDatabaseForSecondary'"},"stateResolveAndDestroy":{"primary":"The primary message for 'stateResolveAndDestroy'","devel":"The devel message for 'stateResolveAndDestroy'","danger":"The danger message for 'stateResolveAndDestroy'","warning":"The warning message for 'stateResolveAndDestroy'","success":"The success message for 'stateResolveAndDestroy'","info":"The info message for 'stateResolveAndDestroy'"},"stateOfframp":{"primary":"The primary message for 'stateOfframp'","devel":"The devel message for 'stateOfframp'","danger":"The danger message for 'stateOfframp'","warning":"The warning message for 'stateOfframp'","success":"The success message for 'stateOfframp'","info":"The info message for 'stateOfframp'"}}}`;
    let peSeventObject = JSON.parse(peSeventJSON);
    // ! <'event.' dependent>
    // let currentState = event.target.currentState.id; // "state2"
    // ! </'event.' dependent>
    // ø </original from $w("#mxboxPostEnrollmentSeven").onChange>
    memory.setItem('msboxCurrentId','#mxboxPostEnrollmentSeven')
    let peSevenStateCurrent = $w(memory.getItem('msboxCurrentId')).currentState;
    let peSevenStateCurrentId = peSevenStateCurrent.id; // "state1"
    // ø <original from $w("#mxboxPostEnrollmentSeven").onChange>
    let currentStepObject = peSeventObject.stepObjects[currentState];
    console.log('currentStepObject: ');
    console.log(currentStepObject);
    let title = currentStepObject.longTitle;
    // let title = longTitleJSON;
    title = title.substr(0,66);
    $w('#txtPeSevenTitle').text = title;
    // ø </original from $w("#mxboxPostEnrollmentSeven").onChange>
    
    
    let lastClicked = memory.getItem('msboxLastState') === peSevenStateCurrentId ? 'PERFORM_STEP' : 'NEXT_STATE';
    memory.setItem('msboxLastState',peSevenStateCurrent);

    let html = doBootstrapMessage(messageKey);
    $w('#txtBootstrap').html = html;
	$w('#txtBootstrap').expand();

    if(lastClicked === 'PERFORM_STEP'){
        mxboxPostEnrollmentSevenPerformStep(responseObject);
    }
    if(lastClicked === 'NEXT_STATE'){
        mxboxPostEnrollmentSevenNextState(responseObject);
    }
}
// ø <---------- </mxboxPostEnrollmentSevenAnyAction> ---------->

// ø <---------- <mxboxPostEnrollmentSevenPerformStep>  ---------->
export function mxboxPostEnrollmentSevenPerformStep(responseObject = {}){
    // Deal with Response
}
// ø <---------- </mxboxPostEnrollmentSevenPerformStep> ---------->


// ø <---------- <mxboxPostEnrollmentSevenNextState>  ---------->
export function mxboxPostEnrollmentSevenNextState(responseObject = {}){
    // Display bootstrap-Primary
}
// ø <---------- </mxboxPostEnrollmentSevenNextState> ---------->
// ø <---------- </mxboxPostEnrollmentSeven AnyAction PerformStep NextState> ---------->