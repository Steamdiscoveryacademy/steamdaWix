// ø <---------- <ppDatabasePrepJSON AS Step-Function>  ---------->
export async function ppDatabasePrepJSON(){
    //ppDatabaseINSERT - actually, but renaming not worth it
    // console.log("[~734]ppDatabaseINSERT - actually, but renaming not worth it")

    // let familyId = local.getItem('familyId');
    let familyId = $w('#txtFamilyId').value;
    //let termId = Number(local.getItem('termId'));
    let termId = Number($w('#txtTermId').value);

    // ø <CHECK FOR EXISTING>
    let ppExistsCount = await wixData.query("person")
        .eq("personId", familyId)
        .eq("termId", termId)
        .count();

    if (ppExistsCount > 0) {
        memory.setItem('ppDatabasePrepJSON',"primaryParent person exists for this term");
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('ppLast') + ', ' + local.getItem('ppFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    // toInsert.personId = local.getItem('familyId');
    toInsert.personId = familyId;
    // toInsert.familyId = local.getItem('familyId');
    toInsert.familyId = familyId;
    toInsert.role = 'Primary';
    toInsert.first = local.getItem('ppFirst');
    toInsert.last = local.getItem('ppLast');
    toInsert.firstLegal = local.getItem('ppFirst');
    toInsert.fullName = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    // toInsert.idHH = local.getItem('familyId');
    toInsert.idHH = familyId;
    // toInsert.idBL = local.getItem('familyId');
    toInsert.idBL = familyId;
    // toInsert.altPersonId = local.getItem('familyId');
    toInsert.altPersonId = familyId;
    // toInsert.termId = local.getItem('termId');
    toInsert.termId = termId;
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    toInsert.objectData = JSON.stringify(enrollmentObject.family);
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->

    // ø <---------- <INSERT>  ---------->
    let ppInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->

    memory.setItem('ppDatabasePrepJSON',JSON.stringify(ppInsertResult));
    return;

}
// ø <---------- </ppDatabasePrepJSON AS Step-Function> ---------->
