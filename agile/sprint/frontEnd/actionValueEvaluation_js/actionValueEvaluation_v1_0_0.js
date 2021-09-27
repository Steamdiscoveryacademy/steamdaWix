// ø <---------- <actionValueEvaluation of IINSTANTIATE>  ---------->
export async function actionValueEvaluation() {
    // local.setItem('superEnrollmentStatus', 'CONTINUE'); ALREADY SET
    // 202109_ActionValues
    let DOX = 'To Make It Visible';
    console.groupCollapsed('actionValueEvaluation');
    console.log('≈1676≈ actionValueEvaluation(); ENTERED');

    // pstEnrSeven20210825_ActionValueEvaluation
    let tempStamp = await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv'));
    local.setItem('logString', local.getItem('logString') + '\nLAUNCH\n[~Z484] Entering actionValueEvaluation() at ' + tempStamp);
    // <defaults>
    let ppAction = "INSERT|UPDATE|INSERT";
    let stAction = "INSERT|UPDATE|INSERT";
    let spAction = "NA|INSERT|INSERT";
    // </defaults>

    let staffMatch = local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE' ? false : true;
    console.log(`≈1687≈ staffMatch; ${staffMatch}`);
    if (staffMatch) {
        let staffMatchId = local.getItem('staffIdentifiedFamilyId');
        let contact = await steamdaGetContactFunction(staffMatchId);
        console.dir(contact);
        if (contact._id !== staffMatchId) {
            local.setItem('superEnrollmentStatus', 'ALERT');
            memory.setItem('stepResponseBootstrapKey','danger');
            await appendStepLogPPEQ('danger', `'Staff Eye-D' does not match actual 'Contact ID': '${contact._id}'`);
            local.setItem('logString', local.getItem('logString') + '\n[~1189]Staff-Eye-D Does NOT Match Contact Found ID (probably none). AbortForNow');
            console.log(`≈1694≈ staffMatch; local.getItem('superEnrollmentStatus'): ${local.getItem('superEnrollmentStatus')}`);
            return;
        }
        console.log(`≈1697≈ staffMatch; local.getItem('superEnrollmentStatus'): ${local.getItem('superEnrollmentStatus')}`);
        if (DOX !== 'YES -  But the whole If-Clause should always be run, the Manual Confirmation is a thing of the past') {
            console.log(`≈1700≈ contact.source.sourceType: could be MOOT but 'MEMBER' or 'IMPORT' supported now`);
            let sourceType = contact.source.sourceType.toUpperCase();
            let supportedSourceTypeArray = ['MEMBER','IMPORT','ADMIN','WIX_STORES','WIX_SITE_MEMBERS','zOTHER']
            if (supportedSourceTypeArray.includes(sourceType) === false) {
                local.setItem('superEnrollmentStatus', 'ALERT');
                memory.setItem('stepResponseBootstrapKey','danger');
                await appendStepLogPPEQ('danger', `'Staff Eye-D' Contact is of unsupported Source Type: '${sourceType}'`);
                local.setItem('logString', `[~1194] ABORT: StaffEyeD Contact does not contain 'MEMBER' in sourceType`);
                console.log(`≈1703≈ ABORT: StaffEyeD Contact does not contain 'MEMBER' in sourceType`);
                return;
            }
        console.log(`≈1706≈ contact.source.sourceType.toUpperCase().indexOf('MEMBER'): ${contact.source.sourceType.toUpperCase().indexOf('MEMBER')}`);
        console.log(`≈1707≈ contact.source.sourceType.toUpperCase().indexOf('INDEX'): ${contact.source.sourceType.toUpperCase().indexOf('IMPORT')}`);
        }
        local.setItem('familyId', staffMatchId);
        console.log(`≈1710≈ local.getItem('familyId'): ${local.getItem('familyId')}`);
        local.setItem('familyEmail', contact.primaryInfo.email);
        local.setItem('logString', local.getItem('logString') + '\n[~Z547]staffMatchFoundContact: ' + JSON.stringify(contact, undefined, 4));
        ppAction = "SKIP|UPDATE|INSERT";
    }
    local.setItem('logString', local.getItem('logString') + '\n[~Z583]staffMatch: ' + staffMatch);

    let familyId = local.getItem('staffIdentifiedFamilyId');
    let termId = Number(local.getItem('termId'));
    let studentLegalFirst = local.getItem('stFirst');

    // ø <ppAction>
    // ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    if (staffMatch) {
        let ppExistsCount = await wixData.query("person")
            .eq("personId", familyId)
            .eq("termId", termId)
            .count();
        ppAction = ppExistsCount > 0 ? "SKIP|SKIP|SKIP" : ppAction;
        console.log(`existing PP for this Term: usually additional children|ppExistsCount > 0 ? "SKIP|SKIP|SKIP"`);
        local.setItem('logString', local.getItem('logString') + '\n[~Z508]ppExistsCount: ' + ppExistsCount);
    }
    // ø </ppAction>

    // ø <stAction>
    if (staffMatch) {
        if(202106 < Number(local.getItem('termId'))){
                stAction = "ALERT|ALERT|ALERT";
                local.setItem('superEnrollmentStatus', 'ALERT');
                memory.setItem('stepResponseBootstrapKey','danger');
                await appendStepLogPPEQ('danger', `Logic Required: Check for Same Student Previous Term`);
                local.setItem('logString', local.getItem('logString') + '\n[~1817] Logic Required: Check for Same Student Previous Term');
                console.log(`Logic Required: Check for Same Student Previous Term`);
        }
        let stExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();
        if(stExistsCount > 0){
            stAction = "ALERT|ALERT|ALERT";
            local.setItem('superEnrollmentStatus', 'ALERT');
            memory.setItem('stepResponseBootstrapKey','danger');
            await appendStepLogPPEQ('danger', `Unaccepatable Anomaly: Student Already Exist for the Current Term`);
            local.setItem('logString', local.getItem('logString') + '\n[~Z523]stExistsCount: ' + stExistsCount);
            console.log(`Unaccepatable Anomaly: Student Already Exist for the Current Term`);
        }
    }
    // ø </stAction>

    // ø <spAction>
    console.groupCollapsed('<spAction>')
    console.log(`init: spAction: ${spAction}`)
    let checkSecondaryParent = (local.getItem('spFirst')).length === 0 && (local.getItem('spLast')).length === 0 ? false : true;
    let logSecondaryParentReason = '';
    logSecondaryParentReason = checkSecondaryParent === false ? 'Secondary Parent was not filled in in the form' : logSecondaryParentReason;
    console.log(`[~Z532] If ppAction has 'SKIP' does NOT mean that spAction should be Skipped (added 20210714190800 upon Barak Obama/Joe Biden BUG)`)
    logSecondaryParentReason = checkSecondaryParent === false && logSecondaryParentReason.length === 0 ? 'SKIP because Primary Parent SKIP-ped' : logSecondaryParentReason;
    logSecondaryParentReason = logSecondaryParentReason.length === 0 ? '[continue]' : logSecondaryParentReason;

    local.setItem('logString', local.getItem('logString') + '\n[~Z536]logSecondaryParentReason: ' + logSecondaryParentReason);
    local.setItem('logString', local.getItem('logString') + '\n[~Z537]checkSecondaryParent: ' + checkSecondaryParent);
    spAction = !checkSecondaryParent ? "NA|SKIP|SKIP" : spAction;
    console.log(`!checkSecondaryParent[!${checkSecondaryParent}]: spAction: ${spAction}`)
    console.log(`spAction: by Secondary in Application: ${spAction}`);
    if (staffMatch) {
        if(202106 < Number(local.getItem('termId'))){
                spAction = "ALERT|ALERT|ALERT";
                local.setItem('superEnrollmentStatus', 'ALERT');
                memory.setItem('stepResponseBootstrapKey','danger');
                await appendStepLogPPEQ('danger', `Logic Required: Check for Same Secondary Parent Previous Term`);
                local.setItem('logString', local.getItem('logString') + '\n[~1817] Logic Required: Check for Same Secondary Parent Previous Term');
                console.log(`Logic Required: Check for Same Secondary Parent Previous Term`);
        }
        if (checkSecondaryParent) {
            let spExistsCount = await wixData.query("person")
                .eq("familyId", familyId)
                .eq("role", 'Secondary')
                .eq("termId", termId)
                .count();
            spAction = spExistsCount > 0 ? "NA|SKIP|SKIP" : spAction;
            if (spExistsCount > 0) {
                let spPerson = await wixData.query("person")
                    .eq("familyId", familyId)
                    .eq("role", 'Secondary')
                    .eq("termId", termId)
                    .find();
                // console.log('spPerson')                
                // console.dir(spPerson) 
                let secondaryId = spPerson.items[0].personId    
                // console.log(`secondaryId: ${secondaryId}`)
                local.setItem('secondaryId',secondaryId)           
                console.log(`local.getItem('secondaryId'): ${local.getItem('secondaryId')}`)
            }
            console.log(`spAction: by Exist in Database: ${spAction}`);
            local.setItem('logString', local.getItem('logString') + '\n[~Z550]spExistsCount: ' + spExistsCount);
        }
    }
    console.groupEnd()
    // ø </spAction>

    let now = new Date();
    let yyyymmdd = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    local.setItem('logString', local.getItem('logString') + '\n[~Z557]yyyymmdd: ' + yyyymmdd);

    if (yyyymmdd > Number(local.getItem('termEndYYYYMMDD'))) {
        ppAction = "ALERT|ALERT|ALERT";
        stAction = "ALERT|ALERT|ALERT";
        spAction = "ALERT|ALERT|ALERT";
        local.setItem('superEnrollmentStatus', 'ALERT');
        memory.setItem('stepResponseBootstrapKey','danger');
        await appendStepLogPPEQ('danger', `Today is Past the End of the Current Term`);
        console.log(`Today is Past the End of the Current Term: ${memory.getItem('stepResponseBootstrapKey')}`);
    }

    memory.setItem('ppAction', ppAction);
    memory.setItem('stAction', stAction);
    memory.setItem('spAction', spAction);

    let allActionStrings = memory.getItem('ppAction') + memory.getItem('stAction') + memory.getItem('spAction');
    let superEnrollmentStatus = local.getItem('superEnrollmentStatus');
    superEnrollmentStatus = allActionStrings.indexOf('ALERT') >= 0 ? 'ALERT' : superEnrollmentStatus;
    local.setItem('logString', local.getItem('logString') + '\n[~Z576]superEnrollmentStatus: ' + superEnrollmentStatus);
    local.setItem('superEnrollmentStatus', superEnrollmentStatus);
    local.setItem('logString', local.getItem('logString') + '\n[~Z578]Exiting: ' + 'actionValueEvaluation()');
    console.log(`superEnrollmentStatus: ${superEnrollmentStatus}')}`);
    console.log(`local.getItem('superEnrollmentStatus'): ${local.getItem('superEnrollmentStatus')}')}`);
    console.groupEnd();
}
// ø <---------- </actionValueEvaluation of IINSTANTIATE> ---------->