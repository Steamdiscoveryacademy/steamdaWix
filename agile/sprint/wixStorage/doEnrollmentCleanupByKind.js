let kindKeyThis = 'CODE';
// kindKeyThis = 'STEPS';
// kindKeyThis = 'DATA';
// kindKeyThis = 'CORE';
// kindKeyThis = 'OTHER';
// kindKeyThis = 'MEMORY_ALL';
// kindKeyThis = 'LOCAL_TEMP';
// kindKeyThis = 'ALL_EXCEPT_ENROLLMENT';
// kindKeyThis = 'ALL_INCLUDING_ENROLLMENT';
// kindKeyThis = 'ABORT';

// ! <Perform the Function>
doEnrollmentCleanupByKind(kindKeyThis);
// ! </Perform the Function>


// ø <---------- <doEnrollmentCleanupByKind>  ---------->
export function doEnrollmentCleanupByKind(kindKey = 'DDEFAULT') {
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
    

    // ø <code Log for Current Enrollment> mostly for testing
    let logString = '';
    let ZXZmemory = {};
    let ZXZlocal = {};
    /*Not CURRENT*///logString += '\n' + "local.getItem('ondeckEnrollmentJSON'): " + local.getItem('ondeckEnrollmentJSON'); 
    // ø <DATA>
    if(kindArray.includes('DATA')){
        // console.log(kind);
        ZXZlocal.getItemZlpqZstaffIdentifiedFamilyIdZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZfamilyIdZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppRevisionZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZstudentIdZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstRevisionZqrpZ = cleanupString;
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </DATA>
    // ø <CODE>
    if(kindArray.includes('CODE')){
        // console.log(kind);
        ZXZmemory.getItemZlpqZppMemberPrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppMemberExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstMemberPrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstMemberExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppContactPrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppDatabasePrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstContactPrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstDatabasePrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZspContactPrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZspDatabasePrepJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppContactExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppDatabaseExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstContactExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstDatabaseExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZspContactExecuteUpsertZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZspDatabaseExecuteUpsertZqrpZ = cleanupString;
    }//END if(kind === 'CODE' || kind === 'DDEFAULT')
    // ø </CODE>
    // ø <STEPS>
    if(kindArray.includes('STEPS')){
        //console.log(kind);
        ZXZmemory.getItemZlpqZenrollmentStepListZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZenrollmentStepCompletedZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZenrollmentStepCurrentZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZenrollmentStepNextZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZloopExitAfterStepZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZloopExitNowZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZstepStampArrayZqrpZ = cleanupString;
    }//END if(kind === 'STEPS' || kind === 'DDEFAULT')
    // ø </STEPS>
    // ø <CORE>
    if(kindArray.includes('CORE')){
        console.log(kind);
        ZXZlocal.getItemZlpqZyyyymmZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZtermIdZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZtermBeginMMDDZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZtermEndMMDDZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZtermLabelKeyZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZwixWebhookIdZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZweekIdToLabelKeyJSONZqrpZ = cleanupString;
    }//END if(kind === 'DATA' || kind === 'DDEFAULT')
    // ø </CORE>
    // ø <NEXT_ENROLLMENT>
    if(kindArray.includes('NEXT_ENROLLMENT')){
        ZXZlocal.getItemZlpqZondeckEnrollmentJSONZqrpZ = cleanupString;
    }
    // ø </NEXT_ENROLLMENT>
    // ø <UNACCOUNTED_FOR>
    if(kindArray.includes('UNACCOUNTED_FOR')){
    // if(kind === 'UNACCOUNTED_FOR' || kind === 'DDEFAULT'){
        ZXZmemory.getItemZlpqZloopExitNowZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZppMemberOnDeckJSONZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZHHOLDERZqrpZ = cleanupString;
        ZXZmemory.getItemZlpqZloopExitAfterStepZqrpZ = cleanupString;
        ZXZlocal.getItemZlpqZyyyymmZqrpZ = cleanupString;
    }//END if(kind === 'UNACCOUNTED_FOR')
    // ø </UNACCOUNTED_FOR>
    // return logString;
    // ø </code Log for Current Enrollment>
}
// ø <---------- </doEnrollmentCleanupByKind> ---------->