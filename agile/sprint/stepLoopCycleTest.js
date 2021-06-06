let memoryGetItemEnrollmentStepList = "RRESET";
if(memoryGetItemEnrollmentStepList.indexOf(',') < 0){
    memoryGetItemEnrollmentStepList = "IINSTANTIATE,PREP_ppMember,EXECUTE_ppMember,PREP_stMember,EXECUTE_stMember,PREP_ppContact,PREP_ppDatabase,PREP_stContact,PREP_stDatabase,PREP_spContact,PREP_spDatabase,EXECUTE_ppContact,EXECUTE_ppDatabase,EXECUTE_stContact,EXECUTE_stDatabase,EXECUTE_spContact,EXECUTE_spDatabase,CCOMPLETE";
    memoryGetItemEnrollmentStepCurrent = 'PPENDING';
    memoryGetItemEnrollmentStepNext = memoryGetItemEnrollmentStepList.substr(0,memoryGetItemEnrollmentStepList.indexOf(','));
}

// let exitAfter = 'ALL';
let exitAfter = 'EXECUTE_ppMember​​​';
let exitNow = 'FFALSE';
// exitNow = 'TTRUE'; //Force: until logic below is ready
//memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')
exitNow = exitAfter === 'ALL' ? 'TTRUE' : exitNow;
// ø <cycleStepList>
let i = 0;
while (i < 77) {
    i++;
    // let list = memory.getItem('enrollmentStepList');
    let list = memoryGetItemEnrollmentStepList;
    // let cycleThis = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));
    let cycleThis = memoryGetItemEnrollmentStepList.substr(0,memoryGetItemEnrollmentStepList.indexOf(','));
    console.log('cycleThis: ' + cycleThis);
    // let newList = memory.getItem('enrollmentStepList').substr(memory.getItem('enrollmentStepList').indexOf(',') + 1);
    let newList = memoryGetItemEnrollmentStepList.substr(memoryGetItemEnrollmentStepList.indexOf(',') + 1);
    // console.log('newList: ' + newList);
    newList += ',' + cycleThis;
    cycleThis = memoryGetItemEnrollmentStepList.substr(0,memoryGetItemEnrollmentStepList.indexOf(','));
    memoryGetItemEnrollmentStepList = newList;
    // memory.setItem('enrollmentStepList',newList);
    
    
    // // memory.setItem('enrollmentStepCurrent','PPENDING');
    // memoryGetItemEnrollmentStepCurrent = cycleThis;
    // let indexOf = memory.getItem('enrollmentStepList').indexOf(',');
    let indexOf = memoryGetItemEnrollmentStepList.indexOf(',');
    // let stepNext = memory.getItem('enrollmentStepList').substr(0,indexOf + 1);
    // // memory.setItem('enrollmentStepNext',stepNext);
    memoryGetItemEnrollmentStepCurrent = memoryGetItemEnrollmentStepList.substr(0,indexOf);
    // indexOf = memoryGetItemEnrollmentStepList.indexOf(',',indexOf + 1);
    memoryGetItemEnrollmentStepNext = memoryGetItemEnrollmentStepList.substr(indexOf + 1);
    memoryGetItemEnrollmentStepNext = memoryGetItemEnrollmentStepNext.substr(0,memoryGetItemEnrollmentStepNext.indexOf(','));
    exitNow = exitAfter === memoryGetItemEnrollmentStepCurrent ? 'EXIT_AFTER_MATCH' : exitNow;
    exitNow = memoryGetItemEnrollmentStepCurrent === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;
    
    if(exitNow !== 'FFALSE'){
        break;//(Break Loop is Exit)
    }
}
// ø </cycleStepList>



console.warn('exitNow: ' + exitNow);
console.warn('memoryGetItemEnrollmentStepCurrent: ' + memoryGetItemEnrollmentStepCurrent);
console.warn('memoryGetItemEnrollmentStepNext: ' + memoryGetItemEnrollmentStepNext);
console.warn('memoryGetItemEnrollmentStepList: ');
console.warn(memoryGetItemEnrollmentStepList);