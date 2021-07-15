let ppAction = "INSERT|UPDATE|INSERT";
ppAction = "UPDATE|UPDATE|INSERT";
ppAction = "SKIP|SKIP|SKIP";

let ppOptions = "INSERT+UPDATE+SKIP|UPDATE+SKIP|INSERT+SKIP";

let stAction = "INSERT|UPDATE|INSERT";
stAction = "ALERT|ALERT|ALERT";

let stOptions = "INSERT+ALERT|UPDATE+ALERT|INSERT+ALERT";

let spAction = "NA|INSERT|INSERT";
spAction = "NA|SKIP|SKIP";
spAction = "NA|SKIP|SKIP";

let spOptions = "NA|INSERT+SKIP|INSERT+SKIP";


let yyyymmdd = 20210715;
if(yyyymmdd > 20210815){
    ppAction = "ALERT|ALERT|ALERT";
    stAction = "ALERT|ALERT|ALERT";
    spAction = "ALERT|ALERT|ALERT";
}


let Overall = `Two for each, because, well, that is how it always occurs`;
let Else = `Notes on what Else Means`;
let Check = `It seems solid and working`;
let futureTerms = `ready for all Terms _after_ 202106`;

switch (stepKey) {
    case 'IINSTANTIATE':
        await doInstantiateLoopSwitchStep();
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|X| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + 'Pretty OK');
        
        // ø <await actionValueEvaluation()>
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + 'Pretty OK');
        // ø </await actionValueEvaluation()>

        break;
    case 'PREP_ppMember':
        await ppMemberPrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_ppMember':
        await ppMemberExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_stMember':
        await stMemberPrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_stMember':
        await stMemberExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_ppContact':
        await ppContactPrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_ppDatabase':
        await ppDatabasePrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_stContact':
        await stContactPrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_stDatabase':
        await stDatabasePrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_spContact':
        await spContactPrepJSON()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'PREP_spDatabase':
        // await spDatabasePrepJSON()
        await spDatabaseExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~116]Function-Swapped to ppDatabaseExecuteUpsert()')
        break;
    case 'EXECUTE_ppContact':
        await ppContactExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_ppDatabase':
        await ppDatabaseExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_stContact':
        await stContactExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_stDatabase':
        await stDatabaseExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_spContact':
        await spContactExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'EXECUTE_spDatabase':
        await spDatabasePrepJSON()
        local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~133]Function-Swapped to await spDatabasePrepJSON()')
        // spDatabaseExecuteUpsert()
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;
    case 'CCOMPLETE':
        console.log('Step: ' + stepKey);
        console.log('Else: ' + '|O| |O|');
        console.log('Check: ' + '|O| |O|');
        console.log('futureTerms' + '|O| |O|');
        console.log('Notes: ' + '');
        break;

    default:
        errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
        break;
}