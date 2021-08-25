// ø <---------- <actionValueEvaluation of IINSTANTIATE>  ---------->
export async function actionValueEvaluation() {
    // pstEnrSeven20210825_ActionValueEvaluation
    let tempStamp = await nowISO(local.getItem('timezoneOffset'), local.getItem('tzAbbrv'));
    local.setItem('logString', local.getItem('logString') + '\nLAUNCH\n[~484] Entering actionValueEvaluation() at ' + tempStamp);
    let ppAction = "INSERT|UPDATE|INSERT";
    let stAction = "INSERT|UPDATE|INSERT";
    let spAction = "NA|INSERT|INSERT";

    let staffMatch = local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE' ? false : true;
    if (staffMatch) {
        let staffMatchId = local.getItem('staffIdentifiedFamilyId');
        let contact = await steamdaGetContactFunction(staffMatchId);
        if (contact._id !== staffMatchId) {
            local.setItem('superEnrollmentStatus', 'ALERT');
            local.setItem('logString', local.getItem('logString') + '\n[~548]Staff-Eye-D Does NOT Match Contact Found ID (probably none). AbortForNow');
            // NOT HANDLED: This seems nearly impossible to happen. Good that it's here, but not will Cross-That-Bridge-When-We-Come-To-It
            return;
        }
        if ($w('#radioConfirmStaffEyeD').value !== 'YES') {
            if (contact.source.sourceType.toUpperCase().indexOf('MEMBER') < 0) {
                local.setItem('logString', `ABORT: StaffEyeD Contact does not contain 'MEMBER' in sourceType`);
                return;
            }
        }
        local.setItem('familyId', staffMatchId);
        local.setItem('familyEmail', contact.primaryInfo.email);
        local.setItem('logString', local.getItem('logString') + '\n[~547]staffMatchFoundContact: ' + JSON.stringify(contact, undefined, 4));
        ppAction = "SKIP|UPDATE|INSERT";
    }
    local.setItem('logString', local.getItem('logString') + '\n[~583]staffMatch: ' + staffMatch);

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
        local.setItem('logString', local.getItem('logString') + '\n[~508]ppExistsCount: ' + ppExistsCount);
    }
    // ø </ppAction>

    // ø <stAction>
    if (staffMatch) {
        let stExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();
        stAction = stExistsCount > 0 ? "ALERT|ALERT|ALERT" : stAction;
        local.setItem('logString', local.getItem('logString') + '\n[~523]stExistsCount: ' + stExistsCount);
    }
    // ø </stAction>

    // ø <spAction>
    let checkSecondaryParent = (local.getItem('spFirst')).length === 0 && (local.getItem('spLast')).length === 0 ? false : true;
    let logSecondaryParentReason = '';
    logSecondaryParentReason = checkSecondaryParent === false ? 'Secondary Parent was not filled in in the form' : logSecondaryParentReason;
    console.log(`[~532] If ppAction has 'SKIP' does NOT mean that spAction should be Skipped (added 20210714190800 upon Barak Obama/Joe Biden BUG)`)
    logSecondaryParentReason = checkSecondaryParent === false && logSecondaryParentReason.length === 0 ? 'SKIP because Primary Parent SKIP-ped' : logSecondaryParentReason;
    logSecondaryParentReason = logSecondaryParentReason.length === 0 ? '[continue]' : logSecondaryParentReason;

    local.setItem('logString', local.getItem('logString') + '\n[~536]logSecondaryParentReason: ' + logSecondaryParentReason);
    local.setItem('logString', local.getItem('logString') + '\n[~537]checkSecondaryParent: ' + checkSecondaryParent);
    spAction = !checkSecondaryParent ? "NA|SKIP|SKIP" : spAction;
    if (staffMatch) {
        if (checkSecondaryParent) {
            let spExistsCount = await wixData.query("person")
                .eq("familyId", familyId)
                .eq("role", 'Secondary')
                .eq("termId", termId)
                .count();
            spAction = spExistsCount > 0 ? "NA|SKIP|SKIP" : spAction;
            local.setItem('logString', local.getItem('logString') + '\n[~550]spExistsCount: ' + spExistsCount);
        }
    }
    // ø </spAction>

    let now = new Date();
    let yyyymmdd = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    local.setItem('logString', local.getItem('logString') + '\n[~557]yyyymmdd: ' + yyyymmdd);

    if (yyyymmdd > 20210815) {
        ppAction = "ALERT|ALERT|ALERT";
        stAction = "ALERT|ALERT|ALERT";
        spAction = "ALERT|ALERT|ALERT";
    }

    memory.setItem('ppAction', ppAction);
    memory.setItem('stAction', stAction);
    memory.setItem('spAction', spAction);

    let allActionStrings = memory.getItem('ppAction') + memory.getItem('stAction') + memory.getItem('spAction');
    let superEnrollmentStatus = local.getItem('superEnrollmentStatus');
    superEnrollmentStatus = allActionStrings.indexOf('ALERT') >= 0 ? 'ALERT' : superEnrollmentStatus;
    local.setItem('logString', local.getItem('logString') + '\n[~576]superEnrollmentStatus: ' + superEnrollmentStatus);
    local.setItem('superEnrollmentStatus', superEnrollmentStatus);
    local.setItem('logString', local.getItem('logString') + '\n[~578]Exiting: ' + 'actionValueEvaluation()');
}
// ø <---------- </actionValueEvaluation of IINSTANTIATE> ---------->