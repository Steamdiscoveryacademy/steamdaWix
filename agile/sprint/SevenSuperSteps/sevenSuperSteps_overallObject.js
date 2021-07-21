// ø <ACTUAL CODE>
let peSevenObject = {};
peSevenObjectBuilderOverall(peSevenObject);
console.log('//peSevenObject: ');
console.warn(JSON.stringify(peSevenObject, undefined, 4));
// ø </ACTUAL CODE>

// ø <----------- <peSevenObjectBuilderOverall() for Encapsulation> ----------->
export function peSevenObjectBuilderOverall(peSevenObject) {
    // peSevenObject.test = 'Marais';
    buildStepObjectArrayBase(peSevenObject);
    psSevenIntegrateSteps(peSevenObject)
    stepMessagingLogicColors(peSevenObject);
    stepMessagingBuildFromManual(peSevenObject);
    wixStorageByStep(peSevenObject);
}
// ø <----------- </peSevenObjectBuilderOverall() for Encapsulation> ----------->

// ø <wixStorage for stateOnramp>
// ø <wixStorage for stateInstantiate>
// ø <wixStorage for stateMemberConfirm>
// ø <wixStorage for stateDupeDelete>
// ø <wixStorage for stateDatabaseForPrimaryAndStudent>
// ø <wixStorage for stateContactAndDatabaseForSecondary>
// ø <wixStorage for stateResolveAndDestroy>
// ø <wixStorage for stateOfframp>


// ø <---------- <buildStepObjectArrayBase(peSevenObject)>  ----------->
export function buildStepObjectArrayBase(peSevenObject) {
    peSevenObject.errorStringArray = [];
    peSevenObject.stepObjects = {};
    // ø <step titles manual>
    let titleArray = [];
    let longTitleArray = [];

    let titleThis = 'On-Ramp';
    titleArray.push(titleThis);
    titleThis = 'Long Title for On-Ramp';
    longTitleArray.push('Long Title for On-Ramp');

    titleThis = 'Instantiate';
    titleArray.push(titleThis);
    titleThis = 'Instantiate Enrollment';
    longTitleArray.push(titleThis);

    titleThis = 'Member Confirm';
    titleArray.push(titleThis);
    titleThis = 'Confirm Members for Primary and Student';
    longTitleArray.push(titleThis);

    titleThis = 'Dupe Delete';
    titleArray.push(titleThis)
    titleThis = 'Delete any Duplicate Contacts (known bug)';
    longTitleArray.push(titleThis);

    titleThis = 'Database for Primary and Student';
    titleArray.push(titleThis);
    titleThis = 'Insert Records into the Person Database for Primary and Student';
    longTitleArray.push(titleThis);

    titleThis = 'Contact for Primary and Student';
    titleArray.push(titleThis);
    titleThis = 'Update Contacts for Primary & Student with Complex Enrollment Data';
    longTitleArray.push(titleThis);

    titleThis = 'Contact and Database for Secondary';
    titleArray.push(titleThis);
    titleThis = 'Upsert Contact and Insert Person database Record for Secondary';
    longTitleArray.push(titleThis);

    titleThis = 'Resolve and Destroy';
    titleArray.push(titleThis);
    titleThis = "Resolve Webhook Payload and Off-Ramp the Post Enrollment Process";
    //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
    longTitleArray.push(titleThis);

    titleThis = 'Off-Ramp';
    titleArray.push(titleThis);
    titleThis = "Off-Ramp to Display Completion Data before taking Next Application";
    //XXXXXXXXXXX123456789012345678901234567890123456789012345678901234567890123456
    longTitleArray.push(titleThis);
    // ø </step titles manual>

    let chopTitle = '';//titleThis.split(' ');
    let titleWordArray = [];//titleThis.split(' ');
    let firstLetter = '';
    let wordRemainder = '';
    let stepKeyArray = [];
    let stateIdArray = [];
    for (let index = 0; index < titleArray.length; index++) {
        let titleThis = titleArray[index];
        let longTitleThis = longTitleArray[index];
        let stateIdThis = 'state';

        chopTitle = titleThis.trim();
        while (chopTitle.indexOf('-') >= 0) {
            chopTitle = chopTitle.replace('-', '');
        }
        titleWordArray = chopTitle.trim().split(' ');

        let first = true;
        let titleKeyThis = '';
        titleWordArray.forEach(word => {
            firstLetter = word.substr(0, 1).toUpperCase();
            wordRemainder = word.substr(1).toLowerCase();
            stateIdThis += firstLetter + wordRemainder;
            if (first) {
                titleKeyThis += word.toLowerCase();
            }
            if (!first) {
                titleKeyThis += firstLetter + wordRemainder;
            }
            first = false;

        });
        stateIdArray.push(stateIdThis);
        stepKeyArray.push(titleKeyThis);

        peSevenObject.stateIdArray = stateIdArray;
        let stepObject = {};
        stepObject.titleKey = titleKeyThis;
        stepObject.title = titleThis;
        stepObject.longTitle = longTitleThis;
        stepObject.stateIdThis = stateIdThis;
        peSevenObject.stepObjects[stateIdThis] = stepObject;
    }

}
// ø <---------- </buildStepObjectArrayBase(peSevenObject)> ----------->

// ø <---------- <psSevenIntegrateSteps(peSevenObject)>  ----------->
export function psSevenIntegrateSteps(peSevenObject) {
    let stepKeyArrayHolder = [
        "onramp",
        "instantiate",
        "memberConfirm",
        "dupeDelete",
        "databaseForPrimaryAndStudent",
        "contactForPrimaryAndStudent",
        "contactAndDatabaseForSecondary",
        "resolveAndDestroy",
        "offramp"
    ];
    let stepArrayOrig = ['IINSTANTIATE', 'PREP_ppMember', 'EXECUTE_ppMember', 'PREP_stMember', 'EXECUTE_stMember', 'dedupePpStContact', 'PREP_ppContact', 'PREP_ppDatabase', 'PREP_stContact', 'PREP_stDatabase', 'PREP_spContact', 'PREP_spDatabase', 'EXECUTE_ppContact', 'EXECUTE_ppDatabase', 'EXECUTE_stContact', 'EXECUTE_stDatabase', 'EXECUTE_spContact', 'EXECUTE_spDatabase', 'CCOMPLETE'];
    let allConfirmStateStepArray = [];
    let confirmState = '';
    let allStepArray = [];
    let holderforAllStepArray = [];
    let firstStepArray = [];
    let lastStepArray = [];
    let allNotesStepArray = [];
    let allPanelNotesBeforeStepArray = [];
    let allPanelNotesAfterStepArray = [];
    let allStepThis = [];
    let allStepThisForShift = [];
    let allStepThisForPop = [];
    let firstStepThis = '';
    let lastStepThis = '';
    let notesStepArrayThis = [];
    let panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    let panelNotesAfterStepArrayThis = ['Tell them you did it'];


    // ø <Zeroth Step Manual>
    // ø <wixStorage for stateOnramp>
    confirmState = 'stateOnramp';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['VALIDATE_staffEyeD'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = ['otherise taken care of by onReady()'];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do','including about Staff-Eye-D'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it','messaging about Staff-Eye-D results'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Zeroth Step Manual>
    // ø <First Step Manual>
    // ø <wixStorage for stateInstantiate>
    confirmState = 'stateInstantiate';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['IINSTANTIATE'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = ['may need to manually confirm Staff-Eye-D Member if automatic is not conclusive'];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do','IFF Staff-Eye-D Confirmation Input'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it','superEnrollmentStatus','ppAction','stAction','spAction'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </First Step Manual>
    // ø <Second Step Manual>
    // ø <wixStorage for stateMemberConfirm>
    confirmState = 'stateMemberConfirm';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['PREP_ppMember', 'EXECUTE_ppMember', 'PREP_stMember', 'EXECUTE_stMember'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = [];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Second Step Manual>
    // ø <Third Step Manual>
    // ø <wixStorage for stateDupeDelete>
    confirmState = 'stateDupeDelete';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['dedupePpStContact'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = [];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Third Step Manual>
    // ø <Fourth Step Manual>
    // ø <wixStorage for stateDatabaseForPrimaryAndStudent>
    confirmState = 'stateDatabaseForPrimaryAndStudent';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['PREP_ppContact', 'PREP_ppDatabase', 'PREP_stContact', 'PREP_stDatabase'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = [];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Fourth Step Manual>
    // ø <Fifth Step Manual>
    // ø <wixStorage for stateContactForPrimaryAndStudent>
    confirmState = 'stateContactForPrimaryAndStudent';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['PREP_spContact', 'PREP_spDatabase', 'EXECUTE_ppContact', 'EXECUTE_ppDatabase', 'EXECUTE_stContact', 'EXECUTE_stDatabase'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = [];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Fifth Step Manual>
    // ø <Sixth Step Manual>
    // ø <wixStorage for stateContactAndDatabaseForSecondary>
    confirmState = 'stateContactAndDatabaseForSecondary';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['EXECUTE_spContact', 'EXECUTE_spDatabase'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = [];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Sixth Step Manual>
    // ø <Seventh Step Manual>
    // ø <wixStorage for stateResolveAndDestroy>
    confirmState = 'stateResolveAndDestroy';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['EEMPTY'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = ["ouside of Loop-Switch execute ¿Resolve WebHook?", "ouside of Loop-Switch execute ¿Destroy? wixStorage"];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Seventh Step Manual>
    // ø <Eighth Step Manual>
    // ø <wixStorage for stateOfframp>
    confirmState = 'stateOfframp';
    allConfirmStateStepArray.push(confirmState);
    allStepThis = ['EEMPTY'];
    allStepThisForShift = [...allStepThis];
    allStepThisForPop = [...allStepThis];
    allStepArray = allStepArray.concat([allStepThis]);
    firstStepThis = allStepThisForShift.shift();
    firstStepArray.push(firstStepThis);
    lastStepThis = allStepThisForPop.pop();
    lastStepArray.push(lastStepThis);
    notesStepArrayThis = ["return to ¿Process Web Hooks?"];
    allNotesStepArray.push(notesStepArrayThis);
    panelNotesBeforeStepArrayThis = ['Tell them what you are going to do'];
    allPanelNotesBeforeStepArray.push(panelNotesBeforeStepArrayThis);
    panelNotesAfterStepArrayThis = ['Tell them you did it'];
    allPanelNotesAfterStepArray.push(panelNotesAfterStepArrayThis);
    // ø </Eighth Step Manual>

    let arrayCountManualValidation = 9;
    let isValid = true;
    isValid = peSevenObject.stateIdArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = allConfirmStateStepArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = allStepArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = firstStepArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = lastStepArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = allNotesStepArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = allPanelNotesBeforeStepArray.length !== arrayCountManualValidation ? false : isValid;
    isValid = allPanelNotesAfterStepArray.length !== arrayCountManualValidation ? false : isValid;


    if (!isValid) {
        peSevenObject.errorStringArray.push('[psSevenIntegrateSteps] one or more invalid array counts to steps');
    }
    if (isValid) {
        for (let index = 0; index < firstStepArray.length; index++) {
            let objectKey = peSevenObject.stateIdArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps'] = {};
            peSevenObject.stepObjects[objectKey]['origSteps']['confirmState'] = allConfirmStateStepArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps']['allStepArray'] = allStepArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps']['notes'] = allNotesStepArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps']['panelBeforeStepNotes'] = allPanelNotesBeforeStepArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps']['panelAfterStepNotes'] = allPanelNotesAfterStepArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps']['firstStep'] = firstStepArray[index];
            peSevenObject.stepObjects[objectKey]['origSteps']['lastStep'] = lastStepArray[index];

        }
    }

}
// ø </superStep stepAray manual>
// ø <---------- <psSevenIntegrateSteps(peSevenObject)>  ----------->

// ø <----------- <stepMessagingLogicColors for Encapsulation>  ----------->
export function stepMessagingLogicColors(peSevenObject) {
    // peSevenObject.stepObjects = {};
    // peSevenObject.messaging = {};
    // ø <superSevenMessaging manual>
    let bootstrapJSON = `{
        "primary": {
            "namedColor": "blue",
            "hexColor": "#007bff",
            "rgbColor": "RGB( 0, 123, 255 )",
            "notes": []
        },
        "devel": {
            "logicColor": "devel",
            "namedColor": "indigo",
            "hexColor": "#6610f2",
            "rgbColor": "RGB( 102, 16, 242 )",
            "notes": [
                "btl custom logicName"
            ]
        },
        "danger": {
            "logicColor": "danger",
            "namedColor": "red",
            "hexColor": "#dc3545",
            "rgbColor": "RGB( 220, 53, 69 )",
            "notes": []
        },
        "warning": {
            "logicColor": "warning",
            "namedColor": "yellow",
            "hexColor": "#ffc107",
            "rgbColor": "RGB( 255, 193, 7 )",
            "notes": []
        },
        "success": {
            "logicColor": "success",
            "namedColor": "green",
            "hexColor": "#28a745",
            "rgbColor": "RGB( 40, 167, 69 )",
            "notes": []
        },
        "info": {
            "logicColor": "info",
            "namedColor": "cyan",
            "hexColor": "#17a2b8",
            "rgbColor": "RGB( 23, 162, 184 )",
            "notes": []
        }}`;
    let bootstrapObject = JSON.parse(bootstrapJSON);
    let messagingKeys = Object.keys(bootstrapObject);
    // console.warn('messagingKeys: ');
    // console.warn(messagingKeys);
    let messaging = {};
    messaging.hex = {};
    messaging.hex.primary = bootstrapObject.primary.hexColor;
    messaging.hex.devel = bootstrapObject.devel.hexColor;
    messaging.hex.danger = bootstrapObject.danger.hexColor;
    messaging.hex.warning = bootstrapObject.warning.hexColor;
    messaging.hex.success = bootstrapObject.success.hexColor;
    messaging.hex.info = bootstrapObject.info.hexColor;
    // console.warn('messaging: ');
    // console.warn(messaging);
    // return messaging;
    peSevenObject.messaging = {};
    peSevenObject.messaging = messaging;
}
// ø <----------- </stepMessagingLogicColors for Encapsulation> ----------->

// ø <----------- <stepMessagingBuildFromManual() for Encapsulation>  ----------->
export function stepMessagingBuildFromManual(peSevenObject) {
    let stepMessaging = {};
    stepMessaging.stateOnramp = {};
    stepMessaging.stateOnramp.primary = 'The primary message for stateOnramp';
    stepMessaging.stateOnramp.devel = 'The devel message for stateOnramp';
    stepMessaging.stateOnramp.danger = 'The danger message for stateOnramp';
    stepMessaging.stateOnramp.warning = 'The warning message for stateOnramp';
    stepMessaging.stateOnramp.success = 'The success message for stateOnramp';
    stepMessaging.stateOnramp.info = 'The info message for stateOnramp';
    stepMessaging.stateInstantiate = {};
    stepMessaging.stateInstantiate.primary = 'The primary message for stateInstantiate';
    stepMessaging.stateInstantiate.devel = 'The devel message for stateInstantiate';
    stepMessaging.stateInstantiate.danger = 'The danger message for stateInstantiate';
    stepMessaging.stateInstantiate.warning = 'The warning message for stateInstantiate';
    stepMessaging.stateInstantiate.success = 'The success message for stateInstantiate';
    stepMessaging.stateInstantiate.info = 'The info message for stateInstantiate';
    stepMessaging.stateMemberConfirm = {};
    stepMessaging.stateMemberConfirm.primary = 'The primary message for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.devel = 'The devel message for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.danger = 'The danger message for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.warning = 'The warning message for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.success = 'The success message for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.info = 'The info message for stateMemberConfirm';
    stepMessaging.stateDupeDelete = {};
    stepMessaging.stateDupeDelete.primary = 'The primary message for stateDupeDelete';
    stepMessaging.stateDupeDelete.devel = 'The devel message for stateDupeDelete';
    stepMessaging.stateDupeDelete.danger = 'The danger message for stateDupeDelete';
    stepMessaging.stateDupeDelete.warning = 'The warning message for stateDupeDelete';
    stepMessaging.stateDupeDelete.success = 'The success message for stateDupeDelete';
    stepMessaging.stateDupeDelete.info = 'The info message for stateDupeDelete';
    stepMessaging.stateDatabaseForPrimaryAndStudent = {};
    stepMessaging.stateDatabaseForPrimaryAndStudent.primary = 'The primary message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.devel = 'The devel message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.danger = 'The danger message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.warning = 'The warning message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.success = 'The success message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.info = 'The info message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent = {};
    stepMessaging.stateContactForPrimaryAndStudent.primary = 'The primary message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.devel = 'The devel message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.danger = 'The danger message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.warning = 'The warning message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.success = 'The success message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.info = 'The info message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactAndDatabaseForSecondary = {};
    stepMessaging.stateContactAndDatabaseForSecondary.primary = 'The primary message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.devel = 'The devel message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.danger = 'The danger message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.warning = 'The warning message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.success = 'The success message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.info = 'The info message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateResolveAndDestroy = {};
    stepMessaging.stateResolveAndDestroy.primary = 'The primary message for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.devel = 'The devel message for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.danger = 'The danger message for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.warning = 'The warning message for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.success = 'The success message for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.info = 'The info message for stateResolveAndDestroy';
    stepMessaging.stateOfframp = {};
    stepMessaging.stateOfframp.primary = 'The primary message for stateOfframp';
    stepMessaging.stateOfframp.devel = 'The devel message for stateOfframp';
    stepMessaging.stateOfframp.danger = 'The danger message for stateOfframp';
    stepMessaging.stateOfframp.warning = 'The warning message for stateOfframp';
    stepMessaging.stateOfframp.success = 'The success message for stateOfframp';
    stepMessaging.stateOfframp.info = 'The info message for stateOfframp';
    peSevenObject.stepMessaging = stepMessaging;
}
// ø <----------- </stepMessagingBuildFromManual() for Encapsulation> ----------->

// ø <----------- <wixStorageByStep() for Encapsulation>  ----------->
export function wixStorageByStep(peSevenObject) {
    // "stateIdArray": [
    //     "stateOnramp",
    //     "stateInstantiate",
    //     "stateMemberConfirm",
    //     "stateDupeDelete",
    //     "stateDatabaseForPrimaryAndStudent",
    //     "stateContactForPrimaryAndStudent",
    //     "stateContactAndDatabaseForSecondary",
    //     "stateResolveAndDestroy",
    //     "stateOfframp"
    // ],
    // ø <wixStorage for stateOnramp>
    // let stateKeyThis = 'stateOnramp'
    peSevenObject.stepObjects.stateOnramp.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateOnramp>

    // ø <wixStorage for stateInstantiate>
    // let stateKeyThis = 'stateInstantiate'
    peSevenObject.stepObjects.stateInstantiate.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateInstantiate>

    // ø <wixStorage for stateMemberConfirm>
    // let stateKeyThis = 'stateMemberConfirm'
    peSevenObject.stepObjects.stateMemberConfirm.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateMemberConfirm>

    // ø <wixStorage for stateDupeDelete>
    // let stateKeyThis = 'stateDupeDelete'
    peSevenObject.stepObjects.stateDupeDelete.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateDupeDelete>

    // ø <wixStorage for stateDatabaseForPrimaryAndStudent>
    // let stateKeyThis = 'stateDatabaseForPrimaryAndStudent'
    peSevenObject.stepObjects.stateDatabaseForPrimaryAndStudent.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateDatabaseForPrimaryAndStudent>

    // ø <wixStorage for stateContactForPrimaryAndStudent>
    // let stateKeyThis = 'stateContactForPrimaryAndStudent'
    peSevenObject.stepObjects.stateContactForPrimaryAndStudent.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateContactForPrimaryAndStudent>

    // ø <wixStorage for stateContactAndDatabaseForSecondary>
    // let stateKeyThis = 'stateContactAndDatabaseForSecondary'
    peSevenObject.stepObjects.stateContactAndDatabaseForSecondary.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateContactAndDatabaseForSecondary>

    // ø <wixStorage for stateResolveAndDestroy>
    // let stateKeyThis = 'stateResolveAndDestroy'
    peSevenObject.stepObjects.stateResolveAndDestroy.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateResolveAndDestroy>

    // ø <wixStorage for stateOfframp>
    // let stateKeyThis = 'stateOfframp'
    peSevenObject.stepObjects.stateOfframp.wixStorageArray = ['kind.key']
    // ø </wixStorage for stateOfframp>

    // ø <INTERNAL DOX>
    if (typeof stateKeyThis === 'string') {
        let confirmStateThis = peSevenObject.stepObjects[stateKeyThis].origSteps.confirmState;
        let origStepArrayThis = peSevenObject.stepObjects[stateKeyThis].origSteps.allStepArray;
        let origStepNotesThese = peSevenObject.stepObjects[stateKeyThis].origSteps.notes;
        
        // let ZconfirmStateThis = peSevenObject.stepObjects[stateKeyThis];//.origSteps;//.confirmState;
        // console.log(ZconfirmStateThis);
        // let ZZconfirmStateThis = peSevenObject.stepObjects[stateKeyThis].origSteps;//.confirmState;
        // console.log(ZZconfirmStateThis);
        // let ZZZconfirmStateThis = peSevenObject.stepObjects[stateKeyThis].origSteps.confirmState;
        // console.log(ZZZconfirmStateThis);
        
        console.log('[wixStorageByStep]INTERNAL DOX: ')
        console.warn('[wixStorageByStep] => Confirm: \n'+ `${stateKeyThis} === ${confirmStateThis}`)
        // console.warn(`${stateKeyThis} === ${confirmStateThis}`)
        console.warn('[wixStorageByStep]origStepArrayThis: ')
        console.warn(origStepArrayThis)
        console.warn('[wixStorageByStep]origStepNotesThese: ')
        console.warn(origStepNotesThese)
    }
    // ø </INTERNAL DOX>
}
// ø <----------- </wixStorageByStep() for Encapsulation> ----------->







