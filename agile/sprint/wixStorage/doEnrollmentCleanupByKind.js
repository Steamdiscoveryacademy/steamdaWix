// ø <---------- <doEnrollmentCleanupByKind>  ---------->
export function doEnrollmentCleanupByKind(kindKey = 'DDEFAULT') {
    let develTest = true;
    let errorStringArray = [];
    let cleanupString = 'EEMPTY';//override where appropriate
    let kindKeySupportedArray = ['CODE','STEPS','DATA','CORE','OTHER','MEMORY_ALL','LOCAL_TEMP','ALL_EXCEPT_ENROLLMENT','ALL_INCLUDING_ENROLLMENT','ABORT'];
    let kindSupportedArray = ['CODE','STEPS','DATA','CORE','OTHER','NEXT_ENROLLMENT'];
    kindKey = kindKeySupportedArray.includes(kindKey) ? kindKey : 'DDEFUALT';
    console.warn('kindKey: ' + kindKey);
    kindArray = [];
    kindArray = kindKey === 'ABORT' ? /*kindSupportedArray*/['ZZZ'] : kindArray;
    kindArray = kindKey === 'ALL_INCLUDING_ENROLLMENT' ? /*['CODE','STEPS','DATA','NEXT_ENROLLMENT']*/['ZZZ'] : kindArray;
    kindArray = kindKey === 'ALL_EXCEPT_ENROLLMENT' ? /*['CODE','STEPS','DATA']*/['ZZZ'] : kindArray;
    kindArray = kindKey === 'CODE' ? ['CODE'] : kindArray
    kindArray = kindKey === 'STEPS' ? ['STEPS'] : kindArray
    kindArray = kindKey === 'DATA' ? ['DATA'] : kindArray
    kindArray = kindKey === 'CORE' ? ['ZZZ'] : kindArray
    kindArray = kindKey === 'OTHER' ? ['OTHER'] : kindArray
    kindArray = kindKey === 'MEMORY_ALL' ? ['MEMORY_ALL'] : kindArray
    kindArray = kindKey === 'LOCAL_TEMP' ? ['LOCAL_TEMP'] : kindArray
    // ø <Deprecated Use kindKey = 'CURRENT'>
    kindArray = kindKey === 'CURRENT' ? ['DATA','CODE','STEPS'] : kindArray;
    // ø </Deprecated Use kindKey = 'CURRENT'>
    
    // ø <VALIDATION HERE>
    if(kindArray.length === 0){
        errorStringArray.push("The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not vallid.");
    }
    if(kindArray.length === 1 && kindArray[0] === 'ZZZ'){
        errorStringArray.push("The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not enabled at this time.");
    }
    if(kindArray.includes('NEXT_ENROLLMENT')){
        if(typeof local.getItem('wixWebhookStatus') !== 'string' || local.getItem('wixWebhookStatus') !== 'RESOLVED'){
            errorStringArray.push("'Next Enrollment' rquires that the current Webhook Payload have a status of 'Resolved'")
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
    /*Not CURRENT*///logString += '\n' + "local.getItem('ondeckEnrollmentJSON'): " + local.getItem('ondeckEnrollmentJSON'); 
    // ø <DATA>
    if(kindArray.includes('DATA')){
        cleanupString = develTest === true ? 'DATA' : cleanupString;
        // local.getItem('staffIdentifiedFamilyId') = cleanupString;
        // local.getItem('familyId') = cleanupString;
        memory.getItem('ppRevision') = cleanupString;
        // local.getItem('studentId') = cleanupString;
        memory.getItem('stRevision') = cleanupString;
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <LOCAL_DATA>
    if(kindArray.includes('LOCAL_DATA')){
        cleanupString = develTest === true ? 'LOCAL_DATA' : cleanupString;
        local.getItem('staffIdentifiedFamilyId') = cleanupString;
        local.getItem('familyId') = cleanupString;
        // memory.getItem('ppRevision') = cleanupString;
        local.getItem('studentId') = cleanupString;
        // memory.getItem('stRevision') = cleanupString;
    }//END if(kind === 'LOCAL_DATA' || kind === 'DDEFAULT')
    // ø </LOCAL_DATA>
    // ø <CODE>
    if(kindArray.includes('CODE')){
        cleanupString = develTest === true ? 'CODE' : cleanupString;
        memory.getItem('ppMemberPrepJSON') = cleanupString;
        memory.getItem('ppMemberExecuteUpsert') = cleanupString;
        memory.getItem('stMemberPrepJSON') = cleanupString;
        memory.getItem('stMemberExecuteUpsert') = cleanupString;
        memory.getItem('ppContactPrepJSON') = cleanupString;
        memory.getItem('ppDatabasePrepJSON') = cleanupString;
        memory.getItem('stContactPrepJSON') = cleanupString;
        memory.getItem('stDatabasePrepJSON') = cleanupString;
        memory.getItem('spContactPrepJSON') = cleanupString;
        memory.getItem('spDatabasePrepJSON') = cleanupString;
        memory.getItem('ppContactExecuteUpsert') = cleanupString;
        memory.getItem('ppDatabaseExecuteUpsert') = cleanupString;
        memory.getItem('stContactExecuteUpsert') = cleanupString;
        memory.getItem('stDatabaseExecuteUpsert') = cleanupString;
        memory.getItem('spContactExecuteUpsert') = cleanupString;
        memory.getItem('spDatabaseExecuteUpsert') = cleanupString;
    }//END if(kind === 'CODE' || kind === 'DDEFAULT')
    // ø </CODE>
    // ø <STEPS>
    if(kindArray.includes('STEPS')){
        cleanupString = develTest === true ? 'STEPS' : cleanupString;
        memory.getItem('enrollmentStepList') = cleanupString;
        memory.getItem('enrollmentStepCompleted') = cleanupString;
        memory.getItem('enrollmentStepCurrent') = cleanupString;
        memory.getItem('enrollmentStepNext') = cleanupString;
        local.getItem('loopExitAfterStep') = cleanupString;
        local.getItem('loopExitNow') = cleanupString;
        memory.getItem('stepStampArray') = 'EEMPTY_AARRAY';
    }//END if(kind === 'STEPS' || kind === 'DDEFAULT')
    // ø </STEPS>
    // ø <CORE>
    if(kindArray.includes('CORE')){
        cleanupString = develTest === true ? 'CORE' : cleanupString;
        local.getItem('yyyymm') = cleanupString;//was included in Deprecated version
        local.getItem('termId') = cleanupString;
        local.getItem('termBeginMMDD') = cleanupString;
        local.getItem('termEndMMDD') = cleanupString;
        local.getItem('termLabelKey') = cleanupString;
        local.getItem('weekIdToLabelKeyJSON') = cleanupString;
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </CORE>
    // ø <NEXT_ENROLLMENT>
    if(kindArray.includes('NEXT_ENROLLMENT')){
        cleanupString = develTest === true ? 'NEXT_ENROLLMENT' : cleanupString;
        local.getItem('wixWebhookId') = cleanupString;
        local.getItem('wixWebhookStatus') = cleanupString;
        local.getItem('ondeckEnrollmentJSON') = cleanupString;
    }
    // ø </NEXT_ENROLLMENT>
    // ø <UNACCOUNTED_FOR>
    if(kindArray.includes('UNACCOUNTED_FOR')){
    // if(kind === 'UNACCOUNTED_FOR' || kind === 'DDEFAULT'){
        cleanupString = develTest === true ? 'UNACCOUNTED_FOR' : cleanupString;
        memory.getItem('loopExitNow') = cleanupString;
        memory.getItem('ppMemberOnDeckJSON') = cleanupString;
        memory.getItem('HHOLDER') = cleanupString;
        memory.getItem('loopExitAfterStep') = cleanupString;
        local.getItem('yyyymm') = cleanupString;
    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </UNACCOUNTED_FOR>
    // return logString;
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentCleanupByKind> ---------->