// ø <---------- <doEnrollmentCleanupByKind>  ---------->
export function doEnrollmentCleanupByKind(kindKey = 'DDEFAULT') {
    // ø <DO NOT REMOVE>
    // ! well, unless really final
    // ! do assign either true or false
    // memory.setItem('lastStamp', await nowISO(local.getItem('timezoneOffset'),local.getItem('tzAbbrv')));
    local.setItem('logString', local.getItem('logString') + '\n[~2019]entering: ' + 'doEnrollmentCleanupByKind() at ' + memory.getItem('lastStamp'))
    local.setItem('logString', local.getItem('logString') + '\nkindKey: ' + kindKey)

    let develTest = false;
    // ø </DO NOT REMOVE>
    // let errorStringArray = [];
    let cleanupString = 'EEMPTY';//override where appropriate
    let kindKeySupportedArray = ['CURRENT','CODE','STEPS','DATA','CORE','OTHER','MEMORY_ALL','LOCAL_TEMP','ALL_EXCEPT_ENROLLMENT','ALL_INCLUDING_ENROLLMENT','ABORT','LOG','EEROR'];
    // let kindKeySupportedArray = ['CODE','STEPS','DATA','NOT_LOCAL_DATA','NOT_CORE','OTHER','MEMORY_ALL','LOCAL_TEMP','ALL_EXCEPT_ENROLLMENT','ALL_INCLUDING_ENROLLMENT','ABORT'];
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
        // errorStringArray.push("The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not vallid.");
        local.setItem('logString', local.getItem('logString') + '\n[~2051]: ' + "The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not vallid.")
        abort = true;
    }
    if(kindArray.length === 1 && kindArray[0] === 'ZZZ'){
        // errorStringArray.push("The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not enabled at this time.");
        local.setItem('logString', local.getItem('logString') + '\n[~2051]: ' + "The function 'doEnrollmentCleanupByKind()' with the parameter '"+kindKey+"' is not enabled at this time.")
        abort = true;
    }
    if(kindArray.includes('NEXT_ENROLLMENT')){
        if(typeof develTest !== 'boolean' || develTest !== true){
            if ($w('#sessionEnrollmentJSON').value !== 'BACKDOORROODKCAB') {
                if(typeof local.getItem('wixWebhookStatus') !== 'string' || local.getItem('wixWebhookStatus') !== 'RESOLVED'){
                    // errorStringArray.push("'Next Enrollment' rquires that the current Webhook Payload have a status of 'Resolved'")
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
    
    // ø <VALIDATION EXIT IFF>
    // ! <PRETRASH>
    // let lineFeed = '';
    // if(errorStringArray.length > 0){
    //     let errorStringLog = '';
    //     errorStringArray.forEach(errorString => {
    //         // console.log(errorString); 
    //         errorStringLog += lineFeed + ' • ' + errorString; 
    //         lineFeed = '\n';
    //     });
    //     console.warn('errorStringLog: ');
    //     console.warn(errorStringLog);
    //     return errorStringLog;
    // }
    // ! </PRETRASH>
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
        local.setItem('familySeed', cleanupString);
        local.setItem('familyId', cleanupString);
        // memory.setItem('ppRevision', cleanupString);
        local.setItem('studentId', cleanupString);
        local.setItem('secondaryId', cleanupString);
        // memory.setItem('stRevision', cleanupString);
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
        //! <NOT included in cleanup>
        //! just depends on its use resetting it as appropriate, no need to cleanup
        // local.setItem('logString', cleanupString);
        // memory.setItem('lastStamp', cleanupString);
        //! </NOT included in cleanup>
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
