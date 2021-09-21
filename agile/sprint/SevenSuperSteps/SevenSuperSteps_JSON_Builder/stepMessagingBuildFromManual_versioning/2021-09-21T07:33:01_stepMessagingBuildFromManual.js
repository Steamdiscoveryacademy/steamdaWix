// ø <----------- <stepMessagingBuildFromManual() for Encapsulation>  ----------->
//ManualEntryUpdate_MESSAGING BEGIN
export function stepMessagingBuildFromManual(peSevenObject) {
    /**
     * ø @stamp: 2021-09-21T07:33:01
     * ø @descr: pre-Demo Update && instantiate Versioning
     * ø HOW TO:
     * ø   - Copy the Entire Function
     * ø   - Save it to a Versioned Copy
     * ø   - Make all changes and Exits as you see fit
     * ø   - PASTE-OVER this Code with the intended Vesion
     */

    let stepMessaging = {};
    stepMessaging.stateOnramp = {};
    stepMessaging.stateOnramp.primary = 'Constant primary message unless override for stateOnramp';
    stepMessaging.stateOnramp.secondary = 'EEMPTY';
    stepMessaging.stateOnramp.success = 'This success response unless danger, warning or override for stateOnramp';
    stepMessaging.stateOnramp.warning = 'EEMPTY';
    stepMessaging.stateOnramp.danger = 'EEMPTY';
    stepMessaging.stateOnramp.info = 'Additional Info for stateOnramp';
    stepMessaging.stateOnramp.devel = 'The devel message for stateOnramp';
    stepMessaging.stateInstantiate = {};
    stepMessaging.stateInstantiate.primary = 'Constant primary message unless override for stateInstantiate';
    stepMessaging.stateInstantiate.secondary = 'EEMPTY';
    stepMessaging.stateInstantiate.success = 'This success response unless danger, warning or override for stateInstantiate';
    stepMessaging.stateInstantiate.warning = 'EEMPTY';
    stepMessaging.stateInstantiate.danger = 'EEMPTY';
    stepMessaging.stateInstantiate.info = 'Additional Info for stateInstantiate';
    stepMessaging.stateInstantiate.devel = 'The devel message for stateInstantiate';
    stepMessaging.stateMemberConfirm = {};
    stepMessaging.stateMemberConfirm.primary = 'Constant primary message unless override for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.secondary = 'EEMPTY';
    stepMessaging.stateMemberConfirm.success = 'This success response unless danger, warning or override for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.warning = 'EEMPTY';
    stepMessaging.stateMemberConfirm.danger = 'EEMPTY';
    stepMessaging.stateMemberConfirm.info = 'Additional Info for stateMemberConfirm';
    stepMessaging.stateMemberConfirm.devel = 'The devel message for stateMemberConfirm';
    stepMessaging.stateDupeDelete = {};
    stepMessaging.stateDupeDelete.primary = 'Constant primary message unless override for stateDupeDelete';
    stepMessaging.stateDupeDelete.secondary = 'EEMPTY';
    stepMessaging.stateDupeDelete.success = 'The Duplicate Contact Anomaly was not present No Action Required';
    stepMessaging.stateDupeDelete.warning = 'EEMPTY';
    stepMessaging.stateDupeDelete.danger = 'EEMPTY';
    stepMessaging.stateDupeDelete.info = 'There is a Known Anomaly where Duplicate Contacts for Primary Parent and/or Student are created that need o be dealt with';
    stepMessaging.stateDupeDelete.devel = 'The devel message for stateDupeDelete';
    stepMessaging.stateDatabaseForPrimaryAndStudent = {};
    stepMessaging.stateDatabaseForPrimaryAndStudent.primary = 'Constant primary message unless override for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.secondary = 'EEMPTY';
    stepMessaging.stateDatabaseForPrimaryAndStudent.success = 'This success response unless danger, warning or override for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.warning = 'EEMPTY';
    stepMessaging.stateDatabaseForPrimaryAndStudent.danger = 'EEMPTY';
    stepMessaging.stateDatabaseForPrimaryAndStudent.info = 'Additional Info for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateDatabaseForPrimaryAndStudent.devel = 'The devel message for stateDatabaseForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent = {};
    stepMessaging.stateContactForPrimaryAndStudent.primary = 'Constant primary message unless override for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.secondary = 'EEMPTY';
    stepMessaging.stateContactForPrimaryAndStudent.success = 'This success response unless danger, warning or override for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.warning = 'EEMPTY';
    stepMessaging.stateContactForPrimaryAndStudent.danger = 'EEMPTY';
    stepMessaging.stateContactForPrimaryAndStudent.info = 'Additional Info for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactForPrimaryAndStudent.devel = 'The devel message for stateContactForPrimaryAndStudent';
    stepMessaging.stateContactAndDatabaseForSecondary = {};
    stepMessaging.stateContactAndDatabaseForSecondary.primary = 'Constant primary message unless override for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.secondary = 'EEMPTY';
    stepMessaging.stateContactAndDatabaseForSecondary.success = 'This success response unless danger, warning or override for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.warning = 'EEMPTY';
    stepMessaging.stateContactAndDatabaseForSecondary.danger = 'EEMPTY';
    stepMessaging.stateContactAndDatabaseForSecondary.info = 'Additional Info for stateContactAndDatabaseForSecondary';
    stepMessaging.stateContactAndDatabaseForSecondary.devel = 'The devel message for stateContactAndDatabaseForSecondary';
    stepMessaging.stateResolveAndDestroy = {};
    stepMessaging.stateResolveAndDestroy.primary = 'Constant primary message unless override for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.secondary = 'EEMPTY';
    stepMessaging.stateResolveAndDestroy.success = 'This success response unless danger, warning or override for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.warning = 'EEMPTY';
    stepMessaging.stateResolveAndDestroy.danger = 'EEMPTY';
    stepMessaging.stateResolveAndDestroy.info = 'Additional Info for stateResolveAndDestroy';
    stepMessaging.stateResolveAndDestroy.devel = 'The devel message for stateResolveAndDestroy';
    stepMessaging.stateOfframp = {};
    stepMessaging.stateOfframp.primary = 'Constant primary message unless override for stateOfframp';
    stepMessaging.stateOfframp.secondary = 'EEMPTY';
    stepMessaging.stateOfframp.success = 'This success response unless danger, warning or override for stateOfframp';
    stepMessaging.stateOfframp.warning = 'EEMPTY';
    stepMessaging.stateOfframp.danger = 'EEMPTY';
    stepMessaging.stateOfframp.info = 'Additional Info for stateOfframp';
    stepMessaging.stateOfframp.devel = 'The devel message for stateOfframp';
    peSevenObject.stepMessaging = stepMessaging;
}
//ManualEntryUpdate_MESSAGING END
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
        console.warn('[wixStorageByStep] => Confirm: \n' + `${stateKeyThis} === ${confirmStateThis}`)
        // console.warn(`${stateKeyThis} === ${confirmStateThis}`)
        console.warn('[wixStorageByStep]origStepArrayThis: ')
        console.warn(origStepArrayThis)
        console.warn('[wixStorageByStep]origStepNotesThese: ')
        console.warn(origStepNotesThese)
    }
    // ø </INTERNAL DOX>
}
// ø <----------- </wixStorageByStep() for Encapsulation> ----------->