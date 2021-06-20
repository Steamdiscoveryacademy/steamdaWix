//CHECKLIST
//ø['DATA','CODE','STEPS']
// ø <---------- <doEnrollmentCleanupCurrent>  ---------->
// ø <DEPRECATED for 'doEnrollmentCleanupByKind' two below>
export function doEnrollmentCleanupCurrent() {
    // ø <code Cleanup for Current Enrollment> mostly for testing
    /*Not CURRENT*///local.setItem('ondeckEnrollmentJSON','EEMPTY');
    // local.setItem('staffIdentifiedFamilyId', 'EEMPTY');
    // local.setItem('familyId', 'EEMPTY');
    memory.setItem('ppRevision',"EEMPTY")//ø['DATA']
    // local.setItem('studentId', 'EEMPTY');
    memory.setItem('stRevision',"EEMPTY")//ø['DATA']

    memory.setItem('ppMemberPrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('ppMemberExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('stMemberPrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('stMemberExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('ppContactPrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('ppDatabasePrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('stContactPrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('stDatabasePrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('spContactPrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('spDatabasePrepJSON', 'EEMPTY');//ø['CODE']
    memory.setItem('ppContactExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('ppDatabaseExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('stContactExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('stDatabaseExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('spContactExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('spDatabaseExecuteUpsert', 'EEMPTY');//ø['CODE']
    memory.setItem('enrollmentStepList', 'EEMPTY');//ø['STEPS']
    memory.setItem('enrollmentStepCompleted', 'EEMPTY');//ø['STEPS']
    memory.setItem('enrollmentStepCurrent', 'EEMPTY');//ø['STEPS']
    memory.setItem('enrollmentStepNext', 'EEMPTY');//ø['STEPS']
    local.setItem('loopExitAfterStep', 'EEMPTY');//ø['STEPS']
    local.setItem('loopExitNow', 'TTRUE_DEFUALT');//ø['STEPS']
    memory.setItem('stepStampArray', 'EEMPTY_AARRAY');//ø['STEPS']
    memory.setItem('yyyymm', 'EEMPTY');

    // ø </code Cleanup for Current Enrollment>
    return "The Current Enrollment Data has been Reset to 'EEMPTY', Clean-Up Successful.";
}
// ø </DEPRECATED for 'doEnrollmentCleanupByKind' two below>
// ø <---------- </doEnrollmentCleanupCurrent> ---------->