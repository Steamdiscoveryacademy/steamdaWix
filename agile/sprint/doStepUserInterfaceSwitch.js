// ø <---------- <doStepUserInterfaceSwitch>  ---------->
export async function doStepUserInterfaceSwitch(stepKey = 'PPENDING') {
    let DOX = `≈Z450≈ pstEnrSeven202108STEPUI BEGIN`;
    local.setItem('logString', local.getItem('logString') + ',' + DOX);

    let errorString = '';
    switch (stepKey) {
        case 'IINSTANTIATE':
            $w('#txtComboName').text = local.getItem('comboName');
            $w('#txtComboName').show();
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_ppMember':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppMember':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stMember':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stMember':
            console.log('Step: ' + stepKey)
            break;
        case 'dedupePpStContact':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_ppContact':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_ppDatabase':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stContact':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_stDatabase':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_spContact':
            console.log('Step: ' + stepKey)
            break;
        case 'PREP_spDatabase':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppContact':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_ppDatabase':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stContact':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_stDatabase':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_spContact':
            console.log('Step: ' + stepKey)
            break;
        case 'EXECUTE_spDatabase':
            console.log('Step: ' + stepKey)
            break;
        case 'CCOMPLETE':
            console.log('Step: ' + stepKey)
            break;

        default:
            errorString = 'stepKey (' + stepKey + ') is Not Supported within this Switch Structure';
            break;
    }
}
// ø <---------- </doStepUserInterfaceSwitch> ---------->