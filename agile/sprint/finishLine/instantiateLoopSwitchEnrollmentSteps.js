
// ø <---------- <instantiateLoopSwitchEnrollmentSteps>  ---------->
export function instantiateLoopSwitchEnrollmentSteps(){
    let stepArrayOrig = [ 'IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE' ];
    
	memory.setItem('enrollmentStepList','IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_ppContact,EXECUTE_ppContact,PREP_ppDatabase,EXECUTE_ppDatabase,PREP_stMember,EXECUTE_stMember,PREP_stContact,EXECUTE_stContact,PREP_stDatabase,EXECUTE_stDatabase,PREP_spContact,EXECUTE_spContact,PREP_spDatabase,EXECUTE_spDatabase,CCOMPLETE');
	memory.setItem('enrollmentStepCurrent','PPENDING');
	let stepNext = stepArrayOrig[1];
	memory.setItem('enrollmentStepNext',stepNext);
}
// ø <---------- </instantiateLoopSwitchEnrollmentSteps> ---------->
