export function doEnrollmentCleanupNew(){
    // ø <code Cleanup for New Enrollment>
        local.setItem('ondeckEnrollmentJSON','EEMPTY');
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
    // ø </code Cleanup for New Enrollment>
    }
    
    
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
    // ø </code Cleanup for Current Enrollment>
    }