// ø <---------- <doStepUserInterfaceSwitch>  ---------->
// pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH
export async function doStepSwitch(stepKey = 'PPENDING') {
    let DOX = `≈Z450≈ pstEnrSeven202108STEP_SALS_EXE_SWITCH BEGIN`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
    // ø <Messaging Testing> 
    // pstEnrSeven20210822_MESSAGING
    // pstEnrSeven202108STEP_CORE_SWITCH
    //PRETRASH_tobeDISABLEDandEventuallyREMOVED
    let primaryStepArray = ['IINSTANTIATE'];
    let infoStepArray = ['IINSTANTIATE'];
    let successStepArray = ['IINSTANTIATE'];
    let warningStepArray = ['HOLDER'];
    let dangerStepArray = ['HOLDER'];
    let bootstrapKeyArray = ['HOLDER'];
    let bootstrapKey = 'HOLDER';
    let bootstrapMessage = 'HOLDER';
    let responseNumber = 777;
    if(primaryStepArray.includes(stepKey)){
        bootstrapKey = 'PrImArY';
        appendStepLogPPEQ(bootstrapKey, `Override Base Primary with Different ${bootstrapKey} for ${stepKey}`);
    }
    if(infoStepArray.includes(stepKey)){
        bootstrapKey = 'iNfO';
        appendStepLogPPEQ(bootstrapKey, `Override Base Info with Different ${bootstrapKey} for ${stepKey}`);
    }
    if(successStepArray.includes(stepKey)){
        bootstrapKey = 'SuCcEsS';
        appendStepLogPPEQ(bootstrapKey, `Override Base Success with Different ${bootstrapKey} for ${stepKey}`);
    }
    if(warningStepArray.includes(stepKey)){
        bootstrapKeyArray = ['aLeRt','notice','WARNING'];
        bootstrapKey = bootstrapKeyArray[Math.floor(Math.random() * bootstrapKeyArray.length)];
        appendStepLogPPEQ(bootstrapKey, `Override Base Success with Different ${bootstrapKey} for ${stepKey}`);
    }
    if(dangerStepArray.includes(stepKey)){
        bootstrapKeyArray = ['EmErGeNcY','cRiTiCaL','error','DANGER'];
        bootstrapKey = bootstrapKeyArray[Math.floor(Math.random() * bootstrapKeyArray.length)];
        appendStepLogPPEQ(bootstrapKey, `Override Base Success with Different ${bootstrapKey} for ${stepKey}`);
    }
    // ø </Messaging Testing> 
    
    // memory.setItem('stepLogString',memory.getItem('stepLogString') + `info=doStepSwitch(${stepKey})=454|`);

    // return;
    let errorString = '';
    switch (stepKey) {
        case 'IINSTANTIATE':
            await doInstantiateLoopSwitchStep();
            // pstEnrSeven202108STEP_CORE_SWITCH
            // YIKES boxConfirmStaffEyeD
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_ppMember':
            // await ppMemberPrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppMember':
            // await ppMemberExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stMember':
            // await stMemberPrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stMember':
            // await stMemberExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;


        case 'dedupePpStContact':
            // await ppStContactDedupe()

            // responseNumber = Math.ceil(Math.random() * 100);
            // if(responseNumber > 0 && responseNumber < 50){bootstrapMessage = `The Duplicate Contact Anomaly was not present No Action Required [${responseNumber}]`; bootstrapKey = 'success';}
            // if(responseNumber > 49 && responseNumber < 64){bootstrapMessage = `The Duplicate Contact Anomaly was present for the Primary Parent and Handled Successfully [${responseNumber}]`; bootstrapKey = 'warning';}
            // if(responseNumber > 63 && responseNumber < 78){bootstrapMessage = `The Duplicate Contact Anomaly was present for the Student and Handled Successfully [${responseNumber}]`; bootstrapKey = 'warning';}
            // if(responseNumber > 77 && responseNumber < 92){bootstrapMessage = `The Duplicate Contact Anomaly was present for both Primary Parent & Student and Handled Successfully [${responseNumber}]`; bootstrapKey = 'warning';}
            // if(responseNumber > 91 && responseNumber < 101){bootstrapMessage = `The Duplicate Contact Anomaly was present the Logic Failed to Handle it [${responseNumber}]`; bootstrapKey = 'danger';}
            // appendStepLogPPEQ(bootstrapKey, bootstrapMessage);
            console.log('Step: ' + stepKey)
            break;



        case 'PREP_ppContact':
            // await ppContactPrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_ppDatabase':
            // await ppDatabasePrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stContact':
            // await stContactPrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stDatabase':
            // await stDatabasePrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_spContact':
            // await spContactPrepJSON()
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_spDatabase':
            // await spDatabasePrepJSON()
            // await spDatabaseExecuteUpsert()
            console.log('Step: ' + stepKey)
            local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~Z116]Function-Swapped to ppDatabaseExecuteUpsert()')
            break;
        case 'EXECUTE_ppContact':
            // await ppContactExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppDatabase':
            // await ppDatabaseExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stContact':
            // await stContactExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stDatabase':
            // await stDatabaseExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_spContact':
            // await spContactExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_spDatabase':
            // await spDatabasePrepJSON()
            local.setItem('logString', local.getItem('logString') + '\n' + 'Step: ' + stepKey + '; [~Z133]Function-Swapped to await spDatabasePrepJSON()')
            // spDatabaseExecuteUpsert()
            console.log('Step: ' + stepKey)
            break;
        case 'CCOMPLETE':
            console.log('Step: ' + stepKey)
            break;

        default:
            errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
            break;
    }
    DOX = `≈Z602≈ ==> pstEnrSeven202108STEP_SALS_EXE_SWITCH ==> Return to pstEnrSeven SWITCH ==> pstEnrSeven202108STEP_SALS_SWITCH`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);
}
// pstEnrSeven202108STEPS_ARRAY_LOOP_SWITCH
// ø <---------- </doStepUserInterfaceSwitch> ---------->