//doInstantiateExitAfterFunction: 

// ø <---------- <doInstantiateExitAfter>  ---------->
export function doInstantiateExitAfter(exitAfter = 'FFALSE'){
    let exitNow = 'FFALSE';
    //exitNow = 'TTRUE_FORCE'; //Force: until logic below is ready
    exitNow = exitAfter === 'ALL' ? 'TTRUE_ALL' : exitNow;
    memory.setItem('loopExitAfterStep',exitAfter);
    memory.setItem('loopExitNow',exitNow);
}
// ø <---------- </doInstantiateExitAfter> ---------->

//exitAfterSwitchCheckFunction: 

// ø <---------- <doCheckExitAfter> ---------->
export function doCheckExitAfter(){
// ø <ExitAfter Switch Check>
    let exitNow = memory.getItem('loopExitNow')
    let exitAfter = memory.getItem('loopExitAfterStep')
    exitNow = exitAfter === memory.getItem('enrollmentStepCurrent') ? 'EXIT_AFTER_MATCH' : exitNow;
    exitNow = memory.getItem('enrollmentStepCurrent') === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;
    memory.setItem('loopExitNow',exitNow);
// ø </ExitAfter Switch Check>
}
// ø <---------- <doCheckExitAfter> ---------->