export function doEnrollmentCleanupNew(){
    // ø <code Cleanup for New Enrollment>
        local.setItem('staffIdentifiedFamilyId','EEMPTY');
        local.setItem('ondeckEnrollmentJSON','EEMPTY');
        local.setItem('studentId','EEMPTY');
        //memory.setItem('the Nine-ish blocks of Code','EEMPTY');
        memory.setItem('enrollmentStepList','EEMPTY');
        memory.setItem('enrollmentStepCurrent','EEMPTY');
        memory.setItem('enrollmentStepNext','EEMPTY');
    // ø </code Cleanup for New Enrollment>
    }
    
    
    export function doEnrollmentCleanupCurrent(){
    // ø <code Cleanup for Current Enrollment> mostly for testing
        local.setItem('staffIdentifiedFamilyId','EEMPTY');
        /*Not CURRENT*///local.setItem('ondeckEnrollmentJSON','EEMPTY');
        local.setItem('studentId','EEMPTY');
        //memory.setItem('the Nine-ish blocks of Code','EEMPTY');
        memory.setItem('enrollmentStepList','EEMPTY');
        memory.setItem('enrollmentStepCurrent','EEMPTY');
        memory.setItem('enrollmentStepNext','EEMPTY');
    // ø </code Cleanup for Current Enrollment>
    }
    