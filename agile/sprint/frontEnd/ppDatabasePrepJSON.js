// ø <---------- <ppDatabasePrepJSON AS Step>  ---------->
export function ppDatabasePrepJSON(toInsert){
    // ø <CHECK FOR EXISTING>
    // ! SEARCH 'personId' === local.getItem('familyId')
    // ! IF then SKIP (every child needs to be as good as the first)
    // !   ↪ circle-back with Student Full Object if needed
    // ø </CHECK FOR EXISTING>
    let now = new Date();
    let timeDateString = ' [ on ' + now.toLocaleDateString() + ']';
    timeDateString = now.toLocaleTimeString('en-US') + timeDateString;
    let stepStampArrayObject = JSON.parse(memory.getItem('stepStampArray'));
    let stampArrayElementObject = {};
    stampArrayElementObject.step = memory.getItem('enrollmentStepCurrent');
    stampArrayElementObject.stamp = timeDateString;
    stepStampArrayObject.stampArray.push(stampArrayElementObject);
    memory.setItem('stepStampArray',JSON.stringify(stepStampArrayObject));    
    // ø <---------- timeDateString ---------->
    
    // ø <---------- <direct (or nearly)>  ---------->
    let enrollmentObject = JSON.parse(local.getItem('ondeckEnrollmentJSON'));
    let lastFirst = local.getItem('ppLast') + ', ' + local.getItem('ppFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = local.getItem('familyId');
    toInsert.familyId = local.getItem('familyId');
    toInsert.role = local.getItem('parentPrimary');
    toInsert.first = local.getItem('ppFirst');
    toInsert.last = local.getItem('ppLast');
    toInsert.firstLegal = local.getItem('ppFirst');
    toInsert.fullName = local.getItem('ppFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = local.getItem('familyId');
    toInsert.idBL = local.getItem('familyId');
    toInsert.altPersonId = local.getItem('familyId');
    // ø <---------- </direct (or nearly)> ---------->
    // let studentElement = {};
    // studentElement.id = local.getItem('studentId');
    // studentElement.courses_array = enrollmentObject.courses_array;
    toInsert.objectData = JSON.stringify(enrollmentObject.family);
    // toInsert.objectCorollary = JSON.stringify(enrollmentObject.courses_array);
}
// ø <---------- </ppDatabasePrepJSON AS Step> ---------->