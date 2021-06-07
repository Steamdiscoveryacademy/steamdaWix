let stepArray = ['IINSTANTIATE','PREP_ppMember','EXECUTE_ppMember','PREP_stMember','EXECUTE_stMember','PREP_ppContact','PREP_ppDatabase','PREP_stContact','PREP_stDatabase','PREP_spContact','PREP_spDatabase','EXECUTE_ppContact','EXECUTE_ppDatabase','EXECUTE_stContact','EXECUTE_stDatabase','EXECUTE_spContact','EXECUTE_spDatabase','CCOMPLETE'];
if(memory.getItem('enrollmentStepList').indexOf(',') < 0){
    let stepArrayList = stepArray.toString();
    memory.setItem('enrollmentStepList',stepArrayList);
    memory.setItem('enrollmentStepCurrent','PPENDING');
    let stepNext = memory.getItem('enrollmentStepList').substr(0,memory.getItem('enrollmentStepList').indexOf(','));
    memory.setItem('enrollmentStepNext',stepNext);
}
let exitAfter = 'ALL';
let exitNow = 'FFALSE';
exitNow = 'TTRUE_FORCE'; //Force: until logic below is ready
//memory.getItem(List) if indexOf(exitAfter) < indexOf('CCOMPLETE')
exitNow = exitAfter === 'ALL' ? 'TTRUE' : exitNow;
let stepKey = 'PPENDING';
for (let stepArrayIndex = 0; stepArrayIndex < stepArray.length; stepArrayIndex++) {
    stepKey = stepArray[stepArrayIndex];
    console.warn('stepKey[' + stepArrayIndex + ']:' + stepKey);
    let errorString = '';
    switch (stepKey) {
        case 'IINSTANTIATE':
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_ppMember':
            ppMemberPrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_ppMember':
            ppMemberExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_stMember':
            stMemberPrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_stMember':
            stMemberExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_ppContact':
            ppContactPrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_ppDatabase':
            ppDatabasePrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_stContact':
            stContactPrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_stDatabase':
            stDatabasePrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_spContact':
            spContactPrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'PREP_spDatabase':
            spDatabasePrepJSON()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_ppContact':
            ppContactExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_ppDatabase':
            ppDatabaseExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_stContact':
            stContactExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_stDatabase':
            stDatabaseExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_spContact':
            spContactExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'EXECUTE_spDatabase':
            spDatabaseExecuteUpsert()
            consoleLog('Step: ' + stepKey)
        break;
        case 'CCOMPLETE':
            consoleLog('Step: ' + stepKey)
        break;

        default:
            errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
            break;
    }
// ø <ExitAfter Switch Check>
    exitNow = exitAfter === memory.getItem('enrollmentStepCurrent') ? 'EXIT_AFTER_MATCH' : exitNow;
    exitNow = memory.getItem('enrollmentStepCurrent') === 'CCOMPLETE' ? 'EXIT_CCOMPLETE_CURRENT' : exitNow;
    if(exitNow !== 'FFALSE'){
        break;//(Break Loop is Exit)
    }
// ø </ExitAfter Switch Check>
}