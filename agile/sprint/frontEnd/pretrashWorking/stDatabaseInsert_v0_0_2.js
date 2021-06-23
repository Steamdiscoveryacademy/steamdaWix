export async function pretrashFindStByFamilyIdLegalFirst(){
    let logString = '';
    let exceptionLogArray = [];
    
    let familyId = $w('#txtFamilyId').value;
    // familyId = local.getItem('familyId');
    let termId = Number($w('#txtTermId').value);
    // termId = Number(local.getItem('termId'));

    // let studentId = local.getItem('studentId');
    let studentId = $w('#txStudentId').value;

    // let studentLegalFirst = local.getItem('stFirst');
    let studentLegalFirst = $w('#txStudentLegalFirst').value;

    logString += '\n' + "local.getItem('familyId'): " + familyId;
    logString += '\n' + "local.getItem('termId'): " + termId;


    // ø <CHECK FOR EXISTING>
    let stExistsCount = await wixData.query("person")
        .eq("familyId", familyId)
        .eq("firstLegal", studentLegalFirst)
        .eq("termId", termId)
        .count();

    if (stExistsCount > 0) {
        exceptionLogArray.push("Student person exists for this familyId, legalFirstName and term");
    }


    logString +='\n' + "stExistsCount: " + stExistsCount;

    let exceptionLogBlock = '';
    exceptionLogArray.forEach(exceptionLog => {
        if(exceptionLogBlock.length === 0){
            exceptionLogBlock = `
EXCEPTION LOG BLOCK:
====================`;
        }
        exceptionLogBlock += '\n' + exceptionLog;
    });
    logString += exceptionLogBlock;



    if(exceptionLogBlock.length > 0){
        logString += '\n' + 'RETURN NO INSERT';
        $w('#preTrashLog').value = logString;
        return;
    }
    // ø </CHECK FOR EXISTING>

    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    // toInsert.personId = local.getItem('familyId');
    toInsert.personId = studentId;
    // toInsert.familyId = local.getItem('familyId');
    toInsert.familyId = familyId;
    toInsert.role = 'Student';
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = local.getItem('stFirst');
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('stLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    // toInsert.idHH = local.getItem('familyId');
    toInsert.idHH = familyId;
    // toInsert.idBL = local.getItem('familyId');
    toInsert.idBL = familyId;
    // toInsert.altPersonId = local.getItem('studentId');
    toInsert.altPersonId = studentId;
    // toInsert.termId = local.getItem('termId');
    toInsert.termId = termId;
    // ø <---------- </direct (or nearly)> ---------->
    // ø <---------- <complex>  ---------->
    // ø <---------- <complex Test with Direct>  ---------->
    let testObjectData = {};
    testObjectData.family = "family data";
    let testObjectCorollary = {};
    testObjectCorollary.corollary = "course data";
    toInsert.objectData = local.getItem('ondeckEnrollmentJSON');
    // toInsert.objectData = JSON.stringify(testObjectData);
    toInsert.objectCorollary = JSON.stringify(testObjectCorollary);
    // ø <---------- </complex Test with Direct> ---------->
    // ø <---------- </complex> ---------->
    logString = JSON.stringify(toInsert,undefined,4);
    logString += "==========";
    logString += '\n' + 'INSERT INDICATED (SKIPPED)';
    $w('#stDatabaseResponseJSON').value = logString;
    // return;


    // ø <---------- <INSERT>  ---------->
    let stInsertResult  = await wixData.insert("person", toInsert)
    // ø <---------- </INSERT> ---------->
    logString += JSON.stringify(toInsert,undefined,4);;
  
    $w('#preTrashLog').value = JSON.stringify(stInsertResult,undefined,4);
    return;

}// END function pretrashFindStByFamilyIdLegalFirst()