// ! Get stepArrayOrig from overallEnrollmentStepLoopAutoDox.js

// ø <---------- <instantiateLoopSwitchEnrollmentSteps>  ---------->
export function instantiateLoopSwitchEnrollmentSteps(){
    // let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    let stepList = stepArrayOrig.toString();
	memory.setItem('enrollmentStepList',stepList);
	memory.setItem('enrollmentStepCompleted','NNOT_AAPPLICABLE');
	memory.setItem('enrollmentStepCurrent',stepArrayOrig[0]);
	memory.setItem('enrollmentStepNext',stepArrayOrig[1]);
}
// ø <---------- </instantiateLoopSwitchEnrollmentSteps> ---------->
