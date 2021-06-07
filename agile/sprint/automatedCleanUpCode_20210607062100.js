export function doEnrollmentCleanupCurrent(){
    // ø <code Cleanup for Current Enrollment> mostly for testing
        /*Not CURRENT*///local.setItem('ondeckEnrollmentJSON','EEMPTY');
        local.setItem('staffIdentifiedFamilyId','EEMPTY');
        local.setItem('familyId','EEMPTY');
        local.setItem('studentId','EEMPTY');
        memory.setItem('ppMemberOnDeckJSON','EEMPTY');
        memory.setItem('ppContactOnDeckJSON','EEMPTY');
        memory.setItem('ppDatabaseOnDeckJSON','EEMPTY');
        memory.setItem('stMemberOnDeckJSON','EEMPTY');
        memory.setItem('stContactOnDeckJSON','EEMPTY');
        memory.setItem('stDatabaseOnDeckJSON','EEMPTY');
        memory.setItem('spContactOnDeckJSON','EEMPTY');
        memory.setItem('spDatabaseOnDeckJSON','EEMPTY');
        memory.setItem('enrollmentStepList','EEMPTY');
        memory.setItem('enrollmentStepCurrent','EEMPTY');
        memory.setItem('enrollmentStepNext','EEMPTY');
        local.setItem('loopExitAfterStep','EEMPTY');
        local.setItem('loopExitNow','TTRUE_DEFUALT');
    // ø </code Cleanup for Current Enrollment>
        return "The Current Enrollment Data has been Reset to 'EEMPTY', Clean-Up Successful.";
    }
    
    //logCodeEnrollmentCurrent: 
    
    export function doEnrollmentLogCurrent(){
    // ø <code Log for Current Enrollment> mostly for testing
        let logString = '';
        /*Not CURRENT*///logString += '\n' + "local.getItem('ondeckEnrollmentJSON'): " + local.getItem('ondeckEnrollmentJSON'); 
        logString += '\n' + "local.getItem('staffIdentifiedFamilyId'): " + local.getItem('staffIdentifiedFamilyId'); 
        logString += '\n' + "local.getItem('familyId'): " + local.getItem('familyId'); 
        logString += '\n' + "local.getItem('studentId'): " + local.getItem('studentId'); 
        logString += '\n' + "memory.getItem('ppMemberOnDeckJSON'): " + memory.getItem('ppMemberOnDeckJSON'); 
        logString += '\n' + "memory.getItem('ppContactOnDeckJSON'): " + memory.getItem('ppContactOnDeckJSON'); 
        logString += '\n' + "memory.getItem('ppDatabaseOnDeckJSON'): " + memory.getItem('ppDatabaseOnDeckJSON'); 
        logString += '\n' + "memory.getItem('stMemberOnDeckJSON'): " + memory.getItem('stMemberOnDeckJSON'); 
        logString += '\n' + "memory.getItem('stContactOnDeckJSON'): " + memory.getItem('stContactOnDeckJSON'); 
        logString += '\n' + "memory.getItem('stDatabaseOnDeckJSON'): " + memory.getItem('stDatabaseOnDeckJSON'); 
        logString += '\n' + "memory.getItem('spContactOnDeckJSON'): " + memory.getItem('spContactOnDeckJSON'); 
        logString += '\n' + "memory.getItem('spDatabaseOnDeckJSON'): " + memory.getItem('spDatabaseOnDeckJSON'); 
        logString += '\n' + "memory.getItem('enrollmentStepList'): " + memory.getItem('enrollmentStepList'); 
        logString += '\n' + "memory.getItem('enrollmentStepCurrent'): " + memory.getItem('enrollmentStepCurrent'); 
        logString += '\n' + "memory.getItem('enrollmentStepNext'): " + memory.getItem('enrollmentStepNext'); 
        logString += '\n' + "local.getItem('loopExitAfterStep'): " + local.getItem('loopExitAfterStep'); 
        logString += '\n' + "local.getItem('loopExitNow'): " + local.getItem('loopExitNow'); 
        return logString;
    // ø </code Log for Current Enrollment>
    }