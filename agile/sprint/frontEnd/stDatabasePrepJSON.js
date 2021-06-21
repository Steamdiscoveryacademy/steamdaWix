// ø <---------- <stDatabasePrepJSON AS Step>  ---------->
export function stDatabasePrepJSON(toInsert){
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
    let lastFirst = local.getItem('stLast') + ', ' + local.getItem('stPreferredFirst');
    let toInsert = {};
    toInsert.title = lastFirst;
    toInsert.personId = local.getItem('studentId');
    toInsert.familyId = local.getItem('familyId');
    toInsert.role = local.getItem('student');
    toInsert.first = local.getItem('stPreferredFirst');
    toInsert.last = local.getItem('stLast');
    toInsert.firstLegal = enrollmentObject.family.student.first;
    toInsert.fullName = local.getItem('stPreferredFirst') + ' ' + local.getItem('ppLast');
    toInsert.lastFirst = lastFirst;
    toInsert.comboName = local.getItem('comboName');
    toInsert.webhookId = local.getItem('wixWebhookId');
    toInsert.idHH = local.getItem('familyId');
    toInsert.idBL = local.getItem('familyId');
    toInsert.altPersonId = local.getItem('familyId');
    // ø <---------- </direct (or nearly)> ---------->
    toInsert.objectData = JSON.strinfiy(enrollmentObject);
    let courseArray = enrollmentObject.courses_array;
    courseArray.forEach(elementObject => {
        console.log(elementObject);
        delete elementObject.billing;
    });
    toInsert.objectCorollary = JSON.strinfiy(courseArray);
}
// ø <---------- </stDatabasePrepJSON AS Step> ---------->