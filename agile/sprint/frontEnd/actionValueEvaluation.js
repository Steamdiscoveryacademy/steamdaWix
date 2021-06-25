// ø <---------- <actionValueEvaluation of IINSTANTIATE>  ---------->
export async function actionValueEvaluation(){
    
    let ppAction = "INSERT|UPDATE|INSERT";
    let stAction = "INSERT|UPDATE|INSERT";
    let spAction = "NA|INSERT|INSERT";
    
    let staffMatch = local.getItem('staffIdentifiedFamilyId') === 'INSTANTIATE' ? false : true;
    let familyId = local.getItem('staffIdentifiedFamilyId');
    let termId = local.getItem('termId');
    let studentLegalFirst = local.getItem('stFirst');
    
    // ø <ppAction>
    ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    // ppAction = staffMatch ? "UPDATE|UPDATE|INSERT" : ppAction;
    if(staffMatch){
        // let ppCount = Number(memory.setItem('SQL','SELECT count from person
        // where personId = familyId AND termId = 202106'));
        let ppExistsCount = await wixData.query("person")
            .eq("personId", familyId)
            .eq("termId", termId)
            .count();
        ppAction = ppExistsCount > 0 ? "SKIP|SKIP|SKIP" : ppAction;
    }
    // ø </ppAction>
    
    // ø <stAction>
    if(staffMatch){
        // let stCount = Number(memory.setItem('SQL','SELECT count from person
        // where familyId = familyId AND termId = 202106 AND legalFirst =
        // stFirst'));
        let stExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("firstLegal", studentLegalFirst)
            .eq("termId", termId)
            .count();
        stAction = stExistsCount > 0 ? "ALERT|ALERT|ALERT" : stAction;
    }
    // ø </stAction>
    
    // ø <spAction>
    let checkSecondaryParent = (local.getItem('spFirst')).length === 0 && (local.getItem('spLast')).length === 0 ? false : true;
    checkSecondaryParent = ppAction.indexOf('SKIP') >= 0 ? false : checkSecondaryParent;
    spAction = !checkSecondaryParent ? "NA|SKIP|SKIP" : spAction;
    if(staffMatch){
        // let spCount = Number(memory.setItem('SQL','SELECT count from person
        // where familyId = familyId AND termId = 202106 AND role =
        // Secondary'));
        if (checkSecondaryParent) {
            let spExistsCount = await wixData.query("person")
            .eq("familyId", familyId)
            .eq("role", 'Secondary')
            .eq("termId", termId)
            .count();
        spAction = spExistsCount > 0 ? "NA|SKIP|SKIP" : spAction;
        }
    }
    // ø </spAction>
    
    let now = new Date();
    let yyyymmdd = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    
    if(yyyymmdd > 20210815){
        ppAction = "ALERT|ALERT|ALERT";
        stAction = "ALERT|ALERT|ALERT";
        spAction = "ALERT|ALERT|ALERT";
    }

    // local.setItem('ppAction', '');
    // local.setItem('stAction', '');
    // local.setItem('spAction', '');
    memory.setItem('ppAction', ppAction);
    memory.setItem('stAction', stAction);
    memory.setItem('spAction', spAction);
    
    let allActionStrings = memory.getItem('ppAction') + memory.getItem('stAction') + memory.getItem('spAction');
    let superEnrollmentStatus = local.getItem('superEnrollmentStatus');
    superEnrollmentStatus = allActionStrings.indexOf('SKIP') >= 0 && allActionStrings.indexOf('SKIP') < 12 ? 'SKIP' : superEnrollmentStatus;
    superEnrollmentStatus = allActionStrings.indexOf('ALERT') >= 0 ? 'ALERT' : superEnrollmentStatus;
    
    local.setItem('superEnrollmentStatus',superEnrollmentStatus);
}
// ø <---------- </actionValueEvaluation of IINSTANTIATE> ---------->